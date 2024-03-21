<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div>
    <vs-row justify="space-between">
      <vs-col xs="6" sm="4" lg="4">
        <div class="titlePage">
          <breadcrumb />
          <h2>{{ title }}</h2>
        </div>
      </vs-col>
    </vs-row>

    <section>
      <vs-row>
        <vs-col lg="12" sm="12" xs="12">
          <div class="box information" style="padding-top: 1px !important">
            <p align="left">
              <b>Courier</b>
            </p>
            <template>
              <p align="left">
                {{ employee_code }}
                ({{ employee_name }})
              </p>
            </template>

            <template>
              <div class="center in-get-bag">
                <vs-row style="margin-top:1em">
                  <vs-col xs="12" sm="4" lg="2" style="margin-bottom: 10px;">
                    <vs-radio v-model="radio_option" val="connote">
                      Connote (orion)
                    </vs-radio>
                  </vs-col>
                  <vs-col xs="12" sm="4" lg="2" style="margin-bottom: 10px">
                    <vs-radio v-model="radio_option" val="koli">
                      Koli
                    </vs-radio>
                  </vs-col>
                  <vs-col xs="12" sm="4" lg="3" >
                    <vs-radio v-model="radio_option" val="bag">
                      Bag Pra Runsheet
                    </vs-radio>
                  </vs-col>
                </vs-row>
              </div>
            </template>
            <div class="nav-box">
              <vs-row>
                <vs-col v-if="radio_option === 'bag'" xs="12" sm="3" lg="3" style="margin-top: 2em">
                  <div class="center">
                    <vs-input
                      ref="formInputConnote"
                      v-model="item_bag"
                      border
                      type="text"
                      label-placeholder="Scan Bag disini"
                      autofocus
                      icon-after
                      @keyup.enter="updateValueBag"
                      @click-icon="$refs.cameraScanner.open('formInputConnote')"
                    >
                      <template #icon>
                        <i class="bx bx-barcode-reader" />
                      </template>
                    </vs-input>
                  </div>
                </vs-col>
                <vs-col xs="12" sm="3" lg="3" style="margin-top: 2em">
                  <div v-if="radio_option === 'koli'" class="center">
                    <vs-input
                      ref="formInputConnote"
                      v-model="item_no"
                      border
                      type="text"
                      label-placeholder="Scan Koli here"
                      autofocus
                      icon-after
                      @keyup.enter="updateValue"
                      @click-icon="$refs.cameraScanner.open('formInputConnote')"
                    >
                      <template #icon>
                        <i class="bx bx-barcode-reader" />
                      </template>
                    </vs-input>
                  </div>
                  <div v-else-if="radio_option === 'connote'" class="center">
                    <vs-input
                      ref="formInputConnoteOrion"
                      v-model="item_no_orion"
                      border
                      type="text"
                      label-placeholder="Scan Connote here (orion)"
                      autofocus
                      icon-after
                      @keyup.enter="updateValueOrion"
                      @click-icon="
                        $refs.cameraScanner.open('formInputConnoteOrion')
                      "
                    >
                      <template #icon>
                        <i class="bx bx-barcode-reader" />
                      </template>
                    </vs-input>
                  </div>
                  <div v-else-if="radio_option === 'bag'" class="center">
                    <vs-input
                      ref="formInputConnote"
                      v-model="item_no"
                      border
                      type="text"
                      label-placeholder="Scan Koli disini "
                      autofocus
                      icon-after
                      @keyup.enter="updateValue"
                      @click-icon="
                        $refs.cameraScanner.open('formInputConnote')
                      "
                    >
                      <template #icon>
                        <i class="bx bx-barcode-reader" />
                      </template>
                    </vs-input>
                  </div>
                </vs-col>
                <vs-col xs="12" sm="3" lg="3" style="margin-top: 2em">
                  <div v-if="radio_option === 'koli'" class="center">
                    <vs-input
                      ref="formRemoveConnote"
                      v-model="item_no_remove"
                      border
                      type="text"
                      label-placeholder="Remove Koli here"
                      autofocus
                      icon-after
                      @keyup.enter="removeValue"
                      @click-icon="
                        $refs.cameraScanner.open('formRemoveConnote')
                      "
                    >
                      <template #icon>
                        <i class="bx bx-barcode-reader" />
                      </template>
                    </vs-input>
                  </div>
                  <div v-else-if="radio_option === 'connote'" class="center">
                    <vs-input
                      ref="formRemoveConnoteOrion"
                      v-model="item_no_orion_remove"
                      border
                      type="text"
                      label-placeholder="Remove Connote here (orion)"
                      autofocus
                      icon-after
                      @keyup.enter="removeValueOrion"
                      @click-icon="
                        $refs.cameraScanner.open('formRemoveConnoteOrion')
                      "
                    >
                      <template #icon>
                        <i class="bx bx-barcode-reader" />
                      </template>
                    </vs-input>
                  </div>
                  <div v-else-if="radio_option === 'bag'" class="center">
                    <vs-input
                      ref="formRemoveConnote"
                      v-model="item_no_remove"
                      border
                      type="text"
                      label-placeholder="Hapus Koli disini"
                      autofocus
                      icon-after
                      @keyup.enter="removeValue"
                      @click-icon="
                        $refs.cameraScanner.open('formRemoveConnote')
                      "
                    >
                      <template #icon>
                        <i class="bx bx-barcode-reader" />
                      </template>
                    </vs-input>
                  </div>
                </vs-col>
                <vs-col xs="12" sm="3" lg="3">
                  <template v-if="dataDelivery.length > 0">
                    <div class="left">
                      <ul style="float: left; text-align: left">
                        <li>
                          User :
                          {{
                            listenActiveUser ? listenActiveUser.user_login : ""
                          }}
                        </li>
                        <!-- <li>Date : {{ dataDelivery.delivery[0].date }}</li> -->
                        <li>
                          Total :
                          {{ dataDelivery.length + " Connotes" }}
                        </li>
                        <li>
                          Expectations COD :
                          {{ moneyformat(dataDeliverySummary.amount_cod) }}
                        </li>
                      </ul>
                    </div>
                  </template>
                </vs-col>
                <vs-col xs="6" sm="2" lg="1">
                  <template v-if="dataDelivery.length > 0">
                    <div>
                      <vs-button
                        :loading="loadingConfirm"
                        @click="confirmAction"
                        style="float: right"
                      >
                        <span>
                          Confirmed
                        </span>
                      </vs-button>
                    </div>
                  </template>
                </vs-col>
                <vs-col xs="6" sm="2" lg="1" class="mb-4">
                  <template v-if="dataDelivery.length > 0">
                    <div>
                      <vs-button
                        :loading="loadingConfirm"
                        @click="approveAction"
                        style="float: left"
                      >
                        <span>
                          Approve
                        </span>
                      </vs-button>
                    </div>
                  </template>
                </vs-col>
              </vs-row>
              <div v-if="radio_option === 'bag' && listenDataDelivery.length > 0" style="margin-top: 10px;">
                <vs-row justify="space-between">
                  <vs-col xs="12" sm="9" lg="9">
                    <nav-item :navItem="navItemm" @activeTab="activeTab" />
                  </vs-col>
                </vs-row>

                <template v-if="navActive === 'k-LIST-DELIVERY'">
                  <transition name="slide-fade">
                    <template v-if="listenDataDelivery.length > 0">
                      <RunsheetInformation v-if="arrStatus && dataDelivery" :ref="'runsheetInformation'"
                        :data-delivery="dataDelivery" :arr-status="arrStatus" :query="tempSearch"
                        :loading="loadingRunsheet" :delivery-number="delivery_runsheet_number"
                        :radioOption="radio_option" @update-selected="updateSelected" @updatePOD="updatePOD"
                        @editPOD="editPOD" />
                    </template>
                  </transition>
                </template>
                <template v-if="navActive === 'k-LIST-DELETE'">
                  <transition name="slide-fade">
                    <template v-if="radio_option === 'bag'">
                      <RunsheetInformationCancel v-if="arrStatus && dataDelivery" :ref="'runsheetInformationCancel'"
                        :data-delivery="dataDeliveryCancel" :arr-status="arrStatus" :query="tempSearch"
                        :loading="loadingRunsheet" :delivery-number="delivery_runsheet_number"
                        :radioOption="radio_option" @updatePOD="updatePOD" @editPOD="editPOD" />
                    </template>
                  </transition>
                </template>
              </div>
              <vs-row v-if="radio_option !== 'bag'">
                <!-- col for detail unreceive item--> 
                <vs-col lg="12" :sm="12" xs="12" style="margin-top: 2em;">
                  <template>
                    <transition name="slide-fade">
                      <template v-if="listenDataDelivery.length > 0 ">
                        <RunsheetInformation
                          v-if="arrStatus && dataDelivery"
                          :ref="'runsheetInformation'"
                          :data-delivery="dataDelivery"
                          :arr-status="arrStatus"
                          :query="tempSearch"
                          :loading="loadingRunsheet"
                          :delivery-number="delivery_runsheet_number"
                          :radioOption="radio_option"
                          @update-selected="updateSelected"
                          @updatePOD="updatePOD"
                          @editPOD="editPOD"
                        />
                      </template>
                    </transition>
                  </template>
                </vs-col>
              </vs-row>
            </div>
          </div>
        </vs-col>
      </vs-row>
      <vs-row justify="flex-end">
        <vs-button
          class="mt-1"
          style="float: right"
          square
          active
          @click="print"
        >
          <i class="bx bxs-printer" /> PRINT
        </vs-button>
        <vs-button
          class="mt-1"
          style="float: right"
          square
          active
          @click="back"
        >
          <i class="bx bx-left-arrow" /> BACK
        </vs-button>
      </vs-row>
    </section>

    <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
        <dialog-confirm
            :active="dialogConfirmEmployee" 
            :closeDialog="closeDialogConfirmEmployee"
            @updateValue="updateValueBag"
        />
  </div>
</template>
<script>
/* eslint-disable indent, semi, quotes, import/extensions, quote-props, operator-linebreak */
import axios from "axios";
import moment from "moment";
import master from "@/mixins/master";
import NavItem from "@/components/navbar/navTab";
import Breadcrumb from "@/components/breadcrumb/index";
import CameraScanner from "@/components/scanner/camera";

import RunsheetInformation from "@/views/delivery/runsheet/edit/runsheetInformation";
import RunsheetInformationCancel from "@/views/delivery/runsheet/edit/runsheetInformationCancel";
import DialogConfirm from "@/views/delivery/runsheet/edit/dialogConfirm";

export default {
  name: "DeliveryRunsheetEdit",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    "nav-item": NavItem,
    breadcrumb: Breadcrumb,
    RunsheetInformation,
    RunsheetInformationCancel,
    CameraScanner,
    "dialog-confirm": DialogConfirm
  },
  mixins: [master],
  // props: {
  //   radio_option: String
  // },
  data() {
    return {
      title: "Edit Assign",
      tempSearch: "",
      tempDate: [],
      dialogPickupRequest: false,
      item_no: "",
      item_bag: "",
      item_no_remove: "",
      item_no_orion_remove: "",
      item_no_orion: "",
      form: {},
      delivery_runsheet_number: "",
      employee_id: "",
      employee_data: {},
      dataDelivery: [],
      dataDeliveryCancel: [],
      summary: [],
      arrStatus: null,
      statusObj: {},
      dataDeliverySummary: null,
      loadingRunsheet: false,
      employee_code: "",
      employee_name: "",
      radio_option: "connote",

      loadingCourier: false,
      loadingConfirm: false,

      selectedUpdateItems: [],
      dialogConfirmEmployee: false,
      dialogLoadingEmployee: false,
      navItemm: [
        {
          label: "LIST DELIVERY",
          key: "k-LIST-DELIVERY",
          title: "Connote List"
        },
        {
          label: "DELETE",
          key: "k-LIST-DELETE",
          title: "Bag List"
        }
      ],
      navActive: "k-LIST-DELIVERY",
    };
  },
  computed: {
    listenDataDelivery() {
      return this.dataDelivery;
    },
    listenDataDeliveryCancel() {
      return this.dataDeliveryCancel;
    },
  },
  mounted() {
    this.getStatus();
  },
  methods: {
    // refresh() {
    //   this.$refs.runsheetInformation.refresh(); // trigger function refresh form dari luar component list
    // },
    reload() {
      this.getDataDelivery();
    },
    searchValue(val) {
      this.tempSearch = val;
    },
    searchDate(val) {
      this.tempDate = val;
    },
    clearSearch() {
      this.$refs.searchInput.clear();
    },
    closeDialogPickupRequest() {
      this.dialogPickupRequest = false;
    },
    openDialog() {
      this.dialogPickupRequest = true;
    },
    updateValueBag(val) {
      this.form.bag_number = this.item_bag;
      this.form.courier_employee_id = this.employee_id;
      this.item_no = null;
      this.form.koli_number = null;
      this.getKoli(val);
    },
    updateValue() {
      this.form.koli_number = this.item_no;
      this.form.courier_employee_id = this.employee_id;
      this.form.bag_number = null;
      this.scanConnote();
      this.item_no = null;
    },
    updateValueOrion() {
      this.form.koli_number = `${this.item_no_orion}00`;
      this.form.courier_employee_id = this.employee_id;
      this.form.bag_number = null;
      this.scanConnote();
      this.item_no = null;
    },
    removeValue() {
      this.form.koli_number = this.item_no_remove;
      this.form.courier_employee_id = this.employee_id;
      this.form.bag_number = null;
      this.removeConnote();
      this.item_no_remove = null;
    },
    removeValueOrion() {
      this.form.koli_number = `${this.item_no_orion_remove}00`;
      this.form.courier_employee_id = this.employee_id;
      this.form.bag_number = null;
      this.removeConnote();
      this.item_no_orion_remove = null;
    },
    getParamRoute() {
      this.employee_id = this.$route.params.employee_id.toString();
      this.getCourier();
      // this.employee_data.employee_name = this.$route.params.employee_name
      // this.employee_data.employee_code = this.$route.params.employee_code

      if (this.$route.name === "delivery-runsheet-edit") {
        this.delivery_runsheet_number = this.$route.params.delivery_runsheet_number.toString();
        this.tempDate =
          typeof this.$route.params.date_filter !== "undefined"
            ? this.$route.params.date_filter.toString()
            : moment().format("YYYY-MM-DD");

        this.getDataDelivery();
      }
    },
    async getCourier() {
      this.loadingCourier = true;
      await axios
        .get(
          `${this.URL.employee}/${this.employee_id}?n=${this.listenNodeId}`,
          this.Helper.header()
        )
        .then((res) => {
          const { data } = res.data;
          this.employee_code = data.employee_name;
          this.employee_name = data.employee_code;
          this.loadingCourier = false;
        })
        .catch((err) => {
          this.loadingCourier = true;
          // this.openNotification('danger', 'Failed to populate status', err)
        });
    },
    closeDialogConfirmEmployee() {
      this.dialogConfirmEmployee = false
      this.dialogLoadingEmployee = false
    },
    async getKoli(val) {
      await axios
        .get(
          this.URL.bag + '/' + this.form.bag_number.replaceAll("/", "-") + `?n=${this.listenNodeId}&courier_employee_id=${this.employee_id}`,
          this.Helper.header())
        .then(res => {
          const details = res.data.detail;
          let index = 0;
          for (let detail of details) {
            const item_number = detail.item_number;
            const detailsLength = details.length;
            const postData = {
              bag_number: this.form.bag_number,
              courier_employee_id: this.employee_id,
              koli_number: item_number
            };
            this.validation_employee = val === false ? val : res.data.validation_employee;
            if (this.validation_employee) {
              this.dialogConfirmEmployee = true;
            } else {
              this.dialogConfirmEmployee = false;
              // jika nomor runsheet kosong dan kirim data lebih dari 1
              // set timeout untuk mendapatkan nomor runsheet yang sama
              if (detailsLength > 1 && !this.delivery_runsheet_number && index > 0) {
                setTimeout(() => {
                    this.scanConnote(postData);
                }, 5000);
              } else {
                  this.scanConnote(postData);
              }
              index++;
            }
          }
          // this.refresh()
          // this.openNotification('success', ' success', 'Insert bag item successfully')
        }).catch(err => {
          this.loading = false
          this.openNotification('danger', ' Nomor bag item is failed', err)
        })
    },
    async scanConnote(postData) {
      this.loadingRunsheet = true;
      if (postData) {
        this.form = postData
      }
      await axios
        .post(
          `${this.URL.employee}/${this.employee_id}/delivery?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}`,
          JSON.stringify(this.form),
          this.Helper.header()
        )
        .then((res) => {
          // this.dataDelivery = this.processDataDelivery(res.data.data)
          // this.dataDelivery.map((item) => {
          //   item.employee_name = res.data.data.employee_name
          // })
          if (res.data.hasOwnProperty("summary")) {
            this.dataDelivery.employee_name = res.data.data.employee_name
              ? res.data.data.employee_name
              : null;
            this.dataDelivery.employee_code = res.data.data.employee_code
              ? res.data.data.employee_code
              : null;
            this.dataDeliverySummary = res.data.summary;
            this.delivery_runsheet_number = this.dataDeliverySummary.delivery_runsheet_number.toString();
            this.getDataDelivery();
            this.openNotification(null, "Success", "Update success");
            this.loadingRunsheet = false;
          } else {
            this.getDataDelivery();
            this.openNotification(null, "Success", res.data.message);
            this.loadingRunsheet = false;
          }
        })
        .catch((err) => {
          this.loadingRunsheet = false;
          this.openNotification("danger", "", err.response.data.message);
        });
    },
    async removeConnote() {
      // console.log("remove", this.form.koli_number);
      this.loadingRunsheet = true;
      await axios
        .delete(
          `${this.URL.employee}/${this.employee_id}/delivery/cancel?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}&koli_number=${this.form.koli_number}`,
          this.Helper.header()
        )
        .then((res) => {
          // this.dataDelivery = this.processDataDelivery(res.data.data)
          // this.dataDelivery.map((item) => {
          //   item.employee_name = res.data.data.employee_name
          // })
          if (res.data.hasOwnProperty("summary")) {
            this.dataDelivery.employee_name = res.data.data.employee_name
              ? res.data.data.employee_name
              : null;
            this.dataDelivery.employee_code = res.data.data.employee_code
              ? res.data.data.employee_code
              : null;
            this.dataDeliverySummary = res.data.summary;
            this.delivery_runsheet_number = this.dataDeliverySummary.delivery_runsheet_number.toString();
            this.getDataDelivery();
            this.openNotification(null, "Success", "Remove koli success");
            this.loadingRunsheet = false;
          } else {
            this.getDataDelivery();
            this.openNotification(null, "Success", res.data.message);
            this.loadingRunsheet = false;
          }
        })
        .catch((err) => {
          this.loadingRunsheet = false;
          this.openNotification("danger", "", err.response.data.message);
        });
    },
    async getStatus() {
      await axios
        .get(
          `${this.URL.status}?status_type=DELIVERY&n=${this.listenNodeId}&limit=-1`,
          this.Helper.header()
        )
        .then((res) => {
          const statusObj = {};
          this.arrStatus = res.data.data.map((item) => {
            const obj = {};
            obj.label = `${item.status_description}(${item.status_code})`;
            obj.value = item.status_code;
            obj.data = item;

            if (
              item.hasOwnProperty("status_condition") &&
              item.status_condition !== null
            ) {
              if (
                statusObj.hasOwnProperty(item.status_condition.toLowerCase())
              ) {
                statusObj[item.status_condition.toLowerCase()].push(obj);
              } else {
                statusObj[item.status_condition.toLowerCase()] = [obj];
              }
            }

            return obj;
          });
          this.statusObj = statusObj;
          this.getParamRoute(); // perlu data status dulu sebelum getDataDelivery didalam getParamRoute {fix issue data tidak tampil}
          // console.log("statusObj", statusObj)
        })
        .catch((err) => {
          // this.openNotification('danger', 'Failed to populate status', err)
        });
    },
    async getDataDelivery() {
      let deliveryCancel = this.radio_option === 'bag';
      this.loadingRunsheet = true;
      await axios
        .get(
          `${this.URL.employee}/${this.employee_id}/delivery?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}&date_filter=${this.tempDate}&deliveryCancel=${deliveryCancel}`,
          this.Helper.header()
        )
        .then((res) => {
          this.dataDelivery = this.processDataDelivery(res.data.data);
          this.dataDeliveryCancel = this.processDataDeliveryCancel(res.data.data);

          this.dataDeliverySummary = res.data.summary;
          this.delivery_runsheet_number = res.data.summary.delivery_runsheet_number.toString();
          this.loadingRunsheet = false;
        })
        .catch((err) => {
          this.loadingRunsheet = false;
          // this.openNotification('danger', 'Failed to populate status', err)
        });
    },
    processDataDelivery(data) {
      const status = this.statusObj || {};
      const delivery = data.delivery ? data.delivery : [];
      // eslint-disable-next-line array-callback-return
      delivery.map((item) => {
        item.status_delivery = [];
        item.is_disabled_input = false;
        if (item.hasOwnProperty("koli_number")) {
          if (item.koli_number.toLowerCase().includes("rt")) {
            item.status_delivery = [...status.rt, ...status.all];
          } else {
            item.status_delivery = [...status.normal, ...status.all];
          }
        }
        // if(item.hasOwnProperty("status")) {
        //   // item["is_disabled_input"] = item
        //   if(item["status"] !== null && typeof item["status"] == 'object') {
        //       if(item["status"].hasOwnProperty('status_code')) {
        //         item["is_disabled_input_status"] = item["status"]["status_code"] !== null || item["status"]["status_code"] !== "" ? true : false
        //       }
        //   }
        // }
        // if(item.hasOwnProperty("status_code")){
        //   if(item["status_code"] !== null && typeof item["status_code"] == 'string') {
        //     item["is_disabled_input_status"] = item["status_code"] !== null || item["status_code"] !== "" ? true : false
        //   }
        // }
        if (item.hasOwnProperty("remarks")) {
          if (item["status_code"] == null) {
            item["is_disabled_input_remarks"] =
              item["remarks"] !== null || item["remarks"] !== "" ? true : false;
          }
        }
        if (item.hasOwnProperty("receiver_name")) {
          if (item["status_code"] == null) {
            item["is_disabled_input_reveiver"] = item["receiver_name"] !== null || item["receiver_name"] !== "" ? true : false;
          }
        }
        // console.log(item.is_delivered, "data.is_delivered");
        item.isDisabled = item.is_delivered === 1;
        item.employee_name = data.employee_name;
        item.employee_code = data.employee_code;
      });
      // console.log(" processDataDelivery : status =>", status);
      // console.log(" processDataDelivery : delivery =>", delivery);

      return delivery;
    },
    processDataDeliveryCancel(data) {
      const status = this.statusObj || {};
      const deliveryCancel = data.delivery_cancel ? data.delivery_cancel : [];
      deliveryCancel.map((item) => {
        item.status_delivery = [];
        item.is_disabled_input = false;
        item["is_disabled_cancel"] = true;
        if (item.hasOwnProperty("koli_number")) {
          if (item.koli_number.toLowerCase().includes("rt")) {
            item.status_delivery = [...status.rt, ...status.all];
          } else {
            item.status_delivery = [...status.normal, ...status.all];
          }
        }
        item.isDisabled = item.is_delivered === 1;
        item.employee_name = data.employee_name;
        item.employee_code = data.employee_code;
      });

      return deliveryCancel;
    },
    async updatePOD(dataPOD, info) {
      // console.log(dataPOD, "ini data pod");
      if (dataPOD.remarks || dataPOD.receiver_name || dataPOD.status) {
        if (this.delivery_runsheet_number) {
          dataPOD.delivery_runsheet_number = this.delivery_runsheet_number;
          if (this.employee_id != null || this.employee_id !== "") {
            dataPOD.courier_employee_id = this.employee_id;
          }

          this.loadingConfirm = true;

          await axios
            .put(
              `${this.URL.delivery}/${this.delivery_runsheet_number}/detail?n=${this.listenNodeId}`,
              JSON.stringify(dataPOD),
              this.Helper.header()
            )
            .then((res) => {
              this.getDataDelivery();
              this.form = {};
              this.openNotification(null, "Success", "POD UPDATED!");
            })
            .catch((err) => {
              console.log("eror");
              console.log(err.response);
              this.openNotification(
                "danger",
                err.response.data.message,
                err.response.data.message
              );
            })
            .finally(() => {
              this.loadingConfirm = false;
            });
        } else {
          this.openNotification("danger", "Failed", "Runsheet unavailable!");
        }
      }
    },
    async editPOD(val) {
      const dataPOD = {
        courier_employee_id: val.courier_employee_id,
        delivery_runsheet_number: val.delivery_runsheet_number,
        koli_number: val.koli_number,
        status: val.status_code,
        remarks: val.remarks,
        receiver_name: val.receiver_name,
      };
      await axios
        .put(
          `${this.URL.delivery}/${val.delivery_runsheet_number}/edit?n=${this.listenNodeId}`,
          JSON.stringify(dataPOD),
          this.Helper.header()
        )
        .then((res) => {
          this.getDataDelivery();
          this.form = {};
          this.openNotification(null, "Success", "POD EDITED!");
        })
        .catch((err) => {
          console.log(err.response);
          this.openNotification(
            "danger",
            "EDIT FAILED !",
            err.response.data.message
          );
        });
    },
    back() {
      this.$router.push("/delivery/runsheet");
    },
    print() {
      const routeData = this.$router.resolve({
        name: "printGeneral",
        params: {
          id: this.delivery_runsheet_number,
          type: "delivery",
          employee_id: this.employee_id,
          node_id: this.listenNodeId,
        },
      });
      window.open(routeData.href, "_blank");
    },
    updateSelected(arr) {
      this.selectedUpdateItems = arr;
    },
    confirmAction() {
      if (this.selectedUpdateItems.length > 0) {
        // this.$refs.runsheetInformation.runsheetAction(this.selectedUpdateItems);
        this.selectedUpdateItems.forEach((item) => {
          const dataPOD = {
            // Construct the payload to be sent in the request body
            courier_employee_id: item.courier_employee_id,
            delivery_runsheet_number: item.delivery_runsheet_number,
            koli_number: item.koli_number,
            status: item.status_code,
            remarks: item.remarks,
            receiver_name: item.receiver_name,
          };

          this.updatePOD(dataPOD);
        });
      } else {
        this.openNotification(
          "danger",
          "Failed",
          "Please select at least one item"
        );
      }
    },
    approveAction(){
      this.updateApprove()
    },

    async updateApprove(){
      this.data_runsheet = {
        delivery_number_runsheet: this.delivery_runsheet_number,
      };
      await axios
        .put(
          `${this.URL.delivery}/${this.delivery_runsheet_number}/approve?n=${this.listenNodeId}`,
          JSON.stringify(this.data_runsheet),
          this.Helper.header()
        )
        .then((res) => {
          this.form = {};
          this.openNotification(null, "Success", "APPROVE EDITED!");
        })
        .catch((err) => {
          console.log(err.response,'ress');
          this.openNotification("danger", "approve FAILED !", err.response.data.message);
        });
    },
    

    onCameraScannerGetData(data) {
      if (data && data.event === "result") {
        const result = data.data;

        switch (data.namespace) {
          case "formInputConnoteOrion":
            this.item_no_orion = result.text;
            this.updateValueOrion();
            break;
          case "formInputConnote":
            this.item_no = result.text;
            this.updateValue();
            break;
          case "formRemoveConnote":
            this.item_no_remove = result.text;
            this.removeValue();
            break;
          case "formRemoveConnoteOrion":
            this.item_no_orion_remove = result.text;
            this.removeValueOrion();
            break;
          default:
            console.log("Unhandled event.", data);
            break;
        }
      }
    },
    activeTab(val) {
      this.navActive = val
      let item = this.navItemm.filter(item => {
        return item.key == val
      })
      this.title = item[0].title
    },
  },
  watch: {
    radio_option(val) {
      this.radio_option = val
      if (this.radio_option == 'bag') {
        this.getDataDelivery(val);
      }
    }
  }
};
</script>
<style lang="scss">
.mb-15 {
  margin-bottom: 1.5em;
}
.custom-title {
  padding: 0.6em;
  text-align: right;
  font-weight: 600;
}
.information {
  min-height: 190px;
}
.nav-box {
  margin-top: 1em;
}
</style>
