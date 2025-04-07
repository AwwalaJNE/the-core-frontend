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

        <vs-row justify="space-around">
            <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                <div class="box view">

                    <vs-row justify="space-between">
                        <vs-col xs="12" sm="6" lg="8">
                            <nav-item 
                                :navItem="navItem" 
                                @activeTab="activeTab" 
                            />
                        </vs-col>
                        <vs-col xs="12" sm="6" lg="4">
                            <template>
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
                                            :border="true" 
                                            :isMultiple="false" 
                                            :selectedValue="searchByBag" 
                                            :valueData="searchParamsBag"
                                            @updateSearchBy="updateSearchByBag"
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            ref="searchInput" 
                                            :placeholder="searchPlaceholderBag" 
                                            @handleSearch="handleSearch" 
                                            @searchValue="searchValue" 
                                            
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                        </vs-col>
                    </vs-row>

                    <template>
                        <vs-row align="center">
                            <vs-col vs-align="center" xs="12" sm="6" lg="3">
                                <select-bag-origin
                                    ref="bag_origin"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateBagOrigin="updateBagOrigin" 
                                />
                            </vs-col>
                            <vs-col vs-align="center" xs="12" sm="6" lg="3">
                                <select-bag-destination
                                    ref="bag_destination"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateBagDestination="updateBagDestination" 
                                />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="6" lg="3">
                                <select-bag-routing
                                    ref="bag_routing"
                                    :selectedValue="bagRouting"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateBagRouting="updateBagRouting" 
                                />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="4" lg="3" v-if="navActive === 'k-BAG'">
                                <select-bag-tipe
                                    ref="bag_tipe"
                                    :selectedValue="bagTipe"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateBagTipe="updateBagTipe" 
                                />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="4" lg="3">
                                <select-bag-status
                                    ref="bag_status"
                                    :selectedValue="bagStatus"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateBagStatus="updateBagStatus" 
                                />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="4" lg="3">
                                <select-bag-irreg
                                    ref="bag_irreg"
                                    :selectedValue="bagIrreg"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateBagIrreg="updateBagIrreg" 
                                />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="4" lg="3">
                                <select-bag-source
                                    ref="bag_source"
                                    :selectedValue="bagSource"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateBagSource="updateBagSource" 
                                />
                            </vs-col>
                            <vs-col vs-align="center" xs="12" sm="6" lg="3">
                                <select-search-by 
                                    :border="true" 
                                    :isMultiple="false" 
                                    :selectedValue="filterDateBy"
                                    :valueData="dateParams" 
                                    @updateSearchBy="updateFilterDateBy" 
                                />
                            </vs-col>
                            <vs-col xs="12" sm="6" lg="3">
                                <date-time
                                    :name="''"
                                    :rules="''"
                                    :formKey="'DATE_TIME_WITHOUT_SECONDS'"
                                    :valueData="tempDate"
                                    typeInput="datetimerange"
                                    @updateValue="searchDate" 
                                />
                            </vs-col>
                        
                        </vs-row>
                        <transition name="slide-fade" >
                            <bag-list 
                                :ref="navActive" 
                                :key="navActive" 
                                :bagDestination="bagDestination" 
                                :bagIrreg="bagIrreg" 
                                :bagOrigin="bagOrigin" 
                                :bagRouting="bagRouting" 
                                :bagSource="bagSource" 
                                :bagStatus="bagStatus" 
                                :bagTipe="bagTipe" 
                                :dateFilter="tempDate" 
                                :query="tempSearch" 
                                :searchDateBy="filterDateBy" 
                                :searchBy="searchByBag"
                                :isMasterbag="navActive === 'k-BAG' ? '0' : '1'"
                            />
                        </transition>
                    </template>
                    
                </div>
            </vs-col>
            
        </vs-row>
    </div>
</template>

<script>
import master from "@/mixins/master"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SelectBagDestinationVue from "@/views/inventory/connote/bag/selectBagDestination"
import SelectBagOrigin from "@/views/inventory/connote/bag/selectBagOrigin"
import SelectBagRouting from "@/views/inventory/connote/bag/selectBagRouting"
import SelectBagTipe from "@/views/inventory/connote/bag/selectBagTipe"
import SelectBagStatus from "@/views/inventory/connote/bag/selectBagOpened"
import SelectBagStatusIrreg from "@/views/inventory/connote/bag/selectBagIrreg"
import SelectBagSource from "@/views/inventory/connote/bag/selectBagSource"
import DateTime from "@/components/input/dateTime"

// Bag
import BagList from "@/views/inventory/connote/bag/bagList"

export default {
    name:"Inventory-Bag",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "bag-list": BagList,
        "select-search-by": SelectSearchBy,
        "select-bag-destination": SelectBagDestinationVue,
        "select-bag-origin": SelectBagOrigin,
        "select-bag-routing": SelectBagRouting,
        "select-bag-tipe": SelectBagTipe,
        "select-bag-status": SelectBagStatus,
        "select-bag-irreg": SelectBagStatusIrreg,
        "select-bag-source": SelectBagSource,
        "date-time": DateTime,
    },
    data() {
        return {
            navItem: [
                {
                    label: "BAG",
                    key: "k-BAG",
                    title: "Bag List"
                },
                {
                    label: "MASTERBAG",
                    key: "k-MASTERBAG",
                    title: "Master Bag List"
                }
            ],
            navActive: "k-BAG",
            title: "Bag List",
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            refreshInject:"k-BAG",    
            searchByBag:"bag_number",
            searchPlaceholderBag: "Search Bag",
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
                },
                {
                    label: 'Received Date',
                    value: 'received'
                }
            ],
            bagDestination:"",
            bagOrigin: "",
            bagRouting:"",
            bagTipe:"",
            bagStatus: "",
            bagIrreg: "",
            bagSource: "",
        }
    },
    methods: {
        updateSearchByBag(key,val) {
            this.searchByBag = val;
            this.searchPlaceholderBag = key;
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
        updateBagOrigin(key,val) {
          this.bagOrigin = val
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
        updateBagIrreg(key,val){
            this.bagIrreg = val
        },
        updateBagSource(key,val){
            this.bagSource = val
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
            this.tempSearch = ""
            this.$refs.searchInput.clear()
            if (this.navActive === 'k-BAG') {
                this.filterDateBy = 'create'
            }
            this.tempDate = []
        },
        clearFilter() {
            this.bagDestination = "";
            this.bagOrigin = "";
            this.bagRouting = "-";
            this.bagTipe = "";
            this.bagStatus = "-";
            this.bagIrreg = "-";
            this.bagSource = "-";
            this.tempDate = [];
            this.tempSearch = ""
        },
        activeTab(val) {
            this.clearSearch()
            this.clearFilter()
            this.navActive = val
            let item = this.navItem.filter(item => {
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
                this.$refs.searchInput.clear();
            });
        }
    },
}
</script>