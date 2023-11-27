<script setup>
import { computed, ref, reactive } from 'vue'
import { data } from '@/stores/changed'

import InputForm from '@/components/InputForm.vue'
import SearchForm from '@/components/SearchForm.vue'
import FilterRadio from '@/components/FilterRadio.vue'

const orderBy = ref('asc')
const items = reactive(data)
const searchFilter = ref('')
const radioFilter = ref('')
const searchByEnd = ref('')
const searchByStart = ref('')
const searchByPass = ref('')

const size = computed(() => filteredItems.value.length)

const filteredItems = computed(() => {
  let result = items

  switch (radioFilter.value) {
    case 'paid':
      result = result.filter((item) => item.pay_status === 'Оплачен')
      break
    case 'notpaid':
      result = result.filter((item) => item.pay_status === 'Неоплачен ч.')
      break
    case 'all':
      result = items
  }

  if (searchFilter.value !== '') {
    result = result.filter((item) =>
      item.client_name.toLowerCase().includes(searchFilter.value.toLowerCase()),
    )
  }

  if (searchByEnd.value !== '' && +searchByEnd.value >= 0) {
    result = result.filter((item) => {
      return (
        getTimeStamp(+searchByEnd.value, false) <= new Date(item['diets'][0]['date']['end_date'])
      )
    })
  }

  if (searchByStart.value !== '' && +searchByStart.value >= 0) {
    result = result.filter((item) => {
      return (
        getTimeStamp(+searchByStart.value, false) <=
        new Date(item['diets'][0]['date']['start_date'])
      )
    })
  }
  if (searchByPass.value !== '' && +searchByPass.value >= 0) {
    result = result.filter((item) => {
      return (
        new Date(item['diets'][0]['date']['end_date']).getTime() <
        getTimeStamp(+searchByPass.value, true)
      )
    })
  }

  return result
})

const handleSearch = (text) => {
  searchFilter.value = text
}
const handleFilter = (value) => {
  radioFilter.value = value
}

const handleSearchEnd = (text) => {
  searchByEnd.value = text
  orderBy.value = 'asc'
  sortByColumn('date', true, true)
}
const handleSearchStart = (text) => {
  searchByStart.value = text
  orderBy.value = 'desc'
  sortByColumn('date', true, false)
}
const handleSearchPass = (text) => {
  searchByPass.value = text
  orderBy.value = 'asc'
  sortByColumn('date', true, true)
}

const dateFormated = ({ start_date, end_date }) => {
  const opt = {
    month: 'short',
    day: 'numeric',
  }
  return `${new Intl.DateTimeFormat('ru-RU', opt).format(
    new Date(start_date),
  )} - ${new Intl.DateTimeFormat('ru-RU', opt).format(new Date(end_date))}`
}

const mainSort = (column, deep = false) => {
  sortByColumn(column, deep)
  if (orderBy.value === 'asc') {
    orderBy.value = 'desc'
  } else {
    orderBy.value = 'asc'
  }
}

/**
 * Прямая и обратная сортировка по всем полям таблицы
 * @param {String} column Колонка верхнего уровня
 * @param {Boolean} deep Сортировка по внутренним полям
 * @param {Boolean} isEnd Сортировать по дате завершения
 */
const sortByColumn = (column, deep = false, isEnd = false) => {
  if (deep) {
    const subColumn = isEnd ? 'end_date' : 'start_date'

    // Только внутри ячейки
    items.forEach((item) => {
      // Сортировка ячеек для "tariff" и "diet"
      if (!item['diets'][0][column][subColumn]) {
        specialSorted(item['diets'], column)
        return
      }

      // Сортируем дату
      if (orderBy.value === 'asc') {
        item['diets'].sort((a, b) => getTime(a[column][subColumn]) - getTime(b[column][subColumn]))
      } else {
        item['diets'].sort((a, b) => getTime(b[column][subColumn]) - getTime(a[column][subColumn]))
      }
    })

    // Сортировка по всей таблице для "tariff" и "diet"
    if (!items[0]['diets'][0][column][subColumn]) {
      if (orderBy.value === 'asc') {
        items.sort((a, b) =>
          String(a['diets'][0][column]).localeCompare(String(b['diets'][0][column]), 'ru'),
        )
      } else {
        items.sort((a, b) =>
          String(b['diets'][0][column]).localeCompare(String(a['diets'][0][column]), 'ru'),
        )
      }

      return
    }

    // Сортируем дату по всей таблице
    if (orderBy.value === 'asc') {
      items.sort(
        (a, b) =>
          getTime(a['diets'][0][column][subColumn]) - getTime(b['diets'][0][column][subColumn]),
      )
    } else {
      items.sort(
        (a, b) =>
          getTime(b['diets'][0][column][subColumn]) - getTime(a['diets'][0][column][subColumn]),
      )
    }

    return
  }
  specialSorted(items, column)

  function getTime(date) {
    return new Date(date).getTime()
  }
}

/**
 * Специальная сортировка чисел
 * или строк в естественный порядок
 *
 * @param {Array} arr Сортируемый массив
 * @param {String} field Ключ по которому сортируем
 */
function specialSorted(arr, field) {
  if (!Number.isNaN(+arr[0][field]) && arr[0][field] !== '') {
    // сортировка чисел
    if (orderBy.value === 'asc') {
      arr.sort((a, b) => a[field] - b[field])
    } else {
      arr.sort((a, b) => b[field] - a[field])
    }
    return
  }

  // естественная сортировка строк
  if (orderBy.value === 'asc') {
    arr.sort((a, b) => {
      if (a[field] === null) return 1
      if (b[field] === null) return -1
      if (a[field] === b[field]) return 0

      return String(a[field]).localeCompare(String(b[field]), 'ru')
    })
  } else {
    arr.sort((a, b) => {
      if (a[field] === null) return 1
      if (b[field] === null) return -1
      if (a[field] === b[field]) return 0

      return String(b[field]).localeCompare(String(a[field]), 'ru')
    })
  }
}

/**
 * Получить скорректированную метку времени
 * @param {Number} num Число дней корректирования
 * @param {Boolean} isMinus
 */
function getTimeStamp(num, isMinus = false) {
  const d = new Date()
  const toDay = new Date(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)
  return isMinus ? toDay.setDate(toDay.getDate() - num) : toDay.setDate(toDay.getDate() + num)
}
</script>

<template>
  <div class="relative rounded-md bg-white">
    <!-- Search & Filter -->
    <div class="flex items-center justify-between border border-b-0">
      <div class="flex items-center justify-end text-sm font-semibold">
        <SearchForm @search="handleSearch" />
        <div class="max-w-[62px] text-center">
          Найдено
          <span
            class="font-boldasd"
            :class="{ 'text-red-600': size === 0, 'text-green-600': size > 0 }"
            >{{ size }}</span
          >
        </div>
        <InputForm
          @searchstart="handleSearchStart"
          @searchend="handleSearchEnd"
          @searchpass="handleSearchPass"
        />
      </div>

      <div class="flex items-center justify-end text-sm font-semibold">
        <FilterRadio @filter="handleFilter" />
      </div>
    </div>

    <!-- Data Table -->
    <table class="relative w-full text-left text-sm text-gray-500">
      <thead class="bg-gray-50 text-sm uppercase text-gray-700">
        <tr>
          <th class="cursor-pointer border px-2 py-1 text-center" @click="mainSort('o_id')">ID</th>
          <th class="cursor-pointer border px-2 py-1 text-center" @click="mainSort('client_name')">
            Name
          </th>
          <th class="cursor-pointer border px-2 py-1 text-center" @click="mainSort('diet', true)">
            Diets
          </th>
          <th class="cursor-pointer border px-2 py-1 text-center" @click="mainSort('tariff', true)">
            Tariff
          </th>
          <th class="cursor-pointer border px-2 py-1 text-center" @click="mainSort('date', true)">
            Dates
          </th>
          <th class="cursor-pointer border px-2 py-1 text-center" @click="mainSort('address')">
            Address
          </th>
          <th class="cursor-pointer border px-2 py-1 text-center" @click="mainSort('phone')">
            Phone
          </th>
          <th class="cursor-pointer border px-2 py-1 text-center" @click="mainSort('discount')">
            Discount
          </th>
          <th class="cursor-pointer border px-2 py-1 text-center" @click="mainSort('order_sum')">
            Order Sum
          </th>
          <th class="cursor-pointer border px-2 py-1 text-center" @click="mainSort('order_payed')">
            Order Payed
          </th>
          <th class="cursor-pointer border px-2 py-1 text-center" @click="mainSort('pay_status')">
            Pay Status
          </th>
          <th
            class="cursor-pointer border px-2 py-1 text-center"
            @click="mainSort('courier_comment')"
          >
            Courier Comment
          </th>
          <th
            class="cursor-pointer border px-2 py-1 text-center"
            @click="mainSort('inner_comment')"
          >
            Inner Comment
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="item in filteredItems" :key="item.o_id" class="border-b">
          <td class="border px-2 py-1">{{ item.o_id }}</td>
          <td class="border px-2 py-1">{{ item.client_name }}</td>

          <td class="min-w-[78px] divide-y divide-gray-200 border px-2 py-1">
            <div v-for="(v, idx) in item.diets" :key="`${item.o_id}_${idx}`">
              {{ v.diet }}
            </div>
          </td>
          <td class="min-w-[78px] divide-y divide-gray-200 border px-2 py-1">
            <div v-for="(v, idx) in item.diets" :key="`${item.o_id}_${idx}`">
              {{ v.tariff }}
            </div>
          </td>
          <td class="min-w-[78px] divide-y divide-gray-200 border px-2 py-1">
            <div v-for="(v, idx) in item.diets" :key="`${item.o_id}_${idx}`">
              {{ dateFormated(v.date) }}
            </div>
          </td>

          <td class="border px-2 py-1">{{ item.address }}</td>
          <td class="min-w-[90px] border px-2 py-1">{{ item.phone }}</td>
          <td class="border px-2 py-1">{{ item.discount }}</td>
          <td class="border px-2 py-1">{{ item.order_sum }}</td>
          <td class="border px-2 py-1">{{ item.order_payed }}</td>
          <td class="border px-2 py-1">{{ item.pay_status }}</td>
          <td class="border px-2 py-1">{{ item.courier_comment }}</td>
          <td class="border px-2 py-1">{{ item.inner_comment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
table {
  thead {
    th {
      background-color: #f9fafb;
      top: -1px;
      position: sticky;
    }
  }
}
</style>
