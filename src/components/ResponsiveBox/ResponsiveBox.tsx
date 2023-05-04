import { Box, useMediaQuery, Grid } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ResponsiveBox = ({ children }: Props) => {
  const [isMobile] = useMediaQuery('(max-width: 700px)');
  const [isLandscape] = useMediaQuery('(orientation: landscape)');

  return (
    <Grid
      maxW={isMobile ? '100vw' : '700px'}
      minHeight={isMobile && !isLandscape ? '100vh' : 'auto'}
      w={isMobile ? '100vw' : 'auto'}
      // p={30}
      gridTemplateRows={isMobile ? 'auto 1fr' : 'auto 1fr'}
      m={'0 auto'}
    >
      {children}
    </Grid>
  );
};

export default ResponsiveBox;
