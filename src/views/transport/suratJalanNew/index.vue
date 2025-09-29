<template>
    <div>
        <div style="position: absolute; top: 0; right: 0; width: 100px;">
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

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="end">
                        <vs-col xs="12" sm="12" lg="6">
                            <vs-row justify="end">
                                <vs-col xs="6" sm="8" lg="4">
                                    <select-search-by 
                                        :key="listenBreadcrumbTitle"
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
                                    <date-time 
                                        :name="''" 
                                        :rules="''" 
                                        :formKey="'DATE_TIME_WITHOUT_SECONDS'" 
                                        :valueData="tempDate"
                                        typeInput="datetimerange" 
                                        @updateValue="searchDate" 
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
                            :sj_type="listenBreadcrumbCode"
                            :filterDateBy="filterDateBy"
                            :status="filterStatusBy"
                            :title="listenBreadcrumbTitle"
                        />
                    </transition>
                </template>
            </div>
        </section>

        <div v-if="true">
            <dialogCreateSuratJalanV2
                btnBlue="Approve"
                :title="`Transport ${listenBreadcrumbTitle}`"
                :breadcrumb="`${listenBreadcrumbTitle}`"
                :active="dialogSuratJalan"
                :closeDialog="closeDialogSuratJalan"
                :sj_type="listenBreadcrumbCode"
                @refresh="refresh"
            />
        </div>
        <div v-else>
            <dialogCreateSuratJalan
                btnBlue="Approve"
                :title="`Transport ${listenBreadcrumbTitle}`"
                :active="dialogSuratJalan"
                :closeDialog="closeDialogSuratJalan"
                @refresh="refresh"
            />
        </div>        
    </div>
</template>

<script>

import Breadcrumb from "@/components/breadcrumb/index";
import DateRange from "@/components/daterange/index";
import NavItem from "@/components/navbar/navTab";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
import DateTime from "@/components/input/dateTime";

import SuratJalan from "@/views/transport/suratJalanNew/suratJalan";
import DialogCreateSuratJalan from "@/views/transport/suratJalanNew/dialogCreateSuratJalan";
import DialogCreateSuratJalanV2 from "@/views/transport/suratJalanNew/dialogCreateSuratJalanV2";


export default {
    name: "transport-surat-jalan-new",
    components: {
        "breadcrumb": Breadcrumb,
        "daterange-filter": DateRange,
        "nav-item": NavItem,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "date-time": DateTime,

        "SuratJalan": SuratJalan,
        "dialogCreateSuratJalan": DialogCreateSuratJalan,
        "dialogCreateSuratJalanV2": DialogCreateSuratJalanV2,
    },
    data() {
        return {
            dialogSuratJalan: false,
            tempSearch: "",            
            searchPlaceholder: "Search Surat Jalan",
            searchBy:"manifest do number",
            searchParams: [],
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
                    label: 'UNAPPROVED',
                    value: 'UNAPPROVED'
                },
                {
                    label: 'APPROVED',
                    value: 'APPROVED'
                },
                {
                    label: 'CANCELED',
                    value: 'CANCELED'
                },
                {
                    label: 'UNRECEIVED',
                    value: 'UNRECEIVED'
                },
                {
                    label: 'RECEIVED',
                    value: 'RECEIVED'
                },
                {
                    label: 'MISSROUTE RECEIVED',
                    value: 'MISSROUTE RECEIVED'
                }
            ],
        };
    },
    computed: {
        listenBreadcrumbTitle() {
            return this.$route.meta.breadCrumb;
        },
        listenBreadcrumbCode() {
            return this.$route.meta.breadCrumbCode || "";
        },
    },
    watch: {
        searchBy(old, val) {
            if (old !== val) {
                this.$nextTick(() => {
                    this.refresh();
                });
            }
        },
        listenBreadcrumbTitle: {
            handler(val, oldVal) {
                if (val !== oldVal && val !== undefined) {
                    this.setSearchParams();
                }
            },
            immediate: true
        },
    },
    methods: {
        setSearchParams() {
            
            this.searchParams = [
                {
                    label: `No ${this.listenBreadcrumbTitle}`,
                    value: 'manifest do number'
                },
                {
                    label: 'Orion Number',
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
            ]
        },
        refresh() {
            this.$refs.SuratJalan.refresh();
        },
        searchValue(val) {
            this.tempSearch = val;
        },
        searchDate(formKey, val) {
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
                this.$refs.searchInput.clear();
            });
        }
    },
    mounted() {
        this.createNewShortcut()
    }
};
</script>

