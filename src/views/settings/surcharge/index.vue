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
                <template v-if="navActive === 'k-SURCHARGE'">
                    <transition name="slide-fade">
                        <surcharge-list :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-SURCHARGE'">
                    <transition name="slide-fade">
                        <surcharge-type :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
            </div>
        </section>

        <!--Create Surcharge-->
            <dialog-create-edit-Surcharge
            :active="dialogSurcharge" 
            @refresh="refresh"
            :closeDialog="closeDialogSurcharge"
            title="Create Surcharge"
            />
        <!--Create SurchargeType-->
            <dialog-create-edit-SurchargeType 
            :active="dialogSurchargeType" 
            @refresh="refresh"
            :closeDialog="closeDialogSurchargeType"
            title="Create Surcharge Type"
            />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"

import SurchargeList from "@/views/settings/surcharge/surchargeList"
import surchargeType from "@/views/settings/surcharge/surchargeType"

import dialogCreateEditSurcharge from "@/views/settings/surcharge/surchargeList/dialogCreateEditSurcharge"
import dialogCreateEditSurchargeType from "@/views/settings/surcharge/surchargeType/dialogCreateEditSurchargeType"


export default {
    name:"surcharge-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "surcharge-list": SurchargeList,
        "surcharge-type": surchargeType,
        "dialog-create-edit-Surcharge": dialogCreateEditSurcharge,
        "dialog-create-edit-SurchargeType": dialogCreateEditSurchargeType
    },
    data() {
        return {
            navItemm: [
                {
                    label: "SURCHARGE",
                    key: "k-SURCHARGE",
                    title: "Surcharge List"
                },
                {
                    label: "SURCHARGE TYPE",
                    key: "k-SURCHARGE-TYPE",
                    title: "Surcharge Type"
                },
            ],
            title:"Nodes",
            navActive: "k-SURCHARGE",
            dialogSurcharge: false,
            dialogSurchargeType: false,
            refreshInject:"",
            tempSearch: "",
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
                case "k-SURCHARGE":
                    this.dialogSurcharge = true
                    break;
                case "k-SURCHARGE-TYPE":
                    this.dialogSurchargeType = true
                    break;
                default:
                    console.log('meong')
                    // code block
            }
            this.refreshInject = this.navActive
        },
        closeDialogSurcharge() {
            this.dialogSurcharge = false
        },
        closeDialogSurchargeType() {
            this.dialogSurchargeType = false
        },
    },
}
</script>