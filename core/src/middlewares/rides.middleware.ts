import type {
  Request,
  Response,
  NextFunction,
} from 'express';

export function validateBodyCustomerId(
  req: Request<
    unknown,
    {
      customer_id?: string | null;
    }
  >,
  _res: Response,
  next: NextFunction,
) {
  const {
    customer_id,
  } = req.body;

  if (!customer_id || customer_id === '') {
    throw new Error('NO_CUSTOMER_ID');
  }

  req.body.customer_id = Number(customer_id);

  next();
}

export function validateBodyAddresses(
  req: Request<
    unknown,
    {
      origin?: string | null;
      destination?: string | null;
    }
  >,
  _res: Response,
  next: NextFunction,
) {
  const {
    origin,
    destination,
  } = req.body;

  if (!origin || origin === '') {
    throw new Error('NO_ORIGIN');
  }

  if (!destination || destination === '') {
    throw new Error('NO_DESTINATION');
  }

  if (origin === destination) {
    throw new Error('SAME_ORIGIN_DESTINATION');
  }

  next();
}

export function validateParamCustomerId(
  req: Request<
    {
      customer_id?: string | number | null;
    }
  >,
  res: Response,
  next: NextFunction,
) {
  const {
    customer_id,
  } = req.params;

  if (!customer_id || customer_id === '') {
    throw new Error('NO_CUSTOMER_ID');
  }

  req.params.customer_id = Number(customer_id);

  next();
}
