import express, {
  json,
} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import error from './middlewares/error.middleware';
import './database';
import path from 'path';

import type {
  Request,
  Response,
  NextFunction,
} from 'express';

import rideRouter from './routes/rides.routes';

const app = express();

app
  .use(
    cors({
      origin: '*', // Allow all origins
      methods: 'GET,POST,PUT,DELETE,PATCH',
    }),
  )
  .use(bodyParser.json())
  .use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.url);
    next();
  })
  .use(json())
  .use('/static', express.static(path.join(path.resolve(path.dirname('')), '/src/assets')))
  .use('/ride', rideRouter)
  .use(error);

export default app;
