import {
  CustomerModel,
} from './../../src/models/index';
import {
  expect,
} from 'chai';
import sinon from 'sinon';
import CustomersRepository from '../../src/repositories/customer.repository';
import CustomersService from '../../src/services/customer.service';
import {
  faker,
} from '@faker-js/faker/locale/pt_BR';
import {
  ICustomer,
} from '../../src/interfaces/customer.interface';
import DatabaseMock from '../mocks/databaseMock';

const databaseMock = new DatabaseMock();

describe('Customers Service', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('findCustomerOrInsert', () => {
    it('should return an existing customer', async() => {
      const customer = faker.helpers.arrayElement(databaseMock.customers);

      const customerDocument = new CustomerModel(customer);

      const findCustomerStub = sinon.stub(CustomersRepository, 'findCustomer').resolves(customerDocument);

      const result = await CustomersService.findCustomerOrInsert(customer);

      expect(findCustomerStub.calledWith(customer.id)).to.equal(true);
      expect(result).to.deep.equal(customerDocument);
    });

    it('should save and return a new customer if not found', async() => {
      const customer: ICustomer = {
        id: 4,
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const customerDocument = new CustomerModel(customer);

      const findCustomerStub = sinon.stub(CustomersRepository, 'findCustomer').resolves(null);
      const saveCustomerStub = sinon.stub(CustomersRepository, 'saveCustomer').resolves(customerDocument);

      const result = await CustomersService.findCustomerOrInsert(customer);

      expect(findCustomerStub.calledWith(customer.id)).to.equal(true);
      expect(saveCustomerStub.calledWith(customer)).to.equal(true);
      expect(result).to.deep.equal(customerDocument);
    });
  });
});
