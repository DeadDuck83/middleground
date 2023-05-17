import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Text,
  GridItem,
} from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

interface Props {
  address: string;
  name: string;
  photo: string;
  votes: [{ avatar: string; name: string }];
  destinationVotingOptions: any;
  setDestinationVotingOptions: any;
  voteIndex: number;
}

function Destination({
  address,
  name,
  photo,
  votes,
  voteIndex,
  destinationVotingOptions,
  setDestinationVotingOptions,
}: Props) {
  // handle voting for a destination by adding the user's avatar and name to the votes array
  const handleVote = () => {
    // create a new array of destinationVotingOptions \
    const voteName = 'Derek Moore';
    const voteAvatar = 'https://bit.ly/dan-abramov';
    // update the destinationVotingOptions array with the new vote using the voteIndex
    const newDestinationVotingOptions = destinationVotingOptions.map(
      (destination: any, index: number) => {
        if (index === voteIndex) {
          // if the name is already in the votes array for this voteIndex, remove it
          const existingVoteIndex = destination.votes.findIndex(
            (vote: any) => vote.name === voteName
          );
          if (existingVoteIndex !== -1) {
            // remove the existing vote
            const newVotes = destination.votes.filter(
              (vote: any, index: number) => index !== existingVoteIndex
            );

            // return the destination with the new votes array
            return {
              ...destination,
              votes: newVotes,
            };
          }

          return {
            ...destination,
            votes: [
              ...destination.votes,
              { avatar: voteAvatar, name: voteName },
            ],
          };
        } else {
          return destination;
        }
      }
    );

    // set the destinationVotingOptions state to the new array of destinationVotingOptions
    setDestinationVotingOptions(newDestinationVotingOptions);
  };

  return (
    <GridItem>
      <Card
        direction={{ base: 'column', xs: 'row' }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          src={photo}
          alt={name}
          width={100}
          height={100}
          className={styles.image}
          property="image"
        />

        <Stack>
          <CardBody p={2}>
            <Heading fontSize="md">{name}</Heading>

            <Text py="2" fontSize={'xs'}></Text>
          </CardBody>

          <CardFooter p={2}>
            <Button
              variant="solid"
              colorScheme="blue"
              size={'sm'}
              onClick={() => {
                handleVote();
                console.log('voted');
              }}
            >
              Vote [{votes.length}]
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </GridItem>
  );
}

export default Destination;
