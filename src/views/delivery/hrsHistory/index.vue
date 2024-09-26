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
                            />
                        </vs-col>
                    </vs-row>
                </div>
                <template>
                    <transition name="slide-fade">
                        <hrs-history-table
                            :ref="'HRSTable'"
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
import NavItem from "@/components/navbar/navTab";
import Breadcrumb from "@/components/breadcrumb/index";
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
    },
    data() {
        return {
            title: "Handover Runsheet History",
            tempSearch: "",
            searchBy:"delivery_runsheet_number",
            searchPlaceholder: "Search Runsheet Number",
            searchParams: [
                {
                    label: "Runsheet Number",
                    value: "delivery_runsheet_number",
                },
                {
                    label: "DRI Number",
                    value: "dri_number",
                },
                {
                    label: "Courier Code",
                    value: "courier_code",
                },
                {
                    label: "Courier Name",
                    value: "courier_name",
                }
            ],
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
    },
};
</script>]
