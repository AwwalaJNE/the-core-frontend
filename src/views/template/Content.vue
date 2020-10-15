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