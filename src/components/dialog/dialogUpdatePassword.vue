<!-- eslint-disable vue/attribute-hyphenation -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <vs-dialog v-model="visible" class="my-dialog" not-close prevent-close>
    <template #header>
      <h4
        v-if="profileData && profileData.last_password_updated_at !== null"
        class="not-margin"
      >
        Please Update Your Password
      </h4>
      <h4 v-else class="not-margin">
        Please Changes Your Password
      </h4>
    </template>

    <div class="con-form">
      <vs-input
        v-model="form.password"
        type="password"
        label-placeholder="Password"
        class="mb-5"
        :progress="getProgress"
        :visiblePassword="hasVisiblePassword"
        icon-after
        @click-icon="hasVisiblePassword = !hasVisiblePassword"
      >
        <template #icon>
          <i v-if="!hasVisiblePassword" class="bx bx-show-alt" />
          <i v-else class="bx bx-hide" />
        </template>

        <template v-if="getProgress >= 100" #message-success>
          <div class="text-left">
            Secure password
          </div>
        </template>

        <template
          v-if="getProgress <= 30 && form.password.length > 0"
          #message-danger
        >
          <div class="text-left">
            Weak Password
          </div>
        </template>

        <template v-if="errors.password.length > 0" #message-danger>
          <div class="text-left">
            {{ errors.password[0] }}
          </div>
        </template>
      </vs-input>
      <vs-input
        v-model="form.passwordConfirm"
        type="password"
        label-placeholder="Password Confirm"
        :visiblePassword="hasVisiblePassword"
        icon-after
        @click-icon="hasVisiblePassword = !hasVisiblePassword"
      >
        <template #icon>
          <i v-if="!hasVisiblePassword" class="bx bx-show-alt" />
          <i v-else class="bx bx-hide" />
        </template>

        <template v-if="errors.passwordConfirm.length > 0" #message-danger>
          <div class="text-left">
            {{ errors.passwordConfirm[0] }}
          </div>
        </template>
      </vs-input>
    </div>

    <p
      v-if="profileData && profileData.last_password_updated_at !== null"
      class="message-text-password"
    >
      <b>Note</b> : Expired Password, Please Change Your Password
    </p>

    <template #footer>
      <div class="footer-dialog">
        <vs-button block @click="updatePassword">
          Update
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>
<script>
/* eslint-disable semi, quotes, import/extensions, indent */
import axios from "axios";
import master from "@/mixins/master";

export default {
  mixins: [master],
  data() {
    return {
      visible: false,
      vsLoading: null,
      hasVisiblePassword: false,
      form: {
        password: "",
        passwordConfirm: "",
      },
      profileData: null,
      errors: {
        password: [],
        passwordConfirm: [],
      },
    };
  },
  computed: {
    getProgress() {
      let progress = 0;

      // at least one number

      if (/\d/.test(this.form.password)) {
        progress += 20;
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.form.password)) {
        progress += 20;
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.form.password)) {
        progress += 20;
      }

      // more than 5 digits

      if (this.form.password.length >= 6) {
        progress += 20;
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.form.password)) {
        progress += 20;
      }

      return progress;
    }
  },
  watch: {
    //
  },
  mounted() {
    const isFirstLogin = JSON.parse(this.$ls.get("is_first_login"));
    if (isFirstLogin) {
      this.fetchProfileData().then(() => {
        this.visible = true;
      });
    }
  },
  methods: {
    async updatePassword() {
      try {
        let formValid = false;
        this.errors.password = [];
        this.errors.passwordConfirm = [];

        if (this.form.password.length === 0) {
          this.errors.password = ["The password field is required."];
        } else if (this.form.passwordConfirm.length === 0) {
          this.errors.passwordConfirm = [
            "The password confirm field is required.",
          ];
        } else if (this.form.password !== this.form.passwordConfirm) {
          this.errors.passwordConfirm = ["Passwords did not match"];
        } else {
          this.errors.password = [];
          this.errors.passwordConfirm = [];
          formValid = true;
        }

        if (!formValid) {
          return;
        }

        const payload = {
          user_name: this.profileData.user_name,
          user_login: this.profileData.user_login,
          user_email: this.profileData.user_email,
          password: this.form.password,
          password_confirmation: this.form.passwordConfirm,
        };

        this.showLoading("Updating password....");

        const res = await axios.put(
          // eslint-disable-next-line prefer-template
          this.URL.profile + `?n=${this.listenNodeId}`,
          payload,
          this.Helper.header()
        );

        this.openNotification("success", null, "Success!", "Password Updated!");

        this.$ls.set("is_first_login", false);
        const user = this.listenActiveUser;
        user.last_password_updated_at = res.data.data.last_password_updated_at;
        this.$store.dispatch(`SET_USER_DATA`, user);

        this.visible = false;
      } catch (e) {
        let msg = "Update password failed!";
        if (e.response.status === 422) {
          msg = e.response.data.message;
        }

        this.openNotification("danger", e.response ? e.response.data.code : '', "Failed!", msg);
      } finally {
        this.hideLoading();
      }
    },

    async fetchProfileData() {
      this.showLoading();
      try {
        this.profileData = this.listenActiveUser
      } catch (err) {
        this.openNotification(
          "danger",
          "Failed!",
          "Failed to populate data!"
        );

        this.checkAuth(err.response);
      }
      this.hideLoading();
    },

    showLoading(text = "Loading....") {
      if (this.vsLoading === null) {
        this.vsLoading = this.$vs.loading({
          text,
          type: "scale",
          background: "#EAEAEA",
        });
      }
    },

    hideLoading() {
      if (this.vsLoading !== null) {
        this.vsLoading.close();
        this.vsLoading = null;
      }
    },
  },
};
</script>

<style scoped>
.my-dialog >>> .vs-dialog {
  min-width: 440px !important;
}

.text-left {
  text-align: left;
}

.mb-5 {
  margin-bottom: 8px;
}

.message-text-password {
  font-size: 10px;
  text-align: justify;
  margin-left: 12.5px;
}
</style>
