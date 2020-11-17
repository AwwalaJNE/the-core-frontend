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
                        <vs-col xs="6" sm="3" lg="3">
                            <search-input ref="searchInput" @searchValue="searchValue"/>
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'k-BASE-TARIFF'">
                    <transition name="slide-fade">
                        <base-tariff :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-SPECIAL-TARIFF'">
                    <transition name="slide-fade">
                        <special-tariff :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>

            </div>
        </section>

        <!--Create Country-->
            <!-- <dialog-create-edit-country 
            :active="dialogGeolocationCountry" 
            @refresh="refresh"
            :closeDialog="closeDialogCountry"
            title="Create Country"
            /> -->
        <!--Create province-->
            <!-- <dialog-create-edit-province 
            :active="dialogGeolocationProvince" 
            @refresh="refresh"
            :closeDialog="closeDialogProvince"
            title="Create Province"
            /> -->
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"

import BaseTariff from "@/views/settings/tariff/baseTariff"
import SpecialTariff from "@/views/settings/tariff/specialTariff"

import dialogCreateEditTariff from "@/views/settings/tariff/baseTariff/dialogCreateEditTariff"
import dialogCreateEditSpecialTariff from "@/views/settings/tariff/specialTariff/dialogCreateEditSpecialTariff"

export default {
    name:"tariff-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "base-tariff": BaseTariff,
        "special-tariff": SpecialTariff,
        // "role-list": RoleList,
        "dialog-create-edit-Tariff": dialogCreateEditTariff,
        "dialog-create-edit-SpecialTariff": dialogCreateEditSpecialTariff
    },
    data() {
        return {
            navItemm: [
                {
                    label: "BASE TARIFF",
                    key: "k-BASE-TARIFF",
                    title: "Base Tariff List"
                },
                {
                    label: "SPECIAL TARIFF",
                    key: "k-SPECIAL-TARIFF",
                    title: "Special Tariff List"
                },
            ],
            title:"Nodes",
            navActive: "k-BASE-TARIFF"
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