import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    purple: {
      primary: '#5D576B',
      lighter: '#7D7891',
      darker: '#3D364B',
    },
    orange: {
      primary: '#ED6A5A',
      lighter: '#FF8A7A',
      darker: '#BA493B',
    },
    teal: {
      primary: '#9BC1BC',
      lighter: '#BDD6D8',
      darker: '#6A8A89',
    },
    lemon: {
      primary: '#F4F1BB',
      lighter: '#FFFFCB',
      darker: '#C1BE8B',
    },
    alabaster: {
      primary: '#E6EBE0',
      lighter: '#F0F4F1',
      darker: '#B2B8A8',
    },
  },
  fonts: {
    body: 'Nunito, sans-serif',
    heading: 'Montserrat, sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
});

export default customTheme;
