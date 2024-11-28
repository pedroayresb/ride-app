import {
  Card,
  Text,
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import {
  useContext,
  useEffect,
  useState,
} from 'react';
import EstimateContext from '../../../contexts/EstimateContext';
import Styles from '../../../assets/Styles';
import rideApi from '../../../services/ride.api';
import Errors from '../../../assets/errors';
import {
  AxiosError,
} from 'axios';
import {
  useQuery,
} from '@tanstack/react-query';
import SuspenseComponent from '../../../components/SuspenseComponent';
import Select from '../../../components/Select';
import DriverPhoto from '../../../components/DriverPhoto';
import convertSeconds from '../../../utils/convertSeconds';
import dayjs from 'dayjs';

const {
  getCustomerRides,
} = rideApi;

export default function History() {
  const {
    customerId,
  } = useContext(EstimateContext);
  const styles = Styles();
  const ERRORS = Errors();

  const [ driver, setDriver ] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [ noRides, setNoRides ] = useState(false);

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    retry: 1,
    queryKey: [
      'customerRides',
      customerId,
      driver?.value,
    ],
    queryFn: async() => {
      const customerRides = await getCustomerRides(String(customerId), driver ? String(driver.value) : undefined);

      return customerRides;
    },
  });

  useEffect(() => {
    if (error) {
      const {
        response,
      } = error as AxiosError<{
        error_code: string;
        message: string;
      }>;

      if (response) {
        if ((response.data.error_code as keyof typeof ERRORS) === 'NO_RIDES_FOUND') {
          setNoRides(true);
        }

        ERRORS[
          response.data.error_code as keyof typeof ERRORS
        ]();

        return;
      }

      ERRORS.INTERNAL_SERVER_ERROR();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (noRides) {
      if (data?.rides.length) {
        setNoRides(false);
      }
    }
  }, [ data, noRides ]);

  return (
    <Card
      p={2}
      gap={2}
      h="100%"
      variant="panel"
    >
      <Flex
        flexDirection={{
          base: 'column',
          md: 'row',
        }}
        w="100%"
        gap={2}
        alignContent={'center'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >

        <Text
          fontSize="6xl"
          fontWeight="bold"
        >
          Histórico
        </Text>
        <Flex
          flexDirection={'column'}
          w={
            {
              base: '100%',
              md: '50%',
            }
          }
        >
          <Text
            fontSize="md"
          >
            Selecione o motorista:
          </Text>
          <Box
            w="100%"
          >

            <Select
              onChange={event => {
                if (!event || !event.value) {
                  setDriver(null);
                }
                setDriver(event);
              }}
              value={driver}
              isClearable
              options={[
                {
                  label: 'Homer Simpson',
                  value: '1',
                },
                {
                  label: 'Dominic Toretto',
                  value: '2',
                },
                {
                  label: 'James Bond',
                  value: '3',
                },
              ]}
            />
          </Box>
        </Flex>
      </Flex>
      <SuspenseComponent loading={isLoading} error={
        noRides && error ?
          null :
          error
      }>
        <TableContainer
          maxH="100%"
          overflowY="scroll"
        >
          <Table>
            <Thead
              bg={styles.bgPage}
              position={'sticky'}
              top={0}
              zIndex={1}
            >
              <Tr>
                <Th>Data</Th>
                <Th>Motorista</Th>
                <Th>Origem</Th>
                <Th>Destino</Th>
                <Th>Duração</Th>
                <Th>Chegada</Th>
                <Th>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!noRides && data?.rides.map((ride, index) => {
                return (
                  <Tr
                    key={index}
                    gap={2}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    w="100%"
                    bg={index % 2 === 0 ? styles.bgPage : styles.bgModal}
                  >
                    <Td>
                      <Text>
                        {new Date(ride.date).toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          timeZone: 'Brazil/East',
                        })}
                      </Text>
                    </Td>
                    <Td>
                      <Flex
                        flexDirection="row"
                        alignItems="center"
                        gap={2}
                      >
                        <DriverPhoto
                          driverId={ride.driver.id}
                          driverName={ride.driver.name}
                          borderRadius={999}
                          width="3rem"
                          height="3rem"
                          objectFit={'scale-down'}
                          border="1px solid gray"
                        />
                        {ride.driver.name}
                      </Flex>
                    </Td>
                    <Td>
                      {ride.origin}
                    </Td>
                    <Td>
                      {ride.destination}
                    </Td>
                    <Td>
                      {convertSeconds(ride.duration)}
                    </Td>
                    <Td>
                      {dayjs()
                        .add(Number(ride.duration.split('s')[0]), 'second')
                        .format('DD/MM/YYYY, HH:mm:ss')}
                    </Td>
                    <Td>
                      {ride.value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        {noRides &&
          <Text
            p={2}
            gap={2}
            alignContent={'center'}
            alignItems={'center'}
            justifyContent={'center'}
            w="100%"
            bg={styles.bgPage}
            fontSize="lg"
            fontWeight="bold"
            textAlign={'center'}
          >
            Nenhum registro encontrado.
          </Text>
        }
      </SuspenseComponent>
    </Card>
  );
}
