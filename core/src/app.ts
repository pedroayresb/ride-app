import express, {
  json,
} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import error from './middlewares/error.middleware';
import './database';
import googleFns from './utils/google';

import type {
  Request,
  Response,
  NextFunction,
} from 'express';

import rideRouter from './routes/rides.routes';

const app = express();

async function test() {
  const origin = await googleFns.getLatLng('Rua Professora Antonia Reginato Viana 780');

  const destination = await googleFns
    .getLatLng('R. Edvino Antônio Deboni, 225 - cj 23 - Fazendinha, Curitiba - PR, 81070-001');

  console.log(origin, destination);

  if (!origin || !destination) {
    return;
  }

  setTimeout(() => {}, 1000);

  const route = await googleFns.getRoute(origin, destination);

  console.log(route);
}

test();

app
  .use(
    cors({
      origin: '*', // Allow all origins
      methods: 'GET,POST,PUT,DELETE,PATCH',
    }),
  )
  .use(bodyParser.json())
  .use((req: Request, _: Response, next: NextFunction) => {
    console.log(req.url);
    next();
  })
  .use(json())
  .use(error)
  .use('/ride', rideRouter);

export default app;
