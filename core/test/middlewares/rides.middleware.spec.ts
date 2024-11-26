import {
  validateBodyCustomerId,
  validateBodyAddresses,
  validateParamCustomerId,
} from '../../src/middlewares/rides.middleware';
import type {
  Request, Response,
} from 'express';
import {
  expect,
} from 'chai';
import sinon from 'sinon';

describe('Rides Middleware', () => {
  describe('validateBodyCustomerId', () => {
    it('should throw NO_CUSTOMER_ID if customer_id is not provided', () => {
      const req = {
        body: {},
      } as Request<
        unknown,
        {
          customer_id?: string | null;
        }
      >;

      const res = {} as Response;

      const next = sinon.spy();

      expect(() => validateBodyCustomerId(req, res, next)).to.throw('NO_CUSTOMER_ID');
    });

    it('should set customer_id to a number if it is provided', () => {
      const req = {
        body: {
          customer_id: '1',
        },
      } as Request<
        unknown,
        {
          customer_id?: string | null;
        }
      >;

      const res = {} as Response;

      const next = sinon.spy();

      validateBodyCustomerId(req, res, next);

      expect(req.body.customer_id).to.equal(1);
    });
  });

  describe('validateBodyAddresses', () => {
    it('should throw NO_ORIGIN if origin is not provided', () => {
      const req = {
        body: {},
      } as Request<
        unknown,
        {
          origin?: string | null;
          destination?: string | null;
        }
      >;

      const res = {} as Response;

      const next = sinon.spy();

      expect(() => validateBodyAddresses(req, res, next)).to.throw('NO_ORIGIN');
    });

    it('should throw NO_DESTINATION if destination is not provided', () => {
      const req = {
        body: {
          origin: 'A',
        },
      } as Request<
        unknown,
        {
          origin?: string | null;
          destination?: string | null;
        }
      >;

      const res = {} as Response;

      const next = sinon.spy();

      expect(() => validateBodyAddresses(req, res, next)).to.throw('NO_DESTINATION');
    });

    it('should throw SAME_ORIGIN_DESTINATION if origin and destination are the same', () => {
      const req = {
        body: {
          origin: 'A',
          destination: 'A',
        },
      } as Request<
        unknown,
        {
          origin?: string | null;
          destination?: string | null;
        }
      >;

      const res = {} as Response;

      const next = sinon.spy();

      expect(() => validateBodyAddresses(req, res, next)).to.throw('SAME_ORIGIN_DESTINATION');
    });

    it('should call next if everything is correct', () => {
      const req = {
        body: {
          origin: 'A',
          destination: 'B',
        },
      } as Request<
        unknown,
        {
          origin?: string | null;
          destination?: string | null;
        }
      >;

      const res = {} as Response;

      const next = sinon.spy();

      expect(() => validateBodyAddresses(req, res, next)).to.not.throw();

      expect(next.called).to.equal(true);
    });
  });

  describe('validateParamCustomerId', () => {
    it('should throw NO_CUSTOMER_ID if customer_id is not provided', () => {
      const req = {
        params: {},
      } as Request<
        {
          customer_id?: string | number | null;
        }
      >;

      const res = {} as Response;

      const next = sinon.spy();

      expect(() => validateParamCustomerId(req, res, next)).to.throw('NO_CUSTOMER_ID');
    });

    it('should call next if everything is correct', () => {
      const req = {
        params: {
          customer_id: '1',
        },
      } as Request<
        {
          customer_id?: string | number | null;
        }
      >;

      const res = {} as Response;

      const next = sinon.spy();

      expect(() => validateParamCustomerId(req, res, next)).to.not.throw();

      expect(next.called).to.equal(true);
    });
  });
});
