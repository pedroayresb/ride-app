import React from 'react';
import {
  Box,
  ChakraProps,
  useStyleConfig,
} from '@chakra-ui/react';

const MainPanel = (
  {
    variant = 'default',
    children,
    ...rest
  }: {
    variant?: string;
    children: React.ReactNode;
  } & ChakraProps,
) => {
  const styles = useStyleConfig('MainPanel', {
    variant,
  });

  return (
    <Box
      __css={styles}
      as="section"
      h={'calc(100vh - 75px)'}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default MainPanel;
