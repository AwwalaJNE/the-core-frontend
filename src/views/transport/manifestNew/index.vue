<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    <div style="width: 100px;padding-right: 5px;">
                        <vs-button 
                            flat 
                            square 
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
                    <vs-row justify="end">
                        <vs-col xs="12" sm="12" lg="6">
                            <vs-row justify="end">
                                <vs-col xs="6" sm="8" lg="4">
                                    <select-search-by 
                                        :border="true"
                                        :isMultiple="false" 
                                        :selectedValue="searchBy" 
                                        :valueData="searchParams" 
                                        @updateSearchBy="updateSearchBy" 
                                    />
                                </vs-col>
                                <vs-col xs="6" sm="4" lg="4">
                                    <search-input 
                                        ref="searchInput" 
                                        :placeholder="searchPlaceholder"
                                        @searchValue="searchValue"
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                    </vs-row>
                    <vs-row justify="flex-start">
                        <vs-col xs="6" sm="4" lg="3">
                            <template>
                                <vs-select
                                    class="m-select"
                                    filter
                                    placeholder="Select status"
                                    v-model="filterStatusBy"
                                    :border="true"
                                    :multiple="true"
                                    @change="updateFilterStatus"
                                >
                                    <template>
                                        <vs-option
                                            v-for="(item,key) in filterStatus"
                                            :key="key"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                            {{item.label}}
                                        </vs-option>
                                    </template>
                                </vs-select>
                            </template>
                        </vs-col>
                        <vs-col xs="6" sm="4" lg="3">
                            <template>
                                <vs-select
                                    class="m-select"
                                    filter
                                    placeholder="Select Route"
                                    v-model="filterIsTransitBy"
                                    :border="true"
                                    :multiple="true"
                                    @change="updateFilterIsTransit"
                                >
                                    <template>
                                        <vs-option
                                            v-for="(item,key) in filterIsTransit"
                                            :key="key"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                            {{item.label}}
                                        </vs-option>
                                    </template>
                                </vs-select>
                            </template>
                        </vs-col>
                        <vs-col xs="12" sm="12" lg="6" >
                            <vs-row>
                                <vs-col w="4">
                                    <select-search-by 
                                        :border="true" 
                                        :isMultiple="false" 
                                        :selectedValue="filterDateBy" 
                                        :valueData="dateParams" 
                                        @updateSearchBy="updateFilterDateBy" 
                                    />
                                </vs-col>
                                <vs-col w="8">
                                    <daterange-filter 
                                        size="small" 
                                        :valueData="tempDate"
                                        @searchDate="searchDate" 
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                    </vs-row>
                    
                    
                </div>
                <template>
                    <transition name="slide-fade">
                        <SuratMuatan
                            ref="SuratMuatan"
                            :dateFilter="tempDate"
                            :filterDateBy="filterDateBy"
                            :query="tempSearch"
                            :searchBy="searchBy"
                            :status="filterStatusBy"
                            :isTransit="filterIsTransitBy"
                        />
                    </transition>
                </template>
            </div>
        </section>

        <SuratMuatanDialog
            title="Create Surat Muatan"
            :active="dialogSuratMuatan"
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
    </div>
</template>
<script>
import master from "@/mixins/master";
import Breadcrumb from "@/components/breadcrumb/index";
import dateRange from "@/components/daterange/index";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";

import SuratMuatan from "@/views/transport/manifestNew/manifest";
import SuratMuatanDialog from "@/views/transport/manifestNew/dialogCreateEditManifest";

export default {
    name: "transport-surat-muatan-new",
    mixins: [master],
    components: {
        breadcrumb: Breadcrumb,
        "daterange-filter": dateRange,
        "search-input": SearchInput,
        "select-search-by" : SelectSearchBy,

        SuratMuatan: SuratMuatan,
        SuratMuatanDialog: SuratMuatanDialog,
    },
    data() {
        return {
            title: "Surat Muatan",
            tempSearch: this.$ls.get('manifestFilter')?.tempSearch || "",
            tempDate: this.$ls.get('manifestFilter')?.tempDate || [],
            dialogSuratMuatan: false,
            DataNode: [],
            DataStatus: [
                {
                    label: "Confirm",
                    value: "Confirm",
                },
            ],
            node_request: "",
            status_pickup: "",
            searchBy: this.$ls.get('manifestFilter')?.searchBy || "manifest_number",
            filterDateBy: this.$ls.get('manifestFilter')?.filterDateBy || "create",
            searchPlaceholder: this.$ls.get('manifestFilter')?.searchPlaceholder || "Search Manifest Number",
            searchParams: [
                {
                    label: 'Manifest Number',
                    value: 'manifest_number'
                },
                {
                    label: 'Type SM',
                    value: 'manifestMethod'
                },
                {
                    label: 'Jenis Kiriman',
                    value: 'vehicleType'
                },
                {
                    label: 'Origin',
                    value: 'origin'
                },
                {
                    label: 'Destination',
                    value: 'destination'
                },
                {
                    label: 'Weight',
                    value: 'weight'
                },
                {
                    label: 'Status',
                    value: 'status'
                }
            ],
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                },
                {
                    label: 'ETD',
                    value: 'etd'
                },
                {
                    label: 'ETA',
                    value: 'eta'
                }
            ],
            filterStatusBy: this.$ls.get('manifestFilter')?.filterStatusBy || "",
            filterStatus: [
                {
                    label: 'READY',
                    value: 'READY'
                },
                {
                    label: 'CANCELED',
                    value: 'CANCELED'
                },
                {
                    label: 'DEPARTED',
                    value: 'DEPARTED'
                },
                {
                    label: 'RECEIVED',
                    value: 'RECEIVED'
                },
                {
                    label: 'MISSROUTE RECEIVED',
                    value: 'MISSROUTE RECEIVED'
                },
                {
                    label: 'INFO',
                    value: 'INFO'
                }
            ],
            filterIsTransitBy: this.$ls.get('manifestFilter')?.filterIsTransitBy || "",
            filterIsTransit: [
                {
                    label: 'TRANSIT',
                    value: '1'
                },
                {
                    label: 'DIRECT',
                    value: '0'
                },
            ],
        };
    },
    watch: {
        searchBy(old, val) {
            if (old !== val) {
                this.$nextTick(() => {
                    this.refresh();
                });
            }
        },
    },
    methods: {
        updateLocalStorage() {
            this.$ls.set('manifestFilter', {
                filterDateBy: this.filterDateBy,
                tempDate: this.tempDate,
                tempSearch: this.tempSearch,
                filterIsTransitBy: this.filterIsTransitBy,
                searchBy: this.searchBy,
                searchPlaceholder: this.searchPlaceholder,
                filterStatusBy: this.filterStatusBy,
            });
        },
        refresh() {
            this.$refs.SuratMuatan.refresh();
        },
        searchValue(val) {
            this.tempSearch = val;
            this.updateLocalStorage();
        },
        searchDate(val) {
            this.tempDate = val;
            this.updateLocalStorage();
        },
        closeDialog() {
            this.dialogSuratMuatan = false;
            this.refresh();
        },
        openDialog() {
            this.dialogSuratMuatan = true;
            this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible", false);
        },        
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
            this.updateLocalStorage();
        },
        updateFilterDateBy(key,val) {
            this.filterDateBy = val;
            this.updateLocalStorage();
        },
        updateFilterStatus(key){
            this.updateLocalStorage();
            this.refresh()
        },
        updateFilterIsTransit(key){
            this.updateLocalStorage();
            this.refresh()
        },
        createNewShortcut() {
            const keysPressed = {};

            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                    e.preventDefault();
                }

                keysPressed[e.key.toLowerCase()] = true;
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && keysPressed['s'] && keysPressed['m']) {
                    e.preventDefault();
                    this.openDialog();
                }
            });

            document.addEventListener('keyup', (e) => {
                keysPressed[e.key.toLowerCase()] = false;
            });
        },
    },
    mounted() {
        this.createNewShortcut()
    }
};
</script>