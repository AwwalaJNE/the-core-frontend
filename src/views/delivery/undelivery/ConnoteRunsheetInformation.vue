<template>
    <div>
        <table-master 
            hideColumnKey="undelivery-info" 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="listenLoading"
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
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"Inbound-Incoming",
    mixins: [master],
    props: {
        query: String,
        employeeId: [String, Number],
        loadingScan: Boolean,
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Connote / Koli",
                    key: "koli_number",
                    width: "md"
                },
                {
                    label: "Delivery Runsheet Number",
                    key: "delivery_runsheet_number",
                    width: "auto"
                },
                {
                    label: "Service",
                    key: "connote_service_code",
                    width: "xxs"
                },
                {
                    label: "COD (Rp)",
                    key: "amount_cod",
                    width: "xs",
                    type_amount: true,
                    textAlign: "right"
                },
                {
                    label: "Status",
                    key: "status",
                    width: "xxs"
                },
                {
                    label: "Status Delivery",
                    key: "status_delivery",
                    width: "xxs"
                },
                {
                    label: "HRS",
                    key: "hrs_value",
                    type: "status",
                    width: "xxs"
                }
            ],
            loading: false,
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            }
        }
    },
    computed: {
        listenEmployeeId() {
            return this.employeeId;
        },
        listenLoading() {
            return this.loadingScan || this.loading;
        }
    },
    methods: {
        async getTableData(limit, page) {
            this.loading = true
            try {
                const res = await axios.get(`${this.URL.courier_delivery}/${this.listenEmployeeId}/runsheet?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}`, this.Helper.header());
                
                if (res.data.data.length > 0) {
                    let arr = res.data.data
                    arr.map((item, index) => {
                        item["no"] = index + 1;
                        item["koli_number"] = item.koli_number;
                        item["delivery_runsheet_number"] = item.delivery_runsheet_number
                        item["connote_service_code"] = item.connote_service_code
                        item["amount_cod"] = item.amount_cod
                        item["status"] = item.status
                        item["status_delivery"] = item.status_delivery
                        item['hrs_value'] = item['is_hrs'] ? true : false
                        item['created_at'] = item.created_at
                    })
                    this.dataTable = arr;

                    this.pagination.page = res.data.meta.current_page;
                    this.pagination.limit = parseInt(res.data.meta.per_page);
                    this.pagination.page_size = res.data.meta.last_page;
                } else {
                    this.dataTable = []
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        closeDialogConfirm(){
            this.confirmDialog = false
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
        showData(row) {
            this.$router.push(`/delivery/runsheet/${this.listenEmployeeId}/edit/${row.delivery_runsheet_number}/${row.created_at.split(' ')[0]}`);
            this.setRoutePageHistory(this.$route.meta, false);
        },
    },
    mounted() {
    }
}
</script>