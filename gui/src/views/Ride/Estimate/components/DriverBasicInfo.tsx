import {
  Text,
  Flex,
} from '@chakra-ui/react';
import {
  memo,
} from 'react';
import {
  IDriver,
} from '../../../../interfaces/driver.interface';
import Stars from '../../../../components/Stars';
import {
  motion,
} from 'framer-motion';

function DriverBasicInfo({
  name,
  review,
  value,
}: Pick<IDriver, 'name' | 'review' | 'value'>) {
  return (
    <Flex
      position={'absolute'}
      gap={1}
      as={motion.div}
      whileHover={{
        opacity: 0,
      }}
      flexDirection={'column'}
      width="10rem"
      height="10rem"
      alignItems="center"
      p={1}
      zIndex={1}
      justifyContent="space-around"
      // glass like effect
      borderRadius="8px"
      backdropFilter={'blur(20px)'}
      bg="linear-gradient(112.83deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0) 110.84%)"
      filter="drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
    >
      <Stars
        value={review.rating}
        width="7rem"
      />
      <Text
        fontSize="lg"
        fontWeight="bold"
        textAlign="center"
      >
        {name}
      </Text>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
      >
        {`${value
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
        }`}
      </Text>
    </Flex>
  );
}

export default memo(DriverBasicInfo);
