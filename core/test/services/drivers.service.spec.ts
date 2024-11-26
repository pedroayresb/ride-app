import {
  expect,
} from 'chai';
import sinon from 'sinon';
import DriversRepository from '../../src/repositories/drivers.repository';
import DriversService from '../../src/services/drivers.service';
import {
  faker,
} from '@faker-js/faker/locale/pt_BR';
import {
  DriverModel,
} from '../../src/models';
import DatabaseMock from '../mocks/databaseMock';

const databaseMock = new DatabaseMock();

describe('Drivers Service', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('findDriver', () => {
    it('should return a driver by ID', async() => {
      const driver = faker.helpers.arrayElement(databaseMock.drivers);

      const driverDocument = new DriverModel(driver);

      const findByIdStub = sinon.stub(DriversRepository, 'findById').resolves(driverDocument);

      const result = await DriversService.findDriver(driver.id);

      expect(findByIdStub.calledWith(driver.id)).to.equal(true);
      expect(result).to.deep.equal(driverDocument);
    });

    it('should throw INVALID_DRIVER if no driver is found', async() => {
      const driverId = 4;

      const findByIdStub = sinon.stub(DriversRepository, 'findById').resolves(null);

      try {
        await DriversService.findDriver(driverId);
      } catch (error) {
        expect(findByIdStub.calledWith(driverId)).to.equal(true);
        expect((error as Error).message).to.equal('INVALID_DRIVER');
      }
    });
  });

  describe('findAvailableDrivers', () => {
    it('should return available drivers based on minimal meters. Converts to km', async() => {
      const minimalMeters = 6000;

      const drivers = databaseMock.drivers.filter(driver => driver.minimumKm < minimalMeters / 1000);

      const driversModel = drivers.map(driver => new DriverModel(driver));

      const findStub = sinon.stub(DriversRepository, 'findAvailableDrivers').resolves(driversModel);

      const result = await DriversService.findAvailableDrivers(minimalMeters);

      expect(findStub.calledWith(minimalMeters)).to.equal(true);
      expect(result).to.deep.equal(driversModel);
    });
  });
});
