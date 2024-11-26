import {
  expect,
} from 'chai';
import sinon, {
  SinonSpy,
} from 'sinon';
import error from '../../src/middlewares/error.middleware';
import ERRORS from '../../src/errors';
import type {
  Request, Response,
} from 'express';

describe('Error Middleware', () => {
  it('should return the error response with the correct status code and message', () => {
    const errorObj = new Error('INVALID_DATA');

    const req = {} as Request;

    const status = sinon.spy();
    const json = sinon.spy();

    const res = {
      status,
      json,
    } as Response & {
      status: SinonSpy;
      json: SinonSpy;
    };

    const next = sinon.spy();
    error(errorObj, req, res, next);

    expect(status.calledWith(ERRORS.INVALID_DATA.code)).to.equal(true);
    expect(json.calledWith({
      error_code: errorObj.message,
      message: ERRORS.INVALID_DATA.message,
    })).to.equal(true);
  });

  it('should return the error response with the correct status code and message for a known error', () => {
    const errorObj = new Error('TEST_ERROR');
    const req = {} as Request;

    const status = sinon.spy();
    const json = sinon.spy();

    const res = {
      status,
      json,
    } as Response & {
      status: SinonSpy;
      json: SinonSpy;
    };

    const next = sinon.spy();

    error(errorObj, req, res, next);

    expect(status.calledWith(ERRORS.INVALID_DATA.code)).to.equal(true);

    expect(json.calledWith({
      error_code: 'INVALID_DATA',
      message: 'TEST_ERROR',
    })).to.equal(true);
  });
});
