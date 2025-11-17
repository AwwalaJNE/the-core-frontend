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
                      <template v-if="navActive === 'Stock'">
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
                      </template>
                    <template v-else-if="navActive === 'k-SCHEDULE'">
                        <div style="width: 100px;padding-right: 5px;">
                            <vs-button
                                flat
                                block
                                :active="true"
                                :data-testid="`sync-button-${navActive}`"
                                @click="openSyncDialog"
                            > 
                                Sync API
                            </vs-button>
                        </div>
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
                      </template>
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
                            <template v-if="navActive === 'Stock' && !loading">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by
                                            key="searchByStock"
                                            :border="true"
                                            :isMultiple="false"
                                            :selectedValue="searchByStock" 
                                            :valueData="searchParamsStock" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            class="search-input"
                                            key="searchInput"
                                            ref="searchInput"  
                                            :placeholder="searchPlaceholderStock" 
                                            @searchValue="searchValue"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                            <template v-else-if="navActive === 'k-SCHEDULE' && !loading">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by
                                            key="searchBySchedule"
                                            :border="true"
                                            :isMultiple="false"
                                            :selectedValue="searchBySchedule" 
                                            :valueData="searchParamsShedule" 
                                            @updateSearchBy="updateSearchBy" 
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input 
                                            class="search-input"
                                            key="searchInput"
                                            ref="searchInput"  
                                            :placeholder="searchPlaceholderShedule" 
                                            @searchValue="searchValue"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                        </vs-col>
                    </vs-row>
                </div>
                    <template v-if="navActive === 'Stock'">
                        <transition name="slide-fade">
                            <stock-table
                                :ref="navActive" 
                                :query="tempSearch" 
                                :searchBy="searchByStock"
                            />
                        </transition>
                    </template>
                    <template v-else-if="navActive === 'k-SCHEDULE'">
                        <transition name="slide-fade">
                            <schedule-table 
                                :ref="navActive" 
                                :query="tempSearch"
                                :searchBy="searchBySchedule"
                            />
                        </transition>
                    </template>
            </div>
        </section>
        <dialog-create-edit-stock
            title="Create Surat Muatan Stock"
            source="setting"
            :active="dialogActiveStock"
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
        <dialog-create-edit-schedule
            title="Create Surat Muatan Schedule"
            :active="dialogActiveSchedule"
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
        <dialog-sync-filter
        title="Sync Filter"
        :actived="dialogSyncActive"
        :closeDialog="closeSyncDialog"
         @refresh="refresh"
         @dataSyncCompleted="handleDataSyncCompleted"
        />
    </div>
</template>
<script>

import Breadcrumb from "@/components/breadcrumb/index";
import NavItem from "@/components/navbar/navTab";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";

import DialogCreateEditStock from "@/views/settings/suratMuatan/stock/dialogCreateEdit";
import StockTable from "@/views/settings/suratMuatan/stock/index";


import DialogCreateEditSchedule from "@/views/settings/suratMuatan/schedule/dialogCreateEdit";
import DialogSync from "@/views/settings/suratMuatan/schedule/dialogSync";
import ScheduleTable from "@/views/settings/suratMuatan/schedule/index";

import master from "@/mixins/master";

export default {
    name:"surat-muatan-settings-index",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "stock-table": StockTable,
        "dialog-create-edit-stock": DialogCreateEditStock,
        "schedule-table": ScheduleTable,
        "dialog-create-edit-schedule": DialogCreateEditSchedule,
        "dialog-sync-filter": DialogSync,
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "Stock",
                    key: "Stock",
                    title: "Stock"
                },
                {
                    label: "Schedule",
                    key: "k-SCHEDULE",
                    title: "Schedule"
                },
            ],
            title:"Stock",
            navActive: "Stock",
            loading: false,
            tempSearch: "",
            dialogActiveStock: false,
            searchPlaceholderStock: "Search Surat Muatan",
            searchByStock: "no_sm",
            searchParamsStock: [
                {
                    label: "Surat Muatan",
                    value: "no_sm"
                },
                {
                    label: "Vehicle Name",
                    value: "vehicle_name"
                },
                {
                    label: "Vehicle Mode",
                    value: "vehicle_mode"
                }
            ],
            searchPlaceholderShedule: "Search Vehicle",
            searchBySchedule: "vehicle",
            searchParamsShedule: [
                {
                    label: "Vehicle",
                    value: "vehicle",
                },
                {
                    label: "Origin",
                    value: "origin",
                },
                {
                    label: "Destination",
                    value: "destination",
                },
                {
                    label: "Vehicle Info",
                    value: "vehicle_info",
                },
                {
                    label: "Reg No",
                    value: "registration_number",
                }
            ],
            dialogActiveSchedule:false,
            dialogSyncActive: false,
            refreshInject: ""
        }
    },
    methods: {
         refresh(){
            let el = this.refreshInject; // Dapatkan ref yang akan direfresh
            if (this.$refs[el] && typeof this.$refs[el].refresh === 'function') {
                this.$refs[el].refresh();
            } else {
                console.warn(`[index.vue refresh] Ref '${el}' not found or refresh method is not available. Current navActive: ${this.navActive}`);
            }
        },
        searchValue (val) {
            this.tempSearch = val
        },
        clearSearch() {
            this.tempSearch = "";
            if (this.$refs.searchInput) {
                this.$refs.searchInput.clear();
            }
        },
        activeTab(val) {
            this.loading = true;
            this.navActive = val;
            this.clearSearch();

            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title;
            
            this.$nextTick(() => {
                setTimeout(() => {
                    this.loading = false;
                    
                }, 300);
            });
        },
        openDialog(){
            switch(this.navActive) {
                case "Stock":
                    this.dialogActiveStock = true
                    break;
                case "k-SCHEDULE":
                    this.dialogActiveSchedule = true
                    break;
                default:
            }
            this.refreshInject = this.navActive
        },
        openSyncDialog() {
            this.dialogSyncActive = true;
            this.refreshInject = 'k-SCHEDULE';
        },
        closeSyncDialog() {
            this.dialogSyncActive = false
        },
        closeDialog() {
            switch(this.navActive) {
                case "Stock":
                    this.dialogActiveStock = false
                    this.clearSearch();
                    break;
                case "k-SCHEDULE":
                    this.dialogActiveSchedule = false
                    this.clearSearch();
                    break;
                default:
            }
        },
        updateSearchBy(key, val) {
            switch(this.navActive) {
                case "Stock":
                    this.searchByStock = val;
                    this.searchPlaceholderStock = key;
                    this.clearSearch()
                    break;
                case "k-SCHEDULE":
                    this.searchBySchedule = val;
                    this.searchPlaceholderSchedule = key;
                    this.clearSearch()
                default:         
            }
        },
        handleDataSyncCompleted() {
            console.log('Data Sync berhasil di DialogSync. Memicu refresh tabel jadwal.');
            // Pastikan tab Schedule aktif dan referensi ada sebelum merefresh
            if (this.navActive === 'k-SCHEDULE') { // Hanya refresh jika tab schedule aktif
                this.refreshInject = 'k-SCHEDULE'; // Pastikan refreshInject diatur
                this.refresh(); // Memanggil metode refresh yang akan memicu refresh pada ScheduleTable
            } else {
                console.warn("Sync completed but Schedule tab is not active. Not refreshing table.");
            }
        }
    },
}
</script>