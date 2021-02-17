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
                        <vs-col xs="6" sm="6" lg="6">
                            <date-time
                            :name="''"
                            :rules="''"
                            :formKey="'TRIGGER_DATE'"
                            :valueData="dateRange"
                            typeInput="daterange"
                            @updateValue="updateValue" />
                        </vs-col>
                        <vs-col xs="6" sm="3" lg="3">
                            <search-input ref="searchInput" @searchValue="searchValue"/>
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

        <dialog-return
            :active="dialogReturnActive" 
            :closeDialog="closeDialog"
            @refresh="refresh"
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
                    label: "Connote",
                    key: "koli_number",
                    width: "auto"
                },
                {
                    label: "Status Code",
                    key: "irregularity_status_code",
                    width: "auto"
                },
                {
                    label: "User",
                    key: "user_name",
                    width: "auto"
                },
                {
                    label: "Actions",
                    key: "manifest_number",
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
                .get(this.URL.irregularities +
                `?n=${this.listenNodeId}&irregularity_type=RETURN&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
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
                        this.openNotification('warn', 'Irreguralities Return data is empty!', ' Please create Irreguralities Return data')
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
    },
    mounted() {
        this.refresh()   
    }
}
</script>