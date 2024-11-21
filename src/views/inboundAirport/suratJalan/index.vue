<template>
    <div>
        <section>
            <vs-row>
                <vs-col xs="12" sm="4" lg="2">
                    <select-search-by 
                        :border="true"
                        :isMultiple="false"  
                        :selectedValue="filterDateBy" 
                        :valueData="dateParams" 
                        @updateSearchBy="updateFilterDateBy" 
                    />
                </vs-col>
                <vs-col xs="12" sm="4" lg="4">
                    <daterange-filter 
                        @searchDate="searchDate" 
                        size="small"
                    />
                </vs-col>
            </vs-row>
            <template>
                <transition name="slide-fade">
                    <SuratJalan
                        :ref="'SuratJalan'"
                        :dateFilter="tempDate"
                        :filterDateBy="filterDateBy"
                        :query="query"
                        :searchBy="searchBy"
                    />
                </transition>
            </template>
        </section>
    </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb/index";
import dateRange from "@/components/daterange/index";
import NavItem from "@/components/navbar/navTab";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
import SuratJalan from "@/views/inboundAirport/suratJalan/suratJalan";

export default {
    name: "airport-receiving-surat-jalan",
    props: {
        query: String,
        searchBy: String
    },
    components: {
        "nav-item": NavItem,
        breadcrumb: Breadcrumb,
        "search-input": SearchInput,
        "daterange-filter": dateRange,
        "select-search-by": SelectSearchBy,
        SuratJalan: SuratJalan,
    },
    data() {
        return {
            tempSearch: "",
            tempDate: [],
            filterDateBy: "create",
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
            ]
        };
    },
    methods: {
        refresh() {
            this.$refs.SuratJalan.refresh();
        },
        searchDate(val) {
            this.tempDate = val;
        },
        updateFilterDateBy(key,val) {
            this.filterDateBy = val;
        },
    },
};
</script>
