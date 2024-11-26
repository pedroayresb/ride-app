import {
  Customer,
} from './../../src/models/customer.model';
import {
  faker,
} from '@faker-js/faker/locale/pt_BR';

export default class CustomerMock extends Customer {
  constructor(
    id: number,
  ) {
    super();
    this.id = id;
    this.name = faker.person.firstName();
    this.email = faker.internet.email();
    this.password = faker.internet.password();
  }
}
