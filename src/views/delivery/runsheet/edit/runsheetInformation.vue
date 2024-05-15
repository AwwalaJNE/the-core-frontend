<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div>
    <template>
      <table-master
        ref="tableMaster"
        :dataTable="dataTable"
        :dataColumn="datacolumn"
        :tableLoading="listenLoading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="false"
        :hasPagination="false"
        :customAction="true"
        :customActionList="customActionList"
        :isMultipleSelectColoum="true"
        :onRowClickCallback="onRowClickCallback"
        :allCheckCallback="onAllCheckCallback"
        @actionRemove="actionRemove"
        @updateValue="updateValue"
        @actionUpdate="actionUpdate"
        @updateSelected="updateSelected"
        @inputFocus="onClickClear"
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
          label: "Id",
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
          label: "Created Date",
          key: "created_at",
          width: "xs",
        },
        {
          label: "ZipCode",
          key: "connote_receiver_zip_code",
          width: "xxs",
        },
        {
          label: "Service",
          key: "connote_service_code",
          width: "xxs",
        },
        {
          label: "Status Code",
          key: "status_code",
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
          disabled_input: "is_disabled_input_status",
          width: "md",
        },

        {
          label: "Remarks",
          key: "remarks",
          type: "inputan",
          typeInput: "textsubmit",
          disabled_input: "is_disabled_input_remarks",
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
          disabled_input: "is_disabled_input_reveiver",
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
      customActionList: [
        // {
        //   label: 'Confirm',
        //   key: 'confirm',
        //   attribute: '',
        //   option: {
        //     type: 'redirect',

        //   },
        // },
        {
          label: "Edit",
          key: "edit",
          attribute: "",
        },
      ],
      test: "",
      waitToRoleRenderer: true,
      arrayOfObjects: [],
      radio_option: ""
    };
  },
  computed: {
    listenLoading() {
      return this.loading;
    },
    listenDataDelivery() {
      console.log("data delivery item", this.dataDelivery);
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
    // this.datacolumn.map((item) => {
    //   if (item.key == "status_delivery") {
    //     item.data = this.arrStatus;
    //   }
    // });

    console.log('Nilai radioOption di dalam komponen anak:', this.radioOption);
    this.getParamRoute();
  },
  methods: {
    onClickClear(val) {
      const obj = {};
      obj.koli_number = val.koli_number;
      obj.status = null;
      val.status_code = null;
      this.$store.dispatch("SET_STATUS_DELIVERY", obj);
      this.$set(val, 'is_disabled_input_remarks', true);
      this.$set(val, 'is_disabled_input_reveiver', true);
    },
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
            if (!this.$refs.tableMaster.selected.includes(item)) {
              this.$refs.tableMaster.selected.push(item)
              this.$emit("update-selected", this.$refs.tableMaster.selected);
            }
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
    async runsheetAction(val, info) {
      try {
        const statusDelivery = this.$store.getters.getInputs.status_delivery
          .status;
        const { remarks } = this.$store.getters.getInputs.remarks;
        const receiverName = this.$store.getters.getInputs.receiver_name
          .receiver_name;
        const dataPOD = {
          // Construct the payload to be sent in the request body
          courier_employee_id: val.courier_employee_id,
          delivery_runsheet_number: val.delivery_runsheet_number,
          koli_number: val.koli_number,
          status: statusDelivery,
          remarks,
          receiver_name: receiverName,
        };

        this.openNotification("success", "POD UPDATED!");

        // Send the values to the parent component
        this.$emit("updatePOD", dataPOD, info);
      } catch (err) {
        this.loading = false;
        this.openNotification(
          "danger",
          "Update POD is failed",
          err.message || err
        );
      }
    },
    async edit(val) {
      this.$emit("editPOD", val);
    },
    async actionRemove(val) {
      console.log(val, "ini data pod");
      await axios
        .delete(
          `${this.URL.employee}/${val.courier_employee_id}/delivery/cancel?n=${this.listenNodeId}&delivery_runsheet_number=${val.delivery_runsheet_number}&koli_number=${val.koli_number}`,
          this.Helper.header()
        )
        .then((res) => {
          console.log(
            res.data,
            res.data.data.length,
            Object.keys(res.data.data).length,
            "inires"
          );
          if (Object.keys(res.data.data).length > 0) {
            this.refresh();
          } else {
            this.$router.push({ name: "DeliveryRunsheetEdit", params: {} });
          }
          this.openNotification(
            "success",
            "Romove success",
            "Romove Koli number item successfully"
          );
        })
        .catch((err) => {
          this.loading = false;
          this.openNotification("danger", "Romove bag item is failed", err);
        });
    },
    actionUpdate(key, val) {
      switch (val) {
        case "confirm":
          console.log("confirms", key, val);
          this.runsheetAction(key);
          break;
        case "edit":
          this.edit(key);

          break;
        default:
          console.log("meong");
        // code block
      }
    },
    updateSelected(arr) {
      const { selected } = this.$refs.tableMaster;
      const filtered = selected.filter(
        (item) => item.status_delivery_description === null
      );

      this.$refs.tableMaster.selected = filtered;

      this.$emit("update-selected", filtered);
    },
    closeDialogConfirm() {
      this.confirmDialog = false;
    },
    getParamRoute() {
      if (this.$route.params.employee_id) {
        this.employee_id = this.$route.params.employee_id;
      }
    },

    onAllCheckCallback(val, selected) {
      if (val) {
        const filtered = selected.filter(
          (item) => item.status_delivery_description === null
        );

        this.$refs.tableMaster.selected = filtered;
        this.$refs.tableMaster.$vs.checkAll(filtered, this.dataTable);
        this.$refs.tableMaster.allCheck = filtered.length > 0;

        this.$emit("update-selected", filtered);
      }
    },

    onRowClickCallback(event, item, selected) {
      const filtered = this.$refs.tableMaster.selected.filter(
        (item) => item.status_delivery_description === null
      );

      this.$refs.tableMaster.selected = filtered;
      this.$refs.tableMaster.allCheck = filtered.length > 0;

      this.$emit("update-selected", filtered);
    },
  },
};
</script>
