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
                        > RECEIVING
                        </vs-button>
                    </div>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
              <div class="nav-box">
                <vs-row justify>
                  <vs-col xs="2" sm="2" lg="2">
                    <template v-if="DataNode.length > 0">
                      <vs-select
                          class="m-select"
                          filter
                          :multiple="false"
                          autocomplete="off"
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
                  </vs-col>
                  <vs-col xs="3" sm="3" lg="3">
                    <template v-if="nodeOrigin.length > 0">
                      <vs-select
                          class="m-select"
                          filter
                          :multiple="false"
                          placeholder="Origin"
                          v-model="node_origin"
                          :border="false"
                          @change="updateNode"
                      >
                        <template v-if="nodeOrigin.length > 0">
                          <vs-option
                              v-for="(item,key) in nodeOrigin"
                              :key="key"
                              :label="item.label"
                              :value="item.value">
                            {{item.label}}
                          </vs-option>
                        </template>

                      </vs-select>

                    </template>
                  </vs-col>
                  <vs-col xs="3" sm="3" lg="3">
                    <template v-if="nodeDestination.length > 0">
                      <vs-select
                          class="m-select"
                          filter
                          placeholder="Destination"
                          v-model="node_destination"
                          :border="false"
                      >
                        <template v-if="nodeDestination.length > 0">
                          <vs-option
                              v-for="(items,keydes) in nodeDestination"
                              :key="keydes"
                              :label="items.label"
                              :value="items.value">
                            {{items.label}}
                          </vs-option>
                        </template>

                      </vs-select>

                    </template>
                  </vs-col>
                  <vs-col xs="6" sm="3" lg="3" offset="1"  class="mb-15">
                    <search-input ref="searchInput" @searchValue="searchValue"/>
                  </vs-col>
                </vs-row>
              </div>
                <template>
                    <transition name="slide-fade">
                        <InboundIncoming :ref="'inboundIncoming'"   :nodeType="node_request" :origin="node_origin" :destination="node_destination" :query="tempSearch"/>
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

import InboundIncoming from "@/views/inbound/inboundList"



export default {
    name:"Inbound-List",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "daterange-filter": dateRange,
        "InboundIncoming": InboundIncoming,
    },
    data() {
        return {
            title:"Inbound Incoming",
            tempSearch: "",
            tempDate: [],
            DataNode:[],
            nodeOrigin:[],
            nodeDestination:[],
            node_request:'',
            node_origin:'',
            node_destination:''
        }
    },
    methods: {
        refresh(){
            this.$refs.inboundIncoming.refresh() // trigger function refresh form dari luar component list
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
        },

        async getDataNodeType() {
          this.loading = true
          await axios
              .get(this.URL.node_type +
                  `?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
                  this.Helper.header())
              .then(res => {
                console.log('link', res)
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
        async getDataOrigin() {
          this.loading = true
          await axios
              .get(this.URL.node +
                  `/${this.listenNodeId}/origin-link?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
                  this.Helper.header())
              .then(res => {
                console.log('link', res)
                if(res.data.data.length > 0) {
                  res.data.data.map(item => {
                    let obj = {}
                    obj["label"] = item.node_name
                    obj["value"] = item.node_id

                    this.nodeOrigin.push(obj)
                  })
                }

                this.loading = false
              }).catch(err => {
                this.loading = false
                this.openNotification('danger', 'Failed to populate node list', err)
              })
        },
        async getDataDestination() {
          this.loading = true
          await axios
              .get(this.URL.node +
                  `/${this.listenNodeId}/destination-link?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
                  this.Helper.header())
              .then(res => {
                console.log('link', res)
                if(res.data.data.length > 0) {
                  res.data.data.map(item => {
                    let obj = {}
                    obj["label"] = item.node_name
                    obj["value"] = Number(item.node_id)

                    this.nodeDestination.push(obj)
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
        this.getDataNodeType()
        this.getDataOrigin()
        this.getDataDestination()
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