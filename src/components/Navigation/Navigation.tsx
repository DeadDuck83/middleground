'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Chat, Map, Phone } from '@/assets/Svg';
import { Grid, GridItem } from '@chakra-ui/react';
import styles from './styles.module.scss';
// write an enum for the active state
interface Props {
  active: 'phone' | 'chat' | 'map';
}

const Navigation = ({ active }: Props) => {
  return (
    <Grid
      className={styles.navigation}
      alignItems="center"
      // mb={4}
      p={30}
      gridTemplateColumns="1fr 1fr 1fr"
      alignContent="center"
      justifyContent="center"
      bgColor={'purple.primary'}
    >
      <GridItem
        justifySelf={'center'}
        h={'100%'}
        w={'100%'}
        maxW={120}
        className={
          active === 'phone'
            ? ` ${styles.iconContainerActive}`
            : ` ${styles.iconContainer}`
        }
      >
        <Phone
          width={120}
          height={120}
          // className={active === 'phone' ? 'active' : ''}
        />
      </GridItem>
      <GridItem
        justifySelf={'center'}
        h={'100%'}
        w={'100%'}
        maxW={120}
        className={
          active === 'chat'
            ? `${styles.iconContainerActive}`
            : `  ${styles.iconContainer}`
        }
      >
        <Chat width={120} height={120} />
      </GridItem>
      <GridItem
        justifySelf={'center'}
        h={'100%'}
        w={'100%'}
        maxW={120}
        className={
          active === 'map'
            ? `${styles.iconContainerActive}`
            : ` ${styles.iconContainer}`
        }
      >
        <Map width={120} height={120} />
      </GridItem>
    </Grid>
  );
};

export default Navigation;
