<template>
    <div>
        <section>
            <vs-row v-if="!isMobile">
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
import master from "@/mixins/master"

import Breadcrumb from "@/components/breadcrumb/index";
import dateRange from "@/components/daterange/index";
import DateTime from "@/components/input/dateTime"
import NavItem from "@/components/navbar/navTab";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
import SuratJalan from "@/views/inboundAirport/suratJalan/suratJalan";

export default {
    name: "airport-receiving-surat-jalan",
    mixins: [master],
    props: {
        query: String,
        searchBy: String
    },
    components: {
        "nav-item": NavItem,
        breadcrumb: Breadcrumb,
        "search-input": SearchInput,
        "date-time": DateTime,
        "select-search-by": SelectSearchBy,
        SuratJalan: SuratJalan,
    },
    data() {
        return {
            tempSearch:JSON.parse(localStorage.getItem("InboundAirportSuratJalanFilters"))?.tempSearch || '' ,
            tempDate: JSON.parse(localStorage.getItem("InboundAirportSuratJalanFilters"))?.tempDate || [],
            filterDateBy: JSON.parse(localStorage.getItem("InboundAirportSuratJalanFilters"))?.filterDateBy || 'create',
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
        searchDate(formKey, val) {
            this.tempDate = val;
        },
        updateFilterDateBy(key,val) {
            this.filterDateBy = val;
        },
    },
};
</script>
