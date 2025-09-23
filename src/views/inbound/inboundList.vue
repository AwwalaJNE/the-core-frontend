<template>
  <div>
    <table-master 
    hideColumnKey="receiving"
    :key="listenBreadcrumbTitle"
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
import TableMaster from "@/components/table/tableMaster.vue";
import master from "@/mixins/master";
import axios from "axios";
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
    created: Function,
    updateLocalStorage: Function,
    title: String,
    type: String,
  },
  components: {
    "table-master": TableMaster,
  },
  data() {
    return {
      dataTable: [],
      datacolumn: [],
      loading: false,
      dataItem: {},
      tempSearch: JSON.parse(localStorage.getItem('InboundFilters'))?.tempSearch || '',
      tempDate: JSON.parse(localStorage.getItem('InboundFilters'))?.tempDate || [],
      nodeOrigin: JSON.parse(localStorage.getItem('InboundFilters'))?.node_origin || '',
      node_type: JSON.parse(localStorage.getItem('InboundFilters'))?.node_request || '',
      dialogTariff: false,
      pagination: {
        limit: 20,
        page_size: 1,
        page: 1,
      },
      statusReceived: JSON.parse(localStorage.getItem('InboundFilters'))?.value || '',
      prealertFilter: JSON.parse(localStorage.getItem('InboundFilters'))?.values || '',
      filterDateBy: JSON.parse(localStorage.getItem('InboundFilters'))?.filterDateBy || '',
      searchBy: JSON.parse(localStorage.getItem('InboundFilters'))?.searchBy || '',
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
          this.tempDate[0],
          this.tempDate[1],
          this.searchBy,
          this.filterDateBy,
          this.type
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
          this.tempDate[0],
          this.tempDate[1],
          this.searchBy,
          this.filterDateBy,
          this.type
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
          this.tempDate[0],
          this.tempDate[1],
          this.searchBy,
          this.filterDateBy,
          this.type
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
          this.tempDate[0],
          this.tempDate[1],
          this.searchBy,
          this.filterDateBy,
          this.type
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
          this.tempDate[0],
          this.tempDate[1],
          this.searchBy,
          this.filterDateBy,
          this.type
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
          this.$emit("updateLocalStorage")
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
          this.tempDate[0],
          this.tempDate[1],
          this.searchBy,
          this.filterDateBy,
          this.type
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
          this.tempDate[0],
          this.tempDate[1],
          val,
          this.filterDateBy,
          this.type
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
          this.tempDate[0],
          this.tempDate[1],
          this.searchBy,
          val || savedFilters,
          this.type
          );
          this.$emit("updateLocalStorage")
        }
      }
    },
    type: function(val, old) {
      if (val !== undefined) {
        if (val !== old) {
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            this.tempSearch,
            this.nodeOrigin,
            this.node_type,
            this.statusReceived,
            this.prealertFilter,
            this.tempDate[0],
            this.tempDate[1],
            this.searchBy,
            this.filterDateBy,
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
    listenBreadcrumbTitle: {
      handler(val, oldVal) {
        if (val !== oldVal && val !== undefined) {
          this.setDatacolumn();
        }
      },
      immediate: true
    },
  },
  computed: {
    listenBreadcrumbTitle() {
      return this.title;
    },
    listenBreadcrumbCode() {
      return this.type;
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
    qDate,
    type
    ) {
      this.loading = true;
      let query = "";
      let startDate = "";
      let endDate = "";
      let isReceived = "";
      let isPrealert = "";
      let queryFilter = "";
      let queryDate = "";
      let inboundType = "";
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
      if (type !== undefined) {
        inboundType = type;
      }
      await axios
      .get(
      this.URL.inbound_incoming +
      `?n=${this.listenNodeId}&type=${node_type}&status=${isReceived}&origin=${origin}&prealert=${isPrealert}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&search_by=${queryFilter}&filter_date_by=${queryDate}&start_date=${startDate}&end_date=${endDate}&inbound_type=${inboundType}`,
      this.Helper.header()
      )
      .then((res) => {
        let total = 0;
        this.dataTable = res.data.data;
        this.dataTable.map((item) => {
          let im = [];
          item["flight_number"] = item?.manifest?.flight_number;
          item['inbound_branch'] = item?.inbound_branch_name_origin ? item?.inbound_branch_code_origin + ' - ' + item?.inbound_branch_name_origin : item?.inbound_branch_code_origin;
          item['created_orion'] = item['created_orion'] == null ? this.formatTimezone(item['created_at']) : this.formatTimezone(item['created_orion']);
          item["inbound_eta"] = this.formatTimezone(item["inbound_eta"]);
          item["inbound_etd"] = this.formatTimezone(item["inbound_etd"]);
          item["departed_at"] = this.formatTimezone(item["departed_at"]);
          item["received_at"] = this.formatTimezone(item["received_at"]);
          item["vehicle"] = item["vehicle_name"];
          item["total_received"] = item["total_received"] === 0 ? "0": item["total_received"];
          item["total_outstanding"] = item["total_outstanding"] === 0 ? "0": item["total_outstanding"];
          // item['is_prealert'] = isPrealert
          item["inbound_number"] =
          isPrealert == "bag" ? item["bag_number"] : item["inbound_number"];
          if (item["inbound_number"]?.startsWith("SJA")) {
            item["inbound_node_name_origin"] =
            item["inbound_node_name_origin"] + " (AIRPORT)";
          }
          if (item["vehicle_name"] != null) {
            item["vehicle"] =
            item["vehicle"] + " (" + item["vehicle_police_no"] + ")";
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

    setDatacolumn() {
      this.datacolumn = [
        {
          label: `${this.listenBreadcrumbCode} Number`,
          key: "inbound_number",
          width: "xxxs",
        },
        ...(this.listenBreadcrumbTitle === "Pre-Alert"
          ? [
              {
                label: `${this.listenBreadcrumbCode} Type`,
                key: "document_type",
                width: "xxxs",
              },
            ]
          : []
        ),
        {
          label: "Status",
          key: "status",
          width: "xxs",
        },
        ...(!["Receiving Connote", "Receiving Bag", "RCVB"].includes(this.listenBreadcrumbTitle)
          ? [
              {
                label: "Bag Received",
                key: "total_received",
                width: "xxxs",
              },
              {
                label: "Bag Outstanding",
                key: "total_outstanding",
                width: "xxxs",
              },
              {
                label: "Total Bag",
                key: "total_item",
                width: "xxxs",
              },
              {
                label: "IM Numbers",
                key: "im_numbers",
                width: "xxxs",
              },
              {
                label: "Flight Number",
                key: "flight_number",
                width: "xxxs",
              },
              {
                label: "Vehicle",
                key: "vehicle",
                width: "xxxs",
              },
              {
                label: "Driver",
                key: "carrier_employee_name",
                width: "auto",
              },
            ]
          : []
        ),
        ...(this.listenBreadcrumbTitle === "Receiving Connote"
          ? [
              {
                label: "Receiving Number",
                key: "receiving_number",
                width: "xxs",
              },
            ]
          : []
        ),
        // {
        //   label: "Total Bag",
        //   key: "total_bag",
        //   width: "xxxs",
        // },
        // {
        //   label: "Total Connote",
        //   key: "total_koli",
        //   width: "xxxs",
        // },
        {
          label: "Branch Origin",
          key: "inbound_branch",
          width: "xs",
        },
        {
          label: "Node Origin",
          key: "inbound_node_name_origin",
          width: "md",
        },
        // {
        //   label: "Item",
        //   key: "inbound_total_bag",
        //   width: "auto",
        // },
        // {
        //   label: "Connote",
        //   key: "inbound_total_koli",
        //   width: "auto",
        // },
          // {
          //   label: "Fix Cost Weight",
          //   key: "fix_cost_weight",
          //   width: "auto"
          // },
          // {
          //   label: "Live Cost Weight",
          //   key: "live_cost_weight",
          //   width: "auto"
          // },
          // {
          //   label: "Fix Actual Weight",
          //   key: "fix_actual_weight",
          //   width: "auto"
          // },
          // {
          //   label: "Live Actual Weight",
          //   key: "live_actual_weight",
          //   width: "auto"
          // },
        {
          label: "Created ",
          key: "created_orion",
          width: "xxxs",
        },
        {
          label: "Created By",
          key: "created_by_user",
          width: "auto",
        },
        {
          label: "ETD",
          key: "inbound_etd",
          width: "xxxs",
        },
        {
          label: "ETA",
          key: "inbound_eta",
          width: "xxxs",
        },
        {
          label: "Handover to Transport",
          key: "departed_at",
          width: "xxs",
        },
        {
          label: "Received At",
          key: "inbound_node_name_receiver",
          width: "xxxs",
        },
        {
          label: "Received By",
          key: "received_by_user",
          width: "auto"
        },
        {
          label: "Received Time",
          key: "received_at",
          width: "xxxs",
        },
      ]
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
      this.tempDate[0],
      this.tempDate[1],
      this.searchBy,
      this.filterDateBy,
      this.type
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
    window.addEventListener('timezone-changed', this.refresh);
  },

  beforeDestroy() {
      window.removeEventListener('timezone-changed', this.refresh);
  },
};
</script>
