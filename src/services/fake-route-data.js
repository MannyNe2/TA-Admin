import { faker } from '@faker-js/faker';
import busProviders from 'assets/data/fake-providers.json';

const licensePlateAllowedAlpha = ['A', 'B', 'C'];

export function getRouteProviders() {
  let resultsCount = faker.datatype.number({
    min: 1,
    max: 10,
  });
  const data = [];
  while (resultsCount-- > 0) {
    let providerIndex = faker.datatype.number({
      min: 0,
      max: busProviders.length - 1,
    });
    let origin = `${faker.address.cityName()}, ${faker.address.countryCode()}`;
    let destination = `${faker.address.cityName()}, ${faker.address.countryCode()}`;
    let side_number = faker.datatype
      .number({
        min: 1,
        max: 9999,
      })
      .toString()
      .padStart(4, '0');
    let license_plate =
      licensePlateAllowedAlpha[faker.datatype.number({ min: 0, max: 2 })] +
      faker.datatype
        .number({
          min: 1,
          max: 99999,
        })
        .toString()
        .padStart(5, '0');
    data.push({
      provider: busProviders[providerIndex],
      origin,
      destination,
      side_number,
      license_plate,
    });
  }
  return data;
}
