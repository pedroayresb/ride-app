import {
  faker,
} from '@faker-js/faker/locale/pt_BR';
import {
  Ride,
} from '../../src/models/ride.model';
import DriversMock from './drivers.mock';

export default class RideMock extends Ride {
  constructor(
    id: number,
    customerId: number,
  ) {
    super();

    this.id = id;
    this.date = faker.date.recent();
    this.origin = faker.location.streetAddress();
    this.destination = faker.location.streetAddress();
    this.duration = String(
      faker.number.float({
        min: 1,
        max: 100,
        fractionDigits: 2,
      }),
    );

    const driver = faker.helpers.arrayElement(DriversMock);

    this.driver = {
      id: driver.id,
      name: driver.name,
    };
    this.distance = faker.number.float({
      min: driver.minimumKm,
      max: 100,
      fractionDigits: 2,
    });
    this.value = this.distance * driver.value;
    this.customerId = customerId;
  }
}
