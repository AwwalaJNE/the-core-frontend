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

        <section>
          <vs-row>
            <vs-col lg="6" sm="6" xs="6">
              <div class="box information" style="padding-top: 1px !important;">
                <h4 align="left">List of Bags</h4>
                <div class="nav-box">
                  <vs-row>
                    <vs-col xs="6" sm="6" lg="6">
                      <template>
                        <div class="center">
                          <vs-input border type="text"
                                    v-model="item_no"
                                    label-placeholder="Masukkan code BAG / Connote"
                                    v-on:keyup.enter="updateValue"
                                    autofocus
                                    icon-after
                                    ref="formInputInbound">
                            <template #icon>
                              <i class='bx bx-file'></i>
                            </template>
                          </vs-input>
                        </div>
                      </template>
                    </vs-col>

                  </vs-row>
                </div>
              </div>
            </vs-col>

            <!-- col for detail unreceive item-->
            <vs-col lg="6" sm="6" xs="6">
              <div class="box information" style="padding-top: 1px !important;">
                <h4 align="left">Information SM/SJ/Pickup Number</h4>
                <div class="nav-box">
                  <template>
                    <transition name="slide-fade">
                      <template v-if="loading == false">
                          <InboundInformation :ref="'inboundInformation'" :dataTableProp="dataTable" :loading="loading"/>
                      </template>
                    </transition>
                  </template>
                </div>
              </div>
              <div class="box information" style="padding-top: 1px !important;margin-top: 10px !important;">
                <h4 align="left">Inbound Detail</h4>
                <div class="nav-box">
                  <template>
                    <transition name="slide-fade">
                      <template v-if="loading == false">
                          <InboundDetail :ref="'inboundDetail'" :dataTableProp="dataTable" :loading="loading"/>
                      </template>
                    </transition>
                  </template>
                </div>
              </div>
              <vs-button class="mt-1" style="float: right"
                 square
                 active
                 @click="back"
              >
                <i class="bx bxs-chevron-left"> </i>  BACK
              </vs-button>
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
import dateRange from "@/components/daterange/index"

import InboundInformation from "@/views/inbound/scan/inboundInformation"
import InboundDetail from "@/views/inbound/scan/inboundDetail"


export default {
    name:"pickup-request",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "InboundInformation": InboundInformation,
        "InboundDetail": InboundDetail
    },
    data() {
        return {
            title:"Receiving",
            // tempSearch: "",
            // tempDate: [],
            // dialogPickupRequest:false,
            item_no:'',
            form:{},
            inbound_id:'',

            loading: false,
            dataTable: [],
            inboundDetailData : []
        }
    },
    methods: {
        refresh(){
          

              this.getTableData() // trigger function refresh form dari luar component list

        },
        // searchValue (val) {
        //     this.tempSearch = val
        // },
        // searchDate (val) {
        //   this.tempDate = val
        // },
        // clearSearch() {
        //     this.$refs.searchInput.clear()
        // },
        // closeDialogPickupRequest() {
        //   this.dialogPickupRequest = false
        // },
        // openDialog(){
        //     this.dialogPickupRequest = true
        // },
        updateValue(){
          this.form.item_no = this.item_no
          this.processInbond();
          this.$refs.formInputInbound.$el.querySelector("input").focus();
          this.$refs.formInputInbound.$el.querySelector("input").select();
        },
        getParamRoute(){
          if(this.$route.params.inbound_id){
            this.inbound_id = parseInt(this.$route.params.inbound_id)
            this.tempSearch = this.inbound_id.toString()
            this.refresh()
            console.log(this.inbound_id,'asd')
          }
        },
        async processInbond() {
          console.log('form', this.form)
          await axios
              .post(this.URL.receiving + `?n=${this.listenNodeId}`,
                  JSON.stringify(this.form),
                  this.Helper.header())
              .then(res => {
                  let message = 'TANPA : SM / SJ / PICKUP';
                  let typeNotif = null;
                if(res.data.data.inbound_id){
                  typeNotif = 'success';                  
                  message = null;
                  this.inbound_id = res.data.data.inbound_id
                }
                if(this.inbound_id === ''){
                  let detail = [];
                  this.inboundDetailData = res.data.data
                  if(this.inboundDetailData.hasOwnProperty('bag_number')){
                    detail = [
                      {
                        detail_incoming :[
                          {
                            item_number : this.inboundDetailData.bag_number,
                            item_type : "BAG",
                            is_received : 1
                          }
                        ]

                      }
                    ]
                  }else{
                    detail = [
                      {
                        detail_incoming :[
                          {
                            item_number : this.inboundDetailData.koli_number,
                            item_type : "KOLI",
                            is_received : 1
                          }
                        ]

                      }
                    ]
                  }
                  this.dataTable = detail;
                  console.log(this.dataTable,'li')
                }else{

                  this.refresh()
                  this.handlerClearForm()
                }

                this.openNotification(typeNotif, 'Receiving Success!', message)
              }).catch(err => {
                console.log(err,'err receiving');
                this.loading = false
                this.refresh()
                this.handlerClearForm()
                this.openNotification('danger', 'Receiving Failed!', err.response.data.message)
              })
        },

        async getTableData() {
            this.loading = true
            this.dataTable = []
            if(this.inbound_id === ''){


            }else{
              await axios
                  .get(this.URL.inbound +
                      `/${this.inbound_id}/inbound-status?n=${this.listenNodeId}`,
                      this.Helper.header())
                  .then(res => {
                    let data=[res.data.data]
                    data.map(item=>{
                      item['total_received'] = item.total_received.toString()
                      item['total_unreceived'] = item.total_unreceived.toString()
                    })
                    this.dataTable = data

                    this.loading = false
                  }).catch(err => {
                    this.loading = false
                    // this.openNotification('danger', 'Failed to populate Inbound list', err)
                  })
            }

        },

        back(){
          this.$router.push('/inbound/prealert')
        },
        handlerClearForm(){
          this.item_no = ''
        }

    },
    mounted() {
      this.getParamRoute()
    }
}
</script>
<style lang="scss">
  .mb-15{
   margin-bottom: 1.5em;
  }
  .custom-title{
    padding: 0.6em;
    text-align: right;
    font-weight: 600;
  }
  .information{
    min-height: 190px;
  }
  .nav-box{
    margin-top: 1em;
  }
</style>