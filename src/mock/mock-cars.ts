import type { Car } from '@/types/Car'
import { faker } from '@faker-js/faker'

function generateCouldBeCorruptedData(actualData: any) {
  return faker.helpers.arrayElement([null, undefined, actualData])
}

function generateMockCar() {
  return {
    carId: faker.vehicle.vin(),
    color: generateCouldBeCorruptedData(faker.color.rgb({ format: 'hex', casing: 'upper' })),
    horsePower: generateCouldBeCorruptedData(faker.number.int({ min: 100, max: 550 })),
    inStock: generateCouldBeCorruptedData(faker.datatype.boolean()),
    price: {
      amount: generateCouldBeCorruptedData(faker.number.int({ min: 1, max: 10000000 })),
      symbol: faker.finance.currencySymbol()
    }
  }
}

export const mockCars: any[] = Array.from({ length: 10000 }, generateMockCar)
