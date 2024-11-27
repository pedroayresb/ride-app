import {
  Flex,
  FlexProps,
} from '@chakra-ui/react';
import {
  HiPlusSm,
} from 'react-icons/hi';

export default function DeleteButton({
  onClick,
  fontSize = '20px',
  ...props
}: {
  onClick: () => void;
  fontSize?: string;
} & FlexProps) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bg="red.500"
      cursor="pointer"
      borderRadius="999px"
      h="fit-content"
      w="fit-content"
      {...props}
      onClick={onClick}
    >
      <HiPlusSm color="white" fontSize={fontSize} transform="rotate(45)" />
    </Flex>
  );
}
