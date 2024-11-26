import DriversMock from './drivers.mock';
import CustomerMock from './customers.mock';
import RideMock from './rides.mocks';
import {
  faker,
} from '@faker-js/faker/locale/pt_BR';
import {
  Customer,
} from '../../src/models/customer.model';

export default class DatabaseMock {
  drivers = DriversMock;

  customers: CustomerMock[];

  rides: RideMock[];

  constructor() {
    this.customers = Array.from({
      length: faker.number.int({
        min: 1,
        max: 10,
      }),
    }).map((_, index) => {
      return new CustomerMock(index + 1);
    });

    this.rides = Array.from({
      length: faker.number.int({
        min: 15,
        max: 100,
      }),
    }).map((_, index) => {
      return new RideMock(index + 1, (faker.helpers.arrayElement(this.customers) as Customer).id);
    });
  }
}
