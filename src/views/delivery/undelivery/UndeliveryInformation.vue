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
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
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
                    width: "md"
                },
                {
                    label: "DRI Number",
                    key: "dri",
                    width: "md"
                },
            ],
            loading: false,
            tempDate: [],
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
        }
    },
    methods: {
        async getTableData(limit,page) {
            this.loading = true

            await axios
                .get(this.URL.courier_delivery + `/${this.listenEmployeeId}/undelivery?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}`,
                this.Helper.header())
                .then(res => {
                    if (res.data.data.length > 0) {
                        let arr = res.data.data
                        arr.map((item, index) => {
                            item["no"] = index + 1;
                            item["koli_number"] = item.koli_number;
                            item["delivery_runsheet_number"] = item.delivery_runsheet_number
                            item["dri"] = item.dri
                        })
                        this.dataTable = arr;

                        this.$emit('total-connote', res.data.data.length);

                        this.pagination.page = res.data.meta.current_page;
                        this.pagination.limit = parseInt(res.data.meta.per_page);
                        this.pagination.page_size = res.data.meta.last_page;
                    } else {
                        this.dataTable = []
                    }
                }).catch(err => {
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate Undelivery list', err)
                })
            this.loading = false
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
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
    },
    mounted() {
    }
}
</script>