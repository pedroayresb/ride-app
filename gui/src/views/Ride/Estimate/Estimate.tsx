import {
  Button,
  Flex,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
} from '@chakra-ui/react';
import Card from '../../../components/Card';
import {
  useContext,
  useState,
} from 'react';
import EstimateContext from '../../../contexts/EstimateContext';
import DriverCard from './components/DriverCard';
import Styles from '../../../assets/Styles';
import rideApi from '../../../services/ride.api';
import Errors from '../../../assets/errors';
import LoadingModal from '../../../components/LoadingModal';
import {
  AxiosError,
} from 'axios';
import {
  useNavigate,
} from 'react-router';
import MapView from './components/MapView';
import convertSeconds from '../../../utils/convertSeconds';
import dayjs from 'dayjs';

const {
  confirmRide,
} = rideApi;

export default function Estimate() {
  const {
    options,
    distance,
    customerId,
    originString,
    duration,
    destinationString,
  } = useContext(EstimateContext);

  const [ isLoading, setIsLoading ] = useState(false);

  const styles = Styles();
  const ERRORS = Errors();

  const navigate = useNavigate();

  return <Card
    p={2}
    overflowY="scroll"
    variant="panel"
    alignItems={'space-between'}
    justifyContent={'space-evenly'}
    flexDirection={{
      base: 'column',
      md: 'row',
    }}

  >
    <Flex
      flexDirection="column"
      align={'center'}
      justify={'center'}
      gap={2}
      w="100%"
    >
      <Text
        fontSize="4xl"
        color={styles.textColor}
      >
        Percurso:
      </Text>
      <MapView />
      <Grid
        templateColumns="repeat(5, auto)"
        gap={2}
        w="100%"
      >
        <Stat>
          <StatLabel>Origem:</StatLabel>
          <StatNumber>{originString}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Destino:</StatLabel>
          <StatNumber>{destinationString}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Distância:</StatLabel>
          <StatNumber>{(distance / 1000).toLocaleString('pt-BR', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}</StatNumber>
          <StatHelpText>km</StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Duração:</StatLabel>
          <StatNumber>{convertSeconds(duration)}</StatNumber>
          <StatHelpText>min</StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Previsão de chegada</StatLabel>
          <StatNumber>{dayjs().add(Number(duration.split('s')[0]), 'second')
            .format('HH:mm')}</StatNumber>
        </Stat>

      </Grid>
    </Flex>
    <Flex
      flexDirection="column"
      gap={2}
      w="100%"
    >
      <Text
        fontSize="4xl"
        color={styles.textColor}
        textAlign={'center'}
      >
        Motoristas disponíveis:
      </Text>
      <Flex
        flexDirection={{
          base: 'column',
          md: 'row',
        } }
        gap={2}
      >

        {options.map((option, index) => {
          return (
            <Flex
              key={index}
              flexDirection="column"
              align={'center'}
              justify={'center'}
              h="max-content"
            >
              <DriverCard
                key={index}
                distance={distance}
                {...option}
              />
              <Button
                color={styles.textColor}
                bg={styles.green500}
                onClick={async() => {
                  try {
                    setIsLoading(true);
                    await confirmRide({
                      customer_id: String(customerId),
                      destination: destinationString,
                      origin: originString,
                      driver: {
                        id: option.id,
                        name: option.name,
                      },
                      distance,
                      duration,
                      value: option.value,
                    });

                    navigate('/ride/history');
                  } catch (error: unknown) {
                    console.log(error);
                    const {
                      response,
                    } = error as AxiosError<{
                      error_code: string;
                      message: string;
                    }>;

                    if (response) {
                      ERRORS[
                        response.data.error_code as keyof typeof ERRORS
                      ]();

                      return;
                    }

                    ERRORS.INTERNAL_SERVER_ERROR();
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                Escolher
              </Button>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
    <LoadingModal
      isOpen={isLoading}
    />
  </Card>;
}