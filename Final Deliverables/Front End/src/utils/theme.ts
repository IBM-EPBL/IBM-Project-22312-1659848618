import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: '\'Inter\', sans-serif',
    body: '\'Inter\', sans-serif',
  },
  styles: {
    global: () => ({
      body: {
        color: '#1C1C1C',
        bg: '#0e61fe',
      },
    }),
  },
});

export default theme;