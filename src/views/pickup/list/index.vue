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
                        square
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
                  <vs-col xs="3" sm="3" lg="3" >
                    <daterange-filter @searchDate="searchDate"/>
                  </vs-col>
                  <!-- <vs-col xs="2" sm="2" lg="2">
                    <template v-if="DataNode.length > 0">
                      <vs-select
                          class="m-select"
                          filter
                          :multiple="false"
                          placeholder="All Nodes"
                          v-model="node_request"
                          :border="true"
                          @change="updateNode"
                      >
                        <template v-if="DataNode.length > 0">
                          <vs-option
                              v-for="(item,key) in DataNode"
                              :key="key"
                              :label="item.label"
                              :value="item.value">
                            {{item.label}}
                          </vs-option>
                        </template>

                      </vs-select>

                    </template>
                  </vs-col> -->
                  <vs-col xs="2" sm="2" lg="2" >
                    <template v-if="DataStatus.length > 0">
                      <vs-select
                          class="m-select"
                          filter
                          :multiple="false"
                          placeholder="All Status"
                          v-model="status_pickup"
                          :border="true"
                          @change="updateNode"
                      >
                        <template v-if="DataStatus.length > 0">
                          <vs-option
                              v-for="(item,key) in DataStatus"
                              :key="key"
                              :label="item.label"
                              :value="item.value">
                            {{item.label}}
                          </vs-option>
                        </template>

                      </vs-select>

                    </template>
                  </vs-col>
                  <vs-col offset="2" xs="6" sm="4" lg="4" class="mb-15" align="right">
                    <search-input ref="searchInput" @searchValue="searchValue"/>
                  </vs-col>
                </vs-row>
              </div>
                <template>
                    <transition name="slide-fade">
                        <PickupList :ref="'transactionList'"  :status_pickup="status_pickup" :node="node_request" :dateFilter="tempDate" :query="tempSearch"/>
                    </transition>
                </template>
            </div>
        </section>

        <!--Create pickup List-->
        <dialogCreatePickupList
            :active="dialogPickupList"
            @refresh="refresh"
            :closeDialog="closeDialogPickupList"
            title="Create Pickup List"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import dateRange from "@/components/daterange/index"

import PickupList from "@/views/pickup/list/pickupList"

import DialogCreatePickupList from "@/views/pickup/list/dialogCreateEditPickupList"


export default {
    name:"pickup-List",
    mixins:[master],
    components: {
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "daterange-filter": dateRange,
        "PickupList": PickupList,
        "dialogCreatePickupList": DialogCreatePickupList,
    },
    data() {
        return {
            title:"Pickup List",
            tempSearch: "",
            tempDate: [],
            dialogPickupList:false,
            // DataNode:[],
            DataStatus:[],
            node_request:'',
            status_pickup:'',
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
        closeDialogPickupList() {
          this.dialogPickupList = false
        },
        openDialog(){
            this.dialogPickupList = true
        },
        updateNode(val){

        },
        // async getTableData() {
        //   this.loading = true
        //   await axios
        //       .get(this.URL.node +
        //           `?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
        //           this.Helper.header())
        //       .then(res => {
        //         console.log('link', res.data.data)
        //         if(res.data.data.length > 0) {
        //           res.data.data.map(item => {
        //             let obj = {}
        //             obj["label"] = item.node_code
        //             obj["value"] = item.node_code

        //             this.DataNode.push(obj)
        //           })
        //         }

        //         this.loading = false
        //       }).catch(err => {
        //         this.loading = false
        //         this.openNotification('danger', 'Failed to populate node list', err)
        //       })
        // },
        async getPickupStatus() {
          this.loading = true
          await axios
              .get(this.URL.status +
                  `?status_type=pickup&n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
                  this.Helper.header())
              .then(res => {
                console.log('status', res)
                if(res.data.data.length > 0) {
                  res.data.data.map(item => {
                    let obj = {}
                    obj["label"] = item.status_code +' - '+ item.status_subtype
                    obj["value"] = item.status_subtype

                    this.DataStatus.push(obj)
                  })
                }

                this.loading = false
              }).catch(err => {
                this.loading = false
                this.openNotification('danger', 'Failed to populate node list', err)
              })
        },
    },
  mounted() {
      // this.getTableData()
      this.getPickupStatus()
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
  .m-select.vs-select-content{
    margin-top: 0px;
  }
</style>