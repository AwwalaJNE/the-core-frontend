<template>
    
        <header class="header shadoww">
            <div class="container">
                <vs-row justify="space-between">
                    <vs-col vs-type="flex" vs-justify="end" vs-align="center" xs="3" sm="3" lg="3">
                        <vs-row>
                            <vs-col vs-type="flex" vs-justify="end" vs-align="center" w="2">
                                <vs-button @click="clickProps" size="l" dark shadow icon>
                                    <i class='bx bx-menu'></i>
                                </vs-button>
                            </vs-col>
                            <vs-col vs-type="flex" vs-justify="end" vs-align="center" w="4">
                                <Logo />
                            </vs-col>
                        </vs-row>
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="end" vs-align="center" xs="9" sm="6" lg="6">
                        <vs-row justify="flex-end">
                            <vs-col vs-type="flex" vs-justify="end" vs-align="center" w="4">
                                
                            </vs-col>
                        </vs-row>
                    </vs-col>
                </vs-row>
            </div>
        </header>
    
</template>
<script>
import Logo from "../../components/logo/logo.vue"
export default {
    name:"main-header",
    components: {
        Logo: Logo
    },
    props: {
        clickProps: Function
    },
    data() {
        return {
            activeSidebar: false
        }
    }
}
</script>
<style lang="scss">
    .header{
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 1000;
        min-height: 1.5em;
        padding: .5em 0;
        background-color: $bgWhite;
        .vs-col{
            padding-left: 0;
            padding-right: 0;
        }
        .vs-button--icon i{
            font-size: 1.5rem;
        }
        .logo{
            position: absolute;
            left: 0;
            top: .8em;
            width: 60px;
        }
        &.shadow{
            -webkit-box-shadow: 0px 3px 33px -12px rgba(0,0,0,0.42);
            -moz-box-shadow: 0px 3px 33px -12px rgba(0,0,0,0.42);
            box-shadow: 0px 3px 33px -12px rgba(0,0,0,0.42);
        }
        @include for-phone-only{
            min-height: 1em;
        }
        @include for-tablet-portrait-down{
        }
        @include for-tablet-portrait-up{
        }
        @include for-tablet-landscape-up{
        }
        @include for-desktop-up{
        }
        @include for-lg-desktop-up{
        }
        @include for-big-desktop-up{
        }
    }
</style>