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
                <vs-row justify="space-between">
                  <vs-col xs="12" sm="6" lg="6" style="padding: 0;">
                    <vs-row>
                      <vs-col xs="12" sm="6" lg="4">
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
                      <vs-col xs="12" sm="6" lg="6">
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
                    </vs-row>
                  </vs-col>
                  <vs-col xs="12" sm="6" lg="6" style="padding: 0;">
                    <vs-row justify="end">
                      <vs-col xs="12" sm="4" lg="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy" :valueData="searchParams" :selectedValue="searchBy" />
                      </vs-col>
                      <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" :isNumeric="searchByNumeric" />
                    </vs-row>
                  </vs-col>
                </vs-row>
                <vs-row justify>
                  <vs-col xs="6" sm="4" lg="2">
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
                  <vs-col xs="6" sm="4" lg="3">
                    <inputan :name="name" :rules="rules">
                      <template v-slot:inputan="props">
                        <vs-select
                            class="m-select"
                            filter
                            :placeholder="name"
                            :label="name"
                            v-model="values"
                            :border="border"
                            multiple
                            @change="updatePrealert"
                            :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
                        >
                          <template v-if="DataFilterPrealert.length > 0">
                            <vs-option
                                v-for="(item,key) in DataFilterPrealert"
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
                  <vs-col xs="12" sm="4" lg="2">
                    <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy" :valueData="dateParams" :selectedValue="filterDateBy" />
                  </vs-col>
                  <vs-col xs="12" sm="4" lg="3">
                     <date-time 
                        :name="''" 
                        :rules="''" 
                        :formKey="'DATE_TIME_WITHOUT_SECONDS'" 
                        :valueData="tempDate"
                        typeInput="datetimerange" 
                        @updateValue="searchDate" 
                    />
                  </vs-col>
                  <vs-col xs="12" sm="8" lg="2" style="display: flex; justify-content: end;">
                    <vs-button
                        border
                        style="margin: 0;"
                        @click="resetFilters"
                        :class="'span-button'"
                        > Reset Filters
                    </vs-button>
                  </vs-col>
                </vs-row>                
              </div>
                <template>
                    <transition name="slide-fade">
                        <InboundIncoming 
                          :ref="'inboundIncoming'"   
                          :nodeType="node_request" 
                          :received="value" 
                          :origin="node_origin" 
                          :query="tempSearch" 
                          :prealert="values" 
                          :hasLinkedItem="hasLinkedItems"
                          :filterDateBy="filterDateBy"
                          :dateFilter="tempDate"
                          :isReset="reset"
                          :searchBy="searchBy"
                        />
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
import Inputan from "@/components/input/inputan"
import InboundIncoming from "@/views/inbound/inboundList"
import DateTime from "@/components/input/dateTime"
import dateRange from "@/components/daterange/index"
import SelectSearchBy from "@/components/search/selectSearchBy";

export default {
    name:"Inbound-List",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "date-time": DateTime,
        "InboundIncoming": InboundIncoming,
        "inputan": Inputan,
        "select-search-by": SelectSearchBy,
    },
    props: {
      name: String,
      rules: String,
      valueData: Array,
      selectedValue: [Array, String, Number],
      formKey: String,
      isMultiple: Boolean,
      border: Boolean,
      hasLinkedItems: Array
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
            node_request:'',
            node_origin:'',
            DataArr: this.valueData ? this.valueData : [
              {
                label: 'All Status',
                value: '-'
              },
              {
                label: 'Info',
                value: 'INFO'
              },
              {
                label: 'Received',
                value: 'RECEIVED'
              },
              {
                label: 'Outstanding',
                value: 'OUTSTANDING'
              }
            ],
            values: this.selectedValue ? this.selectedValue :"-",
            DataFilterPrealert: this.valueData ? this.valueData : [
              {
                label: 'All Prealert',
                value: '-'
              },
              {
                label: 'SM',
                value: 'SM'
              },
              {
                label: 'SJ',
                value: 'SJ'
              },
              {
                label: 'BAG',
                value: 'BAG'
              },
              {
                label: 'Receving Orion',
                value: 'RECEIVING ORION'
              }
            ],
            value: this.selectedValue ? this.selectedValue :"-",
            arrValue: this.selectedValue ? this.selectedValue : [ {
              value: "-",
              label: "All Status"
            }],
            filterDateBy:"received",
            searchBy:"inbound_number",
            searchByNumeric: false,
            searchPlaceholder: "Search Inbound Number",
            searchParams: [
              {
                label: "Inbound Number",
                value: "inbound_number",
              },
              {
                label: "IM Numbers",
                value: "manifestItems",
              },
              {
                label: "Vehicle",
                value: "vehicle_type_name",
              },
              {
                label: "Origin",
                value: "inbound_node_name_origin",

              },
              {
                label: "Type Inbound",
                value: "inbound_type",

              },
              {
                label: "Quantity Bag",
                value: "inbound_total_bag",
                isNumeric: true,

              },
              {
                label: "Quantity Koli",
                value: "inbound_total_koli",
                isNumeric: true,
              },
              {
                label: "Weight",
                value: "inbound_total_weight",
                isNumeric: true,
              },
              {
                label: "PIC",
                value: "carrier_employee_name",
              },
              {
                label: "Received At",
                value: "inbound_node_name_receiver",
              }
            ],
            dateParams: [
              {
                label: 'Received Time',
                value: 'received'
              },
              {
                label: 'ETD',
                value: 'etd'
              },
              {
                label: 'ETA',
                value: 'eta'
              },
              {
                label: 'Departed Time',
                value: 'departed'
              },
              {
                label: 'Create Date',
                value: 'created'
              }
            ],
            reset: false,
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
      searchByNumeric: function(val, old) {
        if (val !== old) {
          this.clearSearch()
        }
      }
    },
    methods: {
        refresh(){
            this.$refs.inboundIncoming.refresh() // trigger function refresh form dari luar component list
        },
        searchValue (val) {
            this.tempSearch = val
        },
        searchDate(formKey, val) {
            this.tempDate = val;
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        clearDate() {
            this.tempDate = [];
        },
        openDialog(){
            this.$router.push('/inbound/prealert/scan')
            this.setRoutePageHistory(this.$route.meta, false);
        },
        updateFilterDateBy(key,val) {
          this.filterDateBy = val;
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
                this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate node list', err)
              })
        },
        async getDataOrigin() {
          this.loading = true
          await axios
              .get(this.URL.node +
                  `/${this.listenNodeId}/origin-link?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&case=receiving_menu&s=`,
                  this.Helper.header())
              .then(res => {
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
                this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate node list', err)
              })
        },
        updateNode(val){

        },
        getNodeTypeLogin(){
          return this.listenActiveUser.nodes[0].node_type ? this.listenActiveUser.nodes[0].node_type.node_type_name.toLowerCase() : '';
        },
        updateStatusInbound(val){
          this.$emit("updateStatusInbound", this.listenFormKey, val)
        },
        updatePrealert(val){
          const indexOfBag = val.indexOf('bag');
          if (indexOfBag !== -1) {
            this.hasLinkedItems = [];
          } else if (indexOfBag === -1) {
            this.hasLinkedItems = ['inbound_number'];
          } 
          
        },
      updateSearchBy(key, val, isNumeric) {
        val = val.replaceAll(" ", "_");
        this.searchBy = val;
        this.searchPlaceholder = key;
        this.searchByNumeric = isNumeric;
      },
      updateFilterDateBy(key,val) {
        this.filterDateBy = val;
      },
      resetFilters() {
        this.reset = true
        this.searchBy = "inbound_number"
        this.searchPlaceholder = "Search Inbound Number"
        this.clearSearch()
        this.filterDateBy = "received"
        this.clearDate()
        this.node_request = ""
        this.node_origin = ""
        this.value = "-"
        this.values = "-"
        this.$nextTick(() => {
          this.reset = false
        });
      },
    },

    mounted() {
        this.getDataNodeType()
        this.getDataOrigin()
    }
}
</script>
<style scoped>
  .span-button.vs-button--border:before, .span-button.vs-button--border:hover:before {
    border: 0;
  }
  .span-button:hover {
    text-decoration: underline;
  }
  .span-button:focus {
    background: transparent;
    color: rgb(25, 91, 255);
  }
</style>
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