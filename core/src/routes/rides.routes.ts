import {
  Router,
} from 'express';
import {
  validateBodyCustomerId,
  validateBodyAddresses,
  validateParamCustomerId,
} from '../middlewares/rides.middleware';
import RidesController from '../controllers/rides.controller';

const rideRouter = Router();

rideRouter
  .post(
    '/estimate',
    validateBodyAddresses,
    validateBodyCustomerId,
  )
  .patch(
    '/confirm',
    validateBodyAddresses,
    validateBodyCustomerId,
    RidesController.confirmRide,
  )
  .get(
    '/:customer_id',
    validateParamCustomerId,
    RidesController.getCustomerRides,
  );

export default rideRouter;
