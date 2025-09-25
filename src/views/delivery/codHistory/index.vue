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
          <vs-row>
            <vs-col xs="12" sm="12" lg="7" style="margin-bottom: 0.5em;">
              <daterange-filter :formKey="'DATE_TIME_WITHOUT_SECONDS'" typeInput="datetimerange" @searchDate="searchDate" size="small" />
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
                  class="search-input"
                  :placeholder="searchPlaceholder"
                  @searchValue="searchValue"
                  @handleSearch="handleSearch"
                />
              </vs-col>
          </vs-row>
        </div>
        <template>
          <transition name="slide-fade">
            <DeliveryCodHistoryTable
              :ref="'DeliveryCodHistoryTable'"
              :dateFilter="tempDate"
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
import dateRange from "@/components/daterange/index";
import SelectSearchBy from "@/components/search/selectSearchBy";

import DeliveryCodHistoryTable from "@/views/delivery/codHistory/codHistoryTable";

export default {
  name: "Cod-History",
  mixins: [master],
  components: {
    "nav-item": NavItem,
    breadcrumb: Breadcrumb,
    "search-input": SearchInput,
    "daterange-filter": dateRange,
    DeliveryCodHistoryTable: DeliveryCodHistoryTable,
    "select-search-by": SelectSearchBy,
  },
  data() {
    return {
      title: "Deposit COD History",
      tempSearch: "",
      tempDate: [],
      searchBy: "sco_number",
      searchPlaceholder: "Search SCO Number",
      filterValues: [
        {
          label: "SCO Number",
          value: "sco_number",
        },
        {
          label: "HRS Number",
          value: "hrs_number",
        },
        {
          label: "DRI Number",
          value: "dri_number",
        },
        {
          label: "Runsheet",
          value: "delivery_runsheet_number",
        },
        {
          label: "Cashier Name",
          value: "cashier_name",
        },
        {
          label: "Courier Name",
          value: "courier_name",
        },
        {
          label: "Courier Code",
          value: "courier_code",
        },
      ],
    };
  },
  methods: {
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
    refresh() {
        this.$refs.DeliveryCodHistoryTable.refresh();
    },
    handleSearch() {
        this.$nextTick(() => {
            this.refresh();
            this.$refs.searchInput.clear();
        });
    }
  },
};
</script>
