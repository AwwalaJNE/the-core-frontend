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
              <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy" :valueData="searchParams" :selectedValue="searchBy" />
            </vs-col>
            <vs-col xs="6" sm="4" lg="2">
              <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" @handleSearch="handleSearch" />
            </vs-col>
          </vs-row>
        </div>
        <template>
          <transition name="slide-fade">
            <hrs-table
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

import HRSTable from "@/views/delivery/hrs/hrsTable";

export default {
  name: "hrs",
  mixins: [master],
  components: {
    "nav-item": NavItem,
    breadcrumb: Breadcrumb,
    "search-input": SearchInput,
    "select-search-by" : SelectSearchBy,
    "hrs-table": HRSTable
  },
  data() {
    return {
      title: "Handover Runsheet",
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
</script>
<style lang="scss">
.mb-15 {
  margin-bottom: 1.5em;
}
</style>
