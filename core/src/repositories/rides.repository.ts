import {
  RideModel,
} from '../models';
import {
  ICustomerRidesResponse,
} from '../interfaces/Response.interface';
import {
  IRide,
} from '../interfaces/ride.interface';

async function findCustomerRides(customerId: number, driverId?: number) {
  const rides = await RideModel.aggregate<ICustomerRidesResponse>([
    {
      $match: {
        customerId,
        'driver.id': driverId || {
          $exists: true,
        },
      },
    },
    {
      $group: {
        _id: '$customerId',
        rides: {
          $push: {
            id: '$id',
            date: '$date',
            origin: '$origin',
            destination: '$destination',
            distance: '$distance',
            duration: '$duration',
            driver: '$driver',
            value: '$value',
          },
        },
      },
    },
    {
      $addFields: {
        customer_id: {
          $toString: '$_id',
        },
      },
    },
    {
      $project: {
        '_id': 0,
        'rides.driver._id': 0,
      },
    },
  ]);

  if (!rides.length || !rides[0].rides.length) {
    throw new Error('NO_RIDES_FOUND');
  }

  return rides[0];
}

async function createRide(ride: Omit<IRide, 'id'>) {
  return RideModel.create(ride);
}

const RidesRepository = {
  findCustomerRides,
  createRide,
};

export default RidesRepository;
