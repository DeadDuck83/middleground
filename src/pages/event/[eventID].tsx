'use client';
import React, { FC, useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Center,
  Grid,
  GridItem,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import ResponsiveBox from '@/components/ResponsiveBox/ResponsiveBox';
import Navigation from '@/components/Navigation/Navigation';
import InputRange from '@/components/InputRange/InputRange';
import BodyComponent from '@/components/BodyComponent/BodyComponent';
import DestinationsContainer from '@/components/DestinationsContainer/DestinationsContainer';
import GoogleMapComponent from '@/components/GoogleMapComponent/GoogleMapComponent';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getCenterLocation } from '@/helpers/destinationCenterpoint';

interface PageProps {
  params: {
    eventID: string;
  };
}

interface DestinationLocationProps {
  lat: number;
  lng: number;
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

const fetchEvent = async (eventID: string) => {
  const { data } = await axios.get(`/api/event/${eventID}`);
  return data.event;
};

const Mapping: FC<PageProps> = () => {
  // State variables
  const [destinationCenterpointLocation, setDestinationCenterpointLocation] =
    useState<DestinationLocationProps>();
  const [radius, setRadius] = useState<number[]>([20]); // Radius in miles
  const [destinationOptions, setDestinationOptions] = useState<any>([]); // Destination options (places)
  const [destinationVotingOptions, setDestinationVotingOptions] = useState<any>(
    []
  ); // Voting options (places)
  const router = useRouter();
  const currentEventID = router.query.eventID as string;

  // Fetch event data
  const {
    data: eventRes,
    isLoading,
    error,
  } = useQuery(['event', currentEventID], () => fetchEvent(currentEventID), {
    // refetchInterval: 5000,
    enabled: !!currentEventID, // <--- This line ensures the query only runs if currentEventID is not null or undefined.
    // refetchOnWindowFocus: false,
  });

  // Calculate center location when event data is fetched
  useEffect(() => {
    if (eventRes?.creator && eventRes.attendees) {
      const centerLocation = getCenterLocation([
        eventRes.creator,
        ...eventRes.attendees,
      ]);
      console.log('center location', centerLocation);
      setDestinationCenterpointLocation(centerLocation);
    }
  }, [eventRes?.creator, eventRes?.attendees]);

  // When destination options are returned from the GoogleMapComponent with an array of places, set the destinationOptions state with an added variable of votes for each place
  useEffect(() => {
    if (destinationOptions) {
      const destinationOptionsWithVotes = destinationOptions.map(
        (destination: any) => {
          return {
            ...destination,
            votes: [],
          };
        }
      );

      // Only update if necessary
      if (
        JSON.stringify(destinationOptionsWithVotes) !==
        JSON.stringify(destinationVotingOptions)
      ) {
        console.log('update:', destinationOptionsWithVotes);
        setDestinationVotingOptions(destinationOptionsWithVotes);
      }
    }
  }, [destinationOptions, destinationVotingOptions]);

  const displayAttendees = () => {
    return eventRes?.attendees?.map(
      (attendee: { name: string; avatar: string | undefined }) => {
        return (
          <WrapItem key={attendee.name}>
            <Avatar name={attendee.name} src={attendee.avatar} />
          </WrapItem>
        );
      }
    );
  };

  console.log(
    'Locations and event res: ',
    destinationCenterpointLocation,
    eventRes
  );

  if (error) {
    console.log(error);
    // delete local storage middleground object
    localStorage.removeItem('middleground');
    return (
      <Center height={400} width={'100%'}>
        <p>ahh fuck, its all gone to shit</p>
      </Center>
    );
  }

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
              {/* <GridItem>
                <VStack spacing={4} alignItems="start">
                  <PreferenceDropdown
                    label="Select a preference"
                    selectedPreferences={preferences}
                    onSelect={handleSelect}
                  />
                </VStack>
              </GridItem> */}
              <GridItem>
                <InputRange radius={radius} setRadius={setRadius} />
              </GridItem>
            </Grid>
            {!destinationCenterpointLocation ? (
              <div>Loading...</div>
            ) : (
              <GoogleMapComponent
                latitude={destinationCenterpointLocation?.lat}
                longitude={destinationCenterpointLocation?.lng}
                radius={radius[0]}
                // preferences={preferences}
                setDestinationOptions={setDestinationOptions}
              />
              // <p>test</p>
            )}
            <div>
              <Wrap>
                <WrapItem>
                  <Avatar
                    name={eventRes?.creator?.name}
                    src={eventRes?.creator?.avatar}
                  />
                </WrapItem>
                {displayAttendees()}
              </Wrap>
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
