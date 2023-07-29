import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchCars } from '../services/car-service'
import type { Car } from '@/types/Car'

export const useCarStore = defineStore('car', () => {
  const cars = ref<Array<Car>>([])
  const getCars = computed(() => cars.value)
  async function setCars() {
    cars.value = await fetchCars()
  }
  function getCarById(id: String) {
    return cars.value.find((car: Car) => car.carId === id)
  }
  function updateCar(carInfo: Partial<Car>) {
    const car = cars.value.findIndex((car: Car) => {
      return car.carId === carInfo.carId
    })
    if (car !== -1) {
      cars.value[car] = { ...cars.value[car], ...carInfo }
    }
  }

  return { cars, getCars, setCars, getCarById, updateCar }
})
