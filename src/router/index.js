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

// === SLA ===
import Sla from "@/views/settings/sla"

// === Inventory Item or Connote ===
import InventoryItem from "@/views/inventory/connote"

// === Inventory Bag Item ===
import InventoryBagItem from "@/views/inventory/inventory-bag"

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

// === Trace Connote ===
import TraceConnote from '@/views/traceConnote/index'

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

// === Transport Inventory Vehicle ===
import TransportInventoryVehicle from "@/views/transport/inventoryVehicle"

// === Inbound Incoming ===
import InboundIncoming from "@/views/inbound"

// === PackingList ===
import PackingList from "@/views/report/packinglist"

// === Inbound Incoming ===
import InboundIncomingScan from "@/views/inbound/scan"

// === Inbound Incoming Bandara ===
import InboundBandara from "@/views/inboundAirport"

// === Inbound Incoming Bandara Detail ===
import InboundIncomingDetail from "@/views/inboundAirport/prealert/detail"

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
import inventoryIrreguralities from "@/views/irreguralities/inventory"
import irreguralitiesCancel from "@/views/irreguralities/cancel"
import irreguralitiesReturn from "@/views/irreguralities/return"
import irreguralitiesEntryStatus from "@/views/irreguralities/entryStatus"
import irreguralitiesHold from "@/views/irreguralities/hold"
import irreguralitiesFailed from "@/views/irreguralities/failed"
import irreguralitiesTracing from "@/views/irreguralities/tracing"
import irreguralitiesTracingHistory from "@/views/irreguralities/tracing/tracingHistory"

// === Cost To Cost ===
import CostToCostSetting from "@/views/costToCost/setting"

// === Cost To Cost ===
import CostToCostReport from "@/views/costToCost/report"

// === setting kurs ===
import SettingExchangeRate from "@/views/settings/exchange_rate"

// === setting Access Token ===
import SettingAccessToken from "@/views/settings/access_token"

// === profile ===
import Profile from "@/views/auth/profile"

// === Dashboard ===
import DashboardSmartPoint from "@/views/dashboard/smartpoint"

// === Resync Runsheet ===
import ResyncRunsheet from "@/views/admin/resyncRunsheet"
// === blank ===
import BlankPage from "@/views/example/blank"


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
        path: "profile",
        name: "profile",
        component: Profile,
        meta: {
          requiresAuth: true,
          breadCrumb: "User Profile"
        }
      },
      {
        path: "blank",
        name: "blank",
        component: BlankPage,
        meta: {
          requiresAuth: true,
          breadCrumb: "Example Blank Page"
        }
      },
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
          {
            path: "sla",
            name: "SLA",
            component: Sla,
            meta: {
              requiresAuth: true,
              breadCrumb: "SLA"
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
              breadCrumb: "Transaction Detail",
              backPath: "/sales/transaction"
            }
          },
        ],
        meta: {
          requiresAuth: true,
          breadCrumb: "Transaction"
        }
      },
      {
        path: "trace-connote/:id?",
        name: "trace-connote",
        component: TraceConnote,
        children: [],
        meta: {
          requiresAuth: true,
          breadCrumb: "Trace Connote"
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
            path: "inventory",
            name: "inventory-irreguralities",
            component: inventoryIrreguralities,
            meta: {
              requiresAuth: true,
              breadCrumb: "Inventory Irreguralities"
            }
          },
          {
            path: "entry-status",
            name: "irreguralities-entry-status",
            component: irreguralitiesEntryStatus,
            meta: {
              requiresAuth: true,
              breadCrumb: "Entry Status"
            }
          },
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
            path: "hold",
            name: "irreguralities-hold",
            component: irreguralitiesHold,
            meta: {
              requiresAuth: true,
              breadCrumb: "hold"
            }
          },
          {
            path: "failed",
            name: "irreguralities-failed",
            component: irreguralitiesFailed,
            meta: {
              requiresAuth: true,
              breadCrumb: "failed"
            }
          },
          {
            path: "tracing",
            name: "irreguralities-tracing",
            component: irreguralitiesTracing,
            meta: {
              requiresAuth: true,
              breadCrumb: "tracing"
            },
          },
          {
            path: "tracing/:id/",
            name: "irreguralities-tracing-history",
            component: irreguralitiesTracingHistory,
            meta: {
              requiresAuth: true,
              breadCrumb: "tracing",
              backPath: "/irreguralities/tracing"
            }
          }
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
          breadCrumb: "Report"
        }
      },
      {
        path: "/report/packinglist",
        name: "Packinglist",
        component: PackingList,
        meta: {
          requiresAuth: true,
          breadCrumb: "report"
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
        path: "/inventory/bag",
        name: "InventoryBagItem",
        component: InventoryBagItem,
        meta: {
          requiresAuth: true,
          breadCrumb: "Inventory Item"
        }
      },
      {
        path: "/connote-detail/:id",
        name: "InventoryItem-detail",
        component: ConnoteDetail,
        meta: {
          requiresAuth: true,
          breadCrumb: "connote detail",
          backPath: "/inventory/item"
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
          breadCrumb: "bagging detail",
          backPath: "/inventory/bag"
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
      //parent transport
      {
        path: "transport",
        name: "transport",
        component: ContentChild,
        children: [
          {
            path: "manifest",
            name: "transport-manifest",
            component: TransportManifest,
            meta: {
              requiresAuth: true,
              breadCrumb: "Surat Muatan"
            }
          },
          {
            path: "packingkayu",
            name: "packingkayu",
            component: TransportPackingKayu,
            meta: {
              requiresAuth: true,
              breadCrumb: "Packing Kayu"
            }
          },
          {
            path: "manifest-jalan",
            name: "SuratJalan",
            component: TransportSuratJalan,
            meta: {
              requiresAuth: true,
              breadCrumb: "Surat Jalan"
            }
          },
          {
            path: "inventory-vehicle",
            name: "inventoryVehicle",
            component: TransportInventoryVehicle,
            meta: {
              requiresAuth: true,
              breadCrumb: "Inventory Vehicle"
            }
          },


        ],
        meta: {
          requiresAuth: true,
          breadCrumb: "transport"
        }
      },
      {
        path: "/inbound/prealert",
        name: "Receiving",
        component: InboundIncoming,
        meta: {
          requiresAuth: true,
          breadCrumb: "Receiving"
        }
      },
      {
        path: "/inbound/prealert/scan/:inbound_id?",
        name: "InboundIncomingScan",
        component: InboundIncomingScan,
        meta: {
          requiresAuth: true,
          breadCrumb: "Inbound Incoming / Receiving",
          backPath: "/inbound/prealert"
        }
      },
      {
        path: "/inbound-bandara/detail/:inbound_id?",
        name: "InboundIncomingDetail",
        component: InboundIncomingDetail,
        meta: {
          requiresAuth: true,
          breadCrumb: "Inbound Incoming",
          backPath: "/inbound-bandara"
        }
      },
      {
        path: "/inbound-bandara",
        name: "Receiving Bandara",
        component: InboundBandara,
        meta: {
          requiresAuth: true,
          breadCrumb: "Receiving Bandara / Prealert"
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
        path: "/delivery/runsheet/:employee_id",
        name: "delivery-runsheet-new",
        component: DeliveryRunsheetEdit,
        meta: {
          requiresAuth: true,
          breadCrumb: "Delivery Assign",
          backPath: "/delivery/runsheet"
        }
      },
      {
        path: "/delivery/runsheet/:employee_id/edit/:delivery_runsheet_number/:date_filter?",
        name: "delivery-runsheet-edit",
        component: DeliveryRunsheetEdit,
        meta: {
          requiresAuth: true,
          breadCrumb: "Delivery Assign",
          backPath: "/delivery/runsheet"
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
          breadCrumb: "Undelivery / Undelivery Receiving"
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
      {
        path: "/settings/exchangerate",
        name: "SettingExchangeRate",
        component: SettingExchangeRate,
        meta: {
            requiresAuth: true,
            breadCrumb: "setting"
        }
      },
      {
        path: "/settings/access-token",
        name: "SettingAccessToken",
        component: SettingAccessToken,
        meta: {
            requiresAuth: true,
            breadCrumb: "setting"
        }
      },
      {
        path: "/dashboard/smartpoint",
        name: "DashboardSmartPoint",
        component: DashboardSmartPoint,
        meta: {
          requiresAuth: true,
          breadCrumb: "Dashboard"
        }
      },
        {
            path: "/resync/runsheet",
            name: "ResyncRunsheet",
            component: ResyncRunsheet,
            meta: {
                requiresAuth: true,
                breadCrumb: "Admin"
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
    path: '/print/:id/:type/:node_id?/:employee_id?',
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
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
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
