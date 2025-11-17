<template>
  <div>
    <table-master 
      hideColumnKey="cash-register"
      :dataTable="dataTable"
      :dataColumn="datacolumn"
      :tableLoading="loading"
      :pageSize="pagination.page_size"
      :page="pagination.page"
      :limit="pagination.limit"
      :hasAction="false"
      :printAction="false"
      :hasLinked="['cash_register_number']"
      :hasPagination="true"
      :onRowClickCallback="updateSelected"
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
  name: "Cash-Register-List",
  mixins: [master],
  props: {
    query: String,
    dateFilter: Array,
  },
  components: {
    "table-master": TableMaster,
  },
  data() {
    return {
      dataTable: [],
      datacolumn: [
        {
          label: "No Cash Register #",
          key: "cash_register_number",
          width: "sm",
        },
        {
          label: "Date",
          key: "created_at",
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
      selectedRow: []
    };
  },
  watch: {
    query: function (val, old) {
      if (val !== undefined) {
        this.tempSearch = val;
        if (this.tempSearch !== old) {
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            val,
            this.startDate,
            this.endDate
          );
        }
      }
    },
    dateFilter: function (val, old) {
      if (val !== undefined) {
        this.tempDate = val;
        if (this.tempDate !== old) {
          this.startDate = this.tempDate !== null ? this.tempDate[0] : "";
          this.endDate = this.tempDate !== null ? this.tempDate[1] : "";
        }
        this.getTableData(
          this.pagination.limit,
          this.pagination.page,
          this.tempSearch,
          this.startDate,
          this.endDate
        );
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
      }
      if (from !== undefined && to !== undefined) {
        startDate = this.formatToWIB(from)
        endDate = this.formatToWIB(to)
      }
      await axios
        .get(
          this.URL.cash_register +
            `?n=${this.listenNodeId}&limit=${limit}&page=${page}&s=${query}&start_date=${from}&end_date=${to}`,
          this.Helper.header()
        )
        .then((res) => {
          let arr = res.data.data;
          arr.map((item) => {
            item.created_at = this.formatTimezone(item.created_at);
          })

          this.dataTable = arr;

          this.pagination.page = res.data.meta ? res.data.meta.current_page : 1;
          this.pagination.limit = res.data.meta
            ? parseInt(res.data.meta.per_page)
            : 1000;
          this.pagination.page_size = res.data.meta
            ? res.data.meta.last_page
            : 1;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.openNotification(
            "danger",
            err.response ? err.response.data.code : '',
            "Failed to populate tariff list",
            err
          );
        });
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
    actionDetail(row) {
      let routeData = this.$router.resolve({
        name: "printGeneral",
        params: { id: row.cash_register_number, type: "cash-register", node_id:this.listenNodeId },
      });

      const printWindow = window.open(routeData.href, '_blank', 'noopener');
      
      if (printWindow) {
        printWindow.onload = function() {
          printWindow.print();
          printWindow.onafterprint = () => printWindow.close();
        };
      }
    },
    updateSelected(_event, _item, selected) {
        this.selectedRow = selected.map(el => el.cash_register_number)
    },
    actionPrintSelected(){
        if (this.selectedRow.length > 0) {
            let routeData = this.$router.resolve({
                name: 'printGeneral',
                params: {
                    'id': this.selectedRow.toString(),
                    'type': 'cash-register',
                    'node_id':this.listenNodeId
                }
            });
            
            const printWindow = window.open(routeData.href, '_blank', 'noopener');
      
            if (printWindow) {
                printWindow.onload = function() {
                    printWindow.print();
                    printWindow.onafterprint = () => printWindow.close();
                };
            }
        }
        else {
            this.openNotification('warn', null, 'Shortcut Print Gagal', 'Silakan pilih Cash Register terlebih dahulu')
        }
    }
  },
  mounted() {
    window.addEventListener('timezone-changed', this.refresh);
    this.refresh();
    this.handlePrintShortcut(this.actionPrintSelected)
  },
  beforeDestroy() {
    window.removeEventListener('timezone-changed', this.refresh);
  },
};
</script>