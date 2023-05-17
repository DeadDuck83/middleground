import React from 'react';
import {
  Heading,
  Input,
  Button,
  Grid,
  GridItem,
  Avatar,
  Center,
} from '@chakra-ui/react';
import ResponsiveBox from '@/components/ResponsiveBox/ResponsiveBox';
import { useRouter } from 'next/router';
import { CreateEvent } from '@/types/types';
import Navigation from '@/components/Navigation/Navigation';
import { useMutation } from 'react-query';
import BodyComponent from '@/components/BodyComponent/BodyComponent';
import { createEvent } from '../lib/api';
import { createAvatar } from '@/helpers/createAvatar';
import LocationModal from '@/components/LocationModal/LocationModal';

const defaultEvent: CreateEvent = {
  title: '',
  eventID: '',
  creator: {
    name: '',
    avatar: '',
    lat: 0,
    lng: 0,
  },
  link: '',
};
interface CreatorLocationProps {
  lat: number;
  lng: number;
}

function CreateEvent() {
  const [event, setEvent] = React.useState<CreateEvent>(defaultEvent);
  const [creatorLocation, setCreatorLocation] =
    React.useState<CreatorLocationProps>({
      lat: 0,
      lng: 0,
    });
  const [checkedLocal, setCheckedLocal] = React.useState(false);
  const createEventMutation = useMutation(createEvent);
  const { isLoading, error } = createEventMutation;
  const router = useRouter();
  // This useEffect checks if there is a middleground object in local storage that was created within the last 24 hours
  // If there is, it will set the event state to that object to maintain the event state
  React.useEffect(() => {
    if (checkedLocal) return;
    const middleground = localStorage.getItem('middleground');
    if (middleground) {
      const middlegroundObject = JSON.parse(middleground);
      const timestamp = middlegroundObject.timestamp;
      const currentTime = Date.now();
      const timeDifference = currentTime - timestamp;
      const oneDay = 1000 * 60 * 60 * 24;
      if (timeDifference < oneDay) {
        setEvent({
          eventID: middlegroundObject.eventID,
          creator: middlegroundObject.creator,
          link: `/event/${middlegroundObject.eventID}`,
          title: middlegroundObject.title || '',
        });
        setCreatorLocation({
          lat: middlegroundObject.creator.lat,
          lng: middlegroundObject.creator.lng,
        });
        setCheckedLocal(true);
      } else {
        localStorage.removeItem('middleground');
        setCheckedLocal(true);
      }
    } else {
      setCheckedLocal(true);
    }
  }, []);

  const locationAvailable = () => {
    if (creatorLocation.lat === 0) {
      return (
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => {
            // request location again
            setCreatorLocation({ lat: 0, lng: 0 });
          }}
        >
          Share your location
        </Button>
      );
    } else {
      return (
        <p>
          <span role="img" aria-label="checkmark">
            ✅ Location shared
          </span>
        </p>
      );
    }
  };

  const handleSubmit = async () => {
    // If there is no eventID in the local storage middleground object, create a new eventID
    const newEventID =
      event.eventID || Math.random().toString(36).substring(2, 15);

    // update the middleground object in local storage
    const middleground = {
      eventID: newEventID,
      creator: {
        name: event.creator.name,
        avatar: event.creator.avatar,
        lat: creatorLocation.lat,
        lng: creatorLocation.lng,
      },
      timestamp: Date.now(),
      title: event?.title,
    };
    localStorage.setItem('middleground', JSON.stringify(middleground));

    // create the event in the database using react-query and the events api
    await createEventMutation.mutateAsync({
      eventID: newEventID,
      creator: {
        name: event.creator.name,
        avatar: event.creator.avatar,
        lat: creatorLocation.lat,
        lng: creatorLocation.lng,
      },
      title: event?.title,
      link: `/event/${newEventID}`,
    });

    // redirect to the event page using Next.js router

    router.push(`/event/${newEventID}`);
  };

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
      <Navigation active="phone" />
      <BodyComponent>
        <Grid
          h="100%"
          className="content"
          gridTemplateRows={'1fr auto'}
          gap={20}
        >
          <GridItem>
            <Grid gap={5}>
              <GridItem>
                <Heading size="lg">Create an Event</Heading>
              </GridItem>
              <GridItem>
                <Input
                  placeholder="Event title"
                  value={event?.title}
                  onChange={e => {
                    const updateTitle = { ...event, title: e.target.value };
                    setEvent(updateTitle);
                  }}
                />
              </GridItem>
              <GridItem>
                <Input
                  placeholder="Your name"
                  value={event?.creator?.name}
                  onChange={e => {
                    const updateCreator = {
                      ...event,
                      creator: {
                        ...event.creator,
                        name: e.target.value,
                      },
                    };
                    setEvent(updateCreator);
                  }}
                  onBlur={e => {
                    // create the avatar and update the event state
                    const creatorName = e.target.value.replace(/\s/g, '');
                    const creatorAvatar = createAvatar(creatorName);
                    const updateCreator = {
                      ...event,
                      creator: {
                        ...event.creator,
                        avatar: creatorAvatar,
                      },
                    };
                    setEvent(updateCreator);
                  }}
                />
                <div>{locationAvailable()}</div>
              </GridItem>
              <GridItem>
                <Center>
                  <Avatar
                    name={event.creator.name}
                    src={event.creator.avatar}
                    size="xl"
                  />
                </Center>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Button
              isDisabled={
                creatorLocation.lat === 0 ||
                event?.title === '' ||
                event?.creator?.name === ''
              }
              isLoading={isLoading}
              colorScheme="blue"
              size="lg"
              w="100%"
              onClick={() => {
                handleSubmit();
              }}
            >
              Create Event
            </Button>
          </GridItem>
        </Grid>
      </BodyComponent>
      {creatorLocation.lat === 0 && (
        <LocationModal set={setCreatorLocation} data={creatorLocation} />
      )}
    </ResponsiveBox>
  );
}

export default CreateEvent;
