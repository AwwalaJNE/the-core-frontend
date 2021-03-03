<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    <div style="width: 100px;padding-right: 5px;">
                        <vs-button
                        flat
                        block
                        :active="true"
                        @click="openDialog"
                        > 
                            <i class="bx bx-plus"></i> New
                        </vs-button>
                    </div>
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
                  <vs-col offset="2" xs="6" sm="3" lg="3">
                   <div class="custom-title">Total Amount : Rp {{ totalAmount }}</div>
                  </vs-col>
                  <vs-col xs="6" sm="3" lg="3" class="mb-15">
                    <search-input ref="searchInput" @searchValue="searchValue"/>
                  </vs-col>
                </vs-row>
              </div>
                <template>
                    <transition name="slide-fade">
                        <transactionList :ref="'transactionList'"  @totalAmount="getTotalAmount"  :dateFilter="tempDate" :query="tempSearch"/>
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

import TransactionList from "@/views/transactionList/transactionList"


export default {
    name:"transaction-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "daterange-filter": dateRange,
        "transactionList": TransactionList,
    },
    data() {
        return {
            title:"Transaction List",
            tempSearch: "",
            tempDate: [],
            totalAmount: 0,
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
            this.$router.push('/transaction/new-transactions')
        },
        getTotalAmount(val){
          this.totalAmount = val
        }
    },
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
</style>