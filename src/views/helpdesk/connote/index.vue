<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
        </vs-row>

        
        <section class="users">
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" :w="`${navActive === 'k-PERMISSIONS'?'4':'12'}`">
                    <div class="box view">

                        <vs-row justify="space-between">
                            <vs-col xs="12" sm="6" lg="8">
                                <nav-item :navItem="navItemm" @activeTab="activeTab" />
                            </vs-col>
                            <vs-col xs="12" sm="6" lg="4">
                                <template v-if="navActive === 'k-CONNOTE'">
                                    <vs-row>
                                        <vs-col vs-align="center" w="6">
                                            <select-search-by-cnote :isMultiple="false" :border="true" @updateSearchBy="updateSearchByCnote"  :selectedValue="searchByCnote"/>
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholderCnote" class="search-input" :isNumeric="searchByDataTypeCnote"/>
                                        </vs-col>
                                    </vs-row>
                                </template>
                            </vs-col>
                        </vs-row>


                        <template v-if="navActive === 'k-CONNOTE'">
                          <vs-row >
                            <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                <select-status-bag-cnote ref="is_in_bag" :isMultiple="false" :border="true" @updateStatusBag="updateStatusBagCnote" />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                <select-status-inventory-cnote :isMultiple="false" :border="true" @updateStatusinventory="updateStatusinventoryCnote" />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="3" lg="2">
                                <select-filter-date-by-cnote :isMultiple="false" :border="true" @updateFilterDateBy="updateFilterDateBy" />
                            </vs-col>
                            <vs-col xs="6" sm="5" lg="6">
                                <date-time
                                    :name="''"
                                    :rules="''"
                                    :formKey="'TRIGGER_DATE'"
                                    :valueData="tempDate"
                                    typeInput="daterange"
                                    @updateValue="searchDate" 
                                />
                            </vs-col>
                          </vs-row>
                            <transition name="slide-fade">
                                <connote-list :ref="navActive" :dateFilter="tempDate" :query="tempSearch" :queryInventory="statusinventorycnote" :queryBag="status_bag_cnote" :querySearch="searchByCnote" :queryDate="filterDateBy" />
                            </transition>
                        </template>                        
                    </div>
                </vs-col>
                
            </vs-row>
        </section>

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"

import Breadcrumb from "@/components/breadcrumb/index"
import TableMaster from "@/components/table/tableMaster.vue"
import NavItem from "@/components/navbar/navTab"

import SearchInput from "@/components/search/searchInput"
import Selector from "@/components/input/select"
import SelectSearchBy from "@/components/search/selectSearchBy"
import DateTime from "@/components/input/dateTime"
import SelectBagStatusConnote from "@/views/inventory/connote/connote/selectBagStatus"
import SelectInventoryConnote from "@/views/inventory/connote/connote/selectInventoryStatus"
import SelectSearchByCnote from "@/views/inventory/connote/connote/selectSearchBy"
import SelectFilterDateByConnote from "@/views/inventory/connote/connote/selectFilterDateBy"


// Connote
import ConnoteList from "@/views/inventory/connote/connote/cnoteList"

export default {
    name:"Helpdesk Connote Table",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "connote-list": ConnoteList,
        "selector": Selector,
        "select-search-by": SelectSearchBy,
        "date-time": DateTime,
        "select-status-bag-cnote": SelectBagStatusConnote,
        "select-status-inventory-cnote": SelectInventoryConnote,
        "select-search-by-cnote": SelectSearchByCnote,
        "select-filter-date-by-cnote": SelectFilterDateByConnote,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "CONNOTE",
                    key: "k-CONNOTE",
                    title: "Connote List"
                }
            ],
            navActive: "k-CONNOTE",
            title: "Connote List",
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            },
            refreshInject:"",
            status_bag:"",
            statusinventory:"",
            status_bag_cnote:"",
            statusinventorycnote:"",
            bagDestination:"",
            searchBy:"",
            searchByBag:"bag_number",
            searchByCnote:"",
            searchPlaceholderCnote: "Search Connote",
            filterDateBy: "create",
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                }
            ],
            bagRouting:"",
            bagTipe:"",
            searchByDataType: false,
            searchByDataTypeCnote: false,
        }
    },
    methods: {
        updateStatusBag(key,val) {
          this.status_bag = val;
        },
        updateStatusBagCnote(key,val) {
          this.status_bag_cnote = val;
        },
        updateStatusinventory(key,val) {
          this.statusinventory = val;
        },
        updateStatusinventoryCnote(key,val) {
          this.statusinventorycnote = val;
        },
        updateSearchBy(key,val, dataType) {
            this.searchBy = val;
            this.searchPlaceholder = key;
            this.searchByDataType = dataType;
        },
        updateSearchByBag(key,val) {
            this.searchByBag = val;
            this.searchPlaceholderBag = key;
        },
        updateSearchByCnote(key,val, dataType) {
            this.searchByCnote = val;
            this.searchPlaceholderCnote = key;
            this.searchByDataTypeCnote = dataType
        },
        updateFilterDateBy(key,val) {
          this.filterDateBy = val;
        },
        updateBagDestination(key,val) {
          this.bagDestination = val
        },
        updateBagRouting(key,val){
            this.bagRouting = val
        },
        updateBagTipe(key,val){
            this.bagTipe = val
        },
        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
        },
        searchValue (val) {
            this.tempSearch = val
        },
        searchDate(key, val) {
            this.tempDate = val;
        },
        clearSearch() {
            this.$refs.searchInput.clear()
            if (this.navActive === 'k-BAG') {
                this.filterDateBy = 'create'
            }
            this.tempDate = []
        },
        activeTab(val) {
            this.navActive = val
            this.clearSearch()
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
        actionLimit(val){
            this.pagination.limit = val
        },
        actionPagination(val) {
            this.pagination.page = val
        },
    },
}
</script>