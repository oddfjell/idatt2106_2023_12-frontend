import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/FrontView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterUserView.vue')
    },
    {
      path: '/frontView',
      name: 'frontView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FrontView.vue')
    },
    {
      path: '/WeeklyMenuView',
      name: 'WeeklyMenuView',
      component: () => import('../views/WeeklyMenuView.vue')
    },

    {
      path: '/RefrigeratorView',
      name: 'RefrigeratorView',
      component: () => import('../views/RefrigeratorView.vue')
    },

    {
      path: '/ShoppingListView',
      name: 'ShoppingList',
      component: () => import('../views/ShoppingListView.vue')
    }
  ]
})

export default router
