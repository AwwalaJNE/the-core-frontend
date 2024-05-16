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

                        <vs-row justify="end">
                            <vs-col xs="12" sm="6" lg="4">
                                <search-input ref="searchInput" @searchValue="searchValue" :placeholder="`Search Bag`" class="search-input"/>
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
                        </vs-row>
                        <transition name="slide-fade">
                            <bag-list :bagDestination="bagDestination" :bagRouting="bagRouting" :bagTipe="bagTipe" :query="tempSearch"/>
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