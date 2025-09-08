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
                            <template v-if="navActive === 'courier-delivery-area'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
                                            :border="true" 
                                            :isMultiple="false" 
                                            :selectedValue="searchCourierDeliveryAreaBy" 
                                            :valueData="searchCourierDeliveryAreaParams" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            ref="searchInput" 
                                            :placeholder="searchCourierDeliveryAreaPlaceholder" 
                                            :isNumeric="searchCourierDeliveryAreaByDataType"
                                            @searchValue="searchValue" 
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'courier-delivery-area'">
                    <transition name="slide-fade">
                        <courier-delivery-area 
                            :ref="navActive" 
                            :query="tempSearch" 
                            :searchBy="searchCourierDeliveryAreaBy"
                            @clearSearch="clearSearch"
                        />
                    </transition>
                </template>
            </div>
        </section>
        <dialog-create-edit-courier-delivery-area
            title="Create Courier Delivery Area"
            :active="dialogCourierDeliveryArea" 
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
    </div>
</template>
<script>

import Breadcrumb from "@/components/breadcrumb/index"
import NavItem from "@/components/navbar/navTab"
import SearchInput from "@/components/search/searchInput"
import SelectSearchBy from "@/components/search/selectSearchBy";

import CourierDeliveryArea from "@/views/settings/courier/courierDeliveryArea/index"
import DialogCreateEditCourierDeliveryArea from "@/views/settings/courier/courierDeliveryArea/dialogCreateEdit"

export default {
    name:"setting-courier-index",
    components: {
        "breadcrumb": Breadcrumb,
        "courier-delivery-area": CourierDeliveryArea,
        "dialog-create-edit-courier-delivery-area": DialogCreateEditCourierDeliveryArea,
        "nav-item": NavItem,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            navItem: [
                {
                    label: "COURIER DELIVERY AREA",
                    key: "courier-delivery-area",
                    title: "Courier"
                },
            ],
            title:"Courier Delivery Area",
            navActive: "courier-delivery-area",
            tempSearch: "",
            dialogCourierDeliveryArea: false,
            searchCourierDeliveryAreaPlaceholder: "Search Courier Name",
            searchCourierDeliveryAreaBy: "courier_name",
            searchCourierDeliveryAreaByDataType: false,
            searchCourierDeliveryAreaParams: [
                {
                    label: "Courier Name",
                    value: "courier_name"
                },
                {
                    label: "Courier Node",
                    value: "courier_node"
                },
                {
                    label: "Area Type",
                    value: "area_type"
                },
                {
                    label: "Area Value",
                    value: "area_value"
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
                case "courier-delivery-area":
                    this.dialogCourierDeliveryArea = true;
                    break;
                default:
            }
            this.refreshInject = this.navActive
        },
        closeDialog() {
            switch(this.navActive) {
                case "courier-delivery-area":
                    this.dialogCourierDeliveryArea = false;
                    break;
                default:
            }
        },
        updateSearchBy(key, val, dataType) {
            switch(this.navActive) {
                case "courier-delivery-area":
                    this.searchCourierDeliveryAreaBy = val;
                    this.searchCourierDeliveryAreaPlaceholder = key;
                    this.searchCourierDeliveryAreaByDataType = dataType;
                    break;
                default:
            }
        },
    },
}
</script>