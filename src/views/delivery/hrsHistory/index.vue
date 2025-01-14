<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }}</h2>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="end">
                        <vs-col xs="12" sm="12" lg="7">
                            <date-time 
                                typeInput="daterange"
                                :name="''" 
                                :rules="''" 
                                :formKey="'TRIGGER_DATE'"
                                :valueData="dateRange" 
                                @updateValue="updateValue" 
                            />
                        </vs-col>
                        <vs-col xs="6" sm="8" lg="3">
                            <select-search-by 
                                :border="true" 
                                :isMultiple="false" 
                                :selectedValue="searchBy" 
                                :valueData="searchParams" 
                                @updateSearchBy="updateSearchBy" 
                            />
                        </vs-col>
                        <vs-col xs="6" sm="4" lg="2">
                            <search-input 
                                ref="searchInput" 
                                :placeholder="searchPlaceholder" 
                                @searchValue="searchValue" 
                                @handleSearch="handleSearch"
                            />
                        </vs-col>
                    </vs-row>
                </div>
                <template>
                    <transition name="slide-fade">
                        <hrs-history-table
                            ref="HRSTable"
                            :dateFilter="dateRange"
                            :query="tempSearch"
                            :searchBy="searchBy"
                        />
                    </transition>
                </template>
            </div>
        </section>
    </div>
</template>
<script>
import master from "@/mixins/master";

import Breadcrumb from "@/components/breadcrumb/index";
import DateTime from "@/components/input/dateTime"
import NavItem from "@/components/navbar/navTab";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";

import HRSHistoryTable from "@/views/delivery/hrsHistory/hrsTable";

export default {
    name: "hrs-history",
    mixins: [master],
    components: {
        "breadcrumb": Breadcrumb,
        "hrs-history-table": HRSHistoryTable,
        "nav-item": NavItem,
        "search-input": SearchInput,
        "select-search-by" : SelectSearchBy,
        "date-time": DateTime,
    },
    data() {
        return {
            title: "Handover Runsheet History",
            tempSearch: "",
            searchBy:"handover_number",
            searchPlaceholder: "Search HRS Number",
            searchParams: [
                {
                    label: "HRS Number",
                    value: "handover_number"
                },
                {
                    label: "Orion Number",
                    value: "hrs_number"
                },
                {
                    label: "Courier",
                    value: "employee"
                }
            ],
            dateRange: [],
        };
    },
    methods: {
        searchValue(val) {
            this.tempSearch = val;
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateValue(key, val) {
            this.dateRange = val || undefined
        },
        clearSearch() {
            this.$refs.searchInput.clear();
            this.dateRange = [];
        },
        refresh() {
            this.$refs.HRSTable.refresh();
        },
        handleSearch() {
            this.$nextTick(() => {
                this.refresh();
                this.$refs.searchInput.clear();
            });
        }
    },
};
</script>]
