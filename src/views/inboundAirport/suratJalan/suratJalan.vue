<template>
  <div>
    <table-master
      :dataTable="dataTable"
      :dataColumn="!isMobile ? datacolumn.concat(allColumn) : datacolumn"
      :tableLoading="loading"
      :pageSize="pagination.page_size"
      :page="pagination.page"
      :limit="pagination.limit"
      :hasPagination="true"
      :hasLinked="['manifest_do_number']"
      :printAction="true"
      @actionLimit="actionLimit"
      @actionPagination="actionPagination"
      @handleEdit="handleEdit"
      @actionPrint="actionPrint"
    />
    <dialogCreateSuratJalan
      title="Transport Surat Jalan"
      :active="dialogSuratJalan"
      :closeDialog="closeDialogSuratJalan"
      :dataItem="dataItem"
      @refresh="refresh"
    />
  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";

import DialogConfirm from "@/components/dialog/dialogConfirm";
import TableMaster from "@/components/table/tableMaster";

import DialogCreateSuratJalan from "@/views/inboundAirport/suratJalan/dialogCreateSuratJalan";
import DetailSuratJalanMobile from "@/views/inboundAirport/suratJalan/detailSuratJalan";

export default {
  name: "surat-jalan",
  mixins: [master],
  props: {
    dateFilter: Array,
    filterDateBy: String,
    query: String,
    searchBy: String,
  },
  components: {
    "table-master": TableMaster,
    "dialog-confirm": DialogConfirm,
    dialogCreateSuratJalan: DialogCreateSuratJalan,
    detailSuratJalanMobile: DetailSuratJalanMobile,
  },
  data() {
    return {
      form: {},
      dataTable: [],
      dialogSuratJalan: false,
      datacolumn: [
        {
          label: "Surat Jalan #",
          key: "manifest_do_number",
          width: "xs",
        },
      ],
      allColumn: [
        {
          label: "Vehicle Type",
          key: "vehicle_type_name",
          width: "auto",
        },
        {
          label: "Driver",
          key: "driver_name",
          width: "xs",
        },
        {
          label: "Mode#",
          key: "vehicle_mode_name",
          width: "auto",
        },
        {
          label: "Origin",
          key: "node_id_origin_name",
          width: "sm",
        },
        {
          label: "Destination",
          key: "node_id_destination_name",
          width: "sm",
        },
        {
          label: "Kg",
          key: "total_weight",
          width: "auto",
        },
        {
          label: "Total Item",
          key: "total_detail_items",
          width: "auto",
        },
        {
          label: "ETD",
          key: "etd",
          width: "sm",
        },
        {
          label: "ETA",
          key: "eta",
          width: "sm",
        },
        {
          label: "Status",
          key: "status",
          width: "auto",
        },
      ],
      loading: false,
      dataItem: {},
      tempSearch: "",
      tempDate: [],
      startDate: "",
      endDate: "",
      pagination: {
        limit: 20,
        page_size: 1,
        page: 1,
      },
      manifest_do_number: "",
    };
  },
  watch: {
    query: function(val, old) {
      if (val !== undefined) {
        this.tempSearch = val;
        if (this.tempSearch !== old) {
          this.pagination.page = 1
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            val,
            this.startDate,
            this.endDate
          );
        }

        this.updateLocalStorage();
      }
    },
    dateFilter: function(val, old) {
      if (val !== undefined) {
        this.tempDate = val;
        if (this.tempDate !== old) {
          this.startDate = this.tempDate !== null ? this.tempDate[0] : "";
          this.endDate = this.tempDate !== null ? this.tempDate[1] : "";
          this.updateLocalStorage();
        }
        this.getTableData(
          this.pagination.limit,
          this.pagination.page,
          this.tempSearch,
          this.startDate,
          this.endDate
        );
        this.updateLocalStorage();
      }
    },
  },
  methods: {
    async getTableData(limit, page, q, from, to) {
      this.loading = true;
      let query = "";
      let startDate = "";
      let endDate = "";
      if (q !== undefined) {
        query = q;
        if (q.includes("/")) {
          query = query.replaceAll("/", "-");
        }
      }
      if (from !== undefined && to !== undefined) {
        startDate = from;
        endDate = to;
      }
      await axios
        .get(
          this.URL.manifest_delivery_order +
            `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`,
          this.Helper.header()
        )
        .then((res) => {
          let arr = res.data.data;

          arr.map((item) => {
            item["pickup_courier_employee_name"] = item.employee_courier
              ? item.employee_courier.employee_name
              : null;
            item["node_id_origin_name"] = item.origin
              ? item.manifest_do_number?.startsWith("SJA")
                ? `${item.origin.node_name} (AIRPORT)`
                : item.origin.node_name
              : null;
            item["node_id_destination_name"] = item.destination
              ? item.destination.node_name
              : null;
            item["driver_id"] = item.pic_employee_id
              ? parseInt(item.pic_employee_id)
              : null;
            item["driver_name"] = item.pic ? item.pic.employee_name : null;
            item["orion_number"] = item.mts || item.do || "";
          });

          this.dataTable = arr;
          this.pagination.page = res.data.meta.current_page;
          this.pagination.limit = parseInt(res.data.meta.per_page);
          this.pagination.page_size = res.data.meta.last_page;
          if (res.data.data.length > 0) {
          } else {
            // this.openNotification('warn', null, 'Surat Jalan data is empty!', ' Please create a new Surat Jalan data')
          }

          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.openNotification(
            "danger",
            err.response ? err.response.data.code : "",
            "Failed to populate Surat Jalan data",
            err
          );
        });
    },

    actionPrint(val) {
      let routeData = this.$router.resolve({
        name: "printGeneral",
        params: {
          id: val.manifest_do_number,
          type: "manifest-delivery-order",
          node_id: this.listenNodeId,
        },
      });

      const printWindow = window.open(routeData.href, "_blank", "noopener");

      if (printWindow) {
        printWindow.onload = function() {
          printWindow.print();
          printWindow.onafterprint = () => printWindow.close();
        };
      }
    },
    handleEdit(val) {
      if (this.isMobile) {
        this.$router.push(`/inbound-airport/sj/${val.manifest_do_number}`);
      } else {
        if (this.dataTable.length > 0) {
          this.dataItem = val;
          this.dataItem["destination_id"] = val.node_id_destination
            ? val.node_id_destination
            : "";
          this.dataItem["moda_angkutan_id"] = val.vehicle_mode_id
            ? parseInt(val.vehicle_mode_id)
            : "";
          this.dataItem["no_moda_angkutan_id"] = val.vehicle_id
            ? parseInt(val.vehicle_id)
            : "";
          this.dataItem["manifest_do_item"] = val.detail ? val.detail : "";
          this.dataItem["driver_id"] = val.pic_employee_id
            ? parseInt(val.pic_employee_id)
            : "";
          this.dataItem["max_weight"] = val.max_weight;
          this.dataItem["driver_id"] = val.driver_id
            ? parseInt(val.driver_id)
            : "";
          this.dataItem["vehicle_type_id"] = val.vehicle_type_id
            ? parseInt(val.vehicle_type_id)
            : "";
          this.$nextTick(() => {
            this.dialogSuratJalan = true;
          });
        }
      }
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
        this.startDate,
        this.endDate
      );
    },
    updateLocalStorage() {
      const filterData = {
          tempSearch: this.tempSearch,
          filterDateBy: this.filterDateBy,
          tempDate: this.tempDate,
      };
      localStorage.setItem("InboundAirportSuratJalanFilters", JSON.stringify(filterData));
    },
    closeDialogSuratJalan() {
      this.dialogSuratJalan = false;
      this.refresh();
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>
