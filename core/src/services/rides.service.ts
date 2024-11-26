import {
  IRide,
} from './../interfaces/ride.interface';
import DriversService from './drivers.service';
import CustomersService from './customer.service';
import RidesRepository from '../repositories/rides.repository';
import googleFns from '../utils/google';

async function findCustomerRides(
  customerId: number,
  driverId?: number,
) {
  if (driverId) {
    await DriversService.findDriver(driverId);
  }

  return RidesRepository.findCustomerRides(customerId, driverId);
}

async function createRide(ride: Omit<IRide, 'id'>) {
  const {
    customerId,
    driver,
    distance,
  } = ride;

  const {
    id,
  } = driver;

  const [driverData] = await Promise.all([
    DriversService.findDriver(id as number),
    CustomersService.findCustomerOrInsert({
      id: customerId as number,
      name: null,
      email: null,
      password: null,
    }),
  ]);

  const {
    minimumKm,
  } = driverData;

  if (distance < minimumKm) {
    throw new Error('INVALID_DISTANCE');
  }

  return RidesRepository.createRide(ride);
}

async function estimateRide(
  customerId: number,
  origin: string,
  destination: string,
) {
  const [ originLocation, destinationLocation ] = await Promise.all([
    googleFns.getLatLng(origin),
    googleFns.getLatLng(destination),
  ]);

  const route = await googleFns.getRoute(originLocation, destinationLocation);
  const {
    duration,
    distanceMeters,
  } = route;

  const options = await DriversService.findAvailableDrivers(distanceMeters);

  return {
    origin: {
      latitude: originLocation.lat(),
      longitude: originLocation.lng(),
    },
    destination: {
      latitude: destinationLocation.lat(),
      longitude: destinationLocation.lng(),
    },
    distance: distanceMeters,
    duration,
    options,
    routeResponse: route,
  };
}

const RidesService = {
  findCustomerRides,
  createRide,
  estimateRide,
};

export default RidesService;
