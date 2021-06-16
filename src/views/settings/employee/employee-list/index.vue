<template>
    <div>
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

export default {
    name:"employee-list",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "dialog-confirm": DialogConfirm,
        "dialog-create-edit-employee": DialogCreateEditEmployee
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
            }
        }
    },
    methods: {
        async getTableData(limit,page,q) {
            this.loading = true
            let query = "";
            if(q !== undefined) {
                this.tempSearch = q
                query = q
            }
            await axios
                .get(this.URL.employee + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res)
                    if(res.data.data.length > 0) {
                        res.data.data.map(item=>{
                            item['node_name'] = item.node ? item.node.node_name : '-'
                        })
                        this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    } else {
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
            // val["employee_node_id"] = val[""]
            this.dataItem = val
            console.log(this.dataItem,'item')
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
            this.getTableData(this.pagination.limit,this.pagination.page, this.tempSearch)
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
        }
    },
    mounted() {
        this.refresh()
    },
}
</script>