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
                        <vs-col xs="12" sm="6" lg="8">
                            <nav-item :navItem="navItemm" @activeTab="activeTab" />
                        </vs-col>
                        <vs-col xs="12" sm="6" lg="4">
                            <template v-if="navActive === 'configuration-warning-runsheet'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
                                            :isMultiple="false" 
                                            :border="true" 
                                            :valueData="searchConfigurationWarningRunsheetParams" 
                                            :selectedValue="searchConfigurationWarningRunsheetBy" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            ref="searchInput" 
                                            @searchValue="searchValue" 
                                            :placeholder="searchConfigurationWarningRunsheetPlaceholder" 
                                            class="search-input"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'configuration-warning-runsheet'">
                    <transition name="slide-fade">
                        <configuration-warning-runsheet 
                            :ref="navActive" 
                            :query="tempSearch" 
                            :searchBy="searchConfigurationWarningRunsheetBy"
                        />
                    </transition>
                </template>
            </div>
        </section>
        <dialog-create-edit-configuration-warning-runsheet
            :active="dialogConfigurationWarningRunsheet" 
            @refresh="refresh"
            :closeDialog="closeDialog"
            title="Create Configuration Warning Runsheet"
        />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import SelectSearchBy from "@/views/inventory/connote/item/selectSearchBy"

import ConfigurationWarningRunsheet from "@/views/settings/configurationWarningRunsheet/warningRunsheet/index"
import DialogCreateEditConfigurationWarningRunsheet from "@/views/settings/configurationWarningRunsheet/warningRunsheet/dialogCreateEditConfigurationWarningRunsheet"

export default {
    name:"sla-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "configuration-warning-runsheet": ConfigurationWarningRunsheet,
        "dialog-create-edit-configuration-warning-runsheet": DialogCreateEditConfigurationWarningRunsheet,
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "WARNING RUNSHEET",
                    key: "configuration-warning-runsheet",
                    title: "CONFIGURATION WARNING RUNSHEET"
                },
            ],
            title:"CONFIGURATION WARNING RUNSHEET",
            navActive: "configuration-warning-runsheet",
            tempSearch: "",
            dialogNode: false,
            dialogConfigurationWarningRunsheet: false,
            searchConfigurationWarningRunsheetPlaceholder: "Search Percentage",
            searchConfigurationWarningRunsheetBy: "percentage",
            searchConfigurationWarningRunsheetParams: [
                {
                    label: "Percentage",
                    value: "percentage"
                },
                {
                    label: "Minimum Connote",
                    value: "minimum_count"
                },
                {
                    label: "Configure By",
                    value: "reference"
                },
                {
                    label: "Applied For",
                    value: "user"
                },
            ]
        }
    },
    methods: {
        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh()
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
                case "configuration-warning-runsheet":
                    this.dialogConfigurationWarningRunsheet = true
                    break;
                default:
            }
            this.refreshInject = this.navActive
        },
        closeDialog() {
            switch(this.navActive) {
                case "configuration-warning-runsheet":
                    this.dialogConfigurationWarningRunsheet = false
                    break;
                default:
            }
        },
        updateSearchBy(key, val) {
            switch(this.navActive) {
                case "configuration-warning-runsheet":
                    this.searchConfigurationWarningRunsheetBy = val;
                    this.searchConfigurationWarningRunsheetPlaceholder = key;
                    this.clearSearch()
                    break;
                default:
            }
        },
    },
}
</script>