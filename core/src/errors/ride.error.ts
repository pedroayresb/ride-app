const RIDE_ERRORS = {
  NO_CUSTOMER_ID: {
    message: 'INVALID_DATA',
    code: 400,
  },
  NO_ORIGIN: {
    message: 'INVALID_DATA',
    code: 400,
  },
  NO_DESTINATION: {
    message: 'INVALID_DATA',
    code: 400,
  },
  SAME_ORIGIN_DESTINATION: {
    message: 'INVALID_DATA',
    code: 400,
  },
  INVALID_DRIVER: {
    message: 'INVALID_DRIVER',
    code: 400,
  },
  DRIVER_NOT_FOUND: {
    message: 'DRIVER_NOT_FOUND',
    code: 404,
  },
  INVALID_DISTANCE: {
    message: 'INVALID_DISTANCE',
    code: 406,
  },
  NO_RIDES_FOUND: {
    message: 'NO_RIDES_FOUND',
    code: 404,
  },
  INVALID_ADDRESS: {
    message: 'INVALID_DATA',
    code: 400,
  },
  LATLNG_ERROR: {
    message: 'INVALID_DATA',
    code: 400,
  },
  NO_ROUTE_FOUND: {
    message: 'INVALID_DATA',
    code: 400,
  },
  ROUTE_ERROR: {
    message: 'INVALID_DATA',
    code: 400,
  },
};

export default RIDE_ERRORS;
