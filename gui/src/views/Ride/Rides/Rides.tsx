import {
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  Icon,
  InputLeftAddon,
} from '@chakra-ui/react';
import {
  Formik,
} from 'formik';
import Styles from '../../../assets/Styles';
import {
  useState,
  useContext,
} from 'react';
import rideApi from '../../../services/ride.api';
import {
  AxiosError,
} from 'axios';
import Errors from '../../../assets/errors';
import EstimateContext from '../../../contexts/EstimateContext';
import {
  useNavigate,
} from 'react-router';
import {
  MdPersonSearch,
  MdPersonPin,
  MdLocationPin,
} from 'react-icons/md';
import '../../../assets/css/ridesHero.css';

const {
  estimateRide,
} = rideApi;

export default function Rides() {
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();
  const {
    setCustomerId,
    setOptions,
    setOrigin,
    setDestination,
    setDistance,
    setDuration,
    setRouteResponse,
    setOriginString,
    setDestinationString,
  } = useContext(EstimateContext);

  const styles = Styles();
  const ERRORS = Errors();

  return (
    <>
      <Flex
        flexDirection={'row'}
        p={2}
        overflowY="scroll"
        justifyContent="center"
        alignItems="center"
        h="80%"
        mx="auto"
        my="auto"
        borderRadius="8px"
        border="1px solid white"
        className="rides-hero"
        position={'absolute'}
        w={{
          base: '100%',
          md: '80%',
        }}
      />
      <Flex
        flexDirection={'row'}
        zIndex={1}
        p={2}
        overflowY="scroll"
        justifyContent="center"
        alignItems="center"
        h="100%"
        position={'absolute'}
        marginLeft={'auto'}
        marginRight={'auto'}
        left={0}
        right={0}
        textAlign={'center'}
      >
        <Formik
          initialValues={{
            origin: '',
            destination: '',
            customer_id: '',
          }}
          onSubmit={async({
            origin,
            destination,
            customer_id,
          }) => {
            try {
              setIsLoading(true);
              const estimate = await estimateRide({
                origin,
                destination,
                customer_id,
              });

              setCustomerId(Number(customer_id));
              setOptions(estimate.options);
              setOrigin(estimate.origin);
              setDestination(estimate.destination);
              setOriginString(origin);
              setDestinationString(destination);
              setDistance(estimate.distance);
              setDuration(estimate.duration);
              setRouteResponse(estimate.routeResponse);

              navigate('/ride/estimate');
            } catch (error: unknown) {
              const {
                response,
              } = error as AxiosError<{
                error_code: string;
                error_description: string;
              }>;

              if (response) {
                ERRORS[
                  response.data.error_description as keyof typeof ERRORS
                ]();

                return;
              }

              ERRORS.INTERNAL_SERVER_ERROR();
            } finally {
              setIsLoading(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Flex
                  direction="column"
                  background="transparent"
                  borderRadius="8px"
                  w="fit-content"
                  gap={10}
                  p={10}
                  bg={styles.bgModal}
                  boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                >
                  <Flex
                    flexDirection={'column'}
                    gap={10}
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <FormControl>
                      <FormLabel fontSize="sm" fontWeight="normal">
                        ID do Cliente
                      </FormLabel>
                      <InputGroup>
                        <InputLeftAddon>
                          <Icon as={MdPersonSearch} />
                        </InputLeftAddon>
                        <Input
                          fontSize="sm"
                          borderRadius="8px"
                          isInvalid={!!(errors.customer_id && touched.customer_id && values.customer_id.length > 0)}
                          size="md"
                          name="customer_id"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.customer_id}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="sm" fontWeight="normal">
                        Origem
                      </FormLabel>
                      <InputGroup>
                        <InputLeftAddon>
                          <Icon as={MdPersonPin} />
                        </InputLeftAddon>
                        <Input
                          fontSize="sm"
                          borderRadius="8px"
                          type="origin"
                          size="md"
                          isInvalid={!!(errors.origin && touched.origin && values.origin.length > 0)}
                          name="origin"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.origin}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="sm" fontWeight="normal">
                        Destino
                      </FormLabel>
                      <InputGroup>
                        <InputLeftAddon>
                          <Icon as={MdLocationPin} />
                        </InputLeftAddon>
                        <Input
                          fontSize="sm"
                          borderRadius="8px"
                          isInvalid={!!(errors.destination && touched.destination && values.destination.length > 0)}
                          size="md"
                          name="destination"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.destination}
                        />
                      </InputGroup>
                    </FormControl>
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      bg="teal.300"
                      fontSize="sm"
                      color="white"
                      fontWeight="bold"
                      w="100%"
                      h="48px"
                      data-testid="login-button"
                      _hover={{
                        bg: styles.colorStatus,
                      }}
                      _active={{
                        bg: styles.confirmButton,
                      }}
                    >
                      Confirmar
                    </Button>
                  </Flex>
                </Flex>
              </form>
            );
          }
          }
        </Formik>
      </Flex>
    </>

  );
}
