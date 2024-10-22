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
                                            <select-search-by-cnote :isMultiple="false" :border="true" @updateSearchBy="updateSearchByCnote"  :selectedValue="searchByCnote" />
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input ref="searchInput" @handleSearch="handleSearch" @searchValue="searchValue" :placeholder="searchPlaceholderCnote" class="search-input" :isNumeric="searchByDataTypeCnote"/>
                                        </vs-col>
                                    </vs-row>
                                </template>
                                <template v-if="navActive === 'k-KOLI'">
                                    <vs-row>
                                        <vs-col vs-align="center" w="6">
                                            <select-search-by-connote :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"  :selectedValue="searchBy"/>
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input ref="searchInput" @handleSearch="handleSearch" @searchValue="searchValue" :placeholder="searchPlaceholder" class="search-input" :isNumeric="searchByDataType"/>
                                        </vs-col>
                                    </vs-row>
                                </template>
                                <template v-if="navActive === 'k-BAG'" >
                                    <vs-row>
                                        <vs-col vs-align="center" w="6">
                                            <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchByBag"  :selectedValue="searchByBag" :valueData="searchParamsBag"/>
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input ref="searchInput" @handleSearch="handleSearch" @searchValue="searchValue" :placeholder="searchPlaceholderBag" class="search-input"/>
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
                        <template v-if="navActive === 'k-KOLI'">
                          <vs-row >
                            <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                <select-status-bag ref="is_in_bag" :isMultiple="false" :border="true" @updateStatusBag="updateStatusBag" />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                <select-status-inventory :isMultiple="false" :border="true" @updateStatusinventory="updateStatusinventory" />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="3" lg="2">
                                <select-filter-date-by :isMultiple="false" :border="true" @updateFilterDateBy="updateFilterDateBy" />
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
                                <koli-list :ref="navActive" :dateFilter="tempDate" :query="tempSearch" :queryInventory="statusinventory" :queryBag="status_bag" :querySearch="searchBy" :queryDate="filterDateBy" />
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-BAG'">
                            <vs-row >
                               <vs-col vs-align="center" xs="12" sm="4" lg="2">
                                <select-bag-destination
                                    ref="bag_destination"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateBagDestination="updateBagDestination" />
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="4" lg="2">
                                <select-bag-routing
                                    ref="bag_routing"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateBagRouting="updateBagRouting" />
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="4" lg="2">
                                <select-bag-tipe
                                    ref="bag_tipe"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateBagTipe="updateBagTipe" />
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="4" lg="2">
                                <select-bag-status
                                    ref="bag_status"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateBagStatus="updateBagStatus" />
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="3" lg="2">
                                    <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy" :valueData="dateParams" :selectedValue="filterDateBy"/>
                                </vs-col>
                                <vs-col xs="12" sm="5" lg="2">
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
                                <bag-list :ref="navActive" :bagDestination="bagDestination" :bagRouting="bagRouting" :bagTipe="bagTipe" :bagStatus="bagStatus" :query="tempSearch" :dateFilter="tempDate" :searchDateBy="filterDateBy" :searchBy="searchByBag"/>
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
import TableMaster from "@/components/table/tableMaster.vue"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import Selector from "@/components/input/select"
import SelectBagStatusVue from "@/views/inventory/connote/item/selectBagStatus"
import SelectInventoryVue from "@/views/inventory/connote/item/selectInventoryStatus"
import SelectSearchByConnote from "@/views/inventory/connote/item/selectSearchBy"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SelectFilterDateBy from "@/views/inventory/connote/item/selectFilterDateBy"
import SelectBagDestinationVue from "@/views/inventory/connote/bag/selectBagDestination"
import SelectBagRouting from "@/views/inventory/connote/bag/selectBagRouting"
import SelectBagTipe from "@/views/inventory/connote/bag/selectBagTipe"
import SelectBagStatus from "@/views/inventory/connote/bag/selectBagOpened"
import DateTime from "@/components/input/dateTime"
import SelectBagStatusConnote from "@/views/inventory/connote/connote/selectBagStatus"
import SelectInventoryConnote from "@/views/inventory/connote/connote/selectInventoryStatus"
import SelectSearchByCnote from "@/views/inventory/connote/connote/selectSearchBy"
import SelectFilterDateByConnote from "@/views/inventory/connote/connote/selectFilterDateBy"


// Connote
import ConnoteList from "@/views/inventory/connote/connote/cnoteList"
// Koli
import KoliList from "@/views/inventory/connote/item/connoteList"
// Bag
import BagList from "@/views/inventory/connote/bag/bagList"

export default {
    name:"Inventory Item",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "connote-list": ConnoteList,
        "koli-list": KoliList,
        "bag-list": BagList,
        "selector": Selector,
        "select-status-bag": SelectBagStatusVue,
        "select-status-inventory": SelectInventoryVue,
        "select-search-by-connote": SelectSearchByConnote,
        "select-search-by": SelectSearchBy,
        "select-filter-date-by": SelectFilterDateBy,
        "select-bag-destination": SelectBagDestinationVue,
        "select-bag-routing": SelectBagRouting,
        "select-bag-tipe": SelectBagTipe,
        "select-bag-status": SelectBagStatus,
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
                    label: "KOLI",
                    key: "k-KOLI",
                    title: "Koli List"
                },
                {
                    label: "CONNOTE",
                    key: "k-CONNOTE",
                    title: "Connote List"
                },
                {
                    label: "BAG",
                    key: "k-BAG",
                    title: "Bag List"
                }
            ],
            navActive: "k-KOLI",
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
            refreshInject:"k-KOLI",
            status_bag:"",
            statusinventory:"",
            status_bag_cnote:"",
            statusinventorycnote:"",
            bagDestination:"",
            searchBy:"connote",
            searchByBag:"bag_number",
            searchByCnote:"connote",
            searchPlaceholder: "Search Koli",
            searchPlaceholderBag: "Search Bag",
            searchPlaceholderCnote: "Search Connote",
            searchParamsBag: [
                {
                    label: "Bag Number",
                    value: "bag_number",

                },
                {
                    label: "Bag Detail Qty",
                    value: "bag_detail_qty",

                },
                {
                    label: "Weight",
                    value: "bag_weight",

                },
                {
                    label: "Origin",
                    value: "origin_tariff_code",

                },
                {
                    label: "Destination",
                    value: "destination_tariff_code",

                },
                {
                    label: "Courier",
                    value: "courier",

                },
                {
                    label: "Surat Muatan",
                    value: "sm",

                },
                {
                    label: "Surat Jalan",
                   value: "sj",

                }
            ],
            filterDateBy: "create",
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                },
                {
                    label: 'Opened Date',
                    value: 'opened'
                }
            ],
            bagRouting:"",
            bagTipe:"",
            bagStatus: "0",
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

          if (this.tempDate.length !== 0) {
                this.tempDate = [];
            }
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
        updateBagStatus(key,val){
            this.bagStatus = val
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
            this.refreshInject = this.navActive
        },
        actionLimit(val){
            this.pagination.limit = val
        },
        actionPagination(val) {
            this.pagination.page = val
        },
        handleSearch() {
            this.$nextTick(() => {
                this.refresh();
            });
        }
    },
}
</script>
<style lang="scss">
    .users{
        min-height: 50vh;
        .view{
            min-height: 400px;
        }
        .nav-box{
            position: relative;
            top: 0;
            left: 0;
            width: auto;
            max-width: 350px;
        }
        .search-input{
            @include for-phone-only{
                margin-bottom: 1rem;
            }
        }
    }
</style>