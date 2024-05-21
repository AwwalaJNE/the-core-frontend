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
                  <vs-col xs="12" sm="12" lg="6" class="mb-15">
                    <vs-row>
                      <vs-col w="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy" :valueData="dateParams" :selectedValue="filterDateBy" />
                      </vs-col>
                      <vs-col w="8">
                        <daterange-filter @searchDate="searchDate" size="small" />
                      </vs-col>
                    </vs-row>
                  </vs-col>
                  <vs-col xs="12" sm="12" lg="6" class="mb-15">
                    <vs-row justify="end">
                      <vs-col xs="6" sm="8" lg="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy" :valueData="searchParams" :selectedValue="searchBy" />
                      </vs-col>
                      <vs-col xs="6" sm="4" lg="4">
                        <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" />
                      </vs-col>
                    </vs-row>
                  </vs-col>
                </vs-row>
              </div>
                <template>
                    <transition name="slide-fade">
                        <PickupSchedule :ref="'PickupScheduleTable'"   :node="node_request" :dateFilter="tempDate" :query="tempSearch" :searchBy="searchBy" :filterDateBy="filterDateBy"/>
                    </transition>
                </template>
            </div>
        </section>


        <!--Create pickup schedule-->
        <dialogCreateEditPickupSchedule

            :active="dialogPickupList"
            @refresh="refresh"
            :withSchedule="true"
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

import PickupSchedule from "@/views/pickup/schedule/pickupSchedule"

import DialogCreateEditPickupSchedule from "@/views/pickup/schedule/dialogCreateEditPickupSchedule"



export default {
    name:"pickup-Schedule",
    mixins:[master],
    components: {
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "daterange-filter": dateRange,
        "dialogCreateEditPickupSchedule": DialogCreateEditPickupSchedule,
        "PickupSchedule": PickupSchedule,
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            title:"Pickup Schedule",
            tempSearch: "",
            tempDate: [],
            dialogPickupList:false,
            DataNode:[],
            DataStatus:[{
              'label':'Confirm',
              'value':'Confirm'
            }],
            node_request:'',
            status_pickup:'',
            searchBy: "pickup schedule name",
            filterDateBy: "create",
            searchPlaceholder: "Search Pickup Schedule",
            searchParams: [
              {
                label: 'Pickup Schedule Name',
                value: 'pickup schedule name'
              },
              {
                label: "Destination",
                value: "destination",
              },
              {
                label: "Courier name",
                value: "userCourier",
              },
              {
                label: "Remark",
                value: "remarks",
              },
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
            this.$refs.PickupScheduleTable.refresh() // trigger function refresh form dari luar component list
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
        async getTableData() {
          this.loading = true
          await axios
              .get(this.URL.node +
                  `?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
                  this.Helper.header())
              .then(res => {
                console.log('link', res)
                if(res.data.data.length > 0) {
                  res.data.data.map(item => {
                    let obj = {}
                    obj["label"] = item.node_code
                    obj["value"] = item.node_code

                    this.DataNode.push(obj)
                  })
                }

                this.loading = false
              }).catch(err => {
                this.loading = false
                this.openNotification('danger', 'Failed to populate node list', err)
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
    },
  mounted() {
      this.getTableData()
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