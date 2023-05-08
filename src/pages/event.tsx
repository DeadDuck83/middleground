import React from 'react';
import { Heading, Input, Button, Grid, GridItem } from '@chakra-ui/react';
import ResponsiveBox from '@/components/ResponsiveBox/ResponsiveBox';

import { CreateEvent } from '@/types/types';
import Navigation from '@/components/Navigation/Navigation';
import { useMutation } from 'react-query';
import BodyComponent from '@/components/BodyComponent/BodyComponent';
import { createEvent } from '../lib/api';
import { createAvatar } from '@/helpers/createAvatar';

const defaultEvent: CreateEvent = {
  title: '',
  eventID: '',
  creator: {
    name: '',
    avatar: '',
  },
  link: '',
};

function CreateEvent() {
  const [event, setEvent] = React.useState<CreateEvent>(defaultEvent);
  const [checkedLocal, setCheckedLocal] = React.useState(false);
  const createEventMutation = useMutation(createEvent);
  const { isLoading } = createEventMutation;
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
      console.log('middlegrounds object found');
      if (timeDifference < oneDay) {
        setEvent({
          eventID: middlegroundObject.eventID,
          creator: middlegroundObject.creator,
          link: `/event/${middlegroundObject.eventID}`,
          title: middlegroundObject.title || '',
        });
        setCheckedLocal(true);
      } else {
        localStorage.removeItem('middleground');
        setCheckedLocal(true);
      }
    } else {
      setCheckedLocal(true);
      console.log('middlegrounds object not found');
    }
  }, []);

  const handleSubmit = async () => {
    // remove any special characters in the creators name so that it can be used to create an avatar
    const creatorName = event?.creator?.name?.replace(/\s/g, '') || 'taco';
    const creatorAvatar = createAvatar(creatorName);

    // If there is no eventID in the local storage middleground object, create a new eventID
    const newEventID =
      event.eventID || Math.random().toString(36).substring(2, 15);

    // update the middleground object in local storage
    const middleground = {
      eventID: newEventID,
      creator: {
        name: event.creator.name,
        avatar: creatorAvatar,
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
        avatar: creatorAvatar,
      },
      title: event?.title,
      link: `/event/${newEventID}`,
    });
  };

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
                        name: e.target.value,
                        avatar: event?.creator?.avatar || '',
                      },
                    };
                    setEvent(updateCreator);
                  }}
                />
              </GridItem>
              <GridItem></GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            {isLoading ? (
              <p>loading...</p>
            ) : (
              <Button
                colorScheme="blue"
                size="lg"
                w="100%"
                onClick={() => {
                  console.log('create event button clicked');
                  handleSubmit();
                }}
              >
                Create Event
              </Button>
            )}
          </GridItem>
        </Grid>
      </BodyComponent>
    </ResponsiveBox>
  );
}

export default CreateEvent;
