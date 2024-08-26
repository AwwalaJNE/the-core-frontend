<template>
  <div>
    <table-master
      :dataTable="dataTable"
      :dataColumn="datacolumn"
      :tableLoading="loading"
      :pageSize="pagination.page_size"
      :page="pagination.page"
      :limit="pagination.limit"
      :hasPagination="true"
      :expandable="true"
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
  name: "delivery-runsheet",
  mixins: [master],
  props: {
    query: String,
    dateFilter: Array,
    searchBy: String
  },
  components: {
    "table-master": TableMaster,
  },
  data() {
    return {
      dataTable: [],
      datacolumn: [
        {
          label: "HRS Number",
          key: "hrs_number",
          width: "sm",
        },
        {
          label: "HRS Date",
          key: "created_at",
          width: "sm",
        },
        {
          label: "Courier Name",
          key: "employee_name",
          width: "sm",
        },
        {
          label: "Courier Code",
          key: "employee_code",
          width: "sm",
        },
        {
          label: "Total Runsheet",
          key: "total_runsheet",
          width: "sm",
        },
        {
          label: "Total Connote",
          key: "total_connote",
          width: "sm",
        },
        {
          label: "Total COD (Rp)",
          key: "total_amount_cod",
          width: "sm",
          type_amount: true,
          textAlign: "right"
        },
      ],
      loading: false,
      dataItem: {},
      form: {},
      tempSearch: "",
      tempDate: [],
      startDate: "",
      endDate: "",
      dialogTariff: false,
      pagination: {
        limit: 5,
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
          this.URL.delivery_cod +
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
              let total_connote = []
              let cod_payment_type = []
              let total_amount_cod = []
              item['children_width'] = {
                  'Runsheet #': 'md',
                  'DRI Number': 'sm',
                  'HRS Number': 'sm',
                  'Total Connote': 'sm',
                  'Payment Type': 'sm',
                  'Total COD (Rp)': 'sm'
              }
              item['type_amount'] = ['Total COD (Rp)']
              item.runsheets?.map((el) => {
                  delivery_runsheet_number.push(el.delivery_runsheet_number)
                  dri.push(el.dri)
                  hrs.push(el.hrs)
                  total_connote.push(el.total_connote)
                  cod_payment_type.push(el.cod_payment_type)
                  total_amount_cod.push(el.total_amount_cod)
              })
              children['Runsheet #'] = delivery_runsheet_number
              children['DRI Number'] = dri
              children['HRS Number'] = hrs
              children['Total Connote'] = total_connote
              children['Payment Type'] = cod_payment_type
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
            err?.response?.data?.code ?? null,
            "Get List Failed",
            err?.response?.data?.message ?? "Failed to populate Outstanding COD"
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
        this.startDate,
        this.endDate
      );
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>
