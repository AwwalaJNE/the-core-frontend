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
                        <div class="nav-box">
                            <nav-item :navItem="navItemm" @activeTab="activeTab" />
                        </div>
                        <template v-if="navActive === 'k-USER'">
                            <transition name="slide-fade">
                                <user-list />
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-ROLES'">
                            <transition name="slide-fade">
                                <role-list />
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-PERMISSIONS'">
                            <transition name="slide-fade">
                                
                            </transition>
                        </template>
                    </div>
                </vs-col>
                <template v-if="navActive === 'k-PERMISSIONS'">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="8">
                       <div class="box">
                           <table-master 
                                :dataTable="dataTable" 
                                :dataColumn="datacolumn" 
                                :tableLoading="loading"
                                :pageSize="pagination.page_size"
                                :page="pagination.page"
                                :limit="pagination.limit"
                                :hasAction="false"
                                @actionLimit="actionLimit"
                                @actionPagination="actionPagination"
                                />
                       </div>
                    </vs-col>
                </template>
            </vs-row>
        </section>

        <!--Create Edit User Dialog-->
            <dialog-create-edit-user 
            :active="dialogUser" 
            :closeDialogUser="closeDialogUser"
            title="New user"
            />
        <!--Create User Dialog end-->
            <dialog-create-edit-role 
            :active="dialogRole" 
            :closeDialogRole="closeDialogRole"
            title="New role"
            />
            

    </div>
</template>
<script>
import TableMaster from "@/components/table/tableMaster.vue"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
// users
import UserList from "@/views/settings/users/user/userList"
import DialogCreateEditUser from "@/views/settings/users/user/dialogCreateEditUser"
// role
import RoleList from "@/views/settings/users/role/roleList"
import DialogCreateEditRole from "@/views/settings/users/role/dialogCreateEditRole"

export default {
    name:"Users",
    components: {
        "table-master" : TableMaster,
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
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
            dataTable: [],
            datacolumn: [
                {
                    label: "Menu",
                    key: "permission_menu",
                    width: "sm"
                },
                {
                    label: "View",
                    key: "permission_view",
                    width: "auto"
                },
                {
                    label: "Add",
                    key: "permission_add",
                    width: "auto"
                },
                {
                    label: "Edit",
                    key: "permission_edit",
                    width: "auto"
                },
                {
                    label: "All",
                    key: "permission_all",
                    width: "auto"
                },
                {
                    label: "Access Data",
                    key: "permission_access_data",
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
            }
        }
    },
    methods: {
        activeTab(val) {
            this.navActive = val
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
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
    }
</style>