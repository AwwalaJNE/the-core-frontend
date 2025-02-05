<template>
    <vs-sidebar
      v-model="activeItem"
      :open="!isMobile || isExpand"
      :reduce="!isMobile && isExpand"
    >
      <template #logo>
        <Logo />
      </template>

      <template v-for="(item, key) in getMenuWithPermissions()">
        <template v-if="item.children.length > 0">
          <vs-sidebar-group :key="key">
            <template #header>
              <vs-sidebar-item arrow>
                <template #icon>
                  <i :class="`bx ${item.icon !== null ? item.icon : ''}`" />
                </template>
                {{ item.label }}
              </vs-sidebar-item>
            </template>

            <template v-for="(child, i) in item.children">
                <router-link
                  :key="i"
                  :to="child.url"
                  :id="child.label.trim()" 
                  @click.native="setActive(child)" 
                >
                  <vs-sidebar-item
                    :id="child.label.trim()"
                    :class="{ active: activeItem === child.url }"
                  >
                    <template #icon>
                      <i :class="`bx ${child.icon}`" />
                    </template>
                    <p>{{ child.label }}</p>
                  </vs-sidebar-item>
                </router-link>
            </template>
          </vs-sidebar-group>
        </template>
        <template v-else>
          <div :key="key" style="width: 100%;">
            <router-link
              :key="key"
              :to="item.url"
              :id="item.label.trim()" 
              @click.native="setActive(item)" 
            >
              <vs-sidebar-item
                :id="item.label.trim()"
                :class="{ active: activeItem === item.url }"
              >
                <template #icon>
                  <i :class="`bx ${item.icon !== null ? item.icon : ''}`" />
                </template>
                <p>{{ item.label }}</p>
              </vs-sidebar-item>
            </router-link>
          </div>
        </template>
      </template>
    </vs-sidebar>
</template>

<script>
import master from "@/mixins/master";

import Logo from "../../components/logo/logo.vue";
import { resourceLookup } from '@/constants'; 

export default {
  name: "Sidebar",
  components: {
    Logo: Logo,
  },
  mixins: [master],
  props: {
    expand: Boolean,
  },
  data() {
    return {
      nodeTypeCode: null,
      activeItem: "",
      isExpand: true,
      menus: [
        {
          label: "New Transaction",
          url: "/transaction/new-transactions",
          icon: "bx-archive",
          permission: "create-transaction",
          children: [],
          meta: {
            resource_type: resourceLookup["TRANSACTION_NEW_TRANSACTION"].resource_type,
            resource_code: resourceLookup["TRANSACTION_NEW_TRANSACTION"].resource_code,
            resource_name: resourceLookup["TRANSACTION_NEW_TRANSACTION"].resource_name
          },
        },
        {
          label: "Trace Connote",
          url: "/trace-connote",
          icon: "bx-search-alt",
          permission: "",
          children: [],
          showAll: true,
          meta: {
            resource_type: resourceLookup["TRACE_CONNOTE"].resource_type,
            resource_code: resourceLookup["TRACE_CONNOTE"].resource_code,
            resource_name: resourceLookup["TRACE_CONNOTE"].resource_name
          },
        },
        {
          label: "Trace Bag / Masterbag",
          url: "/trace-bag",
          icon: "bx-search",
          permission: "",
          children: [],
          showAll: true,
          meta: {
            resource_type: resourceLookup["TRACE_BAG"].resource_type,
            resource_code: resourceLookup["TRACE_BAG"].resource_code,
            resource_name: resourceLookup["TRACE_BAG"].resource_name
          },
        },
        {
          label: "Transaction",
          url: null,
          icon: "bx-list-ol",
          children: [
            {
              label: "Transaction List",
              url: "/sales/transaction",
              icon: "bx-list-ol",
              permission: "read-transaction",
              meta: {
                resource_type: resourceLookup["SALES_TRANSACTION_LIST"].resource_type,
                resource_code: resourceLookup["SALES_TRANSACTION_LIST"].resource_code,
                resource_name: resourceLookup["SALES_TRANSACTION_LIST"].resource_name
              },
            },
            {
              label: "Cash Register",
              url: "/sales/cashregister",
              icon: "bx-money",
              permission: "create-transaction",
              meta: {
                resource_type: resourceLookup["SALES_CASH_REGISTER"].resource_type,
                resource_code: resourceLookup["SALES_CASH_REGISTER"].resource_code,
                resource_name: resourceLookup["SALES_CASH_REGISTER"].resource_name
              },
            },
            {
              label: "Upload Transaction",
              url: "/transaction/upload-connote",
              icon: "bx-upload",
              permission: "create-transaction",
              meta: {
                resource_type: resourceLookup["TRANSACTION_UPLOAD_CONNOTE"].resource_type,
                resource_code: resourceLookup["TRANSACTION_UPLOAD_CONNOTE"].resource_code,
                resource_name: resourceLookup["TRANSACTION_UPLOAD_CONNOTE"].resource_name
              },
            },
          ],
        },
        {
          label: "Pick Up",
          url: null,
          icon: "bx-package",
          children: [
            {
              label: "Pickup Request",
              permission: "create-pickup",
              url: "/pickup/request",
              icon: "bx bxs-checkbox",
              meta: {
                resource_type: resourceLookup["PICKUP_REQUEST"].resource_type,
                resource_code: resourceLookup["PICKUP_REQUEST"].resource_code,
                resource_name: resourceLookup["PICKUP_REQUEST"].resource_name
              },
            },
            {
              label: "Pickup Schedule",
              permission: "create-pickup-schedule",
              url: "/pickup/schedule",
              icon: "bx bxs-checkbox",
              permission: "read-pickup-schedule",
              meta: {
                resource_type: resourceLookup["PICKUP_SCHEDULE"].resource_type,
                resource_code: resourceLookup["PICKUP_SCHEDULE"].resource_code,
                resource_name: resourceLookup["PICKUP_SCHEDULE"].resource_name
              },
            },
            {
              label: "Pickup List",
              url: "/pickup/list",
              permission: "read-pickup",
              icon: "bx bxs-checkbox",
              meta: {
                resource_type: resourceLookup["PICKUP_LIST"].resource_type,
                resource_code: resourceLookup["PICKUP_LIST"].resource_code,
                resource_name: resourceLookup["PICKUP_LIST"].resource_name
              },
            },
          ],
        },
        {
          label: "Inventory",
          url: null,
          icon: "bx bx-archive",
          permission: "read-inventory",
          children: [
            {
              label: "Inventory Item",
              url: "/inventory/item",
              icon: "bx bxs-checkbox",
              permission: "read-bag",
              meta: {
                resource_type: resourceLookup["INVENTORY_ITEM"].resource_type,
                resource_code: resourceLookup["INVENTORY_ITEM"].resource_code,
                resource_name: resourceLookup["INVENTORY_ITEM"].resource_name
              },
            },
            {
              label: "Inventory Bag",
              url: "/inventory/bag",
              icon: "bx bxs-checkbox",
              permission: "read-bag",
              meta: {
                resource_type: resourceLookup["INVENTORY_BAG_ITEM"].resource_type,
                resource_code: resourceLookup["INVENTORY_BAG_ITEM"].resource_code,
                resource_name: resourceLookup["INVENTORY_BAG_ITEM"].resource_name
              },
            },
            {
              label: "Create Bag",
              url: "/inventory/bagging",
              icon: "bx bxs-checkbox",
              permission: "read-bag",
              meta: {
                resource_type: resourceLookup["INVENTORY_BAG"].resource_type,
                resource_code: resourceLookup["INVENTORY_BAG"].resource_code,
                resource_name: resourceLookup["INVENTORY_BAG"].resource_name
              },
            },
            {
              label: "Open Bag",
              url: "/inventory/unbagging",
              icon: "bx bxs-checkbox",
              permission: "read-unbag",
              meta: {
                resource_type: resourceLookup["UNBAGGING"].resource_type,
                resource_code: resourceLookup["UNBAGGING"].resource_code,
                resource_name: resourceLookup["UNBAGGING"].resource_name
              },
            },
            {
              label: "Sorting Connote",
              url: "/sorting/connote",
              icon: "bx bxs-checkbox",
              permission: "read-bag", // TODO: CHECK PERMISSION LATER
              meta: {
                resource_type: resourceLookup["SORTING_CONNOTE"].resource_type,
                resource_code: resourceLookup["SORTING_CONNOTE"].resource_code,
                resource_name: resourceLookup["SORTING_CONNOTE"].resource_name
              },
            },
            // TODO: UN COMMENT IF NEEDED
            // {
            //   label: "Sorting Bag",
            //   url: "/sorting/bag",
            //   icon: "bx bxs-checkbox",
            //   permission: "read-bag", // TODO: CHECK PERMISSION LATER
            //   meta: {
            //     resource_type: resourceLookup["SORTING_BAG"].resource_type,
            //     resource_code: resourceLookup["SORTING_BAG"].resource_code,
            //     resource_name: resourceLookup["SORTING_BAG"].resource_name
            //   },
            // },
          ],
        },
        {
          label: "Transport",
          url: null,
          icon: "bx bxs-truck",
          children: [
            {
              label: "Transport Packing Kayu",
              url: "/transport/packingkayu",
              icon: "bx bxs-checkbox",
              permission: "read-packing-kayu",
              meta: {
                resource_type: resourceLookup["TRANSPORT_PACKING_KAYU"].resource_type,
                resource_code: resourceLookup["TRANSPORT_PACKING_KAYU"].resource_code,
                resource_name: resourceLookup["TRANSPORT_PACKING_KAYU"].resource_name
              },
            },
            // {
            //     label: 'Transport Booking',
            //     url: '/transport/booking',
            //     icon: ''
            // },
            // {
            //     label: 'Transport Manifest',
            //     url: '/transport/manifest',
            //     icon: ''
            // },
            // {
            //     label: 'Transport Manifest Pickup',
            //     url: '/transport/manifest_pickup',
            //     icon: ''
            // },
            {
              label: "Inventory Vehicle",
              url: "/transport/inventory-vehicle",
              icon: "bx bxs-checkbox",
              permission: "read-inventory-vehicle",
              meta: {
                resource_type: resourceLookup["TRANSPORT_INVENTORY_VEHICLE"].resource_type,
                resource_code: resourceLookup["TRANSPORT_INVENTORY_VEHICLE"].resource_code,
                resource_name: resourceLookup["TRANSPORT_INVENTORY_VEHICLE"].resource_name
              },
            },
            {
              label: "Surat Jalan",
              url: "/transport/manifest-jalan",
              icon: "bx bxs-checkbox",
              permission: "read-manifest-delivery-order",
              meta: {
                resource_type: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_type,
                resource_code: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_code,
                resource_name: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_name
              },
            },
            {
              label: "Surat Muatan",
              url: "/transport/manifest",
              icon: "bx bxs-checkbox",
              permission: "read-manifest",
              meta: {
                resource_type: resourceLookup["TRANSPORT_MANIFEST"].resource_type,
                resource_code: resourceLookup["TRANSPORT_MANIFEST"].resource_code,
                resource_name: resourceLookup["TRANSPORT_MANIFEST"].resource_name
              },
            },
          ],
        },
        {
          label: "Receiving",
          url: null,
          icon: "bx bxs-inbox",
          children: [
              {
              label: "Receiving",
              url: "/inbound/prealert",
              icon: "bx bxs-checkbox",
              children: [],
              permission: "read-receiving",
              meta: {
                resource_type: resourceLookup["RECEIVING"].resource_type,
                resource_code: resourceLookup["RECEIVING"].resource_code,
                resource_name: resourceLookup["RECEIVING"].resource_name
              },
            },
            {
              label: "Airport Receiving",
              url: "/inbound-airport",
              icon: "bx bxs-checkbox",
              children: [],
              permission: "read-airport-prealert",
              meta: {
                resource_type: resourceLookup["AIRPORT_RECEIVING"].resource_type,
                resource_code: resourceLookup["AIRPORT_RECEIVING"].resource_code,
                resource_name: resourceLookup["AIRPORT_RECEIVING"].resource_name
              },
            },
            {
              label: "Receiving Log",
              url: "/receiving-log",
              icon: "bx bxs-checkbox",
              children: [],
              permission: "read-receiving",
              meta: {
                resource_type: resourceLookup["RECEIVING_LOG"].resource_type,
                resource_code: resourceLookup["RECEIVING_LOG"].resource_code,
                resource_name: resourceLookup["RECEIVING_LOG"].resource_name
              },
            },
          ]
        },
        {
          label: "Delivery",
          url: null,
          icon: "bx bx-paper-plane",
          children: [
            {
              label: "Delivery Runsheet",
              url: "/delivery/runsheet",
              icon: "bx bxs-checkbox",
              permission: "read-runsheet",
              meta: {
                resource_type: resourceLookup["DELIVERY_RUNSHEET"].resource_type,
                resource_code: resourceLookup["DELIVERY_RUNSHEET"].resource_code,
                resource_name: resourceLookup["DELIVERY_RUNSHEET"].resource_name
              },
            },
            {
              label: "Handover Runsheet",
              url: "/hrs",
              icon: "bx bxs-checkbox",
              permission: "read-undelivery",
              meta: {
                resource_type: resourceLookup["HANDOVER_RUNSHEET"].resource_type,
                resource_code: resourceLookup["HANDOVER_RUNSHEET"].resource_code,
                resource_name: resourceLookup["HANDOVER_RUNSHEET"].resource_name
              },
            },
            {
              label: "HRS History",
              url: "/hrs-history",
              icon: "bx bxs-checkbox",
              permission: "read-undelivery",
              meta: {
                resource_type: resourceLookup["HANDOVER_RUNSHEET_HISTORY"].resource_type,
                resource_code: resourceLookup["HANDOVER_RUNSHEET_HISTORY"].resource_code,
                resource_name: resourceLookup["HANDOVER_RUNSHEET_HISTORY"].resource_name
              },
            },
            {
              label: "Deposit COD",
              url: "/deposit-cod",
              icon: "bx bxs-checkbox",
              permission: "read-cod",
              meta: {
                resource_type: resourceLookup["DEPOSIT_COD"].resource_type,
                resource_code: resourceLookup["DEPOSIT_COD"].resource_code,
                resource_name: resourceLookup["DEPOSIT_COD"].resource_name
              },
            },
            {
              label: "Deposit COD History",
              url: "/cod-history",
              icon: "bx bxs-checkbox",
              permission: "read-cod",
              meta: {
                resource_type: resourceLookup["DEPOSIT_COD_HISTORY"].resource_type,
                resource_code: resourceLookup["DEPOSIT_COD_HISTORY"].resource_code,
                resource_name: resourceLookup["DEPOSIT_COD_HISTORY"].resource_name
              },
            },
          ],
        },
        {
          label: "Audit",
          url: null,
          icon: "bx bxs-file-find",
          children: [
            {
              label: "Invalid Receiving",
              url: "/audit/invalid-receiving",
              icon: "bx bxs-checkbox",
              permission: "read-audit-receiving",
              meta: {
                resource_type: resourceLookup["INVALID_RECEIVING"].resource_type,
                resource_code: resourceLookup["INVALID_RECEIVING"].resource_code,
                resource_name: resourceLookup["INVALID_RECEIVING"].resource_name
              },
            },
            {
              label: "Invalid Opening Bag",
              url: "/audit/invalid-opening-bag",
              icon: "bx bxs-checkbox",
              permission: "read-audit-opening-bag",
              meta: {
                resource_type: resourceLookup["INVALID_OPENING_BAG"].resource_type,
                resource_code: resourceLookup["INVALID_OPENING_BAG"].resource_code,
                resource_name: resourceLookup["INVALID_OPENING_BAG"].resource_name
              },
            },
          ],
        },
        {
          label: "Connote Adjustments",
          url: null,
          icon: "bx-edit",
          children: [
            {
              label: "Connote Cancel",
              url: "/connote-adjustment/connote-cancel",
              icon: "bx bxs-checkbox",
              permission: "read-irreg",
              meta: {
                resource_type: resourceLookup["CONNOTE_ADJUSTMENT_CONNOTE_CANCEL"].resource_type,
                resource_code: resourceLookup["CONNOTE_ADJUSTMENT_CONNOTE_CANCEL"].resource_code,
                resource_name: resourceLookup["CONNOTE_ADJUSTMENT_CONNOTE_CANCEL"].resource_name
              },
            },
            {
              label: "Connote Cancel History",
              url: "/connote-adjustment/connote-cancel-history",
              icon: "bx bxs-checkbox",
              permission: "read-irreg",
              meta: {
                resource_type: resourceLookup["CONNOTE_ADJUSTMENT_CONNOTE_CANCEL_HISTORY"].resource_type,
                resource_code: resourceLookup["CONNOTE_ADJUSTMENT_CONNOTE_CANCEL_HISTORY"].resource_code,
                resource_name: resourceLookup["CONNOTE_ADJUSTMENT_CONNOTE_CANCEL_HISTORY"].resource_name
              },
            },
            {
              label: "Connote Forward",
              url: "/connote-adjustment/connote-forward",
              icon: "bx bxs-checkbox",
              permission: "read-irreg",
              meta: {
                resource_type: resourceLookup["CONNOTE_ADJUSTMENT_CONNOTE_FORWARD"].resource_type,
                resource_code: resourceLookup["CONNOTE_ADJUSTMENT_CONNOTE_FORWARD"].resource_code,
                resource_name: resourceLookup["CONNOTE_ADJUSTMENT_CONNOTE_FORWARD"].resource_name
              },
            },
            {
              label: "Connote Return",
              url: "/connote-adjustment/connote-return",
              icon: "bx bxs-checkbox",
              permission: "read-irreg",
              meta: {
                resource_type: resourceLookup["CONNOTE_ADJUSTMENT_CONNOTE_RETURN"].resource_type,
                resource_code: resourceLookup["CONNOTE_ADJUSTMENT_CONNOTE_RETURN"].resource_code,
                resource_name: resourceLookup["CONNOTE_ADJUSTMENT_CONNOTE_RETURN"].resource_name
              },
            }
          ],
        },
        {
          label: "WUS",
          url: null,
          icon: "bx bx-store-alt",
          children: [
            {
              label: "Receiving & Inventory",
              url: "/tracing-outstanding",
              icon: "bx bxs-checkbox",
              permission: "read-irreg",
              meta: {
                resource_type: resourceLookup["TRACING"].resource_type,
                resource_code: resourceLookup["TRACING"].resource_code,
                resource_name: resourceLookup["TRACING"].resource_name
              },
            },
            {
              label: "Archive",
              url: "/tracing-history",
              icon: "bx bxs-checkbox",
              permission: "read-irreg",
              meta: {
                resource_type: resourceLookup["TRACING_HISTORY"].resource_type,
                resource_code: resourceLookup["TRACING_HISTORY"].resource_code,
                resource_name: resourceLookup["TRACING_HISTORY"].resource_name
              },
            },
          ],
        },
        {
          label: "Report",
          url: null,
          icon: "bx bxs-report",
          children: [
            {
              label: "Packing List",
              url: "/report/packinglist",
              icon: "bx bxs-checkbox",
              permission: "read-report-packing-list",
              meta: {
                resource_type: resourceLookup["PACKINGLIST"].resource_type,
                resource_code: resourceLookup["PACKINGLIST"].resource_code,
                resource_name: resourceLookup["PACKINGLIST"].resource_name
              },
            },
            {
              label: "Cashless",
              url: "/report/cashless",
              icon: "bx bxs-checkbox",
              permission: "read-cashless",
              meta: {
                resource_type: resourceLookup["CASHLESS"].resource_type,
                resource_code: resourceLookup["CASHLESS"].resource_code,
                resource_name: resourceLookup["CASHLESS"].resource_name
              },
            },
          ],
        },
        {
          label: "Irreguralities",
          url: null,
          icon: "bx bx-alarm-exclamation",
          children: [
            {
              label: "Inventory Irreguralities",
              url: "/irreguralities/inventory",
              icon: "bx bxs-checkbox",
              permission: "read-irreg",
              meta: {
                resource_type: resourceLookup["IRREGURALITIES_INVENTORY"].resource_type,
                resource_code: resourceLookup["IRREGURALITIES_INVENTORY"].resource_code,
                resource_name: resourceLookup["IRREGURALITIES_INVENTORY"].resource_name
              },
            },
            {
              label: "Irreguralities - Entry Status",
              url: "/irreguralities/entry-status",
              icon: "bx bxs-checkbox",
              permission: "read-irreg",
              meta: {
                resource_type: resourceLookup["IRREGURALITIES_ENTRY_STATUS"].resource_type,
                resource_code: resourceLookup["IRREGURALITIES_ENTRY_STATUS"].resource_code,
                resource_name: resourceLookup["IRREGURALITIES_ENTRY_STATUS"].resource_name
              },
            },
            // // TODO: DELETE SOON
            // {
            //   label: "Irreguralities - Cancel",
            //   url: "/irreguralities/cancel",
            //   icon: "",
            //   permission: "read-irreg",
            // },
            // // TODO: DELETE SOON
            // {
            //   label: "Irreguralities - Return",
            //   url: "/irreguralities/return",
            //   icon: "",
            //   permission: "read-irreg",
            // },
            {
              label: "Irreguralities - Hold",
              url: "/irreguralities/hold",
              icon: "bx bxs-checkbox",
              permission: "read-irreg",
              meta: {
                resource_type: resourceLookup["IRREGURALITIES_HOLD"].resource_type,
                resource_code: resourceLookup["IRREGURALITIES_HOLD"].resource_code,
                resource_name: resourceLookup["IRREGURALITIES_HOLD"].resource_name
              },
            },
            {
              label: "Irreguralities - Failed",
              url: "/irreguralities/failed",
              icon: "bx bxs-checkbox",
              permission: "read-irreg",
              meta: {
                resource_type: resourceLookup["IRREGURALITIES_FAILED"].resource_type,
                resource_code: resourceLookup["IRREGURALITIES_FAILED"].resource_code,
                resource_name: resourceLookup["IRREGURALITIES_FAILED"].resource_name
              },
            }
          ],
        },
        {
          label: "Cost To Cost",
          url: null,
          icon: "bx bx-wallet",
          permission: "read-cost-to-cost",
          children: [
            {
              label: "Settings",
              url: "/costing/list",
              icon: "bx bxs-checkbox",
              meta: {
                resource_type: resourceLookup["COST_TO_COST_SETTING"].resource_type,
                resource_code: resourceLookup["COST_TO_COST_SETTING"].resource_code,
                resource_name: resourceLookup["COST_TO_COST_SETTING"].resource_name
              },
            },
            {
              label: "Report",
              url: "/costing/report",
              icon: "bx bxs-checkbox",
              meta: {
                resource_type: resourceLookup["COST_TO_COST_REPORT"].resource_type,
                resource_code: resourceLookup["COST_TO_COST_REPORT"].resource_code,
                resource_name: resourceLookup["COST_TO_COST_REPORT"].resource_name
              },
            },
            {
              label: "Summary",
              url: "/costing/summary",
              icon: "",
            },
          ],
        },
        {
          label: "Helpdesk",
          url: null,
          icon: "bx-user-voice",
          children: [
            {
              label: "Connote",
              url: "/helpdesk/connote",
              icon: "bx bxs-checkbox",
              rolePermission: "HELPDESK",
              meta: {
                resource_type: resourceLookup["HELPDESK_CONNOTE"].resource_type,
                resource_code: resourceLookup["HELPDESK_CONNOTE"].resource_code,
                resource_name: resourceLookup["HELPDESK_CONNOTE"].resource_name
              },
            },
            {
              label: "Bag",
              url: "/helpdesk/bag",
              icon: "bx bxs-checkbox",
              rolePermission: "HELPDESK",
              meta: {
                resource_type: resourceLookup["HELPDESK_BAG"].resource_type,
                resource_code: resourceLookup["HELPDESK_BAG"].resource_code,
                resource_name: resourceLookup["HELPDESK_BAG"].resource_name
              },
            },
            {
              label: "Surat Jalan",
              url: "/helpdesk/surat-jalan",
              icon: "bx bxs-checkbox",
              rolePermission: "HELPDESK",
              meta: {
                resource_type: resourceLookup["HELPDESK_SURAT_JALAN"].resource_type,
                resource_code: resourceLookup["HELPDESK_SURAT_JALAN"].resource_code,
                resource_name: resourceLookup["HELPDESK_SURAT_JALAN"].resource_name
              },
            },
            {
              label: "Surat Muatan",
              url: "/helpdesk/surat-muatan",
              icon: "bx bxs-checkbox",
              rolePermission: "HELPDESK",
              meta: {
                resource_type: resourceLookup["HELPDESK_SURAT_MUATAN"].resource_type,
                resource_code: resourceLookup["HELPDESK_SURAT_MUATAN"].resource_code,
                resource_name: resourceLookup["HELPDESK_SURAT_MUATAN"].resource_name
              },
            },
            {
              label: "Runsheet",
              url: "/helpdesk/runsheet",
              icon: "bx bxs-checkbox",
              rolePermission: "HELPDESK",
              meta: {
                resource_type: resourceLookup["HELPDESK_RUNSHEET"].resource_type,
                resource_code: resourceLookup["HELPDESK_RUNSHEET"].resource_code,
                resource_name: resourceLookup["HELPDESK_RUNSHEET"].resource_name
              },
            },
          ],
        },
        {
          label: "Settings",
          url: null,
          icon: "bx-cog",
          permission: "read-settings",
          children: [
            {
              label: "Settings Tariff",
              url: "/settings/tariff",
              icon: "bx bxs-checkbox",
              permission: "read-tariff",
              meta: {
                resource_type: resourceLookup["SETTINGS_TARIFF"].resource_type,
                resource_code: resourceLookup["SETTINGS_TARIFF"].resource_code,
                resource_name: resourceLookup["SETTINGS_TARIFF"].resource_name
              },
            },
            {
              label: "Settings Surcharge",
              url: "/settings/surcharge",
              icon: "bx bxs-checkbox",
              permission: "read-surcharge",
              meta: {
                resource_type: resourceLookup["SETTINGS_SURCHARGE"].resource_type,
                resource_code: resourceLookup["SETTINGS_SURCHARGE"].resource_code,
                resource_name: resourceLookup["SETTINGS_SURCHARGE"].resource_name
              },
            },
            {
              label: "Settings Geolocation",
              url: "/settings/geolocation",
              icon: "bx bxs-checkbox",
              permission: "read-geolocation-country",
              meta: {
                resource_type: resourceLookup["SETTINGS_GEOLOCATION"].resource_type,
                resource_code: resourceLookup["SETTINGS_GEOLOCATION"].resource_code,
                resource_name: resourceLookup["SETTINGS_GEOLOCATION"].resource_name
              },
            },
            {
              label: "Settings Nodes",
              url: "/settings/nodes",
              icon: "bx bxs-checkbox",
              permission: "read-node",
              meta: {
                resource_type: resourceLookup["SETTINGS_NODES"].resource_type,
                resource_code: resourceLookup["SETTINGS_NODES"].resource_code,
                resource_name: resourceLookup["SETTINGS_NODES"].resource_name
              },
            },
            {
              label: "Settings Vehicles",
              url: "/settings/vehicles",
              icon: "bx bxs-checkbox",
              permission: "read-vehicle",
              meta: {
                resource_type: resourceLookup["SETTINGS_VEHICLES"].resource_type,
                resource_code: resourceLookup["SETTINGS_VEHICLES"].resource_code,
                resource_name: resourceLookup["SETTINGS_VEHICLES"].resource_name
              },
            },
            {
              label: "Settings Users",
              url: "/settings/users",
              icon: "bx bxs-checkbox",
              permission: "read-user",
              meta: {
                resource_type: resourceLookup["SETTINGS_USERS"].resource_type,
                resource_code: resourceLookup["SETTINGS_USERS"].resource_code,
                resource_name: resourceLookup["SETTINGS_USERS"].resource_name
              },
            },
            {
              label: "Settings Employee",
              url: "/settings/employee",
              icon: "bx bxs-checkbox",
              permission: "read-employee",
              meta: {
                resource_type: resourceLookup["SETTINGS_EMPLOYEE"].resource_type,
                resource_code: resourceLookup["SETTINGS_EMPLOYEE"].resource_code,
                resource_name: resourceLookup["SETTINGS_EMPLOYEE"].resource_name
              },
            },
            {
              label: "Settings Customer",
              url: "/settings/customer",
              icon: "bx bxs-checkbox",
              permission: "read-customer",
              meta: {
                resource_type: resourceLookup["SETTINGS_CUSTOMER"].resource_type,
                resource_code: resourceLookup["SETTINGS_CUSTOMER"].resource_code,
                resource_name: resourceLookup["SETTINGS_CUSTOMER"].resource_name
              },
            },
            {
              label: "Settings Exchange Rate",
              url: "/settings/exchangerate",
              icon: "bx bxs-checkbox",
              permission: "read-customer",
              meta: {
                resource_type: resourceLookup["SETTING_EXCHANGE_RATE"].resource_type,
                resource_code: resourceLookup["SETTING_EXCHANGE_RATE"].resource_code,
                resource_name: resourceLookup["SETTING_EXCHANGE_RATE"].resource_name
              },
            },
            {
              label: "Settings Access Token",
              url: "/settings/access-token",
              icon: "bx bxs-checkbox",
              showAll: true,
              meta: {
                resource_type: resourceLookup["SETTING_ACCESS_TOKEN"].resource_type,
                resource_code: resourceLookup["SETTING_ACCESS_TOKEN"].resource_code,
                resource_name: resourceLookup["SETTING_ACCESS_TOKEN"].resource_name
              },
            },
            {
              label: "Settings SLA",
              url: "/settings/sla",
              icon: "bx bxs-checkbox",
              permission: "read-sla",
              meta: {
                resource_type: resourceLookup["SETTINGS_SLA"].resource_type,
                resource_code: resourceLookup["SETTINGS_SLA"].resource_code,
                resource_name: resourceLookup["SETTINGS_SLA"].resource_name
              },
            },
            {
              label: "Settings Warning Runsheet",
              url: "/settings/configuration-warning-runsheet",
              icon: "bx bxs-checkbox",
              permission: "read-warning-koli-setting",
              meta: {
                resource_type: resourceLookup["SETTINGS_CONFIGURATION_WARNING_RUNSHEET"].resource_type,
                resource_code: resourceLookup["SETTINGS_CONFIGURATION_WARNING_RUNSHEET"].resource_code,
                resource_name: resourceLookup["SETTINGS_CONFIGURATION_WARNING_RUNSHEET"].resource_name
              },
            },
            {
              label: "Settings Facility Code",
              url: "/settings/facility-code",
              icon: "bx bxs-checkbox",
              permission: "read-facility-code",
              meta: {
                resource_type: resourceLookup["SETTINGS_FACILITY_CODE"].resource_type,
                resource_code: resourceLookup["SETTINGS_FACILITY_CODE"].resource_code,
                resource_name: resourceLookup["SETTINGS_FACILITY_CODE"].resource_name
              },
            },
            {
              label: "Settings KPI",
              url: "/settings/kpi",
              icon: "bx bxs-checkbox",
              permission: "", // TODO: Change after permission ready
              meta: {
                resource_type: resourceLookup["SETTINGS_KPI"].resource_type,
                resource_code: resourceLookup["SETTINGS_KPI"].resource_code,
                resource_name: resourceLookup["SETTINGS_KPI"].resource_name
              },
            },
            {
              label: "Settings Bag",
              url: "/settings/bag",
              icon: "bx bxs-checkbox",
              permission: "", // TODO: Change after permission ready
              meta: {
                resource_type: resourceLookup["SETTINGS_BAG"].resource_type,
                resource_code: resourceLookup["SETTINGS_BAG"].resource_code,
                resource_name: resourceLookup["SETTINGS_BAG"].resource_name
              },
            },
            {
              label: "Settings Destination",
              url: "/settings/destination",
              icon: "bx bxs-checkbox",
              permission: "", // TODO: Change after permission ready
              meta: {
                resource_type: resourceLookup["DESTINATION"].resource_type,
                resource_code: resourceLookup["DESTINATION"].resource_code,
                resource_name: resourceLookup["DESTINATION"].resource_name
              },
            },
            {
              label: "Settings Surat Muatan",
              url: "/settings/surat-muatan",
              icon: "bx bxs-checkbox",
              permission: "", // TODO: Change after permission ready
              meta: {
                resource_type: resourceLookup["SETTINGS_SURAT_MUATAN"].resource_type,
                resource_code: resourceLookup["SETTINGS_SURAT_MUATAN"].resource_code,
                resource_name: resourceLookup["SETTINGS_SURAT_MUATAN"].resource_name
              },
            },
            {
              label: "Settings Runsheet",
              url: "/settings/runsheet",
              icon: "bx bxs-checkbox",
              permission: "", // TODO: Change after permission ready
              meta: {
                resource_type: resourceLookup["SETTINGS_RUNSHEET"].resource_type,
                resource_code: resourceLookup["SETTINGS_RUNSHEET"].resource_code,
                resource_name: resourceLookup["SETTINGS_RUNSHEET"].resource_name
              },
            },
            {
              label: "Settings Courier",
              url: "/settings/courier",
              icon: "bx bxs-checkbox",
              permission: "read-courier-delivery-area",
              meta: {
                resource_type: resourceLookup["SETTINGS_COURIER"].resource_type,
                resource_code: resourceLookup["SETTINGS_COURIER"].resource_code,
                resource_name: resourceLookup["SETTINGS_COURIER"].resource_name
              },
            },
          ],
        },
        {
          label: "Admin",
          url: null,
          icon: "bx-user",
          permission: "read-admin",
          children: [
            {
              label: "Resync Runsheet",
              url: "/resync/runsheet",
              icon: "bx bxs-checkbox",
              meta: {
                resource_type: resourceLookup["RESYNC_RUNSHEET"].resource_type,
                resource_code: resourceLookup["RESYNC_RUNSHEET"].resource_code,
                resource_name: resourceLookup["RESYNC_RUNSHEET"].resource_name
              },
            },
          ],
        },
        {
          label: "Help",
          url: null,
          icon: "bx-help-circle",
          children: [
            {
              label: "Error Dictionary",
              url: "/help/error-dictionary",
              icon: "bx-message-alt-error",
              meta: {
                resource_type: resourceLookup["HELP_ERROR_DICTIONARY"].resource_type,
                resource_code: resourceLookup["HELP_ERROR_DICTIONARY"].resource_code,
                resource_name: resourceLookup["HELP_ERROR_DICTIONARY"].resource_name
              },
            },
            {
              label: "Shortcut Dictionary",
              url: "/help/shortcut-dictionary",
              icon: "bxs-keyboard",
              meta: {
                resource_type: resourceLookup["HELP_SHORTCUT_DICTIONARY"].resource_type,
                resource_code: resourceLookup["HELP_SHORTCUT_DICTIONARY"].resource_code,
                resource_name: resourceLookup["HELP_SHORTCUT_DICTIONARY"].resource_name
              },
            },
          ],
        },
      ],
      menuRolePermission: [
        {
          type: "exclusive",
          role: "HELPDESK"
        }
      ]
    };
  },
  watch: {
    expand: function(val) {
      if (this.isExpand === false && val === false) {
        this.isExpand = true;
      } else if (this.isExpand === true && val === true) {
        this.isExpand = false;
      } else {
        this.isExpand = val;
      }
    },
    '$route.path'(newPath) {
      this.activeItem = newPath;
    }
  },
  created() {
    this.activeItem = this.$route.path;
  },
  mounted() {
    this.listenNodeType();
    this.customFilter();
  },
  methods: {
    setActive(item) {
      if (this.$route.path !== item.url) {
        this.activeItem = item.url;
        this.$router.push(item.url);
        this.setRoutePageHistory(item.meta, false);
      }
    },
    listenNodeType() {
      this.nodeTypeCode = this.listenActiveUser.nodes[0].node_type.node_type_code;
    },
    customFilter() {
      switch (this.nodeTypeCode) {
        case "SP":
          this.menus.push({
            label: "Dashboard",
            url: null,
            icon: "bx-pie-chart-alt",
            children: [
              {
                label: "Smart Point",
                url: "/dashboard/smartpoint",
                icon: "",
              },
            ],
          });
          break;
      }
    },

    getMenuWithPermissions() {
      const permissions = this.$ls.get("permissions") || [];
      const userRole = this.$ls.get("user")?.role || {};
      const { menus, menuRolePermission } = this;
      const foundPermission = menuRolePermission.find(permission => permission.role === userRole?.user_role_name);
      const filtered = [];

      menus.forEach((menu) => {
        const { permission, children, rolePermission, showAll, label } = menu;
        if (foundPermission?.type === 'exclusive') {
          if (children.length > 0) {
            const filteredChildren = [];

            children.forEach((child) => {
              if ((child?.rolePermission === foundPermission.role) || child.showAll) {
                filteredChildren.push(child);
              }
            });

            if (filteredChildren.length > 0) {
              filtered.push({
                ...menu,
                children: filteredChildren,
              });
            }
          }
          else if (rolePermission) {
            if (rolePermission === foundPermission.role) {
              filtered.push(menu);
            }
          }
          else if (showAll) {
            filtered.push(menu);
          }
        }
        else if (permission) {
          if (permissions.includes(permission)) {
            filtered.push(menu);
          }
        } else if (children.length > 0) {
          const filteredChildren = children.filter((child) => {

            // NOTES: If have permission 'read-airport-prealert', hide 'Receiving'
            if (permissions.includes("read-airport-prealert") && child.label === "Receiving") {
              return false;
            }

            if (child.permission) {
              return permissions.includes(child.permission);
            }

            if (child.rolePermission) {
              return child.rolePermission === foundPermission?.role;
            }
            return true;
          });

          if (filteredChildren.length > 0) {
            filtered.push({
              ...menu,
              children: filteredChildren,
            });
          }
        } else {
          filtered.push(menu);
        }
      });

      return filtered;
    },
  },
};
</script>

<style lang="scss">
.vs-sidebar-content {
  box-shadow: unset;
  border-radius: 0 !important;
  .vs-sidebar__group__content {
    .v-enter-to {
    }
    .vs-sidebar__item__text {
      position: relative;
      width: 100%;
      height: 47px;
      p {
        margin: 0;
        height: 100%;
        line-height: 47px;
      }
    }
  }

  &.reduce {
    .box-logo {
      margin: 1em 0;
    }
  }
  a {
    color: rgba(var(--vs-text), 1);
    &.router-link-exact-active,
    &.router-link-active,
    &.focus,
    &.active,
    &.visited,
    &.hover {
      color: rgba(var(--vs-text), 1);
    }
  }
}
</style>
