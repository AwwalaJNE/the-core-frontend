<template>
  <div class="Content">
    <MainHeader :clickProps="sidabarAction" />
    <Sidebar :expand="active" :actionSidebar="sidabarAction" />
    <div class="main-container">
      <div class="marginHeader"></div>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
    <Footer />
    <dialogUpdatePassword />
  </div>
</template>
<script>
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";
import dialogUpdatePassword from "@/components/dialog/dialogUpdatePassword.vue";
export default {
  name: "Content",
  components: {
    Footer: Footer,
    MainHeader: Header,
    Sidebar: Sidebar,
    dialogUpdatePassword,
  },
  data() {
    return {
      active: false,
    };
  },
  // beforeRouteUpdate (to, from, next) {
  //     this.active = false
  //     next()
  // },
  // watch:{
  //     $route (to, from){
  //         this.active = false
  //     }
  // },
  methods: {
    sidabarAction() {
      this.active = !this.active;
    },
  },
  created() {
    let userData = this.$ls.get("user");
    let surcharge = this.$ls.get("config")["surcharge"];
    this.$store.dispatch(`SET_USER_DATA`, userData);
    this.$store.dispatch(
      `SET_PACKAGE_PACKAGE_SURCHARGE_arrData`,
      surcharge != null ? surcharge : []
    );
  },
};
</script>
<style lang="scss">
// custume styling
.marginHeader {
  width: 100%;
  height: 1em;
}
</style>
