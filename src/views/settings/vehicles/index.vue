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
                <template v-if="navActive === 'k-VEHICLE'">
                    <transition name="slide-fade">
                        <vehicle-list />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-VEHICLE-TYPE'">
                    <transition name="slide-fade">
                        <vehicle-type />
                    </transition>
                </template>

            </div>
        </section>
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"

import VehicleList from "@/views/settings/vehicles/vehicleList"
import VehicleType from "@/views/settings/vehicles/vehicleType"


export default {
    name:"vehicle-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "vehicle-list": VehicleList,
        "vehicle-type": VehicleType,
        // "role-list": RoleList,
        // "dialog-create-edit-user": DialogCreateEditUser,
        // "dialog-create-edit-role": DialogCreateEditRole
    },
    data() {
        return {
            navItemm: [
                {
                    label: "VEHICLE",
                    key: "k-VEHICLE",
                    title: "VEHICLE List"
                },
                {
                    label: "TYPE",
                    key: "k-VEHICLE-TYPE",
                    title: "Vehicle Type"
                },
            ],
            title:"VEHICLE List",
            navActive: "k-VEHICLE"
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