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
            @handleEdit="actionDetail"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"
export default {
    name:"history-list",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array,
        searchDateBy: String,
        searchBy: String,
    },
    components: {
        "table-master" : TableMaster,
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "date-time": DateTime
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.searchByBag, this.filterDateBy);
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
            if (val !== undefined) {
                this.dateRange = val;
                this.startDate = this.dateRange[0] !== null ? moment(this.dateRange[0]).format("YYYY-MM-DD") : "";
                this.endDate = this.dateRange[1] !== null ? moment(this.dateRange[1]).format("YYYY-MM-DD") : "";

                if (old !== null && old !== undefined) {
                    if (this.startDate !== old[0] || this.endDate !== old[1]) {
                        this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, this.searchByBag, this.filterDateBy);
                    }
                }
            } else {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, "", "", this.searchByBag, this.filterDateBy);
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
                },
                {
                    label: "Approved At",
                    key: "approved_at",
                    width: "auto"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dateRange: this.dateFilter ? this.dateFilter : [],
            filterDateBy: this.searchDateBy ? this.searchDateBy : "",
            searchByBag: this.searchBy ? this.searchBy : "",
            dialogRole: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            startDate: "",
            endDate: "",
            
        }
    },
    methods: {
        async getTableData(limit,page,q, from, to, searchByBag, filterDateBy) {
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

            // TODO: CHANGE irregularity_type
            await axios
                .get(this.URL.irregularities +
                    `?n=${this.listenNodeId}&irregularity_type=PROBLEM&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${from}&end_date=${to}&search_by=${searchByBag}&filter_date_by=${filterDateBy}`,
                    this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data

                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length == 0) {
                        if (query != "") {
                            this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate bag data', ' data is empty or not found, please check your keyword in the input search')
                        }
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate bag list', err)
                })
        },
        actionDetail(val){
            let bag = val.bag_number.replaceAll("/", "-")
            this.$router.push('/bagging-detail/'+bag)
        },
        actionPrint(val){
            let routeData = this.$router.resolve({ 
                name: 'printGeneral', 
                params: { 
                    'id': val.bag_number, 
                    'type': 'bag',
                    'node_id': this.listenNodeId
                } 
            });
        window.open(routeData.href, '_blank');
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
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, from, to, this.searchByBag, this.filterDateBy)
        },
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate, this.searchByBag, this.filterDateBy)
    },
}
</script>