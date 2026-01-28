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
                        :data-testid="`create-button-${navActive}`"
                        @click="openDialog"
                        > 
                            <i class="bx bx-plus"></i> New
                        </vs-button>
                    </div>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        <vs-col xs="6" sm="9" lg="9">
                            <nav-item :navItem="navItemm" @activeTab="activeTab" />
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'k-CUSTOMER-LIST'">
                    
                        <customer-list :ref="navActive" :query="tempSearch"/>
                    
                </template>
                <template v-else-if="navActive === 'k-CUSTOMER-TYPE'">
                    
                        <customer-type :ref="navActive" :query="tempSearch"/>
                    
                </template>

            </div>
        </section>

        <!--Create Edit User Dialog-->
            <dialog-create-edit-customer
                :active="dialogCustomer" 
                @refresh="refresh"
                :closeDialog="closeDialogCustomer"
                title="New customer"
            />
            <dialog-create-edit-customer-type
                :active="dialogCustomerType" 
                @refresh="refresh"
                :closeDialog="closeDialogCustomerType"
                title="New customer Type"
            />
        <!--Create User Dialog end-->
            <!-- <dialog-create-edit-role 
            :active="dialogRole" 
            @refresh="refresh"
            :closeDialog="closeDialogRole"
            title="New role"
            /> -->

    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"

import CustomerList from "@/views/settings/customer/customerList"
import CustomerType from "@/views/settings/customer/customerType"

import DialogCreateEditCustomer from "@/views/settings/customer/customerList/dialogCreateEditCustomer"
import DialogCreateEditCustomerType from "@/views/settings/customer/customerType/dialogCreateEditCustomerType"

export default {
    name:"customer-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "customer-list": CustomerList,
        "customer-type": CustomerType,
        "dialog-create-edit-customer": DialogCreateEditCustomer,
        "dialog-create-edit-customer-type": DialogCreateEditCustomerType,
        // "role-list": RoleList,
        // "dialog-create-edit-user": DialogCreateEditUser,
        // "dialog-create-edit-role": DialogCreateEditRole
    },
    data() {
        return {
            navItemm: [
                {
                    label: "CUSTOMER",
                    key: "k-CUSTOMER-LIST",
                    title: "Customer List"
                },
                {
                    label: "CUSTOMER TYPE",
                    key: "k-CUSTOMER-TYPE",
                    title: "Customer Type"
                },
            ],
            title:"Customer List",
            navActive: "k-CUSTOMER-LIST",
            dialogCustomer: false,
            tempSearch:'',
            dialogCustomerType: false,
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

        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        activeTab(val) {
            this.navActive = val

            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
        openDialog(){
            switch(this.navActive) {
                case "k-CUSTOMER-LIST":
                    this.dialogCustomer = true
                    break;
                case "k-CUSTOMER-TYPE":
                    this.dialogCustomerType = true
                    break;
                default:

                    // code block
            }
            this.refreshInject = this.navActive
        },
        closeDialogCustomer() {
            this.dialogCustomer = false
        },
        closeDialogCustomerType() {
            this.dialogCustomerType = false
        },
    },
}
</script>