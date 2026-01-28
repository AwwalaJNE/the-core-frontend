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
                  <vs-col xs="12" sm="12" lg="6" >
                    <vs-row>
                      <vs-col w="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy"
                          :valueData="dateParams" :selectedValue="filterDateBy" />
                      </vs-col>
                      <vs-col w="8">
                        <!-- <daterange-filter @searchDate="searchDate" size="small" /> -->
                        <date-time 
                              :name="''" 
                              :rules="''" 
                              :formKey="'DATE_TIME_WITHOUT_SECONDS'" 
                              :valueData="tempDate"
                              typeInput="datetimerange" 
                              @updateValue="updateValue" 
                          />
                      </vs-col>
                    </vs-row>
                  </vs-col>
                  <vs-col xs="12" sm="12" lg="6">
                    <vs-row justify="end">
                      <vs-col xs="6" sm="8" lg="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"
                          :valueData="searchParams" :selectedValue="searchBy" />
                      </vs-col>
                      <vs-col xs="6" sm="4" lg="4">
                        <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" />
                      </vs-col>
                    </vs-row>
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
                  <vs-col xs="12" sm="12" lg="6">
                    <vs-row>
                      <vs-col xs="6" sm="4" lg="4">
                        <template v-if="DataStatus.length > 0">
                          <vs-select class="m-select" filter :multiple="false" placeholder="All Status"
                            v-model="status_pickup" :border="true" @change="updateNode">
                            <template>
                              <vs-option v-for="(item, key) in DataStatus" :key="key" :label="item.label" :value="item.value">
                                {{ item.label }}
                              </vs-option>
                            </template>

                          </vs-select>

                        </template>
                      </vs-col>
                      <vs-col xs="6" sm="4" lg="4">
                        <template v-if="DataCourier.length > 0">
                          <vs-select class="m-select" filter :multiple="false" placeholder="All Courier"
                            v-model="courier_pickup" :border="true" @change="updateNode">
                            <template>
                              <vs-option v-for="(item, key) in DataCourier" :key="key" :label="item.label" :value="item.value">
                                {{ item.label }}
                              </vs-option>
                            </template>
                          </vs-select>
                        </template>
                      </vs-col>
                    </vs-row>
                  </vs-col>
                </vs-row>
              </div>
                <template>
                    
                        <PickupList :ref="'transactionList'" :status_pickup="status_pickup" :courier_pickup="courier_pickup" :node="node_request" :dateFilter="tempDate" :query="tempSearch" :searchBy="searchBy" :filterDateBy="filterDateBy"/>
                    
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
import SelectSearchBy from "@/components/search/selectSearchBy";
import DateTime from '../../../components/input/dateTime.vue';

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
        "select-search-by": SelectSearchBy,
        "date-time": DateTime,  
    },
    data() {
        return {
            title:"Pickup List",
            tempSearch: "",
            tempDate: [],
            dialogPickupList:false,
            // DataNode:[],
            DataStatus:[],
            DataCourier:[],
            node_request:'',
            status_pickup:'',
            courier_pickup:'',
            searchBy: "pickup number",
            filterDateBy: "request_date",
            searchPlaceholder: "Search Pickup Number",
            searchParams: [
              {
                label: 'Pickup Number',
                value: 'pickup number'
              },
              {
                label: 'Pickup Name',
                value: 'pickup_name'
              },
              {
                label: "Courier",
                value: "user_name",
              },
              {
                label: "Pickup Status",
                value: "pickup_status",
              },
            ],
            dateParams: [
              {
                label: 'Request Date Pickup',
                value: 'request_date'
              },
              {
                label: "Picked Time",
                value: "picked_date",
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
        //         this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate node list', err)
        //       })
        // },
        async getPickupStatus() {
          this.loading = true
          await axios
              .get(this.URL.status +
                  `?status_type=pickup&n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1&s=`,
                  this.Helper.header())
              .then(res => {

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
                this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate node list', err)
              })
        },
        async getDataCourier(){
            this.loading = true
            await axios
                .get(this.URL.pickup_courier +`?n=${this.listenNodeId}`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.user_login + ' - ' + item.user_name + ' - ' + item.user_id;
                            obj["value"] = item.user_id


                            this.DataCourier.push(obj)
                        })
                        this.$store.dispatch("SET_PICKUP_LIST_PICKUP_COURIER_USER_ID_ArrData", arr.length > 0 ? arr : null)
                    }

                }).catch(err => {
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                })
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
        },
        updateValue(key, val) {
            switch(key) {
                case "DATE_TIME_WITHOUT_SECONDS":
                    this.tempDate = val
                    break;
            }
        },
    },
  mounted() {
      // this.getTableData()
      this.getPickupStatus()
      this.getDataCourier()
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