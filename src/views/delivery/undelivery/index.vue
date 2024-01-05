<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <vs-col xs="4" sm="4" lg="4" align="right">
              <div class="btn-print-all">
                <vs-button class="btn-cash-register"
                    square
                    block
                    @click="finishReceiving"
                >
                  Finish Receiving Runsheet
                </vs-button>
              </div>
            </vs-col>

        </vs-row>

        <section>
          <vs-row>
            <vs-col lg="6" sm="6" xs="12">
              <div class="box information" style="padding-top: 1px !important;">
                <div class="nav-box">
                    <vs-row>
                  <!-- <vs-col xs="12" sm="6" lg="6" style="margin-top: 2em">
                        <template>
                          <div class="center">
                            <vs-input border type="text"
                                      v-model="item_no"
                                      label-placeholder="Masukkan Nomor Runsheet"
                                      v-on:keyup.enter="updateValue"
                                      autofocus
                                      icon-after
                                      ref="formInputRunsheet">
                            </vs-input>
                          </div>
                        </template>
                      </vs-col> -->
                  <vs-col xs="12" sm="6" lg="6" style="margin-top: 2em">
                    <template>
                      <div class="center">
                        <vs-input border type="text" v-model="no_runsheet" :autofocus="true"  v-on:keyup.enter="scanKoli" label-placeholder="Scan Nomor Runsheet" autofocus icon-after ref="formInputInbound">
                          <template #icon>
                            <i class='bx bx-file'> </i>
                          </template>
                        </vs-input>
                      </div>
                    </template>
                  </vs-col>
                  <vs-col xs="12" sm="6" lg="6" style="margin-top: 2em">
                    <template>
                      <div class="center">
                        <vs-input border type="text" v-model="item_no" label-placeholder="Masukkan Koli" v-on:keyup.enter="updateValue" autofocus icon-after ref="formInputInbound">
                          <template #icon>
                            <i class='bx bxs-file'> </i>
                          </template>
                        </vs-input>
                      </div>
                    </template>
                  </vs-col>
                </vs-row>
                </div>
              </div>
              <vs-col lg="12" sm="12" xs="12">
                <div class="box information" style="padding-top: 1px !important;">
                  <vs-row style="padding-top:5px" justify="space-around">
                    <vs-col lg="12" sm="12" xs="12" w="3">
                      <h5 align="left">List All Connote Runsheet</h5>
                    </vs-col>
                  </vs-row>
                  <div class="nav-box">
                    <template>
                      <transition name="slide-fade">
                            <ConnoteRunsheetInformation :ref="'ConnoteRunsheetInformation'"   :query="tempSearch" :courr="courierSel" v-on:cour-list="getCourrier" v-on:total-connote="getTotal"/>
                      </transition>
                    </template>
                  </div>
                </div>
              </vs-col>
            </vs-col>

            <!-- col for detail unreceive item-->
            <vs-col lg="6" sm="6" xs="12">
              <div class="box information" style="padding-top: 1px !important;">
              <vs-row style="padding-top:5px" justify="space-around">
                <vs-col lg="8" sm="6" xs="12" w="3">
                  <h5 align="left">List Connote Undelivered ({{ this.totalConnote ? this.totalConnote : 0 }})</h5>
                </vs-col>
                <vs-col lg="4" sm="6" xs="12" style="margin-top:5px; align-items: right;">
                  <vs-select
                    filter
                    placeholder="Filter"
                    v-model="courierSel"
                  >
                    <vs-option :key="index" :label="item.text" :value="item.value" v-for="item,index in courArray">
                      {{item.text}}
                    </vs-option>
                  </vs-select>
                </vs-col>
              </vs-row>

                <div class="nav-box">
                  <template>
                    <transition name="slide-fade">
                          <UndeliveryInformation :ref="'undeliveryInformation'"   :query="tempSearch" :courr="courierSel" v-on:cour-list="getCourrier" v-on:total-connote="getTotal"/>
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

        <!-- dialog confirm create receiving -->
        <dialog-confirm
            :active="activeDialogFinishReceiving"
            :loading="activeLoadingFinishReceiving"
            :closeDialog="closeDialogConfirm"
            title="Finish Receiving Runsheet"
            message="Are you sure you want to Finish Receiving Runsheet?"
            @confirm="confirm"
            @cancel="closeDialogConfirm"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import dateRange from "@/components/daterange/index"

import UndeliveryInformation from "@/views/delivery/undelivery/UndeliveryInformation"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import ConnoteRunsheetInformation from "@/views/delivery/undelivery/ConnoteRunsheetInformation"


export default {
    name:"pickup-request",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "UndeliveryInformation": UndeliveryInformation,
        "dialog-confirm": DialogConfirm,
        "ConnoteRunsheetInformation": ConnoteRunsheetInformation
    },
    data() {
        return {
            title:"Undelivered Receiving",
            tempSearch: "",
            tempDate: [],
            dialogPickupRequest:false,
            item_no:'',
            no_runsheet:'',
            form:{},
            inbound_number:'',
            totalConnote:0,
            courierSel:0,
            courArray:[],
            activeDialogFinishReceiving: false,
            activeLoadingFinishReceiving: false
        }
    },
    methods: {
        refresh(){
            this.$refs.undeliveryInformation.refresh() // trigger function refresh form dari luar component list
          },
        searchValue (val) {
            this.tempSearch = val
        },
        searchDate (val) {
          this.tempDate = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        closeDialogPickupRequest() {
          this.dialogPickupRequest = false
        },
        openDialog(){
            this.dialogPickupRequest = true
        },
        updateValue(){
          this.form.koli_number = this.item_no
          this.processUndelivery();
        },
        scanKoli(){
          this.form.delivery_number_runsheet = this.no_runsheet
          this.$store.commit('SET_DELIVERY_NUMBER', this.no_runsheet);
          this.$refs.ConnoteRunsheetInformation.refresh();
          this.confirm();
        },
        getTotal(tot) {
          this.totalConnote = tot
        },
        getCourrier(datas){
          this.courArray = datas
        },

        async processUndelivery() {
          await axios
              .post(this.URL.undelivery + `?n=${this.listenNodeId}`,
                  JSON.stringify(this.form),
                  this.Helper.header())
              .then(res => {
                this.refresh()
                this.handleClearForm()
                this.openNotification(null, 'Success', 'Receiving is success')
              }).catch(err => {
                this.loading = false
                this.refresh()
                this.handleClearForm();
                this.openNotification('danger', 'Receiving is failed', err)
              })
        },
        back(){
          this.$router.push('/inbound/prealert')
        },
        handleClearForm(){
          this.form = {}
          this.item_no = "",
          this.no_runsheet= ""
        },
        finishReceiving(){
          this.activeDialogFinishReceiving = true
        },
        closeDialogConfirm(){
          this.activeDialogFinishReceiving = false
        },
        confirm(val) {
          if(val) {
            this.activeLoadingFinishReceiving=true
            this.addData()
          }
        },
        async addData() {
          await axios
              .post(this.URL.receiving_runsheet + `?n=${this.listenNodeId}`,
                  JSON.stringify(this.form),
                  this.Helper.header())
              .then(res => {
                this.$refs.ConnoteRunsheetInformation.refresh();
                this.activeDialogFinishReceiving = false
                this.activeLoadingFinishReceiving = false
                this.handleClearForm()
                this.openNotification(null, 'Success', 'Receiving Runsheet is success')
                
      this.refresh()
              }).catch(err => {
                this.activeDialogFinishReceiving = false
                this.activeLoadingFinishReceiving = false
                this.refresh()
                // this.handleClearForm();
                this.openNotification('danger', 'Mohon melakukan scan nomor runsheet terlebih dahulu', err)
              })
        },
    },
    mounted() {
      this.refresh()
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
  .nav-box{
    margin-top: 1em;
  }
</style>