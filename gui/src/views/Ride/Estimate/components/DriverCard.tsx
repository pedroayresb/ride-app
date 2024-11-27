import DriverPhoto from '../../../../components/DriverPhoto';
import {
  Flex,
  Tooltip,
  // Button,
  useColorMode,
} from '@chakra-ui/react';
import {
  memo,
} from 'react';
import {
  IDriver,
} from '../../../../interfaces/driver.interface';
import DriverProfile from './DriverProfile';
import DriverBasicInfo from './DriverBasicInfo';

function DriverCard({
  id,
  name,
  description,
  vehicle,
  review,
  value,
  distance,
}: IDriver & {
  distance: number;
}) {
  const {
    colorMode,
  } = useColorMode();

  return (
    <Tooltip
      label={
        <DriverProfile distanceMeters={distance}
          id={id}
          name={name}
          description={description}
          vehicle={vehicle}
          review={review}
          value={value}
        />
      }
      placement="bottom"
      hasArrow
    >
      <Flex
        flexDirection={'column'}
        gap={2}
        w="min-content"
        h="100%"
        alignItems="center"
        p={2}
        justifyContent="justify"
        cursor="pointer"
      >
        <>
          <DriverPhoto
            driverId={id}
            driverName={name}
            borderRadius={8}
            width="10rem"
            height="10rem"
            objectFit={'scale-down'}
            border="1px solid gray"
            boxShadow={`0 20px 27px 0 ${
              colorMode === 'light' ?
                'rgb(0 0 0 / 5%)' :
                'rgb(0 0 0 / 70%)'
            }`}
          />
          <DriverBasicInfo
            name={name}
            review={review}
            value={value}
          />
        </>
      </Flex>
    </Tooltip>
  );
}

export default memo(DriverCard);
