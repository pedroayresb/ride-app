import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import DriversMock from '../test/mocks/drivers.mock';
import CustomerMock from '../test/mocks/customers.mock';
import RideMock from '../test/mocks/rides.mocks';
import {
  CustomerModel, DriverModel,
  RideModel,
} from './models';
import {
  faker,
} from '@faker-js/faker/locale/pt_BR';
import {
  Customer,
} from './models/customer.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function seed() {
  await DriverModel.insertMany(DriversMock);

  const customers = Array.from({
    length: faker.number.int({
      min: 1,
      max: 10,
    }),
  }).map((_, index) => {
    const customer = new CustomerMock(index + 1);

    return customer;
  });

  await CustomerModel.insertMany(customers);

  const rides = Array.from({
    length: faker.number.int({
      min: 15,
      max: 100,
    }),
  }).map((_, index) => {
    return new RideMock(index + 1, (faker.helpers.arrayElement(customers) as Customer).id);
  });

  await RideModel.insertMany(rides);
}

const dirname = path.resolve(path.dirname(''));

dotenv.config({
  path: path.join(dirname, '.env'),
});

const HOST = process.env.HOST || 'localhost:27017';
const DB_OPTIONS = process.env.DB_OPTIONS || '?replicaSet=rs0&directConnection=true';

mongoose.set('strictQuery', false);

const dbURI = `mongodb://${HOST}/${DB_OPTIONS}`;

console.warn('Mongoose connection starting', dbURI);

async function main() {
  await mongoose.connect(dbURI, {
    dbName: 'ride-app',
  });
  console.warn('Mongoose connection done');
}

main().catch(err => {
  console.error(err);
  console.error('Mongoose connection error');
});

/*
 * CONNECTION EVENTS
 * When successfully connected
 */
mongoose.connection.on('connected', () => {
  console.warn(`Mongoose default connection open to ${dbURI}`);

  /*
   * seed().then(() => {
   *   console.log('Seed completed');
   * });
   */
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  console.error(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close().finally(() => {
    console.warn(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});

const db = mongoose.connection;

export default db;
