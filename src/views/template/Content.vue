<template>
    <div class="Content">
        <MainHeader :clickProps="sidabarAction"/>
        <Sidebar :expand="active" :actionSidebar="sidabarAction"/>
        <div class="main-container">
            <div class="marginHeader"></div>
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import Header from './header'
import Sidebar from './sidebar'
export default {
    name:"Content",
    components: {
        MainHeader: Header,
        Sidebar: Sidebar
    },
    data() {
        return {
            active: false
        }
    },
    methods: {
        sidabarAction(){
            this.active = !this.active
        }
    },
    created() {
        let userData = this.$ls.get('user')
        let surcharge = this.$ls.get('config')['surcharge']
        this.$store.dispatch(`SET_USER_DATA`, userData)
        this.$store.dispatch(`SET_PACKAGE_PACKAGE_SURCHARGE_arrData`, surcharge != null ? surcharge : [])
    },
}
</script>
<style lang="scss">
    // custume styling
    .marginHeader{
        position: relative;
        width: 100%;
        height: 4.5em;
    }
</style>