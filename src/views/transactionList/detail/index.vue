<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <vs-col xs="4" sm="1" lg="1" align="right">
              <div class="btn-print-all">
                <vs-button
                    ref="btnPrintAll"
                    square
                    block
                    @click="printAll"
                >
                  PRINT ALL
                </vs-button>
              </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
              <div class="nav-box">
                <vs-row justify="space-between">

                  <vs-col offset="9" xs="6" sm="3" lg="3" class="mb-15">
                    <search-input ref="searchInput" @searchValue="searchValue"/>
                  </vs-col>
                </vs-row>
              </div>
                <template>
                    <transition name="slide-fade">
                        <transactionDetailList :ref="'transactionList'" :query="tempSearch" @printAllData="printAllDataResolver"/>
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
import master from "@/mixins/master"
import TransactionDetailList from "@/views/transactionList/detail/transactionDetailList"


export default {
    name:"transaction-index",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "daterange-filter": dateRange,
        "transactionDetailList": TransactionDetailList,
    },
    data() {
        return {
            title:"Connote Detail",
            tempSearch: "",
            tempDate: [],
            koli_number: ''
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

        printAllDataResolver(arr) {
            if(arr.length > 0) {
              this.koli_number = ''
              let str = []
              arr.map(conot => {
                  if(conot.hasOwnProperty('koli')) {
                      let temp = []
                      conot.koli.map(koli => {
                          if(koli.hasOwnProperty('koli_number')) {
                              temp.push(koli.koli_number)
                          }
                      })
                      str = [...str, ...temp]
                  }
              })
              this.koli_number = str.toString()
            }
            
        },
        printAll() {
            if(this.koli_number.length > 0) {
              let routeData = this.$router.resolve({ name: 'printGeneral', params: { 'id': this.koli_number, 'type': 'koli-reprint', 'node_id': this.listenNodeId} });
              window.open(routeData.href, '_blank');
            }
        }

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
  .btn-print-all{
    padding-top: 0.7em;
  }
</style>