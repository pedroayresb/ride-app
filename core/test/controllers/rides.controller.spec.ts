import {
  ICustomerRidesResponse,
  IEstimateResponse,
} from '../../src/interfaces/Response.interface';
import {
  expect,
} from 'chai';
import sinon from 'sinon';
import {
  Request, Response,
} from 'express';
import RidesController from '../../src/controllers/rides.controller';
import RidesService from '../../src/services/rides.service';
import Sinon from 'sinon';
import DatabaseMock from '../mocks/databaseMock';

const databaseMock = new DatabaseMock();

describe('RidesController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Sinon.SinonStub;
  let statusStub: sinon.SinonStub;
  let jsonStub: sinon.SinonStub;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
    statusStub = res.status as sinon.SinonStub;
    jsonStub = res.json as sinon.SinonStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getCustomerRides', () => {
    it('should return customer rides', async() => {
      req.params = {
        customer_id: '1',
      };
      req.query = {
        driver_id: '2',
      };
      const rides: ICustomerRidesResponse = {
        customer_id: '1',
        rides: databaseMock.rides.filter(ride => ride.customerId === 1 && ride.driver.id === 2),
      };
      sinon.stub(RidesService, 'findCustomerRides').resolves(rides);

      await RidesController.getCustomerRides(
        req as unknown as Request<
          {
            customer_id: number;
          },
          ICustomerRidesResponse,
          null,
          {
            driver_id?: string | number;
          }
        >,
        res as Response,
        next,
      );

      expect(statusStub.calledWith(200)).to.equal(true);
      expect(jsonStub.calledWith(rides)).to.equal(true);
    });

    it('should call next with error on failure', async() => {
      req.params = {
        customer_id: '1',
      };
      req.query = {
        driver_id: '2',
      };
      const error = new Error('Something went wrong');
      sinon.stub(RidesService, 'findCustomerRides').rejects(error);

      await RidesController.getCustomerRides(req as unknown as Request<
        {
          customer_id: number;
        },
        ICustomerRidesResponse,
        null,
        {
          driver_id?: string | number;
        }
      >, res as Response, next);

      expect(next.calledWith(error)).to.equal(true);
    });
  });

  describe('confirmRide', () => {
    it('should confirm a ride', async() => {
      req.body = {
        customer_id: 1,
        origin: 'A',
        destination: 'B',
        distance: 10,
        duration: 20,
        driver: 'Driver',
        value: 100,
      };
      sinon.stub(RidesService, 'createRide').resolves();

      await RidesController.confirmRide(req as Request, res as Response, next);

      expect(statusStub.calledWith(200)).to.equal(true);
      expect(jsonStub.calledWith({
        success: true,
      })).to.equal(true);
    });

    it('should call next with error on failure', async() => {
      req.body = {
        customer_id: 1,
        origin: 'A',
        destination: 'B',
        distance: 10,
        duration: 20,
        driver: 'Driver',
        value: 100,
      };
      const error = new Error('Something went wrong');
      sinon.stub(RidesService, 'createRide').rejects(error);

      await RidesController.confirmRide(req as Request, res as Response, next);

      expect(next.calledWith(error)).to.equal(true);
    });
  });

  describe('estimateRide', () => {
    it('should return ride estimate', async() => {
      req.body = {
        customer_id: 1,
        origin: 'A',
        destination: 'B',
      };
      const estimate: IEstimateResponse = {
        destination: {
          latitude: 10,
          longitude: 20,
        },
        distance: 10,
        duration: '20',
        options: databaseMock.drivers,
        origin: {
          latitude: 30,
          longitude: 40,
        },
        routeResponse: {
          duration: '20',
          distanceMeters: 10,
          polyline: {
            encodedPolyline: 'encodedPolyline',
          },
        },
      };
      sinon.stub(RidesService, 'estimateRide').resolves(estimate);

      await RidesController.estimateRide(req as Request, res as Response, next);

      expect(statusStub.calledWith(200)).to.equal(true);
      expect(jsonStub.calledWith(estimate)).to.equal(true);
    });

    it('should call next with error on failure', async() => {
      req.body = {
        customer_id: 1,
        origin: 'A',
        destination: 'B',
      };
      const error = new Error('Something went wrong');
      sinon.stub(RidesService, 'estimateRide').rejects(error);

      await RidesController.estimateRide(req as Request, res as Response, next);

      expect(next.calledWith(error)).to.equal(true);
    });
  });
});
