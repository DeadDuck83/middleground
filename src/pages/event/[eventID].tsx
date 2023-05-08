'use client';
import React, { FC, useState } from 'react';
import {
  Button,
  Grid,
  GridItem,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
} from '@chakra-ui/react';
import ResponsiveBox from '@/components/ResponsiveBox/ResponsiveBox';
import Navigation from '@/components/Navigation/Navigation';
import InputRange from '@/components/InputRange/InputRange';
import BodyComponent from '@/components/BodyComponent/BodyComponent';
import DestinationsContainer from '@/components/DestinationsContainer/DestinationsContainer';
import GoogleMapComponent from '@/components/GoogleMapComponent/GoogleMapComponent';
import PreferenceDropdown from '@/components/PreferenceDorpdown/PreferenceDropdown';

interface PageProps {
  params: {
    eventID: string;
  };
}
interface PreferenceOption {
  name: string;
  type: string;
}

export interface DestinationVotingOptionsProps {
  destinationVotingOptions:
    | {
        address: string;
        name: string;
        photo: string;
        votes: [{ avatar: string; name: string }];
      }[]
    | null;
  setDestinationVotingOptions: any;
}

const Mapping: FC<PageProps> = ({ params }) => {
  const [latitude, setLatitude] = useState(33.59502); // Initial latitude
  const [longitude, setLongitude] = useState(-117.659103); // Initial longitude
  const [radius, setRadius] = useState<number[]>([20]); // Radius in miles
  const [preferences, setPreferences] = useState<PreferenceOption[]>(); // Preferences (place types)
  const [destinationOptions, setDestinationOptions] = useState([]); // Options (places)
  const [destinationOptionsLoading, setDestinationOptionsLoading] =
    useState(false); // Loading state for options
  const [destinationVotingOptions, setDestinationVotingOptions] = useState<any>(
    []
  ); // Voting options (places)
  const [destination, setDestination] = useState(null); // Selected destination

  // set the destinationVotingOptions when the destinationOptions change
  React.useEffect(() => {
    if (destinationOptions) {
      const newDestinationVotingOptions = destinationOptions.map(
        (destinationOption: any) => {
          return {
            address: destinationOption.address,
            name: destinationOption.name,
            photo: destinationOption.photo,
            votes: [],
          };
        }
      );
      console.log('newDestinationVotingOptions', newDestinationVotingOptions);
      setDestinationVotingOptions(newDestinationVotingOptions);
    }
  }, [destinationOptions]);

  const displayPreferences = React.useCallback(() => {
    return preferences?.map((preference, index): React.ReactElement => {
      return (
        <Tag
          key={index}
          size={'md'}
          borderRadius="full"
          variant="solid"
          colorScheme="blue"
        >
          <TagLabel>{preference.name}</TagLabel>
          <TagCloseButton
            onClick={() => {
              const newPreferences = preferences?.filter(
                pref => pref.name !== preference.name
              );
              setPreferences(newPreferences);
            }}
          />
        </Tag>
      );
    });
  }, [preferences]);

  const handleSelect = (preference: PreferenceOption) => {
    // new preference array for state

    // if the preference is not already in the array, add it
    const newPreferences = preferences?.filter(
      pref => pref.name !== preference.name
    );

    if (!preferences?.some(p => p.type === preference.type)) {
      setPreferences(newPreferences);
    }
  };

  return (
    <ResponsiveBox>
      <Navigation active="chat" />
      <BodyComponent>
        <Grid
          h="100%"
          className="content"
          gridTemplateRows={'1fr auto'}
          gap={20}
        >
          <GridItem>
            <Grid gridTemplateRows={'1fr auto'} alignItems={'center'}>
              <GridItem>
                <VStack spacing={4} alignItems="start">
                  <PreferenceDropdown
                    label="Select a preference"
                    selectedPreferences={preferences}
                    onSelect={handleSelect}
                  />
                </VStack>
                {/* <InputWithButtonRow
                  placeholder="Add Preference"
                  // preferences={['test']}
                  // setPreferences={() => {
                  //   console.log(['test']);
                  // }}
                  preferences={preferences}
                  setPreferences={setPreferences}
                  eventID={'demo'}
                /> */}
                {displayPreferences()}
              </GridItem>
              <GridItem>
                <InputRange radius={radius} setRadius={setRadius} />
              </GridItem>
            </Grid>
            {!latitude || !longitude ? (
              <div>Loading...</div>
            ) : (
              <GoogleMapComponent
                latitude={latitude}
                longitude={longitude}
                radius={radius[0]}
                // preferences={preferences}
                setDestinationOptions={setDestinationOptions}
              />
            )}
            <div>
              <div>People joined</div>
            </div>
            <DestinationsContainer
              destinationVotingOptions={destinationVotingOptions}
              setDestinationVotingOptions={setDestinationVotingOptions}
            />
          </GridItem>
          <GridItem>
            <Button
              colorScheme="blue"
              size="lg"
              w="100%"
              onClick={() => {
                console.log('create event button clicked');
              }}
            >
              Next button
            </Button>
          </GridItem>
        </Grid>
      </BodyComponent>
    </ResponsiveBox>
  );
};

export default Mapping;
