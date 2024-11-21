<template>
    <div>
        <section class="nodes">
            <vs-row v-if="!isMobile" justify="space-between">
                <vs-col xs="12" sm="4" lg="2">
                    <div class="select-receiving-bandara">
                        <selector 
                            ref="status"
                            formKey="status"
                            placeholder="Select Status"
                            :name="''" 
                            :valueData="statusArr"
                            :selectedValue="status"
                            :isMultiple="false"
                            @updateValue="updateValue" 
                        />
                    </div>
                </vs-col>
                <vs-col xs="12" sm="4" lg="2">
                    <div v-if="originArr.length > 0" class="select-receiving-bandara">
                        <selector 
                            ref="origin"
                            formKey="origin"
                            placeholder="Select Origin"
                            :name="''" 
                            :valueData="originArr"
                            :selectedValue="origin"
                            :isMultiple="false"
                            @updateValue="updateValue" 
                        />
                    </div>
                </vs-col>
                <vs-col xs="12" sm="4" lg="2">
                    <div v-if="destinationArr.length > 0" class="select-receiving-bandara">
                        <selector 
                            ref="destination"
                            formKey="destination"
                            placeholder="Select Destination"
                            :name="''" 
                            :valueData="destinationArr"
                            :selectedValue="destination"
                            :isMultiple="false"
                            @updateValue="updateValue" 
                        />
                    </div>
                </vs-col>
                <vs-col xs="12" sm="4" lg="2">
                    <select-search-by 
                        :border="true" 
                        :isMultiple="false" 
                        :selectedValue="filterDateBy" 
                        :valueData="dateParams" 
                        @updateSearchBy="updateFilterDateBy" 
                    />
                </vs-col>
                <vs-col xs="12" sm="4" lg="4">
                    <daterange-filter 
                        size="small" 
                        @searchDate="searchDate" 
                    />
                </vs-col>
            </vs-row>
            <template>
                <transition name="slide-fade">
                    <InboundIncoming 
                        :ref="'inboundIncoming'"   
                        :nodeType="node_request" 
                        :received="status" 
                        :origin="origin" 
                        :destination="destination" 
                        :query="query" 
                        :prealert="'-'" 
                        :hasLinkedItem="hasLinkedItems"
                        :filterDateBy="filterDateBy"
                        :dateFilter="tempDate"
                        :searchBy="searchBy"
                    />
                </transition>
            </template>
        </section>
    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";

import Breadcrumb from "@/components/breadcrumb/index"
import dateRange from "@/components/daterange/index"
import NavItem from "@/components/navbar/navTab"
import Selector from "@/components/input/select"
import SelectSearchBy from "@/components/search/selectSearchBy";

import InboundIncoming from "@/views/inboundAirport/prealert/inboundList"

export default {
    name:"Inbound-List",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "daterange-filter": dateRange,
        "InboundIncoming": InboundIncoming,
        "select-search-by": SelectSearchBy,
        "selector": Selector,
    },
    props: {
        border: Boolean,
        hasLinkedItems: Array,
        query: String,
        searchBy: String
    },
    data() {
        return {
            node_request:'',
            status: "-",
            statusArr: [
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
            origin:'',
            originArr:[],
            destination:'',
            destinationArr:[],
            filterDateBy:"received",
            tempDate: [],
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
        }
    },
    methods: {
        updateValue(key, val, info){
            switch(key) {
                case "status":
                    this.status = this.statusArr.find(item => item.value == val)?.value || '';
                    break;
                case "origin":
                    this.origin = this.originArr.find(item => item.value == val)?.value || '';
                    break;
                case "destination":
                    this.destination = this.destinationArr.find(item => item.value == val)?.value || '';
                    break;
            }
        },
        updateFilterDateBy(key,val) {
            this.filterDateBy = val;
        },
        searchDate (val) {
            this.tempDate = val
        },
        async getDataOrigin() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.node}/${this.listenNodeId}/origin-link?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&case=receiving_menu&s=`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = [];
                    res.data.data.map(item => {
                        let obj = {}
                        obj["label"] = item.node_name
                        obj["value"] = item.node_id

                        arr.push(obj)
                    })

                    this.originArr = arr;
                } else {
                    this.originArr = [];
                }
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false
            }
        },
        async getDataDestination() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.node}/${this.listenNodeId}/destination-link?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&case=receiving_menu&s=`, this.Helper.header());

                if (res.data.data.length > 0) {
                    let arr = [];
                    res.data.data.map(item => {
                        let obj = {}
                        obj["label"] = item.node_name
                        obj["value"] = item.node_id

                        arr.push(obj)
                    })

                    this.destinationArr = arr;
                } else {
                    this.destinationArr = [];
                }
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false
            }
        },
    },
    mounted() {
        this.getDataOrigin()
        this.getDataDestination()
    }
}
</script>
<style scoped>
.select-receiving-bandara {
    margin-top: -10px !important;
}
</style>

