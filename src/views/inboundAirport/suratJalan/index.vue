<template>
  <div>
    <section class="nodes">
      <vs-row justify="space-between">
        <vs-col xs="12" sm="12" lg="6" class="mb-15">
          <vs-row>
            <vs-col w="4">
              <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy" :valueData="dateParams" :selectedValue="filterDateBy" />
            </vs-col>
            <vs-col w="8">
              <daterange-filter @searchDate="searchDate" size="small" />
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
      <template>
        <transition name="slide-fade">
          <SuratJalan
            :ref="'SuratJalan'"
            :dateFilter="tempDate"
            :query="query"
            :searchBy="searchBy"
            :filterDateBy="filterDateBy"
          />
        </transition>
      </template>
    </section>
  </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab";
import Breadcrumb from "@/components/breadcrumb/index";
import SearchInput from "@/components/search/searchInput";
import dateRange from "@/components/daterange/index";
import SelectSearchBy from "@/components/search/selectSearchBy";

import SuratJalan from "@/views/inboundAirport/suratJalan/suratJalan";

export default {
  name: "receiving-bandara-surat-jalan",
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
      filterDateBy:"create",
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
      this.$refs.SuratJalan.refresh(); // trigger function refresh form dari luar component list
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
<style lang="scss">
.mb-15 {
  margin-bottom: 1.5em;
}
.custom-title {
  padding: 0.6em;
  text-align: right;
  font-weight: 600;
}
</style>
