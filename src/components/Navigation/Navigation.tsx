'use client';

import { Chat, Map, Phone } from '@/assets/Svg';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import styles from './styles.module.scss';
// write an enum for the active state
interface Props {
  active: 'phone' | 'chat' | 'map';
}
// create a switch statement to determine which text to display as the title. When it's 'phone' display 'Phone', when it's 'chat' display 'Chat', and when it's 'map' display 'Map'.

const titleText = (active: 'phone' | 'chat' | 'map') => {
  switch (active) {
    case 'phone':
      return 'Create an Event';
    case 'chat':
      return 'Select a Destination';
    case 'map':
      return 'See you there!';
  }
};

const Navigation = ({ active }: Props) => {
  return (
    <Box className={styles.centering} bgColor={'purple.primary'} p={30}>
      <Grid
        alignItems="center"
        // mb={4}

        gridTemplateColumns="1fr 1fr 1fr"
        alignContent="center"
        justifyContent="center"
      >
        <GridItem
          justifySelf={'center'}
          h={'100%'}
          w={'100%'}
          maxW={100}
          className={
            active === 'phone'
              ? ` ${styles.iconContainerActive}`
              : ` ${styles.iconContainer}`
          }
        >
          <Phone
            width={100}
            height={100}
            // className={active === 'phone' ? 'active' : ''}
          />
        </GridItem>
        <GridItem
          justifySelf={'center'}
          h={'100%'}
          w={'100%'}
          maxW={100}
          className={
            active === 'chat'
              ? `${styles.iconContainerActive}`
              : `  ${styles.iconContainer}`
          }
        >
          <Chat width={100} height={100} />
        </GridItem>
        <GridItem
          justifySelf={'center'}
          h={'100%'}
          w={'100%'}
          maxW={100}
          className={
            active === 'map'
              ? `${styles.iconContainerActive}`
              : ` ${styles.iconContainer}`
          }
        >
          <Map width={100} height={100} />
        </GridItem>
      </Grid>
      <Box p={2}>
        <Heading color={'lemon.primary'} className={styles.title}>
          {titleText(active)}
        </Heading>
      </Box>
    </Box>
  );
};

export default Navigation;
