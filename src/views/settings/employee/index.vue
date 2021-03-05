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
                    <nav-item :navItem="navItemm" @activeTab="activeTab" />
                </div>
                <template v-if="navActive === 'k-EMPLOYEE'">
                    <transition name="slide-fade">
                        <employee-list :ref="navActive"  />
                    </transition>
                </template>
                <!-- <template v-else-if="navActive === 'k-EMPLOYEE_TYPE'">
                    <transition name="slide-fade">
                        <employee-type :ref="navActive"  />
                    </transition>
                </template> -->

            </div>
        </section>

        
        <!--Create Employee-->
            <dialog-create-edit-employee
            :active="dialogEmployee" 
            @refresh="refresh"
            :closeDialog="closeDialogEmployee"
            title="Create Employee"
            />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"

import EmployeeList from "@/views/settings/employee/employee-list"
import DialogCreateEditEmployee from "@/views/settings/employee/employee-list/dialogCreateEditEmployee"

import EmployeeType from "@/views/settings/employee/employee-type"


export default {
    name:"employee-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "employee-list": EmployeeList,
        "employee-type": EmployeeType,
        // "role-list": RoleList,
        "dialog-create-edit-employee": DialogCreateEditEmployee,
        // "dialog-create-edit-role": DialogCreateEditRole
    },
    data() {
        return {
            navItemm: [
                {
                    label: "EMPLOYEE",
                    key: "k-EMPLOYEE",
                    title: "Employee"
                },
                // {
                //     label: "EMPLOYEE TYPE",
                //     key: "k-EMPLOYEE_TYPE",
                //     title: "Employee Type"
                // },
            ],
            title:"Employee",
            navActive: "k-EMPLOYEE",
            dialogEmployee:false
        }
    },
    methods: {
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
         refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
        },
        closeDialogEmployee(){
            this.dialogEmployee = false
        }
    },
}
</script>