<template>
    <div class="Content">
        <MainHeader :clickProps="sidabarAction" />

        <Sidebar :expand="active" />
        <div :class="active ? 'main-container-closed' : 'main-container-opened'">
            <div class="container">
                <router-view></router-view>
            </div>
            <AppFooter />
        </div>
        
        <dialogUpdatePassword />
    </div>
</template>
<script>
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";
import dialogUpdatePassword from "@/components/dialog/dialogUpdatePassword.vue";
import master from "@/mixins/master";
export default {
    name: "Content",
    components: {
        AppFooter: Footer,
        MainHeader: Header,
        Sidebar: Sidebar,
        dialogUpdatePassword,
    },
    mixins: [master],
    data() {
        return {
            active: true,
        };
    },
    methods: {
        sidabarAction() {
            this.active = !this.active;
        },
    },
    created() {
        let userData = this.$ls.get("user");
        let surcharge = this.$ls.get("config")["surcharge"];
        this.$store.dispatch(`SET_USER_DATA`, userData);
        this.$store.dispatch(`SET_PACKAGE_PACKAGE_SURCHARGE_arrData`, surcharge != null ? surcharge : []);
    },
};
</script>
