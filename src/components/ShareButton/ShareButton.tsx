import React, { MouseEvent } from 'react';
import { Button, useToast } from '@chakra-ui/react';

interface ShareLinkProps {
  eventID: string;
}

const ShareLinkButton: React.FC<ShareLinkProps> = ({ eventID }) => {
  const toast = useToast();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const url = `${window.location.origin}/event/${eventID}`;

    navigator.clipboard.writeText(url).then(
      () => {
        toast({
          title: 'Success',
          description: 'URL copied to clipboard',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      err => {
        toast({
          title: 'Error',
          description: 'Failed to copy URL to clipboard',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.error('Failed to copy text: ', err);
      }
    );
  };

  return <Button onClick={handleClick}>Share Link</Button>;
};

export default ShareLinkButton;
