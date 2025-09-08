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
                        <vs-col xs="12" sm="6" lg="8">
                            <nav-item :navItem="navItemm" @activeTab="activeTab" />
                        </vs-col>
                        <vs-col xs="12" sm="6" lg="4">
                            <template v-if="navActive === 'configuration-warning-runsheet'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by
                                            :key="'searchByWarningRunsheet'"
                                            :isMultiple="false" 
                                            :border="true" 
                                            :valueData="searchConfigurationWarningRunsheetParams" 
                                            :selectedValue="searchConfigurationWarningRunsheetBy" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            :key="'searchInputWarningRunsheet'"
                                            ref="searchInput" 
                                            @searchValue="searchValue" 
                                            :placeholder="searchConfigurationWarningRunsheetPlaceholder" 
                                            class="search-input"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                            <template v-if="navActive === 'configuration-warning-sla'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by
                                            :key="'searchByWarningSLA'"
                                            :isMultiple="false" 
                                            :border="true" 
                                            :valueData="searchConfigurationWarningSLAParams" 
                                            :selectedValue="searchConfigurationWarningSLABy" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            :key="'searchInputWarningSLA'"
                                            ref="searchInput" 
                                            @searchValue="searchValue" 
                                            :placeholder="searchConfigurationWarningSLAPlaceholder" 
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
                <template v-if="navActive === 'configuration-warning-sla'">
                    <transition name="slide-fade">
                        <configuration-warning-sla 
                            :ref="navActive" 
                            :query="tempSearch" 
                            :searchBy="searchConfigurationWarningSLABy"
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
        <dialog-create-edit-configuration-warning-sla
            :active="dialogConfigurationWarningSLA" 
            @refresh="refresh"
            :closeDialog="closeDialog"
            title="Create Configuration Warning SLA"
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
import ConfigurationWarningSLA from "@/views/settings/configurationWarningRunsheet/warningSLA/index"
import DialogCreateEditConfigurationWarningSLA from "@/views/settings/configurationWarningRunsheet/warningSLA/dialogCreateEditConfigurationWarningSLA"

export default {
    name:"sla-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "configuration-warning-runsheet": ConfigurationWarningRunsheet,
        "dialog-create-edit-configuration-warning-runsheet": DialogCreateEditConfigurationWarningRunsheet,
        "configuration-warning-sla": ConfigurationWarningSLA,
        "dialog-create-edit-configuration-warning-sla": DialogCreateEditConfigurationWarningSLA,
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
                {
                    label: "WARNING SLA",
                    key: "configuration-warning-sla",
                    title: "CONFIGURATION WARNING SLA"
                },
            ],
            title:"CONFIGURATION WARNING RUNSHEET",
            navActive: "configuration-warning-runsheet",
            tempSearch: "",
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
                    value: "node"
                },
            ],
            dialogConfigurationWarningSLA: false,
            searchConfigurationWarningSLAPlaceholder: "Search Formula Type",
            searchConfigurationWarningSLABy: "formula_type",
            searchConfigurationWarningSLAParams: [
                {
                    label: "Formula Type",
                    value: "formula_type"
                },
                {
                    label: "Applied For",
                    value: "node"
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
                case "configuration-warning-sla":
                    this.dialogConfigurationWarningSLA = true
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
                case "configuration-warning-sla":
                    this.dialogConfigurationWarningSLA = false
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
                case "configuration-warning-sla":
                    this.searchConfigurationWarningSLABy = val;
                    this.searchConfigurationWarningSLAPlaceholder = key;
                    this.clearSearch()
                    break;
                default:
            }
        },
    },
}
</script>