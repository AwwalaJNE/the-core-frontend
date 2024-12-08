<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="6">
                <vs-row>
                    <vs-col w="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy"
                            :valueData="dateParams" :selectedValue="filterDateBy" />
                    </vs-col>
                    <vs-col w="8">
                        <date-time :name="''" :rules="''" :valueData="dateRange"
                            typeInput="daterange" @updateValue="updateValue" />
                    </vs-col>
                </vs-row>
            </vs-col>
            <vs-col xs="12" sm="12" lg="6">
                <vs-row justify="end">
                    <vs-col xs="6" sm="8" lg="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"
                            :valueData="searchParams" :selectedValue="searchBy" />
                    </vs-col>
                    <vs-col xs="6" sm="4" lg="4">
                        <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" />
                    </vs-col>
                </vs-row>
            </vs-col>
        </vs-row>
        <table-master 
        :dataTable="dataTable" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="true"
        :hasPagination="true"
        @actionUpdate="actionUpdate"
        @actionRemove="actionRemove"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        />

        <!--Create User Dialog end-->
            <dialog-create-edit-employee-type 
                :active="dialogEmployeeType" 
                :closeDialog="closeDialogEmployeeType"
                @refresh="refresh"
                title="Edit employee Type"
                :dataItem="dataItem"
            />

            <dialog-confirm
                :active="activeDialogRemove"
                :loading="activeLoadingRemove"
                :closeDialog="closeDialogConfirmRemove"
                title="Remove Employee Type"
                message="Are you sure you want to remove Employee Type ?"
                @confirm="confirmRemove"
                @cancel="closeDialogConfirmRemove"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateEditEmployeeType from "@/views/settings/employee/employee-type/dialogCreateEditEmployeeType"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"

export default {
    name:"employee-list",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-employee-type": DialogCreateEditEmployeeType,
        "dialog-confirm": DialogConfirm,
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "date-time": DateTime,
    },
    props: {
        query: String
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
                }
            }
        }
    },
    data() {
        return {
            dialogEmployeeType:false,
            activeDialogRemove:false,
            activeLoadingRemove:false,
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "table_id",
                    width: "xs"
                },
                {
                    label: "Employee Type",
                    key: "employee_type_name",
                    width: "sm"
                },
               
                {
                    label: "Status",
                    key: "status",
                    width: "sm"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            employee_type_id: '',
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            dateRange: [],
            searchBy: "employee_type_name",
            filterDateBy: "create",
            searchPlaceholder: "Search Employee Type Name",
            searchParams: [
                {
                    label: "Employee Type",
                    value: "employee_type_name"
                },
               
                {
                    label: "Status",
                    value: "status"
                },
            ],
            dateParams: [
              {
                label: 'Created Date',
                value: 'create'
              }
            ]
        }
    },
    methods: {
        async getTableData(limit,page,q,from,to) {
            this.loading = true
            let startDate = "";
            let endDate = "";
            
            let query = (q !== undefined) ? (q.toLowerCase() === 'active' ? 1 : (q.toLowerCase() === 'unactive' ? 0 : q)) : "";
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            await axios
                .get(this.URL.employee_type + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, 
                this.Helper.header())
                .then(res => {

                    let arr = res.data.data
                    arr.map((item, idx) =>{
                        item['table_id'] = idx+1
                        item['status'] = item.is_active === true ? 'Active' : 'Inactive'
                    })
                    if(res.data.data.length > 0) {
                        this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    } else {
                        // this.openNotification('warn', null, 'node commission data is empty!', ' Please create a new node commission')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate node commission list', err)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.employee_type_id === val.employee_type_id
                })
                this.dataItem = obj[0]

                this.$nextTick(() => {
                    this.dialogEmployeeType = true
                });
            }
        },
        actionRemove(val){
            this.employee_type_id = val.employee_type_id
            this.activeDialogRemove = true
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch,from,to)
        },
        closeDialogEmployeeType() {
            this.dialogEmployeeType = false
        },

        closeDialogConfirmRemove(){
          this.activeDialogRemove = false
          this.activeLoadingRemove=false
        },
         confirmRemove() {
          this.activeLoadingRemove=true
          this.removeEmployee()
        },
        async removeEmployee(){
          await axios
              .delete(this.URL.employee_type + `/${this.employee_type_id}?n=${this.listenNodeId}`,
                  this.Helper.header())
              .then(res => {
                this.closeDialogConfirmRemove()
                this.activeLoadingRemove = false
                this.refresh()
                this.openNotification(null, 'Success', 'Delete Employee Type is success')
              }).catch(err => {
                this.activeLoadingRemove = false
                this.closeDialogConfirmRemove()
                this.refresh()
                this.openNotification('danger', err.response ? err.response.data.code : '', 'Delete Employee Type is failed', err)
              })
        },
        updateValue(key, val) {
            this.dateRange = val
            this.refresh()
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh()
        },
        updateSearchBy(key, val) {
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>