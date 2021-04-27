<template>
    <div>
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

        :customAction="true"
        :customActionList="customActionList"
        @actionUpdate="actionUpdate"
        />

        <!--Create User Dialog end-->
            <dialog-create-edit
            :active="dialogCreateEdit" 
            :closeDialog="closeDialogCreateEdit"
            @refresh="refresh"
            title="Node Commision"
            :dataItem="dataItem"
            btnBlue="Edit"
            />

            <!-- dialog confirm remove Costing-->
            <dialog-confirm
            :active="activeDialogRemove"
            :loading="activeLoadingRemove"
            :closeDialog="closeDialogConfirmRemove"
            title="Remove Node Commision"
            message="Are you sure you want to Remove Node Commision ?"
            @confirm="confirmRemove"
            @cancel="closeDialogConfirmRemove"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import dialogCreateEditNodeCommission from "@/views/settings/nodes/nodesCommision/dialogCreateEditNodeCommission"
import DialogConfirm from "@/components/dialog/dialogConfirm"
export default {
    name:"node-commision-list",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array,
        node:String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit": dialogCreateEditNodeCommission,
        "dialog-confirm" : DialogConfirm
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Node",
                    key: "node_commision_node",
                    width: "xs"
                },
                {
                    label: "Service",
                    key: "node_commision_service",
                    width: "auto"
                },
                {
                    label: "Daily",
                    key: "node_commision_daily",
                    width: "auto"
                },
                {
                    label: "Amount 1",
                    key: "node_commision_amount1",
                    width: "auto"
                },
                {
                    label: "Amount 2",
                    key: "node_commision_amount2",
                    width: "auto"
                },
            ],
            customActionList: [
              {
                label: 'Edit',
                key: 'edit',
                attribute: '',
              },
              {
                label: 'Remove',
                key: 'remove',
                attribute: 'danger',
              }
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogCreateEdit: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            activeDialogRemove:false,
            activeLoadingRemove:false,
            node_commission_id: ""
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
        },
        
        
    },
    methods: {
        refresh(){
            console.log("refresh")
            this.getTableData(this.pagination.limit, this.pagination.page)
        },
        async getTableData(limit,page,q) {
            this.loading = true
            let query = "";
            if(q !== undefined) {
                this.tempSearch = q
                query = q
            }
            await axios
                .get(this.URL.node_commission + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res)
                    if(res.data.data.length > 0) {
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
        actionUpdate(val, key) {
            switch(key) {
                case "edit":
                    if(this.dataTable.length > 0) {
                        this.dataItem = val
                        // this.dataItem.node_commission_id = val.node_commission_id
                        

                        console.log(this.dataItem,'item')
                        this.$nextTick(() => {
                            this.dialogCreateEdit = true
                        });
                    }
                    break;
                case "remove":
                    this.node_commission_id = val.node_commission_id;
                    this.node_commission_id != "" && this.node_commission_id != undefined ? this.activeDialogRemove = true : this.openNotification('warn', 'Node type remove is failed', '')
                    break;
                default:
                    //
            }
        },
        confirmRemove() {
          this.activeLoadingRemove = true;
          this.removeCommision();
        },
        closeDialogConfirmRemove(){
          this.activeDialogRemove = false
          this.activeLoadingRemove=false
          this.node_commission_id = ""
        },
        closeDialogCreateEdit() {
            this.dialogCreateEdit = false
            this.dataItem = {}
            this.node_commission_id = ""
        },
        async removeCommision(){
            await axios
                .delete(
                    this.URL.node_commission + `/${this.node_commission_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.refresh()
                    this.closeDialogConfirmRemove();
                    this.openNotification(null, 'Romove success', 'Node type is success')
                    
                }).catch(err => {
                    this.loading = false
                     this.closeDialogConfirmRemove();
                    this.openNotification('danger', 'Node type is failed', err)
                   
                })
        },
        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
        actionPagination(val) {
            this.pagination.page = val
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page)
    },
}
</script>