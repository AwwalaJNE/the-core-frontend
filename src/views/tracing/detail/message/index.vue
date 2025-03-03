<template>
    <div>
        <table-master 
            hideColumnKey="tracing-message" 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loadingMessage"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="false"
            :hasPagination="true"
            @actionPagination="actionPagination"
            @actionLimit="actionLimit"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import moment from "moment";
import TableMaster from "@/components/table/tableMaster.vue"

export default {
    name:"tracing-message-list",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array,
        searchBy: String,
        filterDateBy: String
    },
    components: {
        "table-master" : TableMaster,
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
                }
            }
        },
        dateFilter: function(val, old) {
            if (val !== undefined) {
                this.dateRange = val;
                this.startDate = this.dateRange[0] !== null ? moment(this.dateRange[0]).format("YYYY-MM-DD") : "";
                this.endDate = this.dateRange[1] !== null ? moment(this.dateRange[1]).format("YYYY-MM-DD") : "";

                if (old !== null && old !== undefined) {
                    if (this.startDate !== old[0] || this.endDate !== old[1]) {
                        this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate);
                    }
                }
            } else {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, "", "");
            }
        },
    },
    data() {
        return {
            koli_number: this.$route.params.id,
            dataTable: [],
            datacolumn: [
                {
                    label: "Date",
                    key: "created_at",
                    width: "sm"
                },
                {
                    label: "User",
                    key: "user_login",
                    width: "sm"
                },
                {
                    label: "Receiver Phone",
                    key: "receiver_phone",
                    width: "sm"
                },
                {
                    label: "Message",
                    key: "message",
                    width: "auto"
                }
            ],
            loadingMessage: false,
            dataItem: {},
            dateRange: [],
            startDate: this.dateFilter[0] ? this.dateFilter[0] : "",
            endDate: this.dateFilter[1] ? this.dateFilter[1] : "",
            tempSearch: this.query ? this.query : "",
            dialogRole: false,
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            }
        }
    },
    methods: {
        async getTableData(limit,page,q, from, to) {
            this.loadingMessage = true
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
                .get(this.URL.tracing +
                `/${this.koli_number}/message?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`,
                this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data

                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page

                    if(res.data.data.length == 0) {
                        if (query != "") {
                            this.openNotification('danger', err?.response?.data?.code ?? "", 'Tracing data message is empty!', ' data is empty or not found, please check your keyword in the input search')
                        }
                    }
                    
                    this.loadingMessage = false
                }).catch(err => {
                    this.loadingMessage = false
                    this.openNotification('danger', err?.response?.data?.code ?? "", 'Failed to populate Tracing data message list', err?.response?.data?.message ?? 'Something went wrong');
                })
        },
        closeDialogRole() {
            this.dialogRole = false
        },
        actionPagination(val) {
            this.pagination.page = val
            this.refreshMessage()
        },
        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.refreshMessage()
        },
        refreshMessage(){
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
        }
    },
    mounted() {
        this.refreshMessage()
    },
}
</script>