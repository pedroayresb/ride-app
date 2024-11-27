import {
  Box,
} from '@chakra-ui/react';
import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
} from 'react';

export default function CarPhoto({
  driverId,
  carName,
  ...props
}: {
  driverId: number;
  carName: string;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>['style']) {
  return (
    <Box
      bg="white"
      style={{
        ...props,
      }}
    >
      <img
        src={`http://localhost:8080/static/cars/${driverId}.png`}
        alt={carName}
        style={{
          ...props,
        }}
      />
    </Box>
  );
}
