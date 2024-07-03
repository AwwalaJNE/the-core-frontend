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
            :hasLinked="['koli_number']"
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
import moment from "moment"
export default {
    name:"active-list",
    mixins: [master],
    props: {
        query: String,
        querySearch: String,
        queryDate: String,
        dateFilter: Array,
    },
    components: {
        "table-master" : TableMaster
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.querySearch, this.queryDate)
                }
            }
        },
        searchDateBy: function(val, old) {
          if(val !== undefined) {
            this.filterDateBy = val
            if(this.filterDateBy !== old) {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, this.searchByBag, val);
            }
          }
        },
        searchBy: function(val, old) {
          if(val !== undefined) {
            this.searchByBag = val
            if(this.searchByBag !== old) {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, val, this.filterDateBy);
            }
          }
        },
        dateFilter: function(val, old) {
            console.log("INII", val, old)
            if (val !== undefined) {
                this.tempDate = val;
                this.startDate = this.tempDate[0] !== null ? moment(this.tempDate[0]).format("YYYY-MM-DD") : "";
                this.endDate = this.tempDate[1] !== null ? moment(this.tempDate[1]).format("YYYY-MM-DD") : "";

                if (old !== null && old !== undefined) {
                    if (this.startDate !== old[0] || this.endDate !== old[1]) {
                        this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, this.querySearch, this.queryDate);
                    }
                }
            } else {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, "", "", this.querySearch, this.queryDate);
            }
        },
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Koli Number",
                    key: "koli_number",
                    width: "md"
                },
                {
                    label: "Bag Number",
                    key: "bag_number",
                    width: "md"
                },
                {
                    label: "Status Code",
                    key: "irregularity_status_code",
                    width: "xs"
                },
                {
                    label: "Type",
                    key: "irregularity_type",
                    width: "auto"
                },
                {
                    label: "Status Description",
                    key: "irregularity_status_description",
                    width: "auto"
                },
                {
                    label: "Remark",
                    key: "remark",
                    width: "auto"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "auto"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            tempDate: this.dateFilter ? this.dateFilter : [],
            startDate: "",
            endDate: "",
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            loadInterval: null
        }
    },
    methods: {
        pollData () {
            this.loadInterval = setInterval(() => {
                this.refresh()
            }, 60000) // 1 menit
        },
        async getTableData(limit,page,q, from, to, searchBy, filterDateBy) {
            this.loading = true
            let query = "";
            if(q !== undefined) {
                query = q
            }
            // TODO: CHANGE irregularity_type
            await axios
                .get(this.URL.irregularities +
                    `?n=${this.listenNodeId}&irregularity_type=PROBLEM&show_archive=false&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${from}&end_date=${to}&search_by=${searchBy}&filter_date_by=${filterDateBy}`,
                    this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    arr.map(item => {
                        item["is_confirmed"] = item.is_confirmed == 1 ? 'Confirmed' : 'Unconfirmed'
                        item["is_void_status"] = item.is_void == 1 ? 'YES' : '-'
                        item["packing_kayu_type"] = item.packing_kayu_type != null ? 'Y' : '-'
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate users list', err.response.data.message)
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
        refresh(val){
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate, this.querySearch, this.queryDate)
        },
        showData(row) {
          this.$router.push(`/connote-detail/${row.koli_number}`);
        },
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate, this.querySearch, this.queryDate)
        this.pollData()
    },
    beforeDestroy () {
        clearInterval(this.loadInterval) // prevent memory leaks
    }
}
</script>