<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
        </vs-row>
        <section class="users">
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" :w="`${navActive === 'k-PERMISSIONS'?'4':'12'}`">
                    <div class="box view">
                        <vs-row justify="space-between">
                            <vs-col xs="6" sm="9" lg="9">
                                <nav-item :navItem="navItemm" @activeTab="activeTab" />
                            </vs-col>
                            <vs-col xs="6" sm="3" lg="3">
                             <vs-button class="--primary">PRINT</vs-button>
                            </vs-col>
                        </vs-row>
                        <template v-if="navActive === 'k-INFO'">
                          <vs-row justify="space-between">
                            <vs-col xs="4" sm="4" lg="4">
                              <selector-origin
                                  :title="'From'"
                                  :valueData="originData"
                                  @updateInfo="updateInfo" />
                            </vs-col>

                            <vs-col xs="4" sm="4" lg="4">
                              <selector-detail
                                  :title="'To'"
                                  :valueData="originData"
                                  @updateInfo="updateInfo" />
                            </vs-col>
                            <vs-col xs="4" sm="4" lg="4">
                              <selector-detail
                                  :title="'Information'"
                                  :valueData="originData"
                                  @updateInfo="updateInfo" />
                            </vs-col>
                          </vs-row>

                        </template>
                        <template v-if="navActive === 'k-ACTIVITY'">
                          <vs-row >
                            <vs-col vs-align="center" xs="3" sm="3" lg="2">
                              <select-status-inventory :isMultiple="false" :border="true" @updateStatusinventory="updateStatusinventory" />
                            </vs-col>
                          </vs-row>
                        </template>
                        
                    </div>
                </vs-col>
                
            </vs-row>
        </section>

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import selectorDetailVue from "@/views/inventory/connote-detail/connote/selectorDetail"
import SelectInventoryVue from "@/views/inventory/connote-detail/connote/selectInventoryStatus"


export default {
    name:"ConnoteDetail",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "selector-origin": selectorDetailVue,
        "selector-detail": selectorDetailVue,
        "select-status-inventory": SelectInventoryVue
    },
    data() {
        return {
            navItemm: [
                {
                    label: "INFO",
                    key: "k-INFO",
                    title: "Connote Info"
                },
                {
                    label: "ACTIVITY",
                    key: "k-ACTIVITY",
                    title: "Connote Activity"
                }
            ],
            navActive: "k-INFO",
            dialogUser: false,
            dialogRole: false,
            title: "Connote List",
            dataRole: [],
            loadingDataRole: false,

            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogRole: false,
            refreshInject:"",
            originData:[
              {
                label: 'Nama',
                value: 'Pengirim A',
                key: ''
              },
              {
                label: 'Alamat',
                value: 'Jakarta Barat',
                key: ''
              },
              {
                label: 'Kode Pos',
                value: '67828',
                key: 'kodepos'
              },
              {
                label: 'Kode Asal',
                value: 'CGKH678',
                key: 'kodeasal'
              }

            ],
            statusinventory:"",

        }
    },
    methods: {
        updateStatusBag(key,val) {
          this.status_bag = val;
        },
        updateStatusinventory(key,val) {
          this.statusinventory = val;
        },
        updateInfo(key,val) {

        },
        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
        },

        activeTab(val) {
            this.navActive = val
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title


        },
        openDialog(){
            switch(this.navActive) {
                case "k-INFO":
                    this.dialogUser = true
                    break;
                case "k-ACTIVITY":
                    this.dialogRole = true
                    break;
                default:
                    // code block
            }
            this.refreshInject = this.navActive
        },
        closeDialogUser() {
            this.dialogUser = false
        },
        closeDialogRole() {
            this.dialogRole = false
        }
    },
}
</script>
<style lang="scss">
    .users{
        min-height: 50vh;
        .view{
            min-height: 400px;
        }
        .nav-box{
            position: relative;
            top: 0;
            left: 0;
            width: auto;
            max-width: 350px;
        }
        .dataRole{
            position: relative;
            width: 100%;
            padding: 15px;
            ul{
                position: relative;
                margin: 0;
                padding: 0;
                width: 100%;
                li{
                    text-align: left;
                    cursor: pointer;
                    padding: 1em;
                    border-bottom: 1px solid #eee;
                    background-color: white;
                    transition: all .2s ease;
                    &:hover{
                        background-color: #f1f1f1;
                        transition: all .3s ease-in;
                    }
                }
            }
        }
    }
</style>