import CarPhoto from '../../../../components/CarPhoto';
import {
  Text,
  Flex,
  Divider,
} from '@chakra-ui/react';
import {
  memo,
} from 'react';
import {
  IDriver,
} from '../../../../interfaces/driver.interface';
import Styles from '../../../../assets/Styles';
import Stars from '../../../../components/Stars';

function DriverProfile({
  id,
  name,
  description,
  review,
  value,
  vehicle,
  distanceMeters,
}: IDriver & { distanceMeters: number }) {
  const styles = Styles();

  return (
    <Flex
      flexDirection={'column'}
      gap={2}
      justify={'center'}
      align={'center'}
      p={2}
      w="max-content"
      maxW="80vw"
      borderRadius={8}
      bg={styles.tooltipBgColor}
      zIndex={1}
      top={'15rem'}
    >
      <Flex
        flexDirection={'row'}
        gap={2}
        w="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex
          flexDirection={'column'}
          w="fit-content"
          alignItems="center"
        >
          <Text
            fontSize="lg"
          >
            {name}
          </Text>
          <Stars value={review.rating} width="7rem" />
        </Flex>
        <Flex
          flexDirection={'column'}
          w="fit-content"
          alignItems="center"
        >
          <Text
            fontSize="lg"
            textAlign="center"
          >
            {`${value
              .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            }`}
          </Text>
          <Text
            fontSize="sm"
            textAlign="center"
          >
            {`${(distanceMeters / 1000)
              .toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}km a ${(value / (distanceMeters / 1000))
              .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}/km`}
          </Text>
        </Flex>
      </Flex>
      <Divider />
      <Flex
        flexDirection={'row'}
        justify={'space-around'}
        w="100%"
      >
        <Flex
          flexDirection={'column'}
          gap={2}
          width="15rem"
        >
          <Text
            fontSize="md"
            fontWeight={'bold'}
          >
            Mensagem do motorista:
          </Text>
          <Text
            fontSize="sm"
          >
            {description}
          </Text>
        </Flex>
        <Flex
          flexDirection={'column'}
          gap={2}
          w="min-content"
          alignItems="center"
        >
          <CarPhoto
            driverId={id}
            carName={vehicle}
            borderRadius={8}
            width="10rem"
            height="10rem"
            objectFit={'scale-down'}
            border="1px solid gray"
            transition="opacity position 0.5s"
          />
          <Text
            fontSize="sm"
            textAlign="center"
          >
            {vehicle}
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexDirection={'column'}
        gap={2}
        w="20rem"
        alignItems="center"
      >
        <Text
          fontWeight={'bold'}
        >
          Avaliação:
        </Text>
        <Text
          fontSize="sm"
          fontWeight="normal"
        >
          {review.comment}
        </Text>
      </Flex>
    </Flex>
  );
}

export default memo(DriverProfile);
