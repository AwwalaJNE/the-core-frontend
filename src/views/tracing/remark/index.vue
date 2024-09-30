<template>
    <div>
        <table-master 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loadingRemark"
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
    name:"tracing-runsheet-list",
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
                    label: "Status",
                    key: "lov_value",
                    width: "sm"
                },
                {
                    label: "Remarks",
                    key: "remarks",
                    width: "auto"
                }
            ],
            loadingRemark: false,
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
            this.loadingRemark = true
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
                `/${this.koli_number}/remark?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    } else {
                        this.dataTable = []
                        
                        if (query != "") {
                            this.openNotification('danger', err?.response?.data?.code ?? "", 'Tracing data remark is empty!', ' data is empty or not found, please check your keyword in the input search')
                        }
                    }

                    this.loadingRemark = false
                }).catch(err => {
                    this.loadingRemark = false
                    this.openNotification('danger', err?.response?.data?.code ?? "", 'Failed to populate Tracing data remark list', err?.response?.data?.message ?? 'Something went wrong');
                })
        },
        closeDialogRole() {
            this.dialogRole = false
        },
        actionPagination(val) {
            this.pagination.page = val
            this.refreshRemark()
        },
        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.refreshRemark()
        },
        refreshRemark(){
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
        }
    },
    mounted() {
        this.refreshRemark()
    },
}
</script>