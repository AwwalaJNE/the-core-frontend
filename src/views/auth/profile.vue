<template>
  <vs-row>
    <vs-col xs="12" sm="12" lg="12">
      <div class="titlePage">
        <Breadcrumb />
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
            <Skeleton v-if="fetchingData" height="220px" />
            <div
              v-else
              class="image-container"
              :style="{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
              @click="triggerFileInput"
            >
              <div v-if="!imageUrl" class="placeholder-icon">
                <box-icon name="user" size="lg" border="circle" color="white" />
              </div>

              <div class="hover-overlay">
                <box-icon name="edit" size="md" color="white"></box-icon>
                <span class="hover-text">Edit</span>
              </div>

              <input
                type="file"
                @change="handleFileUpload"
                ref="fileInput"
                style="display: none;"
              />
            </div>
          </vs-col>
          <vs-col xs="12" sm="9" lg="9" style="padding-left: 30px">
            <template v-for="index in [1, 2, 3, 4]">
              <div
                v-if="fetchingData"
                :key="index"
                style="margin-top: 10px !important"
              >
                <Skeleton height="25px" />
              </div>
            </template>
            <form-input-controller
              v-if="dataFetched"
              ref="formProfileController"
              type-form="profile"
              :submit-by-enter="true"
              :data-item="dataItem"
              @formData="updateProfile"
            />
          </vs-col>
          <vs-col w="12" style="min-height: 50px">
            <vs-button
              v-if="dataFetched"
              style="right: 0; position: absolute"
              block
              flat
              :active="true"
              type="submit"
              @click="handleSubmit"
            >
              Save
            </vs-button>

            <!-- <vs-button
              block
              flat
              type="submit"
              @click="throwError"
              >Throw</vs-button> -->
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
                <Skeleton />
              </vs-td>
              <vs-td colspan="2">
                <Skeleton />
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
/* eslint-disable indent, import/extensions, quotes, semi */
import axios from "axios";
import { Skeleton } from "vue-loading-skeleton";
import moment from "moment";
import master from "@/mixins/master";
import FormInputController from "@/components/form/formInputController";
import Breadcrumb from "@/components/breadcrumb/index";

export default {
  name: "Profile",
  components: {
    "form-input-controller": FormInputController,
    Skeleton,
    Breadcrumb,
  },
  mixins: [master],
  data() {
    return {
      title: "User Profile",
      fetchingData: true,
      dataFetched: false,
      dataHistoryFetched: false,
      fetchingDataHistory: true,
      trackingHistory: null,
      activeDialogFirstLogin: true,
      activeLoadingFirstLogin: true,
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
      return this.dataItem;
    },
  },
  mounted() {
    this.getProfile();
    // this.getHistory();
  },
  methods: {
    throwError() {
      alert("throw");
      throw new Error("Sentry Error Local");
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleSubmit() {
      this.$refs.formProfileController.handleSubmit();
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          await axios
            .post(`${this.URL.profile}/upload-img?n=${this.listenNodeId}`, formData, this.Helper.header())
            .then((res) => {
              this.dataItem = res.data.data;
              this.imageUrl = this.dataItem.url;
              this.openNotification("success", null, "Success!", res.data.message);
              this.getProfile();
            })
            .catch((err) => {
              this.openNotification("danger", err.response ? err.response.data.code : '', "Failed!", err.response ? err.response.data.message : 'something went wrong');
              this.checkAuth(err.response);
              this.getProfile();
            });
        } finally {
          this.fetchingData = false;
        }
      }
    },
    async updateProfile(form) {
      const updateLoading = this.$vs.loading({
        type: "scale",
        text: "Loading...",
        background: "#EAEAEA",
      });
      const data = form;
      if (
        data.password == "" ||
        data.password == undefined ||
        data.password == null
      ) {
        delete data.password;
      }
      await axios
        .put(
          `${this.URL.profile}?n=${this.listenNodeId}`,
          data,
          this.Helper.header()
        )
        .then((res) => {
          this.openNotification("success", null, "Success!", "Profile Updated!");
        })
        .catch((err) => {
          let title = "Failed!";
          let msg = "Update profile failed!";
          if (err.response.status == 422) {
            title = "Validation Failed";
            msg = err.response.data.message;
          }
          this.openNotification("danger", err.response ? err.response.data.code : '', "Failed!", msg);
          this.checkAuth(err.response);
        });
      updateLoading.close();
    },
    async getProfile() {
      this.fetchingData = true;
      await axios
        .get(`${this.URL.profile}?n=${this.listenNodeId}`, this.Helper.header())
        .then((res) => {
          this.dataItem = res.data.data;
          this.dataFetched = true;
          this.checkDialoglogin();
          this.imageUrl = this.dataItem.url;
        })
        .catch((err) => {
          this.openNotification(
            "danger",
            err.response ? err.response.data.code : '',
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
          `${this.URL.user_history}?n=${this.listenNodeId}`,
          this.Helper.header()
        )
        .then((res) => {
          const data = res.data.data.map((value) => {
            value.created_at = moment(value.created_at).format("D/MM hh:mm");
            return value;
          });

          this.trackingHistory = data;
        });
      this.dataHistoryFetched = true;
      this.fetchingDataHistory = false;
    },
    async checkDialoglogin() {},
    closeDialogConfirm() {
      this.activeDialogFirstLogin = false;
    },
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
.image-container {
  position: relative;
  background: #ccc;
  min-height: 220px;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
}

.placeholder-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  border-radius: 8px;
}

.hover-overlay box-icon {
  margin-bottom: 8px;
}

.hover-overlay .hover-text {
  color: white;
  font-size: 16px;
}

.image-container:hover .hover-overlay {
  opacity: 1;
}

.image-container {
  position: relative;
  background: #ccc;
  min-height: 220px;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
