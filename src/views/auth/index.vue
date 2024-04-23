<template>
  <vs-row justify="center">
    <vs-col xs="12" sm="12" lg="4">
      <div class="box login_box" style="margin-top:50px !important">
        <logo />

        <div class="con-form">
          <form-input-controller
            ref="formLoginController"
            @formData="formData"
            getters="getAuth"
            typeForm="login"
            :submitByEnter="true"
          />
        </div>

        <vs-row justify="flex-end">
          <vs-col w="3">
            <vs-button
              transparent
              block
              flat
              :active="true"
              type="submit"
              @click="handleSubmit"
            >
              Login
            </vs-button>
          </vs-col>
        </vs-row>
      </div>
    </vs-col>
  </vs-row>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import Logo from "@/components/logo/logo.vue";
import FormInputController from "@/components/form/formInputController";
export default {
  name: "login",
  mixins: [master],
  components: {
    "form-input-controller": FormInputController,
    logo: Logo,
  },
  data() {
    return {
      form: {},
      ipAddress: null,
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.formLoginController.handleSubmit(); // trigger function submit form dari luar component formInputController
    },
    async formData(form) {
      try {
        const response = await axios.get("https://api64.ipify.org?format=json");
        this.form.ip_address = response.data.ip;
        this.form.password = form.password;
        this.form.user_login = form.user_login;
      } catch (error) {
        console.error("Error fetching IP address:", error);
      } finally {
        this.login();
      }
    },

    async login() {
      const loading = this.$vs.loading({
        type: "scale",
        text: "Checking credentials...",
        background: "#EAEAEA",
      });
      await axios
        .post(this.URL.login, this.form, this.Helper.headerLogin())
        .then((res) => {
          if (res.status == 200) {
            this.$ls.set("tokenBearer", res.data.data.token);
            this.$ls.set("user", res.data.data.user);
            this.$ls.set("config", res.data.data.config);
            this.$ls.set("is_first_login", res.data.data.user.is_first_login);
          }

          loading.close();
          this.$router.push({ name: "profile" });
          // this.$router.replace('/settings/users')
        })
        .catch((err) => {
          loading.close();
          console.log("err", err);
          this.openNotification(
            "danger",
            "Login failed",
            err ? err : "something went wrong"
          );
        });
    },
    //     logout() {
    //   localStorage.clear();
    //   // this.$router.push("/login"); push di hide supaya semua vuex dan cache bersih
    //   window.location.href = "/login";
    // },
    async getNode() {},
  },
};
</script>
<style lang="scss">
body {
  background: #eaeaea;
}

.login-box {
  width: 100px;
  height: 100px;
  background-color: red;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
}
</style>
