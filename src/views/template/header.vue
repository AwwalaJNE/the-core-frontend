<template>
    
        <header class="header shadow">
            <div class="container">
                <vs-row justify="space-between">
                    <vs-col xs="12" sm="12" lg="2">
                        <vs-row>
                            <vs-col xs="3" sm="3" lg="3">
                                <vs-button @click="clickProps" size="l" :active="true" border icon>
                                    <i class='bx bx-menu'></i>
                                </vs-button>
                                <!-- <div class="burger_custom" @click="clickProps"><i class='bx bx-menu'></i></div> -->
                            </vs-col>
                            <vs-col xs="3" sm="3" lg="3">
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
                            <vs-col xs="1" sm="1" lg="1">
                                <vs-avatar class="cus_search" @click="openDialog">
                                    <i class='bx bx-search'></i>
                                </vs-avatar>
                                <!--Dialog Search General-->
                                <search-general
                                    :active="dialogSearchGeneral"
                                    :closeDialog="closeDialogSearchGeneral"
                                    title=""
                                />
                            </vs-col>
                            <vs-col xs="1" sm="1" lg="1">                            
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
import axios from "axios";
import master from "@/mixins/master";
import Logo from "@/components/logo/logo.vue"
import Selector from "@/components/input/select"
import SearchInput from "@/components/search/searchInput"
import SearchGeneral from "@/components/search/searchGeneral"
export default {
    name:"main-header",
    components: {
        "Logo": Logo,
        "selector": Selector,
        "search-input": SearchInput,
        "search-general": SearchGeneral,
    },
    mixins: [master],
    props: {
        clickProps: Function
    },
    data() {
        return {
            activeSidebar: false,
            activeTooltip1: false,
            dialogSearchGeneral:false,
            tempSearch: "",
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
        searchValue (val) {
            this.tempSearch = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        closeDialogSearchGeneral() {
          this.dialogSearchGeneral = false
        },
        openDialog(){
            this.dialogSearchGeneral = true
        },
        updateValue(){

        },
        async logout() {
            try {
                await this.setRoutePageHistory({}, true);
                
            } catch (error) {} 
            finally {
                localStorage.clear();
                this.$router.go(0);  
            }
        },
        goToProfile() {
            if (this.$route.name !== 'profile') this.$router.push({ name: 'profile', params: { } });
            this.setRoutePageHistory(this.$route.meta, false);
        },
        async updateValue(key,val) {
            let node = this.datanode.filter(item => item.value == val)
            let form = {
                node_id : node[0].value
            }
            await axios
                .patch(
                    `${this.URL.user}/${this.listenGetUser['user_id']}/node?n=${this.listenNodeId}`, form, this.Helper.header()
                )
                .then((res) => {
                    this.$ls.set('node_id', node[0])
                    this.$store.dispatch(`SET_USER_N`, node[0])
                    this.openNotification("success", null, "Success!", res.data.message || "Node Updated!");
                    this.$router.go(0)
                })
                .catch((err) => {
                    this.openNotification(
                        "danger",
                        err.response ? err.response.data.code : '',
                        "Failed!",
                        "Failed to change data node!"
                    );
                });
        },
        async getListNode() {
            await axios
                .get(
                    `${this.URL.user}/${this.listenGetUser['user_id']}/node?n=${this.listenNodeId}`, this.Helper.header()
                )
                .then((res) => {
                    this.datanode = []
                    let node = res.data.data
                        node.length > 0 && node.map(item => {
                                    let obj = {}
                                    obj["label"] = item.node_name
                                    obj["value"] = String(item.node_id)
                                    obj["node_code"] = String(item.node_code)
                                    obj["is_currently_used"] = item.is_currently_used

                                    this.datanode.push(obj)
                    })
                    
                    let current_node = this.datanode.find(node => node.is_currently_used).value

                    let n = this.$ls.get('node_id')
                    if(n == null) {
                        this.$ls.set('node_id', this.datanode[0])
                        this.$ls.set('permissions',res.data.permission)
                        this.selectedNode = String(current_node)
                        this.$store.dispatch(`SET_USER_N`, this.datanode[0])
                    } else {
                        this.$ls.set('permissions',res.data.permission)
                        this.$store.dispatch(`SET_USER_N`, n)
                        this.selectedNode = String(n.value)
                    }
                })
                .catch((err) => {
                    this.openNotification(
                        "danger",
                        err.response ? err.response.data.code : '',
                        "Failed!",
                        "Failed to get list data node!"
                    );
                });
        },
        init(){
            let userObjLocalStorage = JSON.parse(localStorage.getItem('vuejs__user')).value;
            this.userAuthLoginName = userObjLocalStorage.user_login;
            this.userAuthFullName = userObjLocalStorage.user_name;

            let currently_used_node = userObjLocalStorage.currently_used_node;

            this.datanode = []
            let node = this.listenGetUserNodeList.filter(item => item.node_id === currently_used_node);
                node.length > 0 && node.map(item => {
                            let obj = {}
                            obj["label"] = item.node_name
                            obj["value"] = String(item.node_id)
                            obj["node_code"] = String(item.node_code)
                            obj["is_cdm"] = Boolean(item.is_cdm)

                            this.datanode.push(obj)
            })

            let n = this.$ls.get('node_id')
            if(n == null) {
                this.$ls.set('node_id', this.datanode[0])
                this.selectedNode = String(this.datanode[0].value)
                this.$store.dispatch(`SET_USER_N`, this.datanode[0])
            } else {
                this.$store.dispatch(`SET_USER_N`, n)
                this.selectedNode = String(n.value)
            }
        },
        searchShortcut() {
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
                    e.preventDefault();
                    this.openDialog();
                }
            });
        }
    },
    mounted() {
        this.init()   
        this.getListNode()
        this.searchShortcut()
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
        position: sticky;
        .burger_custom{
            margin: auto;
            margin-top: .3em;
            padding: .2em 0;
            width: 40px;
            height: 40px;
            border: 1px solid rgba(var(--vs-primary), 1);
            background: rgba(var(--vs-primary), 1);
            color: #fff;
            font-size: 24px;
            border-radius: 10px;
            cursor: pointer;
        }
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
        .cus_search{
            top: 4px;
            margin: 0 auto;
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