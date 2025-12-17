<template>
    <div>
        <section class="users">
            <vs-row justify="space-between">
                <summary-card
                    v-if="hasPermission('read-inventory-metric')"
                    :dataLabel="summaryCardArr"
                    :dataValue="summaryCardData"
                    :loading="loading"
                />
            </vs-row>
            <vs-row justify="space-around">
                <vs-col
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    :w="`${navActive === 'k-PERMISSIONS' ? '4' : '12'}`"
                >
                    <div class="box view">
                        <vs-row justify="space-between">
                            <vs-col xs="12" sm="6" lg="8">
                                <nav-item :navItem="navItemm" @activeTab="activeTab" />
                            </vs-col>
                            <vs-col xs="12" sm="6" lg="4">
                                <template v-if="navActive === 'k-CONNOTE'">
                                    <vs-row>
                                        <vs-col vs-align="center" w="6">
                                            <select-search-by
                                                :key="navActive"
                                                :border="true"
                                                :isMultiple="false"
                                                :selectedValue="searchByConnote"
                                                :valueData="searchParamsConnote"
                                                @updateSearchBy="updateSearchByConnote"
                                            />
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input
                                                ref="searchInput"
                                                :key="navActive"
                                                :placeholder="searchPlaceholderConnote"
                                                :isNumeric="searchByDataTypeConnote"
                                                @handleSearch="handleSearch"
                                                @searchValue="searchValue"
                                            />
                                        </vs-col>
                                    </vs-row>
                                </template>
                                <template v-else-if="navActive === 'k-KOLI'">
                                    <vs-row>
                                        <vs-col vs-align="center" w="6">
                                            <select-search-by
                                                :key="navActive"
                                                :border="true"
                                                :isMultiple="false"
                                                :selectedValue="searchBy"
                                                :valueData="searchParams"
                                                @updateSearchBy="updateSearchBy"
                                            />
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input
                                                ref="searchInput"
                                                :key="navActive"
                                                :placeholder="searchPlaceholder"
                                                :isNumeric="searchByDataType"
                                                @handleSearch="handleSearch"
                                                @searchValue="searchValue"
                                            />
                                        </vs-col>
                                    </vs-row>
                                </template>
                                <template v-else-if="navActive === 'k-ARCHIVE'">
                                    <vs-row>
                                        <vs-col vs-align="center" w="6">
                                            <select-search-by
                                                :key="navActive"
                                                :border="true"
                                                :isMultiple="false"
                                                :selectedValue="searchByArchive"
                                                :valueData="searchParamsArchive"
                                                @updateSearchBy="updateSearchByArchive"
                                            />
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input
                                                ref="searchInput"
                                                :key="navActive"
                                                :placeholder="searchPlaceholderArchive"
                                                :isNumeric="searchByDataTypeArchive"
                                                @handleSearch="handleSearch"
                                                @searchValue="searchValue"
                                            />
                                        </vs-col>
                                    </vs-row>
                                </template>
                            </vs-col>
                        </vs-row>

                        <template v-if="navActive === 'k-CONNOTE'">
                            <vs-row>
                                <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                    <selector
                                        formKey="bag-status-by"
                                        :ref="navActive"
                                        :hiddenTitle="true"
                                        :valueData="dataStatusBagConnote"
                                        :selectedValue="selectedStatusBagConnote"
                                        :isMultiple="false"
                                        :border="true"
                                        @updateValue="updateStatusBagConnote"
                                    />
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                    <selector
                                        formKey="inventory-status-by"
                                        :ref="navActive"
                                        :hiddenTitle="true"
                                        :valueData="dataStatusInventoryConnote"
                                        :selectedValue="selectedStatusInventoryConnote"
                                        :isMultiple="false"
                                        :border="true"
                                        @updateValue="updateStatusInventoryConnote"
                                    />
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="3" lg="2">
                                    <select-search-by
                                        :ref="navActive"
                                        :border="true"
                                        :isMultiple="false"
                                        :selectedValue="filterDateByConnote"
                                        :valueData="dateParamsConnote"
                                        @updateSearchBy="updateFilterDateByConnote"
                                    />
                                </vs-col>
                                <vs-col xs="6" sm="5" lg="6">
                                    <date-time
                                        :ref="navActive"
                                        :name="''"
                                        :rules="''"
                                        :formKey="'DATE_TIME_WITHOUT_SECONDS'"
                                        :valueData="tempDateConnote"
                                        typeInput="datetimerange"
                                        @updateValue="searchDateConnote"
                                    />
                                </vs-col>
                            </vs-row>
                            <transition name="slide-fade">
                                <connote-list
                                    :ref="navActive"
                                    :dateFilter="tempDateConnote"
                                    :query="tempSearch"
                                    :queryInventory="selectedStatusInventoryConnote"
                                    :queryBag="selectedStatusBagConnote"
                                    :querySearch="searchByConnote"
                                    :queryDate="filterDateByConnote"
                                    @getSummaryData="getSummaryData"
                                />
                            </transition>
                        </template>
                        <template v-else-if="navActive === 'k-KOLI'">
                            <vs-row>
                                <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                    <selector
                                        formKey="bag-status-by"
                                        :ref="navActive"
                                        :hiddenTitle="true"
                                        :valueData="dataStatusBag"
                                        :selectedValue="selectedStatusBag"
                                        :isMultiple="false"
                                        :border="true"
                                        @updateValue="updateStatusBag"
                                    />
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                    <selector
                                        formKey="inventory-status-by"
                                        :ref="navActive"
                                        :hiddenTitle="true"
                                        :valueData="dataStatusInventory"
                                        :selectedValue="selectedStatusInventory"
                                        :isMultiple="false"
                                        :border="true"
                                        @updateValue="updateStatusinventory"
                                    />
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="3" lg="2">
                                    <select-search-by
                                        :ref="navActive"
                                        :border="true"
                                        :isMultiple="false"
                                        :selectedValue="filterDateBy"
                                        :valueData="dateParams"
                                        @updateSearchBy="updateFilterDateBy"
                                    />
                                </vs-col>
                                <vs-col xs="6" sm="5" lg="6">
                                    <date-time
                                        :ref="navActive"
                                        :name="''"
                                        :rules="''"
                                        :formKey="'DATE_TIME_WITHOUT_SECONDS'"
                                        :valueData="tempDate"
                                        typeInput="datetimerange"
                                        @updateValue="searchDate"
                                    />
                                </vs-col>
                            </vs-row>
                            <transition name="slide-fade">
                                <koli-list
                                    :ref="navActive"
                                    :dateFilter="tempDate"
                                    :query="tempSearch"
                                    :queryInventory="selectedStatusInventory"
                                    :queryBag="selectedStatusBag"
                                    :querySearch="searchBy"
                                    :queryDate="filterDateBy"
                                    :hasStatusDelivery="'0'"
                                    @getSummaryData="getSummaryData"
                                />
                            </transition>
                        </template>
                        <template v-else-if="navActive === 'k-ARCHIVE'">
                            <vs-row>
                                <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                    <selector
                                        formKey="status_delivery"
                                        :ref="navActive"
                                        :hiddenTitle="true"
                                        :valueData="dataStatusDelivery"
                                        :selectedValue="selectedStatusDelivery"
                                        :isMultiple="false"
                                        :border="true"
                                        @updateValue="updateStatusStatusDelivery"
                                    />
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="3" lg="2">
                                    <select-search-by
                                        :ref="navActive"
                                        :border="true"
                                        :isMultiple="false"
                                        :selectedValue="filterDateByArchive"
                                        :valueData="dateParamsArchive"
                                        @updateSearchBy="updateFilterDateByArchive"
                                    />
                                </vs-col>
                                <vs-col xs="6" sm="5" lg="6">
                                    <date-time
                                        :ref="navActive"
                                        :name="''"
                                        :rules="''"
                                        :formKey="'DATE_TIME_WITHOUT_SECONDS'"
                                        :valueData="tempDateArchive"
                                        typeInput="datetimerange"
                                        @updateValue="searchDateArchive"
                                    />
                                </vs-col>
                            </vs-row>
                            <transition name="slide-fade">
                                <koli-list
                                    :ref="navActive"
                                    :dateFilter="tempDateArchive"
                                    :query="tempSearch"
                                    :querySearch="searchByArchive"
                                    :queryDate="filterDateByArchive"
                                    :hasStatusDelivery="'1'"
                                    :statusDelivery="selectedStatusDelivery"
                                    @getSummaryData="getSummaryData"
                                />
                            </transition>
                        </template>
                    </div>
                </vs-col>
            </vs-row>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'

import master from '@/mixins/master'

import SummaryCard from '@/components/card/summaryCard'
import TableMaster from '@/components/table/tableMaster.vue'
import NavItem from '@/components/navbar/navTab'
import Breadcrumb from '@/components/breadcrumb/index'
import SearchInput from '@/components/search/searchInput'
import Selector from '@/components/input/select'
import SelectSearchBy from '@/components/search/selectSearchBy'
import DateTime from '@/components/input/dateTime'

// Connote
import ConnoteList from '@/views/inventory/connote/connote/cnoteList'
// Koli
import KoliList from '@/views/inventory/connote/item/connoteList'

export default {
    name: 'Inventory Item',
    mixins: [master],
    components: {
        'table-master': TableMaster,
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'search-input': SearchInput,
        'connote-list': ConnoteList,
        'koli-list': KoliList,
        selector: Selector,
        'select-search-by': SelectSearchBy,
        'date-time': DateTime,
        'summary-card': SummaryCard,
    },
    data() {
        return {
            navItemm: [
                {
                    label: 'KOLI',
                    key: 'k-KOLI',
                    title: 'Koli List',
                },
                {
                    label: 'CONNOTE',
                    key: 'k-CONNOTE',
                    title: 'Connote List',
                },
                {
                    label: 'ARCHIVE',
                    key: 'k-ARCHIVE',
                    title: 'Archive List',
                },
            ],
            navActive: 'k-KOLI',
            title: 'Connote List',
            loading: false,
            dataItem: {},
            tempSearch: '',

            pagination: {
                limit: 5,
                page_size: 1,
                page: 1,
            },
            refreshInject: 'k-KOLI',

            // ==== START FILTER CONNOTE TAB
            searchByConnote: 'connote',
            searchByDataTypeConnote: false,
            searchPlaceholderConnote: 'Search Connote',
            searchParamsConnote: [
                {
                    label: 'Connote',
                    value: 'connote',
                },
                {
                    label: 'Bag',
                    value: 'bag',
                },
                {
                    label: 'Origin',
                    value: 'origin',
                },
                {
                    label: 'Destination',
                    value: 'destination',
                },
                {
                    label: 'Weight',
                    value: 'weight',
                    isNumeric: true,
                },
                {
                    label: 'Service',
                    value: 'service',
                },
                {
                    label: 'Amount COD',
                    value: 'amount_cod',
                    isNumeric: true,
                },
            ],

            selectedStatusBagConnote: 'ALL',
            dataStatusBagConnote: [
                {
                    label: 'All Bag',
                    value: 'ALL',
                },
                {
                    label: 'Is In Bag',
                    value: '1',
                },
                {
                    label: 'Not In Bag',
                    value: '0',
                },
            ],

            selectedStatusInventoryConnote: 'ALL',
            dataStatusInventoryConnote: [
                {
                    label: 'All Status',
                    value: 'ALL',
                },
                {
                    label: 'Confirmed',
                    value: '1',
                },
                {
                    label: 'Unconfirmed',
                    value: '0',
                },
            ],

            tempDateConnote: [],
            filterDateByConnote: 'create',
            dateParamsConnote: [
                {
                    label: 'Created Date',
                    value: 'create',
                },
                {
                    label: 'Receiving Date',
                    value: 'receive',
                },
                {
                    label: 'Opened Date',
                    value: 'opened',
                },
                {
                    label: 'SLA',
                    value: 'sla',
                },
            ],

            // ==== END FILTER CONNOTE TAB

            // ==== START FILTER KOLI TAB
            searchBy: 'connote',
            searchByDataType: false,
            searchPlaceholder: 'Search Koli',
            searchParams: [
                {
                    label: 'Koli',
                    value: 'connote',
                },
                {
                    label: 'Bag',
                    value: 'bag',
                },
                {
                    label: 'Origin',
                    value: 'origin',
                },
                {
                    label: 'Destination',
                    value: 'destination',
                },
                {
                    label: 'Weight',
                    value: 'weight',
                    isNumeric: true,
                },
                {
                    label: 'Service',
                    value: 'service',
                },
                {
                    label: 'Amount COD',
                    value: 'amount_cod',
                    isNumeric: true,
                },
            ],

            selectedStatusBag: 'ALL',
            dataStatusBag: [
                {
                    label: 'All Bag',
                    value: 'ALL',
                },
                {
                    label: 'Is In Bag',
                    value: '1',
                },
                {
                    label: 'Not In Bag',
                    value: '0',
                },
            ],

            selectedStatusInventory: 'ALL',
            dataStatusInventory: [
                {
                    label: 'All Status',
                    value: 'ALL',
                },
                {
                    label: 'Confirmed',
                    value: '1',
                },
                {
                    label: 'Unconfirmed',
                    value: '0',
                },
            ],

            tempDate: [],
            filterDateBy: 'create',
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create',
                },
                {
                    label: 'Receiving Date',
                    value: 'receive',
                },
                {
                    label: 'Opened Date',
                    value: 'opened',
                },
                {
                    label: 'SLA',
                    value: 'sla',
                },
            ],

            // ==== END FILTER KOLI TAB

            // ==== START FILTER ARCHIVE TAB
            searchByArchive: 'connote',
            searchPlaceholderArchive: 'Search Koli',
            searchByDataTypeArchive: false,
            searchParamsArchive: [
                {
                    label: 'Koli',
                    value: 'connote',
                },
                {
                    label: 'Bag',
                    value: 'bag',
                },
                {
                    label: 'Origin',
                    value: 'origin',
                },
                {
                    label: 'Destination',
                    value: 'destination',
                },
                {
                    label: 'Weight',
                    value: 'weight',
                    isNumeric: true,
                },
                {
                    label: 'Service',
                    value: 'service',
                },
                {
                    label: 'Amount COD',
                    value: 'amount_cod',
                    isNumeric: true,
                },
            ],

            selectedStatusDelivery: 'ALL',
            dataStatusDelivery: [
                {
                    label: 'All Status',
                    value: 'ALL',
                },
                {
                    label: 'Delivered',
                    value: 'DELIVERED',
                },
                {
                    label: 'Undelivered',
                    value: 'UNDELIVERED',
                },
            ],

            tempDateArchive: [],
            filterDateByArchive: 'create',
            dateParamsArchive: [
                {
                    label: 'Created Date',
                    value: 'create',
                },
                // {
                //     label: 'POD Date',
                //     value: 'pod',
                // },
            ],

            tempDate: [],
            // ==== END FILTER ARCHIVE TAB

            // ==== START SUMMARY CARD
            summaryCardData: {},
            summaryCardArr: [
                {
                    label: 'Connote',
                    key: 'summary_connote',
                    width: 4,
                },
                {
                    label: 'Unrunsheet',
                    key: 'summary_unrunsheet',
                    width: 4,
                },
                {
                    label: 'Need Redelivery',
                    key: 'summary_need_redelivery',
                    width: 4,
                },
            ],

            // ==== END SUMMARY CARD
        }
    },
    methods: {
        updateStatusBag(key, val) {
            this.selectedStatusBag = val
        },
        updateStatusBagConnote(key, val) {
            this.selectedStatusBagConnote = val
        },
        updateStatusinventory(key, val) {
            this.selectedStatusInventory = val
        },
        updateStatusInventoryConnote(key, val) {
            this.selectedStatusInventoryConnote = val
        },
        updateStatusStatusDelivery(key, val) {
            this.selectedStatusDelivery = val
        },
        updateSearchBy(key, val, dataType) {
            this.searchBy = val
            this.searchPlaceholder = key
            this.searchByDataType = dataType
        },
        updateSearchByConnote(key, val, dataType) {
            this.searchByConnote = val
            this.searchPlaceholderConnote = key
            this.searchByDataTypeConnote = dataType
        },
        updateSearchByArchive(key, val, dataType) {
            this.searchByArchive = val
            this.searchPlaceholderArchive = key
            this.searchByDataTypeArchive = dataType
        },
        updateFilterDateByConnote(key, val) {
            this.filterDateByConnote = val

            if (this.tempDateConnote.length !== 0) {
                this.tempDateConnote = []
            }
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val

            if (this.tempDate.length !== 0) {
                this.tempDate = []
            }
        },
        updateFilterDateByArchive(key, val) {
            this.filterDateByArchive = val

            if (this.tempDateArchive.length !== 0) {
                this.tempDateArchive = []
            }
        },
        refresh() {
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
        },
        searchValue(val) {
            this.tempSearch = val
        },
        searchDate(key, val) {
            this.tempDate = val
        },
        searchDateConnote(key, val) {
            this.tempDateConnote = val
        },
        searchDateArchive(key, val) {
            this.tempDateArchive = val
        },
        clearSearch() {
            this.tempSearch = ''
            this.$refs.searchInput.clear()
            this.tempDate = []
        },
        activeTab(val) {
            this.navActive = val
            this.clearSearch()
            let item = this.navItemm.filter((item) => {
                return item.key == val
            })
            this.title = item[0].title
            this.refreshInject = this.navActive
        },
        actionLimit(val) {
            this.pagination.limit = val
        },
        actionPagination(val) {
            this.pagination.page = val
        },
        handleSearch() {
            this.$nextTick(() => {
                this.refresh()
                this.$refs.searchInput.clear()
            })
        },

        async getSummaryData() {
            if (!this.hasPermission('read-inventory-metric')) return

            this.loading = true

            const params = {
                n: this.listenNodeId,
                sort_order: 'desc',
                s: this.tempSearch || '',
            }

            const NAV_FILTERS = {
                'k-CONNOTE': () => ({
                    is_on_bag: this.selectedStatusBagConnote || '',
                    is_confirmed: this.selectedStatusInventoryConnote || '',
                    start_date: this.tempDateConnote?.[0]
                        ? moment(this.tempDateConnote[0]).format('YYYY-MM-DD')
                        : '',
                    end_date: this.tempDateConnote?.[1]
                        ? moment(this.tempDateConnote[1]).format('YYYY-MM-DD')
                        : '',
                    search_by: this.searchByConnote || '',
                    filter_date_by: this.filterDateByConnote || '',
                }),

                'k-KOLI': () => ({
                    is_on_bag: this.selectedStatusBag || '',
                    start_date: this.tempDate?.[0]
                        ? moment(this.tempDate[0]).format('YYYY-MM-DD')
                        : '',
                    end_date: this.tempDate?.[1]
                        ? moment(this.tempDate[1]).format('YYYY-MM-DD')
                        : '',
                    search_by: this.searchBy || '',
                    filter_date_by: this.filterDateBy || '',
                    has_status_delivery: '0',
                }),

                'k-ARCHIVE': () => ({
                    is_on_bag: this.selectedStatusBag || '',
                    start_date: this.tempDateArchive?.[0]
                        ? moment(this.tempDateArchive[0]).format('YYYY-MM-DD')
                        : '',
                    end_date: this.tempDateArchive?.[1]
                        ? moment(this.tempDateArchive[1]).format('YYYY-MM-DD')
                        : '',
                    search_by: this.searchByArchive || '',
                    filter_date_by: this.filterDateByArchive || '',
                    has_status_delivery: '1',
                    status_delivery: 'ALL',
                }),
            }
            Object.assign(params, NAV_FILTERS[this.navActive]?.() || {})

            try {
                const res = await axios.get(`${this.URL.summary_inventory_item}`, {
                    params,
                    ...this.Helper.header(),
                })

                let data = res.data.data

                this.summaryCardData = {
                    summary_connote: data?.summary_connote || '0',
                    summary_unrunsheet: data?.summary_unrunsheet || '0',
                    summary_need_redelivery: data?.summary_need_redelivery || '0',
                }
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
    },
}
</script>
