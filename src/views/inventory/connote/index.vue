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
                            <vs-col xs="12" sm="9" lg="9">
                                <nav-item :navItem="navItemm" @activeTab="activeTab" />
                            </vs-col>
                            <vs-col xs="12" sm="3" lg="3">
                                <search-input ref="searchInput" @searchValue="searchValue" class="search-input"/>
                            </vs-col>
                        </vs-row>


                        <template v-if="navActive === 'k-CONNOTE'">
                          <vs-row >
                            <vs-col vs-align="center" xs="6" sm="4" lg="2">
                                <select-status-bag ref="is_in_bag" :isMultiple="false" :border="true" @updateStatusBag="updateStatusBag" />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="4" lg="2">
                                <select-status-inventory :isMultiple="false" :border="true" @updateStatusinventory="updateStatusinventory" />
                            </vs-col>
                          </vs-row>
                            <transition name="slide-fade">
                                <connote-list :ref="navActive"  :query="tempSearch" :queryInventory="statusinventory" :queryBag="status_bag" />
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-BAG'">
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
                          </vs-row>
                            <transition name="slide-fade">
                                <bag-list :ref="navActive" :bagDestination="bagDestination" :bagRouting="bagRouting" :query="tempSearch"/>
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
import SelectBagDestinationVue from "@/views/inventory/connote/bag/selectBagDestination"
import SelectBagRouting from "@/views/inventory/connote/bag/selectBagRouting"

// Connote
import ConnoteList from "@/views/inventory/connote/item/connoteList"
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
        "connote-list": ConnoteList,
        "bag-list": BagList,
        "selector": Selector,
        "select-status-bag": SelectBagStatusVue,
        "select-status-inventory": SelectInventoryVue,
        "select-bag-destination": SelectBagDestinationVue,
        "select-bag-routing": SelectBagRouting
    },
    data() {
        return {
            navItemm: [
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
            navActive: "k-CONNOTE",
            dialogUser: false,
            dialogRole: false,
            title: "Connote List",
            dataRole: [],
            loadingDataRole: false,
            permission: [],
            loadingPermission: false,
            permissionDisplay: [],
            keysPermission: {},
            datacolumn: [
                {
                    label: "Menu",
                    key: "user_permission_name",
                    type: "text",
                    width: "sm"
                },
                {
                    label: "Select",
                    key: "selected",
                    type: "boolean",
                    width: "xs"
                },
                {
                    label: "Access Data",
                    key: "permission_access_data",
                    type: "selector",
                    width: "auto"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogRole: false,
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            },
            refreshInject:"",
            status_bag:"",
            statusinventory:"",
            bagDestination:"",
            bagRouting:"",
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
        updateStatusinventory(key,val) {
          this.statusinventory = val;
        },
        updateBagDestination(key,val) {
          this.bagDestination = val
        },
        updateBagRouting(key,val){
            this.bagRouting = val
        },
        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
        },
        searchValue (val) {
            this.tempSearch = val
            console.log("this.tempSearch = ",this.tempSearch)
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
        openDialog(){
            switch(this.navActive) {
                case "k-CONNOTE":
                    this.dialogUser = true
                    break;
                case "k-BAG":
                    this.dialogRole = true
                    break;
                default:
                    // code block
            }
            this.refreshInject = this.navActive
        },
        closeDialogUser() {
            this.dialogUser = false
        },
        closeDialogRole() {
            this.dialogRole = false
        },
        actionLimit(val){
            this.pagination.limit = val
        },
        actionPagination(val) {
            this.pagination.page = val
        },



        filterNow(){
            if(this.permission.length > 0) {
                console.log('this.keysPermission before filter', this.keysPermission)
                this.permission.map(item => {
                    if(this.keysPermission.hasOwnProperty(item.user_permission_id)) {
                        item["selected"] = true
                    } 
                })
                this.permissionDisplay = this.permission
                console.log('this.keysPermission after filter', this.keysPermission)
            }
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