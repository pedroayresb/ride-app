import {
  DriverModel, RideModel,
} from './../../src/models/index';

import {
  expect,
} from 'chai';
import sinon from 'sinon';
import CustomersService from '../../src/services/customer.service';
import RidesService from '../../src/services/rides.service';
import RidesRepository from '../../src/repositories/rides.repository';
import {
  faker,
} from '@faker-js/faker/locale/pt_BR';
import {
  IRide,
} from '../../src/interfaces/ride.interface';
import DatabaseMock from '../mocks/databaseMock';
import DriversRepository from '../../src/repositories/drivers.repository';
import DriversService from '../../src/services/drivers.service';
import googleFns, {
  RouteReponse,
} from '../../src/utils/google';

const databaseMock = new DatabaseMock();

describe('Rides Service', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('findCustomerRides', () => {
    it('should return rides for a customer', async() => {
      const customer = faker.helpers.arrayElement(databaseMock.customers);

      const rides: IRide[] = databaseMock.rides.filter(ride => ride.customerId === customer.id);

      const findRidesByCustomerStub = sinon.stub(RidesRepository, 'findCustomerRides').resolves({
        customer_id: String(customer.id),
        rides,
      });

      const result = await RidesService.findCustomerRides(customer.id);

      expect(findRidesByCustomerStub.calledOnce).to.equal(true);
      expect(findRidesByCustomerStub.calledWith(customer.id)).to.equal(true);
      expect(result).to.deep.equal({
        customer_id: String(customer.id),
        rides,
      });
    });

    it('should return rides for a customer and driver', async() => {
      const customer = faker.helpers.arrayElement(databaseMock.customers);

      const rides: IRide[] = databaseMock
        .rides
        .filter(ride => ride.customerId === customer.id);

      const rideDriver = faker.helpers.arrayElement(rides.map(ride => ride.driver));

      const driver = databaseMock.drivers.find(driver => driver.id === rideDriver.id);

      const findDriverStub = sinon.stub(DriversRepository, 'findById').resolves(new DriverModel(driver));
      const findRidesByCustomerStub = sinon.stub(RidesRepository, 'findCustomerRides').resolves({
        customer_id: String(customer.id),
        rides,
      });

      const result = await RidesService.findCustomerRides(customer.id, driver!.id);

      expect(findDriverStub.calledWith(driver!.id)).to.equal(true);
      expect(findRidesByCustomerStub.calledWith(customer.id, driver!.id)).to.equal(true);
      expect(result).to.deep.equal({
        customer_id: String(customer.id),
        rides,
      });
    });

    it('should throw DRIVER_NOT_FOUND if driver is not found', async() => {
      const customer = faker.helpers.arrayElement(databaseMock.customers);
      const driverId = 4;

      const findDriverStub = sinon.stub(DriversRepository, 'findById').resolves(null);

      try {
        await RidesService.findCustomerRides(customer.id, driverId);
      } catch (error) {
        expect(findDriverStub.calledWith(driverId)).to.equal(true);
        expect((error as Error).message).to.equal('INVALID_DRIVER');
      }
    });
  });

  describe('createRide', () => {
    const driver = faker.helpers.arrayElement(databaseMock.drivers);

    it('should save a new ride', async() => {
      const ride: Omit<IRide, 'id'> = {
        date: new Date(),
        origin: 'A',
        destination: 'B',
        distance: 10,
        duration: '20',
        driver: {
          id: driver.id,
          name: driver.name,
        },
        value: 100,
        customerId: faker.helpers.arrayElement(databaseMock.customers).id,
      };

      const findDriverStub = sinon.stub(DriversService, 'findDriver').resolves(new DriverModel(driver));

      const findCustomerOrInsertStub = sinon.stub(CustomersService, 'findCustomerOrInsert');
      const saveRideStub = sinon.stub(RidesRepository, 'createRide').resolves(new RideModel(ride));

      await RidesService.createRide(ride);

      expect(findDriverStub.calledWith(ride.driver.id as number)).to.equal(true);
      expect(findCustomerOrInsertStub.calledWith({
        id: ride.customerId as number,
        name: null,
        email: null,
        password: null,
      })).to.equal(true);
      expect(saveRideStub.calledWith(ride)).to.equal(true);
    });

    it('should throw INVALID_DISTANCE if distance is less than minimumKm', async() => {
      const higherMinimunDriver = databaseMock.drivers.find(driver => driver.minimumKm > 2);

      const ride: Omit<IRide, 'id'> = {
        date: new Date(),
        origin: 'A',
        destination: 'B',
        distance: 1,
        duration: '20',
        driver: {
          id: driver.id,
          name: driver.name,
        },
        value: 100,
        customerId: faker.helpers.arrayElement(databaseMock.customers).id,
      };

      sinon.stub(DriversService, 'findDriver').resolves(new DriverModel(higherMinimunDriver));
      sinon.stub(CustomersService, 'findCustomerOrInsert');

      try {
        await RidesService.createRide(ride);
      } catch (error) {
        expect((error as Error).message).to.equal('INVALID_DISTANCE');
      }
    });
  });

  describe('estimateRide', () => {
    it('should return estimated ride', async() => {
      const origin = 'A';
      const destination = 'B';

      const originLocation = {
        lat: () => 10,
        lng: () => 20,
      } as google.maps.LatLng;

      const destinationLocation = {
        lat: () => 20,
        lng: () => 30,
      } as google.maps.LatLng;

      const route = {
        duration: '20',
        distanceMeters: 10000,
        polyline: {
          encodedPolyline: 'encodedPolyline',
        },
      } as RouteReponse;

      const findLatLngStub = sinon.stub(googleFns, 'getLatLng');
      const findRouteStub = sinon.stub(googleFns, 'getRoute');

      findLatLngStub.onFirstCall().resolves(originLocation);
      findLatLngStub.onSecondCall().resolves(destinationLocation);
      findRouteStub.resolves(route);

      const availableDriversStub = sinon
        .stub(DriversService, 'findAvailableDrivers')
        .resolves(databaseMock.drivers);

      const result = await RidesService.estimateRide(1, origin, destination);

      expect(findLatLngStub.calledTwice).to.equal(true);

      expect(findLatLngStub.firstCall.calledWith(origin)).to.equal(true);

      expect(findLatLngStub.secondCall.calledWith(destination)).to.equal(true);

      expect(findRouteStub.calledWith(originLocation, destinationLocation)).to.equal(true);

      expect(availableDriversStub.calledWith(route.distanceMeters)).to.equal(true);

      expect(result).to.deep.equal({
        origin: {
          latitude: 10,
          longitude: 20,
        },
        destination: {
          latitude: 20,
          longitude: 30,
        },
        distance: route.distanceMeters,
        duration: route.duration,
        options: databaseMock.drivers,
        routeResponse: route,
      });
    });
  });
});
