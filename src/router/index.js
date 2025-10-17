import Vue from 'vue'
import VueRouter from 'vue-router'
import master from '@/mixins/master'

import Login from '@/views/auth'

import Content from '@/views/template/Content.vue'
import ContentChild from '@/views/template/Content-child'
import ContentChildWithTab from '@/views/template/ContentChildWithTab'
import MainPage from '@/views/template/mainPage'

import Upload from '@/views/upload/index.vue'
import UploadTransaction from '@/views/upload/transaction.vue'

import NotFound from '@/components/error/404-NotFound.vue'
import Forbidden from '@/components/error/403-Forbidden.vue'
import ServerError from '@/components/error/500-ServerError.vue'
import SystemMaintenance from '@/components/error/SystemMaintenance.vue'

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
import Employee from '@/views/settings/employee'

// === Vehicles ===
import Vehicles from '@/views/settings/vehicles'

// === Customer ===
import Customer from '@/views/settings/customer'

// === Surcharge ===
import Surcharge from '@/views/settings/surcharge'

// === SLA ===
import Sla from '@/views/settings/sla'

// === Configuration Warning Runsheet ===
import ConfigurationWarningRunsheet from '@/views/settings/configurationWarningRunsheet'

// === KPI ===
import KeyPerformanceIndicator from '@/views/settings/kpi'

// === Inventory Item or Connote ===
import InventoryItem from '@/views/inventory/connote'

// === Inventory Bag Item ===
import InventoryBagItem from '@/views/inventory/inventory-bag'

// === Inventory Item or Bag ===
import InventoryBag from '@/views/inventory/bag'

// === Inventory Item or Bag detail===
import InventoryBagDetail from '@/views/inventory/bag/bagDetail'

// === Inventory Item Connote detail===
import ConnoteDetail from '@/views/inventory/connote-detail'

// === Print ===
import PrintBPIK from '@/views/print/printBPIK'
import printSPPAP from '@/views/print/printSPPAP'
import printGeneral from '@/views/print/general'

// === Transaction List ===
import TransactionList from '@/views/transactionList'
import TransactionFinish from '@/views/transaction/finish'

// === Transaction Detail ===
import DetailConnote from '@/views/transactionList/detail'

// === Trace Connote ===
import TraceConnote from '@/views/traceConnote/index'

// === Trace Bag ===
import TraceBag from '@/views/traceBag/index'

// === Trace Flight ===
import TraceFlight from '@/views/traceFlight/index'

// === Cash Register  ===
import CashRegister from '@/views/cashRegister'

// === Inventory Unbagging  ===
import Unbagging from '@/views/inventory/unbag'

// === Inventory Sorting Connote  ===
import SortingConnote from '@/views/inventory/sorting/connote'

// === Inventory Sorting Bag  ===
import SortingBag from '@/views/inventory/sorting/bag'

// === Pickup Request ===
import PickupRequest from '@/views/pickup/request'

// === Pickup List ===
import PickupList from '@/views/pickup/list'

// === Pickup Schedule ===
import PickupSchedule from '@/views/pickup/schedule'

// === Transport Packing Kayu ===
import TransportPackingKayu from '@/views/transport/transportPackingKayu'

// === Transport Surat Jalan ===
import TransportSuratJalan from '@/views/transport/suratJalanNew'

// === Transport Inventory Vehicle ===
import TransportInventoryVehicle from '@/views/transport/inventoryVehicle'

// === Inbound Incoming ===
import InboundIncoming from '@/views/inbound'

// === PackingList ===
import PackingList from '@/views/report/packinglist'

// === Inbound Incoming ===
import InboundIncomingScan from '@/views/inbound/scan'

// === Inbound Incoming Bandara ===
import InboundBandara from '@/views/inboundAirport'

// === Inbound Incoming Airpot Scan ===
import InboundAirportScan from '@/views/inboundAirport/scan'

// === Inbound Incoming Bandara ===
import InboundBandaraDetail from '@/views/inboundAirport/suratJalan/detailSuratJalan'

// === Inbound Incoming Bandara Detail ===
import InboundIncomingDetail from '@/views/inboundAirport/prealert/detail'

// === Transport Manifest ===
import TransportManifest from '@/views/transport/manifestNew'

// === Transport Manifest ===
import TransportManifestVehicle from '@/views/transport/manifestVehicle'

// === Delivery Runsheet ===
import DeliveryRunsheet from '@/views/delivery/runsheetNew'

// === Delivery Runsheet EDIT===
import DeliveryRunsheetEdit from '@/views/delivery/runsheetNew/edit'

// === Delivery COD===
import DeliveryCod from '@/views/delivery/cod'

// === Handover Runsheet ===
import HandoverRunsheet from '@/views/delivery/hrs'

// === Handover Runsheet History ===
import HandoverRunsheetHistory from '@/views/delivery/hrsHistory'

// === Delivery Undelivery ===
import DeliveryUndelivery from '@/views/delivery/undelivery'

// === Delivery COD History ===
import DeliveryCodHistory from '@/views/delivery/codHistory'

import CashLess from '@/views/report/cashless'

// === Irreguralities ===
import inventoryIrreguralities from '@/views/irreguralities/inventory'
import irreguralitiesCancel from '@/views/irreguralities/cancel'
import irreguralitiesReturn from '@/views/irreguralities/return'
import irreguralitiesEntryStatus from '@/views/irreguralities/entryStatus'
import irreguralitiesHold from '@/views/irreguralities/hold'
import irreguralitiesFailed from '@/views/irreguralities/failed'

import Tracing from '@/views/tracing'
import TracingDetail from '@/views/tracing/detail/index'

// === Cost To Cost ===
import CostToCostSetting from '@/views/costToCost/setting'

// === Cost To Cost ===
import CostToCostReport from '@/views/costToCost/report'

// === setting kurs ===
import SettingExchangeRate from '@/views/settings/exchange_rate'

// === setting Access Token ===
import SettingAccessToken from '@/views/settings/access_token'

// === profile ===
import Profile from '@/views/auth/profile'

// === Dashboard ===
import DashboardSmartPoint from '@/views/dashboard/smartpoint'

// === Resync Runsheet ===
import ResyncRunsheet from '@/views/admin/resyncRunsheet'

// === Help ===
import ErrorDictionary from '@/views/help/errorDictionary'
import ShortcutDictionary from '@/views/help/shortcutDictionary'

// === blank ===
import BlankPage from '@/views/example/blank'

// === Helpdesk ===
import HelpdeskConnote from '@/views/helpdesk/connote/index'
import HelpdeskRunsheet from '@/views/helpdesk/runsheet/index'

// === Facility Code ===
import FacilityCode from '@/views/settings/facilityCode'

// === Bag Settings ===
import Bag from '@/views/settings/bag/index'

// === Runsheet Settings ===
import SettingsRunsheet from '@/views/settings/runsheet/index'

// === Courier Settings ===
import SettingsCourier from '@/views/settings/courier/index'

// === System Scope ===
import SettingsSystemScope from '@/views/settings/systemScope/index'

// === Connote Adjustment ===
import ConnoteCancel from '@/views/connoteAdjustment/connoteCancel'
import ConnoteForward from '@/views/connoteAdjustment/connoteForward'
import ConnoteReturn from '@/views/connoteAdjustment/connoteReturn'

// === Audit Inventory ===
import InvalidReceiving from '@/views/audit/invalidReceiving'
import InvalidOpeningBag from '@/views/audit/invalidOpeningBag'

// === Destination Zip Code ===
import Destination from '@/views/settings/destination'

// === Surat Muatan Settings ===
import SuratMuatanSettings from '@/views/settings/suratMuatan'

// === Receiving Log ===
import ReceivingLog from '@/views/receivingLog'

// === Claim and Burden ===
import ClaimAndBurden from '@/views/claimBurden'

import { resourceLookup } from '@/constants'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/print-bpik',
        name: 'printBpik',
        component: PrintBPIK,
        resource_type: resourceLookup['PRINT_BPIK'].resource_type,
        resource_code: resourceLookup['PRINT_BPIK'].resource_code,
        resource_name: resourceLookup['PRINT_BPIK'].resource_name,
        isMaintenanceMode: false,
        permission: '',
    },
    {
        path: '/print/:id/:type/:node_id?/:employee_id?',
        name: 'printGeneral',
        component: printGeneral,
        resource_type: resourceLookup['PRINT_GENERAL'].resource_type,
        resource_code: resourceLookup['PRINT_GENERAL'].resource_code,
        resource_name: resourceLookup['PRINT_GENERAL'].resource_name,
        isMaintenanceMode: false,
        permission: '',
    },
    {
        path: '/print-sppap',
        name: 'printSPPAP',
        component: printSPPAP,
        resource_type: resourceLookup['PRINT_SPPAP'].resource_type,
        resource_code: resourceLookup['PRINT_SPPAP'].resource_code,
        resource_name: resourceLookup['PRINT_SPPAP'].resource_name,
        isMaintenanceMode: false,
        permission: '',
    },
    {
        path: '/',
        name: 'main',
        component: Content,
        children: [
            {
                path: '',
                name: 'mainPage',
                component: MainPage,
                meta: {
                    requiresAuth: true,
                    breadCrumb: '',
                    resource_type: resourceLookup['MAINPAGE'].resource_type,
                    resource_code: resourceLookup['MAINPAGE'].resource_code,
                    resource_name: resourceLookup['MAINPAGE'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: 'profile',
                name: 'profile',
                component: Profile,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'User Profile',
                    resource_type: resourceLookup['PROFILE'].resource_type,
                    resource_code: resourceLookup['PROFILE'].resource_code,
                    resource_name: resourceLookup['PROFILE'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: 'blank',
                name: 'blank',
                component: BlankPage,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Example Blank Page',
                    resource_type: resourceLookup['BLANK'].resource_type,
                    resource_code: resourceLookup['BLANK'].resource_code,
                    resource_name: resourceLookup['BLANK'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: 'settings',
                name: 'settings',
                component: ContentChild,
                children: [
                    {
                        path: 'users',
                        name: 'users',
                        component: Users,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Users',
                            resource_type: resourceLookup['SETTINGS_USERS'].resource_type,
                            resource_code: resourceLookup['SETTINGS_USERS'].resource_code,
                            resource_name: resourceLookup['SETTINGS_USERS'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-user',
                        },
                    },
                    {
                        path: 'geolocation',
                        name: 'Geolocation',
                        component: Geolocation,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Geolocation',
                            resource_type: resourceLookup['SETTINGS_GEOLOCATION'].resource_type,
                            resource_code: resourceLookup['SETTINGS_GEOLOCATION'].resource_code,
                            resource_name: resourceLookup['SETTINGS_GEOLOCATION'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-geolocation-country',
                        },
                    },
                    {
                        path: 'nodes',
                        name: 'Nodes',
                        component: Nodes,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Nodes',
                            resource_type: resourceLookup['SETTINGS_NODES'].resource_type,
                            resource_code: resourceLookup['SETTINGS_NODES'].resource_code,
                            resource_name: resourceLookup['SETTINGS_NODES'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-node',
                        },
                    },
                    {
                        path: 'tariff',
                        name: 'Tariff',
                        component: Tariff,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Tariff',
                            resource_type: resourceLookup['SETTINGS_TARIFF'].resource_type,
                            resource_code: resourceLookup['SETTINGS_TARIFF'].resource_code,
                            resource_name: resourceLookup['SETTINGS_TARIFF'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-tariff',
                        },
                    },
                    {
                        path: 'employee',
                        name: 'Employee',
                        component: Employee,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Employee',
                            resource_type: resourceLookup['SETTINGS_EMPLOYEE'].resource_type,
                            resource_code: resourceLookup['SETTINGS_EMPLOYEE'].resource_code,
                            resource_name: resourceLookup['SETTINGS_EMPLOYEE'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-employee',
                        },
                    },
                    {
                        path: 'vehicles',
                        name: 'Vehicles',
                        component: Vehicles,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Vehicles',
                            resource_type: resourceLookup['SETTINGS_VEHICLES'].resource_type,
                            resource_code: resourceLookup['SETTINGS_VEHICLES'].resource_code,
                            resource_name: resourceLookup['SETTINGS_VEHICLES'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-vehicle',
                        },
                    },
                    {
                        path: 'customer',
                        name: 'Customer',
                        component: Customer,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Customer',
                            resource_type: resourceLookup['SETTINGS_CUSTOMER'].resource_type,
                            resource_code: resourceLookup['SETTINGS_CUSTOMER'].resource_code,
                            resource_name: resourceLookup['SETTINGS_CUSTOMER'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-customer',
                        },
                    },
                    {
                        path: 'surcharge',
                        name: 'Surcharge',
                        component: Surcharge,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Surcharge',
                            resource_type: resourceLookup['SETTINGS_SURCHARGE'].resource_type,
                            resource_code: resourceLookup['SETTINGS_SURCHARGE'].resource_code,
                            resource_name: resourceLookup['SETTINGS_SURCHARGE'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-surcharge',
                        },
                    },
                    {
                        path: 'sla',
                        name: 'SLA',
                        component: Sla,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'SLA',
                            resource_type: resourceLookup['SETTINGS_SLA'].resource_type,
                            resource_code: resourceLookup['SETTINGS_SLA'].resource_code,
                            resource_name: resourceLookup['SETTINGS_SLA'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-sla',
                        },
                    },
                    {
                        path: 'configuration-warning-runsheet',
                        name: 'ConfigurationWarningRunsheet',
                        component: ConfigurationWarningRunsheet,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Configuration Warning Runsheet',
                            resource_type:
                                resourceLookup['SETTINGS_CONFIGURATION_WARNING_RUNSHEET']
                                    .resource_type,
                            resource_code:
                                resourceLookup['SETTINGS_CONFIGURATION_WARNING_RUNSHEET']
                                    .resource_code,
                            resource_name:
                                resourceLookup['SETTINGS_CONFIGURATION_WARNING_RUNSHEET']
                                    .resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-warning-koli-setting',
                        },
                    },
                    {
                        path: 'facility-code',
                        name: 'FacilityCode',
                        component: FacilityCode,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Facility Code',
                            resource_type: resourceLookup['SETTINGS_FACILITY_CODE'].resource_type,
                            resource_code: resourceLookup['SETTINGS_FACILITY_CODE'].resource_code,
                            resource_name: resourceLookup['SETTINGS_FACILITY_CODE'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-facility-code',
                        },
                    },
                    {
                        path: 'kpi',
                        name: 'KPI',
                        component: KeyPerformanceIndicator,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'KPI',
                            resource_type: resourceLookup['SETTINGS_KPI'].resource_type,
                            resource_code: resourceLookup['SETTINGS_KPI'].resource_code,
                            resource_name: resourceLookup['SETTINGS_KPI'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'bag',
                        name: 'Bag',
                        component: Bag,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Bag',
                            resource_type: resourceLookup['SETTINGS_BAG'].resource_type,
                            resource_code: resourceLookup['SETTINGS_BAG'].resource_code,
                            resource_name: resourceLookup['SETTINGS_BAG'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'destination',
                        name: 'Destination',
                        component: Destination,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Destination',
                            resource_type: resourceLookup['DESTINATION'].resource_type,
                            resource_code: resourceLookup['DESTINATION'].resource_code,
                            resource_name: resourceLookup['DESTINATION'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'surat-muatan',
                        name: 'SuratMuatanSettings',
                        component: SuratMuatanSettings,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Surat Muatan',
                            resource_type: resourceLookup['SETTINGS_SURAT_MUATAN'].resource_type,
                            resource_code: resourceLookup['SETTINGS_SURAT_MUATAN'].resource_code,
                            resource_name: resourceLookup['SETTINGS_SURAT_MUATAN'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'runsheet',
                        name: 'Runsheet',
                        component: SettingsRunsheet,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Runsheet',
                            resource_type: resourceLookup['SETTINGS_RUNSHEET'].resource_type,
                            resource_code: resourceLookup['SETTINGS_RUNSHEET'].resource_code,
                            resource_name: resourceLookup['SETTINGS_RUNSHEET'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'courier',
                        name: 'Courier',
                        component: SettingsCourier,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Courier',
                            resource_type: resourceLookup['SETTINGS_COURIER'].resource_type,
                            resource_code: resourceLookup['SETTINGS_COURIER'].resource_code,
                            resource_name: resourceLookup['SETTINGS_COURIER'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-courier-delivery-area',
                        },
                    },
                    {
                        path: 'system-scope',
                        name: 'SystemScope',
                        component: SettingsSystemScope,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'System Scope',
                            resource_type: resourceLookup['SYSTEM_SCOPE'].resource_type,
                            resource_code: resourceLookup['SYSTEM_SCOPE'].resource_code,
                            resource_name: resourceLookup['SYSTEM_SCOPE'].resource_name,
                            isMaintenanceMode: false,
                            permission: '', // TODO: REMOVE AND CHANGE TO BELOW LATER
                            // permission: 'read-application-role',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Settings',
                },
            },
            {
                path: 'transaction',
                name: 'transaction',
                component: ContentChild,
                children: [
                    {
                        path: 'new-transactions',
                        name: 'new-transactions',
                        component: Transaction,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'New Transaction',
                            resource_type:
                                resourceLookup['TRANSACTION_NEW_TRANSACTION'].resource_type,
                            resource_code:
                                resourceLookup['TRANSACTION_NEW_TRANSACTION'].resource_code,
                            resource_name:
                                resourceLookup['TRANSACTION_NEW_TRANSACTION'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'create-transaction',
                        },
                    },
                    {
                        path: 'upload-connote',
                        name: 'UploadConnote',
                        component: UploadTransaction,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Upload Connote',
                            resource_type:
                                resourceLookup['TRANSACTION_UPLOAD_CONNOTE'].resource_type,
                            resource_code:
                                resourceLookup['TRANSACTION_UPLOAD_CONNOTE'].resource_code,
                            resource_name:
                                resourceLookup['TRANSACTION_UPLOAD_CONNOTE'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'create-transaction',
                        },
                    },
                    {
                        path: 'complete/:id',
                        name: 'transactionComplete',
                        component: TransactionFinish,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Transaction Complete',
                            resource_type: resourceLookup['TRANSACTION_COMPLETE'].resource_type,
                            resource_code: resourceLookup['TRANSACTION_COMPLETE'].resource_code,
                            resource_name: resourceLookup['TRANSACTION_COMPLETE'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'detail/:id',
                        name: 'detailConnote',
                        component: DetailConnote,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Transaction Detail',
                            backPath: '/sales/transaction',
                            resource_type: resourceLookup['TRANSACTION_DETAIL'].resource_type,
                            resource_code: resourceLookup['TRANSACTION_DETAIL'].resource_code,
                            resource_name: resourceLookup['TRANSACTION_DETAIL'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Transaction',
                },
            },
            {
                path: 'sales',
                name: 'sales',
                component: ContentChild,
                children: [
                    {
                        path: 'transaction',
                        name: 'transactionList',
                        component: TransactionList,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Transaction List',
                            resource_type: resourceLookup['SALES_TRANSACTION_LIST'].resource_type,
                            resource_code: resourceLookup['SALES_TRANSACTION_LIST'].resource_code,
                            resource_name: resourceLookup['SALES_TRANSACTION_LIST'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-transaction',
                        },
                    },

                    {
                        path: 'cashregister',
                        name: 'cashRegister',
                        component: CashRegister,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Cash Register',
                            resource_type: resourceLookup['SALES_CASH_REGISTER'].resource_type,
                            resource_code: resourceLookup['SALES_CASH_REGISTER'].resource_code,
                            resource_name: resourceLookup['SALES_CASH_REGISTER'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'create-transaction',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Sales',
                },
            },
            {
                path: 'audit',
                name: 'audit',
                component: ContentChild,
                children: [
                    {
                        path: 'invalid-receiving',
                        name: 'invalid-receiving',
                        component: InvalidReceiving,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Invalid Receiving',
                            resource_type: resourceLookup['INVALID_RECEIVING'].resource_type,
                            resource_code: resourceLookup['INVALID_RECEIVING'].resource_code,
                            resource_name: resourceLookup['INVALID_RECEIVING'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-audit-receiving',
                        },
                    },
                    {
                        path: 'invalid-opening-bag',
                        name: 'invalid-opening-bag',
                        component: InvalidOpeningBag,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Invalid Opening Bag',
                            resource_type: resourceLookup['INVALID_OPENING_BAG'].resource_type,
                            resource_code: resourceLookup['INVALID_OPENING_BAG'].resource_code,
                            resource_name: resourceLookup['INVALID_OPENING_BAG'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-audit-opening-bag',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'audit',
                },
            },
            {
                path: 'connote-adjustment',
                name: 'connote-adjustment',
                component: ContentChild,
                children: [
                    {
                        path: 'connote-cancel',
                        name: 'connote-cancel',
                        component: ConnoteCancel,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Connote Cancel',
                            resource_type:
                                resourceLookup['CONNOTE_ADJUSTMENT_CONNOTE_CANCEL'].resource_type,
                            resource_code:
                                resourceLookup['CONNOTE_ADJUSTMENT_CONNOTE_CANCEL'].resource_code,
                            resource_name:
                                resourceLookup['CONNOTE_ADJUSTMENT_CONNOTE_CANCEL'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-irregularity',
                        },
                    },
                    {
                        path: 'connote-cancel-history',
                        name: 'connote-cancel-history',
                        component: ConnoteCancel,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Connote Cancel History',
                            resource_type:
                                resourceLookup['CONNOTE_ADJUSTMENT_CONNOTE_CANCEL_HISTORY']
                                    .resource_type,
                            resource_code:
                                resourceLookup['CONNOTE_ADJUSTMENT_CONNOTE_CANCEL_HISTORY']
                                    .resource_code,
                            resource_name:
                                resourceLookup['CONNOTE_ADJUSTMENT_CONNOTE_CANCEL_HISTORY']
                                    .resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-irregularity',
                        },
                    },
                    {
                        path: 'connote-forward',
                        name: 'connote-forward',
                        component: ConnoteForward,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Connote Forward',
                            resource_type:
                                resourceLookup['CONNOTE_ADJUSTMENT_CONNOTE_FORWARD'].resource_type,
                            resource_code:
                                resourceLookup['CONNOTE_ADJUSTMENT_CONNOTE_FORWARD'].resource_code,
                            resource_name:
                                resourceLookup['CONNOTE_ADJUSTMENT_CONNOTE_FORWARD'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-irregularity',
                        },
                    },
                    {
                        path: 'connote-return',
                        name: 'connote-return',
                        component: ConnoteReturn,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Connote Return',
                            resource_type:
                                resourceLookup['CONNOTE_ADJUSTMENT_CONNOTE_RETURN'].resource_type,
                            resource_code:
                                resourceLookup['CONNOTE_ADJUSTMENT_CONNOTE_RETURN'].resource_code,
                            resource_name:
                                resourceLookup['CONNOTE_ADJUSTMENT_CONNOTE_RETURN'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-irregularity',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Connote Adjustment',
                },
            },
            {
                path: '',
                name: 'tracing',
                component: ContentChild,
                children: [
                    {
                        path: '/tracing-outstanding',
                        name: 'tracing',
                        component: Tracing,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Tracing Outstanding',
                            resource_type: resourceLookup['TRACING'].resource_type,
                            resource_code: resourceLookup['TRACING'].resource_code,
                            resource_name: resourceLookup['TRACING'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-irregularity',
                        },
                    },
                    {
                        path: '/tracing-outstanding/:id',
                        name: 'tracing-detail',
                        component: TracingDetail,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Outstanding',
                            backPath: '/tracing-outstanding',
                            resource_type: resourceLookup['TRACING_DETAIL'].resource_type,
                            resource_code: resourceLookup['TRACING_DETAIL'].resource_code,
                            resource_name: resourceLookup['TRACING_DETAIL'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: '/tracing-history',
                        name: 'tracingHistory',
                        component: Tracing,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'History',
                            resource_type: resourceLookup['TRACING_HISTORY'].resource_type,
                            resource_code: resourceLookup['TRACING_HISTORY'].resource_code,
                            resource_name: resourceLookup['TRACING_HISTORY'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-irregularity',
                        },
                    },
                    {
                        path: '/tracing-history/:id',
                        name: 'tracingHistoryDetail',
                        component: TracingDetail,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'History',
                            backPath: '/tracing-history',
                            resource_type: resourceLookup['TRACING_HISTORY_DETAIL'].resource_type,
                            resource_code: resourceLookup['TRACING_HISTORY_DETAIL'].resource_code,
                            resource_name: resourceLookup['TRACING_HISTORY_DETAIL'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'WUS',
                },
            },
            {
                path: 'irreguralities',
                name: 'irreguralities',
                component: ContentChild,
                children: [
                    {
                        path: 'inventory',
                        name: 'inventory-irreguralities',
                        component: inventoryIrreguralities,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Inventory Irreguralities',
                            resource_type: resourceLookup['IRREGURALITIES_INVENTORY'].resource_type,
                            resource_code: resourceLookup['IRREGURALITIES_INVENTORY'].resource_code,
                            resource_name: resourceLookup['IRREGURALITIES_INVENTORY'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-irregularity',
                        },
                    },
                    {
                        path: 'entry-status',
                        name: 'irreguralities-entry-status',
                        component: irreguralitiesEntryStatus,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Entry Status',
                            resource_type:
                                resourceLookup['IRREGURALITIES_ENTRY_STATUS'].resource_type,
                            resource_code:
                                resourceLookup['IRREGURALITIES_ENTRY_STATUS'].resource_code,
                            resource_name:
                                resourceLookup['IRREGURALITIES_ENTRY_STATUS'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-irregularity',
                        },
                    },
                    // {
                    //   path: "cancel",
                    //   name: "irreguralities-cancel",
                    //   component: irreguralitiesCancel,
                    //   meta: {
                    //     requiresAuth: true,
                    //     breadCrumb: "Cancel"
                    //   }
                    // },
                    // {
                    //   path: "return",
                    //   name: "irreguralities-return",
                    //   component: irreguralitiesReturn,
                    //   meta: {
                    //     requiresAuth: true,
                    //     breadCrumb: "return"
                    //   }
                    // },
                    {
                        path: 'hold',
                        name: 'irreguralities-hold',
                        component: irreguralitiesHold,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'hold',
                            resource_type: resourceLookup['IRREGURALITIES_HOLD'].resource_type,
                            resource_code: resourceLookup['IRREGURALITIES_HOLD'].resource_code,
                            resource_name: resourceLookup['IRREGURALITIES_HOLD'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-irregularity',
                        },
                    },
                    {
                        path: 'failed',
                        name: 'irreguralities-failed',
                        component: irreguralitiesFailed,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'failed',
                            resource_type: resourceLookup['IRREGURALITIES_FAILED'].resource_type,
                            resource_code: resourceLookup['IRREGURALITIES_FAILED'].resource_code,
                            resource_name: resourceLookup['IRREGURALITIES_FAILED'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-irregularity',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Irreguralities',
                },
            },
            {
                path: '/report/cashless',
                name: 'CashLess',
                component: CashLess,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Report',
                    resource_type: resourceLookup['CASHLESS'].resource_type,
                    resource_code: resourceLookup['CASHLESS'].resource_code,
                    resource_name: resourceLookup['CASHLESS'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-cashless',
                },
            },
            {
                path: '/report/packinglist',
                name: 'Packinglist',
                component: PackingList,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'report',
                    resource_type: resourceLookup['PACKINGLIST'].resource_type,
                    resource_code: resourceLookup['PACKINGLIST'].resource_code,
                    resource_name: resourceLookup['PACKINGLIST'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-report-packing-list',
                },
            },
            {
                path: '/upload',
                name: 'Upload',
                component: Upload,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Upload',
                    resource_type: resourceLookup['UPLOAD'].resource_type,
                    resource_code: resourceLookup['UPLOAD'].resource_code,
                    resource_name: resourceLookup['UPLOAD'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: '/connote-detail/:id',
                name: 'InventoryItem-detail',
                component: ConnoteDetail,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'connote detail',
                    backPath: '/inventory/item',
                    resource_type: resourceLookup['INVENTORY_ITEM_DETAIL'].resource_type,
                    resource_code: resourceLookup['INVENTORY_ITEM_DETAIL'].resource_code,
                    resource_name: resourceLookup['INVENTORY_ITEM_DETAIL'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: '/bagging-detail/:id',
                name: 'InventoryBagDetail',
                component: InventoryBagDetail,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'bagging detail',
                    backPath: '/inventory/bag',
                    resource_type: resourceLookup['INVENTORY_BAG_DETAIL'].resource_type,
                    resource_code: resourceLookup['INVENTORY_BAG_DETAIL'].resource_code,
                    resource_name: resourceLookup['INVENTORY_BAG_DETAIL'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },

            {
                path: 'inventory/unbagging',
                name: 'unbagging',
                component: Unbagging,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Unbagging',
                    resource_type: resourceLookup['UNBAGGING'].resource_type,
                    resource_code: resourceLookup['UNBAGGING'].resource_code,
                    resource_name: resourceLookup['UNBAGGING'].resource_name,
                    isMaintenanceMode: false,
                    permission: ['read-inventory', 'read-unbag'],
                },
            },
            {
                path: '/sorting/connote',
                name: 'sorting-connote',
                component: SortingConnote,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Sorting',
                    resource_type: resourceLookup['SORTING_CONNOTE'].resource_type,
                    resource_code: resourceLookup['SORTING_CONNOTE'].resource_code,
                    resource_name: resourceLookup['SORTING_CONNOTE'].resource_name,
                    isMaintenanceMode: false,
                    permission: ['read-inventory', 'read-bag'],
                },
            },
            {
                path: '/sorting/bag',
                name: 'sorting-bag',
                component: SortingBag,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Sorting',
                    resource_type: resourceLookup['SORTING_BAG'].resource_type,
                    resource_code: resourceLookup['SORTING_BAG'].resource_code,
                    resource_name: resourceLookup['SORTING_BAG'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: '/pickup/request',
                name: 'pickupRequest',
                component: PickupRequest,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Request Pickup',
                    resource_type: resourceLookup['PICKUP_REQUEST'].resource_type,
                    resource_code: resourceLookup['PICKUP_REQUEST'].resource_code,
                    resource_name: resourceLookup['PICKUP_REQUEST'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'create-pickup',
                },
            },
            {
                path: '/pickup/list',
                name: 'pickupList',
                component: PickupList,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Pickup List',
                    resource_type: resourceLookup['PICKUP_LIST'].resource_type,
                    resource_code: resourceLookup['PICKUP_LIST'].resource_code,
                    resource_name: resourceLookup['PICKUP_LIST'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-pickup',
                },
            },
            {
                path: '/pickup/schedule',
                name: 'pickupSchedule',
                component: PickupSchedule,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Pickup Schedule',
                    resource_type: resourceLookup['PICKUP_SCHEDULE'].resource_type,
                    resource_code: resourceLookup['PICKUP_SCHEDULE'].resource_code,
                    resource_name: resourceLookup['PICKUP_SCHEDULE'].resource_name,
                    isMaintenanceMode: false,
                    permission: ['create-pickup-schedule', 'read-pickup-schedule'],
                },
            },
            //parent transport
            {
                path: 'transport',
                name: 'transport',
                component: ContentChild,
                children: [
                    {
                        path: 'manifest-vehicle/:id?',
                        name: 'transport-manifest-vehicle',
                        component: TransportManifestVehicle,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Manifest Vehicle',
                            resource_type:
                                resourceLookup['TRANSPORT_MANIFEST_VEHICLE'].resource_type,
                            resource_code:
                                resourceLookup['TRANSPORT_MANIFEST_VEHICLE'].resource_code,
                            resource_name:
                                resourceLookup['TRANSPORT_MANIFEST_VEHICLE'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-manifest-vehicle',
                        },
                    },
                    {
                        path: 'packingkayu',
                        name: 'packingkayu',
                        component: TransportPackingKayu,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Packing Kayu',
                            resource_type: resourceLookup['TRANSPORT_PACKING_KAYU'].resource_type,
                            resource_code: resourceLookup['TRANSPORT_PACKING_KAYU'].resource_code,
                            resource_name: resourceLookup['TRANSPORT_PACKING_KAYU'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-packing-kayu',
                        },
                    },
                    {
                        path: 'inventory-vehicle',
                        name: 'inventoryVehicle',
                        component: TransportInventoryVehicle,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Inventory Vehicle',
                            resource_type:
                                resourceLookup['TRANSPORT_INVENTORY_VEHICLE'].resource_type,
                            resource_code:
                                resourceLookup['TRANSPORT_INVENTORY_VEHICLE'].resource_code,
                            resource_name:
                                resourceLookup['TRANSPORT_INVENTORY_VEHICLE'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-inventory-vehicle',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'transport',
                },
            },
            {
                path: '/inbound/prealert/scan/:inbound_number?',
                name: 'InboundIncomingScan',
                component: InboundIncomingScan,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Inbound Incoming / Receiving',
                    backPath: '/inbound/prealert',
                    resource_type: resourceLookup['INBOUND_INCOMING_SCAN'].resource_type,
                    resource_code: resourceLookup['INBOUND_INCOMING_SCAN'].resource_code,
                    resource_name: resourceLookup['INBOUND_INCOMING_SCAN'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: '/inbound-airport/detail/:inbound_number?',
                name: 'InboundIncomingDetail',
                component: InboundIncomingDetail,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Inbound Incoming',
                    backPath: '/inbound-airport',
                    resource_type: resourceLookup['INBOUND_INCOMING_DETAIL'].resource_type,
                    resource_code: resourceLookup['INBOUND_INCOMING_DETAIL'].resource_code,
                    resource_name: resourceLookup['INBOUND_INCOMING_DETAIL'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: '/inbound-airport',
                name: 'Airport Receiving',
                component: InboundBandara,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Airport Receiving / Prealert',
                    resource_type: resourceLookup['AIRPORT_RECEIVING'].resource_type,
                    resource_code: resourceLookup['AIRPORT_RECEIVING'].resource_code,
                    resource_name: resourceLookup['AIRPORT_RECEIVING'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-airport-prealert',
                },
            },
            {
                path: '/inbound-airport/scan/:inbound_number?',
                name: 'InboundAirportScan',
                component: InboundAirportScan,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Airport Receiving',
                    resource_type: resourceLookup['RECEIVING_AIRPORT_SCAN'].resource_type,
                    resource_code: resourceLookup['RECEIVING_AIRPORT_SCAN'].resource_code,
                    resource_name: resourceLookup['RECEIVING_AIRPORT_SCAN'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-inbound-staging',
                },
            },
            {
                path: '/inbound-airport/sj/:id',
                name: 'Airport Receiving Detail',
                component: InboundBandaraDetail,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Airport Receiving',
                    resource_type: resourceLookup['AIRPORT_RECEIVING_DETAIL'].resource_type,
                    resource_code: resourceLookup['AIRPORT_RECEIVING_DETAIL'].resource_code,
                    resource_name: resourceLookup['AIRPORT_RECEIVING_DETAIL'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-airport-prealert',
                },
            },
            {
                path: '/claim-and-burden',
                name: 'Claim and Charge',
                component: ClaimAndBurden,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Claim And Charge',
                    resource_type: resourceLookup['CLAIM_AND_BURDEN'].resource_type,
                    resource_code: resourceLookup['CLAIM_AND_BURDEN'].resource_code,
                    resource_name: resourceLookup['CLAIM_AND_BURDEN'].resource_name,
                    isMaintenanceMode: false,
                    // permission: ['read-inventory', 'read-bag'],
                },
            },
            {
                path: '/delivery/runsheet',
                name: 'delivery-runsheet',
                component: DeliveryRunsheet,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Delivery Assign',
                    resource_type: resourceLookup['DELIVERY_RUNSHEET'].resource_type,
                    resource_code: resourceLookup['DELIVERY_RUNSHEET'].resource_code,
                    resource_name: resourceLookup['DELIVERY_RUNSHEET'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-runsheet',
                },
            },
            {
                path: '/delivery/runsheet/:employee_id',
                name: 'delivery-runsheet-new',
                component: DeliveryRunsheetEdit,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Delivery Assign',
                    backPath: '/delivery/runsheet',
                    resource_type: resourceLookup['DELIVERY_RUNSHEET_EDIT'].resource_type,
                    resource_code: resourceLookup['DELIVERY_RUNSHEET_EDIT'].resource_code,
                    resource_name: resourceLookup['DELIVERY_RUNSHEET_EDIT'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: '/delivery/runsheet/:employee_id/edit/:delivery_runsheet_number/:date_filter?',
                name: 'delivery-runsheet-edit',
                component: DeliveryRunsheetEdit,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Delivery Assign',
                    backPath: '/delivery/runsheet',
                    resource_type: resourceLookup['DELIVERY_RUNSHEET_EDIT'].resource_type,
                    resource_code: resourceLookup['DELIVERY_RUNSHEET_EDIT'].resource_code,
                    resource_name: resourceLookup['DELIVERY_RUNSHEET_EDIT'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: '/deposit-cod',
                name: 'deposit-cod',
                component: DeliveryCod,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Deposit COD',
                    resource_type: resourceLookup['DEPOSIT_COD'].resource_type,
                    resource_code: resourceLookup['DEPOSIT_COD'].resource_code,
                    resource_name: resourceLookup['DEPOSIT_COD'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-cod',
                },
            },
            {
                path: '/hrs',
                name: 'handover-runsheet',
                component: HandoverRunsheet,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'HRS',
                    resource_type: resourceLookup['HANDOVER_RUNSHEET'].resource_type,
                    resource_code: resourceLookup['HANDOVER_RUNSHEET'].resource_code,
                    resource_name: resourceLookup['HANDOVER_RUNSHEET'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-undelivery',
                },
            },
            {
                path: '/hrs-history',
                name: 'handover-runsheet-history',
                component: HandoverRunsheetHistory,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'HRS History',
                    resource_type: resourceLookup['HANDOVER_RUNSHEET_HISTORY'].resource_type,
                    resource_code: resourceLookup['HANDOVER_RUNSHEET_HISTORY'].resource_code,
                    resource_name: resourceLookup['HANDOVER_RUNSHEET_HISTORY'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-undelivery',
                },
            },
            {
                path: '/hrs/:employee_id',
                name: 'handover-runsheet-courier',
                component: DeliveryUndelivery,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'HRS / Handover Runsheet',
                    resource_type: resourceLookup['HANDOVER_RUNSHEET_COURIER'].resource_type,
                    resource_code: resourceLookup['HANDOVER_RUNSHEET_COURIER'].resource_code,
                    resource_name: resourceLookup['HANDOVER_RUNSHEET_COURIER'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: '/cod-history',
                name: 'delivery-cod-history',
                component: DeliveryCodHistory,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Deposit Cod History',
                    resource_type: resourceLookup['DEPOSIT_COD_HISTORY'].resource_type,
                    resource_code: resourceLookup['DEPOSIT_COD_HISTORY'].resource_code,
                    resource_name: resourceLookup['DEPOSIT_COD_HISTORY'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-cod',
                },
            },
            {
                path: '/costing/list',
                name: 'CostToCostSetting',
                component: CostToCostSetting,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Cost To Cost',
                    resource_type: resourceLookup['COST_TO_COST_SETTING'].resource_type,
                    resource_code: resourceLookup['COST_TO_COST_SETTING'].resource_code,
                    resource_name: resourceLookup['COST_TO_COST_SETTING'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-cost-to-cost',
                },
            },
            {
                path: '/costing/report',
                name: 'CostToCostReport',
                component: CostToCostReport,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Cost To Cost',
                    resource_type: resourceLookup['COST_TO_COST_REPORT'].resource_type,
                    resource_code: resourceLookup['COST_TO_COST_REPORT'].resource_code,
                    resource_name: resourceLookup['COST_TO_COST_REPORT'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: '/settings/exchangerate',
                name: 'SettingExchangeRate',
                component: SettingExchangeRate,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'setting',
                    resource_type: resourceLookup['SETTING_EXCHANGE_RATE'].resource_type,
                    resource_code: resourceLookup['SETTING_EXCHANGE_RATE'].resource_code,
                    resource_name: resourceLookup['SETTING_EXCHANGE_RATE'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-customer',
                },
            },
            {
                path: '/settings/access-token',
                name: 'SettingAccessToken',
                component: SettingAccessToken,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'setting',
                    resource_type: resourceLookup['SETTING_ACCESS_TOKEN'].resource_type,
                    resource_code: resourceLookup['SETTING_ACCESS_TOKEN'].resource_code,
                    resource_name: resourceLookup['SETTING_ACCESS_TOKEN'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: '/dashboard/smartpoint',
                name: 'DashboardSmartPoint',
                component: DashboardSmartPoint,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Dashboard',
                    resource_type: resourceLookup['DASHBOARD_SMART_POINT'].resource_type,
                    resource_code: resourceLookup['DASHBOARD_SMART_POINT'].resource_code,
                    resource_name: resourceLookup['DASHBOARD_SMART_POINT'].resource_name,
                    isMaintenanceMode: false,
                    permission: '',
                },
            },
            {
                path: '/resync/runsheet',
                name: 'ResyncRunsheet',
                component: ResyncRunsheet,
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'Admin',
                    resource_type: resourceLookup['RESYNC_RUNSHEET'].resource_type,
                    resource_code: resourceLookup['RESYNC_RUNSHEET'].resource_code,
                    resource_name: resourceLookup['RESYNC_RUNSHEET'].resource_name,
                    isMaintenanceMode: false,
                    permission: 'read-admin',
                },
            },
            {
                path: 'outgoing',
                name: 'Outgoing',
                component: ContentChildWithTab,
                children: [
                    {
                        path: 'bag',
                        name: 'Bag',
                        component: InventoryBag,
                        meta: {
                            icon: 'bx bx-shopping-bag',
                            requiresAuth: true,
                            breadCrumb: 'Bag',
                            resource_type: resourceLookup['INVENTORY_BAG'].resource_type,
                            resource_code: resourceLookup['INVENTORY_BAG'].resource_code,
                            resource_name: resourceLookup['INVENTORY_BAG'].resource_name,
                            isMaintenanceMode: false,
                            permission: ['read-inventory', 'read-bag'],
                        },
                    },
                    {
                        path: 'surat-muatan',
                        name: 'Surat Muatan',
                        component: TransportManifest,
                        meta: {
                            icon: 'bx bxs-truck',
                            requiresAuth: true,
                            breadCrumb: 'Surat Muatan',
                            resource_type: resourceLookup['TRANSPORT_MANIFEST'].resource_type,
                            resource_code: resourceLookup['TRANSPORT_MANIFEST'].resource_code,
                            resource_name: resourceLookup['TRANSPORT_MANIFEST'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-manifest',
                        },
                    },
                    {
                        path: 'surat-jalan',
                        name: 'Surat Jalan',
                        component: TransportSuratJalan,
                        meta: {
                            icon: 'bx bxs-food-menu',
                            requiresAuth: true,
                            breadCrumb: 'Surat Jalan',
                            breadCrumbCode: 'SJ',
                            resource_type: resourceLookup['TRANSPORT_SURAT_JALAN'].resource_type,
                            resource_code: resourceLookup['TRANSPORT_SURAT_JALAN'].resource_code,
                            resource_name: resourceLookup['TRANSPORT_SURAT_JALAN'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-manifest-delivery-order',
                        },
                    },
                    {
                        path: 'hbag',
                        name: 'HBAG',
                        component: TransportSuratJalan,
                        meta: {
                            icon: 'bx bx-book-content',
                            requiresAuth: true,
                            breadCrumb: 'Handover Bag',
                            breadCrumbCode: 'HBAG',
                            resource_type: resourceLookup['TRANSPORT_SURAT_JALAN'].resource_type,
                            resource_code: resourceLookup['TRANSPORT_SURAT_JALAN'].resource_code,
                            resource_name: resourceLookup['TRANSPORT_SURAT_JALAN'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-manifest-delivery-order',
                        },
                    },
                    {
                        path: 'do',
                        name: 'DO',
                        component: TransportSuratJalan,
                        meta: {
                            icon: 'bx bxs-book-open',
                            requiresAuth: true,
                            breadCrumb: 'Delivery Order',
                            breadCrumbCode: 'DO',
                            resource_type: resourceLookup['TRANSPORT_SURAT_JALAN'].resource_type,
                            resource_code: resourceLookup['TRANSPORT_SURAT_JALAN'].resource_code,
                            resource_name: resourceLookup['TRANSPORT_SURAT_JALAN'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-manifest-delivery-order',
                        },
                    },
                    {
                        path: 'mts',
                        name: 'MTS',
                        component: TransportSuratJalan,
                        meta: {
                            icon: 'bx bx-book',
                            requiresAuth: true,
                            breadCrumb: 'Manifest Transit Subagent',
                            breadCrumbCode: 'MTS',
                            resource_type: resourceLookup['TRANSPORT_SURAT_JALAN'].resource_type,
                            resource_code: resourceLookup['TRANSPORT_SURAT_JALAN'].resource_code,
                            resource_name: resourceLookup['TRANSPORT_SURAT_JALAN'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-manifest-delivery-order',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'outgoing',
                },
            },
            {
                path: 'incoming',
                name: 'Incoming',
                component: ContentChildWithTab,
                children: [
                    {
                        path: 'pre-alert',
                        name: 'Pre-Alert',
                        component: InboundIncoming,
                        meta: {
                            icon: 'bx bxs-bell-ring',
                            requiresAuth: true,
                            breadCrumb: 'Pre-Alert',
                            breadCrumbCode: 'Pre Alert',
                            resource_type: resourceLookup['RECEIVING'].resource_type,
                            resource_code: resourceLookup['RECEIVING'].resource_code,
                            resource_name: resourceLookup['RECEIVING'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-receiving-pre-alert',
                        },
                    },
                    {
                        path: 'receiving-surat-muatan',
                        name: 'Receiving Surat Muatan',
                        component: InboundIncoming,
                        meta: {
                            icon: 'bx bxs-truck',
                            requiresAuth: true,
                            breadCrumb: 'Receiving Surat Muatan',
                            breadCrumbCode: 'SM',
                            resource_type: resourceLookup['RECEIVING'].resource_type,
                            resource_code: resourceLookup['RECEIVING'].resource_code,
                            resource_name: resourceLookup['RECEIVING'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-receiving-surat-muatan',
                        },
                    },
                    {
                        path: 'receiving-surat-jalan',
                        name: 'Receiving Surat Jalan',
                        component: InboundIncoming,
                        meta: {
                            icon: 'bx bxs-food-menu',
                            requiresAuth: true,
                            breadCrumb: 'Receiving Surat Jalan',
                            breadCrumbCode: 'SJ',
                            resource_type: resourceLookup['RECEIVING'].resource_type,
                            resource_code: resourceLookup['RECEIVING'].resource_code,
                            resource_name: resourceLookup['RECEIVING'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-receiving-surat-jalan',
                        },
                    },
                    {
                        path: 'receiving-bag',
                        name: 'Receiving Bag',
                        component: InboundIncoming,
                        meta: {
                            icon: 'bx bx-shopping-bag',
                            requiresAuth: true,
                            breadCrumb: 'Receiving Bag',
                            breadCrumbCode: 'Bag',
                            resource_type: resourceLookup['RECEIVING'].resource_type,
                            resource_code: resourceLookup['RECEIVING'].resource_code,
                            resource_name: resourceLookup['RECEIVING'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-receiving-bag',
                        },
                    },
                    {
                        path: 'receiving-connote',
                        name: 'Receiving Connote',
                        component: InboundIncoming,
                        meta: {
                            icon: 'bx bx-notepad',
                            requiresAuth: true,
                            breadCrumb: 'Receiving Connote',
                            breadCrumbCode: 'Connote',
                            resource_type: resourceLookup['RECEIVING'].resource_type,
                            resource_code: resourceLookup['RECEIVING'].resource_code,
                            resource_name: resourceLookup['RECEIVING'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-receiving-connote',
                        },
                    },
                    {
                        path: 'rdo',
                        name: 'RDO',
                        component: InboundIncoming,
                        meta: {
                            icon: 'bx bxs-book-open',
                            requiresAuth: true,
                            breadCrumb: 'RDO',
                            breadCrumbCode: 'RDO',
                            resource_type: resourceLookup['RECEIVING'].resource_type,
                            resource_code: resourceLookup['RECEIVING'].resource_code,
                            resource_name: resourceLookup['RECEIVING'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-receiving-rdo',
                        },
                    },
                    {
                        path: 'mti',
                        name: 'MTI',
                        component: InboundIncoming,
                        meta: {
                            icon: 'bx bx-book',
                            requiresAuth: true,
                            breadCrumb: 'MTI',
                            breadCrumbCode: 'MTI',
                            resource_type: resourceLookup['RECEIVING'].resource_type,
                            resource_code: resourceLookup['RECEIVING'].resource_code,
                            resource_name: resourceLookup['RECEIVING'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-receiving-mti',
                        },
                    },
                    {
                        path: 'rcvb',
                        name: 'RCVB',
                        component: InboundIncoming,
                        meta: {
                            icon: 'bx bxs-shopping-bag-alt',
                            requiresAuth: true,
                            breadCrumb: 'RCVB',
                            breadCrumbCode: 'RCVB',
                            resource_type: resourceLookup['RECEIVING'].resource_type,
                            resource_code: resourceLookup['RECEIVING'].resource_code,
                            resource_name: resourceLookup['RECEIVING'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-receiving-rcvb',
                        },
                    },
                    {
                        path: 'Irregularities',
                        name: 'Irregularities',
                        component: ReceivingLog,
                        meta: {
                            icon: 'bx bx-history',
                            requiresAuth: true,
                            breadCrumb: 'Irregularities',
                            resource_type: resourceLookup['RECEIVING_LOG'].resource_type,
                            resource_code: resourceLookup['RECEIVING_LOG'].resource_code,
                            resource_name: resourceLookup['RECEIVING_LOG'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-receiving-irregularities',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'incoming',
                },
            },
            {
                path: 'inventory',
                name: 'Inventory',
                component: ContentChildWithTab,
                children: [
                    {
                        path: 'connote',
                        name: 'Connote',
                        component: InventoryItem,
                        meta: {
                            icon: 'bx bx-notepad',
                            requiresAuth: true,
                            breadCrumb: 'Connote',
                            resource_type: resourceLookup['INVENTORY_ITEM'].resource_type,
                            resource_code: resourceLookup['INVENTORY_ITEM'].resource_code,
                            resource_name: resourceLookup['INVENTORY_ITEM'].resource_name,
                            isMaintenanceMode: false,
                            permission: ['read-inventory', 'read-bag'],
                        },
                    },
                    {
                        path: 'bag',
                        name: 'Bag',
                        component: InventoryBagItem,
                        meta: {
                            icon: 'bx bx-shopping-bag',
                            requiresAuth: true,
                            breadCrumb: 'Bag',
                            resource_type: resourceLookup['INVENTORY_BAG_ITEM'].resource_type,
                            resource_code: resourceLookup['INVENTORY_BAG_ITEM'].resource_code,
                            resource_name: resourceLookup['INVENTORY_BAG_ITEM'].resource_name,
                            isMaintenanceMode: false,
                            permission: ['read-inventory', 'read-bag'],
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'inventory',
                },
            },
            {
                path: 'trace',
                name: 'Trace',
                component: ContentChildWithTab,
                children: [
                    {
                        path: 'trace-connote/:id?',
                        name: 'trace-connote',
                        component: TraceConnote,
                        props: true,
                        meta: {
                            icon: 'bx bx-notepad',
                            requiresAuth: true,
                            breadCrumb: 'Trace Connote',
                            resource_type: resourceLookup['TRACE_CONNOTE'].resource_type,
                            resource_code: resourceLookup['TRACE_CONNOTE'].resource_code,
                            resource_name: resourceLookup['TRACE_CONNOTE'].resource_name,
                            isMaintenanceMode: false,
                            permission: '', // trace tdk perlu permission
                        },
                    },
                    {
                        path: 'trace-bag/:bag_number?',
                        name: 'trace-bag',
                        component: TraceBag,
                        props: true,
                        meta: {
                            icon: 'bx bx-shopping-bag',
                            requiresAuth: true,
                            breadCrumb: 'Trace Bag / Masterbag',
                            resource_type: resourceLookup['TRACE_BAG'].resource_type,
                            resource_code: resourceLookup['TRACE_BAG'].resource_code,
                            resource_name: resourceLookup['TRACE_BAG'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'trace-flight/:id?',
                        name: 'trace-flight',
                        component: TraceFlight,
                        props: true,
                        meta: {
                            icon: 'bx bx-paper-plane',
                            requiresAuth: true,
                            breadCrumb: 'Trace Flight',
                            resource_type: resourceLookup['TRACE_FLIGHT'].resource_type,
                            resource_code: resourceLookup['TRACE_FLIGHT'].resource_code,
                            resource_name: resourceLookup['TRACE_FLIGHT'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'manifest-vehicle/:id?',
                        name: 'transport-manifest-vehicle',
                        component: TransportManifestVehicle,
                        meta: {
                            icon: 'bx bxs-truck',
                            requiresAuth: true,
                            breadCrumb: 'Manifest Vehicle',
                            resource_type:
                                resourceLookup['TRANSPORT_MANIFEST_VEHICLE'].resource_type,
                            resource_code:
                                resourceLookup['TRANSPORT_MANIFEST_VEHICLE'].resource_code,
                            resource_name:
                                resourceLookup['TRANSPORT_MANIFEST_VEHICLE'].resource_name,
                            isMaintenanceMode: false,
                            permission: 'read-manifest-vehicle',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'trace',
                },
            },
            {
                path: 'help',
                name: 'help',
                component: ContentChild,
                children: [
                    {
                        path: 'error-dictionary',
                        name: 'ErrorDictionary',
                        component: ErrorDictionary,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Error Dictionary',
                            resource_type: resourceLookup['HELP_ERROR_DICTIONARY'].resource_type,
                            resource_code: resourceLookup['HELP_ERROR_DICTIONARY'].resource_code,
                            resource_name: resourceLookup['HELP_ERROR_DICTIONARY'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'shortcut-dictionary',
                        name: 'ShortcutDictionary',
                        component: ShortcutDictionary,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Shortcut Dictionary',
                            resource_type: resourceLookup['HELP_SHORTCUT_DICTIONARY'].resource_type,
                            resource_code: resourceLookup['HELP_SHORTCUT_DICTIONARY'].resource_code,
                            resource_name: resourceLookup['HELP_SHORTCUT_DICTIONARY'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'help',
                },
            },
            {
                path: 'helpdesk',
                name: 'helpdesk',
                component: ContentChild,
                children: [
                    {
                        path: 'connote',
                        name: 'Connote',
                        component: HelpdeskConnote,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Connote',
                            resource_type: resourceLookup['HELPDESK_CONNOTE'].resource_type,
                            resource_code: resourceLookup['HELPDESK_CONNOTE'].resource_code,
                            resource_name: resourceLookup['HELPDESK_CONNOTE'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'bag',
                        name: 'Bag',
                        component: InventoryBagItem,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'bag',
                            resource_type: resourceLookup['HELPDESK_BAG'].resource_type,
                            resource_code: resourceLookup['HELPDESK_BAG'].resource_code,
                            resource_name: resourceLookup['HELPDESK_BAG'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'surat-muatan',
                        name: 'SuratMuatan',
                        component: TransportManifest,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Surat Muatan',
                            resource_type: resourceLookup['HELPDESK_SURAT_MUATAN'].resource_type,
                            resource_code: resourceLookup['HELPDESK_SURAT_MUATAN'].resource_code,
                            resource_name: resourceLookup['HELPDESK_SURAT_MUATAN'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'surat-jalan',
                        name: 'SuratJalan',
                        component: TransportSuratJalan,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Surat Jalan',
                            resource_type: resourceLookup['HELPDESK_SURAT_JALAN'].resource_type,
                            resource_code: resourceLookup['HELPDESK_SURAT_JALAN'].resource_code,
                            resource_name: resourceLookup['HELPDESK_SURAT_JALAN'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                    {
                        path: 'runsheet',
                        name: 'Runsheet',
                        component: HelpdeskRunsheet,
                        meta: {
                            requiresAuth: true,
                            breadCrumb: 'Runsheet',
                            resource_type: resourceLookup['HELPDESK_RUNSHEET'].resource_type,
                            resource_code: resourceLookup['HELPDESK_RUNSHEET'].resource_code,
                            resource_name: resourceLookup['HELPDESK_RUNSHEET'].resource_name,
                            isMaintenanceMode: false,
                            permission: '',
                        },
                    },
                ],
                meta: {
                    requiresAuth: true,
                    breadCrumb: 'helpdesk',
                },
            },
            {
                path: 'forbidden',
                name: 'forbidden',
                component: Forbidden,
            },
            {
                path: 'server-error',
                name: 'ServerError',
                component: ServerError,
            },
            {
                path: 'system-maintenance',
                name: 'SystemMaintenance',
                component: SystemMaintenance,
            },
            {
                path: '*',
                name: 'NotFound',
                component: NotFound,
            },
        ],
        meta: {
            requiresAuth: true,
            breadCrumb: 'main',
        },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.VITE_APP_BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
})
router.beforeEach((to, from, next) => {
    let path = to.path
    let token = localStorage.getItem('vuejs__tokenBearer')
    let permissions = JSON.parse(localStorage.getItem('vuejs__permissions'))?.value || []

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!token) {
            return next({ path: '/login', params: { nextUrl: to.fullPath } })
        }
    } else if (to.path.includes('login') && token) {
        return next({ path: '/', params: { nextUrl: to.fullPath } })
    }

    if (to?.meta?.isMaintenanceMode) {
        next({ path: '/system-maintenance' })
    } else {
        if (
            !to?.meta?.permission ||
            permissions?.core.includes(to?.meta?.permission) ||
            (Array.isArray(to.meta.permission) &&
                to.meta.permission.some((perm) => permissions?.core.includes(perm)))
        ) {
            next()
        } else {
            next({ path: '/forbidden' })
        }
    }
})
export default router
