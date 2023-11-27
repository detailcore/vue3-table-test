<script setup>
import RegionHeader from '@/components/RegionHeader.vue'
// import RegionFooter from '@/components/RegionFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <RegionHeader />

  <RouterView />

  <!-- <RegionFooter /> -->
</template>

<style scoped></style>
