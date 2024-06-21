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
            <vs-col lg="6" sm="6" xs="12">
              <div class="box information" style="padding-top: 1px !important;">
                <h4 align="left">List of Bags</h4>
                <div class="nav-box">
                  <vs-row>
                    <vs-col xs="12" sm="12" lg="6">
                      <template>
                        <div class="center">
                          <vs-input border type="text"
                                    v-model="item_no"
                                    label-placeholder="Masukkan code BAG / Koli / SM"
                                    autofocus
                                    icon-after
                                    ref="formInputInbound"
                                    @keyup.enter.native="updateValue"
                                    @click-icon="$refs.cameraScanner.open('formInputInbound')">
                            <template #icon>
                              <i class="bx bx-barcode-reader"></i>
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
            <vs-col lg="6" sm="6" xs="12">
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
        <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />


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
import CameraScanner from "@/components/scanner/camera.vue";


export default {
    name:"pickup-request",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "InboundInformation": InboundInformation,
        "InboundDetail": InboundDetail,
        CameraScanner,
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
          this.handlerClearForm()
        },
        getParamRoute(){
          if(this.$route.params.inbound_id){
            this.inbound_id = this.$route.params.inbound_id.toString()
            this.tempSearch = this.inbound_id.toString()
            this.refresh()
          }
        },
        transformSequence(orion_sequence) {
          const [prefix, middle, suffix] = orion_sequence.split("/")
          const coreSequence = `${prefix}-${middle}-C${suffix}`
          return coreSequence
        },
        async processInbond() {
          this.openProgress(null, "Processing", `${this.form.item_no ? this.form.item_no : 'Item' } is in process`);
          let inbound_number = this.dataTable.length > 0 ? this.dataTable[0].inbound_number : null;
          this.form.inbound_number = inbound_number;
          await axios
              .post(this.URL.receiving + `?n=${this.listenNodeId}`,
                  JSON.stringify(this.form),
                  this.Helper.header())
              .then(res => {
                this.closeProgress();
                if (res.data.data.is_delivered == 1) {
                  this.openNotification("danger", "Receiving Failed!", "Item has been delivered");
                } else{
                  let message = 'TANPA : SM / SJ / PICKUP';
                  let typeNotif = null;
                  this.$ls.set('id_inbound',res.data.data.id_inbound)
                  if(res.data.data.inbound_id){
                    typeNotif = 'success';                  
                    message = null;
                    this.inbound_id = res.data.data.inbound_id
                  }
                  this.refresh()
                  this.handlerClearForm()
                  setTimeout(()=>{
                    this.openNotification(typeNotif, 'Receiving Success!', message)
                  },300);
                }
              }).catch(err => {
                this.closeProgress();
                this.loading = false
                // TODO: CHANGE THIS TO REFERENCE NUMBER (CHECK FIELD FROM BE)
                let typeNotif = 'danger';
                if (err.response.data.reference) {
                  typeNotif = 'danger';
                  this.inbound_id = err.response.data.reference
                }
                this.refresh()
                this.handlerClearForm()

                // TODO: BETTER WARN ATAU STILL SUCCESS YA?
                setTimeout(()=>{
                  this.openNotification(typeNotif, 'Receiving Failed!', err.response.data.message)
                }, 300);
              })
        },

        async getTableData() {
            this.loading = true
            this.dataTable = []
            const inboundId = this.inbound_id.toString()
            if(this.inbound_id === ''){
              const id_inbound  = this.$ls.get('id_inbound');
              const getInboundId = id_inbound?.toString()?.toLowerCase();
              // console.log(getInboundId,'id_inbound');
              await axios
                  .get(this.URL.inbound +
                      `/${getInboundId}/inbound-status?n=${this.listenNodeId}`,
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
                    this.openNotification('danger', 'Failed to receiving ', err)
                  })
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
            this.$ls.remove('id_inbound');

        },

        back(){
          this.$router.push('/inbound/prealert')
        },
        handlerClearForm(){
          this.item_no = ''
        },
        onCameraScannerGetData(data) {
          if (
            // eslint-disable-next-line operator-linebreak
            data &&
            // eslint-disable-next-line operator-linebreak
            data.event === "result" &&
            data.namespace === "formInputInbound"
          ) {
            this.item_no = data.data.text;
            this.updateValue();
          }
        },

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