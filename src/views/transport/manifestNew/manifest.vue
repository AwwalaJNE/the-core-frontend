<template>
        <div>
            <!-- action table ini bisa diganti pke customActionList contohnya kaya di views/transport/suratJalan.vue -->
                <table-master 
                :dataTable="dataTable" 
                :dataColumn="datacolumn" 
                :tableLoading="loading"
                :pageSize="pagination.page_size"
                :page="pagination.page"
                :limit="pagination.limit"
                :hasLinked="['manifest_number']"
                :pickupListAction="true"
                :cancelRequestAction="true"
                :hasPagination="true"
                @actionLimit="actionLimit"
                @actionPagination="actionPagination"
                @actionCancel="actionCancel"
                @handleEdit="actionUpdate"
                />

            <!--Create pickup List-->
            <dialogCreateManifest
                    :active="dialogManifestList"
                    @refresh="refresh"
                    :closeDialog="closeDialog"
                    title="Edit Manifest"
                    :dataItem="dataItem"
            />

            <!-- dialog confirm remove manifest-->
            <dialog-confirm
                    :active="activeDialogCancel"
                    :loading="activeLoadingCancel"
                    :closeDialog="closeDialogConfirmCancel"
                    title="Cancel Surat Muatan"
                    message="Are you sure you want to Cancel Surat Muatan ?"
                    @confirm="confirmCancel"
                    @cancel="closeDialogConfirmCancel"
            />
        </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"

import DialogConfirm from "@/components/dialog/dialogConfirm"
import TableMaster from "@/components/table/tableMaster.vue"

import DialogCreateManifest from "@/views/transport/manifestNew/dialogCreateEditManifest"

export default {
        name:"transport-surat-muatan-table-new",
        mixins: [master],
        props: {
            dateFilter: Array,
            filterDateBy: String,
            node:String,
            query: String,
            searchBy: String,
            status: [Array, String]
        },
        components: {
            "table-master" : TableMaster,
            "dialogCreateManifest": DialogCreateManifest,
            "dialog-confirm": DialogConfirm
        },
        data() {
            return {
                activeDialogCancel:false,
                activeLoadingCancel:false,
                dataTable: [],
                dialogManifestList:false,
                datacolumn: [
                    {
                        label: "No Surat Muatan",
                        key: "manifest_number",
                        width: "xs"
                    },
                    {
                        label: "Date#",
                        key: "created_at",
                        width: "sm"
                    },
                    {
                        label: "Type SM",
                        key: "manifest_type_name",
                        width: "xs"
                    },
                    {
                        label: "Jenis Kiriman",
                        key: "jenis_kiriman",
                        width: "xs"
                    },
                    {
                        label: "Origin",
                        key: "origin_name",
                        width: "sm"
                    },
                    {
                        label: "Destination",
                        key: "destination_name",
                        width: "sm"
                    },
                    {
                        label: "Bag",
                        key: "detail_count",
                        width: "auto"
                    },
                    {
                        label: "Koli",
                        key: "koli_count",
                        width: "auto"
                    },
                    {
                        label: "Weight",
                        key: "max_weight",
                        width: "auto"
                    },
                    {
                        label: "ETA",
                        key: "eta",
                        width: "sm"
                    },
                    {
                        label: "ETD",
                        key: "etd",
                        width: "sm"
                    },
                    {
                        label: "Approved",
                        key: "approved",
                        width: "xs"
                    },
                    {
                        label: "Status",
                        key: "status",
                        width: "xs"
                    },
                ],
                loading: false,
                dataItem: {},
                pickupData:{},
                tempSearch: "",
                tempDate: [],
                startDate: "",
                endDate: "",
                node_filter: "",
                dialogTariff: false,
                pagination: {
                    limit:20,
                    page_size: 1,
                    page: 1
                },
                manifest_number:'',
            }
        },
        watch: {
            query: function(val, old) {
                if(val !== undefined) {
                    this.tempSearch = val
                    if(this.tempSearch !== old) {
                        this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.node_filter)
                    }
                }
            },
            dateFilter: function(val, old) {
                if(val !== undefined) {
                    this.tempDate = val
                    if(this.tempDate !== old ) {
                        this.startDate = this.tempDate !== null ? this.tempDate[0] : ''
                        this.endDate = this.tempDate !== null ? this.tempDate[1] : ''
                    }
                    this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, this.node_filter)
                }
            },
            node: function(val, old) {
                if(val !== undefined) {
                    this.node_filter = val
                    if(this.node_filter !== old) {
                        this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, val)
                    }
                }
            },
        },
        methods: {
            async getTableData(limit,page,q, from, to, node) {
                this.loading = true
                let query = "";
                let startDate = "";
                let endDate = "";
                if(q !== undefined) {
                    query = q
                }
                if(from !== undefined && to !== undefined) {
                    startDate = from
                    endDate = to
                }
                await axios
                    .get(this.URL.surat_muatan + `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}&status=${this.status}`, this.Helper.header())
                    .then(res => {
                        this.dataTable = res.data.data
                        let arr = res.data.data
                        arr.map(item => {
                            item["pickup_courier_employee_name"] = (item.employee_courier) ? item.employee_courier.employee_name: null
                            item["manifest_type_name"] = (item.manifest_method) ? item.manifest_method.vehicle_mode_name: null
                            item['jenis_kiriman'] = (item.vehicle_type) ? item.vehicle_type.vehicle_type_name: '-'
                            item['origin_name'] = (item.origin) ? item.origin.node_name: '-'
                            item['destination_name'] = (item.destination) ? item.destination.node_name: '-'
                            item['eta'] = this.dateConvert(item.eta)
                            item['etd'] = this.dateConvert(item.etd)
                            item['created_at'] = this.dateConvert(item.created_at)
                            item["approved"] = item.is_approve === 1 ? 'YES' : 'NO';
                            
                            if (item.hasOwnProperty('status') && item["status"] !== null) {
                                let str = item["status"].toLowerCase();
                                if (!str.includes("ready")) {
                                    item['isDisabledCancel'] = true;
                                }
                                }

                            if (item.is_orion == "1") {
                                item['isDisabledCancel'] = true
                            }
                        })
                        this.dataTable = arr
                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                        if(res.data.data.length > 0) {
                                
                        } else {
                            this.openNotification('warn', null, 'Surat Muatan data is empty!', ' Please create Surat Muatan data')
                        }
                        
                        this.loading = false
                    }).catch(err => {
                        this.loading = false
                        this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate Surat Muatan', err)
                    })
            },
            // async getTableData(limit, page, q, from, to, node) {
            //     this.loading = true;
            //     let query = q ?? "";
            //     let startDate = from ?? "";
            //     let endDate = to ?? "";
                
            //     try {
            //         const res = await axios.get(`${this.URL.surat_muatan}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}&status=${this.status}`, this.Helper.header());
                    
            //         let arr = res.data.data.map(item => {
            //             return {
            //                 ...item,
            //                 pickup_courier_employee_name: item.employee_courier ? item.employee_courier.employee_name : null,
            //                 manifest_type_name: item.manifest_method ? item.manifest_method.vehicle_mode_name : null,
            //                 jenis_kiriman: item.vehicle_type ? item.vehicle_type.vehicle_type_name : '-',
            //                 origin_name: item.origin ? item.origin.node_name : '-',
            //                 destination_name: item.destination ? item.destination.node_name : '-',
            //                 eta: this.dateConvert(item.eta),
            //                 etd: this.dateConvert(item.etd),
            //                 created_at: this.dateConvert(item.created_at),
            //                 approved: item.is_approve === 1 ? 'YES' : 'NO',
            //                 isDisabledCancel: (!item.status?.toLowerCase().includes("ready") || item.is_orion == "1") ? true : false
            //             };
            //         });
                    
            //         this.dataTable = arr;
            //         this.pagination.page = res.data.meta.current_page;
            //         this.pagination.limit = parseInt(res.data.meta.per_page);
            //         this.pagination.page_size = res.data.meta.last_page;

            //         if (res.data.data.length === 0) {
            //             this.openNotification('warn', null, 'Surat Muatan data is empty!', 'Please create Surat Muatan data');
            //         }

            //     } catch (err) {
            //         this.openNotification('danger', err.response?.data?.code ?? '', 'Failed to populate Surat Muatan', err.response?.data?.message ?? 'Something went wrong');
            //     } finally {
            //         this.loading = false;
            //     }
            // },
            closeDialog() {
                this.dialogManifestList = false
                this.refresh();
            },
            actionLimit(val){
                this.pagination.limit = val
                this.pagination.page = 1
                this.refresh()
            },
            actionPagination(val) {
                this.pagination.page = val
                this.refresh()
            },
            refresh(){
                this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
            },
            actionUpdate(val){
                if(this.dataTable.length > 0) {
                    val["node_id_origin"] = val["origin_name"] 
                    val["node_id_destination"] = val["destination_name"]
                    val['manifest_method_id'] = parseInt(val['manifest_method_id'])
                    val['vehicle_id'] = parseInt(val['vehicle_id'])
                    val['pic_employee_id'] = parseInt(val['pic_employee_id'])
                    val['vehicle_type_id'] = parseInt(val['vehicle_type_id'])
                    val['flight_number'] = val['flight_number']
                    val['flight_schedule'] = val['flight_schedule']

                    this.dataItem = val
                    if (parseInt(val['manifest_method_id']) === 1) {
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_visible", true)
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible", true)
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_ValueData", val["origin"])
                    }else{
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_visible", false)
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible", false)
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_ValueData", val["origin"])
                    }
                    this.$store.dispatch(`SET_SURAT_MUATAN_NODE_ID_ORIGIN_ValueData`, val["origin"])
                    this.$store.dispatch(`SET_SURAT_MUATAN_NODE_ID_DESTINATION_ValueData`, val["destination"])

                    this.$nextTick(() => {
                        this.dialogManifestList = true
                    });
                }
            },
            confirmCancel(val) {
                let form = {};
                form.status = 'CANCELED';
                form.manifest_number = this.manifest_number;
                this.cancel()
            },

            closeDialogConfirmCancel(){
                this.activeDialogCancel = false
                this.activeLoadingCancel=false
                this.refresh();
            },
            async cancel() {
                try {
                    const res = await axios.delete(this.URL.revamp_surat_muatan + `/${this.manifest_number}?n=${this.listenNodeId}&status=CANCELED&manifest_number=${this.manifest_number}`, this.Helper.header());
                    this.closeDialogConfirmCancel();
                    this.btnLoading = false
                    this.activeLoadingCancel = false
                    this.refresh();
                    this.openNotification('success', null, 'Success', 'Cancel surat muatan success');
                } catch (err) {
                    this.btnLoading = false
                    this.activeLoadingCancel = false
                    this.closeDialogConfirmCancel();
                    this.refresh();
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed', err?.response?.data?.message ?? 'something went wrong');
                }
            },
            actionCancel(row){
                this.manifest_number = row.manifest_number
                this.activeDialogCancel = true;
            },
        },
        mounted() {
            this.refresh()
        }
}
</script>