import React from 'react';
import Destination from './Destination/Destination';
import { Grid } from '@chakra-ui/react';
import { DestinationVotingOptionsProps } from '@/pages/event/[eventID]';

const DestinationsContainer: React.FC<DestinationVotingOptionsProps> = ({
  destinationVotingOptions,
  setDestinationVotingOptions,
}) => {
  // console.log('destinationVotingOptions', destinationVotingOptions);
  // loop through destinationVotingOptions and create a Destination component for each
  const renderDestinations = (): JSX.Element[] | JSX.Element => {
    if (!destinationVotingOptions)
      return <div>There are no destinations yet.</div>;

    return destinationVotingOptions.map((destination, index) => {
      return (
        <Destination
          key={index}
          address={destination.address}
          name={destination.name}
          photo={destination.photo}
          votes={destination.votes}
          voteIndex={index}
          destinationVotingOptions={destinationVotingOptions}
          setDestinationVotingOptions={setDestinationVotingOptions}
        />
      );
    });
  };

  return <Grid gap={10}>{renderDestinations()}</Grid>;
};

export default DestinationsContainer;
