import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
  Box,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { AddUser } from '@/types/types';
import { createAvatar } from '@/helpers/createAvatar';

type AddAttendeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentEventID: string;
  refetch: () => void;
};

const AddAttendeeModal: React.FC<AddAttendeeModalProps> = ({
  isOpen,
  onClose,
  currentEventID,
  refetch,
}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [avatar, setAvatar] = useState('');
  const toast = useToast();
  const queryClient = useQueryClient();

  const addAttendeeToLocalStorage = (
    name: string,
    lat: number,
    lng: number,
    avatar: string
  ) => {
    // ass the attendee to local storage as type AddUser
    const middlegroundAttendee: AddUser = {
      name: name,
      lat: lat,
      lng: lng,
      avatar: avatar,
    };
    localStorage.setItem(
      'middlegroundsattendee',
      JSON.stringify(middlegroundAttendee)
    );
  };


  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  } else {
    // Browser doesn't support Geolocation or running in non-browser environment
    displayMessage(
      'Your browser does not support Geolocation or you are running in a non-browser environment.'
    );
  }

  function successFunction(position: GeolocationPosition) {
    const lat: number = position.coords.latitude;
    const lon: number = position.coords.longitude;
    setLocation({
      lat: lat,
      lng: lon,
    });
  }

  function errorFunction() {
    displayMessage(
      'It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use the following steps to enable it: \nFor Chrome:\nSettings > Privacy and Security > Site Settings > Location\nFor Safari:\nSettings > Privacy > Location Services > Safari Websites'
    );
  }

  function displayMessage(message: string) {
    if (typeof alert !== 'undefined') {
      alert(message);
    } else {
      console.log(message);
      // Or handle non-browser environment situation here
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const mutation = useMutation(
    (data: { eventID: string; attendee: AddUser }) =>
      fetch('/api/event/addAttendee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
        refetch();
        addAttendeeToLocalStorage(name, location?.lat, location?.lng, avatar);
        onClose();
        toast({
          title: 'Attendee added.',
          description: "We've added your attendee to the event.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && location) {
      mutation.mutate({
        eventID: currentEventID,
        attendee: { name, avatar, ...location },
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={
        location ? onClose : () => console.error('Why come no close option?')
      }
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Attendee</ModalHeader>
        <ModalCloseButton isDisabled={!location} />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                onBlur={e => {
                  const creatorAvatar = createAvatar(e.target.value);
                  setAvatar(creatorAvatar);
                }}
              />
            </FormControl>

            <Box>
              {location.lat !== 0 ? (
                <p>
                  <span role="img" aria-label="checkmark">
                    ✅ Location shared
                  </span>
                </p>
              ) : (
                <p>
                  <span role="img" aria-label="checkmark">
                    ❌ Location not shared
                  </span>
                </p>
              )}
            </Box>
            {!location && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="4"
              >
                <Spinner size="xl" />
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              type="submit"
              isDisabled={!location || location.lat === 0}
            >
              Add Attendee
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddAttendeeModal;
