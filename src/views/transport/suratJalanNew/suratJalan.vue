<template>
    <div>
        <table-master 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasPagination="true"
            :hasLinked="['manifest_do_number']"
            :customAction="true"
            :customActionList="customActionList"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            @actionUpdate="actionUpdate"
            @handleEdit="handleEdit"
        />

        <div v-if="true">
            <dialogCreateSuratJalanV2
                btnBlue="Edit"
                title="Edit Transport Surat Jalan"
                :active="dialogSuratJalan"
                :closeDialog="closeDialogSuratJalan"
                :dataItem="dataItem"
                @refresh="refresh"
            />
        </div>
        <div v-else>
            <dialogCreateSuratJalan
                btnBlue="Edit"
                title="Edit Transport Surat Jalan"
                :active="dialogSuratJalan"
                :closeDialog="closeDialogSuratJalan"
                :dataItem="dataItem"
                @refresh="refresh"
            />
        </div>
        

        <dialog-confirm
            title="Cancel Surat Jalan"
            :message="`Are you sure you want to cancel this surat jalan with number ${this.id}?`"
            :active="activeDialogConfirmCancel"
            :loading="loadingConfirmCancel"
            :closeDialog="closeDialogConfirmCancel"
            @confirm="confirmCancel"
            @cancel="closeDialogConfirmCancel"
        />
    </div>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master";

import DialogConfirm from "@/components/dialog/dialogConfirm";
import TableMaster from "@/components/table/tableMaster";

import DialogCreateSuratJalan from "@/views/transport/suratJalanNew/dialogCreateSuratJalan";
import DialogCreateSuratJalanV2 from "@/views/transport/suratJalanNew/dialogCreateSuratJalanV2";

export default {
    name:"transport-surat-jalan-table-new",
    mixins: [master],
    props: {
        dateFilter: Array,
        filterDateBy: String,
        query: String,
        searchBy: String,
        status: [Array, String]
    },
    components: {
        "table-master" : TableMaster,
        "dialog-confirm": DialogConfirm,

        "dialogCreateSuratJalan": DialogCreateSuratJalan,
        "dialogCreateSuratJalanV2": DialogCreateSuratJalanV2
    },
    data() {
        return {
            form: {},
            dataTable: [],
            dialogSuratJalan:false,
            datacolumn: [
                {
                    label: "Surat Jalan #",
                    key: "manifest_do_number",
                    width: "xs"
                },
                {
                    label: "Orion Number",
                    key: "orion_number",
                    width: "xs"
                },
                {
                    label: "Vehicle Type",
                    key: "vehicle_type_name",
                    width: "xs"
                },
                {
                    label: "Driver",
                    key: "driver_name",
                    width: "xs"
                },
                {
                    label: "Mode#",
                    key: "vehicle_mode_name",
                    width: "auto"
                },
                {
                    label: "Origin",
                    key: "node_id_origin_name",
                    width: "sm"
                },
                {
                    label: "Destination",
                    key: "node_id_destination_name",
                    width: "sm"
                },
                {
                    label: "Kg",
                    key: "total_weight",
                    width: "auto"
                },
                {
                    label: "ETD",
                    key: "etd",
                    width: "xs"
                },
                {
                    label: "ETA",
                    key: "eta",
                    width: "xs"
                },
                {
                    label: "Departed Time",
                    key: "departed_time",
                    width: "xs"
                },
                {
                    label: "Approved",
                    key: "approved",
                    width: "xxs"
                },
                {
                    label: "Status",
                    key: "status",
                    width: "xxs"
                },
            ],
            customActionList: [
                {
                    label: 'Depart',
                    key: 'depart',
                    attribute: '',
                },
                {
                    label: 'Cancel',
                    key: 'cancel',
                    attribute: 'danger',
                }
            ],

            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            startDate: "",
            endDate: "",
            dialogTariff: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            activeDialogCancel:false,
            activeLoadingCancel:false,
            pickupData:{},
            manifest_do_number: '',
            id: '',
            activeDialogConfirmCancel: false,
            loadingConfirmCancel:false,
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.filterDateBy)
                }
            }
        },
        filterDateBy: function(val, old) {
            if(val !== undefined) {
                if(val !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, val)
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
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, this.filterDateBy)
            }
        }
    },
    methods: {
        async getTableData(limit,page,q, from, to, qDate) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            let queryDate = "";
            if(q !== undefined) {
                query = q
                if (q.includes("/")) {
                    query = query.replaceAll("/", "-")
                }
            }
            if(from !== undefined && to !== undefined) {
                startDate = from
                endDate = to
            }
            if (qDate !== undefined) {
                queryDate = qDate
            }
            await axios
                .get(this.URL.manifest_delivery_order + `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${queryDate}&status=${this.status}`, this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    let buttonStatus = {
                        'depart': true,
                        'cancel': true
                    }
                    
                    arr.map(item => {
                        item["pickup_courier_employee_name"] = (item.employee_courier) ? item.employee_courier.employee_name: null
                        item["node_id_origin_name"] = (item.origin) ? item.origin.node_name: null
                        item["node_id_destination_name"] = (item.destination) ? item.destination.node_name: item.facility_code_destination
                        item["driver_id"] = (item.pic_employee_id) ? parseInt(item.pic_employee_id): null
                        item["driver_name"] = (item.pic) ? item.pic.employee_name: null
                        item["orion_number"] = item.mts || item.do || "";
                        item["approved"] = item.is_approve    === 1 ? 'YES' : 'NO';
                        
                        if (item.hasOwnProperty('status') && item["status"] !== null) {
                            let str = item["status"].toLowerCase();
                            if (!str.includes("ready")) {
                                buttonStatus["depart"] = false;
                                item["button_status"] = buttonStatus;
                            }
                            if (str.includes("cancel")) {
                                buttonStatus["cancel"] = false;
                                item["button_status"] = buttonStatus;
                            }
                        }

                        if (item.is_orion == "1") {
                            buttonStatus["cancel"] = false;
                            item["button_status"] = buttonStatus;
                        }
                    })

                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', null, 'Surat Jalan data is empty!', ' Please create a new Surat Jalan data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate Surat Jalan data', err)
                })
        },

        closeDialogConfirm(){
            this.confirmDialog = false
            this.refresh();
        },

        actionUpdate(val, key) {
            switch(key) {
                case "depart":
                    this.manifest_do_number = val.manifest_do_number
                    this.depart()
                    break;
                case 'cancel':
                    this.manifest_do_number = val.manifest_do_number
                    this.id = val.manifest_do_number;
                    this.activeDialogConfirmCancel = true
                    break;
                default:
            }
        },
        handleEdit(val){
            if(this.dataTable.length > 0) {
                this.dataItem = val
                this.dataItem["destination_id"] = val.node_id_destination ? val.node_id_destination : ''
                this.dataItem["moda_angkutan_id"] = val.vehicle_mode_id ? parseInt(val.vehicle_mode_id) : ''
                this.dataItem["no_moda_angkutan_id"] = val.vehicle_id ? parseInt(val.vehicle_id) : ''
                this.dataItem["manifest_do_item"] = val.detail ? val.detail : ''
                this.dataItem["driver_id"] = val.pic_employee_id ? parseInt(val.pic_employee_id) : ''
                this.dataItem["max_weight"] = val.max_weight
                this.dataItem["driver_id"] = val.driver_id ? parseInt(val.driver_id) : ''
                this.dataItem["vehicle_type_id"] = val.vehicle_type_id ? parseInt(val.vehicle_type_id) : ''
                this.$nextTick(() => {
                    this.dialogSuratJalan = true
                });
            }
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate, this.filterDateBy)
        },
        async depart() {
            this.loading = true

            try {
                const res = await axios.patch(`${this.URL.revamp_surat_jalan}/${this.manifest_do_number}/depart?n=${this.listenNodeId}&is_departed=1`, {}, this.Helper.header());
                this.openNotification('success', null, 'Success', 'Update surat jalan success')
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code ?? '', 'Update surat jalan failed', err?.response?.data?.message ?? 'something went wrong')
            } finally {
                this.loading = false;
                this.refresh();
            }
        },
        closeDialogSuratJalan() {
            this.dialogSuratJalan = false
            this.refresh();
        },
        confirmCancel() {
            this.loadingConfirmCancel=true
            this.cancel()
        },
        async cancel() {
            try {
                const res = await axios.delete(`${this.URL.revamp_surat_jalan}/${this.manifest_do_number}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, 'Success', 'Cancel surat jalan success');
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed', err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.closeDialogConfirmCancel();
                this.refresh();
            }
        },
        closeDialogConfirmCancel(){
            this.activeDialogConfirmCancel = false
            this.loadingConfirmCancel=false
        },
    },
    mounted() {
        this.refresh()
    }
}
</script>