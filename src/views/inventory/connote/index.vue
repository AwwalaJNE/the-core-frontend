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
                            <vs-col xs="6" sm="9" lg="9">
                                <nav-item :navItem="navItemm" @activeTab="activeTab" />
                            </vs-col>
                            <vs-col xs="6" sm="3" lg="3">
                                <search-input ref="searchInput" @searchValue="searchValue"/>
                            </vs-col>
                        </vs-row>


                        <template v-if="navActive === 'k-CONNOTE'">
                          <vs-row >
                            <vs-col vs-align="center" xs="3" sm="3" lg="2">
                              <template v-if="is_on_bag.length > 0">
                                <selector
                                    ref="node_selector"
                                    :valueData="is_on_bag"
                                    :selectedValue="is_on_bag[0].value"
                                    :isMultiple="false"
                                    :border="true"
                                    @updateValue="updateValue" />
                              </template>
                            </vs-col>
                            <vs-col vs-align="center" xs="3" sm="3" lg="2">
                              <template v-if="status_inventory.length > 0">
                                <selector
                                    ref="status_inventory"
                                    :valueData="status_inventory"
                                    :selectedValue="status_inventory[0].value"
                                    :isMultiple="false"
                                    :border="true"
                                    @updatestatusInventory="updateValue" />
                              </template>
                            </vs-col>
                          </vs-row>
                            <transition name="slide-fade">
                                <user-list :ref="navActive" :query="tempSearch"/>
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-BAG'">
                          <vs-row >
                            <vs-col vs-align="center" xs="3" sm="3" lg="2">
                              <template v-if="destination_tlc.length > 0">
                                <selector
                                    ref="destination_tlc"
                                    :valueData="destination_tlc"
                                    :selectedValue="destination_tlc[0].value"
                                    :isMultiple="false"
                                    :border="true"
                                    @updatesdestination="updateValue" />
                              </template>
                            </vs-col>
                          </vs-row>
                            <transition name="slide-fade">
                                <role-list :ref="navActive" :query="tempSearch"/>
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

// users
import UserList from "@/views/inventory/connote/item/connoteList"
// role
import RoleList from "@/views/inventory/connote/bag/bagList"

export default {
    name:"Users",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "user-list": UserList,
        "role-list": RoleList,
        "selector": Selector,
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

            is_on_bag: [{
              label: 'All Bag',
              value: ''
            }, {
              label: 'Is In Bag',
              value: 1
            }, {
              label: 'Not In Bag',
              value: 0
            }],

            // select value status inventory
            status_inventory: [{
                label: 'All Status',
                value: ''
              }, {
                label: 'Confirmed',
                value: 'CONFIRMED'
              }, {
                label: 'Unconfirmed',
                value: 'UNCONFIRMED'
              }],

            destination_tlc: [{
              label: 'All Destination',
              value: ''
            },{
              label: 'Allnation',
              value: 1
            }],

        }
    },
    methods: {

      updateValue(key,val) {

      },
      updatestatusInventory(key,val) {

      },
      updatesdestination(key,val) {

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
                    console.log('meong')
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

        async getDataRole(){
            this.loadingDataRole = true
            await axios
                .get(this.URL.role + 
                `?n=1&sort_order=desc&limit=1000&page=1`, 
                this.Helper.header())
                .then(res => {
                    console.log(res)
                    if(res.data.data.length > 0) {
                        this.dataRole = res.data.data
                    } else {
                        this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                    this.loadingDataRole = false
                }).catch(err => {
                    this.loadingDataRole = false
                    this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataPermission(){
            this.loadingPermission = true
            await axios
                .get(this.URL.permission + 
                `?n=1&sort_order=desc&&limit=1000&page=1`, 
                this.Helper.header())
                .then(res => {
                    console.log('getDataPermission',res.data.data)
                    if(res.data.data.length > 0) {
                        let data = res.data.data
                        data.map(item => {
                            item["selected"] = false
                        })
                        this.permission = data
                        this.permissionDisplay = data
                        console.log('meong 1 ', this.permission)
                    } else {
                        this.openNotification('warn', 'Permission data is empty!', ' Failed to populate permission data')
                    }
                    
                    this.loadingPermission = false
                }).catch(err => {
                    this.loadingPermission = false
                    this.openNotification('danger', 'Failed to populate permission data', err)
                })
        },

        async getRolePermission(val){
            console.log("user_role_id = ", val)
            await this.getDataPermission()
            this.permissionDisplay = []
            this.keysPermission = {}
            console.log('this.keysPermission meong', this.keysPermission)
            await axios
                .get(this.URL.role + `/${val}/permission`, 
                this.Helper.header())
                .then(res => {
                    console.log('getRolePermission',res.data.data)
                    let temp = {}
                    let data = res.data.data.permission
                    if(data.length > 0) {
                        // meanwhile we create keys object of role permission to reduce time complexity 
                        // when comparing between permission and role permission data itself
                        data.map(item => {
                            temp[item.pivot.user_permission_id] = item.user_permission_name
                        })
                        this.keysPermission = temp
                    } else {
                        this.keysPermission = {}
                    }
                    this.filterNow()
                })
                .catch(err => {
                    // this.loadingDataRole = false
                    this.openNotification('danger', 'Failed to populate role permission data', err)
                })
                
                console.log('filtered permission ', this.permission)
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
    }
</style>