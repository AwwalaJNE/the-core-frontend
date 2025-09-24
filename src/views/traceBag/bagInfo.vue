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
                            <template v-else-if="info.type === 'hasLinked'">
                                <p
                                    v-if="bag_additional_info[info.value] && bag_additional_info[info.value] !== '-'"
                                    class="clickable text-link"
                                    @click="openDialog(bag_additional_info[info.value])"
                                >
                                    {{ bag_additional_info[info.value] }}
                                </p>
                                <p v-else>
                                    -
                                </p>
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
                    hideColumnKey="trace-bag-info"
                    :dataTable="dataTable"
                    :dataColumn="!is_consolidated ? dataColumn.concat(additionalColumn) : dataColumn"
                    :tableLoading="loading"
                    :hasAction="false"
                    :hasPagination="false"
                />
            </vs-col>
        </vs-row>

        <dialogCreateManifest
            title="Manifest Info"
            :active="dialogManifestList"
            :closeDialog="closeDialog"
            :isReadOnly="true"
            :sm_number="sm_number"
        />
    </div>
</template>

<script>
import master from "@/mixins/master";
import TableMaster from "@/components/table/tableMaster";
import axios from 'axios';

import DialogCreateManifest from "@/views/transport/manifestNew/dialogCreateEditManifest"

export default {
    name: "bag-info",
    mixins: [master],
    components: {
        TableMaster,
        "dialogCreateManifest": DialogCreateManifest,
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
            current_node_code: '',
            data: this.dataItem || {},
            loading: false,
            isEmptyAddInfo: false,
            mainInfo: [
                { 
                    label: 'Current Locations',
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
                    label: 'Total Weight', 
                    value: 'bag_weight' 
                },
                { 
                    label: 'Actual Weight', 
                    value: 'bag_actual_weight' 
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
                    value: 'surat_muatan' ,
                    type: 'hasLinked'
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
                    label: 'Received At',
                    value: 'current_location_node_code'
                },
                { 
                    label: 'Irregularity Status', 
                    value: 'irregularity_status_description' 
                }
            ],
            dataTable: [],
            dataColumn: [
                {
                    label: "No",
                    key: "no",
                    width: "xs"
                },
                {
                    label: "Item",
                    key: "item_number",
                    width: "md"
                },
                {
                    label: "Quantity",
                    key: "koli_qty",
                    width: "xs"
                },
                {
                    label: "Of#",
                    key: "koli_sequence",
                    width: "auto"
                },
                {
                  label: "Weight",
                  key: "bag_weight",
                  width: "auto"
                },
                {
                    label: "Destination Code",
                    key: "destination_code",
                    width: "auto"
                },
                {
                    label: "Service",
                    key: "connote_service_code",
                    width: "auto"
                },                
                {
                    label: "Type",
                    key: "item_type",
                    width: "auto"
                },
                {
                    label: "Date",
                    key: "created_at",
                    width: "xs"
                },
            ],
            additionalColumn: [
                {
                    label: "Runsheet Number",
                    key: "runsheet_number",
                    width: "auto"
                }
            ],
            sm_number: "",
            dialogManifestList:false,
            is_consolidated: false
        };
    },
    methods: {
        async getBag() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.bag}?n=${this.current_node_id}&s=${this.bag_number}`, this.Helper.header());
                
                if (res.data.data.length > 0) {
                    const item = res.data.data[0]
                    if (item) {
                        this.bag_additional_info = {
                            created_at: this.formatTimezone(item.created_at),
                            is_masterbag: item.is_consolidated === '1' ? true : false,
                            is_approve: item.is_approve === 1 ? true : false,
                            surat_muatan: item.sm?.[0]?.manifest_number || '-',
                            surat_jalan: item.sj?.[0]?.manifest_do_number || '-',
                            with_courier: item.courier?.employee_name || '-',
                            irregularity_status_description: item.irregularity_status_description || '-',
                            bag_type: item.tipe_bag || "-",
                            current_location_node_code: this.current_node_code || '-'
                        };
                    } else {
                        this.bag_additional_info = {}; 
                    }
                } else {
                    this.isEmptyAddInfo = true;
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

                let data = res.data.data;

                if (data) {            
                    this.current_node_id = data.current_node_id;        
                    const currentLocationNode = await this.getNodeById(parseInt(this.current_node_id));
                    this.current_node_code = currentLocationNode?.node_code;
                    this.is_consolidated = res?.data?.data?.is_consolidated === '1';

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
                        bag_weight: data.bag_weight + " Kg",
                        bag_actual_weight: data.bag_actual_weight + " Kg"
                    };
                    
                    if (this.isEmptyAddInfo) {
                        this.bag_additional_info = {
                            created_at: data.created_at,
                            is_masterbag: data.is_consolidated === '1' ? true : false,
                            is_approve: data.is_approve === 1 ? true : false,
                            surat_muatan: '-',
                            surat_jalan: '-',
                            with_courier: data.employee_code || '-',
                            irregularity_status_description: data.irregularity_status_description || '-',
                            bag_type: data.tipe_bag || "-",
                            current_location_node_code: this.current_node_code || '-'
                        };
                    }
                    this.dataTable = res.data.detail.map((item, index) => {
                        const isKoli = !this.is_consolidated;
                        item.created_at = this.formatTimezone(item.created_at)
                        return {
                            ...item,
                            no: index + 1,
                            destination_code: isKoli ? item.connote_receiver_tariff_code : item.node_tariff_code,
                            koli_qty: isKoli ? item.koli_qty : item.bag_detail_qty,
                            koli_sequence: isKoli ? item.koli_sequence : '-',
                            bag_weight: isKoli ? item?.connote_actual_weight : item.bag_weight,
                            connote_service_code: isKoli ? item.connote_service_code : item.bag_service.join(', '),
                            bag_detail_qty: res.data.data.bag_detail_qty,
                            isDisabled: res.data.data.is_approve === 1,
                            runsheet_number: item?.runsheet?.[item.runsheet.length - 1]?.delivery_runsheet_number || ''
                        };
                    });
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
        },
        async openDialog(val) {
            if (val) {
                this.sm_number = val;
                this.dialogManifestList = true;
            }
        },
        closeDialog() {
            this.dialogManifestList = false
        },
    },
    mounted() {
        this.getBagDetail();
        window.addEventListener('timezone-changed', this.getBagDetail);
        window.addEventListener('timezone-changed', this.getBag);
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.getBagDetail);
        window.removeEventListener('timezone-changed', this.getBag);
    },
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

.clickable {
    cursor: pointer;
    color: rgb(53, 92, 255) !important;
}
</style>
