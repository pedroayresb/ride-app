import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const globalStyles = {
  colors: {
    gray: {
      700: '#1f2733',
      400: '#A0AEC0',
    },
    teal: {
      500: 'rgb(9, 208, 234)',
      200: '#13072F',
      300: 'rgb(9, 208, 234)',
    },
  },
  styles: {
    global: (props: StyleFunctionProps | Record<string, unknown>) => ({
      body: {
        bg: mode('gray.50', 'gray.800')(props),
        fontFamily: "'Roboto', sans-serif",
      },
      html: {
        fontFamily: "'Roboto', sans-serif",
      },
    }),
  },
};

export default globalStyles;
