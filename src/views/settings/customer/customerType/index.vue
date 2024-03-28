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
            <dialog-create-edit-customer-type 
                :active="dialogCustomerType" 
                :closeDialog="closeDialogCustomerType"
                :refresh="refresh"
                title="Edit customer Type"
                :dataItem="dataItem"
                btnBlue="Edit"
            />

            <dialog-confirm
                :active="activeDialogRemove"
                :loading="activeLoadingRemove"
                :closeDialog="closeDialogConfirmRemove"
                title="Remove Customer Type"
                message="Are you sure you want to remove Customer Type ?"
                @confirm="confirmRemove"
                @cancel="closeDialogConfirmRemove"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateEditCustomerType from "@/views/settings/customer/customerType/dialogCreateEditCustomerType"
import DialogConfirm from "@/components/dialog/dialogConfirm"

export default {
    name:"customer-type-list",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-customer-type": DialogCreateEditCustomerType,
        "dialog-confirm": DialogConfirm
    },
    props: {
        query: String
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
    data() {
        return {
            dialogCustomerType:false,
            activeDialogRemove:false,
            activeLoadingRemove:false,
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "customer_type_id",
                    width: "xs"
                },
                {
                    label: "Customer Type",
                    key: "customer_type_name",
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
            customer_type_id: '',
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
                .get(this.URL.customer_type + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    arr.map(item =>{
                      item['status'] = item.is_active === true ? 'Active' : 'Inactive'
                    })
                    this.dataTable = res.data.data

                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length == 0) {
                        // this.openNotification('warn', 'Failed to populate country data', ' data is empty or not found, please check your keyword in the input search')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate country list', err)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.customer_type_id === val.customer_type_id
                })
                this.dataItem = obj[0]
                console.log(this.dataItem, 'nihh val', val)
                this.$nextTick(() => {
                    this.dialogCustomerType = true
                });
            }
        },
        actionRemove(val){
            this.customer_type_id = val.customer_type_id
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        closeDialogCustomerType() {
            this.dialogCustomerType = false
        },

        closeDialogConfirmRemove(){
          this.activeDialogRemove = false
          this.activeLoadingRemove=false
        },
         confirmRemove() {
          this.activeLoadingRemove=true
          this.removeCustomer()
        },
        async removeCustomer(){
          await axios
              .delete(this.URL.customer_type + `/${this.customer_type_id}?n=${this.listenNodeId}`,
                  this.Helper.header())
              .then(res => {
                this.closeDialogConfirmRemove()
                this.activeLoadingRemove = false
                this.refresh()
                this.openNotification(null, 'Success', 'Delete Customer Type is success')
              }).catch(err => {
                this.activeLoadingRemove = false
                this.closeDialogConfirmRemove()
                this.refresh()
                this.openNotification('danger', 'Delete Customer Type is failed', err)
              })
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>