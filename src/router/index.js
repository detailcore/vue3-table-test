import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/changed',
      name: 'changedDataPage',
      component: () => import('@/pages/ChangedDataPage.vue'),
    },
  ],
})

export default router
