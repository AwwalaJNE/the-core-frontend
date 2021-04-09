<!--
    - @desc component yang handle crud frontend connote item
    - @param -
    - @emit -
    - @props -
-->

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
        @actionUpdate="actionUpdate"
        @actionRemove="actionRemove"
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
    name:"list-user",
    mixins: [master],
    props: {
        query: String,
        queryBag: String,
        queryInventory: String

    },
    components: {
        "table-master" : TableMaster
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.status_bag, this.statusinventory)
                }
            }
        }

    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "counter",
                    width: "xs"
                },
                {
                    label: "Date/Time",
                    key: "activity_date",
                    width: "sm"
                },
                {
                    label: "PIC",
                    key: "user_name",
                    width: "xs"
                },
                {
                    label: "Node",
                    key: "node_name",
                    width: "sm"
                },
                {
                    label: "Activity",
                    key: "activity_code",
                    width: "auto"
                },
                {
                    label: "Description",
                    key: "activity_description",
                    width: "auto"
                },
                
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogUser: false,
            connote_number:"",
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
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
                .get(
                    this.URL.connote +
                    `/${this.connote_number}/activity?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}`,
                    this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    arr.map((item, index) => {
                        item["counter"] = index+1
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.hasOwnProperty('meta') ? res.data.meta.current_page : 1
                    this.pagination.limit = res.data.hasOwnProperty('meta') ? parseInt(res.data.meta.per_page) : 20
                    this.pagination.page_size = res.data.hasOwnProperty('meta') ? res.data.meta.last_page : 1
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate activity list', err)
                })
        },
        actionUpdate(val){
            
        },
        async actionRemove(val){
            
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        closeDialogUser(){
            this.dialogUser = false
        },
        showData(){

        },
        getParamRoute(){
          if(this.$route.params.id){
            console.log(this.$route.params.id,'conno');
            this.connote_number = this.$route.params.id
          }
        },
    },
    mounted() {
        this.getParamRoute()
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
    },
}
</script>