import { createRouter, createWebHistory } from 'vue-router'
import FrontView from '../views/FrontView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import WeeklyMenuView from "@/views/WeeklyMenuView.vue";
import RefrigeratorView from "@/views/RefrigeratorView.vue";
import ShoppingListView from "@/views/ShoppingListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'FrontView',
      component: FrontView
    },
    {
      path: '/',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/weeklyMenu',
      name: 'WeeklyMenuView',
      component: WeeklyMenuView
    },

    {
      path: '/refrigerator',
      name: 'RefrigeratorView',
      component: RefrigeratorView
    },

    {
      path: '/shoppingList',
      name: 'ShoppingListView',
      component: ShoppingListView
    }
  ]
})

export default router
