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
        :hasLinkedChild="['Runsheet #']"
        :hasPagination="true"
        :expandable="true"
        :hasChildStatus="true"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @handleEditLinkedChild="actionDetail"
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
        node:String,
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
                    label: "Courier Code",
                    key: "employee_code",
                    width: "xs"
                },
                {
                    label: "Name",
                    key: "employee_name",
                    width: "sm"
                },
                {
                    label: "Total Runsheet",
                    key: "total_runsheet",
                    width: "xs"
                },
                {
                    label: "Total HRS",
                    key: "total_hrs",
                    width: "xs"
                },
                {
                    label: "Total Connote",
                    key: "total_koli",
                    width: "xs"
                },
                {
                    label: "Open",
                    key: "total_open",
                    width: "xs"
                },
                {
                    label: "Delivered",
                    key: "total_delivered",
                    width: "xs"
                },
                {
                    label: "Undelivered",
                    key: "total_undelivered",
                    width: "xs"
                },
                {
                  label: "Undelivered Receiving",
                  key: "total_undelivery_received",
                  width: "xs"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            date: "",
            dialogTariff: false,
            pagination: {
                limit:20,
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
                    this.pagination.page = 1
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
        },
        node: function(val, old) {
            if(val !== undefined) {
                this.node_filter = val
                if(this.node_filter !== old) {
                    this.getTableData(this.pagination.limit, 1, this.tempSearch, this.startDate, this.endDate, val)
                }
            }
        },
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
                .get(this.URL.courier_delivery +
                `?n=${this.listenNodeId}&s=${query}&date_filter=${this.dateFilter}&search_by=${this.searchBy}&page=${page}&limit=${limit}`,
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    arr.map((item) => {
                        let children = {}
                        let delivery_runsheet_number = []
                        let dri = []
                        let hrs = []
                        let is_hrs = []
                        let total_koli = []
                        let total_open = []
                        let total_delivered = []
                        let total_undelivered = []
                        let total_undelivery_received = []
                        item['children_width'] = {
                            'Runsheet #': 'md',
                            'DRI Number': 'sm',
                            'HRS Number': 'sm',
                            'Total Koli': 'auto',
                            'Open': 'xxxs',
                            'Status': 'xxxs',
                            'Delivered': 'xxxs',
                            'Undelivered': 'xxxs',
                            'Undelivered Received': 'xs',
                            'HRS': 'xxxxs'
                        }
                        item.delivery.map((el) => {
                            delivery_runsheet_number.push(el.delivery_runsheet_number)
                            dri.push(el.dri ?? "-")
                            hrs.push(el.hrs ?? "-")
                            is_hrs.push(el.is_hrs ? true : false)
                            total_koli.push(el.total_koli)
                            total_open.push(el.total_open)
                            total_delivered.push(el.total_delivered)
                            total_undelivered.push(el.total_undelivered)
                            total_undelivery_received.push(el.total_undelivery_received)
                        })
                        children['Runsheet #'] = delivery_runsheet_number
                        children['DRI Number'] = dri
                        children['HRS Number'] = hrs
                        children['Total Koli'] = total_koli
                        children['Open'] = total_open
                        children['Delivered'] = total_delivered
                        children['Undelivered'] = total_undelivered
                        children['Undelivered Received'] = total_undelivery_received
                        children['HRS'] = is_hrs
                        item['children'] = children
                    })
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
        actionDetail(row, item){
            let params = {
                employee_id: row.employee_id,
                delivery_runsheet_number: item,
                date_filter: this.dateFilter
            }
            let routeName = 'delivery-runsheet-edit'
            this.$router.push({ name: routeName, params: params })
            this.setRoutePageHistory(this.$route.meta, false);
        },
    },
    mounted() {
        this.refresh()
    }
}
</script>