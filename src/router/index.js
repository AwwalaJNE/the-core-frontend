import Vue from 'vue'
import VueRouter from 'vue-router'

import Content from '@/views/template/Content.vue'

import NotFound from '@/components/NotFound.vue'

// === USERS ===
import Users from '@/views/settings/users'

// === GEOLOCATION ===
import Geolocation from '@/views/settings/geolocation'

// === NODES ===
import Nodes from '@/views/settings/nodes'

// === TARIFF ===
import Tariff from '@/views/settings/tariff'

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
      {
        path: "/settings/geolocation",
        name: "Geolocation",
        component: Geolocation,
        meta: { 
          requiresAuth: true,
          breadCrumb: "Geolocation"
        }
      },
      {
        path: "/settings/nodes",
        name: "Nodes",
        component: Nodes,
        meta: { 
          requiresAuth: true,
          breadCrumb: "Nodes"
        }
      },
      {
        path: "/settings/tariff",
        name: "Tariff",
        component: Tariff,
        meta: { 
          requiresAuth: true,
          breadCrumb: "Tariff"
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
