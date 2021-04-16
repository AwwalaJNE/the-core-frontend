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
            <template v-if="dataDelivery">
              <p align="left">
                {{ dataDelivery.employee_code }} ({{
                  dataDelivery.employee_name
                }})
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
                  <template v-if="dataDelivery && dataDeliverySummary">
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
                          {{ dataDelivery.delivery.length + " Connotes" }}
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
                      <template>
                        <RunsheetInformation
                          v-if="arrStatus && dataDelivery"
                          :dataDelivery="dataDelivery"
                          :arrStatus="arrStatus"
                          :ref="'runsheetInformation'"
                          @updatePOD="updatePOD"
                          :query="tempSearch"
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
      dataDelivery: [],
      summary: [],
      arrStatus: null,
      dataDeliverySummary: null,
    };
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
      if (this.$route.name == "delivery-runsheet-edit") {
        this.delivery_runsheet_number = this.$route.params.delivery_runsheet_number.toString();
      }
    },
    async scanConnote() {
      await axios
        .post(
          this.URL.employee +
            `/${this.employee_id}/delivery?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}`,
          JSON.stringify(this.form),
          this.Helper.header()
        )
        .then((res) => {
          this.dataDelivery = res.data.data;
          this.dataDeliverySummary = res.data.summary;
          this.delivery_runsheet_number = this.dataDelivery.delivery[0].delivery_runsheet_number.toString();
          
          this.openNotification(null, "Success", "");
        })
        .catch((err) => {
          
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
          this.arrStatus = res.data.data.map((item) => {
            let obj = {};
            obj.label = item.status_description + "(" + item.status_code + ")";
            obj.value = item.status_code;
            return obj;
          });
        })
        .catch((err) => {
          // this.openNotification('danger', 'Failed to populate status', err)
        });
    },
    async getDataDelivery() {
      await axios
        .get(
          this.URL.employee +
            `/${this.employee_id}/delivery?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}`,
          this.Helper.header()
        )
        .then((res) => {
          this.dataDelivery = res.data.data;
          this.dataDeliverySummary = res.data.summary;
          this.delivery_runsheet_number = res.data.summary.delivery_runsheet_number.toString();
          
        })
        .catch((err) => {
          // this.openNotification('danger', 'Failed to populate status', err)
        });
    },
    async updatePOD(dataPOD) {
      if (this.delivery_runsheet_number) {
        dataPOD.delivery_runsheet_number = this.delivery_runsheet_number;

        await axios
          .put(
            this.URL.delivery +
              `/${this.delivery_runsheet_number}/detail?n=${this.listenNodeId}`,
            JSON.stringify(dataPOD),
            this.Helper.header()
          )
          .then((res) => {
            this.getDataDelivery();
            this.openNotification(null, "Success", "POD UPDATED!");
          })
          .catch((err) => {
            console.log('eror');
            console.log(err.response);
                    this.openNotification('danger', err.response.data.message, err.response.data.message);
          });
      }else{
        this.openNotification('danger', "Failed", "Runsheet unavailable!");
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
    this.getParamRoute();
    this.getDataDelivery();
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