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
                <p align="left">{{dataDelivery.employee_code }} ({{dataDelivery.employee_name}})</p>
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
                            <li>User : -</li>
                            <li>Date : -</li>
                            <li>Total : {{ summary.total_connote }} Connotes</li>
                            <li>Expectations COD : {{summary.amount_cod}}</li>
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
                            <RunsheetInformation :ref="'runsheetInformation'"   @reload="reloadSummary" :query="tempSearch" :deliveryRunsheetNumber="delivery_runsheet_number" />
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
            delivery_runsheet_number:'',
            dataDelivery:'',
            summary: {},
        }
    },
    methods: {
        refresh(){
            this.$refs.runsheetInformation.refresh() // trigger function refresh form dari luar component list
        },
        reloadSummary(val){
          let amount = 0
          let total_connote = 0
          val.map(item=>{
            amount = amount + parseInt(item.amount_cod)

          })
          this.summary.amount_cod = this.moneyformat(amount)
          this.summary.total_connote = val.length

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
          console.log(this.dataDelivery,'kkl')
          this.form.koli_number = this.item_no
          this.form.delivery_runsheet_number = this.delivery_runsheet_number
          this.form.courier_employee_id = this.dataDelivery.employee_id
          this.processInbond();
        },
        getParamRoute(){
          if(this.$route.params.delivery_runsheet_number){
            this.delivery_runsheet_number = this.$route.params.delivery_runsheet_number
            this.dataDelivery = this.$route.params.data
          }
        },
        async processInbond() {
          console.log('form', this.form)
          await axios
              .post(this.URL.delivery + `/${this.delivery_runsheet_number}/detail?n=${this.listenNodeId}`,
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