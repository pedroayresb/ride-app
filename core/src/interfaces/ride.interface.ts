import {
  Ref,
} from '@typegoose/typegoose';
import {
  Driver,
} from '../models/driver.model';
import {
  Customer,
} from '../models/customer.model';

export interface IRideDriver {
  id: Ref<Driver, number>;
  name: string;
}

export interface IRide {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: IRideDriver;
  value: number;
  customerId: Ref<Customer, number>;
}
