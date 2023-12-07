import { createRouter, createWebHistory } from 'vue-router'

// import Home from '@/pages/HomePage.vue'
import Table from '@/pages/ChangedDataPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    // },
    {
      path: '/',
      name: 'changedDataPage',
      component: Table,
      // component: () => import('@/pages/ChangedDataPage.vue'),
    },
  ],
})

export default router
