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
                            <vs-col vs-align="center" xs="1" sm="1" lg="1">
                                
                                <selector 
                                ref="node_selector"
                                :valueData="[]"
                                :selectedValue="''"
                                :isMultiple="false"
                                :border="true"
                                @updateValue="updateValue" />


                            </vs-col>
                            <vs-col vs-align="center" xs="1" sm="1" lg="1">
                                

                               

                            </vs-col>
                            <vs-col vs-align="center" xs="1" sm="1" lg="1">
                                

                                <vs-tooltip bottom shadow interactivity not-hover v-model="activeTooltip1">
                                    <vs-avatar class="cus_avatar" @click="activeTooltip1=!activeTooltip1">
                                    <!-- <img src="/avatars/avatar-5.png" alt=""> -->
                                        <i class='bx bx-user'></i>
                                    </vs-avatar>
                                    <template #tooltip>
                                    <div class="content-tooltip">
                                        <div class="body">
                                        <div class="text">
                                            Cosed Tasks
                                            <span>
                                            89
                                            </span>
                                        </div>
                                        <vs-avatar circle size="60">
                                            <!-- <img src="/avatars/avatar-5.png" alt=""> -->
                                            <i class='bx bx-user'></i>
                                        </vs-avatar>
                                        <div class="text">
                                            Open Tasks
                                            <span>
                                            8
                                            </span>
                                        </div>
                                        </div>
                                        <footer>
                                        <vs-button circle icon border>
                                            <i class='bx bxs-share-alt'></i>
                                        </vs-button>
                                        <vs-button circle @click="logout">
                                            Logout
                                        </vs-button>
                                        <vs-button circle icon border>
                                            <i class='bx bx-like' ></i>
                                        </vs-button>
                                        </footer>
                                    </div>
                                    </template>
                                </vs-tooltip>


                            </vs-col>
                        </vs-row>
                    </vs-col>
                </vs-row>
            </div>
        </header>
    
</template>
<script>
import Logo from "@/components/logo/logo.vue"
import Selector from "@/components/input/select"
export default {
    name:"main-header",
    components: {
        "Logo": Logo,
        "selector": Selector,
    },
    props: {
        clickProps: Function
    },
    data() {
        return {
            activeSidebar: false,
            activeTooltip1: false,
            datanode: [
                {
                    label: null,
                    value: null
                }
            ]
        }
    },
    computed: {
        listenGetUser() {
            return this.$store.getters.getUser.user_data
        },
        listenGetUserNodeList() {
            return this.$store.getters.getUser.user_data['user_nodes']
        },
        // getLabaLaba() {
        //     return this.$store.getters.getLABA
        // },
    },
    watch: {
        listenGetUserNodeList: function(val) {
            if(val !== undefined) {
                this.datanode = []
                val.length > 0 && val.map(item => {
                            let obj = {}
                            obj["label"] = item.node_name
                            obj["value"] = item.node_id

                            this.datanode.push(obj)
                        })
            }
        }
    },
    methods: {
        updateValue(){

        },
        logout() {
            localStorage.clear();
            this.$router.go()
        }
    },
    created() {
        // this.$store.dispatch('SET_NAME', 'Laba-laba 2 biji')
        // this.$store.dispatch('setLabaLabaName', 'iis')
        // this.$store.dispatch('setUmurLabaLaba', 20)
    },
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

        .m-select.vs-select-content{
            margin: 0;
            position: relative;
            top: 6px;
        }
        .cus_avatar{
            position: relative;
            top: 4px;
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

    .content-tooltip {
  .body {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .vs-avatar-content {
        &.cus_avatar{
            width: 40px !important;
            height: 40px !important;
        }
        margin-top: 0;
        border: 3px solid var(--vs-theme-layout);
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
    }

    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 0.55rem;
      padding: 10px;
      font-weight: normal;

      span {
        font-weight: bold;
        font-size: 0.7rem;
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    padding: 8px;
    margin: 0px;
    text-align: left;
  }

  p {
    text-align: left;
    padding: 0px;
    margin: 0px;
    line-height: 1rem;
    padding-bottom: 5px;
    padding-left: 8px;
  }
}
</style>