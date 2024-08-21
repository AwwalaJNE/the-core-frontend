<template>
  <div>
    <vs-row justify="space-between">
      <vs-col xs="6" sm="4" lg="4">
        <div class="titlePage">
          <breadcrumb />
          <h2>{{ title }}</h2>
        </div>
      </vs-col>
      <vs-col xs="6" sm="3" lg="3">
        <div style="position:relative;display:flex;justify-content: flex-end;">
          <div style="width: 100px;padding-right: 5px;">
            <vs-button
              flat
              block
              :active="true"
              @click="openDialog"
            > 
              <i class="bx bx-plus"></i> New
            </vs-button>
          </div>
        </div>
      </vs-col>
    </vs-row>

    <section class="nodes">
      <div class="box view">
        <div class="nav-box">
          <vs-row justify>
            <vs-col xs="6" sm="2" lg="2" class="mb-15">
              <vs-input v-model="tempDate" type="date" />
            </vs-col>
            <vs-col  offset="4" xs="12" sm="12" lg="6">
              <vs-row justify="end">
                <vs-col xs="6" sm="8" lg="4">
                  <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy" :valueData="searchParams" :selectedValue="searchBy" />
                </vs-col>
                <vs-col xs="6" sm="4" lg="4">
                  <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </div>
        <template>
          <transition name="slide-fade">
            <DeliveryRunsheetTable
              :ref="'DeliveryRunsheetTable'"
              :node="node_request"
              :dateFilter="tempDate"
              :query="tempSearch"
              :searchBy="searchBy"
              :filterDateBy="filterDateBy"
            />
          </transition>
        </template>
      </div>
    </section>

    <dialog-create-runsheet
      title="Create New Runsheet"
      :active="dialogCreateRunsheet" 
      :closeDialog="closeDialog"
      @refresh="refresh"    
    />
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import master from "@/mixins/master";
import NavItem from "@/components/navbar/navTab";
import Breadcrumb from "@/components/breadcrumb/index";
import SearchInput from "@/components/search/searchInput";
import dateRange from "@/components/daterange/index";
import SelectSearchBy from "@/components/search/selectSearchBy";

import DeliveryRunsheetTable from "@/views/delivery/runsheet/runsheetTable";
import DialogCreateRunsheet from "@/views/delivery/runsheet/dialogCreateRunsheet";

export default {
  name: "Inbound-List",
  mixins: [master],
  components: {
    "nav-item": NavItem,
    breadcrumb: Breadcrumb,
    "search-input": SearchInput,
    "daterange-filter": dateRange,
    "select-search-by" : SelectSearchBy,
    DeliveryRunsheetTable: DeliveryRunsheetTable,
    "dialog-create-runsheet": DialogCreateRunsheet
  },
  data() {
    return {
      title: "Assign",
      tempSearch: "",
      tempDate: moment().format("YYYY-MM-DD"),
      DataNode: [],
      node_request: "",
      node_origin: "",
      node_destination: "",
      searchBy:"delivery runsheet number",
      filterDateBy:"create",
      searchPlaceholder: "Search Manifest Number",
      searchParams: [
        {
          label: "Runsheet Number",
          value: "delivery runsheet number",
        },
        {
          label: "DRI Number",
          value: "dri",
        },
        {
          label: "Courier Code",
          value: "employee_code",
        },
        {
          label: "Courier Name",
          value: "employee_name",
        },
        {
          label: "Total Koli",
          value: "total_koli",
        },
        {
          label: "Total Open",
          value: "total_open",
        },
        {
          label: "Total Delivered",
          value: "total_delivered",
        },
        {
          label: "Total Undelivered",
          value: "total_undelivered",
        },
        {
          label: "Total Undelivered Receiving",
          value: "total_undelivery_received",
        }
      ],
      dateParams: [
        {
          label: 'Create Date Delivery',
          value: 'create'
        },
      ],
      dialogCreateRunsheet: false,
    };
  },
  methods: {
    refresh() {
      this.$refs.DeliveryRunsheetTable.refresh(); // trigger function refresh form dari luar component list
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
    async getDataNodeType() {
      this.loading = true;
      await axios
        .get(
          this.URL.node_type +
            `?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
          this.Helper.header()
        )
        .then((res) => {

          if (res.data.data.length > 0) {
            res.data.data.map((item) => {
              let obj = {};
              obj["label"] = item.node_type_name;
              obj["value"] = item.node_type_id;

              this.DataNode.push(obj);
            });
          }

          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.openNotification("danger", err.response ? err.response.data.code : '', "Failed to populate node list", err);
        });
    },
    updateNode(val) {},
    updateSearchBy(key, val) {
      val = val.replaceAll(" ", "_");
      this.searchBy = val;
      this.searchPlaceholder = key;
    },
    updateFilterDateBy(key,val) {
      this.filterDateBy = val;
    },

    openDialog(){
      this.dialogCreateRunsheet = true
    },
    closeDialog() {
      this.dialogCreateRunsheet = false
    },
  },
  mounted() {
    // this.getDataNodeType()
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
