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
          <vs-row class="mb-15">
            <vs-col w="4">
              <daterange-filter @searchDate="searchDate" />
            </vs-col>
            <vs-col w="8">
              <vs-row justify="flex-end" align="center">
                <vs-col w="3" sm="12">
                  <select-search-by
                    :valueData="filterValues"
                    :isMultiple="false"
                    :border="true"
                    @updateSearchBy="updateSearchBy"
                  />
                </vs-col>
                <vs-col class="pb-10" w="3" sm="12">
                  <search-input
                    ref="searchInput"
                    class="search-input"
                    :placeholder="searchPlaceholder"
                    @searchValue="searchValue"
                  />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </div>
        <template>
          <transition name="slide-fade">
            <DeliveryCodHistoryTable
              :ref="'DeliveryCodHistoryTable'"
              :node="node_request"
              :dateFilter="tempDate"
              :query="tempSearch"
              :searchBy="searchByVal"
            />
          </transition>
        </template>
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

import DeliveryCodHistoryTable from "@/views/delivery/codHistory/codHistoryTable";

export default {
  name: "Delivery-Cod-History",
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
      title: "COD History",
      tempSearch: "",
      tempDate: [],
      DataNode: [],
      node_request: "",
      node_origin: "",
      node_destination: "",
      searchByVal: null,
      searchPlaceholder: "Search Connote",
      filterValues: [
        {
          label: "Connote",
          value: "koli_number",
        },
        {
          label: "Date",
          value: "date_cod_collected",
        },
        {
          label: "Courier",
          value: "courier_employee_name",
        },
        {
          label: "COD Amount",
          value: "amount_cod",
        },
        {
          label: "Collected By",
          value: "user_login",
        },
      ],
    };
  },
  methods: {
    refresh() {
      this.$refs.inboundIncoming.refresh(); // trigger function refresh form dari luar component list
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

    openDialog() {
      this.$router.push("/inbound/prealert/scan");
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
          console.log("link", res);
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

    updateSearchBy(label, val) {
      if (label) {
        this.searchPlaceholder = label;
        if (val && this.filterValues.map((v) => v.value).includes(val)) {
          this.searchByVal = val;
        }
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
