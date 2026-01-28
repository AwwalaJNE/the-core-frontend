<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }}</h2>
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
                            
                                <connote-list
                                    :ref="navActive"
                                    :dateFilter="tempDateConnote"
                                    :query="tempSearch"
                                    :queryInventory="selectedStatusInventoryConnote"
                                    :queryBag="selectedStatusBagConnote"
                                    :querySearch="searchByConnote"
                                    :queryDate="filterDateByConnote"
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

import Breadcrumb from '@/components/breadcrumb/index'
import TableMaster from '@/components/table/tableMaster.vue'
import NavItem from '@/components/navbar/navTab'

import SearchInput from '@/components/search/searchInput'
import Selector from '@/components/input/select'
import SelectSearchBy from '@/components/search/selectSearchBy'
import DateTime from '@/components/input/dateTime'

// Connote
import ConnoteList from '@/views/inventory/connote/connote/cnoteList'

export default {
    name: 'helpdesk-connote',
    mixins: [master],
    components: {
        'table-master': TableMaster,
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'search-input': SearchInput,
        'connote-list': ConnoteList,
        selector: Selector,
        'select-search-by': SelectSearchBy,
        'date-time': DateTime,
    },
    data() {
        return {
            navItemm: [
                {
                    label: 'CONNOTE',
                    key: 'k-CONNOTE',
                    title: 'Connote List',
                },
            ],
            navActive: 'k-CONNOTE',
            title: 'Connote List',
            loading: false,
            tempSearch: '',
            pagination: {
                limit: 10,
                page_size: 1,
                page: 1,
            },
            refreshInject: '',

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
        }
    },
    methods: {
        updateStatusBagConnote(key, val) {
            this.selectedStatusBagConnote = val
        },
        updateStatusInventoryConnote(key, val) {
            this.selectedStatusInventoryConnote = val
        },
        updateSearchByConnote(key, val, dataType) {
            this.searchByConnote = val
            this.searchPlaceholderConnote = key
            this.searchByDataTypeConnote = dataType
        },
        updateFilterDateByConnote(key, val) {
            this.filterDateByConnote = val

            if (this.tempDateConnote.length !== 0) {
                this.tempDateConnote = []
            }
        },
        refresh() {
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
        },
        searchValue(val) {
            this.tempSearch = val
        },
        searchDateConnote(key, val) {
            this.tempDateConnote = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
            this.tempSearch = ''
            this.tempDate = []
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
        handleSearch() {
            this.$nextTick(() => {
                this.refresh()
                this.$refs.searchInput.clear()
            })
        },
    },
}
</script>
