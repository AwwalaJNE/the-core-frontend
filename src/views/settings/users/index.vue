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
                                           <li :key="key" :class="`${user_role_id == item.user_role_id ? 'active': ''}`" @click="getRolePermission(item.user_role_id)">{{item.user_role_name}}</li>
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

                                :isSearchAble="true"
                                :isMultipleSelect="true"
                                :selectedData="user_role_permission"

                                @updateSelected="updateSelected"
                                @updateValue="updateValue"
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
                    label: "Id",
                    key: "user_permission_id",
                    type: "text",
                    hidden: true,
                    width: "sm"
                },
                {
                    label: "Menu",
                    key: "user_permission_name",
                    type: "text",
                    width: "sm"
                },
                // {
                //     label: "Select",
                //     key: "selected",
                //     labelKey: "user_permission_id",
                //     type: "boolean",
                //     width: "xs"
                // },
                {
                    label: "Access Data",
                    key: "access_data",
                    type: "inputan",
                    typeInput: "select",
                    data: [
                        {
                            "label": "USER",
                            "value": "USER"
                        },
                        {
                            "label": "NODE",
                            "value": "NODE"
                        },
                        {
                            "label": "SAME-TLC",
                            "value": "SAME-TLC"
                        },
                        {
                            "label": "ALL",
                            "value": "ALL"
                        }
                    ],
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
            user_role_id: "",
            user_role_permission: [],
            permissionObject: {},
            filterArray: [],
            user_true_permission: [],

            waitToRoleRenderer: true,
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
            this.getDataRole(this.tempSearch)
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
                // console.log('ini permission page')
                this.getDataRole()
                // this.getDataPermission()
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

        async getDataRole(q){
            this.loadingDataRole = true
            let query = "";
            if(q !== undefined) {
                query = q
            }
            await axios
                .get(this.URL.role + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    // console.log('role', res.data.data)
                    if(res.data.data.length > 0) {
                        this.dataRole = res.data.data
                    } else {
                        this.dataRole = []
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                    this.loadingDataRole = false
                }).catch(err => {
                    this.loadingDataRole = false
                    this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataPermission(){
            
            await axios
                .get(this.URL.permission + 
                `?n=${this.listenNodeId}&limit=-1`, 
                this.Helper.header())
                .then(res => {
                    // console.log('getDataPermission',res.data.data)
                    if(res.data.data.length > 0) {
                        let data = res.data.data
                        let temp = {}
                        data.map(item => {
                            temp[item.user_permission_id] = item
                            item["access_data"] = ""
                            item["selected"] = false
                            item["un_selected"] = false
                        })
                        // this.permission = data
                        this.permissionDisplay = data
                        this.permissionObject = temp
                        // console.log('meong 1 ', this.permission)
                    } else {
                        // this.openNotification('warn', 'Permission data is empty!', ' Failed to populate permission data')
                    }
                    
                    
                }).catch(err => {
                    this.loadingPermission = false
                    this.openNotification('danger', 'Failed to populate permission data', err)
                })
        },
        
        async getRolePermission(val){
            this.loadingPermission = true
            this.waitToRoleRenderer = true
            await this.getDataPermission()
            this.user_role_id = val
            this.user_role_permission = []
            // this.permissionDisplay = []
            this.keysPermission = {}
            // console.log('this.keysPermission meong', this.keysPermission)
            await axios
                .get(this.URL.role + `/${val}/permission?n=${this.listenNodeId}`, 
                this.Helper.header())
                .then(res => {
                    let temp = {}
                    let data = res.data.data.permission
                    if(data.length > 0) {
                        data.map(item => {
                            let obj = {}
                            obj["user_permission_id"] = item.pivot.user_permission_id
                            obj["access_data"] = item.access_data
                            temp[item.pivot.user_permission_id] = obj
                        })
                        this.keysPermission = temp
                        
                    } else {
                        this.keysPermission = {}
                    }
                    this.filterNow()
                    this.loadingPermission = false
                })
                .catch(err => {
                    this.loadingPermission = false
                    this.openNotification('danger', 'Failed to populate role permission data', err)
                })
                
                
        },
        updateSelected(arr){
            this.filterNow()
            this.user_role_permission = arr
            this.user_role_permission.map(item => {
                if(item["access_data"] == "") {
                    item["access_data"] = "USER"
                }
            })
        this.filterArray = this.user_role_permission.filter(item => item.selected === false);
            if (this.filterArray.length == 0) {
                this.filterArray = this.getMissingPermissions()
            }
            console.log('this.filterArray',this.filterArray);

            if(this.waitToRoleRenderer == false) {
                this.updateRole()
            }
        },
        getMissingPermissions() {
            return this.user_true_permission.filter(truePermission => {
                return !this.user_role_permission.some(rolePermission => {
                    return rolePermission.user_permission_id === truePermission.user_permission_id;
                });
            }).map(missingPermission => {
                return { ...missingPermission, un_selected: true };
            });
        },
        updateValue(key, val, info){
            let splitAction = key.split("|")[0] || null
            let splitKey = key.split("|")[1] || null
            let obj = {}
    let updatedPermission = null
            console.log(key, val, info,'hehhee',splitAction,splitKey,obj);
            switch(splitAction) {
                
                case "access_data":
                    if(this.user_role_permission.length > 0) {
                        this.user_role_permission.map(item => {
                            if(item.user_permission_id == splitKey) {
                                if(item.hasOwnProperty("access_data")){
                                    item["access_data"] = val
                                    updatedPermission = [item]
                                }
                            }
                        })
                        console.log(this.user_role_permission,'hahah',[updatedPermission]);
                        if(this.waitToRoleRenderer == false) {
                            this.updateRole(updatedPermission)
                        }
                    }
                    break;
                default:
            }
            
            
        },
        async updateRole(updatedPermission) {
            if(this.permissionDisplay.length > 0 && this.waitToRoleRenderer == false) {
                let data = {"permission": []}
                // if (condition) {
                    
                // }
                console.log(updatedPermission,'updatedPermission',this.filterArray);
                data["permission"] = updatedPermission ? updatedPermission : this.filterArray
                await axios
                .post(
                    this.URL.role + `/${this.user_role_id}/permission?n=${this.listenNodeId}`,
                    JSON.stringify(data), 
                    this.Helper.header()
                )
                .then(res => {
                    this.getRolePermission(this.user_role_id)
                }).catch(err => {

                })
            }
        },
        filterNow(){
            if(this.permissionDisplay.length > 0) {
                let arr = []
                this.permissionDisplay.map(item => {
                    if(this.keysPermission.hasOwnProperty(item.user_permission_id)) {
                        item["selected"] = true
                        item["access_data"] = this.keysPermission[item.user_permission_id]["access_data"]
                        arr.push(item)
                    } 
                })
                
                this.user_role_permission = arr
                this.user_true_permission = arr
            }
            
            let self = this
            setTimeout(function(){ self.waitToRoleRenderer = false}, 800);

            
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
                    &:hover, &.active{
                        background-color: #f1f1f1;
                        transition: all .3s ease-in;
                    }
                }
            }
        }
    }
</style>