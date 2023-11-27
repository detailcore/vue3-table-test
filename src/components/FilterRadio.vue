<script setup>
import { ref } from 'vue'

const emit = defineEmits(['filter'])

const filter = (e) => {
  emit('filter', e.target.value)
}

const checked = ref('all')
</script>

<template>
  <label class="mr-3 flex cursor-pointer flex-col-reverse items-center">
    <input
      v-model="checked"
      class="hidden"
      type="radio"
      name="show"
      value="paid"
      @change="filter"
    />
    <span
      :class="{ 'rounded-md border bg-gray-100': checked === 'paid' }"
      class="ml-1 whitespace-nowrap px-3 py-2"
      >Оплачено</span
    >
  </label>

  <label class="mr-3 flex cursor-pointer flex-col-reverse items-center">
    <input
      v-model="checked"
      class="hidden"
      type="radio"
      name="show"
      value="notpaid"
      @change="filter"
    />
    <span
      :class="{ 'rounded-md border bg-gray-100': checked === 'notpaid' }"
      class="ml-1 whitespace-nowrap px-3 py-2"
      >Неоплачено</span
    >
  </label>

  <label class="mr-4 flex cursor-pointer flex-col-reverse items-center">
    <input
      v-model="checked"
      class="hidden"
      type="radio"
      name="show"
      value="all"
      checked
      @change="filter"
    />
    <span
      :class="{ 'rounded-md border bg-gray-100': checked === 'all' }"
      class="ml-1 whitespace-nowrap px-3 py-2"
    >
      Показать всё
    </span>
  </label>
</template>
