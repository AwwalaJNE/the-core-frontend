import Vue from 'vue'
import VueRouter from 'vue-router'

import Content from '@/views/template/Content.vue'

import NotFound from '@/components/NotFound.vue'

// === USERS ===
import Users from '@/views/settings/users'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  }, 
  {
    path: '/',
    name: 'main',
    component: Content,
    children: [
      {
        path: "/settings/users",
        name: "users",
        component: Users,
        meta: { 
          requiresAuth: true,
          breadCrumb: "Users"
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
