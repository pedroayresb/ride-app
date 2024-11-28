import DriversRepository from '../repositories/drivers.repository';

export async function findDriver(id: number) {
  const driver = await DriversRepository.findById(id);

  return driver;
}

export async function findAvailableDrivers(meters: number) {
  return DriversRepository.findAvailableDrivers(meters);
}

const DriversService = {
  findDriver,
  findAvailableDrivers,
};

export default DriversService;
