import {
  IDriver,
} from '../interfaces/driver.interface';
import {
  DriverModel,
} from '../models';

async function findById(id: number) {
  return DriverModel.findOne({
    id,
  });
}

async function findAvailableDrivers(meters: number) {
  return DriverModel.aggregate<IDriver>([
    {
      $match: {
        minimumKm: {
          $lte: meters / 1000,
        },
      },
    },
    {
      $addFields: {
        value: {
          $multiply: [
            '$value',
            {
              $divide: [ meters, 1000 ],
            },
          ],
        },
      },
    },
    {
      $sort: {
        value: 1,
      },
    },
  ]);
}

const DriversRepository = {
  findById,
  findAvailableDrivers,
};

export default DriversRepository;
