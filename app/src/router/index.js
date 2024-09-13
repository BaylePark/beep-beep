import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/UserView.vue'
import MasterView from '../views/MasterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user',
      component: UserView
    },
    {
      path: '/master',
      name: 'master',
      component: MasterView
    }
  ]
})

export default router
