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
        :customAction="false"
        :customActionList="customActionList"
        :isMultipleSelectColoum="true"
        :onRowClickCallback="onRowClickCallback"
        :allCheckCallback="onAllCheckCallback"
        :disableAction="disableEdit"
        @actionRemove="actionRemove"
        @updateValue="updateValue"
        @actionUpdate="actionUpdate"
        @updateSelected="updateSelected"
        @inputFocus="onClickClear"
        @actionPopup="actionPopup"
      />
      <dialog-warning-runsheet
        title="Warning Info"
        :warning_id="warning_id"
        :active="openDialogWarning"
        :closeDialog="closeActionPopup"
      />
    </template>
  </div>
</template>
<script>
/* eslint-disable semi, indent, quotes, import/extensions */
import axios from "axios";
import master from "@/mixins/master";
import TableMaster from "@/components/table/tableMaster.vue";
import DialogWarningRunsheet from "@/views/delivery/runsheet/edit/dialogWarningRunsheet"
export default {
  name: "InboundIncoming",
  components: {
    "table-master": TableMaster,
    "dialog-warning-runsheet": DialogWarningRunsheet,
  },
  mixins: [master],
  props: {
    loading: Boolean,
    query: String,
    employeeId: String,
    deliveryNumber: String,
    arrStatus: Array,
    dataDelivery: [Object, Array],
    radioOption: String,
    selectedItems: Array
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
          width: "auto",
        },
        {
          label: "",
          key: "warning_koli_record_id",
          type: "inputan",
          typeInput: "icon",
          width: "auto",
        },
        {
          label: "Koli / Connote Number",
          key: "koli_number",
          width: "auto",
        },
        {
          label: "Created Date",
          key: "created_at",
          width: "auto",
        },
        {
          label: "ZipCode",
          key: "connote_receiver_zip_code",
          width: "auto",
        },
        {
          label: "Kelurahan",
          key: "connote_receiver_subdistrict_name",
          width: "auto",
        },
        {
          label: "Service",
          key: "connote_service_code",
          width: "auto",
        },
        {
          label: "Status Code",
          key: "status_code",
          width: "auto",
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
          columnCaption: true
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
          label: "COD (Rp)",
          key: "amount_cod",
          width: "auto",
          type_amount: true,
                    textAlign: "right"
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
          width: "auto",
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
        {
          label: "Edit",
          key: "edit",
          attribute: "",
        },
      ],
      test: "",
      waitToRoleRenderer: true,
      arrayOfObjects: [],
      radio_option: "",
      disableEdit: false,
      openDialogWarning: false,
      warning_id: ''
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
    selectedItems(val) {
      if (val.length === 0) {
        this.$refs.tableMaster.selected = [];
        this.$refs.tableMaster.allCheck = false;
      }
    }
  },
  mounted() {
    // this.datacolumn.map((item) => {
    //   if (item.key == "status_delivery") {
    //     item.data = this.arrStatus;
    //   }
    // });


    this.getParamRoute();
    this.getHRSStatus();
    this.getPODOrion();
  },
  methods: {
    getWarningIcon(item) {
      return item.warning_koli_record_id ? '<i class="bx bxs-error-circle icon-warning"></i>' : 'No Warning';
    },
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

        this.openNotification("success", null, "POD UPDATED!");

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
            null,
            "Romove success",
            "Romove Koli number item successfully"
          );
        })
        .catch((err) => {
          this.loading = false;
          this.openNotification("danger", err.response ? err.response.data.code : '', "Romove bag item is failed", err);
        });
    },
    actionUpdate(key, val) {
      switch (val) {
        case "confirm":

          this.runsheetAction(key);
          break;
        case "edit":
          this.edit(key);

          break;
        default:

        // code block
      }
    },
    actionPopup(id) {
      this.warning_id = id;
      this.openDialogWarning = true;
    },
    closeActionPopup() {
      this.openDialogWarning = false;
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
    getHRSStatus() {
      for (let data of this.dataDelivery) {
        if (data?.is_hrs === '1') {
          this.$set(data, 'is_disabled_input_status', true);
          this.$set(data, 'is_disabled_input_remarks', true);
          this.$set(data, 'is_disabled_input_reveiver', true);
          if (!this.disableEdit) {
            this.disableEdit = true
          }
        }
      }
    },
    getPODOrion() {
      for (let data of this.dataDelivery) {
        if (data?.is_hrs === '1') {
          this.$set(data, 'is_disabled_input_status', true);
          this.$set(data, 'is_disabled_input_remarks', true);
          this.$set(data, 'is_disabled_input_reveiver', true);
        }
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
      else {
        this.$emit("update-selected", selected);
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