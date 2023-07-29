<script setup lang="tsx">
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
  createColumnHelper
} from '@tanstack/vue-table'
import { computed, ref } from 'vue'
import { type Car } from '../types/Car'

const props = defineProps({
  data: Array<Car>
})
const emit = defineEmits(['edit'])

const INITIAL_PAGE_INDEX = 0

const columnHelper = createColumnHelper<Car>()
const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1)
const pageSizes = [10, 20, 30, 40, 50]

const rowText = (value: any) => <span class="sm:text-base text-xs">{value}</span>
const colorDiv = (value: any) => (
  <div class="flex flex-col items-center">
    <span>{value}</span>
    <div class="rounded-full h-6 w-8" style={'background-color:' + value}></div>
  </div>
)
const editButton = (value: String, id: String) => (
  <button
    class="sm:text-base text-xs rounded bg-green-600 border text-white py-2 px-2 flex  m-auto w-16 justify-center"
    onClick={() => {
      editRow(value, id)
    }}
  >
    Edit
  </button>
)

const columns = [
  columnHelper.accessor((_, index) => index, {
    id: 'id',
    header: () => rowText('ID'),
    cell: (info) => rowText(info.getValue() + 1)
    // footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.carId, {
    id: 'carId',
    cell: (info) => rowText(info.getValue() ?? '-'),
    header: () => rowText('Car Id')
  }),
  columnHelper.accessor((row) => row.inStock, {
    id: 'inStock',
    header: () => rowText('In Stock'),
    cell: (info) => rowText(info.getValue()?.toString() ?? '-')
  }),
  columnHelper.accessor((row) => row.horsePower, {
    id: 'HorsePower',
    header: () => rowText('HorsePower'),
    cell: (info) => rowText(info.getValue() || '-')
  }),
  columnHelper.accessor((row) => row.color, {
    id: 'Color',
    header: () => rowText('Color'),
    cell: (info) => colorDiv(info.getValue() || '-')
  }),
  columnHelper.accessor((row) => row.price, {
    id: 'Price',
    header: () => rowText('Price'),
    cell: (info) =>
      rowText((info.getValue()?.symbol || '-') + (info.getValue()?.amount?.toString() || '-'))
  }),

  columnHelper.accessor((row) => row.carId, {
    id: 'Edit',
    header: () => rowText('Edit'),
    cell: (info) => editButton(info.getValue(), info.row.id)
  })
]

const reactiveData = computed(() => {
  return props && props.data ? [...props.data] : []
})

const table = useVueTable({
  get data() {
    return reactiveData.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel()
})

function rerender() {}
function editRow(carId: String, id: String) {
  console.log('EDTI', id)
  emit('edit', carId, id)
}

function handleGoToPage(e) {
  const page = e.target.value ? Number(e.target.value) - 1 : 0
  goToPageNumber.value = page + 1
  table.setPageIndex(page)
}

function handlePageSizeChange(e) {
  table.setPageSize(Number(e.target.value))
}
</script>

<template>
  <div class="p-2 flex flex-col flex-grow gap-2">
    <table class="rounded-xl">
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th
            class="bg-slate-500 py-3 text-white"
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
          >
            <FlexRender
              class="sm:text-base text-xs"
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="row.index % 2 === 0 ? 'bg-slate-300' : 'bg-slate-100'"
          v-for="row in table.getRowModel().rows"
          :key="row.id"
        >
          <td class="py-3 px-1" v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>
      <!-- <tfoot>
        <tr
          v-for="footerGroup in table.getFooterGroups()"
          :key="footerGroup.id"
        >
          <th
            v-for="header in footerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.footer"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </tfoot> -->
    </table>
    <div>
      <div class="flex flex-wrap items-center gap-2">
        <button
          class="border rounded p-1 sm:px-3 px-2 bg-slate-200"
          @click="() => table.setPageIndex(0)"
          :disabled="!table.getCanPreviousPage()"
        >
          «
        </button>
        <button
          class="border rounded p-1 sm:px-3 px-2 bg-slate-200"
          @click="() => table.previousPage()"
          :disabled="!table.getCanPreviousPage()"
        >
          ‹
        </button>
        <button
          class="border rounded p-1 sm:px-3 px-2 bg-slate-200"
          @click="() => table.nextPage()"
          :disabled="!table.getCanNextPage()"
        >
          ›
        </button>
        <button
          class="border rounded p-1 sm:px-3 px-2 bg-slate-200"
          @click="() => table.setPageIndex(table.getPageCount() - 1)"
          :disabled="!table.getCanNextPage()"
        >
          »
        </button>
        <span class="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </strong>
        </span>
        <span class="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            :value="goToPageNumber"
            @change="handleGoToPage"
            class="border p-1 rounded w-16"
          />
        </span>
        <select
          class="py-2 bg-slate-200 rounded sm:px-3 px-2"
          :value="table.getState().pagination.pageSize"
          @change="handlePageSizeChange"
        >
          <option :key="pageSize" :value="pageSize" v-for="pageSize in pageSizes">
            Show {{ pageSize }}
          </option>
        </select>
      </div>
      <!-- <div>{{ table.getRowModel().rows.length }} Rows</div> -->
      <!-- <pre>{{ JSON.stringify(table.getState().pagination, null, 2) }}</pre> -->
    </div>
    <!-- <div class="h-2" /> -->
    <!-- <button @click="rerender" class="border p-2">Rerender</button> -->
  </div>
</template>

<style>
html {
  font-family: sans-serif;
  font-size: 14px;
}

table {
  border: 1px solid lightgray;
}

tbody {
  border-bottom: 1px solid lightgray;
}

th {
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 2px 4px;
}

tfoot {
  color: gray;
}

tfoot th {
  font-weight: normal;
}
</style>
