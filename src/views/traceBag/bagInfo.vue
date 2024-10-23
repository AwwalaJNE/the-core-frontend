<template>
    <div>
        <vs-row justify="space-between" align="center">
            <vs-col xs="12" sm="3" lg="3" align="left">
                <h3>Bag No. {{ bag_number }}</h3>
            </vs-col>
            <vs-col xs="12" sm="3" lg="3" align="right">
                <span><h1>{{ bag_detail_qty }}</h1></span><p>Bagged</p>
            </vs-col>
        </vs-row>

        <vs-row justify="space-between" class="info-rows">
            <vs-col xs="12" sm="6" lg="8">
                <div class="box view">
                    <h3 class="info-sub-title">Main Info</h3>
                    <vs-row 
                        v-for="(info, index) in mainInfo" 
                        :key="index" 
                        class="info-row"
                        align="center"
                        justify="space-between"
                    >
                        <vs-col xs="12" sm="8" lg="4" class="info-label">
                            <h4>{{ info.label }}</h4>
                        </vs-col>
                        <vs-col xs="12" sm="4" lg="8" class="info-value">
                            <p>{{ bag_main_info[info.value] || '-' }}</p>
                        </vs-col>
                    </vs-row>
                </div>
            </vs-col>
            <vs-col xs="12" sm="6" lg="4">
                <div class="box view">
                    <h3 class="info-sub-title">Additional Info</h3>
                    <vs-row 
                        v-for="(info, index) in additionalInfo" 
                        :key="index" 
                        class="info-row"
                        align="center"
                        justify="space-between"
                    >
                        <vs-col xs="12" sm="8" lg="4" class="info-label">
                            <h4>{{ info.label }}</h4>
                        </vs-col>
                        <vs-col xs="12" sm="4" lg="8" class="info-value">
                            <template v-if="info.type === 'status'">
                                <vs-button
                                    circle
                                    icon
                                    border
                                    :disabled="!bag_additional_info[info.value]"
                                    :danger="!bag_additional_info[info.value]"
                                >
                                    <i :class="`bx bx-${bag_additional_info[info.value] ? 'check' : 'x'}`"></i>
                                </vs-button>
                            </template>
                            <template v-else>
                                <p>{{ bag_additional_info[info.value] || '-' }}</p>
                            </template>
                        </vs-col>
                    </vs-row>
                </div>
            </vs-col>
        </vs-row>

        <vs-row justify="center">
            <vs-col xs="12" class="table-col">
                <table-master
                    :dataTable="dataTable"
                    :dataColumn="datacolumn"
                    :tableLoading="loading"
                    :hasAction="false"
                    :hasPagination="false"
                />
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
import master from "@/mixins/master";
import TableMaster from "@/components/table/tableMaster";
import axios from 'axios';

export default {
    name: "bag-info",
    mixins: [master],
    components: {
        TableMaster,
    },
    props: {
        bagNumber: String
    },
    data() {
        return {
            bag_number: this.bagNumber,
            bag_detail_qty: '',
            bag_main_info: {},
            bag_additional_info: {},
            current_node_id: '',
            current_node_name: '',
            data: this.dataItem || {},
            loading: false,
            mainInfo: [
                { 
                    label: 'Current Location', 
                    value: 'current_location' 
                },
                { 
                    label: 'Destination', 
                    value: 'destination' 
                },
                { 
                    label: 'Routing', 
                    value: 'routing' 
                },
                { 
                    label: 'Service', 
                    value: 'service' 
                },
                { 
                    label: 'Weight', 
                    value: 'bag_weight' 
                }
            ],
            additionalInfo: [
                { 
                    label: 'Created At', 
                    value: 'created_at' 
                },
                {
                    label: 'Bag Type',
                    value: 'bag_type'
                },
                { 
                    label: 'Is Masterbag', 
                    value: 'is_masterbag', 
                    type: 'status' 
                },
                { 
                    label: 'Is Approve', 
                    value: 'is_approve', 
                    type: 'status' 
                },
                { 
                    label: 'Surat Muatan', 
                    value: 'surat_muatan' 
                },
                { 
                    label: 'Surat Jalan', 
                    value: 'surat_jalan' 
                },
                { 
                    label: 'With Courier', 
                    value: 'with_courier' 
                },
                { 
                    label: 'Irregularity Status', 
                    value: 'irregularity_status_description' 
                }
            ],
            dataTable: [],
            datacolumn: [
                { 
                    label: "No", 
                    key: "index", 
                    width: "xxxxs" 
                },
                { 
                    label: "Item", 
                    key: "item_number", 
                    width: "md" 
                },
                { 
                    label: "Quantity", 
                    key: "koli_qty", 
                    width: "xxxxs" 
                },
                { 
                    label: "Of#", 
                    key: "koli_sequence", 
                    width: "xxxxs" 
                },
                { 
                    label: "Weight", 
                    key: "koli_actual_weight", 
                    width: "xxxxs" 
                },
                { 
                    label: "Destination Code", 
                    key: "destination_code", 
                    width: "sm" 
                },
                { 
                    label: "Service", 
                    key: "connote_service_code", 
                    width: "xs" 
                },
                { 
                    label: "Type", 
                    key: "item_type", 
                    width: "xxxxs" 
                },
                { 
                    label: "Runsheet Number", 
                    key: "runsheet_number", 
                    width: "md" 
                },
                { 
                    label: "Create Date", 
                    key: "created_at", 
                    width: "sm" 
                }
            ]
        };
    },
    methods: {
        async getBag() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.bag}?n=${this.current_node_id}&s=${this.bag_number}`, this.Helper.header());
                
                if (res.data.data && res.data.data.length > 0) {
                    const item = res.data.data[0]

                    if (item) {
                        this.bag_additional_info = {
                            created_at: item.created_at,
                            is_masterbag: item.is_consolidated === 1 ? true : false,
                            is_approve: item.is_approve === 1 ? true : false,
                            surat_muatan: item.sm?.[0]?.manifest_number || '-',
                            surat_jalan: item.sj?.[0]?.manifest_do_number || '-',
                            with_courier: item.courier?.employee_name || '-',
                            irregularity_status_description: item.irregularity_status_description || '-',
                            bag_type: item.tipe_bag || "-"
                        };
                    } else {
                        this.bag_additional_info = {};
                    }
                } else {
                    console.warn("No data found for the specified bag number.");
                }

            } catch (err) {
                this.openNotification('danger', err.response?.data.code ?? '', 'Failed', err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async getBagDetail() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.bag}/${this.bag_number}?n=${this.listenNodeId}`, this.Helper.header());               

                this.dataTable = res.data.detail.map((item, index) => ({
                    index: index + 1,
                    destination_code: item.item_type === 'KOLI' ? item.connote_receiver_tariff_code : item.node_tariff_code,
                    ...item
                }));

                let data = res.data.data;
                
                if (data) {            
                    this.current_node_id = data.current_node_id;        
                    const currentLocationNode = await this.getNodeById(parseInt(this.current_node_id)); 

                    await this.getBag();

                    this.bag_detail_qty = res.data.data.bag_detail_qty
                    this.bag_main_info = {
                        current_location: currentLocationNode?.node_name || '-',
                        destination: data?.destination?.node_name || '-',
                        routing: data.routing,
                        service: res.data.validation
                            .map(item => item.service)
                            .filter(service => service !== null)
                            .join(", "),
                        bag_weight: data.bag_weight
                    };
                }
            } catch (err) {
                this.openNotification('danger', err.response?.data.code ?? '', 'Failed', err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async getNodeById(nodeId) {
            try {
                const res = await axios.get(`${this.URL.node}/${nodeId}?n=${this.listenNodeId}`, this.Helper.header());
                return res.data.data;
            } catch (err) {
                this.openNotification('danger', err.response?.data.code ?? '', 'Failed', err?.response?.data?.message ?? 'Something went wrong');
            }
        }
    },
    mounted() {
        this.getBagDetail();
    }
}
</script>

<style scoped>
.info-sub-title {
    margin-bottom: 15px;
    font-size: 1.0em;
    font-weight: bold;
    color: #333;
    text-align: left;
}

.table-col {
    margin-top: 20px;
}

.info-row {
    border-bottom: 1px solid #eaeaea;
}

.info-label h4 {
    font-size: 0.8em;
    color: #555;
    text-align: left;
}

.info-value p {
    font-size: 0.8em;
    color: #000;
    text-align: right;
}

.info-value button {
    float: right;
}


.info-row:last-child {
    border-bottom: none;
}
</style>
