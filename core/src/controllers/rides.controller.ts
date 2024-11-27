import type {
  Request,
  Response,
  NextFunction,
} from 'express';
import {
  ICustomerRidesResponse,
  IConfirmResponse,
  IEstimateResponse,
} from '../interfaces/Response.interface';
import {
  IConfirmRequest,
  IEstimateRequest,
} from './../interfaces/Request.interface';
import RidesService from '../services/rides.service';

async function getCustomerRides(
  req: Request<
    {
      customer_id: number;
    },
    ICustomerRidesResponse,
    null,
    {
      driver_id?: string | number;
    }
  >,
  res: Response<ICustomerRidesResponse>,
  next: NextFunction,
) {
  try {
    const {
      customer_id,
    } = req.params;

    const {
      driver_id,
    } = req.query;

    const rides = await RidesService.findCustomerRides(Number(customer_id), Number(driver_id));

    res.status(200).json(rides);
  } catch (error) {
    next(error);
  }
}

async function confirmRide(
  req: Request<
    unknown,
    IConfirmResponse,
    IConfirmRequest
  >,
  res: Response<IConfirmResponse>,
  next: NextFunction,
) {
  try {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = req.body;

    const ride = {
      customerId: Number(customer_id),
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
      date: new Date(),
    };

    await RidesService.createRide(ride);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function estimateRide(
  req: Request<
    unknown,
    IEstimateResponse,
    IEstimateRequest
  >,
  res: Response<IEstimateResponse>,
  next: NextFunction,
) {
  try {
    const {
      customer_id,
      origin,
      destination,
    } = req.body;

    const estimate = await RidesService.estimateRide(Number(customer_id), origin, destination);

    res.status(200).json(estimate);
  } catch (error) {
    next(error);
  }
}

const RidesController = {
  getCustomerRides,
  confirmRide,
  estimateRide,
};

export default RidesController;
