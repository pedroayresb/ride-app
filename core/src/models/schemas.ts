import {
  Ride,
} from './ride.model';
import {
  Customer,
} from './customer.model';
import {
  Driver,
} from './driver.model';

import {
  buildSchema,
} from '@typegoose/typegoose';

export const DriverSchema = buildSchema(Driver);
export const CustomerSchema = buildSchema(Customer);
export const RideSchema = buildSchema(Ride);
