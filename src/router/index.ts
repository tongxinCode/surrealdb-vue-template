import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomePage,
        meta: {
          showNavbar: true
        }
      },
      {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: {
          showNavbar: false
        }
      }
    ]
  })
  
  export default router