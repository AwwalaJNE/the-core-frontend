<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="hidden">
    <vs-sidebar
      v-model="active"
      absolute
      :open="isExpand"
      @update:open="actionSidebar"
      @input="redirect"
    >
      <template #logo>
        <div class="box-logo">
          <Logo />
        </div>
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
              <!-- <router-link :to="child.url" :key="i">
                      <vs-sidebar-item :id="child.label.trim()">
                        <template #icon>
                          <i :class="`bx ${child.icon}`"></i>
                        </template>
                        {{child.label}}
                      </vs-sidebar-item>
                    </router-link> -->
              <vs-sidebar-item :id="child.label.trim()" :key="i">
                <template #icon>
                  <i :class="`bx ${child.icon}`" />
                </template>
                <router-link :key="i" :to="child.url">
                  <p>{{ child.label }}</p>
                </router-link>
              </vs-sidebar-item>
              <!-- <vs-sidebar-item :id="child.label.trim()" :key="i" @input="redirect(child.url)">
                        <template #icon>
                          <i :class="`bx ${child.icon}`"></i>
                        </template>
                        {{child.label}}
                    </vs-sidebar-item> -->
            </template>
          </vs-sidebar-group>
        </template>
        <template v-else>
          <vs-sidebar-item :id="item.label.trim()" :key="key">
            <template #icon>
              <i :class="`bx ${item.icon !== null ? item.icon : ''}`" />
            </template>
            <router-link :key="key" :to="item.url">
              <p>{{ item.label }}</p>
            </router-link>
          </vs-sidebar-item>
        </template>
      </template>
    </vs-sidebar>
  </div>
</template>

<script>
import Logo from "../../components/logo/logo.vue";
// eslint-disable-next-line import/extensions
import master from "@/mixins/master";
export default {
  name: "Sidebar",
  components: {
    // eslint-disable-next-line object-shorthand
    Logo: Logo,
  },
  mixins: [master],
  props: {
    expand: Boolean,
    actionSidebar: Function,
  },
  data() {
    return {
      nodeTypeCode: null,
      active: "home",
      isExpand: false,
      menus: [
        {
          label: "New Transaction",
          url: "/transaction/new-transactions",
          icon: "bx-archive",
          permission: "create-transaction",
          children: [],
        },
        {
          label: "Trace Connote",
          url: "/trace-connote",
          icon: "bx-search",
          permission: "",
          children: [],
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
            },
            {
              label: "Cash Register",
              url: "/sales/cashregister",
              icon: "bx-money",
              permission: "create-transaction",
            },
            {
              label: "Upload Transaction",
              url: "/transaction/upload-connote",
              icon: "bx-upload",
              permission: "create-transaction",
            },
          ],
        },
        {
          label: "Pick Up",
          url: null,
          icon: "",
          children: [
            {
              label: "Pickup Request",
              permission: "create-pickup",
              url: "/pickup/request",
              icon: "",
            },
            {
              label: "Pickup Schedule",
              permission: "create-pickup-schedule",
              url: "/pickup/schedule",
              icon: "",
              permission: "read-pickup-schedule",
            },
            {
              label: "Pickup List",
              url: "/pickup/list",
              permission: "read-pickup",
              icon: "",
            },
          ],
        },
        {
          label: "Inventory",
          url: null,
          icon: "",
          children: [
            {
              label: "Inventory Item",
              url: "/inventory/item",
              icon: "",
              permission: "read-bag",
            },
            {
              label: "Inventory Bag",
              url: "/inventory/bag",
              icon: "",
              permission: "read-bag",
            },
            {
              label: "Create Bag",
              url: "/inventory/bagging",
              icon: "",
              permission: "read-bag",
            },
            {
              label: "Open Bag",
              url: "/inventory/unbagging",
              icon: "",
              permission: "read-unbag",
            },
          ],
        },
        {
          label: "Transport",
          url: null,
          icon: "",
          children: [
            {
              label: "Transport Packing Kayu",
              url: "/transport/packingkayu",
              icon: "",
              permission: "read-packing-kayu",
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
              icon: "",
              permission: "read-inventory-vehicle",
            },
            {
              label: "Surat Jalan",
              url: "/transport/manifest-jalan",
              icon: "",
              permission: "read-manifest",
            },
            {
              label: "Surat Muatan",
              url: "/transport/manifest",
              icon: "",
              permission: "read-manifest-delivery-order",
            },
          ],
        },
        {
          label: "Receiving",
          url: "/inbound/prealert",
          icon: "",
          children: [],
        },
        {
          label: "Receiving Bandara",
          url: "/inbound-bandara",
          icon: "",
          children: [],
          permission: "create-manifest-delivery-order-airport",
        },
        {
          label: "Delivery",
          url: null,
          icon: "",
          children: [
            {
              label: "Delivery Runsheet",
              url: "/delivery/runsheet",
              icon: "",
              permission: "read-runsheet",
            },
            {
              label: "SCO",
              url: "/sco",
              icon: "",
              permission: "read-cod",
            },
            {
              label: "Handover Runsheet",
              url: "/hrs",
              icon: "",
              permission: "read-undelivery",
            },
            {
              label: "Cod History",
              url: "/delivery/cod_history",
              icon: "",
              permission: "read-cod",
            },
          ],
        },
        {
          label: "Report",
          url: null,
          icon: "",
          children: [
            {
              label: "Packing List",
              url: "/report/packinglist",
              icon: "",
              permission: "read-report-packing-list",
            },
            {
              label: "Cashless",
              url: "/report/cashless",
              icon: "",
              permission: "read-cashless",
            },
          ],
        },
        {
          label: "Irreguralities",
          url: null,
          icon: "",
          children: [
            {
              label: "Inventory Irreguralities",
              url: "/irreguralities/inventory",
              icon: "",
              permission: "read-irreg",
            },
            {
              label: "Irreguralities - Entry Status",
              url: "/irreguralities/entry-status",
              icon: "",
              permission: "read-irreg",
            },
            {
              label: "Irreguralities - Cancel",
              url: "/irreguralities/cancel",
              icon: "",
              permission: "read-irreg",
            },
            {
              label: "Irreguralities - Return",
              url: "/irreguralities/return",
              icon: "",
              permission: "read-irreg",
            },
            {
              label: "Irreguralities - Hold",
              url: "/irreguralities/hold",
              icon: "",
              permission: "read-irreg",
            },
            {
              label: "Irreguralities - Failed",
              url: "/irreguralities/failed",
              icon: "",
              permission: "read-irreg",
            },
            {
              label: "Irreguralities - Tracing",
              url: "/irreguralities/tracing",
              icon: "",
              permission: "read-irreg",
            },
          ],
        },
        {
          label: "Cost To Cost",
          url: null,
          icon: "",
          children: [
            {
              label: "Settings",
              url: "/costing/list",
              icon: "",
            },
            {
              label: "Report",
              url: "/costing/report",
              icon: "",
            },
            {
              label: "Summary",
              url: "/costing/summary",
              icon: "",
            },
          ],
        },
        {
          label: "Settings",
          url: null,
          icon: "bx-cog",
          children: [
            {
              label: "Settings Tariff",
              url: "/settings/tariff",
              icon: "",
              permission: "read-tariff",
            },
            {
              label: "Settings Surcharge",
              url: "/settings/surcharge",
              icon: "",
              permission: "read-surcharge",
            },
            {
              label: "Settings Geolocation",
              url: "/settings/geolocation",
              icon: "",
              permission: "read-geolocation-country",
            },
            {
              label: "Settings Nodes",
              url: "/settings/nodes",
              icon: "",
              permission: "read-node",
            },
            {
              label: "Settings Vehicles",
              url: "/settings/vehicles",
              icon: "",
              permission: "read-vehicle",
            },
            {
              label: "Settings Users",
              url: "/settings/users",
              icon: "",
              permission: "read-user",
            },
            {
              label: "Settings Employee",
              url: "/settings/employee",
              icon: "",
              permission: "read-employee",
            },
            {
              label: "Settings Customer",
              url: "/settings/customer",
              icon: "",
              permission: "read-customer",
            },
            {
              label: "Settings Exchange Rate",
              url: "/settings/exchangerate",
              icon: "",
              permission: "read-customer",
            },
            {
              label: "Settings Access Token",
              url: "/settings/access-token",
              icon: "",
            },
            {
              label: "Settings SLA",
              url: "/settings/sla",
              icon: "",
              permission: "read-sla",
            },
            {
              label: "Settings Warning Runsheet",
              url: "/settings/configuration-warning-runsheet",
              icon: "",
              permission: "read-warning-koli-setting",
            },
          ],
        },
        {
          label: "Admin",
          url: null,
          icon: "bx-user",
          children: [
            {
              label: "Resync Runsheet",
              url: "/resync/runsheet",
              icon: "",
            },
          ],
        },
      ],
    };
  },
  watch: {
    // eslint-disable-next-line object-shorthand, space-before-function-paren
    expand: function(val) {
      if (this.isExpand === false && val === false) {
        this.isExpand = true;
      } else if (this.isExpand === true && val === true) {
        this.isExpand = false;
      } else {
        this.isExpand = val;
      }
    },
  },
  mounted() {
    this.listenNodeType();
    this.customFilter();
  },
  methods: {
    redirect(val) {
      this.isExpand = false;
      // this.$router.push(`${val}`)
    },
    listenNodeType() {
      this.nodeTypeCode = this.listenActiveUser.nodes[0].node_type.node_type_code;
    },
    loadPermission() {
      this.nodeTypeCode = this.listenActiveUser.nodes[0].node_type.node_type_code;
    },
    customFilter() {
      // eslint-disable-next-line default-case
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
      const { menus } = this;
      const filtered = [];

      menus.forEach((menu) => {
        const { permission, children } = menu;

        if (permission) {
          if (permissions.includes(permission)) {
            filtered.push(menu);
          }
        } else if (children.length > 0) {
          const filteredChildren = [];

          children.forEach((child) => {
            if (child.permission) {
              if (permissions.includes(child.permission)) {
                filteredChildren.push(child);
              }
            } else {
              filteredChildren.push(child);
            }
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
