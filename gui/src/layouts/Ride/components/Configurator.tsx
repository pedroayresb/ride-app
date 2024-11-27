// libs
import {
  Button,
  Flex,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import {
  MdOutlineLightbulb,
  MdLightbulb,
} from 'react-icons/md';
import EstimateContext from '../../../contexts/EstimateContext';
import {
  useContext,
} from 'react';

export default function Configurator() {
  const {
    colorMode,
    toggleColorMode,
  } = useColorMode();

  const {
    customerId,
  } = useContext(EstimateContext);

  return (
    <Flex
      flexDirection="row"
      align={'center'}
      justify={'center'}
      gap={2}
    >
      {customerId && <Text>CLIENTE {customerId}</Text>}
      <Button onClick={toggleColorMode} data-testid="theme-button">
        {colorMode === 'light' ?
          <MdOutlineLightbulb /> :
          <MdLightbulb />
        }
      </Button>
    </Flex>
  );
}
