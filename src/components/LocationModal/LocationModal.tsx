// Import necessary Chakra UI components
// Import necessary Chakra UI components
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
  VStack,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
interface CreatorLocationProps {
  lat: number;
  lng: number;
}
interface LocationModalProps {
  set: React.Dispatch<React.SetStateAction<CreatorLocationProps>>;
  data: CreatorLocationProps;
}
const LocationModal = ({ data, set }: LocationModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  // Show the modal as soon as the component mounts
  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handleConfirm = () => {
    setLoading(true);
    // Get user's latitude and longitude using browser Geolocation API
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        setLoading(false);
        set({ lat: position.coords.latitude, lng: position.coords.longitude });
        onClose();
      },
      error => {
        console.error('Error getting location:', error);
        setLoading(false);
      }
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share your location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Really, the only way to use this is to allow us to use your
            location. We promise we won&apos;t do anything weird with it. 😉
          </ModalBody>

          <ModalFooter>
            {loading ? (
              <VStack spacing={2}>
                <Spinner size="xl" color="blue.500" />
                <span>Retrieving location...</span>
              </VStack>
            ) : (
              <>
                <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
                  Confirm
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LocationModal;
