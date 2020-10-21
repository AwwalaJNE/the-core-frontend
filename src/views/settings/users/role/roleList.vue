<!--
    - @desc component yang handle crud frontend user role
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
        :hasAction="true"
        @actionUpdate="actionUpdate"
        @actionRemove="actionRemove"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        />

        <!--Create User Dialog end-->
            <dialog-create-edit-role 
            :active="dialogRole" 
            :closeDialogRole="closeDialogRole"
            title="Edit role"
            :dataItem="dataItem"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateEditRole from "@/views/settings/users/role/dialogCreateEditRole"
export default {
    name:"Role-list",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-role": DialogCreateEditRole
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "user_role_id",
                    width: "xxs"
                },
                {
                    label: "Roles",
                    key: "user_role_name",
                    width: "auto"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogRole: false,
            pagination: {
                limit:5,
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
                .get(this.URL.role + 
                `?n=1&sort_order=desc&&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res)
                    if(res.data.data.length > 0) {
                        this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    } else {
                        this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to collect users list', err)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.user_role_id === val
                })
                this.dataItem = obj[0]
                console.log(this.dataItem, 'nihh val', val)
                this.$nextTick(() => {
                    this.dialogRole = true
                });
            }
        },
        async actionRemove(val){
            await axios
                .delete(
                    this.URL.role + `/${this.user_role_id}`,
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.openNotification(null, 'Success', 'Update role is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Update role is failed', err)
                })
        },
        actionLimit(val){
            this.pagination.limit = val
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
        actionPagination(val) {
            this.pagination.page = val
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
        refresh(){
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
        closeDialogRole() {
            this.dialogRole = false
        }
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page)
    },
}
</script>