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
                            <nav-item 
                                :navItem="navItem" 
                                @activeTab="activeTab" 
                            />
                        </vs-col>
                        <vs-col xs="12" sm="6" lg="4">
                            <template v-if="navActive === 'runsheet-limit'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
                                            :border="true" 
                                            :isMultiple="false" 
                                            :selectedValue="searchRunsheetLimitBy" 
                                            :valueData="searchRunsheetLimitParams" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            ref="searchInput" 
                                            :placeholder="searchRunsheetLimitPlaceholder" 
                                            :isNumeric="searchRunsheetLimitByDataType"
                                            @searchValue="searchValue" 
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'runsheet-limit'">
                    <transition name="slide-fade">
                        <runsheet-limit 
                            :ref="navActive" 
                            :query="tempSearch" 
                            :searchBy="searchRunsheetLimitBy"
                            @clearSearch="clearSearch"
                        />
                    </transition>
                </template>
            </div>
        </section>
        <dialog-create-edit-runsheet-limit
            title="Create Runsheet Limit"
            :active="dialogRunsheetLimit" 
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import SelectSearchBy from "@/components/search/selectSearchBy";

import RunsheetLimit from "@/views/settings/runsheet/runsheetLimit/index"
import DialogCreateEditRunsheetLimit from "@/views/settings/runsheet/runsheetLimit/dialogCreateEdit"

export default {
    name:"setting-runsheet-index",
    components: {
        "runsheet-limit": RunsheetLimit,
        "breadcrumb": Breadcrumb,
        "dialog-create-edit-runsheet-limit": DialogCreateEditRunsheetLimit,
        "nav-item": NavItem,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            navItem: [
                {
                    label: "RUNSHEET LIMIT",
                    key: "runsheet-limit",
                    title: "Runsheet Limit"
                },
            ],
            title:"Runsheet Limit",
            navActive: "runsheet-limit",
            tempSearch: "",
            dialogRunsheetLimit: false,
            searchRunsheetLimitPlaceholder: "Search Reference To",
            searchRunsheetLimitBy: "reference_to",
            searchRunsheetLimitByDataType: false,
            searchRunsheetLimitParams: [
                {
                    label: "Reference To",
                    value: "reference_to"
                },
                {
                    label: "Reference Entity",
                    value: "reference_entity"
                },
                {
                    label: "Reference Value",
                    value: "reference_value"
                },
                {
                    label: "Created By",
                    value: "created_by"
                }
            ],
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

            let item = this.navItem.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
        openDialog(){
            switch(this.navActive) {
                case "runsheet-limit":
                    this.dialogRunsheetLimit = true;
                    break;
                default:
            }
            this.refreshInject = this.navActive
        },
        closeDialog() {
            switch(this.navActive) {
                case "runsheet-limit":
                    this.dialogRunsheetLimit = false;
                    break;
                default:
            }
        },
        updateSearchBy(key, val, dataType) {
            switch(this.navActive) {
                case "runsheet-limit":
                    this.searchRunsheetLimitBy = val;
                    this.searchRunsheetLimitPlaceholder = key;
                    this.searchRunsheetLimitByDataType = dataType;
                    break;
                default:
            }
        },
    },
}
</script>