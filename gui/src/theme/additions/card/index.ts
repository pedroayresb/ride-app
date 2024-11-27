import {
  StyleFunctionProps,
} from '@chakra-ui/theme-tools';

const Card = {
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    minWidth: '0px',
    wordWrap: 'break-word',
    backgroundClip: 'border-box',
  },
  variants: {
    panel: (props: StyleFunctionProps | Record<string, unknown>) => ({
      bg: props.colorMode === 'dark' ?
        'gray.700' :
        'white',
      width: '100%',
      boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
      borderRadius: '15px',
    }),
  },
  defaultProps: {
    variant: 'panel',
  },
};

const CardComponent = {
  components: {
    Card,
  },
};

export default CardComponent;
