import {
  APIProvider,
  Map,
  Marker,
} from '@vis.gl/react-google-maps';
import EstimateContext from '../../../../contexts/EstimateContext';
import {
  useContext,
} from 'react';
import Directions from './Directions';
import {
  useColorMode,
} from '@chakra-ui/react';

export default function MapView() {
  const {
    origin,
    destination,
  } = useContext(EstimateContext);

  const {
    colorMode,
  } = useColorMode();

  return (
    <APIProvider
      apiKey={'AIzaSyBpjTp6qcj-qYoALxtlrZDKMPQAeKIao38'}
    >
      <Map
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
        }}
        defaultCenter={
          {
            lat: (origin.latitude + destination.latitude) / 2,
            lng: (origin.longitude + destination.longitude) / 2,
          }
        }
        defaultZoom={1}
        minZoom={1}
        maxZoom={20}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        colorScheme={
          colorMode === 'light' ?
            'LIGHT' :
            'DARK'
        }
      >
        <Marker
          position={{
            lat: origin.latitude,
            lng: origin.longitude,
          }}
        />
        <Marker
          position={
            {
              lat: destination.latitude,
              lng: destination.longitude,
            }
          }
        />
        <Directions />
      </Map>
    </APIProvider>
  );
}
