<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="6" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
        </vs-row>

        <section>
            <vs-row justify="center">
                <vs-col w="12">
                    <div class="box information" style="padding-top: 1px !important;">
                        <h4 align="left">SM Information</h4>
                        <div class="nav-box">
                            <template>
                                <transition name="slide-fade">
                                    <template v-if="loading == false">
                                        <InboundInformation
                                            :ref="'inboundInformation'" 
                                            :dataTableProp="dataTable" 
                                            :loading="loading"
                                        />
                                    </template>
                                </transition>
                            </template>
                        </div>
                    </div>
                    <div class="box information" style="padding-top: 1px !important;margin-top: 10px !important;">
                        <h4 align="left">Inbound Detail</h4>
                        <div class="nav-box">
                            <template>
                                <transition name="slide-fade">
                                    <template v-if="loading == false">
                                        <InboundDetail 
                                            :ref="'inboundDetail'" 
                                            :dataTableProp="dataTableDetail" 
                                            :loading="loading"
                                        />
                                    </template>
                                </transition>
                            </template>
                        </div>
                    </div>
                </vs-col>
            </vs-row>
            <vs-button class="mt-1" style="float: right"
                square
                active
                @click="back"
            >
                <i class="bx bxs-chevron-left"> </i>  BACK
            </vs-button>

        </section>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"

import InboundInformation from "@/views/inboundAirport/prealert/detail/inboundInformation"
import InboundDetail from "@/views/inboundAirport/prealert/detail/inboundDetail"

export default {
    name:"pickup-request",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "InboundInformation": InboundInformation,
        "InboundDetail": InboundDetail,
    },
    data() {
        return {
            title:"Inbound Detail",
            item_no:'',
            form:{},
            inbound_number:'',
            loading: false,
            dataTable: [],
            dataTableDetail: [],
            inboundDetailData : []
        }
    },
    methods: {
        refresh(){
          this.getTableData();
        },
        getParamRoute(){
            if(this.$route.params.inbound_number){
                this.inbound_number = this.$route.params.inbound_number.toString()
                this.tempSearch = this.inbound_number.toString()
                this.refresh()
            }
        },
        async getTableData() {
            this.loading = true
            this.dataTable = []
            await axios
                .get(this.URL.inbound + `/${this.inbound_number}/inbound-status?n=${this.listenNodeId}`, this.Helper.header())
                .then(res => {
                    let data=[res.data.data]
                    data.map(item=>{
                        item['total_received'] = item.total_received.toString()
                        item['total_unreceived'] = item.total_unreceived.toString()
                    })
                    let detail = res.data.detail
                    detail.map(item=>{
                        if (item.is_masterbag === '1') {
                            item.item_type = 'MASTERBAG';
                        } else {
                            item.item_type = 'BAG';
                        }
                    })
                    this.dataTable = data

                    this.dataTableDetail = res.data.detail;

                    this.loading = false
                }).catch(err => {
                  this.loading = false
                  // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate Inbound list', err)
                })
            this.$ls.remove('id_inbound');
        },
        back(){
            this.$router.push('/inbound-airport')
            this.setRoutePageHistory(this.$route.meta, false);
        },
    },
    mounted() {
        this.getParamRoute()
    }
}
</script>