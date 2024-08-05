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
            <vs-col xs="6" sm="8" lg="4">
              <select-search-by
                :valueData="filterValues"
                :isMultiple="false"
                :border="true"
                :selectedValue="searchByVal"
                @updateSearchBy="updateSearchBy"
              />
            </vs-col>
            <vs-col xs="6" sm="4" lg="2">
              <search-input
                ref="searchInput"
                @searchValue="searchValue"
                class="search-input"
              />
            </vs-col>
          </vs-row>
        </div>
        <template>
          <transition name="slide-fade">
            <DeliveryCodTable
              :ref="'DeliveryCodTable'"
              :node="node_request"
              :dateFilter="tempDate"
              :query="tempSearch"
              :searchBy="searchByVal"
              @openDialog="openDialog"
            />
          </transition>
        </template>
        <dialog-cod-collect
          :active="dialogCodCollect"
          :closeDialog="closeDialogCodCollect"
          :expectedAmount="expectedAmount"
          :runsheetNumber="runsheetNumber"
          :courierId="courierId"
          title="Collect COD"
          @confirm="confirm"
          @cancel="closeDialogCodCollect"
          @refresh="refresh"
        />
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import NavItem from "@/components/navbar/navTab";
import Breadcrumb from "@/components/breadcrumb/index";
import SearchInput from "@/components/search/searchInput";
import dateRange from "@/components/daterange/index";
import SelectSearchBy from "@/components/search/selectSearchBy";

import DeliveryCodTable from "@/views/delivery/cod/codTable";
import DialogCodCollect from "@/views/delivery/cod/dialogCodCollect";

export default {
  name: "Inbound-List",
  mixins: [master],
  components: {
    "nav-item": NavItem,
    breadcrumb: Breadcrumb,
    "search-input": SearchInput,
    "daterange-filter": dateRange,
    DeliveryCodTable: DeliveryCodTable,
    "select-search-by": SelectSearchBy,
    "dialog-cod-collect": DialogCodCollect,
  },
  data() {
    return {
      title: "COD Collect",
      tempSearch: "",
      tempDate: [],
      DataNode: [],
      node_request: "",
      node_origin: "",
      node_destination: "",
      searchByVal: "courier_employee_name",
      searchPlaceholder: "Search Courier Name",
      filterDateBy:"updated",
      filterValues: [
        {
          label: "Nama Kurir",
          value: "courier_employee_name",
        },
        {
          label: "Total Connotes",
          value: "count_connote",
        },
        {
          label: "Runsheet",
          value: "delivery_runsheet_number",
        },
        {
          label: "HRS",
          value: "hrs",
        },
        {
          label: "Total COD (Rp)",
          value: "count_cod",
          type_amount: true,
                    textAlign: "right"
        },
      ],
      dialogCodCollect: false,
      expectedAmount: 0,
      runsheetNumber: "",
      courierId: ""
    };
  },
  methods: {
    refresh() {
      this.$refs.DeliveryCodTable.refresh(); // trigger function refresh form dari luar component list
    },
    searchValue(val) {
      this.tempSearch = val;
    },
    clearSearch() {
      this.$refs.searchInput.clear();
    },

    openDialog(amount, runsheet, courier) {
      this.dialogCodCollect = true
      this.expectedAmount = amount
      this.runsheetNumber = runsheet
      this.courierId = courier
    },

    closeDialogCodCollect() {
      this.dialogCodCollect = false
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
          this.openNotification("danger", "Failed to populate node list", err);
        });
    },
    updateNode(val) {},

    updateSearchBy(_, val) {
      if (val && this.filterValues.map((v) => v.value).includes(val)) {
        this.searchByVal = val;
      }
    },
  },
  mounted() {
    this.getDataNodeType();
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

.pb-10 {
  padding-bottom: 10px;
}
</style>
