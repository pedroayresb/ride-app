import {
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {
  useEffect,
  useState,
  useContext,
} from 'react';
import EstimateContext from '../../../../contexts/EstimateContext';

export default function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');

  const {
    origin,
    destination,
    // routeResponse,
  } = useContext(EstimateContext);

  const [ directionsService, setDirectionsService ] = useState<google.maps.DirectionsService>();

  const [ directionsRenderer, setDirectionsRenderer ] = useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!routesLibrary || !map) {
      return;
    }

    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer());
  }, [ routesLibrary, map ]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) {
      return;
    }

    directionsService.route({
      origin: {
        lat: origin.latitude,
        lng: origin.longitude,
      },
      destination: {
        lat: destination.latitude,
        lng: destination.longitude,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
        directionsRenderer.setMap(map);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }, [
    directionsService,
    directionsRenderer,
    origin.latitude,
    origin.longitude,
    destination.latitude,
    destination.longitude,
    map,
  ]);

  return null;
}
