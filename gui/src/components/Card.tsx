import {
  Flex,
  ChakraProps,
  useColorMode,
  useStyleConfig,
} from '@chakra-ui/react';
import Styles from '../assets/Styles';

function Card({
  variant,
  children,
  ...rest
}: {
  variant?: string;
  children: React.ReactNode;
} & ChakraProps) {
  const colorMode = useColorMode();
  const styles = useStyleConfig('Card', {
    variant,
    colorMode,
  });
  const {
    bgModal,
  } = Styles();

  return (
    <Flex
      __css={styles}
      as="article"
      bg={bgModal}
      borderRadius={16}
      p={2}
      h="100%"
      overflowY="scroll"
      {...rest}
    >
      {children}
    </Flex>
  );
}

export default Card;
