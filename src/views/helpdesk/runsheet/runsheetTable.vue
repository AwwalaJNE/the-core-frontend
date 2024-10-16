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
            :hasLinked="['delivery_runsheet_number']"
            :hasPagination="true"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            @handleEdit="showData"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";

import TableMaster from "@/components/table/tableMaster";

export default {
    name:"delivery-runsheet",
    mixins: [master],
    props: {
        dateFilter: String,
        filterDateBy: String,
        query: String,
        searchBy: String,
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                  label: "Created At",
                  key: "created_at",
                  width: "sm"
                },
                {
                    label: "Delivery Runsheet Number",
                    key: "delivery_runsheet_number",
                    width: "md"
                },
                {
                    label: "DRI Number",
                    key: "dri",
                    width: "xs"
                },
                {
                    label: "HRS Number",
                    key: "hrs",
                    width: "xs"
                },
                {
                    label: "Employee Code",
                    key: "employee_code",
                    width: "xxs"
                },
                {
                    label: "Employee Name",
                    key: "employee_name",
                    width: "xxs"
                },
                {
                    label: "Total Koli",
                    key: "total_koli",
                    width: "xxs"
                },
                {
                    label: "Open",
                    key: "total_open",
                    width: "xxs"
                },
                {
                    label: "Delivered",
                    key: "total_delivered",
                    width: "xxs"
                },
                {
                    label: "Undelivered",
                    key: "total_undelivered",
                    width: "xxs"
                },
                {
                  label: "Undelivered Receiving",
                  key: "total_undelivery_received",
                  width: "xxs"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            date: "",
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            }
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, 1, val, this.startDate, this.endDate)
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
                this.getTableData(this.pagination.limit, 1, this.tempSearch, this.startDate, this.endDate, this.node_filter)
            }
        }
    },
    methods: {
        async getTableData(limit,page,q, from, to) {
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
                .get(this.URL.revamp_delivery +
                `?n=${this.listenNodeId}&s=${query}&date_filter=${this.dateFilter}&search_by=${this.searchBy}&page=${page}&limit=${limit}`,
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err?.response?.data?.code ?? '', err?.response?.data?.message ?? 'Failed to populate Delivery Runsheet list', err?.response?.data?.message ?? 'something went wrong');
                })
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
        showData(row) {
            this.$router.push({ 
                name: 'delivery-runsheet-edit', 
                params: { 
                    employee_id: row.employee_id,
                    delivery_runsheet_number: row.delivery_runsheet_number,
                    date_filter: row.created_at.split(' ')[0]
                } 
            });
            this.setRoutePageHistory(this.$route.meta, false);
        },
    },
    mounted() {
        this.refresh()
    }
}
</script>