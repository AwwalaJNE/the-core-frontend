<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title + this.getNodeTypeLogin()}}</h2>
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
                    <template v-if="DataNode.length > 1">
                      <vs-select
                          class="m-select"
                          filter
                          :multiple="false"
                          autocomplete="off"
                          
                          v-model="node_request"
                          :border="true"
                          @change="updateNode"
                      >
                        <template v-if="DataNode.length > 1">
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
                  <vs-col xs="2" sm="2" lg="2">
                    <inputan :name="name" :rules="rules">
                      <template v-slot:inputan="props">
                        <vs-select
                            class="m-select"
                            filter
                            :multiple="listenIsMultiple"
                            :placeholder="name"
                            :label="name"
                            v-model="value"
                            :border="border"
                            @change="updateStatusInbound"
                            :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
                        >
                          <template v-if="DataArr.length > 0">
                            <vs-option
                                v-for="(item,key) in DataArr"
                                :key="key"
                                :label="item.label"
                                :value="item.value">
                              {{item.label}}
                            </vs-option>
                          </template>

                        </vs-select>
                      </template>
                    </inputan>
                  </vs-col>
                </vs-row>
              </div>
                <template>
                    <transition name="slide-fade">
                        <InboundIncoming :ref="'inboundIncoming'"   :nodeType="node_request" :received="value" :origin="node_origin" :destination="node_destination" :query="tempSearch"/>
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
import Inputan from "@/components/input/inputan"
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
        "inputan": Inputan
    },
    props: {
      name: String,
      rules: String,
      valueData: Array,
      selectedValue: [Array, String, Number],
      formKey: String,
      isMultiple: Boolean,
      border: Boolean
    },
    data() {
        return {
            title:"Receiving ",
            tempSearch: "",
            tempDate: [],
            DataNode:[
              {
                label: "All Nodes",
                value: ""
              }
            ],
            nodeOrigin:[],
            nodeDestination:[],
            node_request:'',
            node_origin:'',
            node_destination:'',
            DataArr: this.valueData ? this.valueData : [
              {
                label: 'All Status',
                value: '-'
              },
              {
                label: 'Complete',
                value: '1'
              },
              {
                label: 'Outstanding',
                value: '0'
              }
            ],
            value: this.selectedValue ? this.selectedValue :"-",
            arrValue: this.selectedValue ? this.selectedValue : [ {
              value: "-",
              label: "All Status"
            }],
        }
    },
    computed: {
      listenFormKey(){
        return this.formKey || ''
      },
      listenIsMultiple(){
        return this.isMultiple ? this.isMultiple : false
      }
    },
    watch: {
      valueData: function (val) {
        if (val != undefined) {
          this.DataArr = val
        }
      },
      selectedValue: function (val) {
        if (val != undefined) {
          if(this.isMultiple == false) {
            this.value = val
          } else {
            this.arrValue = val
          }
        }
      },
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
        getNodeTypeLogin(){
          return this.listenActiveUser.nodes[0].node_type ? this.listenActiveUser.nodes[0].node_type.node_type_name.toLowerCase() : '';
        },
        updateStatusInbound(val){
          this.$emit("updateStatusInbound", this.listenFormKey, val)
        }

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