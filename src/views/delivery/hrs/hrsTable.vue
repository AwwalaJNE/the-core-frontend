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
        :hasLinked="['employee_name']"
        :hasPagination="true"
        :expandable="true"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @handleEdit="actionDetail"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"hrs-table",
    mixins: [master],
    props: {
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
                    label: "Total Koli",
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
                },
                {
                  label: "Can HRS",
                  key: "ready_to_hrs",
                  type: "status",
                  width: "xs"
                }
            ],
            loading: false,
            tempSearch: "",
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
                    this.getTableData(this.pagination.limit, 1, val)
                }
            }
        }
    },
    methods: {
        async getTableData(limit,page,q) {
            this.loading = true
            let query = "";
            if(q !== undefined) {
                query = q
            }
            await axios
                .get(this.URL.handover_runsheet +
                `?n=${this.listenNodeId}&s=${query}&search_by=${this.searchBy}&page=${page}&limit=${limit}`,
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    arr.map((item) => {
                        let children = {}
                        let delivery_runsheet_number = []
                        let dri = []
                        let total_koli = []
                        let total_open = []
                        let total_delivered = []
                        let total_undelivered = []
                        let total_undelivery_received = []
                        item['children_width'] = {
                            'Runsheet #': 'auto',
                            'DRI Number': 'auto',
                            'Total Koli': 'auto',
                            'Open': 'auto',
                            'Status': 'auto',
                            'Delivered': 'auto',
                            'Undelivered': 'auto',
                            'Undelivered Received': 'auto'
                        }
                        item.delivery.map((el) => {
                            delivery_runsheet_number.push(el.delivery_runsheet_number)
                            dri.push(el.dri ?? "-")
                            total_koli.push(el.total_koli)
                            total_open.push(el.total_open)
                            total_delivered.push(el.total_delivered)
                            total_undelivered.push(el.total_undelivered)
                            total_undelivery_received.push(el.total_undelivery_received)
                        })
                        children['Runsheet #'] = delivery_runsheet_number
                        children['DRI Number'] = dri
                        children['Total Koli'] = total_koli
                        children['Open'] = total_open
                        children['Delivered'] = total_delivered
                        children['Undelivered'] = total_undelivered
                        children['Undelivered Received'] = total_undelivery_received
                        item['children'] = children
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', err?.response?.data?.message ?? 'Failed to Populate HRS Runsheet List', err)
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },

        actionDetail(row){
            let params = {
                employee_id: row.employee_id,
            }
            let routeName = 'handover-runsheet-courier'
            this.$router.push({ name: routeName, params: params })
            this.setRoutePageHistory(this.$route.meta, false);
        },

    },
    mounted() {
        this.refresh()
    }
}
</script>