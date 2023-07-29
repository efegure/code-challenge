<template>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog as="div" @open="onOpen" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all gap-2"
            >
              <DialogTitle as="h3" class="text-xl font-bold text-slate-600 leading-6 text-gray-900">
                Edit Car
              </DialogTitle>
              <div class="gap-2 flex flex-col">
                <div class="flex flex-row justify-between items-center">
                  <span>Id:</span>
                  <input
                    value="props.id"
                    disabled
                    class="disabled:opacity-50 py-1 px-2 border rounded w-36"
                    placeholder="Id"
                  />
                </div>
                <div class="flex flex-row justify-between items-center">
                  <span>Car Id:</span>
                  <input
                    value="props.car.carId"
                    disabled
                    class="disabled:opacity-50 py-1 px-2 border rounded w-36"
                    placeholder="Car Id"
                  />
                </div>
                <div class="flex flex-row gap-3 justify-between items-center">
                  <span>In Stock</span>
                  <input
                    v-model="inStock"
                    class="py-1 px-2 border rounded"
                    type="checkbox"
                    placeholder="In Stock"
                  />
                </div>
                <div class="flex flex-row gap-2 justify-between items-center">
                  <span>Horsepower</span>
                  <div class="flex flex-col">
                    <input
                      v-model="horsePower"
                      oninput="validity.valid||(value='');"
                      :min="1"
                      :max="550"
                      class="py-1 px-2 border rounded w-36"
                      type="number"
                      placeholder="HorsePower"
                    />
                    <span class="text-slate-400 text-xs">should be between 1 - 550</span>
                  </div>
                </div>
                <div class="flex flex-row gap-3 justify-between items-center">
                  <span>Color</span>
                  <input
                    v-model="color"
                    class="py-1 px-2 border rounded"
                    type="color"
                    placeholder="Color"
                  />
                </div>
                <div class="gap-1 flex flex-col">
                  <span>Price</span>
                  <div class="flex flex-row gap-1 justify-between items-center">
                    <input
                      v-model="priceSymbol"
                      class="py-1 px-2 border rounded"
                      placeholder="Currency"
                    />
                    <input
                      oninput="validity.valid||(value='');"
                      v-model="priceAmount"
                      :min="1"
                      class="py-1 px-2 border rounded w-36"
                      type="number"
                      placeholder="Amount"
                    />
                  </div>
                </div>
                <div class="flex flex-row gap-2 mt-2 justify-around">
                  <button class="text-white py-1 px-2 bg-slate-400 rounded" @click="closeModal">
                    Cancel
                  </button>
                  <button
                    :disabled="editDisabled"
                    class="disabled:opacity-50 text-white py-1 px-2 bg-green-600 rounded"
                    @click="editCar"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { type Car } from '../types/Car'

import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

interface Props {
  car: Car
  isOpen: boolean
  id: String
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false
})
const emit = defineEmits(['open', 'close', 'edit'])

const inStock = ref(props.car.inStock)
const horsePower = ref(props.car.horsePower)
const color = ref(props.car.color)
const priceAmount = ref(props.car.price.amount)
const priceSymbol = ref(props.car.price.symbol)

watch(
  () => props.isOpen,
  (first, second) => {
    if (first) {
      inStock.value = props.car.inStock
      horsePower.value = props.car.horsePower
      color.value = props.car.color
      priceAmount.value = props.car.price.amount
      priceSymbol.value = props.car.price.symbol
    }
  }
)

const editDisabled = computed(() => {
  return (
    inStock.value === props.car.inStock &&
    horsePower.value === props.car.horsePower &&
    color.value === props.car.color &&
    priceAmount.value === props.car.price.amount &&
    priceSymbol.value === props.car.price.symbol
  )
})

function editCar() {
  let car: Car = {
    carId: props.car.carId,
    color: color.value,
    horsePower: horsePower.value,
    inStock: inStock.value,
    price: { amount: priceAmount.value, symbol: priceSymbol.value }
  }
  console.log(car)
  emit('edit', car)
}
function closeModal() {
  emit('close')
}
</script>
