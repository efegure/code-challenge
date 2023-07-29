<script setup lang="ts">
import CarTable from '../components/CarTable.vue'
import EditDialog from '../components/EditDialog.vue'
import { ref, onMounted } from 'vue'

import { useCarStore } from '../stores/cars'
import type { Car } from '@/types/Car'
import { storeToRefs } from 'pinia'

const carStore = useCarStore()
const { cars } = storeToRefs(carStore)

const isOpen = ref(false)
const car = ref<Car | undefined>({
  carId: '',
  color: '',
  horsePower: 0,
  inStock: false,
  price: {
    amount: 0,
    symbol: ''
  }
})
const id = ref('')
onMounted(async () => {
  carStore.setCars()
})

function showDialog(carId: string, index: string) {
  console.log('dialoggggg', id)
  car.value = carStore.getCarById(carId)
  id.value = index
  console.log('dialoggggg', car.value)
  if (car.value) {
    isOpen.value = true
  }
}
function hideDialog() {
  isOpen.value = false
}
function editCar(car: Car) {
  carStore.updateCar(car)
  isOpen.value = false
}
</script>

<template>
  <main>
    <div class="flex flex-col m-4 justify-center align-center">
      <span class="text-3xl text-bold text-slate-600 ml-2">Car Database</span>
      <CarTable @edit="showDialog" :data="cars"></CarTable>
      <EditDialog
        @close="hideDialog"
        :isOpen="isOpen"
        @edit="editCar"
        :car="car"
        :id="id"
      ></EditDialog>
    </div>
  </main>
</template>
