import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
interface Props {
  children: ReactNode;
}
function BodyComponent({ children }: Props) {
  return (
    <Box p={30} position="relative" overflow={'hidden'}>
      {children}
    </Box>
  );
}

export default BodyComponent;
