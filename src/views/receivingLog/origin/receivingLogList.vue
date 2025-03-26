<template>
    <div>
        <table-master 
            :dataTable="dataTable" 
            :dataColumn="dataColumn" 
            :tableLoading="listenLoading"
            :hasPagination="true"
            :pageSize="page_size"
            :page="page"
            :limit="limit"
            :customAction="true"
            :customActionList="customActionList"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            @actionUpdate="actionUpdate"
        />
        <dialog-edit-receiving-log
            :active="dialogEdit"
            @closeDialog="closeDialog"
            :receivingLogId="receivingLogId"
            btnBlue="Edit"
            title="Edit Receiving Log"
        />
    </div>
</template>

<script>
import axios from 'axios';
import master from "@/mixins/master";
import TableMaster from "@/components/table/tableMaster.vue";
import DialogEditReceivingLog from "@/views/receivingLog/origin/dialogEditReceivingLog";

export default {
    name: "Receiving-Log",
    mixins: [master],
    props: {
        dataTableProp: Array,
        searchOriginBy: String,
        searchValue: String,
        pageSize: Number,
        page: Number,
        limit: Number,
        refresh: Function,
        statusSearch: String,
        startDate: String,
        endDate: String
    },
    components: {
        "table-master": TableMaster,
        "dialog-edit-receiving-log": DialogEditReceivingLog
    },
    data() {
        return {
            loading: false,
            dataTable: [],
            dataColumn: [
                {
                    label: "Inbound Number",
                    key: "inbound_number",
                    width: "sm"
                },
                {
                    label: "Item Number",
                    key: "item_number",
                    width: "auto"
                },
                {
                    label: "Origin",
                    key: "origin",
                    width: "md"
                },
                {
                    label: "Receiver",
                    key: "receiver",
                    width: "md"
                },
                {
                    label: "Status",
                    key: "status",
                    width: "auto"
                },
                {
                    label: "Remark",
                    key: "remark",
                    width: "auto"
                },
                {
                    label: "Received At",
                    key: "received_time",
                    width: "auto"
                },
                {
                    label: "Created By",
                    key: "created_by",
                    width: "auto"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "auto"
                }
            ],
            customActionList: [
            {
                label: 'Entry Status',
                key: 'edit',
                attribute: '',
            }
            ],
            dialogEdit: false,
            receivingLogId: "",
        }
    },
    computed: {
        listenLoading() {
            return this.loading;
        },
    },
    methods: {
        actionUpdate(val) {
            this.receivingLogId = val.receiving_log_id;
            this.dialogEdit = true;
        },
        closeDialog() {
            this.dialogEdit = false;
            this.receivingLogId = "";
            this.getTableDataReceivingLog();
        },
        async getTableDataReceivingLog(status = this.statusSearch, startDate = this.startDate, endDate = this.endDate) {
            this.loading = true;
            try {
                let buttonStatus = {
                    edit: false,
                };
                const searchBy = this.searchValue ? this.searchOriginBy : '';
                const searchValue = this.searchValue || '';
                const pov = 'origin';

                let queryParams = `n=${this.listenNodeId}&page=${this.page}&limit=${this.limit}&search_by=${searchBy}&s=${searchValue}&status=${status}&pov=${pov}`;
                
                if (startDate && endDate) {
                    queryParams += `&filter_date=created_at&start_date=${startDate}&end_date=${endDate}`;
                }

                const res = await axios.get(`${this.URL.receiving_log}?${queryParams}`, this.Helper.header());
                const data = res.data.data;

                let processedData = Array.isArray(data) ? data : [data];
                processedData = processedData.map(item => {
                    return {
                        ...item,
                        origin: item.origin_node_name || item.origin_node_code 
                            ? `${item.origin_node_name || ''} ${item.origin_node_code ? `(${item.origin_node_code})` : ''}`.trim()
                            : '',
                        receiver: item.receiver_node_name || item.receiver_node_code
                            ? `${item.receiver_node_name || ''} ${item.receiver_node_code ? `(${item.receiver_node_code})` : ''}`.trim()
                            : '',
                        button_status: buttonStatus
                    };
                });

                this.dataTable = processedData;

                const meta = res.data.meta;
                this.page = meta.current_page;
                this.limit = parseInt(meta.per_page);
                this.page_size = meta.last_page;
            } catch (err) {
                this.dataTable = [];
                this.openNotification(
                    "danger",
                    err?.response?.data?.code || "",
                    "Failed",
                    err?.response?.data?.message || "Something went wrong"
                );
            } finally {
                this.loading = false;
            }
        },
        actionLimit(val) {
            this.limit = val;
            this.page = 1;
            this.getTableDataReceivingLog();
        },
        actionPagination(val) {
            this.page = val;
            this.getTableDataReceivingLog();
        }
    },
    mounted() {
        this.getTableDataReceivingLog();
    }
}
</script>
<style>
    .vs-table__td.action .vs-row.btn_action .vs-col {
        width: 100px !important;
    }
</style>
