<template>
    <div>
        <section class="nodes">
                <vs-row justify="space-between">
                  <vs-col w="12" style="padding: 0">
                    <vs-row>
                      <vs-col xs="12" sm="4" lg="2">
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
                      <vs-col xs="12" sm="4" lg="2">
                        <template v-if="nodeOrigin.length > 0">
                          <vs-select
                              class="m-select"
                              filter
                              :multiple="false"
                              placeholder="Origin"
                              v-model="node_origin"
                              :border="false"
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
                      <vs-col xs="12" sm="4" lg="2">
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
                      <vs-col xs="12" sm="4" lg="2">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy" :valueData="dateParams" :selectedValue="filterDateBy" />
                      </vs-col>
                      <vs-col xs="12" sm="4" lg="4">
                        <daterange-filter @searchDate="searchDate" size="small" />
                      </vs-col>
                    </vs-row>
                  </vs-col>
                </vs-row>
                <template>
                    <transition name="slide-fade">
                        <InboundIncoming 
                          :ref="'inboundIncoming'"   
                          :nodeType="node_request" 
                          :received="value" 
                          :origin="node_origin" 
                          :destination="node_destination" 
                          :query="query" 
                          :prealert="values" 
                          :hasLinkedItem="hasLinkedItems"
                          :filterDateBy="filterDateBy"
                          :dateFilter="tempDate"
                          :searchBy="searchBy"
                        />
                    </transition>
                </template>
        <dialogCreateSuratJalan
          :active="dialogSuratJalan"
          @refresh="refresh"
          @redirectSJ="redirectSJ"
          :closeDialog="closeDialogSuratJalan"
          title="Transport Surat Jalan"
          btnBlue="Approve"
        />
        </section>
    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import Inputan from "@/components/input/inputan"
import InboundIncoming from "@/views/inboundAirport/prealert/inboundList"
import DialogCreateSuratJalan from "@/views/inboundAirport/suratJalan/dialogCreateSuratJalan";

import dateRange from "@/components/daterange/index"
import SelectSearchBy from "@/components/search/selectSearchBy";

export default {
    name:"Inbound-List",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "daterange-filter": dateRange,
        "InboundIncoming": InboundIncoming,
        "inputan": Inputan,
        "select-search-by": SelectSearchBy,
        "dialogCreateSuratJalan": DialogCreateSuratJalan
    },
    props: {
      name: String,
      rules: String,
      valueData: Array,
      selectedValue: [Array, String, Number],
      formKey: String,
      isMultiple: Boolean,
      border: Boolean,
      hasLinkedItems: Array,
      query: String,
      searchBy: String
    },
    data() {
        return {
            tempDate: [],
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
            value: this.selectedValue ? this.selectedValue :"-",
            arrValue: this.selectedValue ? this.selectedValue : [ {
              value: "-",
              label: "All Status"
            }],
            filterDateBy:"received",
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
              }
            ],
            dialogSuratJalan: false
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
        redirectSJ(val) {
          this.$emit("redirectSJ", val)
        },
        searchDate (val) {
          this.tempDate = val
        },

        closeDialogSuratJalan() {
          this.dialogSuratJalan = false;
        },

        updateFilterDateBy(key,val) {
          this.filterDateBy = val;
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
                this.openNotification('danger', 'Failed to populate node list', err)
              })
        },
        async getDataDestination() {
          this.loading = true
          await axios
              .get(this.URL.node +
                  `/${this.listenNodeId}/destination-link?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&case=receiving_menu&s=`,
                  this.Helper.header())
              .then(res => {
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
        getNodeTypeLogin(){
          return this.listenActiveUser.nodes[0].node_type ? this.listenActiveUser.nodes[0].node_type.node_type_name.toLowerCase() : '';
        },
        updateStatusInbound(val){
          this.$emit("updateStatusInbound", this.listenFormKey, val)
        },
        updateFilterDateBy(key,val) {
          this.filterDateBy = val;
        },
    },

    mounted() {
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