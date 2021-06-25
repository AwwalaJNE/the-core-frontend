<template>
  <div>
    <template v-if="listenLoading == false">
      <table-master
        :dataTable="listenDataDelivery"
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
import axios from "axios";
import master from "@/mixins/master";
import TableMaster from "@/components/table/tableMaster.vue";
export default {
  name: "Inbound-Incoming",
  mixins: [master],
  props: {
    loading: Boolean,
    query: String,
    employeeId: String,
    deliveryNumber: String,
    arrStatus: Array,
    dataDelivery: [Object, Array],
  },
  components: {
    "table-master": TableMaster,
  },
  data() {
    return {
      dataTable: [],
      datacolumn: [
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
          data: {
            label: null,
            value: null,
          },
          selectedValue: "status_code",
          width: "md",
        },

        {
          label: "Remarks",
          key: "remarks",
          type: "inputan",
          typeInput: "text",
          data: "",
          width: "md",
        },

        {
          label: "COD",
          key: "amount_cod",
          width: "xxs",
        },
        {
          label: "Received by",
          key: "receiver_name",
          type: "inputan",
          typeInput: "text",
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
      dialogTariff: false,
      employee_id: "",
      delivery_runsheet_number: null,
      pagination: {
        limit: 5,
        page_size: 1,
        page: 1,
      },
      loadStatus: false,
    };
  },
  computed:{
    listenLoading() {
      return this.loading
    },
    listenDataDelivery() {
      console.log("data delivery item", this.dataDelivery)
      return this.dataDelivery["delivery"] ? this.dataDelivery["delivery"] : []
    }
  },
  watch: {
    query: function (val, old) {
      if (val !== undefined) {
        this.tempSearch = val;
        if (this.tempSearch !== old) {
          // this.getTableData(this.pagination.limit, this.pagination.page, val)
        }
      }
    },
    employeeId: function (val, old) {
      if (val !== undefined) {
        this.employee_id = val;
        if (this.employee_id !== old) {
          //   this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch)
        }
      }
    },
    deliveryNumber: function (val, old) {
      if (val !== undefined) {
        this.delivery_runsheet_number = val;

        if (this.delivery_runsheet_number !== old) {
          this.delivery_runsheet_number = val;
        }
      }
    },
  },
  methods: {
    updateValue(key, val, info) {
      // console.log("Update runsheet", key, val, info)
      key = key.split("|");
      let column_change = key[0];
      let koli_number = key[1];
      let obj = {}
      obj["koli_number"] = koli_number
      
      // if (column_change && column_change == "status_delivery") {
      //     this.dataTable.map((item, index)=>{
      //       if(key[1] === item.koli_number){
      //         this.delivery_runsheet_number = this.dataTable[index].delivery_runsheet_number
      //       }
      //     })
      //     obj["status"] = val
      // }
      switch (true) {
        case column_change && column_change == "status_delivery":
            obj["status"] = val
          break;
        case column_change && column_change == "remarks":
            obj["remarks"] = val
          break;
        case column_change && column_change == "receiver_name":
            obj["receiver_name"] = val
          break;
        default:
      
      }
      this.$emit("updatePOD", obj, info);
    },
    closeDialogConfirm() {
      this.confirmDialog = false;
    },
    getParamRoute() {
      if (this.$route.params.employee_id) {
        this.employee_id = this.$route.params.employee_id;
      }
    },
  },
  mounted() {
    this.datacolumn.map((item) => {
      if (item.key == "status_delivery") {
        item.data = this.arrStatus;
      }
    });

    this.getParamRoute();
  },
};
</script>