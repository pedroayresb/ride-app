import {
  ICustomer,
} from '../interfaces/customer.interface';
import {
  CustomerModel,
} from '../models';

async function saveCustomer(customer: ICustomer) {
  return CustomerModel.create(customer);
}

async function findCustomer(id: number) {
  return CustomerModel.findOne({
    id,
  });
}

const CustomerRepository = {
  saveCustomer,
  findCustomer,
};

export default CustomerRepository;
