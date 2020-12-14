import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/auth'

import Content from '@/views/template/Content.vue'

import Upload from '@/views/upload/index.vue'

import NotFound from '@/components/NotFound.vue'

import Transaction from '@/views/transaction'

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

// === Surcharge ===
import Surcharge from "@/views/settings/surcharge"

// === Inventory Item or Connote ===
import InventoryItem from "@/views/inventory/connote"

// === Inventory Item or Bag ===
import InventoryBag from "@/views/inventory/bag"

// === Inventory Item or Bag detail===
import InventoryBagDetail from "@/views/inventory/bag/bagDetail"

// === Inventory Item Connote detail===
import ConnoteDetail from "@/views/inventory/connote-detail"

// === Print ===
import PrintBPIK from "@/views/print/printBPIK"

// === Transaction List ===
import TransactionList from "@/views/transactionList"

// === Transaction Detail ===
import DetailConnote from "@/views/transactionList/detail"

// === Cash Register  ===
import CashRegister from "@/views/cashRegister"

// === Inventory Unbagging  ===
import Unbagging from "@/views/inventory/unbag"

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
        path: "/settings/surcharge",
        name: "Surcharge",
        component: Surcharge,
        meta: { 
          requiresAuth: true,
          breadCrumb: "Surcharge"
        }
      },
      {
        path: "/new-transactions",
        name: "Transaction",
        component: Transaction,
        meta: { 
          requiresAuth: true,
          breadCrumb: "Transaction"
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
      {
        path: "/inventory/item",
        name: "InventoryItem",
        component: InventoryItem,
        meta: { 
          requiresAuth: true,
          breadCrumb: "inventory Item"
        }
      },
      {
        path: "/connote-detail/:id",
        name: "InventoryItem-detail",
        component: ConnoteDetail,
        meta: {
          requiresAuth: true,
          breadCrumb: "connote detail"
        }
      },
      {
        path: "/inventory/bagging",
        name: "InventoryBag",
        component: InventoryBag,
        meta: {
          requiresAuth: true,
          breadCrumb: "bagging"
        }
      },
      {
        path: "/bagging-detail/:id",
        name: "InventoryBagDetail",
        component: InventoryBagDetail,
        meta: {
          requiresAuth: true,
          breadCrumb: "bagging detail"
        }
      },
      {
        path: "/sales/transaction",
        name: "transactionList",
        component: TransactionList,
        meta: {
          requiresAuth: true,
          breadCrumb: "Transaction List"
        }
      },
      {
        path: "/transaction/detail/:id",
        name: "detailConnote",
        component: DetailConnote,
        meta: {
          requiresAuth: true,
          breadCrumb: "Transaction Detail"
        }
      },
      {
        path: "/sales/cashregister",
        name: "cashRegister",
        component: CashRegister,
        meta: {
          requiresAuth: true,
          breadCrumb: "Cash Register"
        }
      },
      {
        path: "inventory/unbagging",
        name: "unbagging",
        component: Unbagging,
        meta: {
          requiresAuth: true,
          breadCrumb: "Unbagging"
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
  {
    path: '/print-bpik',
    name: 'printBpik',
    component: PrintBPIK
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
router.beforeEach((to, from, next) => {
  let path = to.path;
  let token= localStorage.getItem("vuejs__tokenBearer")
  
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
