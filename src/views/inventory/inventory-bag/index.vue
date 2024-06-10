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
                <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                    <div class="box view">
                        <vs-row justify="flex-end" class="mb-15">
                            <vs-col xs="12" sm="12" lg="6">
                                <vs-row justify="flex-end">
                                    <vs-col xs="6" sm="8" lg="4">
                                        <select-search-by :isMultiple="false" :border="true"
                                            @updateSearchBy="updateSearchBy" :valueData="searchParams"
                                            :selectedValue="searchBy" />
                                    </vs-col>
                                    <vs-col xs="6" sm="4" lg="4">
                                        <search-input ref="searchInput" @searchValue="searchValue"
                                            :placeholder="searchPlaceholder" />
                                    </vs-col>
                                </vs-row>
                            </vs-col>
                        </vs-row>
                        <vs-row >
                            <vs-col vs-align="center" xs="6" sm="4" lg="3">
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
                            <vs-col vs-align="center" xs="6" sm="3" lg="2">
                                <select-search-by :isMultiple="false" :border="true"
                                    @updateSearchBy="updateFilterDateBy" :valueData="dateParams"
                                    :selectedValue="filterDateBy" />
                            </vs-col>
                            <vs-col xs="6" sm="5" lg="3">
                                <date-time :name="''" :rules="''" :formKey="'TRIGGER_DATE'" :valueData="tempDate"
                                typeInput="daterange" @updateValue="searchDate" />
                            </vs-col>
                        </vs-row>
                        <transition name="slide-fade">
                            <bag-list :bagDestination="bagDestination" :bagRouting="bagRouting" :bagTipe="bagTipe" :query="tempSearch" :dateFilter="tempDate" :searchBy="searchBy" :filterDateBy="filterDateBy"/>
                        </transition>
                        
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
import SelectBagDestinationVue from "@/views/inventory/connote/bag/selectBagDestination"
import SelectBagRouting from "@/views/inventory/connote/bag/selectBagRouting"
import SelectBagTipe from "@/views/inventory/connote/bag/selectBagTipe"
import DateTime from "@/components/input/dateTime"
import dateRange from "@/components/daterange/index";
import SelectSearchBy from "@/components/search/selectSearchBy";

// Bag
import BagList from "@/views/inventory/connote/bag/bagList"

export default {
    name:"Users",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "bag-list": BagList,
        "selector": Selector,
        "select-status-bag": SelectBagStatusVue,
        "select-bag-destination": SelectBagDestinationVue,
        "select-bag-routing": SelectBagRouting,
        "select-bag-tipe": SelectBagTipe,
        "date-time": DateTime,
        "daterange-filter": dateRange,
        "select-search-by" : SelectSearchBy,
    },
    data() {
        return {
            dialogUser: false,
            dialogRole: false,
            title: "Bag List",
            dataRole: [],
            loadingDataRole: false,
            permission: [],
            loadingPermission: false,
            permissionDisplay: [],
            keysPermission: {},
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            dialogRole: false,
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            },
            refreshInject:"",
            status_bag:"",
            bagDestination:"",
            bagRouting:"",
            bagTipe:"",
            destination_tlc: [{
              label: 'All Destination',
              value: ''
            }],
            searchBy:"bag number",
            filterDateBy: "create",
            searchPlaceholder: "Search Bag Number",
            searchParams: [
                {
                    label: "Bag Number",
                    value: "bag number",

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
                    label: "Runsheet",
                    value: "runsheet_count",

                },
                {
                    label: "Un Runsheet",
                    value: "un_runsheet_count",

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
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                }
            ]

        }
    },
    methods: {
        updateStatusBag(key,val) {
          this.status_bag = val;
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
            console.log("this.tempSearch = ",this.tempSearch)
        },
        searchDate(key, val) {
            this.tempDate = val;
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        actionLimit(val){
            this.pagination.limit = val
        },
        actionPagination(val) {
            this.pagination.page = val
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
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
        .dataRole{
            position: relative;
            width: 100%;
            padding: 15px;
            ul{
                position: relative;
                margin: 0;
                padding: 0;
                width: 100%;
                li{
                    text-align: left;
                    cursor: pointer;
                    padding: 1em;
                    border-bottom: 1px solid #eee;
                    background-color: white;
                    transition: all .2s ease;
                    &:hover{
                        background-color: #f1f1f1;
                        transition: all .3s ease-in;
                    }
                }
            }
        }
        .search-input{
            @include for-phone-only{
                margin-bottom: 1rem;
            }
        }
    }
</style>