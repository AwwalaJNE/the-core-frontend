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
                        <template v-if="navActive === 'sla'">
                            <vs-button
                                flat
                                block
                                :active="true"
                                @click="openDialog"
                            > 
                                <i class="bx bx-plus"></i> New
                            </vs-button>
                        </template>
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
                            <template v-if="navActive === 'sla'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by 
                                            :isMultiple="false" 
                                            :border="true" 
                                            :valueData="searchParams" 
                                            :selectedValue="searchBy" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            ref="searchInput" 
                                            @searchValue="searchValue" 
                                            :placeholder="searchPlaceholder" 
                                            class="search-input"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'sla'">
                    <transition name="slide-fade">
                        <sla :ref="navActive" :query="tempSearch" :searchBy="searchBy"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'upload-sla'">
                    <transition name="slide-fade">
                        <upload-sla :ref="navActive"/>
                    </transition>
                </template>
            </div>
        </section>
        <dialog-create-edit-sla 
            :active="dialogSla" 
            @refresh="refresh"
            :closeDialog="closeDialogSla"
            title="Create SLA"
        />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import SelectSearchBy from "@/views/inventory/connote/item/selectSearchBy"

import Sla from "@/views/settings/sla/sla/index"
import DialogCreateEditSla from "@/views/settings/sla/sla/dialogCreateEditSla"
import UploadSla from "@/views/settings/sla/uploadSla/index"

export default {
    name:"sla-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "sla": Sla,
        "dialog-create-edit-sla": DialogCreateEditSla,
        "select-search-by": SelectSearchBy,
        "upload-sla": UploadSla
    },
    data() {
        return {
            navItemm: [
                {
                    label: "SLA",
                    key: "sla",
                    title: "SLA"
                },
                {
                    label: "Upload SLA",
                    key: "upload-sla",
                    title: "Upload SLA"
                }
            ],
            title:"SLA",
            navActive: "sla",
            tempSearch: "",
            dialogNode: false,
            dialogSla: false,
            searchPlaceholder: "Search Group Name",
            searchBy: "group_name",
            searchParams: [
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
                case "sla":
                    this.dialogSla = true
                    break;
                case "upload-sla":
                    this.dialogNodeType = true
                    break;
                default:
            }
            this.refreshInject = this.navActive
        },
        closeDialogSla() {
            this.dialogSla = false
        },
        updateSearchBy(key,val) {
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
    },
}
</script>