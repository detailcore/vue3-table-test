<script setup>
const emit = defineEmits(['search'])

const search = (e) => {
  emit('search', e.target.value)
}
</script>

<template>
  <form class="flex items-center px-4 py-3">
    <!-- <label class="sr-only">Поиск по имени</label> -->
    <div class="relative w-full">
      <input
        type="text"
        placeholder="Искать по имени"
        class="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 font-semibold text-gray-900"
        @input="search"
      />
    </div>
  </form>
</template>
