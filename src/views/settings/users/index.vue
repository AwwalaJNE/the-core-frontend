<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    <div style="width: 100px;padding-right: 5px;">
                        <vs-button
                        flat
                        block
                        :active="true"
                        @click="openDialog"
                        > 
                            <i class="bx bx-plus"></i> New
                        </vs-button>
                    </div>
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

                        <template v-if="navActive === 'k-USER'">
                            <transition name="slide-fade">
                                <user-list :ref="navActive" :query="tempSearch"/>
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-ROLES'">
                            <transition name="slide-fade">
                                <role-list :ref="navActive" :query="tempSearch"/>
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-PERMISSIONS'">
                            <transition name="slide-fade">
                                <div class="dataRole">
                                    <ul>
                                       <template v-for="(item,key) in dataRole">
                                           <li :key="key" @click="getRolePermission(item.user_role_id)">{{item.user_role_name}}</li>
                                       </template> 
                                    </ul>
                                </div>
                            </transition>
                        </template>
                    </div>
                </vs-col>
                <template v-if="navActive === 'k-PERMISSIONS'">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="8">
                       <div class="box">
                           <table-master 
                                :dataTable="permissionDisplay" 
                                :dataColumn="datacolumn" 
                                :tableLoading="loadingPermission"
                                :pageSize="pagination.page_size"
                                :page="pagination.page"
                                :limit="pagination.limit"
                                :hasAction="false"
                                />
                       </div>
                    </vs-col>
                </template>
            </vs-row>
        </section>

        <!--Create Edit User Dialog-->
            <dialog-create-edit-user 
            :active="dialogUser" 
            @refresh="refresh"
            :closeDialogUser="closeDialogUser"
            title="New user"
            />
        <!--Create User Dialog end-->
            <dialog-create-edit-role 
            :active="dialogRole" 
            @refresh="refresh"
            :closeDialogRole="closeDialogRole"
            title="New role"
            />
            

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
// users
import UserList from "@/views/settings/users/user/userList"
import DialogCreateEditUser from "@/views/settings/users/user/dialogCreateEditUser"
// role
import RoleList from "@/views/settings/users/role/roleList"
import DialogCreateEditRole from "@/views/settings/users/role/dialogCreateEditRole"

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
        "dialog-create-edit-user": DialogCreateEditUser,
        "dialog-create-edit-role": DialogCreateEditRole
    },
    data() {
        return {
            navItemm: [
                {
                    label: "USER",
                    key: "k-USER",
                    title: "User List"
                },
                {
                    label: "ROLES",
                    key: "k-ROLES",
                    title: "Roles List"
                },
                {
                    label: "PERMISSIONS",
                    key: "k-PERMISSIONS",
                    title: "Permissions List"
                },
            ],
            navActive: "k-USER",
            dialogUser: false,
            dialogRole: false,
            title: "User List",
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
            refreshInject:""
        }
    },
    methods: {
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

            if(this.navActive === "k-PERMISSIONS") {
                console.log('ini permission page')
                this.getDataRole()
                this.getDataPermission()
            }
        },
        openDialog(){
            switch(this.navActive) {
                case "k-USER":
                    this.dialogUser = true
                    break;
                case "k-ROLES":
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
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, 
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
                `?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1`, 
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
                .get(this.URL.role + `/${val}/permission?n=${this.listenNodeId}`, 
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