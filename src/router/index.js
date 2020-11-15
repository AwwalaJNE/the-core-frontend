import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/auth'

import Content from '@/views/template/Content.vue'

import Upload from '@/views/upload/index.vue'

import NotFound from '@/components/NotFound.vue'

// === USERS ===
import Users from '@/views/settings/users'

// === GEOLOCATION ===
import Geolocation from '@/views/settings/geolocation'

// === NODES ===
import Nodes from '@/views/settings/nodes'

// === TARIFF ===
import Tariff from '@/views/settings/tariff'

// === Employee ===
import Employee from "@/views/settings/employee"

// === Vehicles ===
import Vehicles from "@/views/settings/vehicles"

// === Customer ===
import Customer from "@/views/settings/customer"

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
      {
        path: "/settings/employee",
        name: "Employee",
        component: Employee,
        meta: { 
          requiresAuth: true,
          breadCrumb: "Employee"
        }
      },
      {
        path: "/settings/vehicles",
        name: "Vehicles",
        component: Vehicles,
        meta: { 
          requiresAuth: true,
          breadCrumb: "Vehicles"
        }
      },
      {
        path: "/settings/customer",
        name: "Customer",
        component: Customer,
        meta: { 
          requiresAuth: true,
          breadCrumb: "Customer"
        }
      },
      {
        path: "/upload",
        name: "Upload",
        component: Upload,
        meta: { 
          requiresAuth: true,
          breadCrumb: "Upload"
        }
      },
    ],
    meta: { 
      requiresAuth: true,
      breadCrumb: "main"
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  let path = to.path;
  let token = localStorage.getItem("tokenBearer")
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(token == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    if (path.includes("login") && token !== null) {
      next({
        path: "/",
        params: { nextUrl: to.fullPath }
      });
    }
    else{
      next();
    }
  }
})

export default router
