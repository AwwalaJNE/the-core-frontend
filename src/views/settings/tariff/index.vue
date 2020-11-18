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

        <!--Create Tariff-->
            <dialog-create-edit-Tariff
            :active="dialogTariff" 
            @refresh="refresh"
            :closeDialog="closeDialogTariff"
            title="Create Tariff"
            />
        <!--Create SpecialTariff-->
            <dialog-create-edit-SpecialTariff
            :active="dialogTariffSpecial" 
            @refresh="refresh"
            :closeDialog="closeDialogTariffSpecial"
            title="Create Tariff Special"
            />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"

import BaseTariff from "@/views/settings/tariff/baseTariff"
import SpecialTariff from "@/views/settings/tariff/specialTariff"

import dialogCreateEditTariff from "@/views/settings/tariff/baseTariff/dialogCreateEditTariff"
import dialogCreateEditSpecialTariff from "@/views/settings/tariff/specialTariff/dialogCreateEditSpecialTariff"

export default {
    name:"tariff-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
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
            navActive: "k-BASE-TARIFF",
            tempSearch: "",
            dialogTariff: false,
            dialogTariffSpecial: false
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
            console.log(this.navActive)
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
        openDialog(){
            switch(this.navActive) {
                case "k-BASE-TARIFF":
                    this.dialogTariff = true
                    break;
                case "k-SPECIAL-TARIFF":
                    this.dialogTariffSpecial = true
                    break;
                default:
                    console.log('meong')
                    // code block
            }
            this.refreshInject = this.navActive
        },
        closeDialogTariff() {
            this.dialogTariff = false
        },
        closeDialogTariffSpecial() {
            this.dialogTariffSpecial = false
        },
    },
}
</script>