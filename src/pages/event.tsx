import React from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  Tag,
  TagCloseButton,
  TagLabel,
  Container,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import ResponsiveBox from '@/components/ResponsiveBox/ResponsiveBox';

import InputWithButtonRow from '@/components/InputWithButtonRow/InputWithButtonRow';
import { EventData } from '@/types/types';
import Navigation from '@/components/Navigation/Navigation';
import { useMutation } from 'react-query';
import BodyComponent from '@/components/BodyComponent/BodyComponent';
import { useDemoApi } from '../hooks/useDemoApi';
import PreferenceDropdown from '@/components/PreferenceDorpdown/PreferenceDropdown';

function CreateEvent() {
  const [eventTitle, setEventTitle] = React.useState('');
  const [preferences, setPreferences] = React.useState<string[]>([]);
  const eventID = Math.random().toString(36).substring(2, 15);
  const { data, isLoading, isError } = useDemoApi();

  const createEventMutation = useMutation<void, Error, EventData>(
    async newEvent => {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      await response.json();
    },
    {
      onSuccess: () => {
        console.log('Event created');
        setEventTitle('');
      },
    }
  );

  // set preferences and event title in state after request returns
  React.useEffect(() => {
    if (data) {
      setPreferences(data.preferences);
      setEventTitle(data.title);
    }
  }, [data]);

  // wrap displayPreferences in a useCallback hook

  const displayPreferences = React.useCallback(() => {
    return preferences.map((preference, index): React.ReactElement => {
      return (
        <Tag
          key={index}
          size={'md'}
          borderRadius="full"
          variant="solid"
          colorScheme="blue"
        >
          <TagLabel>{preference}</TagLabel>
          <TagCloseButton
            onClick={() => {
              const newPreferences = preferences.filter(
                (_preference, i) => i !== index
              );
              setPreferences(newPreferences);
            }}
          />
        </Tag>
      );
    });
  }, [preferences]);

  // handle submit button
  const handleSubmit = async () => {
    console.log(
      'eventID submit',
      eventID,
      'preferences',
      preferences,
      'title',
      eventTitle
    );
    // redirect to event page with eventID in URL
    createEventMutation.mutate({
      eventID,
      preferences,
      title: eventTitle,
      link: '/event/' + eventID,
      creator: {
        name: 'John Doe',
        avatar: 'https://bit.ly/broken-link',
      },
    });
  };
  console.log('data', data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  return (
    <ResponsiveBox>
      <Navigation active="phone" />

      {/* Form */}
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
                  defaultValue={eventTitle}
                  onChange={e => {
                    setEventTitle(e.target.value);
                  }}
                />
              </GridItem>
              {/* Add additional preferences input fields here */}
              <GridItem>
                {/* <PreferenceDropdown
                  label="Select a preference"
                  selectedPreferences={preferences}
                  onSelect={handleSelect}
                /> */}
              </GridItem>
              <GridItem>
                <Container py={'10px'} px={0}>
                  <Flex gap={4}>
                    {preferences ? displayPreferences() : null}
                  </Flex>
                </Container>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
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
          </GridItem>
        </Grid>
      </BodyComponent>

      {/* Continue button */}
    </ResponsiveBox>
  );
}

export default CreateEvent;
