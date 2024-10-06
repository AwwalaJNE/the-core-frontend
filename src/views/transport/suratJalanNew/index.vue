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
                                        :isMultiple="false" 
                                        :border="true" 
                                        :valueData="searchParams" 
                                        :selectedValue="searchBy" 
                                        @updateSearchBy="updateSearchBy" 
                                    />
                                </vs-col>
                                <vs-col xs="6" sm="4" lg="4">
                                    <search-input 
                                        ref="searchInput" 
                                        :placeholder="searchPlaceholder"
                                        @searchValue="searchValue"
                                        @handleSearch="handleSearch"
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                    </vs-row>
                    <vs-row justify="flex-start">
                        <vs-col xs="6" sm="4" lg="3">
                            <template>
                                <vs-select
                                    filter
                                    class="m-select"
                                    v-model="filterStatusBy"
                                    placeholder="Select status"
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
                        <vs-col xs="12" sm="12" lg="6" >
                            <vs-row>
                                <vs-col w="4">
                                    <select-search-by 
                                        :isMultiple="false" 
                                        :border="true"  
                                        :valueData="dateParams" 
                                        :selectedValue="filterDateBy" 
                                        @updateSearchBy="updateFilterDateBy"
                                    />
                                </vs-col>
                                <vs-col w="8">
                                    <daterange-filter 
                                        size="small" 
                                        @searchDate="searchDate" 
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>                        
                    </vs-row>
                </div>
                <template>
                    <transition name="slide-fade">
                        <SuratJalan
                            :ref="'SuratJalan'"
                            :dateFilter="tempDate"
                            :query="tempSearch"
                            :searchBy="searchBy"
                            :filterDateBy="filterDateBy"
                            :status="filterStatusBy"
                        />
                    </transition>
                </template>
            </div>
        </section>

        <dialogCreateSuratJalan
            btnBlue="Approve"
            title="Transport Surat Jalan"
            :active="dialogSuratJalan"
            :closeDialog="closeDialogSuratJalan"
            @refresh="refresh"
        />
    </div>
</template>

<script>

import Breadcrumb from "@/components/breadcrumb/index";
import DateRange from "@/components/daterange/index";
import NavItem from "@/components/navbar/navTab";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";

import SuratJalan from "@/views/transport/suratJalanNew/suratJalan";
import DialogCreateSuratJalan from "@/views/transport/suratJalanNew/dialogCreateSuratJalan";


export default {
    name: "transport-surat-jalan-new",
    components: {
        "breadcrumb": Breadcrumb,
        "daterange-filter": DateRange,
        "nav-item": NavItem,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,

        "SuratJalan": SuratJalan,
        "dialogCreateSuratJalan": DialogCreateSuratJalan,
    },
    data() {
        return {
            dialogSuratJalan: false,
            title: "Surat Jalan",
            tempSearch: "",            
            searchPlaceholder: "Search Manifest DO Number",
            searchBy:"manifest do number",
            searchParams: [
                {
                    label: 'Manifest DO Number',
                    value: 'manifest do number'
                },
                {
                    label: 'DO Number',
                    value: 'do_number'
                },
                {
                    label: 'Vehicle Type',
                    value: 'vehicle_type'
                },
                {
                    label: 'Driver',
                    value: 'pic'
                },
                {
                    label: 'Mode',
                    value: 'mode'
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
            filterDateBy:"create",
            tempDate: [],
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                },
                {
                    label: 'Departed Time',
                    value: 'departed_time'
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
            filterStatusBy: "",
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
                    label: 'INFO',
                    value: 'INFO'
                }
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
        refresh() {
            this.$refs.SuratJalan.refresh();
        },
        searchValue(val) {
            this.tempSearch = val;
        },
        searchDate(val) {
            this.tempDate = val;
        },
        clearSearch() {
            this.$refs.searchInput.clear();
        },
        closeDialogSuratJalan() {
            this.dialogSuratJalan = false;
            this.refresh();
        },
        openDialog() {
            this.dialogSuratJalan = true;
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key,val) {
            this.filterDateBy = val;
        },
        updateFilterStatus(key){
            this.refresh()
        },
        createNewShortcut() {
            const keysPressed = {};

            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                    e.preventDefault();
                }
                
                keysPressed[e.key.toLowerCase()] = true;
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && keysPressed['s'] && keysPressed['j']) {
                    e.preventDefault();
                    this.openDialog();
                }
            });

            document.addEventListener('keyup', (e) => {
                keysPressed[e.key.toLowerCase()] = false;
            });
        },
        handleSearch() {
            this.$nextTick(() => {
                this.refresh();
            });
        }
    },
    mounted() {
        this.createNewShortcut()
    }
};
</script>

