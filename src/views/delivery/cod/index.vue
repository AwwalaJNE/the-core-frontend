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
            <vs-col xs="12" sm="12" lg="7" style="margin-bottom: 0.5rem;">
              <daterange-filter @searchDate="searchDate" size="small" />
            </vs-col>
            <vs-col xs="6" sm="8" lg="3">
              <select-search-by
                :valueData="filterValues"
                :isMultiple="false"
                :border="true"
                :selectedValue="searchBy"
                @updateSearchBy="updateSearchBy"
              />
            </vs-col>
            <vs-col xs="6" sm="4" lg="2">
              <search-input
                ref="searchInput"
                @searchValue="searchValue"
                :placeholder="searchPlaceholder"
              />
            </vs-col>
          </vs-row>
        </div>
        <template>
          <transition name="slide-fade">
            <DeliveryCodTable
              :ref="'DeliveryCodTable'"
              :dateFilter="tempDate"
              :query="tempSearch"
              :searchBy="searchBy"
              @openDialog="openDialog"
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
import DateRange from "@/components/daterange/index";

import DeliveryCodTable from "@/views/delivery/cod/codTable";

export default {
  name: "Inbound-List",
  mixins: [master],
  components: {
    "nav-item": NavItem,
    breadcrumb: Breadcrumb,
    "search-input": SearchInput,
    DeliveryCodTable: DeliveryCodTable,
    "select-search-by": SelectSearchBy,
    "daterange-filter": DateRange,
  },
  data() {
    return {
      title: "Deposit COD",
      tempSearch: "",
      tempDate: [],
      searchBy: "hrs_number",
      searchPlaceholder: "Search HRS Number",
      filterValues: [
        {
          label: "HRS Number",
          value: "hrs_number",
        },
        {
          label: "Courier Name",
          value: "courier_name",
        },
        {
          label: "Courier Code",
          value: "courier_code",
        },
        {
          label: "Runsheet",
          value: "delivery_runsheet_number",
        },
        {
          label: "DRI Number",
          value: "dri_number",
        },
      ],
    };
  },
  methods: {
    refresh() {
      this.$refs.DeliveryCodTable.refresh(); // trigger function refresh form dari luar component list
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
    updateSearchBy(key, val) {
      this.searchBy = val;
      this.searchPlaceholder = key;
    },
  },
};
</script>