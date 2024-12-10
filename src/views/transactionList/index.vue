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
                        <vs-col xs="12" sm="12" lg="6">
                            <vs-row>
                                <vs-col w="4">
                                    <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy" :valueData="dateParams" :selectedValue="filterDateBy" />
                                </vs-col>
                                <vs-col w="8">
                                    <daterange-filter @searchDate="searchDate" size="small" />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                        <vs-col xs="12" sm="12" lg="6">
                            <vs-row justify="end">
                                <vs-col xs="6" sm="8" lg="4">
                                    <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy" :valueData="searchParams" :selectedValue="searchBy" />
                                </vs-col>
                                <vs-col xs="6" sm="4" lg="4">
                                    <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                        <vs-row justify="end">
                            <vs-col xs="12" sm="6" lg="3">
                                <div class="custom-title">Total Amount : {{ moneyformat(totalAmount) }}</div>
                            </vs-col>
                        </vs-row>
                    </vs-row>
                </div>
                <template>
                    <transition name="slide-fade">
                        <transactionList :ref="'transactionList'"  @totalAmount="getTotalAmount"  :dateFilter="tempDate" :query="tempSearch" :searchBy="searchBy" :filterDateBy="filterDateBy"/>
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
import SelectSearchBy from "@/components/search/selectSearchBy"

import TransactionList from "@/views/transactionList/transactionList"
import master from "@/mixins/master";


export default {
    name:"transaction-index",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "daterange-filter": dateRange,
        "transactionList": TransactionList,
        "select-search-by" : SelectSearchBy
    },
    data() {
        return {
            title:"Transaction List",
            tempSearch: "",
            tempDate: [],
            totalAmount: 0,
            searchBy:"transaction id",
            filterDateBy: "create",
            searchPlaceholder: "Search Transaction ID",
            searchParams: [
                {
                    label: "Transaction ID",
                    value: "transaction id",
                },
                {
                    label: "Shipper Name",
                    value: "connote",
                },
                {
                    label: "Total Amount",
                    value: "transaction_amount",
                },
                {
                    label: "User",
                    value: "user",
                },
                {
                    label: "Payment Type",
                    value: "payment_type_name",
                }
            ],
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                },
            ]
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
            this.setRoutePageHistory(this.$route.meta, false);
        },
        getTotalAmount(val){
          this.totalAmount = val
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key,val) {
            this.filterDateBy = val;
        },
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