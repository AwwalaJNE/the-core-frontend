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
            <p align="left"><b>Courier</b></p>
            <template>
              <p align="left">
                {{ employee_code }}
                ({{ employee_name }})
              </p>
            </template>


            <div class="nav-box">
              <vs-row>
                <vs-col xs="4" sm="4" lg="4" style="margin-top: 2em">
                  <template>
                    <div class="center">
                      <vs-input
                        border
                        type="text"
                        v-model="item_no"
                        label-placeholder="Scan Connote here"
                        v-on:keyup.enter="updateValue"
                        autofocus
                        icon-after
                        ref="formInputConnote"
                      >
                        <template #icon>
                          <i class="bx bx-file"></i>
                        </template>
                      </vs-input>
                    </div>
                  </template>
                </vs-col>
                <vs-col xs="4" sm="4" lg="4" offset="2">
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
                          {{ dataDeliverySummary.amount_cod }}
                        </li>
                      </ul>
                    </div>
                  </template>
                </vs-col>
              </vs-row>

              <vs-row>
                <!-- col for detail unreceive item-->
                <vs-col lg="12" sm="12" xs="12" style="margin-top: 2em">
                  <template>
                    <transition name="slide-fade">
                      <template v-if="listenDataDelivery.length > 0">
                        <RunsheetInformation
                          v-if="arrStatus && dataDelivery"
                          :dataDelivery="dataDelivery"
                          :arrStatus="arrStatus"
                          :ref="'runsheetInformation'"
                          @updatePOD="updatePOD"
                          :query="tempSearch"
                          :loading="loadingRunsheet"
                          :deliveryNumber="delivery_runsheet_number"
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
          ><i class="bx bxs-printer"> </i> PRINT
        </vs-button>
        <vs-button class="mt-1" style="float: right" square active @click="back"
          ><i class="bx bx-left-arrow"> </i> BACK
        </vs-button>
      </vs-row>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import NavItem from "@/components/navbar/navTab";
import Breadcrumb from "@/components/breadcrumb/index";

import RunsheetInformation from "@/views/delivery/runsheet/edit/runsheetInformation";

export default {
  name: "delivery-runsheet-edit",
  mixins: [master],
  components: {
    "nav-item": NavItem,
    breadcrumb: Breadcrumb,
    RunsheetInformation: RunsheetInformation,
  },
  data() {
    return {
      title: "Edit Assign",
      tempSearch: "",
      tempDate: [],
      dialogPickupRequest: false,
      item_no: "",
      form: {},
      delivery_runsheet_number: "",
      employee_id: "",
      employee_data: {},
      dataDelivery: [],
      summary: [],
      arrStatus: null,
      statusObj: {},
      dataDeliverySummary: null,
      loadingRunsheet: false,
      employee_code: "",
      employee_name: "",
      
      loadingCourier: false
    };
  },
  computed: {
    listenDataDelivery() {
      return this.dataDelivery
    }
  },
  methods: {
    refresh() {
      // this.$refs.runsheetInformation.refresh(); // trigger function refresh form dari luar component list
    },
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
    updateValue() {
      this.form.koli_number = this.item_no;
      // this.form.delivery_runsheet_number = this.dataDelivery.delivery[0].delivery_runsheet_number
      this.form.courier_employee_id = this.employee_id;
      this.scanConnote();
      this.item_no = null;
    },
    getParamRoute() {
      this.employee_id = this.$route.params.employee_id.toString();
      this.getCourier()
      // this.employee_data.employee_name = this.$route.params.employee_name
      // this.employee_data.employee_code = this.$route.params.employee_code
      
      if (this.$route.name == "delivery-runsheet-edit") {
        this.delivery_runsheet_number = this.$route.params.delivery_runsheet_number.toString();
        this.getDataDelivery();

      }
    },
    async getCourier() {
      this.loadingCourier = true
      await axios
        .get(
          this.URL.employee +
            `/${this.employee_id}?n=${this.listenNodeId}`,
          this.Helper.header()
        )
        .then((res) => {
            let data = res.data.data
            this.employee_code = data["employee_name"] 
            this.employee_name = data["employee_code"]
          this.loadingCourier = false
        })
        .catch((err) => {
          this.loadingCourier = true
          // this.openNotification('danger', 'Failed to populate status', err)
        });
    },
    async scanConnote() {
      this.loadingRunsheet = true
      await axios
        .post(
          this.URL.employee +
            `/${this.employee_id}/delivery?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}`,
          JSON.stringify(this.form),
          this.Helper.header()
        )
        .then((res) => {
          // this.dataDelivery = this.processDataDelivery(res.data.data)
          // this.dataDelivery.map((item) => {
          //   item.employee_name = res.data.data.employee_name
          // })
          this.dataDelivery.employee_name = res.data.data.employee_name ? res.data.data.employee_name : null;
          this.dataDelivery.employee_code = res.data.data.employee_code ? res.data.data.employee_code : null;
          this.dataDeliverySummary = res.data.summary;
          this.delivery_runsheet_number = this.dataDeliverySummary.delivery_runsheet_number.toString();
          this.getDataDelivery();
          this.openNotification(null, "Success", "Update success");
          this.loadingRunsheet = false
        })
        .catch((err) => {
          this.loadingRunsheet = false
          this.openNotification("danger", "", err.response.data.message);
        });
    },
    async getStatus() {
      await axios
        .get(
          this.URL.status +
            `?status_type=DELIVERY&n=${this.listenNodeId}&limit=-1`,
          this.Helper.header()
        )
        .then((res) => {
          let statusObj = {}
          this.arrStatus = res.data.data.map((item) => {
            let obj = {};
            obj.label = item.status_description + "(" + item.status_code + ")";
            obj.value = item.status_code;
            obj["data"] = item
            
            if(item.hasOwnProperty("status_condition") && item["status_condition"] !== null) {
              if(statusObj.hasOwnProperty(item["status_condition"].toLowerCase())) {
                statusObj[item["status_condition"].toLowerCase()].push(obj)
              } else {
                statusObj[item["status_condition"].toLowerCase()] = [obj]
              }
            
            }
            
            return obj;
          });
          this.statusObj = statusObj
          this.getParamRoute(); // perlu data status dulu sebelum getDataDelivery didalam getParamRoute {fix issue data tidak tampil}
          // console.log("statusObj", statusObj)
        })
        .catch((err) => {
          // this.openNotification('danger', 'Failed to populate status', err)
        });
    },
    async getDataDelivery() {
      this.loadingRunsheet = true
      await axios
        .get(
          this.URL.employee +
            `/${this.employee_id}/delivery?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}`,
          this.Helper.header()
        )
        .then((res) => {
          this.dataDelivery = this.processDataDelivery(res.data.data)
          
          this.dataDeliverySummary = res.data.summary;
          this.delivery_runsheet_number = res.data.summary.delivery_runsheet_number.toString();
          this.loadingRunsheet = false
        })
        .catch((err) => {
          this.loadingRunsheet = false
          // this.openNotification('danger', 'Failed to populate status', err)
        });
    },
    processDataDelivery(data) {
      let status = this.statusObj || {}
      let delivery = data["delivery"] ? data["delivery"] : []
      delivery.map((item) => {
        item["status_delivery"] = []
        item["is_disabled_input"] = false
        if(item.hasOwnProperty("koli_number")) {
          if(item["koli_number"].toLowerCase().includes("rt")) {
            item["status_delivery"] = [...status["rt"], ...status["all"]]
          } else {
            item["status_delivery"] = [...status["normal"], ...status["all"]]
          }
        }
        if(item.hasOwnProperty("status")) {
          // item["is_disabled_input"] = item
          if(item["status"] !== null && typeof item["status"] == 'object') {
              if(item["status"].hasOwnProperty('status_code')) {
                item["is_disabled_input_status"] = item["status"]["status_code"] !== null || item["status"]["status_code"] !== "" ? true : false
              }
          }
          console.log("item status", item["status"])
        }
        if(item.hasOwnProperty("status_code")){
          console.log('sugab', item.hasOwnProperty("status_code"))
          if(item["status_code"] !== null && typeof item["status_code"] == 'string') {
            item["is_disabled_input_status"] = item["status_code"] !== null || item["status_code"] !== "" ? true : false
          }
        }
        if(item.hasOwnProperty("remarks")){
          if(item["remarks"] !== null) {
            item["is_disabled_input_remarks"] = item["remarks"] !== null || item["remarks"] !== "" ? true : false
          }
        }
        if(item.hasOwnProperty("receiver_name")){
          if(item["receiver_name"] !== null) {
            item["is_disabled_input_reveiver"] = item["receiver_name"] !== null || item["receiver_name"] !== "" ? true : false
          }
        }
        item['employee_name'] = data.employee_name
        item['employee_code'] = data.employee_code
      })
      console.log(" processDataDelivery : status =>", status)
      console.log(" processDataDelivery : delivery =>", delivery)
      
      return delivery
      
    },
    async updatePOD(dataPOD, info) {
        if(dataPOD.remarks || dataPOD.receiver_name || dataPOD.status) {

          if (this.delivery_runsheet_number) {
            dataPOD.delivery_runsheet_number = this.delivery_runsheet_number;
            if (this.employee_id != null || this.employee_id != '') {
              dataPOD.courier_employee_id = this.employee_id
            }
            await axios
                .put(
                    this.URL.delivery +
                    `/${this.delivery_runsheet_number}/detail?n=${this.listenNodeId}`,
                    JSON.stringify(dataPOD),
                    this.Helper.header()
                )
                .then((res) => {
                  this.getDataDelivery();
                  this.form = {};
                  this.openNotification(null, "Success", "POD UPDATED!");
                })
                .catch((err) => {
                  console.log('eror');
                  console.log(err.response);
                  this.openNotification('danger', err.response.data.message, err.response.data.message);
                });
          } else {
            this.openNotification('danger', "Failed", "Runsheet unavailable!");
          }

        }


    },
    back() {
      this.$router.push("/delivery/runsheet");
    },
    print() {
      let routeData = this.$router.resolve({
        name: "printGeneral",
        params: {
          id: this.delivery_runsheet_number,
          type: "delivery",
          node_id: this.listenNodeId,
        },
      });
      window.open(routeData.href, "_blank");
    },
  },
  mounted() {
    this.getStatus();
    
  },
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