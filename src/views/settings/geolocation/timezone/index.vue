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
        :hasPagination="false"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        />

        <!--Create User Dialog end-->
            <!-- <dialog-create-edit-role 
            :active="dialogRole" 
            :closeDialogRole="closeDialogRole"
            :refresh="refresh"
            title="Edit role"
            :dataItem="dataItem"
            /> -->
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"timezone-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        // "dialog-create-edit-role": DialogCreateEditRole
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Name",
                    key: "name",
                    width: "auto"
                },
                {
                    label: "Code",
                    key: "code",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogGeolocation: false,
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            }
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
                }
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
                .get(this.URL.geolocation_timezone + 
                `?n=1&sort_order=desc&limit=${1000}&page=${1}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res)
                    this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        this.openNotification('warn', 'provinces data is empty!', ' Please create a new province data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate province list', err)
                })
        },
        actionUpdate(){

        },
        actionRemove(){

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
            console.log("refresh")
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>