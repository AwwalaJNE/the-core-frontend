<template>
  <div>
    <table-master
      :dataTable="dataTable"
      :dataColumn="datacolumn"
      :tableLoading="loading"
      :pageSize="pagination.page_size"
      :page="pagination.page"
      :limit="pagination.limit"
      :hasLinked="['sco']"
      :hasAction="false"
      :hasPagination="true"
      :expandable="true"
      :printAction="true"
      @actionPrint="actionPrint"
      @actionLimit="actionLimit"
      @actionPagination="actionPagination"
    />
  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import TableMaster from "@/components/table/tableMaster.vue";
export default {
  name: "cod-history-table",
  mixins: [master],
  props: {
    query: String,
    dateFilter: Array,
    searchBy: String,
    filterDateBy: String
  },
  components: {
    "table-master": TableMaster,
  },
  data() {
    return {
      dataTable: [],
      datacolumn: [
        {
          label: "SCO Number",
          key: "sco",
          width: "sm",
        },
        {
          label: "Deposit Date",
          key: "created_at",
          width: "md",
        },
        {
          label: "Cashier Name",
          key: "cashier_name",
          width: "sm",
        },
        {
          label: "Cashier ID",
          key: "cashier_id",
          width: "sm",
        },
        {
          label: "Total HRS",
          key: "total_hrs",
          width: "xs",
        },
        {
          label: "Total Runsheet",
          key: "total_runsheet",
          width: "xs",
        },
        {
          label: "Total Connote",
          key: "total_connote",
          width: "xs",
        },
        {
          label: "COD Amount (Rp)",
          key: "amount",
          width: "sm",
          type_amount: true,
          textAlign: "right"
        },
      ],
      loading: false,
      tempSearch: "",
      tempDate: [],
      startDate: "",
      endDate: "",
      pagination: {
        limit: 20,
        page_size: 1,
        page: 1,
      },
    };
  },
  watch: {
    query: function(val, old) {
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
    dateFilter: function(val, old) {
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
        startDate = from;
        endDate = to;
      }

      await axios
        .get(
          this.URL.delivery_cod_history +
            `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}`,
          this.Helper.header()
        )
        .then((res) => {
          let arr = res.data.data
          arr.map((item) => {
              let children = {}
              let delivery_runsheet_number = []
              let dri = []
              let hrs = []
              let employee_name = []
              let employee_code = []
              let total_connote = []
              let cod_payment_type = []
              let total_amount_cod = []
              item['children_width'] = {
                  'Runsheet #': 'md',
                  'DRI Number': 'sm',
                  'HRS Number': 'sm',
                  'Employee Name': 'sm',
                  'Employee Code': 'sm',
                  'Payment Type': 'xs',
                  'Total Connote': 'xxs',
                  'Total COD (Rp)': 'sm'
              }
              item['type_amount'] = ['Total COD (Rp)']
              item.runsheets?.map((el) => {
                  delivery_runsheet_number.push(el.delivery_runsheet_number)
                  dri.push(el.dri)
                  hrs.push(el.hrs)
                  employee_name.push(el.employee_name)
                  employee_code.push(el.employee_code)
                  cod_payment_type.push(el.cod_payment_type)
                  total_amount_cod.push(el.total_amount_cod)
                  total_connote.push(el.total_connote)
              })
              children['Runsheet #'] = delivery_runsheet_number
              children['DRI Number'] = dri
              children['HRS Number'] = hrs
              children['Courier Name'] = employee_name
              children['Courier Code'] = employee_code
              children['Payment Type'] = cod_payment_type
              children['Total Connote'] = total_connote
              children['Total COD (Rp)'] = total_amount_cod
              item['children'] = children
          })
          this.dataTable = arr;
          this.pagination.page = res.data.meta.current_page;
          this.pagination.limit = parseInt(res.data.meta.per_page);
          this.pagination.page_size = res.data.meta.last_page;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.openNotification(
            "danger",
            err.response ? err.response.data.code : '',
            err?.response?.data?.code,
            "Get List Failed",
            err?.response?.data?.message ?? "Failed to populate COD History"
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
    actionPrint(val){
        let routeData = this.$router.resolve({ 
            name: 'printGeneral', 
            params: { 
                'id': val.sco.replaceAll("/","~"), 
                'type': 'cod-history',
                'node_id': this.listenNodeId
            }
        });
    window.open(routeData.href, '_blank');
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>
