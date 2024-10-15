<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <!-- <vs-col xs="6" sm="3" lg="3">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    <div style="width: 100px;padding-right: 5px;">
                        <vs-button
                        flat
                        square
                        block
                        :active="true"
                        @click="openDialog"
                        > RECEIVING
                        </vs-button>
                    </div>
                </div>
            </vs-col> -->
        </vs-row>

        <section class="nodes">
            <div class="box view">
              <div class="nav-box">
                <vs-row justify>
                  <vs-col xs="3" sm="3" lg="3">
                    <daterange-filter @searchDate="searchDate"/>
                  </vs-col>
                  
                  
                  <vs-col xs="6" sm="3" lg="3" offset="6"  class="mb-15">
                    <search-input ref="searchInput" @searchValue="searchValue"/>
                  </vs-col>
                </vs-row>
              </div>
                <template>
                    <transition name="slide-fade">
                        <PackingList :ref="'packingList'"   :node="node_request" :dateFilter="tempDate" :query="tempSearch"/>
                    </transition>
                </template>

            </div>
        </section>

    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import dateRange from "@/components/daterange/index"

import PackingList from "@/views/report/packinglist/packingList"



export default {
    name:"Packing-List",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "daterange-filter": dateRange,
        "PackingList": PackingList,
    },
    data() {
        return {
            title:"Packing List",
            tempSearch: "",
            tempDate: [],
            DataNode:[],
            node_request:'',
            node_origin:'',
            node_destination:''
        }
    },
    methods: {
        refresh(){
            this.$refs.packingList.refresh() // trigger function refresh form dari luar component list
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
            this.$router.push('/inbound/prealert/scan')
            this.setRoutePageHistory(this.$route.meta, false);
        },

      
        updateNode(val){

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
</style>