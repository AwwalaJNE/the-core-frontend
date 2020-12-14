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
                >
                  GENERATE CASH REGISTER
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
                    <search-input ref="searchInput" @searchValue="searchValue"/>
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

    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import dateRange from "@/components/daterange/index"

import cashRegisterList from "@/views/cashRegister/cashRegisterList"


export default {
    name:"cash-register",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "daterange-filter": dateRange,
        "cashRegisterList": cashRegisterList,
    },
    data() {
        return {
            title:"Cash Register",
            tempSearch: "",
            tempDate: [],
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