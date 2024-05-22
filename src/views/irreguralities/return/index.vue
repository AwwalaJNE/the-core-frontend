<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Return</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    <div style="width: 100px;padding-right: 5px;">
                            <vs-button
                            flat
                            block
                            :active="true"
                            @click="openDialog"
                            > 
                                <i class="bx bx-plus"></i> New
                            </vs-button>
                    </div>
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
                    :hasAction="false"
                    :printAction="true"
                    @actionPrint="actionPrint"
                    />
                </div>
            </div>
            
        </section>

        <dialog-return
            :active="dialogReturnActive" 
            :closeDialog="closeDialog"
            :refresh="refresh"
        />
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
import SelectSearchBy from "@/components/search/selectSearchBy";

import DialogReturn from "@/views/irreguralities/return/dialogReturn"
export default {
    name:"irregularities-return",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "date-time": DateTime,
        "table-master" : TableMaster,
        "dialog-return" : DialogReturn,
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            koliCode: "",
            dateRange: [],
            tempSearch: "",
            dataTable: [],
            datacolumn: [
                {
                    label: "Created Date",
                    key: "created_at",
                    width: "auto"
                },
                {
                    label: "Old Connote",
                    key: "koli_number_original",
                    width: "auto"
                },
                {
                    label: "Return Connote",
                    key: "koli_number_return",
                    width: "auto"
                },
                {
                    label: "User",
                    key: "user_login",
                    width: "auto"
                },
            ],
            loading:false,
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            },
            dialogReturnActive: false,
            searchBy: "old connote",
            filterDateBy: "create",
            searchPlaceholder: "Search Old Connote",
            searchParams: [
              {
                label: 'Old Connote',
                value: 'old connote'
              },
              {
                label: "Return Connote",
                value: "return_connote",
              },
              {
                label: "User",
                value: "user",
              }
            ],
            dateParams: [
              {
                label: 'Created Date',
                value: 'create'
              },
            ]
        }
    },
    methods: {
        refresh(){
            
            let d = new Date()
            let from = ''
            let to = ''

            if(this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            } else {
                from = moment(d).format("YYYY-MM-DD")
                to = moment(d).format("YYYY-MM-DD")
            }
            console.log("refresh",this.dateRange,d, from, to)
            
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
            await axios
                .get(this.URL.return +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`,
                this.Helper.header())
                .then(res => {
                    // this.dataTable = res.data.data
                    let arr = res.data.data
                    
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'Irreguralities Return data is empty!', ' Please create Irreguralities Return data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Irreguralities Return', err)
                })
        },
        handleSubmit() {

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
        actionPrint(val){
            let routeData = this.$router.resolve({ 
                name: 'printGeneral', 
                params: { 
                    'id': val.koli_number_return, 
                    'type': 'koli-reprint',
                    'node_id': this.listenNodeId
                } 
            });
            window.open(routeData.href, '_blank');
        },
        openDialog(){
            this.dialogReturnActive = true
        },
        closeDialog() {
            this.dialogReturnActive = false
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