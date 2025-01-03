<template>
  <div>
    <table-master
      :dataTable="dataTable"
      :dataColumn="datacolumn"
      :tableLoading="loading"
      :pageSize="pagination.page_size"
      :page="pagination.page"
      :limit="pagination.limit"
      :hasAction="false"
      :hasLinked="hasLinkedItem"
      :hasPagination="true"
      @hasLinkedItem="handleHasLinkedItem"
      @actionLimit="actionLimit"
      @actionPagination="actionPagination"
      @handleEdit="actionDetail"
    />
  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import TableMaster from "@/components/table/tableMaster.vue";
export default {
  name: "Inbound-Incoming",
  mixins: [master],
  props: {
    query: String,
    dateFilter: Array,
    searchBy: String,
    nodeType: String,
    origin: String / Number,
    received: String / Number,
    prealert: String / Number,
    hasLinkedItem: {
      type: Array,
      default: () => ["inbound_number"],
    },
    filterDateBy: String,
    isReset: Boolean,
    created: Function
  },
  components: {
    "table-master": TableMaster,
  },
  data() {
    return {
      dataTable: [],
      datacolumn: [
        {
          label: "Inbound Number",
          key: "inbound_number",
          width: "xs",
        },
        {
          label: "IM Numbers",
          key: "im_numbers",
          width: "xs",
        },
        {
          label: "Vehicle",
          key: "vehicle",
          width: "xs",
        },
        {
          label: "From",
          key: "inbound_node_name_origin",
          width: "xs",
        },
        {
          label: "#SM /SJ /PICKUP",
          key: "inbound_type",
          width: "xs",
        },
        {
          label: "Item",
          key: "inbound_total_bag",
          width: "auto",
        },
        {
          label: "Connote",
          key: "inbound_total_koli",
          width: "auto",
        },
        {
          label: "Weight (Kg)",
          key: "inbound_total_weight",
          width: "auto",
        },
        {
          label: "PIC",
          key: "carrier_employee_name",
          width: "xs",
        },
        {
          label: "Created",
          key: "created_at",
          width: "xs",
        },
        {
          label: "ETD",
          key: "inbound_etd",
          width: "xs",
        },
        {
          label: "ETA",
          key: "inbound_eta",
          width: "xs",
        },
        {
          label: "Departed",
          key: "departed_at",
          width: "xs",
        },
        {
          label: "Status",
          key: "status",
          width: "auto",
        },
        {
          label: "Received At",
          key: "inbound_node_name_receiver",
          width: "auto",
        },
        {
          label: "Received Time",
          key: "received_at",
          width: "auto",
        },
      ],
      loading: false,
      dataItem: {},
      tempSearch: "",
      tempDate: [],
      nodeOrigin: "",
      node_type: "",
      dialogTariff: false,
      pagination: {
        limit: 20,
        page_size: 1,
        page: 1,
      },
      statusReceived: "",
      prealertFilter: "",
    };
  },
  watch: {
    query: function(val, old) {
      if (val !== undefined) {
        this.tempSearch = val;
        if (this.tempSearch !== old && !this.isReset) {
          this.pagination.page = 1
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            val,
            this.nodeOrigin,
            this.node_type,
            this.statusReceived,
            this.prealertFilter,
            this.startDate,
            this.endDate,
            this.searchBy,
            this.filterDateBy
          );
          this.$emit("updateLocalStorage")
        }
      }
    },
    nodeType: function(val, old) {
      if (val !== undefined) {
        this.node_type = val;
        if (this.node_type !== old && !this.isReset) {
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            this.tempSearch,
            this.nodeOrigin,
            val,
            this.statusReceived,
            this.prealertFilter,
            this.startDate,
            this.endDate,
            this.searchBy,
            this.filterDateBy
          );
          this.$emit("updateLocalStorage")
        }
      }
    },
    received: function(val, old) {
      if (val !== undefined) {
        this.statusReceived = val;
        if (this.statusReceived !== old && !this.isReset) {
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            this.tempSearch,
            this.nodeOrigin,
            this.node_type,
            val,
            this.prealertFilter,
            this.startDate,
            this.endDate,
            this.searchBy,
            this.filterDateBy
          );
          this.$emit("updateLocalStorage")
        }
      }
    },
    origin: function(val, old) {
      if (val !== undefined) {
        this.nodeOrigin = val;
        if (this.nodeOrigin !== old && !this.isReset) {
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            this.tempSearch,
            val,
            this.node_type,
            this.statusReceived,
            this.prealertFilter,
            this.startDate,
            this.endDate,
            this.searchBy,
            this.filterDateBy
          );
          this.$emit("updateLocalStorage")
        }
      }
    },
    prealert: function(val, old) {
      if (val !== undefined) {
        this.prealertFilter = val;
        if (this.prealertFilter !== old && !this.isReset) {
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            this.tempSearch,
            this.nodeOrigin,
            this.node_type,
            this.statusReceived,
            val,
            this.startDate,
            this.endDate,
            this.searchBy,
            this.filterDateBy
          );
          this.$emit("updateLocalStorage")
        }
      }
    },
    dateFilter: function(val, old) {
      if (val !== undefined) {
        this.tempDate = val;
        if (this.tempDate !== old) {
          this.startDate = this.tempDate !== null ? this.tempDate[0] : "";
          this.endDate = this.tempDate !== null ? this.tempDate[1] : "";
        }
        if (!this.isReset) {
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            this.tempSearch,
            this.nodeOrigin,
            this.node_type,
            this.statusReceived,
            this.prealertFilter,
            this.startDate,
            this.endDate,
            this.searchBy,
            this.filterDateBy
          );
          this.$emit("updateLocalStorage")
        }
      }
    },
    searchBy: function(val, old) {
      if (val !== undefined) {
        if (val !== old && !this.isReset) {
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            this.tempSearch,
            this.nodeOrigin,
            this.node_type,
            this.statusReceived,
            this.prealertFilter,
            this.startDate,
            this.endDate,
            val,
            this.filterDateBy
          );
          this.$emit("updateLocalStorage")
        }
      }
    },
    filterDateBy: function(val, old) {
      if (val !== undefined) {
        if (val !== old && !this.isReset) {
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            this.tempSearch,
            this.nodeOrigin,
            this.node_type,
            this.statusReceived,
            this.prealertFilter,
            this.startDate,
            this.endDate,
            this.searchBy,
            val
          );
          this.$emit("updateLocalStorage")
        }
      }
    },
    isReset: function(val, old) {
      if (val !== undefined) {
        if (val !== old && !val) {
          this.refresh();
        }
      }
    },
  },
  methods: {
    async getTableData(
      limit,
      page,
      q,
      origin,
      node_type,
      statusReceived,
      prealertFilter,
      from,
      to,
      qFilter,
      qDate
    ) {
      this.loading = true;
      let query = "";
      let startDate = "";
      let endDate = "";
      let isReceived = "";
      let isPrealert = "";
      let queryFilter = "";
      let queryDate = "";
      if (q !== undefined) {
        query = q;
      }
      if (statusReceived !== undefined && statusReceived !== "-") {
        isReceived = statusReceived;
      }
      if (prealertFilter !== undefined && prealertFilter !== "-") {
        isPrealert = prealertFilter;
      }
      if (from !== undefined && to !== undefined) {
        startDate = from;
        endDate = to;
      }
      if (qFilter !== undefined) {
        queryFilter = qFilter;
      }
      if (qDate !== undefined) {
        queryDate = qDate;
      }
      await axios
        .get(
          this.URL.inbound_incoming +
            `?n=${this.listenNodeId}&type=${node_type}&status=${isReceived}&origin=${origin}&prealert=${isPrealert}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&search_by=${queryFilter}&filter_date_by=${queryDate}&start_date=${startDate}&end_date=${endDate}`,
          this.Helper.header()
        )
        .then((res) => {
          let total = 0;
          this.dataTable = res.data.data;
          this.dataTable.map((item) => {
            let im = [];
            item["created_at"] = this.dateConvert(item["created_at"]);
            item["inbound_eta"] = this.dateConvert(item["inbound_eta"]);
            item["inbound_etd"] = this.dateConvert(item["inbound_etd"]);
            item["departed_at"] = this.dateConvert(item["departed_at"]);
            item["received_at"] = this.dateConvert(item["received_at"]);
            item["vehicle"] = item["vehicle_type_name"];
            // item['is_prealert'] = isPrealert
            item["inbound_number"] =
              isPrealert == "bag" ? item["bag_number"] : item["inbound_number"];
            if (item["inbound_number"]?.startsWith("SJA")) {
              item["inbound_node_name_origin"] =
                item["inbound_node_name_origin"] + " (AIRPORT)";
            }
            if (item["vehicle_name"] != null) {
              item["vehicle"] =
                item["vehicle"] + "(" + item["vehicle_name"] + ")";
            }
            if (item["manifest_do_items"].length > 0) {
              item["manifest_do_items"].map((el) => {
                im.push(el.im_number);
              });
            }
            if (item["manifest_items"].length > 0) {
              item["manifest_items"].map((el) => {
                im.push(el.im_number);
              });
            }
            if (im.length > 0) {
              im = [...new Set(im)];
              item["im_numbers"] = im.join(", ");
            }
            total = Number(total) + Number(item.transaction_amount);
          });
          this.pagination.page = res.data.meta.current_page;
          this.pagination.limit = parseInt(res.data.meta.per_page);
          this.pagination.page_size = res.data.meta.last_page;
          if (res.data.data.length > 0) {
          } else {
            // this.openNotification('warn', null, 'inbound data is empty!', ' Please create a new data')
          }

          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.openNotification(
            "danger",
            err.response ? err.response.data.code : "",
            "Failed to populate data",
            err
          );
        });
    },

    closeDialogConfirm() {
      this.confirmDialog = false;
    },

    actionLimit(val) {
      this.pagination.limit = val;
      this.pagination.page = 1;
      this.refresh();
    },

    actionPagination(val) {
      this.pagination.page = val;
      this.refresh();
    },

    refresh() {
      this.getTableData(
        this.pagination.limit,
        this.pagination.page,
        this.tempSearch,
        this.nodeOrigin,
        this.node_type,
        this.statusReceived,
        this.prealertFilter,
        this.startDate,
        this.endDate,
        this.searchBy,
        this.filterDateBy
      );
    },

    actionDetail(row) {
      this.$router.push({
        name: "InboundIncomingScan",
        params: { 
          inbound_number: row.inbound_number 
        },
      });
      this.setRoutePageHistory(this.$route.meta, false);
    },
    handleHasLinkedItem(value) {},
  },
  mounted() {
    this.refresh();
  },
};
</script>
