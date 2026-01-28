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
                        <!-- <vs-col xs="6" sm="3" lg="3">
                            <search-input ref="searchInput" @searchValue="searchValue"/>
                        </vs-col> -->
                    </vs-row>
                </div>
                <template v-if="navActive === 'k-VEHICLE'">
                    
                        <vehicle-list :ref="navActive" :query="tempSearch"/>
                    
                </template>
                <template v-else-if="navActive === 'k-VEHICLE-MODE'">
                    
                        <vehicle-mode :ref="navActive" :query="tempSearch"/>
                    
                </template>
                <template v-else-if="navActive === 'k-VEHICLE-TYPE'">
                    
                        <vehicle-type :ref="navActive" :query="tempSearch"/>
                    
                </template>

            </div>
        </section>

        <!--Create Vehicle-->
            <dialog-create-edit-Vehicle
            :active="dialogVehicle" 
            @refresh="refresh"
            :closeDialog="closeDialogVehicle"
            title="Create Vehicle"
            />
        <!--Create VehicleMode-->
            <dialog-create-edit-VehicleMode
            :active="dialogVehicleMode" 
            @refresh="refresh"
            :closeDialog="closeDialogVehicleMode"
            title="Create VehicleMode"
            />
        <!--Create VehicleType-->
            <dialog-create-edit-VehicleType
            :active="dialogVehicleType" 
            @refresh="refresh"
            :closeDialog="closeDialogVehicleType"
            title="Create Tariff Special"
            />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"

import VehicleList from "@/views/settings/vehicles/vehicleList"
import VehicleType from "@/views/settings/vehicles/vehicleType"
import vehicleMode from "@/views/settings/vehicles/vehicleMode"

import dialogCreateEditVehicle from "@/views/settings/vehicles/vehicleList/dialogCreateEditVehicle"
import dialogCreateEditVehicleMode from "@/views/settings/vehicles/vehicleMode/dialogCreateEditVehicleMode"
import dialogCreateEditVehicleType from "@/views/settings/vehicles/vehicleType/dialogCreateEditVehicleType"

export default {
    name:"vehicle-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "vehicle-list": VehicleList,
        "vehicle-type": VehicleType,
        "vehicle-mode": vehicleMode,
        // "role-list": RoleList,
        "dialog-create-edit-Vehicle": dialogCreateEditVehicle,
        "dialog-create-edit-VehicleMode": dialogCreateEditVehicleMode,
        "dialog-create-edit-VehicleType": dialogCreateEditVehicleType
    },
    data() {
        return {
            navItemm: [
                {
                    label: "VEHICLE",
                    key: "k-VEHICLE",
                    title: "Vehicle List"
                },
                {
                    label: "VEHICLE MODE",
                    key: "k-VEHICLE-MODE",
                    title: "Vehicle Mode"
                },
                {
                    label: "VEHICLE TYPE",
                    key: "k-VEHICLE-TYPE",
                    title: "Vehicle Type"
                },
            ],
            title:"Vehicle List",
            navActive: "k-VEHICLE",
            tempSearch: "",
            dialogVehicle: false,
            dialogVehicleMode: false,
            dialogVehicleType: false
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
            this.clearSearch()

            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
        openDialog(){
            switch(this.navActive) {
                case "k-VEHICLE":
                    this.dialogVehicle = true
                    break;
                case "k-VEHICLE-MODE":
                    this.dialogVehicleMode = true
                    break;
                case "k-VEHICLE-TYPE":
                    this.dialogVehicleType = true
                    break;
                default:

                    // code block
            }
            this.refreshInject = this.navActive
        },
        closeDialogVehicle() {
            this.dialogVehicle = false
        },
        closeDialogVehicleMode() {
            this.dialogVehicleMode = false
        },
        closeDialogVehicleType() {
            this.dialogVehicleType = false
        },
    },
}
</script>