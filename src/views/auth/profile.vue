<template>
  <vs-row>
    <vs-col xs="6" sm="4" lg="4">
      <div class="titlePage">
        <breadcrumb />
        <h2>{{ title }}</h2>
      </div>
    </vs-col>
    <vs-col xs="12" lg="12">
      <div class="box">
        <vs-row>
          <vs-col xs="2" sm="2" md="2" lg="2" class="avatar-column">
            <div style="background: #ccc; min-height: 220px; width: 100%">
              <box-icon name="user" size="lg" border="circle" color="white" />
            </div>
          </vs-col>
          <vs-col xs="12" sm="12" md="10" lg="10" style="padding-left: 30px">
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
            <vs-button
              v-if="dataFetched"
              block
              flat
              :active="true"
              type="submit"
              @click="handleSubmit"
              >Save</vs-button
            >
          </vs-col>
        </vs-row>
      </div>
    </vs-col>
  </vs-row>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import FormInputController from "@/components/form/formInputController";
import { Skeleton } from "vue-loading-skeleton";
import Breadcrumb from "@/components/breadcrumb/index";

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
      title: "Edit Profile",
      fetchingData: true,
      dataFetched: false,
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.formProfileController.handleSubmit();
    },
    async updateProfile(form) {
      const updateLoading = this.$vs.loading();
    let data = form
    if(data.password == '' || data.password == undefined || data.password == null){
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
            let title = "Failed!"
            let msg = "Update profile failed!";
            if(err.response.status  == 422){
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
  },
  mounted() {
    this.getProfile();
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
  margin-top: 35%;
}
</style>