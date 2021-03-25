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
            <dialog-create-edit-customer 
                :active="dialogCustomer" 
                :closeDialog="closeDialogCustomer"
                :refresh="refresh"
                title="Edit customer"
                :dataItem="dataItem"
                btnBlue="Edit"
            />

            <dialog-confirm
                :active="activeDialogRemove"
                :loading="activeLoadingRemove"
                :closeDialog="closeDialogConfirmRemove"
                title="Remove Customer"
                message="Are you sure you want to remove Customer ?"
                @confirm="confirmRemove"
                @cancel="closeDialogConfirmRemove"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateEditCustomer from "@/views/settings/customer/customerList/dialogCreateEditCustomer"
import DialogConfirm from "@/components/dialog/dialogConfirm"

export default {
    name:"customer-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-customer": DialogCreateEditCustomer,
        "dialog-confirm": DialogConfirm
    },
    data() {
        return {
            dialogCustomer:false,
            activeDialogRemove:false,
            activeLoadingRemove:false,
            dataTable: [],
            datacolumn: [
                {
                    label: "Customer Name",
                    key: "customer_name",
                    width: "sm"
                },
                {
                    label: "Customer Type",
                    key: "customer_type_name",
                    width: "auto"
                },
                {
                    label: "Customer Phone",
                    key: "customer_phone",
                    width: "auto"
                },
                {
                    label: "Customer Code",
                    key: "customer_code",
                    width: "auto"
                },
                {
                    label: "Status",
                    key: "status",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            customer_id:'',
            pagination: {
                limit:20,
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
                this.tempSearch = q
                query = q
            }
            await axios
                .get(this.URL.customer + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res,'cus')
                    if(res.data.data.length > 0) {
                        if(res.data.data.length > 0){
                            res.data.data.map(item =>{
                                item['customer_type_name'] = item.customer_type.customer_type_name
                                if(item.is_active == true){
                                    item['status'] = 'Active'
                                }else{
                                    item['status'] = 'Unactive'
                                }
                            })
                            this.dataTable = res.data.data

                            this.pagination.page = res.data.meta.current_page
                            this.pagination.limit = parseInt(res.data.meta.per_page)
                            this.pagination.page_size = res.data.meta.last_page

                        }
                        
                    } else {
                        this.dataTable = [];
                        this.openNotification('warn', 'Customer data is empty!', ' Please create a new Customer')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate customer list', err)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    item['n'] = parseInt(item.customer_node_id)
                    return item.customer_id === val.customer_id
                })
                this.dataItem = obj[0]
                console.log(this.dataItem, 'nihh val', val)
                this.$nextTick(() => {
                    this.dialogCustomer = true
                });
            }
        },
        actionRemove(val){
            this.customer_id = val.customer_id
            this.activeDialogRemove = true
        },
        refresh(){
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
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
        closeDialogCustomer() {
            this.dialogCustomer = false
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
              .delete(this.URL.customer + `/${this.customer_id}?n=${this.listenNodeId}`,
                  this.Helper.header())
              .then(res => {
                this.closeDialogConfirmRemove()
                this.activeLoadingRemove = false
                this.refresh()
                this.openNotification(null, 'Success', 'Delete Customer is success')
              }).catch(err => {
                this.activeLoadingRemove = false
                this.closeDialogConfirmRemove()
                this.refresh()
                this.openNotification('danger', 'Delete Customer is failed', err)
              })
        },
    },
    mounted() {
        this.refresh()
    }
}
</script>