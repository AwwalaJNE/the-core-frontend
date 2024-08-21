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
          <vs-row>
            <vs-col xs="12" sm="12" lg="12">
              <div style="margin-top: 10px">
                <vs-tooltip
                  :success="tokenCopied"
                  :danger="tokenCopied === false"
                  circle
                >
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
            </vs-col>

            <vs-col xs="12" sm="12" lg="12">
              <div style="text-align: right; margin-top: 10px">
                <vs-button @click="openApidoc" style="margin-top: 10px;right:0;position:absolute" transparent border>
                  How to use this token?
                </vs-button>
              </div>
            </vs-col>

            <vs-col xs="12" sm="12" lg="12">
              <vs-button @click="resetConfirmation" style="margin-top: 10px">
                Reset Token
              </vs-button>
            </vs-col>
          </vs-row>
        </div>
      </vs-col>
    </vs-row>

    <dialog-confirm
      :active="confirmModalActive"
      :closeDialog="
        () => {
          this.confirmModalActive = false;
        }
      "
      title="Are you sure ?"
      message="You want to generate a new access token ?"
      @confirm="resetToken"
      @cancel="
        () => {
          this.confirmModalActive = false;
        }
      "
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
    breadcrumb: Breadcrumb,
    "dialog-confirm": DialogConfirm,
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
        this.pageLoading = this.$vs.loading({
          type:'scale',
          text: 'Loading...',
          background: '#EAEAEA',
        });
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
          this.checkAuth(err.response);
        });
    },
    resetConfirmation() {
      this.confirmModalActive = true;
    },
    async resetToken() {
      this.confirmModalActive = false;
      this.loading = true;
      await axios
        .post(
          this.URL.reset_token + `?n=${this.listenNodeId}`,
          {},
          this.Helper.header()
        )
        .then((res) => {
          this.user_access_token = res.data.data.user_access_token;
          this.loading = false;
          this.openNotification("success", null, "Success!", "Reset token success!");
        })
        .catch((err) => {
          this.loading = false;
          this.openNotification("danger", err.response ? err.response.data.code : '', "Failed!", "Reset Token Failed!");
          this.checkAuth(err.response);
        });
    },
    openApidoc() {
      window.open(this.URL.apidoc, "_blank");
    },
    onCopy: function (e) {
      this.toolTipMessage = "Token Copied To Clipboard!";
      this.tokenCopied = true;
      setTimeout(() => {
        this.tokenCopied = null;
        this.toolTipMessage = null;
      }, 1000);
    },
    onError: function (e) {
      this.tokenCopied = false;
      this.toolTipMessage = "Failed to copy token!";

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

.box {
  min-height: 150px;
}
</style>