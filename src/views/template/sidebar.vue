
<template>
    <div class="hidden">
      <vs-sidebar
        absolute
        v-model="active"
        :open="expand"
        @update:open="actionSidebar"
        >
        <template>
          <div class="box-logo">
              <Logo />
          </div>
        </template>

        <template v-for="(item,key) in menus">
            <template v-if="item.children.length > 0">
                <vs-sidebar-group :key="key">
                  <template #header>
                    <vs-sidebar-item arrow>
                      <template #icon>
                        <i :class="`bx ${item.icon !== null ? item.icon:''}`"></i>
                      </template>
                      {{item.label}}
                    </vs-sidebar-item>
                  </template>

                  <template v-for="(child, i) in item.children">
                    <router-link :to="child.url">
                      <vs-sidebar-item :id="child.label.trim()" :key="i">
                        <template #icon>
                          <i :class="`bx ${child.icon}`"></i>
                        </template>
                        {{child.label}}
                      </vs-sidebar-item>
                    </router-link>
                  </template>

                </vs-sidebar-group>
            </template>
            <template v-else>
              <router-link :to="item.url">
                <vs-sidebar-item :id="item.label.trim()" :key="key">
                  <template #icon>
                    <i :class="`bx ${item.icon !== null ? item.icon:''}`"></i>
                  </template>
                  {{item.label}}
                </vs-sidebar-item>
              </router-link>
            </template>
        </template>

        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar badge-color="danger" badge-position="top-right">
              <i class='bx bx-bell' ></i>

              <template #badge>
                28
              </template>
            </vs-avatar>

            <vs-avatar>
              <!-- <img src="/avatars/avatar-5.png" alt=""> -->
              <i class='bx bx-user'></i>
            </vs-avatar>
          </vs-row>
        </template>
      </vs-sidebar>
    </div>
</template>

<script>
import Logo from "../../components/logo/logo.vue"
export default {
    name:"Sidebar",
    components: {
        Logo: Logo
    },
    props: {
        expand: Boolean,
        actionSidebar: Function
    },
    data() {
        return {
            active: 'home',
            isExpand: false,
            menus: [
                {
                    label: 'New Transaction',
                    url: '/new-transactions',
                    icon: 'bx-archive',
                    children: []
                },
                {
                    label: 'Transaction',
                    url: null,
                    icon: 'bx-list-ol',
                    children: [
                        {
                            label: 'Transaction List',
                            url: '/sales/transaction',
                            icon: 'bx-list-ol'
                        },
                        {
                            label: 'Cash Register',
                            url: '/sales/cashregister',
                            icon: 'bx-money'
                        },
                        {
                            label: 'Upload Transaction',
                            url: '/upload/connote',
                            icon: 'bx-upload'
                        },
                    ]
                },
                {
                    label: 'Pick Up',
                    url: null,
                    icon: '',
                    children: [
                        {
                            label: 'Pickup Request',
                            url: '/pickup/request',
                            icon: ''
                        },
                        {
                            label: 'Pickup Schedule',
                            url: '/pickup/schedule',
                            icon: ''
                        },
                        {
                            label: 'Pickup List',
                            url: '/pickup/list',
                            icon: ''
                        },
                    ]
                },
                {
                    label: 'Inventory',
                    url: null,
                    icon: '',
                    children: [
                        {
                            label: 'Inventory Item',
                            url: '/inventory/item/list',
                            icon: ''
                        },
                        {
                            label: 'Inventory Bagging',
                            url: '/inventory/bagging',
                            icon: ''
                        },
                        {
                            label: 'Inventory Unbagging',
                            url: '/inventory/unbagging',
                            icon: ''
                        },
                    ]
                },
                {
                    label: 'Transport',
                    url: null,
                    icon: '',
                    children: [
                        {
                            label: 'Transport Packing Kayu',
                            url: '/transport/packingkayu',
                            icon: ''
                        },
                        {
                            label: 'Transport Booking',
                            url: '/transport/booking',
                            icon: ''
                        },
                        {
                            label: 'Transport Manifest',
                            url: '/transport/manifest',
                            icon: ''
                        },
                        {
                            label: 'Transport Manifest Pickup',
                            url: '/transport/manifest_pickup',
                            icon: ''
                        },
                        {
                            label: 'Surat Jalan',
                            url: '/transport/manifest-jalan',
                            icon: ''
                        },
                        {
                            label: 'Surat Muatan',
                            url: '/transport/manifest-new',
                            icon: ''
                        },
                    ]
                },
                {
                    label: 'Inbound',
                    url: null,
                    icon: '',
                    children: [
                        {
                            label: 'Inbound Incoming',
                            url: '/inbound/prealert',
                            icon: ''
                        },
                    ]
                },
                {
                    label: 'Delivery',
                    url: null,
                    icon: '',
                    children: [
                        {
                            label: 'Delivery Runsheet',
                            url: '/delivery/runsheet',
                            icon: ''
                        },
                        {
                            label: 'Cod',
                            url: '/delivery/cod_collect',
                            icon: ''
                        },
                        {
                            label: 'Undelivery',
                            url: '/undelivered',
                            icon: ''
                        },
                    ]
                },
                {
                    label: 'Settings',
                    url: null,
                    icon: '',
                    children: [
                        {
                            label: 'Settings Tariff',
                            url: '/settings/tariff',
                            icon: ''
                        },
                        {
                            label: 'Settings Geolocation',
                            url: '/settings/geolocation',
                            icon: ''
                        },
                        {
                            label: 'Settings Nodes',
                            url: '/settings/nodes',
                            icon: ''
                        },
                        {
                            label: 'Settings Links',
                            url: '/settings/links',
                            icon: ''
                        },
                        {
                            label: 'Settings Vehicles',
                            url: '/settings/vehicles',
                            icon: ''
                        },
                        {
                            label: 'Settings Users',
                            url: '/settings/users',
                            icon: ''
                        },
                        {
                            label: 'Settings Employee',
                            url: '/settings/employee',
                            icon: ''
                        },
                        {
                            label: 'Settings Customer',
                            url: '/settings/customer',
                            icon: ''
                        },
                        {
                            label: 'Settings Exchange Rate',
                            url: '/settings/exchangerate',
                            icon: ''
                        },
                    ]
                },
                {
                    label: 'Report',
                    url: null,
                    icon: '',
                    children: [
                        {
                            label: 'Packing List',
                            url: '/report/packinglist',
                            icon: ''
                        },
                        {
                            label: 'Cashless',
                            url: '/report/cashless',
                            icon: ''
                        },
                    ]
                },
                {
                    label: 'Irreguralities',
                    url: null,
                    icon: '',
                    children: [
                        {
                            label: 'Irreguralities - Cancel',
                            url: '/irreguralities/cancel',
                            icon: ''
                        },
                        {
                            label: 'Irreguralities - Return',
                            url: '/irreguralities/return',
                            icon: ''
                        },
                        {
                            label: 'Irreguralities - Problem',
                            url: '/irreguralities/problem',
                            icon: ''
                        },
                        {
                            label: 'Irreguralities - Hold',
                            url: '/irreguralities/hold',
                            icon: ''
                        },
                    ]
                },
                {
                    label: 'Cost To Cost',
                    url: null,
                    icon: '',
                    children: [
                        {
                            label: 'Settings',
                            url: '/costing/list',
                            icon: ''
                        },
                        {
                            label: 'Report',
                            url: '/costing/report',
                            icon: ''
                        },
                        {
                            label: 'Summary',
                            url: '/costing/summary',
                            icon: ''
                        },
                    ]
                },
            ]
        }
    },
    methods: {
        meong(val){
            console.log('meong', val)
        }
    },
}
</script>

<style lang="scss">
    .vs-sidebar-content{
        box-shadow:unset;
        border-radius:0 !important;
        .box-logo{
            position: relative;
            width: 100%;
            margin: 2em 0;
        }
        &.reduce{
            .box-logo{
                margin: 1em 0;
            }
        }
    }
</style>
