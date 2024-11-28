
// Chakra Imports
import {
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import {
  memo,
} from 'react';
import {
  NavLink,
} from 'react-router-dom';
import Styles from '../../../assets/Styles';
import {
  MdCarRental,
} from 'react-icons/md';

const Navbar = memo(() => {
  const variantChange = '0.2s linear';
  const styles = Styles();

  return (
    <Flex
      as="header"
      px={2}
      transition={variantChange}
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      display="flex"
      minH="50px"
      w="100%"
      justifyContent={'center'}
      alignItems="center"
    >
      <Flex as={NavLink} to="/ride">
        <Icon
          width={{
            base: '6rem',
            md: '6rem',
          }}
          height={{
            base: '6rem',
            md: '6rem',
          }}
          as={MdCarRental}
          fill={styles.textColor}
        />
        <Text
          fontSize={{
            base: '2rem',
            md: '6rem',
          }}
          lineHeight={{
            base: '6rem',
            md: '6rem',
          }}
          fontWeight="bold"
          ml={2}
          px={6}
          borderTop="6px solid"
          borderColor={styles.textColor}
          borderBottom="6px solid"
          color={styles.textColor}
        >
          Caronada
        </Text>
      </Flex>
    </Flex>
  );
});

export default Navbar;
