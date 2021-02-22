import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/auth'

import Content from '@/views/template/Content.vue'
import ContentChild from '@/views/template/Content-child'

import Upload from '@/views/upload/index.vue'
import UploadTransaction from '@/views/upload/transaction.vue'

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
import printSPPAP from "@/views/print/printSPPAP"
import printGeneral from "@/views/print/general"

// === Transaction List ===
import TransactionList from "@/views/transactionList"
import TransactionFinish from "@/views/transaction/finish"

// === Transaction Detail ===
import DetailConnote from "@/views/transactionList/detail"

// === Cash Register  ===
import CashRegister from "@/views/cashRegister"

// === Inventory Unbagging  ===
import Unbagging from "@/views/inventory/unbag"

// === Pickup Request ===
import PickupRequest from "@/views/pickup/request"

// === Pickup List ===
import PickupList from "@/views/pickup/list"

// === Pickup Schedule ===
import PickupSchedule from "@/views/pickup/schedule"

// === Transport Packing Kayu ===
import TransportPackingKayu from "@/views/transport/transportPackingKayu"

// === Transport Surat Jalan ===
import TransportSuratJalan from "@/views/transport/suratJalan"

// === Inbound Incoming ===
import InboundIncoming from "@/views/inbound"

// === Inbound Incoming ===
import InboundIncomingScan from "@/views/inbound/scan"

// === Transport Manifest ===
import TransportManifest from "@/views/transport/manifest"

// === Delivery Runsheet ===
import DeliveryRunsheet from "@/views/delivery/runsheet"

// === Delivery Runsheet EDIT===
import DeliveryRunsheetEdit from "@/views/delivery/runsheet/edit"

// === Delivery COD===
import DeliveryCod from "@/views/delivery/cod"

// === Delivery Undelivery ===
import DeliveryUndelivery from "@/views/delivery/undelivery"

// === Delivery COD History ===
import DeliveryCodHistory from "@/views/delivery/codHistory"

import CashLess from "@/views/report/cashless"

// === Irreguralities ===
import irreguralitiesCancel from "@/views/irreguralities/cancel"
import irreguralitiesReturn from "@/views/irreguralities/return"
import irreguralitiesProblem from "@/views/irreguralities/problem"
import irreguralitiesHold from "@/views/irreguralities/hold"

// === Cost To Cost ===
import CostToCostSetting from "@/views/costToCost/setting"

// === Cost To Cost ===
import CostToCostReport from "@/views/costToCost/report"

// === setting kurs ===
import SettingExchangeRate from "@/views/settings/exchange_rate"



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
        path: "settings",
        name: "settings",
        component: ContentChild,
        children: [
          {
            path: "users",
            name: "users",
            component: Users,
            meta: { 
              requiresAuth: true,
              breadCrumb: "Users"
            }
          },
          {
            path: "geolocation",
            name: "Geolocation",
            component: Geolocation,
            meta: { 
              requiresAuth: true,
              breadCrumb: "Geolocation"
            }
          },
          {
            path: "nodes",
            name: "Nodes",
            component: Nodes,
            meta: { 
              requiresAuth: true,
              breadCrumb: "Nodes"
            }
          },
          {
            path: "tariff",
            name: "Tariff",
            component: Tariff,
            meta: { 
              requiresAuth: true,
              breadCrumb: "Tariff"
            }
          },
          {
            path: "employee",
            name: "Employee",
            component: Employee,
            meta: { 
              requiresAuth: true,
              breadCrumb: "Employee"
            }
          },
          {
            path: "vehicles",
            name: "Vehicles",
            component: Vehicles,
            meta: { 
              requiresAuth: true,
              breadCrumb: "Vehicles"
            }
          },
          {
            path: "customer",
            name: "Customer",
            component: Customer,
            meta: { 
              requiresAuth: true,
              breadCrumb: "Customer"
            }
          },
          {
            path: "surcharge",
            name: "Surcharge",
            component: Surcharge,
            meta: { 
              requiresAuth: true,
              breadCrumb: "Surcharge"
            }
          },
        ],
        meta: { 
          requiresAuth: true,
          breadCrumb: "Settings"
        }
      },
      {
        path: "transaction",
        name: "transaction",
        component: ContentChild,
        children: [
          {
            path: "new-transactions",
            name: "new-transactions",
            component: Transaction,
            meta: { 
              requiresAuth: true,
              breadCrumb: "New Transaction"
            }
          },
          {
            path: "upload-connote",
            name: "UploadConnote",
            component: UploadTransaction,
            meta: { 
              requiresAuth: true,
              breadCrumb: "Upload Connote"
            }
          },
          {
            path: "complete/:id",
            name: "transactionComplete",
            component: TransactionFinish,
            meta: { 
              requiresAuth: true,
              breadCrumb: "Transaction Complete"
            }
          },
          {
            path: "detail/:id",
            name: "detailConnote",
            component: DetailConnote,
            meta: {
              requiresAuth: true,
              breadCrumb: "Transaction Detail"
            }
          },
        ],
        meta: { 
          requiresAuth: true,
          breadCrumb: "Transaction"
        }
      },
      {
        path: "sales",
        name: "sales",
        component: ContentChild,
        children: [
          {
            path: "transaction",
            name: "transactionList",
            component: TransactionList,
            meta: {
              requiresAuth: true,
              breadCrumb: "Transaction List"
            }
          },
          
          {
            path: "cashregister",
            name: "cashRegister",
            component: CashRegister,
            meta: {
              requiresAuth: true,
              breadCrumb: "Cash Register"
            }
          },
        ],
        meta: { 
          requiresAuth: true,
          breadCrumb: "Sales"
        }
      },
      {
        path: "irreguralities",
        name: "irreguralities",
        component: ContentChild,
        children: [
          {
            path: "cancel",
            name: "irreguralities-cancel",
            component: irreguralitiesCancel,
            meta: {
              requiresAuth: true,
              breadCrumb: "Cancel"
            }
          },
          {
            path: "return",
            name: "irreguralities-return",
            component: irreguralitiesReturn,
            meta: {
              requiresAuth: true,
              breadCrumb: "return"
            }
          },
          {
            path: "problem",
            name: "irreguralities-problem",
            component: irreguralitiesProblem,
            meta: {
              requiresAuth: true,
              breadCrumb: "problem"
            }
          },
          {
            path: "hold",
            name: "irreguralities-hold",
            component: irreguralitiesHold,
            meta: {
              requiresAuth: true,
              breadCrumb: "hold"
            }
          },
          
        ],
        meta: { 
          requiresAuth: true,
          breadCrumb: "Irreguralities"
        }
      },
      
      {
        path: "/report/cashless",
        name: "CashLess",
        component: CashLess,
        meta: { 
          requiresAuth: true,
          breadCrumb: "Cashless"
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
        path: "inventory/unbagging",
        name: "unbagging",
        component: Unbagging,
        meta: {
          requiresAuth: true,
          breadCrumb: "Unbagging"
        }
      },
      {
        path: "/pickup/request",
        name: "pickupRequest",
        component: PickupRequest,
        meta: {
            requiresAuth: true,
            breadCrumb: "Request Pickup"
        }
      },
      {
        path: "/pickup/list",
        name: "pickupList",
        component: PickupList,
        meta: {
          requiresAuth: true,
          breadCrumb: "Pickup List"
        }
      },
      {
        path: "/pickup/schedule",
        name: "pickupSchedule",
        component: PickupSchedule,
        meta: {
          requiresAuth: true,
          breadCrumb: "Pickup Schedule"
        }
      },
      {
        path: "/transport/packingkayu",
        name: "packingkayu",
        component: TransportPackingKayu,
        meta: {
          requiresAuth: true,
          breadCrumb: "Packing Kayu"
        }
      },
      {
        path: "/transport/manifest-jalan",
        name: "SuratJalan",
        component: TransportSuratJalan,
        meta: {
          requiresAuth: true,
          breadCrumb: "Surat Jalan"
        }
      },
      {
        path: "/inbound/prealert",
        name: "InboundIncoming",
        component: InboundIncoming,
        meta: {
          requiresAuth: true,
          breadCrumb: "Inbound Incoming"
        }
      },
      {
        path: "/inbound/prealert/scan/:inbound_number?",
        name: "InboundIncomingScan",
        component: InboundIncomingScan,
        meta: {
          requiresAuth: true,
          breadCrumb: "Inbound Incoming / Receiving"
        }
      },
      {
        path: "/transport/manifest-new",
        name: "transport-manifest-new",
        component: TransportManifest,
        meta: {
          requiresAuth: true,
          breadCrumb: "surat muatan"
        }
      },
      {
        path: "/delivery/runsheet",
        name: "delivery-runsheet",
        component: DeliveryRunsheet,
        meta: {
          requiresAuth: true,
          breadCrumb: "Delivery Assign"
        }
      },
      {
        path: "/delivery/runsheet/edit/:delivery_runsheet_number",
        name: "delivery-runsheet-edit",
        component: DeliveryRunsheetEdit,
        meta: {
          requiresAuth: true,
          breadCrumb: "Delivery Assign"
        }
      },
      {
        path: "/delivery/cod_collect",
        name: "delivery-cod",
        component: DeliveryCod,
        meta: {
          requiresAuth: true,
          breadCrumb: "COD Collect"
        }
      },
      {
        path: "/undelivered",
        name: "delivery-undelivery",
        component: DeliveryUndelivery,
        meta: {
          requiresAuth: true,
          breadCrumb: "Delivery /Undelivered Receiving"
        }
      },
      {
        path: "/delivery/cod_history",
        name: "delivery-cod-history",
        component: DeliveryCodHistory,
        meta: {
          requiresAuth: true,
          breadCrumb: "Cod History"
        }
      },
      {
        path: "/costing/list",
        name: "CostToCostSetting",
        component: CostToCostSetting,
        meta: {
            requiresAuth: true,
            breadCrumb: "Cost To Cost"
        }
      },
      {
        path: "/costing/report",
        name: "CostToCostReport",
        component: CostToCostReport,
        meta: {
            requiresAuth: true,
            breadCrumb: "Cost To Cost"
        }
      },
      ,
      {
        path: "/settings/exchangerate",
        name: "SettingExchangeRate",
        component: SettingExchangeRate,
        meta: {
            requiresAuth: true,
            breadCrumb: "setting"
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
  {
    path: '/print/:id/:type',
    name: 'printGeneral',
    component: printGeneral
  },
  {
    path: '/print-sppap',
    name: 'printSPPAP',
    component: printSPPAP
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
