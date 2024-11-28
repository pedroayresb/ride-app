import {
  Flex,
} from '@chakra-ui/react';
import {
  memo,
  useContext,
  useEffect,
} from 'react';

import Configurator from './components/Configurator';
import Navbar from './components/Navbar';

import {
  Outlet,
} from 'react-router';

import MainPanel from './components/MainPanel';

import EstimateContext from '../../contexts/EstimateContext';

import {
  useNavigate,
} from 'react-router';

const Ride = memo(() => {
  const {
    customerId,
  } = useContext(EstimateContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!customerId) navigate('/ride');
  }, [ customerId, navigate ]);

  return (
    <Flex
      direction="column"
      w="100vw"
      h="100vh"
      overflow="hidden"
    >
      <Flex
        direction="row"
        w="100%"
        justifyContent={'space-between'}
        h="min-content"
      >
        <Navbar />
        <Configurator />
      </Flex>
      <MainPanel
        variant="default"
        px={2}
      >
        <Outlet />
      </MainPanel>
    </Flex>
  );
});

export default Ride;
