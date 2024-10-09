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
              <a :href="child.url" :id="child.label.trim()">
                <vs-sidebar-item :id="child.label.trim()" :key="i" :to="child.url" :class="activeNav(child.url)">
                  <template #icon>
                    <i :class="`bx ${child.icon}`" />
                  </template>
                  <p>{{ child.label }}</p>
                </vs-sidebar-item>
              </a>
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
          <a :href="item.url" :id="item.label.trim()">
            <vs-sidebar-item :id="item.label.trim()" :key="key" :to="item.url" :class="activeNav(item.url)">
              <template #icon>
                <i :class="`bx ${item.icon !== null ? item.icon : ''}`" />
              </template>
              <p>{{ item.label }}</p>
            </vs-sidebar-item>
          </a>
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
          icon: "bx-search-alt",
          permission: "",
          children: [],
          showAll: true,
        },
        {
          label: "Trace Bag",
          url: "/trace-bag",
          icon: "bx-search",
          permission: "",
          children: [],
          showAll: true,
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
          icon: "bx-package",
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
          icon: "bx bx-archive",
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
          icon: "bx bxs-truck",
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
              permission: "read-manifest-delivery-order",
            },
            {
              label: "Surat Muatan",
              url: "/transport/manifest",
              icon: "",
              permission: "read-manifest",
            },
          ],
        },
        {
          label: "Receiving",
          url: "/inbound/prealert",
          icon: "bx bxs-inbox",
          children: [],
        },
        {
          label: "Receiving Bandara",
          url: "/inbound-bandara",
          icon: "bx bxs-inbox",
          children: [],
          permission: "create-manifest-delivery-order-airport",
        },
        {
          label: "Delivery",
          url: null,
          icon: "bx bx-paper-plane",
          children: [
            {
              label: "Delivery Runsheet",
              url: "/delivery/runsheet",
              icon: "",
              permission: "read-runsheet",
            },
            {
              label: "Handover Runsheet",
              url: "/hrs",
              icon: "",
              permission: "read-undelivery",
            },
            {
              label: "HRS History",
              url: "/hrs-history",
              icon: "",
              permission: "read-undelivery",
            },
            {
              label: "Deposit COD",
              url: "/deposit-cod",
              icon: "",
              permission: "read-cod",
            },
            {
              label: "Deposit COD History",
              url: "/cod-history",
              icon: "",
              permission: "read-cod",
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
              icon: "",
              permission: "read-irreg",
            },
            {
              label: "Connote Cancel History",
              url: "/connote-adjustment/connote-cancel-history",
              icon: "",
              permission: "read-irreg",
            },
            {
              label: "Connote Forward",
              url: "/connote-adjustment/connote-forward",
              icon: "",
              permission: "read-irreg",
            },
            {
              label: "Connote Return",
              url: "/connote-adjustment/connote-return",
              icon: "",
              permission: "read-irreg",
            }
          ],
        },
        {
          label: "Tracing",
          url: null,
          icon: "bx bx-store-alt",
          children: [
            {
              label: "Tracing Outstanding",
              url: "/tracing-outstanding",
              icon: "",
              permission: "read-irreg",
            },
            {
              label: "Tracing History",
              url: "/tracing-history",
              icon: "",
              permission: "read-irreg",
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
          icon: "bx bx-alarm-exclamation",
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
            }
          ],
        },
        {
          label: "Cost To Cost",
          url: null,
          icon: "bx bx-wallet",
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
          label: "Helpdesk",
          url: null,
          icon: "bx-user-voice",
          children: [
            {
              label: "Connote",
              url: "/helpdesk/connote",
              icon: "",
              rolePermission: "HELPDESK",
            },
            {
              label: "Bag",
              url: "/helpdesk/bag",
              icon: "",
              rolePermission: "HELPDESK",
            },
            {
              label: "Surat Jalan",
              url: "/helpdesk/surat-jalan",
              icon: "",
              rolePermission: "HELPDESK",
            },
            {
              label: "Surat Muatan",
              url: "/helpdesk/surat-muatan",
              icon: "",
              rolePermission: "HELPDESK",
            },
            {
              label: "Runsheet",
              url: "/helpdesk/runsheet",
              icon: "",
              rolePermission: "HELPDESK",
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
              showAll: true
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
            {
              label: "Settings Facility Code",
              url: "/settings/facility-code",
              icon: "",
              permission: "read-facility-code",
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
        {
          label: "Help",
          url: null,
          icon: "bx-help-circle",
          children: [
            {
              label: "Error Dictionary",
              url: "/help/error-dictionary",
              icon: "bx-message-alt-error",
            },
            {
              label: "Shortcut Dictionary",
              url: "/help/shortcut-dictionary",
              icon: "bxs-keyboard",
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
    activeNav(url) {
      return url === window.location.pathname ? 'active' : ''
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
      const userRole = this.$ls.get("user")?.role || {};
      const { menus, menuRolePermission } = this;
      const foundPermission = menuRolePermission.find(permission => permission.role === userRole?.user_role_name);
      const filtered = [];

      menus.forEach((menu) => {
        const { permission, children, rolePermission, showAll } = menu;

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
          const filteredChildren = [];

          children.forEach((child) => {
            if (child.permission) {
              if (permissions.includes(child.permission)) {
                filteredChildren.push(child);
              }
            }
            else if (child.rolePermission) {
              if (child.rolePermission === foundPermission?.role) {
                filteredChildren.push(child);
              }
            }
            else {
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
