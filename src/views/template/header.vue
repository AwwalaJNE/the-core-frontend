<template>
    
        <header class="header shadow">
            <div class="container">
                <vs-row justify="space-between">
                    <vs-col xs="12" sm="12" lg="2">
                        <vs-row justify="space-between">
                            <vs-col xs="9" sm="9" lg="3">
                                <vs-button @click="clickProps" size="l" flat icon>
                                    <i class='bx bx-menu'></i>
                                </vs-button>
                            </vs-col>
                            <vs-col xs="3" sm="3" lg="9">
                                <Logo />
                            </vs-col>
                        </vs-row>
                    </vs-col>
                    <vs-col xs="12" sm="12" lg="8">
                        <vs-row justify="flex-end">
                            <vs-col xs="10" sm="10" lg="4">
                                <template v-if="datanode.length > 0">
                                    <selector 
                                    ref="node_selector"
                                    :valueData="datanode"
                                    :selectedValue="selectedNode"
                                    :isMultiple="false"
                                    :border="true"
                                    :tabindex="-1"
                                    @updateValue="updateValue" />
                                </template>
                            </vs-col>
                            <vs-col xs="1" sm="1" lg="1" style="margin-left:10px">                            
                                <vs-tooltip bottom shadow interactivity not-hover v-model="activeTooltip1">
                                    <vs-avatar class="cus_avatar" @click="activeTooltip1=!activeTooltip1">
                                        <i class='bx bx-user'></i>
                                    </vs-avatar>
                                    <template #tooltip>
                                    <div class="content-tooltip">
                                        <div class="body">
                                        <vs-avatar circle size="60">
                                            <i class='bx bx-user'></i>
                                        </vs-avatar> 
                                        <div class="text">
                                            {{userAuthFullName}}
                                            <span>
                                            {{userAuthLoginName}}
                                            </span>
                                        </div>
                                        </div>
                                        <footer>
                                        <vs-button circle @click="goToProfile">
                                            Edit Profile
                                        </vs-button>
                                        <vs-button circle @click="logout"  danger>
                                            Logout
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
            datanode: [],
            selectedNode: '',
            userAuthFullName:'',
            userAuthLoginName:''
        }
    },
    computed: {
        listenGetUser() {
            return this.$store.getters.getUser.user_data
        },
        listenGetUserNodeList() {
            return this.$store.getters.getUser.user_data['nodes']
        },
        // getLabaLaba() {
        //     return this.$store.getters.getLABA
        // },
    },
    methods: {
        updateValue(){

        },
        logout() {
            localStorage.clear();
            this.$router.go()
        },
        goToProfile() {
            if (this.$route.name !== 'profile') this.$router.push({ name: 'profile', params: { } });
        },
        updateValue(key,val) {
            let node = this.datanode.filter(item => item.value == val)
            this.$ls.set('node_id', node[0])
            this.$store.dispatch(`SET_USER_N`, node[0])
            this.$router.go(0)
        },
        init(){
            let userObjLocalStorage = JSON.parse(localStorage.getItem('vuejs__user')).value;
            this.userAuthLoginName = userObjLocalStorage.user_login;
            this.userAuthFullName = userObjLocalStorage.user_name;
            this.datanode = []
            let node = this.listenGetUserNodeList
                node.length > 0 && node.map(item => {
                            let obj = {}
                            obj["label"] = item.node_name
                            obj["value"] = item.node_id
                            obj["node_code"] = item.node_code

                            this.datanode.push(obj)
            })

            let n = this.$ls.get('node_id')
            if(n == null) {
                this.$ls.set('node_id', this.datanode[0])
                this.selectedNode = this.datanode[0].value
                this.$store.dispatch(`SET_USER_N`, this.datanode[0])
            } else {
                this.$store.dispatch(`SET_USER_N`, n)
                this.selectedNode = n.value
            }
        }
    },
    mounted() {
        this.init()
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
            padding-top: 10px;
            max-height:50px;
        }
        shadow{
            -webkit-box-shadow: 0px 3px 33px -12px rgba(0,0,0,0.42);
            -moz-box-shadow: 0px 3px 33px -12px rgba(0,0,0,0.42);
            box-shadow: 0px 3px 33px -12px rgba(0,0,0,0.42);
        }

        .m-select.vs-select-content{
            margin-top: 6px;
        }
        .cus_avatar{
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