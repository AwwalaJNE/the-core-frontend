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
                            <template v-if="navActive === 'facility-code'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by
                                            :key="'searchByFacilityCode'"
                                            :isMultiple="false" 
                                            :border="true" 
                                            :valueData="searchParamsFacilityCode" 
                                            :selectedValue="searchByFacilityCode" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            :key="'searchInputFacilityCode'"
                                            ref="searchInput" 
                                            @searchValue="searchValue" 
                                            :placeholder="searchPlaceholderFacilityCode" 
                                            class="search-input"
                                            @handleSearch="handleSearch"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'facility-code'">
                    <transition name="slide-fade">
                        <facility-code-list
                            :ref="navActive" 
                            :query="tempSearch" 
                            :searchBy="searchByFacilityCode"
                        />
                    </transition>
                </template>
            </div>
        </section>
        <dialog-create-edit-facility-code
            :active="dialogCreateEditFacilityCode" 
            @refresh="refresh"
            :closeDialog="closeDialog"
            title="Create Facility Code"
        />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import SelectSearchBy from "@/views/inventory/connote/item/selectSearchBy"

import facilityCodeList from "@/views/settings/facilityCode/facilityCodeList"
import DialogCreateEditFacilityCode from "@/views/settings/facilityCode/facilityCodeList/dialogCreateEditFacilityCode"

export default {
    name:"facility-code-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "facility-code-list": facilityCodeList,
        "dialog-create-edit-facility-code": DialogCreateEditFacilityCode,
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "FACILITY CODE",
                    key: "facility-code",
                    title: "FACILITY CODE"
                },
            ],
            title:"FACILITY CODE",
            navActive: "facility-code",
            tempSearch: "",
            dialogCreateEditFacilityCode: false,
            searchPlaceholderFacilityCode: "Search Facility Code",
            searchByFacilityCode: "code",
            searchParamsFacilityCode: [
                {
                    label: "Facility Code",
                    value: "code"
                },
                {
                    label: "Facility Name",
                    value: "name"
                },
                {
                    label: "Address",
                    value: "address"
                },
                {
                    label: "Facility Type",
                    value: "facility_type"
                },
                {
                    label: "Destination",
                    value: "destination"
                },
            ],
            refreshInject: "facility-code"
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
            this.refreshInject = this.navActive
        },
        openDialog() {
            switch(this.navActive) {
                case "facility-code":
                    this.dialogCreateEditFacilityCode = true
                    break;
                default:
            }
            this.refreshInject = this.navActive
        },
        closeDialog() {
            switch(this.navActive) {
                case "facility-code":
                    this.dialogCreateEditFacilityCode = false
                    break;
                default:
            }
        },
        updateSearchBy(key, val) {
            switch(this.navActive) {
                case "facility-code":
                    this.searchByFacilityCode = val;
                    this.searchPlaceholderFacilityCode = key;
                    this.clearSearch()
                    break;
                default:
            }
        },
        handleSearch() {
            this.$nextTick(() => {
                this.refresh()
            });
        },
    },
}
</script>