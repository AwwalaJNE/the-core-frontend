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
                            <template v-if="navActive === 'KPI'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by
                                            key="searchBy"
                                            :border="true"
                                            :isMultiple="false"
                                            :selectedValue="searchBy" 
                                            :valueData="searchParams" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            class="search-input"
                                            key="searchInput"
                                            ref="searchInput"  
                                            :placeholder="searchPlaceholder" 
                                            @searchValue="searchValue"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'KPI'">
                    <transition name="slide-fade">
                        <key-performance-indicator 
                            :ref="navActive" 
                            :query="tempSearch" 
                            :searchBy="searchBy"
                        />
                    </transition>
                </template>
            </div>
        </section>
        <dialog-create-edit
            title="Create KPI Process Target"
            :active="dialogActive" 
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
    </div>
</template>
<script>

import Breadcrumb from "@/components/breadcrumb/index";
import NavItem from "@/components/navbar/navTab";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";

import DialogCreateEdit from "@/views/settings/kpi/processTarget/dialogCreateEdit";
import ProcessTargetTable from "@/views/settings/kpi/processTarget/index";

export default {
    name:"kpi",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "key-performance-indicator": ProcessTargetTable,
        "dialog-create-edit": DialogCreateEdit,
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "KPI",
                    key: "KPI",
                    title: "Key Performance Indicator"
                },
            ],
            title:"Key Performance Indicator",
            navActive: "KPI",
            tempSearch: "",
            dialogActive: false,
            searchPlaceholder: "Search Reference Value",
            searchBy: "reference_value",
            searchParams: [
                {
                    label: "Reference Value",
                    value: "reference_value"
                },
                {
                    label: "Reference Entity",
                    value: "reference_entity"
                },
                {
                    label: "Process Name",
                    value: "process_name"
                }
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
                case "KPI":
                    this.dialogActive = true
                    break;
                default:
            }
            this.refreshInject = this.navActive
        },
        closeDialog() {
            switch(this.navActive) {
                case "KPI":
                    this.dialogActive = false
                    break;
                default:
            }
        },
        updateSearchBy(key, val) {
            switch(this.navActive) {
                case "KPI":
                    this.searchBy = val;
                    this.searchPlaceholder = key;
                    this.clearSearch()
                    break;
                default:
            }
        },
    },
}
</script>