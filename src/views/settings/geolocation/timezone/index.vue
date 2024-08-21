<template>
    <div>
        <vs-row justify="end">
            <vs-col xs="6" sm="8" lg="3">
                <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"
                    :valueData="searchParams" :selectedValue="searchBy" />
            </vs-col>
            <vs-col xs="6" sm="4" lg="2">
                <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" />
            </vs-col>
        </vs-row>
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
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"

export default {
    name:"timezone-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        // "dialog-create-edit-role": DialogCreateEditRole
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput
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
                limit:20,
                page_size: 1,
                page: 1
            },
            searchBy: "name",
            searchPlaceholder: "Search Name",
            searchParams: [
                {
                    label: "Name",
                    value: "name",
                },
                {
                    label: "Code time zone",
                    value: "code",
                },
            ],
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
                `?n=${this.listenNodeId}&sort_order=desc&limit=${1000}&page=${1}&s=${query}&search_by=${this.searchBy}`, 
                this.Helper.header())
                .then(res => {

                    this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        this.openNotification('warn', null, 'provinces data is empty!', ' Please create a new province data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate province list', err)
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh()
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>