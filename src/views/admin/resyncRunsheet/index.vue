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

        <section class="nodes">
            <div class="box view">
              <div class="nav-box">
                <vs-row justify>
                  <vs-col xs="2" sm="2" lg="2">
                    <vs-input
                      v-model="tempDate"
                      type="date"
                    >

                    </vs-input>
                  </vs-col>
                  <vs-col xs="6" sm="3" lg="3" offset="7"  class="mb-15">
                    <search-input ref="searchInput" @searchValue="searchValue" placeholder="Search Name"/>
                  </vs-col>
                </vs-row>
              </div>
                <template>
                    <transition name="slide-fade">
                        <DeliveryRunsheetTable :ref="'DeliveryRunsheetTable'"   :node="node_request" :dateFilter="tempDate" :query="tempSearch"/>
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
import moment from "moment";

import DeliveryRunsheetTable from "@/views/admin/resyncRunsheet/ResyncRunsheetTable"



export default {
    name:"Resync-Runsheet",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "daterange-filter": dateRange,
        "DeliveryRunsheetTable": DeliveryRunsheetTable,
    },
    data() {
        return {
            title:"Resync Runsheet",
            tempSearch: "",
            tempDate: moment().format('YYYY-MM-DD'),
            DataNode:[],
            node_request:'',
            node_origin:'',
            node_destination:''
        }
    },
    methods: {
        refresh(){
            this.$refs.DeliveryRunsheetTable.refresh() // trigger function refresh form dari luar component list
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
        async getDataNodeType() {
          this.loading = true
          await axios
              .get(this.URL.node_type +
                  `?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
                  this.Helper.header())
              .then(res => {

                if(res.data.data.length > 0) {
                  res.data.data.map(item => {
                    let obj = {}
                    obj["label"] = item.node_type_name
                    obj["value"] = item.node_type_id

                    this.DataNode.push(obj)
                  })
                }

                this.loading = false
              }).catch(err => {
                this.loading = false
                this.openNotification('danger', 'Failed to populate node list', err)
              })
        },
        updateNode(val){

        },

    },
    mounted() {
        // this.getDataNodeType()
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
