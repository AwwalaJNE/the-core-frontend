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
                            <nav-item 
                                :navItem="navItem" 
                                @activeTab="activeTab" 
                            />
                        </vs-col>
                        <vs-col xs="12" sm="6" lg="4">
                            <template v-if="navActive === 'bag-weight'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
                                            :key="'bag-weight'"
                                            :border="true" 
                                            :isMultiple="false" 
                                            :selectedValue="searchBagWeightBy" 
                                            :valueData="searchBagWeightParams" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            ref="searchInput" 
                                            :key="'bag-weight'"
                                            :placeholder="searchBagWeightPlaceholder" 
                                            @searchValue="searchValue" 
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                            <template v-else-if="navActive === 'bag-limit'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
                                            :key="'bag-limit'"
                                            :border="true" 
                                            :isMultiple="false" 
                                            :selectedValue="searchBagLimitBy" 
                                            :valueData="searchBagLimitParams" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            ref="searchInput" 
                                            :key="'bag-limit'"
                                            :placeholder="searchBagLimitPlaceholder" 
                                            :isNumeric="searchBagLimitByDataType"
                                            @searchValue="searchValue" 
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                            <template v-if="navActive === 'active-bag-weight'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
                                            :key="'active-bag-weight'"
                                            :border="true" 
                                            :isMultiple="false" 
                                            :selectedValue="searchActiveBagWeightBy" 
                                            :valueData="searchActiveBagWeightParams" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            ref="searchInput" 
                                            :key="'active-bag-weight'"
                                            :placeholder="searchActiveBagWeightPlaceholder" 
                                            @searchValue="searchValue" 
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'bag-weight'">
                    
                        <bag-weight 
                            :ref="navActive" 
                            :query="tempSearch" 
                            :searchBy="searchBagWeightBy"
                            @clearSearch="clearSearch"
                        />
                    
                </template>
                <template v-else-if="navActive === 'bag-limit'">
                    
                        <bag-limit 
                            :ref="navActive" 
                            :query="tempSearch" 
                            :searchBy="searchBagLimitBy"
                            @clearSearch="clearSearch"
                        />
                    
                </template>
                <template v-else-if="navActive === 'active-bag-weight'">
                    
                        <active-bag-weight 
                            :ref="navActive" 
                            :query="tempSearch" 
                            :searchBy="searchActiveBagWeightBy"
                            @clearSearch="clearSearch"
                        />
                    
                </template>
            </div>
        </section>
        <dialog-create-edit-bag-weight
            title="Create Bag Weight"
            :active="dialogBagWeight" 
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
        <dialog-create-edit-bag-limit
            title="Create Bag Limit"
            :active="dialogBagLimit" 
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
        <dialog-create-edit-active-bag-weight
            title="Create Active Bag Weight"
            :active="dialogActiveBagWeight" 
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

import ActiveBagWeight from "@/views/settings/bag/activeBagWeight/index"
import BagWeight from "@/views/settings/bag/bagWeight/index"
import BagLimit from "@/views/settings/bag/bagLimit/index"
import DialogCreateEditBagWeight from "@/views/settings/bag/bagWeight/dialogCreateEdit"
import DialogCreateEditBagLimit from "@/views/settings/bag/bagLimit/dialogCreateEdit"
import DialogCreateEditActiveBagWeight from "@/views/settings/bag/activeBagWeight/dialogCreateEdit"

export default {
    name:"bag-index",
    components: {
        "active-bag-weight": ActiveBagWeight,
        "bag-weight": BagWeight,
        "bag-limit": BagLimit,
        "breadcrumb": Breadcrumb,
        "dialog-create-edit-bag-weight": DialogCreateEditBagWeight,
        "dialog-create-edit-bag-limit": DialogCreateEditBagLimit,
        "dialog-create-edit-active-bag-weight": DialogCreateEditActiveBagWeight,
        "nav-item": NavItem,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            navItem: [
                {
                    label: "BAG WEIGHT",
                    key: "bag-weight",
                    title: "Bag Weight"
                },
                {
                    label: "BAG LIMIT",
                    key: "bag-limit",
                    title: "Bag Limit"
                },
                {
                    label: "ACTIVE BAG WEIGHT",
                    key: "active-bag-weight",
                    title: "Active Bag Weight"
                },
            ],
            title:"Bag Weight",
            navActive: "bag-weight",
            tempSearch: "",
            dialogBagWeight: false,
            searchBagWeightPlaceholder: "Search Bag Type",
            searchBagWeightBy: "bag_type",
            searchBagWeightByDataType: false,
            searchBagWeightParams: [
                {
                    label: "Bag Type",
                    value: "bag_type"
                },
                {
                    label: "Routing Type",
                    value: "routing_type"
                },
                {
                    label: "Service Type",
                    value: "service_type"
                },
                {
                    label: "Destination",
                    value: "destination"
                }
            ],
            dialogBagLimit: false,
            searchBagLimitPlaceholder: "Search Bag Type",
            searchBagLimitBy: "bag_type",
            searchBagLimitByDataType: false,
            searchBagLimitParams: [
                {
                    label: "Bag Type",
                    value: "bag_type"
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
                    label: "Limit",
                    value: "limit",
                    isNumeric: true
                },
                {
                    label: "Created By",
                    value: "created_by"
                }
            ],
            dialogActiveBagWeight: false,
            searchActiveBagWeightPlaceholder: "Search Reference",
            searchActiveBagWeightBy: "reference",
            searchActiveBagWeightByDataType: false,
            searchActiveBagWeightParams: [
                {
                    label: "Reference",
                    value: "reference"
                },
                {
                    label: "Destination",
                    value: "destination_value"
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
                case "bag-weight":
                    this.dialogBagWeight = true;
                    break;
                case "bag-limit":
                    this.dialogBagLimit = true;
                    break;
                case "active-bag-weight":
                    this.dialogActiveBagWeight = true;
                    break;
                default:
            }
            this.refreshInject = this.navActive
        },
        closeDialog() {
            switch(this.navActive) {
                case "bag-weight":
                    this.dialogBagWeight = false;
                    break;
                case "bag-limit":
                    this.dialogBagLimit = false;
                    break;
                case "active-bag-weight":
                    this.dialogActiveBagWeight = false;
                    break;
                default:
            }
        },
        updateSearchBy(key, val, dataType) {
            switch(this.navActive) {
                case "bag-weight":
                    this.searchBagWeightBy = val;
                    this.searchBagWeightPlaceholder = key;
                    this.searchBagWeightByDataType = dataType;
                    break;
                case "bag-limit":
                    this.searchBagLimitBy = val;
                    this.searchBagLimitPlaceholder = key;
                    this.searchBagLimitByDataType = dataType;
                    break;
                case "active-bag-weight":
                    this.searchActiveBagWeightBy = val;
                    this.searchActiveBagWeightPlaceholder = key;
                    this.searchActiveBagWeightByDataType = dataType;
                    break;
                default:
            }
        },
    },
}
</script>