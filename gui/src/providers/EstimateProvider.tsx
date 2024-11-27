import React, {
  useState, useMemo, memo,
} from 'react';
import EstimateContext from '../contexts/EstimateContext';
import {
  IDriver,
} from '../interfaces/driver.interface';
import {
  ILocation,
  RouteReponse,
} from '../interfaces/Response.interface';

function EstimateProvider({
  children,
}: React.PropsWithChildren) {
  const [ customerId, setCustomerId ] = useState<number | null>(null);
  const [ options, setOptions ] = useState<IDriver[]>([]);
  const [ origin, setOrigin ] = useState<ILocation>({
    latitude: 0,
    longitude: 0,
  });
  const [ originString, setOriginString ] = useState<string>('');
  const [ destinationString, setDestinationString ] = useState<string>('');
  const [ destination, setDestination ] = useState<ILocation>({
    latitude: 0,
    longitude: 0,
  });
  const [ distance, setDistance ] = useState<number>(0);
  const [ duration, setDuration ] = useState<string>('');
  const [ routeResponse, setRouteResponse ] = useState<RouteReponse>({
    distanceMeters: 0,
    duration: '',
    polyline: {
      encodedPolyline: '',
    },
  });

  const value = useMemo(() => {
    return {
      customerId,
      setCustomerId: (id: number | null) => {
        setCustomerId(id);
      },
      options,
      setOptions: (options: IDriver[]) => {
        setOptions(options);
      },
      origin,
      setOrigin: (origin: ILocation) => {
        setOrigin(origin);
      },
      originString,
      setOriginString: (originString: string) => {
        setOriginString(originString);
      },
      destination,
      setDestination: (destination: ILocation) => {
        setDestination(destination);
      },
      destinationString,
      setDestinationString: (destinationString: string) => {
        setDestinationString(destinationString);
      },
      distance,
      setDistance: (distance: number) => {
        setDistance(distance);
      },
      duration,
      setDuration: (duration: string) => {
        setDuration(duration);
      },
      routeResponse,
      setRouteResponse: (routeResponse: RouteReponse) => {
        setRouteResponse(routeResponse);
      },
    };
  }, [
    customerId,
    options,
    origin,
    originString,
    destination,
    destinationString,
    distance,
    duration,
    routeResponse,
  ]);

  return <EstimateContext.Provider value={value}>{children}</EstimateContext.Provider>;
}

export default memo(EstimateProvider);
