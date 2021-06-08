<template>
  <vs-row>
    <vs-col xs="12" sm="12" lg="12">
      <div class="titlePage">
        <breadcrumb />
        <h2>{{ title }}</h2>
      </div>
    </vs-col>
    <vs-col xs="12" sm="12" lg="12">
      <div class="box" style="text-align: left">
        <vs-row>
          <vs-col xs="12" sm="12" lg="12">
            <h3>EDIT PROFILE</h3>
          </vs-col>
          <vs-col xs="12" sm="3" lg="3" class="avatar-column">
            <skeleton v-if="fetchingData" height="220px" />
            <div
              v-if="!fetchingData"
              style="background: #ccc; min-height: 220px; width: 100%"
            >
              <box-icon name="user" size="lg" border="circle" color="white" />
            </div>
          </vs-col>
          <vs-col xs="12" sm="9" lg="9" style="padding-left: 30px">
            <template v-for="index in [1, 2, 3, 4]">
              <div
                v-if="fetchingData"
                :key="index"
                style="margin-top: 10px !important"
              >
                <skeleton height="25px" />
              </div>
            </template>
            <form-input-controller
              v-if="dataFetched"
              ref="formProfileController"
              @formData="updateProfile"
              typeForm="profile"
              :submitByEnter="true"
              :dataItem="dataItem"
            />
          </vs-col>
          <vs-col w="12" style="min-height: 50px">
            <vs-button
              style="right: 0; position: absolute"
              v-if="dataFetched"
              block
              flat
              :active="true"
              type="submit"
              @click="handleSubmit"
              >Save</vs-button>

               <vs-button
              block
              flat
              type="submit"
              @click="throwError"
              >Throw</vs-button>
          </vs-col>
        </vs-row>
      </div>
    </vs-col>

    <!-- <vs-col xs="12" sm="12" lg="5">
      <div class="box" style="text-align: left">
        <h3>10 LAST ACTIVITY</h3>

        <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th style="width: 25%"> Time </vs-th>
              <vs-th> Activity </vs-th>
              <vs-th style="width: 10%">
                <vs-button
                  :loading="fetchingDataHistory"
                  :active="fetchingDataHistory"
                  icon
                  dark
                  transparent
                  @click="getHistory"
                >
                  <box-icon name="refresh" size="xs"/>
                </vs-button>
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr v-if="fetchingDataHistory">
              <vs-td>
                <skeleton />
              </vs-td>
              <vs-td colspan="2">
                <skeleton />
              </vs-td>
            </vs-tr>
            <vs-tr :key="i" v-for="(tr, i) in trackingHistory" :data="tr">
              <vs-td>
                {{ tr.created_at }}
              </vs-td>
              <vs-td colspan="2">
                <strong>{{ tr.activity_name }}</strong>
                <br />
                at <small>{{ tr.node_name }}</small>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vs-col> -->
  </vs-row>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import FormInputController from "@/components/form/formInputController";
import { Skeleton } from "vue-loading-skeleton";
import Breadcrumb from "@/components/breadcrumb/index";
import moment from 'moment';

export default {
  name: "profile",
  mixins: [master],
  components: {
    "form-input-controller": FormInputController,
    skeleton: Skeleton,
    breadcrumb: Breadcrumb,
  },
  computed: {
    listenActive() {
      return this.active;
    },
    listenTitle() {
      return this.title;
    },
    listenDataItem() {
      return this.dataItem;
    },
  },
  data() {
    return {
      title: "User Profile",
      fetchingData: true,
      dataFetched: false,
      dataHistoryFetched: false,
      fetchingDataHistory: true,      
      trackingHistory: null,
    };
  },
  methods: {
    throwError: function() {
      alert('throw')
        throw new Error('Sentry Error Local')
    },
    handleSubmit() {
      this.$refs.formProfileController.handleSubmit();
    },
    async updateProfile(form) {
      const updateLoading = this.$vs.loading({
                type:'scale',
                text: 'Loading...',
                background: '#EAEAEA',
            });
      let data = form;
      if (
        data.password == "" ||
        data.password == undefined ||
        data.password == null
      ) {
        delete data.password;
      }
      await axios
        .put(
          this.URL.profile + `?n=${this.listenNodeId}`,
          data,
          this.Helper.header()
        )
        .then((res) => {
          this.openNotification("success", "Success!", "Profile Updated!");
        })
        .catch((err) => {
          let title = "Failed!";
          let msg = "Update profile failed!";
          if (err.response.status == 422) {
            title = "Validation Failed";
            msg = err.response.data.message;
          }
          this.openNotification("danger", "Failed!", msg);
          this.checkAuth(err.response);
        });
      updateLoading.close();
    },
    async getProfile() {
      this.fetchingData = true;
      await axios
        .get(this.URL.profile + `?n=${this.listenNodeId}`, this.Helper.header())
        .then((res) => {
          this.dataItem = res.data.data;
          this.dataFetched = true;
        })
        .catch((err) => {
          this.openNotification(
            "danger",
            "Failed!",
            "Failed to populate data!"
          );
          this.checkAuth(err.response);
          this.dataFetched = false;
        });
      this.fetchingData = false;
    },
    async getHistory() {
      this.trackingHistory = null;      
      this.fetchingDataHistory = true;
      this.dataHistoryFetched = false;
      await axios
        .get(
          this.URL.user_history + `?n=${this.listenNodeId}`,
          this.Helper.header()
        )
        .then((res) => {
          let data = res.data.data.map(function(value){
            value.created_at = moment(value.created_at).format("D/MM hh:mm");
            return value
          });

          this.trackingHistory = data;
        });
      this.dataHistoryFetched = true;
      this.fetchingDataHistory = false;      
    },
  },
  mounted() {
    this.getProfile();
    // this.getHistory();
  },
};
</script>
<style scoped>
.avatar-column {
  padding: 10px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  min-height: 200px !important;
}
.avatar-column box-icon {
  margin-top: 20%;
}
</style>