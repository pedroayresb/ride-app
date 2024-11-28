import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import {
  DriverModel,
} from './models';
import DriversMock from '../test/mocks/drivers.mock';

const dirname = path.resolve(path.dirname(''));

dotenv.config({
  path: path.join(dirname, '.env'),
});

const HOST = process.env.HOST || 'mongo:27017';
const DB_OPTIONS = process.env.DB_OPTIONS || '?directConnection=true';

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

async function seed() {
  const hasDefaultDrivers = await DriverModel.find({
    name: {
      $in: DriversMock.map(driver => driver.name),
    },
  });

  if (
    hasDefaultDrivers.length &&
    hasDefaultDrivers.length === DriversMock.length &&
    hasDefaultDrivers.every(driver => DriversMock.some(defaultDriver => defaultDriver.name === driver.name))
  ) {
    console.warn('Drivers already seeded');

    return;
  }

  await DriverModel.insertMany(DriversMock);
}

/*
 * CONNECTION EVENTS
 * When successfully connected
 */
mongoose.connection.on('connected', () => {
  console.warn(`Mongoose default connection open to ${dbURI}`);

  seed().then(() => {
    console.log('Seed completed');
  });
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
