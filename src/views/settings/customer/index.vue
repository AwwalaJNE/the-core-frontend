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
                <template v-if="navActive === 'k-CUSTOMER-LIST'">
                    <transition name="slide-fade">
                        <customer-list />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-CUSTOMER-TYPE'">
                    <transition name="slide-fade">
                        <customer-type />
                    </transition>
                </template>

            </div>
        </section>
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"

import CustomerList from "@/views/settings/customer/customerList"
import CustomerType from "@/views/settings/customer/customerType"


export default {
    name:"customer-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "customer-list": CustomerList,
        "customer-type": CustomerType,
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
            navActive: "k-CUSTOMER-LIST"
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

        },
    },
}
</script>