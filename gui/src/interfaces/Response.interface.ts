import {
  IDriver,
} from './driver.interface';
import {
  IRide,
} from './ride.interface';

export type RouteReponse = {
  distanceMeters: number;
  duration: string;
  polyline: {
    encodedPolyline: string;
  };
};

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IEstimateResponse {
  origin: ILocation;
  destination: ILocation;
  distance: number;
  duration: string;
  options: IDriver[];
  routeResponse: RouteReponse;
}

export interface ICustomerRidesResponse {
  customer_id: string;
  rides: Omit<IRide, 'customerId'>[];
}

export interface IConfirmResponse {
  success: boolean;
}
