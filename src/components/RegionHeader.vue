<script setup>
import Github from '@/components/icons/Github.vue'
</script>

<template>
  <header class="mx-auto flex h-16 w-full max-w-7xl items-center justify-around font-bold">
    <router-link class="hover:text-pink-500" active-class="text-pink-500" to="/"
      >Главная</router-link
    >
    <router-link class="hover:text-pink-500" active-class="text-pink-500" to="/changed"
      >Решение</router-link
    >
    <a class="hover:text-pink-500" href="#" target="_blank" rel="noopener noreferrer">
      <Github class="w-full max-w-[32px]" />
    </a>
  </header>
</template>
