<template>
  <div>
    <vs-row>
      <vs-col xs="6" sm="4" lg="4">
        <div class="titlePage">
          <breadcrumb />
          <h2>Access Token</h2>
        </div>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col xs="12" sm="12" lg="12">
        <div class="box">
            <div style="margin-top:10px">
          <vs-tooltip :success="tokenCopied" :danger="tokenCopied === false" circle>
            <vs-input
              v-model="user_access_token"
              label="Access Token"
              readonly
              id="tokenField"
              v-clipboard:copy="user_access_token"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            />
            <template #tooltip>
              {{ toolTipMessage ? toolTipMessage : "Click to copy" }}
            </template>
          </vs-tooltip>
            </div>
          <vs-button @click="resetConfirmation" style="margin-top:10px">
            Reset Token
          </vs-button>
        </div>
      </vs-col>
    </vs-row>

    <dialog-confirm
          :active="confirmModalActive"
          :closeDialog="() => {this.confirmModalActive = false}"
          title="Are you sure ?"
          message="You want to generate a new access token ?"
          @confirm="resetToken"
          @cancel="() => {this.confirmModalActive = false}"
      />

  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import Breadcrumb from "@/components/breadcrumb/index";
import DialogConfirm from "@/components/dialog/dialogConfirm";

export default {
  name: "access-token",
  mixins: [master],
  components: {
    "breadcrumb": Breadcrumb,
    "dialog-confirm": DialogConfirm
  },
  data() {
    return {
      user_access_token: null,
      form: {},
      loading: true,
      pageLoading: null,
      tokenCopied: null,
      toolTipMessage: null,
      confirmModalActive: false,
    };
  },
  watch: {
    loading: function (loading) {
      this.pageLoadingModal(loading);
    },
  },
  methods: {
    pageLoadingModal(loading) {
      if (loading) {
        this.pageLoading = this.$vs.loading();
      } else {
        if (this.pageLoading) {
          this.pageLoading.close();
        }
      }
    },
    setToolTipMessage(message) {
      this.toolTipMessage = true;
    },
    async getProfile() {
      this.loading = true;
      await axios
        .get(this.URL.profile + `?n=${this.listenNodeId}`, this.Helper.header())
        .then((res) => {
          this.user_access_token = res.data.data.user_access_token;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.openNotification(
            "danger",
            "Failed!",
            "Failed to populate data!"
          );
        });
    },
    resetConfirmation(){
        this.confirmModalActive=true;
    },
    async resetToken() {
        this.confirmModalActive = false;
      this.loading = true;
      await axios
        .post(this.URL.reset_token + `?n=${this.listenNodeId}`,{},this.Helper.header())
        .then((res) => {
          this.user_access_token = res.data.data.user_access_token;
          this.loading = false;
          this.openNotification(
            "success",
            "Success!",
            "Reset token success!"
          );
        })
        .catch((err) => {
          this.loading = false;
          this.openNotification(
            "danger",
            "Failed!",
            "Reset Token Failed!"
          );
        });
    },
    onCopy: function (e) {
      this.toolTipMessage = "Token Copied To Clipboard!";
      this.tokenCopied = true;
      setTimeout(() => {
          this.tokenCopied = null
      this.toolTipMessage = null;          
      }, 1000);
    },
    onError: function (e) {
        this.tokenCopied = false;
        this.toolTipMessage = "Failed to copy token!";        
      console.log(e);
    },
  },
  mounted() {
    this.getProfile();
  },
  beforeMount() {
    this.loading = true;
    this.pageLoadingModal(this.loading);
  },
};
</script>
<style>
#vs-input--tokenField:hover {
  cursor: pointer;
}

.box{
    min-height: 150px;
}
</style>