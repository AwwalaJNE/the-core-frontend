<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div>
    <template>
      <table-master 
        hideColumnKey="runsheet-cancel"
        ref="tableMaster"
        :dataTable="dataTable"
        :dataColumn="datacolumn"
        :tableLoading="listenLoading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="false"
        :hasPagination="false"
        @updateValue="updateValue"
      />
    </template>
  </div>
</template>
<script>
/* eslint-disable semi, indent, quotes, import/extensions */
import axios from "axios";
import master from "@/mixins/master";
import TableMaster from "@/components/table/tableMaster.vue";
export default {
  name: "InboundIncoming",
  components: {
    "table-master": TableMaster,
  },
  mixins: [master],
  props: {
    loading: Boolean,
    query: String,
    employeeId: String,
    deliveryNumber: String,
    arrStatus: Array,
    dataDelivery: [Object, Array],
    radioOption: String
  },
  emits: ["update-selected"],
  data() {
    return {
      dataTable: this.dataDelivery || [],
      datacolumn: [
        {
          label: "Ids",
          key: "inbound_id",
          type: "text",
          hidden: true,
          width: "sm",
        },
        {
          label: "Connote Number",
          key: "koli_number",
          width: "xs",
        },
        {
          label: "ZipCode",
          key: "connote_receiver_zip_code",
          width: "xxs",
        },
        {
          label: "Status Delivery",
          key: "status_delivery",
          type: "inputan",
          typeInput: "select",
          injectedData: true,
          data: [
            {
              label: null,
              value: null,
            },
          ],
          selectedValue: "status_code",
          disabled_input: "is_disabled_cancel",
          width: "md",
        },

        {
          label: "Remarks",
          key: "remarks",
          type: "inputan",
          typeInput: "textsubmit",
          disabled_input: "is_disabled_cancel",
          data: "",
          width: "md",
        },

        {
          label: "COD",
          key: "amount_cod",
          width: "xxs",
        },
        {
          label: "Receiver name",
          key: "receiver_name",
          type: "inputan",
          typeInput: "textsubmit",
          disabled_input: "is_disabled_cancel",
          data: "",
          width: "md",
        },
        {
          label: "Status",
          key: "status_delivery_description",
          width: "xxs",
        },
      ],
      dataItem: {},
      tempSearch: "",
      tempDate: [],
      startDate: "",
      endDate: "",
      employee_id: "",
      delivery_runsheet_number: null,
      pagination: {
        limit: 5,
        page_size: 1,
        page: 1,
      },
    };
  },
  computed: {
    listenLoading() {
      return this.loading;
    },
    listenDataDelivery() {
      return this.dataDelivery;
    },
  },
  watch: {
    query(val, old) {
      if (val !== undefined) {
        this.tempSearch = val;
        if (this.tempSearch !== old) {
          // this.getTableData(this.pagination.limit, this.pagination.page, val)
        }
      }
    },
    employeeId(val, old) {
      if (val !== undefined) {
        this.employee_id = val;
        if (this.employee_id !== old) {
          // this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch)
        }
      }
    },
    deliveryNumber(val, old) {
      if (val !== undefined) {
        this.delivery_runsheet_number = val;

        if (this.delivery_runsheet_number !== old) {
          this.delivery_runsheet_number = val;
        }
      }
    },
    dataDelivery(val) {
      if (val !== undefined) {
        this.dataTable = val;
      }
    },
  },
  mounted() {
    this.getParamRoute();
  },
  methods: {
    updateValue(key, val, info, item = null) {
      val = val.toUpperCase();
      const deliveryNumber = this.$store.getters.getInputs.remarks;
      key = key.split("|");
      const column_change = key[0];
      const koli_number = key[1];

      const obj = {};
      obj.koli_number = item.koli_number;

      switch (true) {
        case column_change && column_change === "status_delivery":
          obj.status = val;
          item.status_code = val;
          this.$store.dispatch("SET_STATUS_DELIVERY", obj);
          if (item.status_code !== null) {
            this.$set(item, 'is_disabled_input_remarks', false);
            this.$set(item, 'is_disabled_input_reveiver', false);
          }
          break;
        case column_change && column_change === "remarks":
          obj.remarks = val;
          if (item.hasOwnProperty("remarks") && val != item.remarks) {
            item.remarks = val;
            this.$store.dispatch("SET_REMARKS", obj);
          }
          break;
        case column_change && column_change === "receiver_name":
          obj.receiver_name = val;
          if (
            item.hasOwnProperty("receiver_name") &&
            val !== item.receiver_name
          ) {
            item.receiver_name = val;
            this.$store.dispatch("SET_RECEIVER_NAME", obj);
          }
          break;
        default:
      }

      const { selected } = this.$refs.tableMaster;
      const find = selected.find(
        (item) => item.koli_number === obj.koli_number
      );

      if (find) {
        const index = selected.findIndex(
          (item) => item.koli_number === obj.koli_number
        );

        selected[index] = item;
      }

      this.$refs.tableMaster.selected = selected;
    },
    getParamRoute() {
      if (this.$route.params.employee_id) {
        this.employee_id = this.$route.params.employee_id;
      }
    },

  },
};
</script>
