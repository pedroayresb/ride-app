import {
  expect,
} from 'chai';
import sinon from 'sinon';
import {
  CustomerModel,
} from '../../src/models';
import CustomersRepository from '../../src/repositories/customer.repository';
import {
  faker,
} from '@faker-js/faker/locale/pt_BR';
import DatabaseMock from '../mocks/databaseMock';

const databaseMock = new DatabaseMock();

describe('Customer Repository', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('saveCustomer', () => {
    it('should save a new customer', async() => {
      const customer = faker.helpers.arrayElement(databaseMock.customers);
      const createStub = sinon.stub(CustomerModel, 'create');

      await CustomersRepository.saveCustomer(customer);

      expect(createStub.calledOnce).to.equal(true);
      expect(createStub.calledWith(customer)).to.equal(true);
    });
  });

  describe('findCustomer', () => {
    it('should return a customer by ID', async() => {
      const customer = faker.helpers.arrayElement(databaseMock.customers);

      const findOneStub = sinon.stub(CustomerModel, 'findOne').resolves(customer);

      const result = await CustomersRepository.findCustomer(customer.id);

      expect(findOneStub.calledOnce).to.equal(true);
      expect(findOneStub.calledWith({
        id: customer.id,
      })).to.equal(true);
      expect(result).to.deep.equal(customer);
    });

    it('should return null if no customer is found', async() => {
      const customerId = Math.max(...databaseMock.customers.map(customer => customer.id)) + 1;

      const findOneStub = sinon.stub(CustomerModel, 'findOne').resolves(null);

      const result = await CustomersRepository.findCustomer(customerId);

      expect(findOneStub.calledOnce).to.equal(true);
      expect(findOneStub.calledWith({
        id: customerId,
      })).to.equal(true);
      expect(result).to.equal(null);
    });
  });
});
