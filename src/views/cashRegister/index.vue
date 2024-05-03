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
                    @click="generateCashRegister"
                >
                  GENERATE
                </vs-button>
              </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
              <div class="nav-box">
                <vs-row justify="space-between">
                  <vs-col xs="6" sm="4" lg="4">
                    <daterange-filter @searchDate="searchDate"/>
                  </vs-col>
                  <vs-col offset="3" xs="6" sm="3" lg="3" class="mb-15">
                    <search-input ref="searchInput" @searchValue="searchValue" placeholder="Search Cash Register"/>
                  </vs-col>
                </vs-row>
              </div>
                <template>
                    <transition name="slide-fade">
                        <cashRegisterList :ref="'transactionList'" :dateFilter="tempDate"  :query="tempSearch"/>
                    </transition>
                </template>

            </div>
        </section>

      <!--    dialog confirm create cash register-->
      <dialog-confirm
          :active="activeDialogCashRegister"
          :loading="activeLoadingCashRegister"
          :closeDialog="closeDialogConfirm"
          title="Cash Register"
          message="Are you sure you want to generate cash register ?"
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

import cashRegisterList from "@/views/cashRegister/cashRegisterList"
import DialogConfirm from "@/components/dialog/dialogConfirm"


export default {
    name:"cash-register",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "daterange-filter": dateRange,
        "cashRegisterList": cashRegisterList,
        "dialog-confirm": DialogConfirm
    },
    data() {
        return {
            title:"Cash Register",
            tempSearch: "",
            tempDate: [],
            activeDialogCashRegister:false,
            activeLoadingCashRegister:false,
            form:{}

        }
    },
    methods: {
        refresh(){
            this.$refs.transactionList.refresh() // trigger function refresh form dari luar component list
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

        openDialog(){
            this.$router.push('/new-transactions')
        },
        generateCashRegister(){
          this.activeDialogCashRegister = true
        },
        closeDialogConfirm(){
          this.activeDialogCashRegister = false
        },
        confirm(val) {
          if(val) {
            this.activeLoadingCashRegister=true
            this.addData()
          }
        },
        async addData() {
          await axios
              .post(
                  this.URL.cash_register +`?n=${this.listenNodeId}`,
                  JSON.stringify(this.form),this.Helper.header())
              .then(res => {
                this.loading=false
                this.activeLoadingCashRegister=false
                this.closeDialogConfirm()
                this.$refs.transactionList.refresh()
                this.openNotification(null, 'Success', 'Generate cash Register is success')
              }).catch(err => {
                this.loading = false
                this.activeLoadingCashRegister = false
                this.closeDialogConfirm()
                this.$refs.transactionList.refresh()
                this.openNotification('danger', 'Create new role is failed', err.response ? err.response.data.message : 'something went wrong')
              })
        },
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
  //.btn-print-all{
  //  padding-top: 0.7em;
  //}
  .btn-cash-register{
    max-width: 215px !important;
  }
</style>