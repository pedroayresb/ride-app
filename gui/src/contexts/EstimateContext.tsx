/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
} from 'react';
import {
  IDriver,
} from '../interfaces/driver.interface';
import {
  ILocation,
  RouteReponse,
} from '../interfaces/Response.interface';

/*
 * origin: ILocation;
 * destination: ILocation;
 * distance: number;
 * duration: string;
 * options: IDriver[];
 * routeResponse: RouteReponse;
 */

const defaultValues = {
  customerId: null,
  setCustomerId: (_id: number) => {},
  options: [],
  setOptions: (_options: IDriver[]) => {},
  origin: {
    latitude: 0,
    longitude: 0,
  },
  originString: '',
  setOrigin: (_origin: ILocation) => {},
  setOriginString: (_originString: string) => {},
  destination: {
    latitude: 0,
    longitude: 0,
  },
  destinationString: '',
  setDestination: (_destination: ILocation) => {},
  setDestinationString: (_destinationString: string) => {},
  distance: 0,
  setDistance: (_distance: number) => {},
  duration: '',
  setDuration: (_duration: string) => '',
  routeResponse: {
    distanceMeters: 0,
    duration: '',
    polyline: {
      encodedPolyline: '',
    },
  },
  setRouteResponse: (_routeResponse: RouteReponse) => {},
};

export type EstimateContextType = {
  customerId: number | null;
  setCustomerId: (id: number) => void;
  options: IDriver[];
  setOptions: (options: IDriver[]) => void;
  origin: ILocation;
  setOrigin: (origin: ILocation) => void;
  originString: string;
  setOriginString: (originString: string) => void;
  destination: ILocation;
  setDestination: (destination: ILocation) => void;
  destinationString: string;
  setDestinationString: (destinationString: string) => void;
  distance: number;
  setDistance: (distance: number) => void;
  duration: string;
  setDuration: (duration: string) => void;
  routeResponse: RouteReponse;
  setRouteResponse: (routeResponse: RouteReponse) => void;
};

const EstimateContext = createContext<EstimateContextType>(defaultValues);

export default EstimateContext;
