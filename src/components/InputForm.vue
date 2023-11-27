<script setup>
const emit = defineEmits(['searchend', 'searchstart', 'searchpass'])

const searchAfterEnd = (e) => {
  emit('searchend', e.target.value)
}
const searchAfterStart = (e) => {
  emit('searchstart', e.target.value)
}
const searchPass = (e) => {
  emit('searchpass', e.target.value)
}
</script>

<template>
  <form class="flex items-center px-4 py-3">
    <div class="pr-2 text-right">Начинается через:</div>
    <div class="relative w-full">
      <input
        type="number"
        placeholder="дней"
        class="max-w-[72px] rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-center font-semibold text-gray-900"
        @input="searchAfterStart"
      />
    </div>

    <div class="pr-2 text-right">Заканчивается через:</div>
    <div class="relative w-full">
      <input
        type="number"
        placeholder="дней"
        class="max-w-[72px] rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-center font-semibold text-gray-900"
        @input="searchAfterEnd"
      />
    </div>

    <div class="pr-2 text-right">Просрочено:</div>
    <div class="relative w-full">
      <input
        type="number"
        placeholder="дней"
        class="max-w-[72px] rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-center font-semibold text-gray-900"
        @input="searchPass"
      />
    </div>
  </form>
</template>
