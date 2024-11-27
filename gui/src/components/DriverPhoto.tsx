import {
  Box,
} from '@chakra-ui/react';
import {
  motion,
} from 'framer-motion';
import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
} from 'react';

export default function DriverPhoto({
  driverId,
  driverName,
  ...props
}: {
  driverId: number;
  driverName: string;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>['style']) {
  return (
    <Box
      bg="#7c7c7c"
      as={motion.div}
      exit={{
        opacity: 0.2,
      }}
      whileHover={{
        opacity: 1,
      }}
      style={{
        ...props,
      }}
    >
      <img
        src={`http://localhost:8080/static/avatars/${driverId}.png`}
        alt={driverName}
        style={{
          ...props,
        }}
      />
    </Box>
  );
}
