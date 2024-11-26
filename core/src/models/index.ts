import {
  RideSchema,
  DriverSchema,
  CustomerSchema,
} from './schemas';
import {
  Ride,
} from './ride.model';
import {
  Driver,
} from './driver.model';
import {
  Customer,
} from './customer.model';
import mongoose from 'mongoose';
import {
  addModelToTypegoose,
  getName,
} from '@typegoose/typegoose';

export const DriverModelRaw = mongoose.model(getName(Driver), DriverSchema);
export const CustomerModelRaw = mongoose.model(getName(Customer), CustomerSchema);
export const RideModelRaw = mongoose.model(getName(Ride), RideSchema);

export const DriverModel = addModelToTypegoose(DriverModelRaw, Driver);
export const CustomerModel = addModelToTypegoose(CustomerModelRaw, Customer);
export const RideModel = addModelToTypegoose(RideModelRaw, Ride);
