import {
  ICustomer,
} from '../interfaces/customer.interface';
import {
  CustomerModel,
} from '../models';

async function saveCustomer(customer: ICustomer) {
  const lastId = await CustomerModel.findOne().sort({
    id: -1,
  });

  return CustomerModel.create({
    ...customer,
    id: lastId ? lastId.id + 1 : 1,
  });
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
