import {
  expect,
} from 'chai';
import sinon from 'sinon';
import {
  DriverModel,
} from '../../src/models';
import DriversRepository from '../../src/repositories/drivers.repository';
import {
  faker,
} from '@faker-js/faker/locale/pt_BR';
import DatabaseMock from '../mocks/databaseMock';

const databaseMock = new DatabaseMock();

describe('Drivers Repository', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('findById', () => {
    it('should return a driver by ID', async() => {
      const driver = faker.helpers.arrayElement(databaseMock.drivers);
      const findOneStub = sinon.stub(DriverModel, 'findOne').resolves(driver);

      const result = await DriversRepository.findById(driver.id);

      expect(findOneStub.calledOnce).to.equal(true);
      expect(findOneStub.calledWith({
        id: driver.id,
      })).to.equal(true);
      expect(result).to.deep.equal(driver);
    });

    it('should return null if no driver is found', async() => {
      const driverId = 4;

      const findOneStub = sinon.stub(DriverModel, 'findOne').resolves(null);

      const result = await DriversRepository.findById(driverId);

      expect(findOneStub.calledOnce).to.equal(true);
      expect(findOneStub.calledWith({
        id: driverId,
      })).to.equal(true);
      expect(result).to.equal(null);
    });
  });

  describe('findAvailableDrivers', () => {
    it('should return available drivers based on minimal meters. Converts to km', async() => {
      const minimalMeters = 6000;

      const drivers = databaseMock.drivers.filter(driver => driver.minimumKm < minimalMeters / 1000);

      const findStub = sinon.stub(DriverModel, 'aggregate').resolves(drivers);

      const result = await DriversRepository.findAvailableDrivers(minimalMeters);

      expect(findStub.calledOnce).to.equal(true);
      expect(findStub.calledWith([
        {
          $match: {
            minimumKm: {
              $lte: minimalMeters / 1000,
            },
          },
        },
        {
          $addFields: {
            value: {
              $multiply: [
                '$value',
                {
                  $divide: [ minimalMeters, 1000 ],
                },
              ],
            },
          },
        },
        {
          $sort: {
            value: 1,
          },
        },
      ],
      )).to.equal(true);
      expect(result).to.deep.equal(drivers);
    });
  });
});
