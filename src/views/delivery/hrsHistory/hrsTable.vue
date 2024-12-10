<template>
    <div>
        <table-master 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="false"
            :hasPagination="true"
            :expandable="true"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import moment from "moment";

import TableMaster from "@/components/table/tableMaster";

export default {
    name:"hrs-history-table",
    mixins: [master],
    props: {
        dateFilter: Array,
        query: String,
        searchBy: String
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "HRS ID",
                    key: "handover_runsheet_id",
                    width: "sm"
                },
                {
                    label: "HRS Number",
                    key: "handover_number",
                    width: "xs"
                },
                {
                    label: "Orion Number",
                    key: "hrs_number",
                    width: "xs"
                },
                {
                    label: "Courier",
                    key: "courier_employee_name",
                    width: "xs"
                },
                {
                    label: "Node Name",
                    key: "node_name",
                    width: "md"
                },
                {
                    label: "Created By",
                    key: "created_by",
                    width: "xs"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "xs"
                },
            ],
            loading: false,
            tempSearch: "",
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1,
            },
            handover_number: "",
            hrs_number: "",
            employee: "",
            created_by: ""
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate)
                }
            }
        },
        dateFilter: function(val, old) {
            if (val) {
                this.dateRange = val;
                this.startDate = this.dateRange[0] ? moment(this.dateRange[0]).format("YYYY-MM-DD") : "";
                this.endDate = this.dateRange[1] ? moment(this.dateRange[1]).format("YYYY-MM-DD") : "";

                if (old && (this.startDate !== old[0] || this.endDate !== old[1])) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate);
                }
            } else {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, "", "");
            }
        }
    },
    methods: {
        async getTableData(limit, page, q, from, to) {
            this.loading = true;
            const query = q ?? '';            
            let startDate = from ?? "";
            let endDate = to ?? "";

            try {
                const res = await axios.get(`${this.URL.handover_runsheet}/history?n=${this.listenNodeId}&page=${page}&limit=${limit}&s=${query}&search_by=${this.searchBy}&start_date=${startDate}&end_date=${endDate}`, this.Helper.header());

                const arr = res.data.data.map(item => {
                    item["node_name"] = item?.node?.node_name ?? "";
                    item["courier_employee_name"] = item?.employee?.employee_name ?? "";

                    const children = {
                        'Runsheet #': [],
                        'DRI Number': [],
                        'HRS Number': [],
                        'Connote Number': [],
                        'Status': [],
                        'Status Delivery': [],
                        'Payment Type COD': [],
                        'Amount COD': []
                    };

                    item?.runsheets.forEach(el => {
                        children['Runsheet #'].push(el.delivery_runsheet_number);
                        children['DRI Number'].push(el.dri ?? '-');
                        children['HRS Number'].push(el.hrs ?? '-');
                        children['Connote Number'].push(el.connote_number);
                        children['Status'].push(el.status);
                        children['Status Delivery'].push(el.status_delivery);
                        children['Payment Type COD'].push(el.cod_payment_type ?? '-');
                        children['Amount COD'].push(el.amount_cod ?? '-');
                    });

                    item.children_width = {
                        'Runsheet #': 'auto',
                        'DRI Number': 'auto',
                        'HRS Number': 'auto',
                        'Connote Number': 'auto',
                        'Status': 'auto',
                        'Status Delivery': 'auto',
                        'Payment Type COD': 'auto',
                        'Amount COD': 'auto'
                    };
                    item.children = children;

                    return item;
                });

                this.dataTable = arr;
                this.pagination = {
                    page: res.data.meta.current_page,
                    limit: parseInt(res.data.meta.per_page),
                    page_size: res.data.meta.last_page
                };
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed', err?.response?.data?.message ?? 'Failed to Populate HRS Runsheet List');
            } finally {
                this.loading = false;
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
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate)
        }
    },
    mounted() {
        this.refresh()
    }
}
</script>