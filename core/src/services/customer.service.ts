import CustomersRepository from '../repositories/customer.repository';
import {
  ICustomer,
} from '../interfaces/customer.interface';

export async function findCustomerOrInsert(customer: ICustomer) {
  const {
    id,
  } = customer;

  const existingCustomer = await CustomersRepository.findCustomer(id as number);

  if (existingCustomer) {
    return existingCustomer;
  }

  return CustomersRepository.saveCustomer(customer);
}

const CustomersService = {
  findCustomerOrInsert,
};

export default CustomersService;
