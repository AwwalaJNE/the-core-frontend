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
            <vs-col lg="7" sm="7" xs="7">
              <div class="box information" style="padding-top: 1px !important;">
                <div class="nav-box">
                  <vs-row>
                    <vs-col xs="6" sm="6" lg="6" style="margin-top: 2em">
                      <template>
                        <div class="center">
                          <vs-input border type="text"
                                    v-model="item_no"
                                    label-placeholder="Masukkan Connote"
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
            <vs-col lg="5" sm="5" xs="5">
              <div class="box information" style="padding-top: 1px !important;">
                <h5 align="left">List Connote Undelivered</h5>
                <div class="nav-box">
                  <template>
                    <transition name="slide-fade">
                          <UndeliveryInformation :ref="'undeliveryInformation'"   :query="tempSearch"/>
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

import UndeliveryInformation from "@/views/delivery/undelivery/UndeliveryInformation"


export default {
    name:"pickup-request",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "UndeliveryInformation": UndeliveryInformation,
    },
    data() {
        return {
            title:"Undelivered Receiving",
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

        async processUndelivery() {
          console.log('form', this.form)
          await axios
              .post(this.URL.delivery_return + `?n=${this.listenNodeId}`,
                  JSON.stringify(this.form),
                  this.Helper.header())
              .then(res => {
                console.log(res,'res receiving');
                this.refresh()
                this.handleClearForm();
                this.openNotification(null, 'Success', 'Receiving is success')
              }).catch(err => {
                console.log(err,'err receiving');
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
          this.item_no = ""
        },

    },
    mounted() {
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