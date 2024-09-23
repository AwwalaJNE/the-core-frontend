<template>
  <dialog-master
    :actived="listenActive"
    width="lg"
    :closeDialog="cancel"
    class="custom-width"
  >
    <template v-slot:header>
      <div class="button-helper">
        <div class="title-helper">
          {{ listenTitle }}
        </div>
        <vs-button @click="print">
          Print
        </vs-button>
        <vs-button @click="approve" :danger="is_approve === 1">
          {{ is_approve === 1 ? 'Unapproved' : 'Approve' }}
        </vs-button>
      </div>
    </template>

    <template v-slot:content>
      <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
      <vs-row>
        <vs-col lg="5" sm="5">
          <div>
            <form-input-controller
              ref="formSuratMuatanController"
              @formData="formData"
              :dataItem="listenDataItem"
              typeForm="surat_muatan"
              :querySearch="querySearch"
              :itterateUrlAutoComplete="listenItterateUrlAutoComplete"
              :itterateFlagAutoComplete="listenItterateFlagAutoComplete"
              @onChangeCustom="onChangeOrigin"
              @inputFocus="inputFocus"
              :isDisabled="isDisabled"
            />
          </div>
        </vs-col>
        <vs-col lg="7" sm="7">
          <vs-row>
            <vs-col>
              <vs-input
                border
                type="text"
                v-model="item_code"
                label-placeholder="Masukkan nomor bag"
                v-on:keyup.enter="updateValue"
                :autofocus="true"
                icon-after
                ref="formInputItemManifest"
                @click-icon="handleIconClick"
                :disabled="isDisabled"
              >
                <template #icon>
                  <i class="bx bx-barcode-reader"></i>
                </template>
              </vs-input>
            </vs-col>
          </vs-row>

          <!-- display informasi surat muatan-->
          <vs-row>
            <vs-col style="overflow: auto;">
              <table-master
                :dataTable="dataTable"
                :dataColumn="datacolumn"
                :tableLoading="loading"
                :pageSize="pagination.page_size"
                :page="pagination.page"
                :limit="pagination.limit"
                :hasAction="false"
                :hasPagination="false"
                @actionPagination="actionPagination"
              />
              <!-- klo mau ada action remove 
                    :customAction="true"
                      :customActionList="customActionList"
                      @actionUpdate="actionUpdate" -->
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
    </template>

    <template v-slot:footer>
      <vs-row justify="flex-end">
        <vs-col w="2">
          <vs-button
            transparent
            block
            danger
            flat
            :active="true"
            @click="cancel"
          >
            Close
          </vs-button>
        </vs-col>
        <vs-col w="2">
          <vs-button
            transparent
            block
            flat
            :active="true"
            type="submit"
            @click="handleSubmit"
            :disabled="isDisabled"
          >
            {{ btnBlue || "Save" }}
          </vs-button>
        </vs-col>
      </vs-row>
    </template>
  </dialog-master>
</template>

<script>
import axios from "axios";
import moment from "moment";
import master from "@/mixins/master";
import FormInputController from "@/components/form/formInputController";
import DialogMaster from "@/components/dialog/dialogMaster";
import TableMaster from "@/components/table/tableMaster.vue";
import CameraScanner from "@/components/scanner/camera";

export default {
  name: "dialog-create-edit-surat_muatan",
  mixins: [master],
  components: {
    "dialog-master": DialogMaster,
    "form-input-controller": FormInputController,
    "table-master": TableMaster,
    CameraScanner,
  },
  props: {
    closeDialog: Function,
    active: Boolean,
    title: String,
    dataItem: Object,
    btnRed: String,
    btnBlue: String,
  },
  data() {
    return {
      form: {},
      node_id: "",

      manifest_number: "",
      item_code: "",
      dataTable: [],
      datacolumn: [
        {
          label: "Item No",
          key: "bag_number",
          width: "sm",
        },
        {
          label: "Type",
          key: "type",
          width: "xs",
        },
        {
          label: "Weight (Kg)",
          key: "bag_weight",
          width: "xs",
        },
        {
          label: "Destination",
          key: "destination_name",
          width: "xs",
        },
        {
          label: "Received",
          key: "received_status",
          type: "status",
          width: "xs",
        },
      ],
      // customActionList: [
      //   {
      //     label: 'Remove',
      //     key: 'remove',
      //     attribute: 'danger',
      //   }
      // ],
      loading: false,
      loadingConfirmApprove: false,
      pagination: {
        limit: 5,
        page_size: 1,
        page: 1,
      },

      vehicle_mode_id: "",
      vehicle_type_id: "",
      node_id_origin: "",
      vehicle_id: "",
      manifest_method_id: "",
      flight_number: "",
      flight_schedule: "",
      autoComplateUrl: "",
      itterateUrlAutoComplete: "",
      itterateFlagAutoComplete: "node_name",
      etd: null,
      estimated_time_in_hour: null,
      isDisabled: false,
      is_approve: 0
    };
  },
  computed: {
    listenActive() {
      return this.active;
    },
    listenTitle() {
      return this.title;
    },
    listenDataItem() {
      return this.dataItem || {};
    },
    listenItterateUrlAutoComplete() {
      return this.itterateUrlAutoComplete;
    },
    listenItterateFlagAutoComplete() {
      return this.itterateFlagAutoComplete;
    },
  },
  watch: {
    dataItem: function(val) {
      if (val !== undefined) {
        if (val.status !== 'READY' || val.is_orion == "1" || val.is_approve == 1) {
          this.isDisabled = true
        }
        else {
          this.isDisabled = false
        }
      }
 
      // if(val !== undefined) {
      //     this.node_id = val.node_id
      //     this.manifest_number = val.manifest_number
      //     this.vehicle_mode_id = val['vehicle_mode_id'] ? val['vehicle_mode_id'] : null
      //     this.vehicle_type_id = val['vehicle_type_id'] ? val['vehicle_type_id'] : null
      //     this.initDataItem()
 
      // }
    },
    active: function(val) {
      if (val == true) {
        this.getDataVehicleMode();
        this.originNode()
        this.getDataEmployee();

        if (Object.keys(this.listenDataItem).length > 0) {
          // if this.listenDataItem ada isinya

          this.initDataItem();
        }
      }
    },
  },
  methods: {
    initDataItem() {
      this.node_id = this.listenDataItem.node_id;
      this.manifest_number = this.listenDataItem.manifest_number;      
      this.is_approve = this.listenDataItem.is_approve;

      this.vehicle_mode_id = this.listenDataItem[
        "vehicle_mode_id"
      ];
      this.vehicle_type_id = this.listenDataItem["vehicle_type_id"]
        ? this.listenDataItem["vehicle_type_id"]
        : null;

      if (this.vehicle_mode_id != null && this.vehicle_mode_id != "") {
        this.getDataVehicleType();
      }
      if (this.vehicle_type_id != null && this.vehicle_mode_id != "") {
        this.getDataVehicle();
      }

      if (this.listenDataItem.hasOwnProperty("detail")) {
        let arr = [];
        this.listenDataItem["detail"].map((data) => {
          data.received_status = data.received_at ? 1 : 0
          if (data.item_number) {
            data["bag_number"] = data.item_number;
            data["type"] = data.item_type;
            data["bag_weight"] = data.total_weight;

            if (data["bag"] && data["bag"]["destination"] && data["bag"]["destination"]["node_tariff_code"]) {
              data["destination_name"] = data["bag"]["destination"]["node_tariff_code"];
            } else {
              data["destination_name"] = ''
            }
            arr.push(data);
          }
        });

        this.dataTable = arr;
      }
      console.log(
        "init listenDataItem, bag",
        this.listenDataItem,
        this.dataTable
      );
      // siapin url untuk input autocomplete
      // let url = this.URL.node +'/'+ this.listenNodeId +'/origin-link?n=' +this.listenNodeId+ '&sort_order=desc&limit=15&page=1'
      // this.autoComplateUrl = url
      // this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN_URL", url)
    },
    // actionUpdate(val, key) {
    //   switch(key) {
    //         case 'remove':
    //           let filter = this.dataTable.filter(item => item.bag_number !== val.bag_number)
    //           this.dataTable = filter
 
    //         default:
 
    //             // code block
    //     }
    // },
    inputFocus(info) {
 
      if (info && info.hasOwnProperty("key")) {
        let url = "";
        switch (info["key"]) {
          case "node_id_origin":
            url =
              this.URL.node +
              "/" +
              this.listenNodeId +
              "/origin-link?n=" +
              this.listenNodeId +
              "&vehicle_mode_id=" +
              this.vehicle_mode_id;
            this.autoComplateUrl = url;
            break;
          case "node_id_destination":
            let transit = this.$store.getters["getInputs"]["surat_muatan"][
              "dynamicinputcomponent_node_id_transit"
            ];
            let arr = transit["arrData"];
 

            let nodeId = this.node_id_origin;
            // jika punya transit
            if (arr && arr.length > 0) {
              if (arr[arr.length - 1].hasOwnProperty("inputs")) {
                let data = arr[arr.length - 1]["inputs"][0]["data"];
                nodeId = data["node_id"]
                  ? data["node_id"]
                  : this.node_id_origin;
              }
            }

            url =
              this.URL.node +
              "/" +
              nodeId +
              "/destination-link?n=" +
              this.listenNodeId +
              "&vehicle_mode_id=" +
              this.vehicle_mode_id +
              "&sort_order=desc&limit=15&page=1";
            this.autoComplateUrl = url;
            break;
          default:
          // code block
        }
      }
    },
    querySearch(queryString, cb) {
      // let flag = this.listenFlag
 
 
      axios
        .get(this.autoComplateUrl + `&s=${queryString}`, this.Helper.header())
        .then((res) => {
          let result = res.data.data;
 
          let suggestions = [];

          result.length > 0 &&
            result.map((item) => {
              if (item.hasOwnProperty("node_name")) {
                suggestions.push({
                  value: item["node_name"],
                  data: item,
                });
              }
            });

 

          cb(suggestions);
        })
        .catch((error) => console.log("error", error));
    },
    formData(form) {
      let node_id = form["node_id_origin"] ? form["node_id_origin"]["node_id"] : this.listenActiveUser.nodes[0].node_id;
      form["node_id_origin"] = node_id;
      form["node_id_destination"] = form["node_id_destination"]["node_id"];

      if (form.hasOwnProperty("dynamicinputcomponent_node_id_transit")) {
        if (form["dynamicinputcomponent_node_id_transit"].length > 0) {
          form["node_id_transit_1"] = form[
            "dynamicinputcomponent_node_id_transit"
          ][0]
            ? form["dynamicinputcomponent_node_id_transit"][0]["inputs"][0][
                "data"
              ]["node_id"]
            : "";

          form["node_id_transit_2"] = form[
            "dynamicinputcomponent_node_id_transit"
          ][1]
            ? form["dynamicinputcomponent_node_id_transit"][1]["inputs"][0][
                "data"
              ]["node_id"]
            : "";

          form["node_id_transit_3"] = form[
            "dynamicinputcomponent_node_id_transit"
          ][2]
            ? form["dynamicinputcomponent_node_id_transit"][2]["inputs"][0][
                "data"
              ]["node_id"]
            : "";
        }
      }
      // form["vehicle_type_id"] = form["vehicle_mode_id"]
      // form["max_weight"] = 1


      form['auto_depart'] = form['auto_depart']

      this.form = form;

      if (this.form.eta > this.form.etd) {
        if (this.manifest_number !== undefined && this.manifest_number !== "") {
          this.form.manifest_number = this.manifest_number;
          this.form.etd = moment(this.form.etd).format("YYYY-MM-DD HH:mm:ss");
          this.form.eta = moment(this.form.eta).format("YYYY-MM-DD HH:mm:ss");
          this.updateData();
        } else {
          this.node_id = this.listenNodeId;
          this.form.pickup_node_id_requestor = this.node_id;
          this.addData();
        }
      } else {
        this.openNotification(
          "warning",
          "Wrong Input in ETA/ETD field",
          "ETA must more than ETD"
        );
      }
    },
    handleSubmit() {
      this.$refs.formSuratMuatanController.handleSubmit(); // trigger function submit form dari luar component formInputController
    },
    handleClearForm() {
      this.$refs.formSuratMuatanController.handleClearForm();
      this.form = {};
      this.item_code = "";
      this.manifest_number = "";
      this.dataTable = [];
    },
    async getDataVehicleMode() {
      await axios
        .get(
          this.URL.vehicle_mode +
            `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
          this.Helper.header()
        )
        .then((res) => {
          if (res.data.data.length > 0) {
            let arr = [];
            res.data.data.map((item) => {
              let obj = {};
              obj["label"] = item.vehicle_mode_name;
              obj["value"] = item.vehicle_mode_id;
              obj["data"] = item;

              arr.push(obj);
            });
            this.$store.dispatch(
              "SET_SURAT_MUATAN_MANIFEST_METHOD_ID_ArrData",
              arr.length > 0 ? arr : null
            );
          }
        })
        .catch((err) => {
          // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
        });
    },

    async getDataVehicleType() {
      await axios
        .get(
          this.URL.vehicle_type +
            `?n=${this.listenNodeId}&vehicle_mode_id=${this.vehicle_mode_id}&sort_order=desc&limit=1000&page=1`,
          this.Helper.header()
        )
        .then((res) => {
          let arr = [];
          if (res.data.data.length > 0) {
            res.data.data.map((item) => {
              let obj = {};
              obj["label"] = item.vehicle_type_name;
              obj["value"] = item.vehicle_type_id;
              obj["data"] = item;

              arr.push(obj);
            });
          } else {
            arr = [{ label: null, value: null, data: {} }];
          }
          this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_TYPE_ID_ArrData", arr);
        })
        .catch((err) => {
          // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
        });
    },

    async getDataVehicle() {
      await axios
        .get(
          this.URL.vehicle +
            `?n=${this.listenNodeId}&vehicle_type_id=${this.vehicle_type_id}&sort_order=desc&limit=1000&page=1`,
          this.Helper.header()
        )
        .then((res) => {
          if (res.data.data.length > 0) {
            let arr = [];
            res.data.data.map((item) => {
              let obj = {};
              obj["label"] = `${item.vehicle_name} (${item.vehicle_police_no})`;
              obj["value"] = item.vehicle_id;

              arr.push(obj);
            });
            this.$store.dispatch(
              "SET_SURAT_MUATAN_VEHICLE_ID_ArrData",
              arr.length > 0 ? arr : null
            );
          } else {
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID", "");
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID_ArrData", []);

            this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID", "");
            this.$store.dispatch(
              "SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData",
              []
            );
          }
        })
        .catch((err) => {
          // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
        });
    },

    async getDataEmployee() {
      //this.URL.employee + `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`
      await axios
        .get(
          this.URL.employee +
            `/driver?n=${this.listenNodeId}`,
          this.Helper.header()
        )
        .then((res) => {
          if (res.data.data.length > 0) {
            let arr = [];
            res.data.data.map((item) => {
              let obj = {};
              obj["label"] = item.employee_name;
              obj["value"] = item.employee_id;

              arr.push(obj);
            });
            // this.dataNodeType = arr
            this.$store.dispatch(
              "SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData",
              arr.length > 0 ? arr : null
            );
          } else {
            this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID", "");
            this.$store.dispatch(
              "SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData",
              []
            );
          }
        })
        .catch((err) => {
          // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
        });
    },

    async updateData() {


      if (this.vehicle_mode_id) {
        this.form.vehicle_mode_id = this.vehicle_mode_id; //remove if vehicle_mode_id not editable
      }
      if (this.vehicle_mode_id !== 1) {
        this.form.flight_number = null;
        this.form.flight_schedule = null;
      }
      this.form.manifest_item = this.dataTable;
      await axios
        .put(
          this.URL.surat_muatan +
            `/${this.manifest_number}?n=${this.listenNodeId}`,
          JSON.stringify(this.form),
          this.Helper.header()
        )
        .then((res) => {
          this.handleClearForm();
          this.closeDialog();
          this.$emit("refresh");
          this.openNotification(
            null,
            "Update success",
            "Update  surat muatan is success"
          );
        })
        .catch((err) => {
          this.loading = false;
          this.closeDialog();
          this.$emit("refresh");
          this.openNotification("danger", err.response ? err.response.data.code : '', "Update failed", err);
        });
    },

    async addData() {
 
      this.form.manifest_item = this.dataTable;

      await axios
        .post(
          this.URL.surat_muatan + `?n=${this.listenNodeId}`,
          JSON.stringify(this.form),
          this.Helper.header()
        )
        .then((res) => {
          this.handleClearForm();
          this.closeDialog();
          this.$emit("refresh");
          this.openNotification(
            null,
            "Create Success",
            "Create surat muatan is success"
          );
        })
        .catch((err) => {
          this.loading = false;
          this.closeDialog();
          this.$emit("refresh");
          this.openNotification(
            "danger",
            err.response ? err.response.data.code : '',
            err.response ? err.response.data.message : "something went wrong",
            err
          );
        });
    },
    async approve(){
        await axios
          .put(
            `${this.URL.approval}-manifest/${this.manifest_number}?n=${this.listenNodeId}`,
              JSON.stringify({
                is_approve: this.is_approve ^ 1
              }),
              this.Helper.header()
          )
          .then(res => {
            this.is_approve ^= 1;
            this.openNotification("success", null, "Success", res?.data?.message);
          })
          .catch(err => {
            this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed', err?.response?.data?.message ?? 'something went wrong'); 
          });
    },
    print(){
      let routeData = this.$router.resolve({ 
        name: 'printGeneral', 
        params: { 
            'id': this.manifest_number, 
            'type': 'manifest',
            'node_id': this.listenNodeId
        } 
      });
      window.open(routeData.href, '_blank');

    },
    cancel() {
      this.handleClearForm();
      this.closeDialog();
      this.dataTable = [];
    },
    updateValue(val) {
      if (this.dataItem !== undefined) {
        if (this.dataItem.status !== 'READY' || this.dataItem.is_orion == '1') {
          let notification = this.dataItem.status === 'CANCELED' ? "SM is Canceled" : "SM is Departed"
          if (this.dataItem.is_orion == '1') {
            notification = "ORION DATA"
          }
          this.openNotification(
            "warning",
            "Edit Forbidden",
            notification
          );
          return
        }
      }
      let hasData = this.dataTable.filter(
        (item) => item["bag_number"] == this.item_code
      );

      if (hasData.length == 0) {
        this.getDataManifest(this.item_code);
      } else {
        this.openNotification(
          "warning",
          "Bag sudah ada",
          "Bag sudah ada di dalam list"
        );
      }
    },

    async getDataManifest(val) {
      await axios
        .get(
          this.URL.surat_muatan + `/scan?item_no=${val}&n=${this.listenNodeId}`,
          this.Helper.header()
        )
        .then((res) => {
          if (res.data.data.length > 0) {
            let arr = res.data.data;
            arr.map((item) => {
              item["type"] = "Bag";
              item["destination_name"] = item["destination"]
                ? item["destination"]["node_tariff_code"]
                : "";
            });
            this.dataTable = this.dataTable.concat(arr);
 
          } else {
            this.openNotification(
              "danger",
              "Failed Get Data",
              "Bag yang dicari tidak ditemukan"
            );
          }
          this.item_code = "";
        })
        .catch((err) => {
          this.item_code = "";
          this.openNotification("danger", err.response ? err.response.data.code : '', "Failed Get Data", err.response ? err.response.data.message : 'something went wrong');
        });
    },
    actionPagination(val) {
      this.pagination.page = val;
      this.refresh();
    },

    onChangeOrigin(type, val, info = {}) {
 
      if (this.manifest_method_id !== "" && type == "manifest_method_id") {
        this.manifest_method_id !== val && this.resetForm();
        // setTimeout(function(){ }, 3000);
      }
      switch (type) {
        case "vehicle_type_id":
          if (info.hasOwnProperty("data")) {
            this.vehicle_type_id = info.data.vehicle_type_id || "";
            this.getDataVehicle();
          }
          break;
        case "manifest_method_id":
          this.manifest_method_id = val;
          if (type == "manifest_method_id" && val == 1) {
            this.$store.dispatch(
              "SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible",
              false
            );
            this.$store.dispatch(
              "SET_SURAT_MUATAN_FLIGHT_NUMBER_visible",
              true
            );
            this.$store.dispatch(
              "SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible",
              true
            );
            // this.jenisKiriman(true);
          } else if (type == "manifest_method_id" && val != 1) {
            // this.jenisKiriman(false);
            this.$store.dispatch(
              "SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible",
              true
            );
            this.$store.dispatch(
              "SET_SURAT_MUATAN_FLIGHT_NUMBER_visible",
              false
            );
            this.$store.dispatch(
              "SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible",
              false
            );
          }
          if (info.hasOwnProperty("data")) {
            this.vehicle_mode_id = info.data.vehicle_mode_id || "";

            let url =
              this.URL.node +
              "/" +
              this.listenNodeId +
              "/origin-link?n=" +
              this.listenNodeId +
              "&vehicle_mode_id=" +
              this.vehicle_mode_id +
              "&sort_order=desc&limit=15&page=1";
            this.autoComplateUrl = url;

            this.getDataVehicleType();
          }
          break;
        case "vehicle_id":
          this.vehicle_id = val;
          // this.getDataEmployee();
          break;
        case "node_id_origin":
          if (Object.keys(info).length > 0) {
            if (info.hasOwnProperty("data")) {
              this.node_id_origin = info["data"]["node_id"];
              let url =
                this.URL.node +
                "/" +
                this.node_id_origin +
                "/destination-link?n=" +
                this.listenNodeId +
                "&vehicle_mode_id=" +
                this.vehicle_mode_id +
                "&sort_order=desc&limit=15&page=1";
              this.itterateUrlAutoComplete = url;
            }
          }
          break;
        case "node_id_destination":
          if (typeof info === "object") {
            if (info.hasOwnProperty("data")) {
              this.estimated_time_in_hour = info["data"].estimated_time_in_hour;
              this.handleEta(this.etd, this.estimated_time_in_hour);
            }
          }
          break;
        case "etd":
          this.etd = val;
          this.handleEta(this.etd, this.estimated_time_in_hour);

          break;
        default:
 
      }
    },
    originNode(){
      if (this.listenActiveUser.nodes.length > 0) {
          const nodeName = this.listenActiveUser.nodes[0].node_name;
          const nodeId = this.listenActiveUser.nodes[0].node_id;
          this.node_id_origin = nodeId;
          this.$store.dispatch('SET_SURAT_MUATAN_NODE_ID_ORIGIN', nodeName);
        }
    },
    resetForm() {
      // this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData", [{label: null, value: null, data: {}}])
      // this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN", "");
      // this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN_ValueData", {});

      this.$store.dispatch(
        "SET_SURAT_MUATAN_DYNAMICINPUTCOMPONENT_NODE_ID_TRANSIT",
        []
      );

      this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION", "");
      this.$store.dispatch(
        "SET_SURAT_MUATAN_NODE_ID_DESTINATION_ValueData",
        {}
      );

      this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData", []);

      this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_TYPE_ID", "");
      this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_TYPE_ID_ArrData", []);

      this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID", "");
      this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID_ArrData", []);
    },
    handleEta(dateTime, amount) {
      if (dateTime && amount) {
        let dateEta = moment(dateTime)
          .add(amount, "hours")
          .format("YYYY-MM-DD HH:mm:ss");
        this.$store.dispatch("SET_SURAT_MUATAN_ETA", dateEta);
      }
    },
    // jenisKiriman(type){
    //   let arr = [
    //     {
    //       label:"DG",
    //       value:1,
    //     },{
    //       label:"Genko",
    //       value:2,
    //     },{
    //       label:"GoSynergy",
    //       value:3,
    //     },{
    //       label:"Special Cargo",
    //       value:4,
    //     }
    //   ];
    //   this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_TYPE_ID_visible", type)
    //   this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_TYPE_ID_ArrData", arr.length > 0 ? arr : null)
    // }

    onCameraScannerGetData(data) {
      if (!this.isDisabled) {
        if (data && data.event === "result") {
          if (data.namespace === "formInputItemManifest") {
            this.item_code = data.data.text;
            this.updateValue();
          }
        }
      }
    },
    handleIconClick() {
      if (!this.isDisabled) {
        this.$refs.cameraScanner.open('formInputItemManifest');
      }
    },
  },
  mounted() {
    // this.getDataEmployee()
  },
};
</script>
<style scoped>
.title-helper {
  width: 60%;
  align-content: center;
}

.button-helper {
  display: flex; 
  justify-content: flex-end;
}

button {
  width: 6em;
}
</style>
