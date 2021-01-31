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
            <vs-col lg="12" sm="12" xs="12">
              <div class="box information" style="padding-top: 1px !important;">
                <p align="left"><b>Courier</b></p>
                <p align="left">7668(KURIR1)</p>
                <div class="nav-box">
                  <vs-row>
                    <vs-col xs="4" sm="4" lg="4" style="margin-top: 2em">
                      <template>
                        <div class="center">
                          <vs-input border type="text"
                                    v-model="item_no"
                                    label-placeholder="Scan Connote here"
                                    v-on:keyup.enter="updateValue"
                                    autofocus
                                    icon-after
                                    ref="formInputConnote">
                            <template #icon>
                              <i class='bx bx-file'></i>
                            </template>
                          </vs-input>
                        </div>
                      </template>
                    </vs-col>
                    <vs-col xs="4" sm="4" lg="4" offset="2">
                      <template>
                        <div class="left">
                          <ul style="float: left; text-align: left">
                            <li>User : SAM</li>
                            <li>Date : 2021-09-10</li>
                            <li>Total : 1 Connotes (1 Kg)</li>
                            <li>Expectations COD :  Rp. 200.000</li>
                          </ul>
                        </div>
                      </template>
                    </vs-col>
                  </vs-row>

                  <vs-row>

                    <!-- col for detail unreceive item-->
                    <vs-col lg="12" sm="12" xs="12" style="margin-top: 2em">
                      <template>
                        <transition name="slide-fade">
                          <template>
                            <RunsheetInformation :ref="'runsheetInformation'"   :query="tempSearch"/>
                          </template>
                        </transition>
                      </template>

                    </vs-col>
                  </vs-row>
                </div>
              </div>
            </vs-col>
          </vs-row>
          <vs-row justify="flex-end">
            <vs-button class="mt-1" style="float: right"
                       square
                       active
                       @click="back"
            ><i class="bx bxs-printer"> </i>  PRINT
            </vs-button>
            <vs-button class="mt-1" style="float: right"
                       square
                       active
                       @click="back"
            ><i class="bx bxs-save"> </i>  DEPART
            </vs-button>
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

import RunsheetInformation from "@/views/delivery/runsheet/edit/runsheetInformation"


export default {
    name:"delivery-runsheet-edit",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "RunsheetInformation": RunsheetInformation,
    },
    data() {
        return {
            title:"Edit Assign",
            tempSearch: "",
            tempDate: [],
            dialogPickupRequest:false,
            item_no:'',
            form:{},
            inbound_number:''
        }
    },
    methods: {
        refresh(){
            this.$refs.inboundInformation.refresh() // trigger function refresh form dari luar component list
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
          this.form.item_no = this.item_no
          this.processInbond();
        },
        getParamRoute(){
          if(this.$route.params.inbound_number){
            this.inbound_number = this.$route.params.inbound_number
            this.tempSearch = this.$route.params.inbound_number
          }
        },
        async processInbond() {
          console.log('form', this.form)
          await axios
              .post(this.URL.receiving + `?n=${this.listenNodeId}`,
                  JSON.stringify(this.form),
                  this.Helper.header())
              .then(res => {
                console.log(res,'res receiving');
                this.refresh()
                this.openNotification(null, 'Success', 'Receiving is success')
              }).catch(err => {
                console.log(err,'err receiving');
                this.loading = false
                this.refresh()
                this.openNotification('danger', 'Receiving is failed', err)
              })
        },
        back(){
          this.$router.push('/inbound/prealert')
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