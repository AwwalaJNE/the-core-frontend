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

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify>
                        <vs-col xs="6" sm="2" lg="2" class="mb-15">
                            <vs-input v-model="tempDate" type="date" />
                        </vs-col>
                        <vs-col offset="4" xs="12" sm="12" lg="6">
                            <vs-row justify="end">
                                <vs-col xs="6" sm="8" lg="4">
                                    <select-search-by
                                        :isMultiple="false"
                                        :border="true"
                                        :selectedValue="searchBy"
                                        :valueData="searchParams"
                                        @updateSearchBy="updateSearchBy"
                                    />
                                </vs-col>
                                <vs-col xs="6" sm="4" lg="4">
                                    <search-input
                                        ref="searchInput"
                                        :placeholder="searchPlaceholder"
                                        @searchValue="searchValue"
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                    </vs-row>
                </div>
                <template>
                    
                        <DeliveryRunsheetTable
                            :ref="'DeliveryRunsheetTable'"
                            :node="node_request"
                            :dateFilter="tempDate"
                            :query="tempSearch"
                            :searchBy="searchBy"
                            :filterDateBy="filterDateBy"
                        />
                    
                </template>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import master from '@/mixins/master'

import Breadcrumb from '@/components/breadcrumb/index'
import dateRange from '@/components/daterange/index'
import NavItem from '@/components/navbar/navTab'
import SearchInput from '@/components/search/searchInput'
import SelectSearchBy from '@/components/search/selectSearchBy'

import DeliveryRunsheetTable from '@/views/helpdesk/runsheet/runsheetTable'

export default {
    name: 'Inbound-List',
    mixins: [master],
    components: {
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'search-input': SearchInput,
        'daterange-filter': dateRange,
        'select-search-by': SelectSearchBy,
        DeliveryRunsheetTable: DeliveryRunsheetTable,
    },
    data() {
        return {
            title: 'Runsheet',
            tempSearch: '',
            tempDate: moment().format('YYYY-MM-DD'),
            node_request: '',
            searchBy: 'delivery_runsheet_number',
            filterDateBy: 'create',
            searchPlaceholder: 'Search Runsheet Number',
            searchParams: [
                {
                    label: 'Runsheet Number',
                    value: 'delivery_runsheet_number',
                },
                {
                    label: 'DRI Number',
                    value: 'dri_number',
                },
                {
                    label: 'HRS Number',
                    value: 'hrs_number',
                },
                {
                    label: 'Courier Code',
                    value: 'courier_code',
                },
                {
                    label: 'Courier Name',
                    value: 'courier_name',
                },
            ],
            dateParams: [
                {
                    label: 'Create Date Delivery',
                    value: 'create',
                },
            ],
        }
    },
    methods: {
        refresh() {
            this.$refs.DeliveryRunsheetTable.refresh()
        },
        searchValue(val) {
            this.tempSearch = val
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(' ', '_')
            this.searchBy = val
            this.searchPlaceholder = key
        },
    },
}
</script>
