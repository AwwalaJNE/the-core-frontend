<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2 v-copy="title">{{ title }}</h2>
                </div>
            </vs-col>
        </vs-row>

        <section class="users">
            <vs-row justify="space-around">
                <vs-col
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    :w="`${navActive === 'k-PERMISSIONS' ? '4' : '12'}`"
                >
                    <div class="box view">
                        <template>
                            <vs-row>
                                <vs-col vs-align="center" xs="6" sm="3" lg="2">
                                    <template v-if="DataBag.length > 1">
                                        <vs-select
                                            class="m-select"
                                            filter
                                            :multiple="false"
                                            autocomplete="off"
                                            placeholder="All Bag"
                                            v-model="bag_number"
                                            :border="true"
                                            @change="updateBag"
                                        >
                                            <template v-if="DataBag.length > 1">
                                                <vs-option
                                                    v-for="(item, key) in DataBag"
                                                    :key="key"
                                                    :label="item.label"
                                                    :value="item.value"
                                                >
                                                    {{ item.label }}
                                                </vs-option>
                                            </template>
                                        </vs-select>
                                    </template>
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="3" lg="3">
                                    <template v-if="DataVehicle.length > 1">
                                        <vs-select
                                            class="m-select"
                                            filter
                                            autocomplete="off"
                                            :multiple="false"
                                            placeholder="All Vehicle"
                                            v-model="vehicle_id"
                                            :border="true"
                                            @change="updateVehicle"
                                        >
                                            <template v-if="DataVehicle.length > 1">
                                                <vs-option
                                                    v-for="(item, key) in DataVehicle"
                                                    :key="key"
                                                    :label="item.label"
                                                    :value="item.value"
                                                >
                                                    {{ item.label }}
                                                </vs-option>
                                            </template>
                                        </vs-select>
                                    </template>
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="3" lg="3">
                                    <template v-if="DataDriver.length > 1">
                                        <vs-select
                                            class="m-select"
                                            filter
                                            :multiple="false"
                                            placeholder="All Driver"
                                            v-model="driver_id"
                                            :border="true"
                                            @change="updateDriver"
                                        >
                                            <template v-if="DataDriver.length > 1">
                                                <vs-option
                                                    v-for="(item, key) in DataDriver"
                                                    :key="key"
                                                    :label="item.label"
                                                    :value="item.value"
                                                >
                                                    {{ item.label }}
                                                </vs-option>
                                            </template>
                                        </vs-select>
                                    </template>
                                </vs-col>
                                <vs-col xs="5" sm="3" lg="3" offset="1" class="mb-15">
                                    <search-input
                                        ref="searchInput"
                                        @searchValue="searchValue"
                                        :placeholder="`Search Koli`"
                                    />
                                </vs-col>
                            </vs-row>
                            
                                <vehicle-list
                                    :ref="navActive"
                                    :query="tempSearch"
                                    :queryVehicle="vehicle_id"
                                    :queryBags="bag_number"
                                    :queryDriver="driver_id"
                                />
                            
                        </template>
                    </div>
                </vs-col>
            </vs-row>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import TableMaster from '@/components/table/tableMaster.vue'
import NavItem from '@/components/navbar/navTab'
import Breadcrumb from '@/components/breadcrumb/index'
import SearchInput from '@/components/search/searchInput'
import Selector from '@/components/input/select'

// Connote
import VehicleList from '@/views/transport/inventoryVehicle/vehicleList'

export default {
    name: 'Users',
    mixins: [master],
    components: {
        'table-master': TableMaster,
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'search-input': SearchInput,
        'vehicle-list': VehicleList,
        selector: Selector,
    },
    data() {
        return {
            navActive: 'k-CONNOTE',

            DataDriver: [
                {
                    label: 'All Driver',
                    value: '-',
                },
            ],
            DataVehicle: [
                {
                    label: 'All Vehicle',
                    value: '-',
                },
            ],
            DataBag: [
                {
                    label: 'All Bag',
                    value: '-',
                },
            ],
            vehicle_id: '',
            driver_id: '',
            bag_number: '',
            data_vehicle: '',
            dialogUser: false,
            dialogRole: false,
            title: 'Inventory Vehicle',
            dataRole: [],
            loadingDataRole: false,
            permission: [],
            loadingPermission: false,
            permissionDisplay: [],
            keysPermission: {},
            datacolumn: [
                {
                    label: 'Menu',
                    key: 'user_permission_name',
                    type: 'text',
                    width: 'sm',
                },
                {
                    label: 'Select',
                    key: 'selected',
                    type: 'boolean',
                    width: 'xs',
                },
                {
                    label: 'Access Data',
                    key: 'permission_access_data',
                    type: 'selector',
                    width: 'auto',
                },
            ],
            loading: false,
            tempSearch: '',
            pagination: {
                limit: 5,
                page_size: 1,
                page: 1,
            },
            refreshInject: '',

            value: this.selectedValue ? this.selectedValue : '-',
        }
    },
    methods: {
        async getDriver() {
            await axios
                .get(
                    this.URL.employee + `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                    this.Helper.header()
                )
                .then((res) => {
                    res.data.data.map((item) => {
                        let obj = {}
                        obj['label'] = item.employee_name + ' (' + item.employee_nik + ' )'
                        obj['value'] = item.employee_id

                        this.DataDriver.push(obj)
                    })
                })
                .catch((err) => {
                    this.loading = false
                    const errorMessage = err.response?.data?.message || 'Unknown error'
                    const errorCode = err.response?.data?.code || ''
                    this.openNotification(
                        'danger',
                        errorCode,
                        'Failed to populate employee list',
                        errorMessage
                    )
                })
        },
        async getDataVehicle() {
            this.loading = true
            await axios
                .get(
                    this.URL.vehicle_manifest_delivery_order +
                        `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`,
                    this.Helper.header()
                )
                .then((res) => {
                    let arr = []
                    res.data.data.map((item) => {
                        let obj = {}
                        obj['label'] = item.vehicle_name + ' (' + item.vehicle_police_no + ')'
                        obj['value'] = item.vehicle_id
                        obj['item'] = item
                        this.DataVehicle.push(obj)
                    })
                })
                .catch((err) => {
                    this.loading = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Failed to populate vehicle list',
                        err
                    )
                })
        },
        async getBag() {
            this.loading = true
            await axios
                .get(
                    this.URL.bag + `?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data.length > 0) {
                        res.data.data.map((item) => {
                            let obj = {}
                            obj['label'] = item.bag_number
                            obj['value'] = item.bag_number

                            this.DataBag.push(obj)
                        })
                    }

                    this.loading = false
                })
                .catch((err) => {
                    this.loading = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Failed to populate bag list',
                        err?.response?.data?.message ?? 'something went wrong'
                    )
                })
        },
        refresh() {
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
        },
        searchValue(val) {
            this.tempSearch = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        activeTab(val) {
            this.navActive = val
            this.clearSearch()
            let item = this.navItemm.filter((item) => {
                return item.key == val
            })
            this.title = item[0].title
        },
        actionLimit(val) {
            this.pagination.limit = val
        },
        actionPagination(val) {
            this.pagination.page = val
        },

        filterNow() {
            if (this.permission.length > 0) {
                this.permission.map((item) => {
                    if (this.keysPermission.hasOwnProperty(item.user_permission_id)) {
                        item['selected'] = true
                    }
                })
                this.permissionDisplay = this.permission
            }
        },

        updateVehicle(val) {
            this.vehicle_id = val
        },
        updateDriver(val) {
            // this.vehicle_id = val;
            // this.getDriver()
        },
        updateBag(val) {
            this.bag_number = val
        },
    },

    mounted() {
        this.getDriver()
        this.getDataVehicle()
        this.getBag()
    },
}
</script>
<style lang="scss">
.users {
    min-height: 50vh;

    .view {
        min-height: 400px;
    }

    .nav-box {
        position: relative;
        top: 0;
        left: 0;
        width: auto;
        max-width: 350px;
    }

    .dataRole {
        position: relative;
        width: 100%;
        padding: 15px;

        ul {
            position: relative;
            margin: 0;
            padding: 0;
            width: 100%;

            li {
                text-align: left;
                cursor: pointer;
                padding: 1em;
                border-bottom: 1px solid #eee;
                background-color: white;
                transition: all 0.2s ease;

                &:hover {
                    background-color: #f1f1f1;
                    transition: all 0.3s ease-in;
                }
            }
        }
    }
}
</style>
