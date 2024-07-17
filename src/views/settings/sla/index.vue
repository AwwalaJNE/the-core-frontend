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
                            <nav-item :navItem="navItemm" @activeTab="activeTab" />
                        </vs-col>
                        <vs-col xs="12" sm="6" lg="4">
                            <template v-if="navActive === 'sla-koli'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
                                            :isMultiple="false" 
                                            :border="true" 
                                            :valueData="searchSlaKoliParams" 
                                            :selectedValue="searchSlaKoliBy" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            ref="searchInput" 
                                            @searchValue="searchValue" 
                                            :placeholder="searchSlaKoliPlaceholder" 
                                            class="search-input"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                            <template v-else-if="navActive === 'sla-inter-activity'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
                                            :isMultiple="false" 
                                            :border="true" 
                                            :valueData="searchSlaInterActivityParams" 
                                            :selectedValue="searchSlaInterActivityBy" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            ref="searchInput" 
                                            @searchValue="searchValue" 
                                            :placeholder="searchSlaInterActivityPlaceholder" 
                                            class="search-input"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                            <template v-else-if="navActive === 'sla-node-to-node-a'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
                                            :isMultiple="false" 
                                            :border="true" 
                                            :valueData="searchSlaNodeToNodeAParams" 
                                            :selectedValue="searchSlaNodeToNodeABy" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            ref="searchInput" 
                                            @searchValue="searchValue" 
                                            :placeholder="searchSlaNodeToNodeAPlaceholder" 
                                            class="search-input"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                            <template v-else-if="navActive === 'sla-node-to-node-b'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
                                            :isMultiple="false" 
                                            :border="true" 
                                            :valueData="searchSlaNodeToNodeBParams" 
                                            :selectedValue="searchSlaNodeToNodeBBy" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            ref="searchInput" 
                                            @searchValue="searchValue" 
                                            :placeholder="searchSlaNodeToNodeBPlaceholder" 
                                            class="search-input"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'sla-koli'">
                    <transition name="slide-fade">
                        <sla-koli :ref="navActive" :query="tempSearch" :searchBy="searchSlaKoliBy"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'sla-inter-activity'">
                    <transition name="slide-fade">
                        <sla-inter-activity :ref="navActive" :query="tempSearch" :searchBy="searchSlaInterActivityBy"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'sla-node-to-node-a'">
                    <transition name="slide-fade">
                        <sla-node-to-node-a :ref="navActive" :query="tempSearch" :searchBy="searchSlaNodeToNodeABy"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'sla-node-to-node-b'">
                    <transition name="slide-fade">
                        <sla-node-to-node-b :ref="navActive" :query="tempSearch" :searchBy="searchSlaNodeToNodeBBy"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'upload-sla'">
                    <transition name="slide-fade">
                        <upload-sla :ref="navActive"/>
                    </transition>
                </template>
            </div>
        </section>
        <dialog-create-edit-sla-koli
            :active="dialogSlaKoli" 
            @refresh="refresh"
            :closeDialog="closeDialog"
            title="Create SLA Koli"
        />
        <dialog-create-edit-sla-inter-activity
            :active="dialogSlaInterActivity" 
            @refresh="refresh"
            :closeDialog="closeDialog"
            title="Create SLA Inter Activity"
        />
        <dialog-create-edit-sla-node-to-node-a
            :active="dialogSlaNodeToNodeA" 
            @refresh="refresh"
            :closeDialog="closeDialog"
            title="Create SLA Node To Node A"
        />
        <dialog-create-edit-sla-node-to-node-b
            :active="dialogSlaNodeToNodeB" 
            @refresh="refresh"
            :closeDialog="closeDialog"
            title="Create SLA Node To Node B"
        />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import SelectSearchBy from "@/views/inventory/connote/item/selectSearchBy"

import SlaKoli from "@/views/settings/sla/slaKoli/index"
import SlaInterActivity from "@/views/settings/sla/slaInterActivity/index"
import SlaNodeToNodeA from "@/views/settings/sla/slaNodeToNodeA/index"
import SlaNodeToNodeB from "@/views/settings/sla/slaNodeToNodeB/index"
import DialogCreateEditSlaKoli from "@/views/settings/sla/slaKoli/dialogCreateEditSla"
import DialogCreateEditSlaInterActivity from "@/views/settings/sla/slaInterActivity/dialogCreateEditSla"
import DialogCreateEditSlaNodeToNodeA from "@/views/settings/sla/slaNodeToNodeA/dialogCreateEditSla"
import DialogCreateEditSlaNodeToNodeB from "@/views/settings/sla/slaNodeToNodeB/dialogCreateEditSla"
import UploadSla from "@/views/settings/sla/uploadSla/index"

export default {
    name:"sla-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "sla-koli": SlaKoli,
        "sla-inter-activity": SlaInterActivity,
        "sla-node-to-node-a": SlaNodeToNodeA,
        "sla-node-to-node-b": SlaNodeToNodeB,
        "dialog-create-edit-sla-koli": DialogCreateEditSlaKoli,
        "dialog-create-edit-sla-inter-activity": DialogCreateEditSlaInterActivity,
        "dialog-create-edit-sla-node-to-node-a": DialogCreateEditSlaNodeToNodeA,
        "dialog-create-edit-sla-node-to-node-b": DialogCreateEditSlaNodeToNodeB,
        "select-search-by": SelectSearchBy,
        "upload-sla": UploadSla
    },
    data() {
        return {
            navItemm: [
                {
                    label: "SLA KOLI",
                    key: "sla-koli",
                    title: "SLA KOLI"
                },
                {
                    label: "SLA INTER ACTIVITY",
                    key: "sla-inter-activity",
                    title: "SLA INTER ACTIVITY"
                },
                {
                    label: "SLA NODE TO NODE A",
                    key: "sla-node-to-node-a",
                    title: "SLA NODE TO NODE A"
                },
                {
                    label: "SLA NODE TO NODE B",
                    key: "sla-node-to-node-b",
                    title: "SLA NODE TO NODE B"
                },
                {
                    label: "UPLOAD SLA",
                    key: "upload-sla",
                    title: "UPLOAD SLA"
                },
            ],
            title:"SLA Koli",
            navActive: "sla-koli",
            tempSearch: "",
            dialogNode: false,
            dialogSlaKoli: false,
            dialogSlaInterActivity: false,
            dialogSlaNodeToNodeA: false,
            dialogSlaNodeToNodeB: false,
            searchSlaKoliPlaceholder: "Search Group Name",
            searchSlaKoliBy: "group_name",
            searchSlaKoliParams: [
                {
                    label: "Group Name",
                    value: "group_name"
                },
                {
                    label: "Origin",
                    value: "origin"
                },
                {
                    label: "Destination",
                    value: "destination"
                },
                {
                    label: "Service",
                    value: "service_code"
                },
                {
                    label: "Customer Code",
                    value: "customer_code"
                },
                {
                    label: "Customer Name",
                    value: "customer_name"
                },
                {
                    label: "SLA",
                    value: "sla"
                },
            ],
            searchSlaInterActivityPlaceholder: "Search Group Name",
            searchSlaInterActivityBy: "group_name",
            searchSlaInterActivityParams: [
                {
                    label: "Group Name",
                    value: "group_name"
                },
                {
                    label: "Origin",
                    value: "origin"
                },
                {
                    label: "Destination",
                    value: "destination"
                },
                {
                    label: "Service",
                    value: "service_code"
                },
                {
                    label: "Customer Code",
                    value: "customer_code"
                },
                {
                    label: "Customer Name",
                    value: "customer_name"
                },
                {
                    label: "Node Code",
                    value: "node_code"
                },
                {
                    label: "Current Activity",
                    value: "previous_activity"
                },
                {
                    label: "Next Activity",
                    value: "next_activity"
                },
                {
                    label: "SLA",
                    value: "sla"
                },
            ],
            searchSlaNodeToNodeAPlaceholder: "Search Group Name",
            searchSlaNodeToNodeABy: "group_name",
            searchSlaNodeToNodeAParams: [
                {
                    label: "Group Name",
                    value: "group_name"
                },
                {
                    label: "Type",
                    value: "type"
                },
                {
                    label: "Node Origin",
                    value: "node_origin"
                },
                {
                    label: "Node Destination",
                    value: "node_destination"
                },
                {
                    label: "SLA",
                    value: "sla"
                },
            ],
            searchSlaNodeToNodeBPlaceholder: "Search Group Name",
            searchSlaNodeToNodeBBy: "group_name",
            searchSlaNodeToNodeBParams: [
                {
                    label: "Group Name",
                    value: "group_name"
                },
                {
                    label: "Origin",
                    value: "origin_code"
                },
                {
                    label: "Type",
                    value: "type"
                },
                {
                    label: "Node Origin",
                    value: "node_origin"
                },
                {
                    label: "Node Destination",
                    value: "node_destination"
                },
                {
                    label: "Delivery Zone",
                    value: "delivery_zone"
                },
                {
                    label: "SLA",
                    value: "sla"
                },
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
                case "sla-koli":
                    this.dialogSlaKoli = true
                    break;
                case "sla-inter-activity":
                    this.dialogSlaInterActivity = true
                    break;
                case "sla-node-to-node-a":
                    this.dialogSlaNodeToNodeA = true
                    break;
                case "sla-node-to-node-b":
                    this.dialogSlaNodeToNodeB = true
                    break;
                default:
            }
            this.refreshInject = this.navActive
        },
        closeDialog() {
            switch(this.navActive) {
                case "sla-koli":
                    this.dialogSlaKoli = false
                    break;
                case "sla-inter-activity":
                    this.dialogSlaInterActivity = false
                    break;
                case "sla-node-to-node-a":
                    this.dialogSlaNodeToNodeA = false
                    break;
                case "sla-node-to-node-b":
                    this.dialogSlaNodeToNodeB = false
                    break;
                default:
            }
        },
        updateSearchBy(key,val) {
            switch(this.navActive) {
                case "sla-koli":
                    this.searchSlaKoliBy = val;
                    this.searchSlaKoliPlaceholder = key;
                    break;
                case "sla-inter-activity":
                    this.searchSlaInterActivityBy = val;
                    this.searchSlaInterActivityPlaceholder = key;
                    break;
                case "sla-node-to-node-a":
                    this.searchSlaNodeToNodeABy = val;
                    this.searchSlaNodeToNodeAPlaceholder = key;
                    break;
                case "sla-node-to-node-b":
                    this.searchSlaNodeToNodeBBy = val;
                    this.searchSlaNodeToNodeBPlaceholder = key;
                    break;
                default:
            }
        },
    },
}
</script>