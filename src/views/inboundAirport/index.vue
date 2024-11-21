<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <template v-if="navActive === 'k-PREALERT'">
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
                                RECEIVING
                            </vs-button>
                        </div>
                    </div>
                </vs-col>
            </template>
        </vs-row>
        <section>
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" :w="`${navActive === 'k-PERMISSIONS'?'4':'12'}`">
                    <div class="box view">
                        <vs-row justify="space-between">
                            <vs-col xs="12" sm="12" lg="6">
                                <nav-item 
                                    :navItem="navItem" 
                                    @activeTab="activeTab" 
                                />
                            </vs-col>
                            <vs-col xs="12" sm="12" lg="6">
                                <template v-if="navActive === 'k-PREALERT'">
                                    <vs-row justify="end">
                                        <vs-col xs="6" sm="8" lg="4">
                                            <select-search-by 
                                                key="searchPreAlertBy"
                                                :border="true" 
                                                :isMultiple="false" 
                                                :selectedValue="searchPreAlertBy" 
                                                :valueData="searchPreAlertParams" 
                                                @updateSearchBy="updateSearchBy" 
                                            />
                                        </vs-col>
                                        <vs-col xs="6" sm="4" lg="4">
                                            <search-input 
                                                key="searchInput"
                                                ref="searchInput" 
                                                :placeholder="searchPreAlertPlaceholder"
                                                @searchValue="searchValue"
                                            />
                                        </vs-col>
                                    </vs-row>
                                </template>
                                <template v-if="navActive === 'k-SURATJALAN'" >
                                    <vs-row justify="end">
                                        <vs-col xs="6" sm="8" lg="4">
                                            <select-search-by 
                                                key="searchSuratJalanBy"
                                                :border="true" 
                                                :isMultiple="false" 
                                                :selectedValue="searchSuratJalanBy" 
                                                :valueData="searchSuratJalanParams" 
                                                @updateSearchBy="updateSearchBy" 
                                            />
                                        </vs-col>
                                        <vs-col xs="6" sm="4" lg="4">
                                            <search-input 
                                                key="searchInput"
                                                ref="searchInput" 
                                                :placeholder="searchSuratJalanPlaceholder"
                                                @searchValue="searchValue"
                                            />
                                        </vs-col>
                                    </vs-row>
                                </template>
                            </vs-col>
                        </vs-row>
                        <template v-if="navActive === 'k-PREALERT'">
                            <transition name="slide-fade">
                                <inbound-incoming 
                                    :ref="navActive"
                                    :query="tempSearch"
                                    :searchBy="searchPreAlertBy"
                                />
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-SURATJALAN'">
                            <transition name="slide-fade">
                                <sj-list
                                    :ref="navActive"
                                    :query="tempSearch"
                                    :searchBy="searchSuratJalanBy"
                                />
                            </transition>
                        </template>
                    </div>
                </vs-col>
            </vs-row>
        </section>
    </div>
</template>
<script>
import master from "@/mixins/master"

import Breadcrumb from "@/components/breadcrumb/index";
import NavItem from "@/components/navbar/navTab";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";

import InboundIncoming from "@/views/inboundAirport/prealert/";
import SuratJalan from "@/views/inboundAirport/suratJalan";

export default {
    name:"Receiving-Airport",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "inbound-incoming": InboundIncoming,
        "sj-list": SuratJalan,
    },
    data() {
        return {
            navItem: [
                {
                    label: "PREALERT",
                    key: "k-PREALERT",
                    title: "Airport Receiving"
                },
                {
                    label: "SURAT JALAN",
                    key: "k-SURATJALAN",
                    title: "Surat Jalan"
                }
            ],
            navActive: "k-PREALERT",
            title: "Airport Receiving",
            tempSearch: "",

            searchSuratJalanPlaceholder: "Search Manifest DO Number",
            searchSuratJalanBy: "manifest_do_number",
            searchSuratJalanByDataType: false,
            searchSuratJalanParams: [
                {
                    label: 'Manifest DO Number',
                    value: 'manifest_do_number'
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

            searchPreAlertPlaceholder: "Search Inbound Number",
            searchPreAlertBy: "inbound_number",
            searchPreAlertByDataType: false,
            searchPreAlertParams: [
                {
                    label: "Inbound Number",
                    value: "inbound_number",
                },
                {
                    label: "Vehicle",
                    value: "vehicle_type_name",
                },
                {
                    label: "Origin",
                    value: "inbound_node_name_origin",

                },
                {
                    label: "Bag",
                    value: "inbound_total_bag",

                },
                {
                    label: "Koli",
                    value: "inbound_total_koli",

                },
                {
                    label: "Weight",
                    value: "inbound_total_weight",

                },
                {
                    label: "PIC",
                    value: "carrier_employee_name",
                },
                {
                    label: "Status",
                    value: "status",
                },
                {
                    label: "Received At",
                    value: "inbound_node_name_receiver",
                }
            ],
        }
    },
    methods: {
        updateSearchBy(key, val, dataType) {
            switch(this.navActive) {
                case "PREALERT":
                    this.searchPreAlertBy = val;
                    this.searchPreAlertPlaceholder = key;
                    this.searchPreAlertByDataType = dataType;
                    this.clearSearch();
                    break;
                case "SJ":
                    this.searchSuratJalanBy = val;
                    this.searchSuratJalanPlaceholder = key;
                    this.searchSuratJalanByDataType = dataType;
                    this.clearSearch();
                    break;
                default:
            }
        },
        searchValue (val) {
            this.tempSearch = val;
        },
        clearSearch() {
            this.$refs.searchInput.clear();
        },
        activeTab(val) {
            this.navActive = val;
            this.clearSearch();

            let item = this.navItem.filter(item => {
                return item.key == val;
            })
            this.title = item[0].title;
        },
        openDialog(){
            this.$router.push('inbound-airport/scan');
        },
    },
}
</script>