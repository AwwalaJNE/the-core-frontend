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
                    <div v-if="navActive !== 'upload-sla'" style="width: 100px;padding-right: 5px;">
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
                                :navItem="navItemm" 
                                @activeTab="activeTab" 
                            />
                        </vs-col>
                        <vs-col xs="12" sm="6" lg="4">
                            <template v-if="navActive === 'bag-weight'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
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
                                            :placeholder="searchBagWeightPlaceholder" 
                                            @searchValue="searchValue" 
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'bag-weight'">
                    <transition name="slide-fade">
                        <bag-weight 
                            :ref="navActive" 
                            :query="tempSearch" 
                            :searchBy="searchBagWeightBy"
                            @clearSearch="clearSearch"
                        />
                    </transition>
                </template>
            </div>
        </section>
        <dialog-create-edit
            title="Create Bag Weight"
            :active="dialogBagWeight" 
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

import BagWeight from "@/views/settings/bagWeight/bagWeight/index"
import DialogCreateEdit from "@/views/settings/bagWeight/bagWeight/dialogCreateEdit"

export default {
    name:"bag-weight-index",
    components: {
        "bag-weight": BagWeight,
        "breadcrumb": Breadcrumb,
        "dialog-create-edit": DialogCreateEdit,
        "nav-item": NavItem,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "BAG WEIGHT",
                    key: "bag-weight",
                    title: "Bag Weight"
                },
            ],
            title:"Bag Weight",
            navActive: "bag-weight",
            tempSearch: "",
            dialogBagWeight: false,
            searchBagWeightPlaceholder: "Search Bag Type",
            searchBagWeightBy: "bag_type",
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
                case "bag-weight":
                    this.dialogBagWeight = true
                    break;
                default:
            }
            this.refreshInject = this.navActive
        },
        closeDialog() {
            switch(this.navActive) {
                case "bag-weight":
                    this.dialogBagWeight = false
                    break;
                default:
            }
        },
        updateSearchBy(key,val) {
            switch(this.navActive) {
                case "bag-weight":
                    this.searchBagWeightBy = val;
                    this.searchBagWeightPlaceholder = key;
                    break;
                default:
            }
        },
    },
}
</script>