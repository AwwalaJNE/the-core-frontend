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
                        <date-time :name="''" :rules="''" :valueData="dateRange" typeInput="daterange" @updateValue="updateValue" />
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
            <!-- <dialog-create-edit-role 
            :active="dialogRole" 
            :closeDialogRole="closeDialogRole"
            :refresh="refresh"
            title="Edit role"
            :dataItem="dataItem"
            /> -->
          
        <!--Create Employee-->
            <dialog-create-edit-employee
                :active="dialogEmployee" 
                @refresh="refresh"
                :closeDialog="closeDialogEmployee"
                title="Edit Employee"
                :dataItem="dataItem"
                btnBlue="Edit"
            />


        <!-- dialog confirm remove Employee-->
        <dialog-confirm
          :active="activeDialogRemove"
          :loading="activeLoadingRemove"
          :closeDialog="closeDialogConfirmRemove"
          title="Remove Employee"
          message="Are you sure you want to Remove Employee ?"
          @confirm="confirmRemove"
          @cancel="closeDialogConfirmRemove"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import DialogCreateEditEmployee from "@/views/settings/employee/employee-list/dialogCreateEditEmployee"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"

export default {
    name:"employee-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-confirm": DialogConfirm,
        "dialog-create-edit-employee": DialogCreateEditEmployee,
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "date-time": DateTime
    },
    data() {
        return {
            activeDialogRemove:false,
            activeLoadingRemove:false,
            dialogEmployee:false,
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "employee_id",
                    width: "xs"
                },
                {
                    label: "NIK",
                    key: "employee_nik",
                    width: "auto"
                },
                {
                    label: "Name",
                    key: "employee_name",
                    width: "auto"
                },
                {
                    label: "Location",
                    key: "node_name",
                    width: "auto"
                },
                {
                    label: "Courier Code",
                    key: "employee_code",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            employee_id: '',
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            dateRange: [],
            searchBy: "employee name",
            filterDateBy: "create",
            searchPlaceholder: "Search Employee Name",
            searchParams: [
                {
                    label: "Employee ID",
                    value: "employee_id"
                },
                {
                    label: "Employee NIK",
                    value: "employee_nik"
                },
                {
                    label: "Employee Name",
                    value: "employee name"
                },
                {
                    label: "Node Location",
                    value: "node"
                },
                {
                    label: "Courier Code",
                    value: "employee_code"
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
        async getTableData(limit,page,q,from,to) {
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
                .get(this.URL.employee + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, 
                this.Helper.header())
                .then(res => {

                    if(res.data.data.length > 0) {
                        res.data.data.map(item=>{
                            item['node_name'] = item.node ? item.node.node_name : '-'
                        })
                        this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    } else {
                        this.dataTable = [];
                        // this.openNotification('warn', 'node commission data is empty!', ' Please create a new node commission')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate node commission list', err)
                })
        },
        actionUpdate(val){
          if(this.dataTable.length > 0) {
            val["employee_node_id"] = val["node"] ? val["node"]["node_name"] : ''
            this.dataItem = val

            this.$store.dispatch(`SET_EMPLOYEE_EMPLOYEE_NODE_ID_ValueData`, val["node"])

            this.$nextTick(() => {
              this.dialogEmployee = true
            });
          }
        },
        actionRemove(val){
            this.activeDialogRemove = true;
            this.employee_id = val.employee_id;
        },
        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.getTableData(this.pagination.limit,this.pagination.page, this.tempSearch)
        },
        actionPagination(val) {
            this.pagination.page = val
            this.getTableData(this.pagination.limit,this.pagination.page, this.tempSearch)
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
        confirmRemove(){
            this.removeEmployee();
        },
        async removeEmployee(){
            this.activeLoadingRemove=true
            await axios
                .delete(
                    this.URL.employee + `/${this.employee_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.refresh()
                    this.closeDialogConfirmRemove();
                    this.openNotification(null, 'Remove success', 'Romove Employee is success')
                    
                }).catch(err => {
                    let message = err.response.data ? err.response.data.message : 'Update Failed'
                    this.loading = false
                    this.closeDialogConfirmRemove();
                    this.openNotification('danger', 'Remove Employee is failed', message)
                   
                })
        },
        closeDialogConfirmRemove(){
            this.activeDialogRemove=false
            this.activeLoadingRemove=false
        },
        closeDialogEmployee(){
            this.dialogEmployee=false
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