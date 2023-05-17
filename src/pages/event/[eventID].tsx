'use client';
import React, { FC, useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Center,
  Grid,
  GridItem,
  SkeletonCircle,
  Wrap,
  WrapItem,
  useDisclosure,
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
import LocationModal from '@/components/LocationModal/LocationModal';
import AddAttendeeModal from '@/components/AddAttendee/AddAttendee';
import { Role } from '@/enums/Role';
import { checkLocalStorage } from '@/helpers/checkLocalStorage';

// TODO: remove hardcoded preferences and radius
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
  const [userRole, setUserRole] = useState<Role>(Role.None);
  const [destinationCenterpointLocation, setDestinationCenterpointLocation] =
    useState<DestinationLocationProps>();
  // const [radius, setRadius] = useState<number[]>([2]); // Radius in miles
  const [destinationOptions, setDestinationOptions] = useState<any>([]); // Destination options (places)
  const [destinationVotingOptions, setDestinationVotingOptions] = useState<any>(
    []
  ); // Voting options (places)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const currentEventID = router.query.eventID as string;

  // Fetch event data
  const {
    data: eventRes,
    isLoading,
    error,
    refetch,
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
      setDestinationCenterpointLocation(centerLocation);
    } else {
      console.log('no center location');
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

      setDestinationVotingOptions(destinationOptionsWithVotes);
    }
  }, [destinationOptions]);

  useEffect(() => {
    if (eventRes) {
      const [role, data] = checkLocalStorage(onOpen);
      console.log('data: ', data);
      setUserRole(role);
    }
  }, [eventRes]);

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

  // const newAttendeeModal = () => {
  //   if (typeof window === 'undefined') return null;
  //   // check local storage to see if there is a middleground object with an eventID
  //   const middleground = localStorage.getItem('middleground') as string | null;
  //   if (middleground) {
  //     const middlegroundObject = JSON.parse(middleground);
  //     const timestamp = middlegroundObject.timestamp;
  //     const currentTime = Date.now();
  //     const timeDifference = currentTime - timestamp;
  //     const oneDay = 1000 * 60 * 60 * 24;
  //     if (timeDifference < oneDay) {
  //       return null;
  //     }
  //     // if the creator name in the local storage is the same as the creator name in the event res, return null
  //     if (middlegroundObject.creator.name === eventRes?.creator?.name) {
  //       return null;
  //     }
  //   }
  //   console.log('show modal');
  //   onOpen();
  //   return;
  // };

  if (error) {
    console.log(error);
    // delete local storage middleground object
    localStorage.removeItem('middleground');
    localStorage.removeItem('middlegroundsattendee');
    return (
      <Center height={400} width={'100%'}>
        <p>ahh fuck, its all gone to shit</p>
      </Center>
    );
  }
  // useEffect(() => {
  //   newAttendeeModal();
  // });
  console.log(userRole, 'user role');

  return (
    <ResponsiveBox>
      <AddAttendeeModal
        isOpen={isOpen}
        onClose={onClose}
        currentEventID={currentEventID}
        refetch={refetch}
      />
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
              {/* <GridItem>
                <InputRange radius={radius} setRadius={setRadius} />
              </GridItem> */}
            </Grid>
            {!destinationCenterpointLocation ? (
              <div>Waiting for others to join so we can have a mid-point.</div>
            ) : (
              <GoogleMapComponent
                latitude={destinationCenterpointLocation?.lat}
                longitude={destinationCenterpointLocation?.lng}
                radius={10} // hardcoded for now
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
                {!destinationCenterpointLocation && (
                  <WrapItem gap={'5px'}>
                    <SkeletonCircle size="12" pr={'5px'} />
                    <SkeletonCircle size="12" />
                  </WrapItem>
                )}
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
