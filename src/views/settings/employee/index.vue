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

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        <vs-col xs="6" sm="9" lg="9">
                            <nav-item :navItem="navItemm" @activeTab="activeTab" />
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'k-EMPLOYEE'">
                    <transition name="slide-fade">
                        <employee-list :ref="navActive" :query="tempSearch" />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-EMPLOYEE-TYPE'">
                    <transition name="slide-fade">
                        <employee-type :ref="navActive"  :query="tempSearch"/>
                    </transition>
                </template>

            </div>
        </section>

        
        <!--Create Employee-->
            <dialog-create-edit-employee
                :active="dialogEmployee"
                @refresh="refresh"
                :closeDialog="closeDialogEmployee"
                title="New employee"
            />
            <dialog-create-edit-employee-type
                :active="dialogEmployeeType" 
                @refresh="refresh"
                :closeDialog="closeDialogEmployeeType"
                title="New employee Type"
            />
        <!--Create User Dialog end-->
            <!-- <dialog-create-edit-role 
            :active="dialogRole" 
            @refresh="refresh"
            :closeDialog="closeDialogEmployee"
            title="Create Employee"
            /> -->
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"

import SearchInput from "@/components/search/searchInput"


import EmployeeList from "@/views/settings/employee/employee-list"
import EmployeeType from "@/views/settings/employee/employee-type"

import DialogCreateEditEmployee from "@/views/settings/employee/employee-list/dialogCreateEditEmployee"
import DialogCreateEditEmployeeType from "@/views/settings/employee/employee-type/dialogCreateEditEmployeeType"



export default {
    name:"employee-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "employee-list": EmployeeList,
        "employee-type": EmployeeType,
        "dialog-create-edit-employee": DialogCreateEditEmployee,
        "dialog-create-edit-employee-type": DialogCreateEditEmployeeType,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "EMPLOYEE",
                    key: "k-EMPLOYEE",
                    title: "Employee"
                },
                {
                    label: "EMPLOYEE TYPE",
                    key: "k-EMPLOYEE-TYPE",
                    title: "Employee Type"
                },
            ],
            title:"Employee",
            navActive: "k-EMPLOYEE",
            dialogEmployee:false,
            tempSearch:'',
            dialogEmployeeType: false,
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
            console.log(this.navActive)
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
        openDialog(){
            switch(this.navActive) {
                case "k-EMPLOYEE":
                    this.dialogEmployee = true
                    break;
                case "k-EMPLOYEE-TYPE":
                    this.dialogEmployeeType = true
                    break;
                default:
                    console.log('meong')
                    // code block
            }
            this.refreshInject = this.navActive
        },
        closeDialogEmployee(){
            this.dialogEmployee = false
        },
        closeDialogEmployeeType() {
            this.dialogEmployeeType = false
        },
    },
}
</script>