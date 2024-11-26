import {
  RideModel,
} from './../../src/models/index';
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  expect,
} from 'chai';
import sinon from 'sinon';
import RidesRepository from '../../src/repositories/rides.repository';
import {
  ICustomerRidesResponse,
} from '../../src/interfaces/Response.interface';
import {
  IRide,
} from '../../src/interfaces/ride.interface';
import DatabaseMock from '../mocks/databaseMock';
import {
  faker,
} from '@faker-js/faker/locale/pt_BR';

const databaseMock = new DatabaseMock();

describe('Rides Repository', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('findRidesByCustomer', () => {
    it('should return rides for a customer', async() => {
      const customer = faker.helpers.arrayElement(databaseMock.customers);

      const ridesResponse: ICustomerRidesResponse[] = [
        {
          customer_id: String(customer.id),
          rides: databaseMock.rides.filter(ride => ride.customerId === customer.id),
        },
      ];

      const aggregateStub = sinon.stub(RideModel, 'aggregate').resolves(ridesResponse);

      const result = await RidesRepository.findCustomerRides(customer.id);

      expect(aggregateStub.calledOnce).to.be.true;
      expect(result).to.deep.equal(ridesResponse[0]);
    });

    it('should return rides for a customer and driver', async() => {
      const customer = faker.helpers.arrayElement(databaseMock.customers);

      const rides = databaseMock.rides.filter(ride => ride.customerId === customer.id);

      const ridesDriver = faker.helpers.arrayElement(rides.map(ride => ride.driver.id));

      const driver = databaseMock.drivers.find(driver => driver.id === ridesDriver);

      const ridesResponse: ICustomerRidesResponse[] = [
        {
          customer_id: String(customer.id),
          rides: rides.filter(ride => ride.driver.id === driver!.id),
        },
      ];

      const aggregateStub = sinon.stub(RideModel, 'aggregate').resolves(ridesResponse);

      const result = await RidesRepository.findCustomerRides(customer.id, driver!.id);

      expect(aggregateStub.calledOnce).to.be.true;
      expect(result).to.deep.equal(ridesResponse[0]);
    });

    it('should throw NO_RIDES_FOUND if no rides are found', async() => {
      const customerId = 1;
      const aggregateStub = sinon.stub(RideModel, 'aggregate').resolves([]);

      try {
        await RidesRepository.findCustomerRides(customerId);
      } catch (error) {
        expect(aggregateStub.calledOnce).to.be.true;
        expect((error as Error).message).to.equal('NO_RIDES_FOUND');
      }
    });
  });

  describe('createRide', () => {
    it('should save a new ride', async() => {
      const driver = faker.helpers.arrayElement(databaseMock.drivers);

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
        customerId: 1,
      };

      const saveStub = sinon.stub(RideModel, 'create');
      await RidesRepository.createRide(ride);

      expect(saveStub.calledOnce).to.equal(true);
    });
  });
});
