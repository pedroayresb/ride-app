import RIDE_ERRORS from './ride.error';

const ERRORS = {
  ...RIDE_ERRORS,
  INVALID_DATA: {
    message: 'INVALID_DATA',
    code: 400,
  },
};

export default ERRORS;
