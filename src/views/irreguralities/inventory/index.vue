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
                                <template v-if="navActive === 'k-ACTIVE'">
                                    <vs-row>
                                        <vs-col vs-align="center" w="6">
                                            <select-search-by-connote :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"  :selectedValue="searchBy"/>
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" class="search-input"/>
                                        </vs-col>
                                    </vs-row>
                                </template>
                                <template v-if="navActive === 'k-HISTORY'" >
                                    <vs-row>
                                        <vs-col vs-align="center" w="6">
                                            <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchByBag"  :selectedValue="searchByBag" :valueData="searchParamsBag"/>
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholderBag" class="search-input"/>
                                        </vs-col>
                                    </vs-row>
                                </template>
                            </vs-col>
                        </vs-row>


                        <template v-if="navActive === 'k-ACTIVE'">
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
                                <connote-list :ref="navActive" :dateFilter="tempDate" :query="tempSearch" :queryInventory="statusinventory" :queryBag="status_bag" :querySearch="searchBy" :queryDate="filterDateBy" />
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-HISTORY'">
                            <vs-row >
                                <vs-col vs-align="center" xs="6" sm="4" lg="2">
                                    <select-bag-routing
                                        ref="bag_routing"
                                        :isMultiple="false"
                                        :border="true"
                                        @updateBagRouting="updateBagRouting" 
                                    />
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="4" lg="2">
                                <select-bag-tipe
                                    ref="bag_tipe"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateBagTipe="updateBagTipe" />
                                </vs-col>
                                <vs-col vs-align="center" xs="6" sm="3" lg="2">
                                    <select-search-by :isMultiple="false" :border="true" @updateFilterDateBy="updateFilterDateBy" :valueData="dateParams" :selectedValue="filterDateBy"/>
                                </vs-col>
                                <vs-col xs="6" sm="5" lg="3">
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
                                <bag-list :ref="navActive" :bagDestination="bagDestination" :bagRouting="bagRouting" :bagTipe="bagTipe" :query="tempSearch" :dateFilter="tempDate" :searchDateBy="filterDateBy" :searchBy="searchByBag"/>
                            </transition>
                        </template>
                        
                    </div>
                </vs-col>
                
            </vs-row>
        </section>

    </div>
</template>
<script>
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
import SelectBagRouting from "@/views/inventory/connote/bag/selectBagRouting"
import SelectBagTipe from "@/views/inventory/connote/bag/selectBagTipe"
import DateTime from "@/components/input/dateTime"

// Active List
import ActiveList from "@/views/irreguralities/inventory/activeList/index"

// History List
import HistoryList from "@/views/irreguralities/inventory/historyList/index"

export default {
    name:"Users",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "connote-list":ActiveList ,
        "bag-list": HistoryList,
        "selector": Selector,
        "select-status-bag": SelectBagStatusVue,
        "select-status-inventory": SelectInventoryVue,
        "select-search-by-connote": SelectSearchByConnote,
        "select-search-by": SelectSearchBy,
        "select-filter-date-by": SelectFilterDateBy,
        "select-bag-routing": SelectBagRouting,
        "select-bag-tipe": SelectBagTipe,
        "date-time": DateTime,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "ACTIVE",
                    key: "k-ACTIVE",
                    title: "Irregularity Active List"
                },
                {
                    label: "HISTORY",
                    key: "k-HISTORY",
                    title: "Irregularity HistoryList"
                }
            ],
            navActive: "k-ACTIVE",
            title: "Irregularity Active List",
            tempSearch: "",
            tempDate: [],
            refreshInject:"",
            status_bag:"",
            statusinventory:"",
            bagDestination:"",
            searchBy:"",
            searchByBag:"koli_number",
            searchPlaceholder: "Search Koli",
            searchPlaceholderBag: "Search Koli",
            searchParamsBag: [
                {
                    label: "Koli Number",
                    value: "koli_number",

                },
                {
                    label: "Bag Number",
                    value: "bag_number",

                },
                {
                    label: "Status Code",
                    value: "status_code",

                },
                {
                    label: "Type",
                    value: "type",
                },
            ],
            filterDateBy: "create",
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                },
                {
                    label: 'Approved Date',
                    value: 'approve'
                }
            ],
            bagRouting:"",
            bagTipe:"",
        }
    },
    methods: {
        updateStatusBag(key,val) {
          this.status_bag = val;
        },
        updateStatusinventory(key,val) {
          this.statusinventory = val;
        },
        updateSearchBy(key,val) {
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateSearchByBag(key,val) {
            this.searchByBag = val;
            this.searchPlaceholderBag = key;
        },
        updateFilterDateBy(key,val) {
          this.filterDateBy = val;
        },
        updateBagRouting(key,val){
            this.bagRouting = val
        },
        updateBagTipe(key,val){
            this.bagTipe = val
        },
        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh()
        },
        searchValue (val) {
            this.tempSearch = val
        },
        searchDate(key, val) {
            this.tempDate = val;
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        activeTab(val) {
            this.navActive = val
            this.clearSearch()
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
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