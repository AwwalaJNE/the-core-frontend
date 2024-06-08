<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Failed Connote</h2>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        <vs-col xs="12" sm="12" lg="6">
                            <vs-row>
                                <vs-col w="4">
                                    <select-search-by :isMultiple="false" :border="true"
                                        @updateSearchBy="updateFilterDateBy" :valueData="dateParams"
                                        :selectedValue="filterDateBy" />
                                </vs-col>
                                <vs-col w="8">
                                    <date-time
                                        :name="''"
                                        :rules="''"
                                        :formKey="'TRIGGER_DATE'"
                                        :valueData="dateRange"
                                        typeInput="daterange"
                                        @updateValue="updateValue" />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                        <vs-col xs="12" sm="12" lg="6">
                            <vs-row justify="end">
                                <vs-col xs="6" sm="8" lg="4">
                                    <select-search-by :isMultiple="false" :border="true"
                                        @updateSearchBy="updateSearchBy" :valueData="searchParams"
                                        :selectedValue="searchBy" />
                                </vs-col>
                                <vs-col xs="6" sm="4" lg="4">
                                    <search-input ref="searchInput" @searchValue="searchValue"
                                        :placeholder="searchPlaceholder" />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                    </vs-row>
                </div>

                <div class="mt-05">
                    <table-master 
                    :dataTable="dataTable" 
                    :dataColumn="datacolumn" 
                    :tableLoading="loading"
                    :pageSize="pagination.page_size"
                    :page="pagination.page"
                    :limit="pagination.limit"
                    :hasPagination="true"
                    @actionLimit="actionLimit"
                    @actionPagination="actionPagination"
                    />
                </div>
            </div>
            
        </section>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import moment from "moment"
import TableMaster from "@/components/table/tableMaster.vue"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import SelectSearchBy from "@/components/search/selectSearchBy"

export default {
    name:"irreguralities-failed",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "date-time": DateTime,
        "table-master" : TableMaster,
        "select-search-by": SelectSearchBy
    },
    data() {
        return {
            koliCode: "",
            dateRange: [],
            tempSearch: "",
            dataTable: [],
            dataItem: {},
            datacolumn: [
                {
                    label: "Failed Date",
                    key: "created_at",
                    width: "md"
                },
                {
                    label: "Koli",
                    key: "koli_number",
                    width: "auto"
                },
                {
                    label: "Status Code",
                    key: "irregularity_status_code",
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
                    label: "User",
                    key: "user_name",
                    width: "auto"
                },
            ],
            loading:false,
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            },
            form: {},
            searchBy: "koli number",
            filterDateBy: "create",
            searchPlaceholder: "Search Koli Number",
            searchParams: [
              {
                label: 'Koli number',
                value: 'koli number'
              },
              {
                label: "Status Code",
                value: "irregularity_status_code",
              },
              {
                label: "Status Description",
                value: "irregularity_status_description",
              },
              {
                label: "Remark",
                value: "remark",
              },
              {
                label: "User",
                value: "user_name",
              },
            ],
            dateParams: [
              {
                label: 'Failed Date',
                value: 'create'
              }
            ]
        }
    },
    methods: {
        refresh(){
            console.log("refresh")
            let d = new Date()
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            } else {
                from = moment(d).format("YYYY-MM-DD")
                to = moment(d).format("YYYY-MM-DD")
            }

            
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, from, to)
        },
        async getTableData(limit,page,q, from, to, node) {
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
            // TODO: Check this path
            await axios
                .get(this.URL.irregularities +
                `?n=${this.listenNodeId}&irregularity_type=FAILED&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = res.data.data
                        this.dataTable = arr
                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    } else {
                        this.openNotification('warn', 'Irreguralities Failed data is empty!', '')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Irreguralities Failed', err)
                })
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh()
        },
        updateValue(key, val) {
            switch(key) {
                case "TRIGGER_DATE":
                    this.dateRange = val
                    this.refresh()
                    console.log('dateRange',this.dateRange)
                    break;
                default:
                    console.log('meong')
                    // code block
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
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
        },
    },
    mounted() {
        this.refresh()   
    }
}
</script>