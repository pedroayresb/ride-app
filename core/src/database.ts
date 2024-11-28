import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

const dirname = path.resolve(path.dirname(''));

dotenv.config({
  path: path.join(dirname, '.env'),
});

const HOST = process.env.HOST || 'localhost:27017';
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
