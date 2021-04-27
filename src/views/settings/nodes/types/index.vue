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
            title="Node Type"
            :dataItem="dataItem"
            btnBlue="Edit"
            />

            <!-- dialog confirm remove Costing-->
            <dialog-confirm
            :active="activeDialogRemove"
            :loading="activeLoadingRemove"
            :closeDialog="closeDialogConfirmRemove"
            title="Remove Node Type"
            message="Are you sure you want to Remove Node Type ?"
            @confirm="confirmRemove"
            @cancel="closeDialogConfirmRemove"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster"
import dialogCreateEditNodeType from "@/views/settings/nodes/types/dialogCreateEditNodeType"
import DialogConfirm from "@/components/dialog/dialogConfirm"
export default {
    name:"types-list",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array,
        node:String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit": dialogCreateEditNodeType,
        "dialog-confirm" : DialogConfirm
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "node_type_id",
                    width: "xs"
                },
                {
                    label: "Name",
                    key: "node_type_name",
                    width: "auto"
                },
                {
                    label: "Code",
                    key: "node_type_code",
                    width: "auto"
                },
                {
                    label: "Active",
                    key: "is_active",
                    width: "auto",
                    type: "boolean|disabled",
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
            node_type_id: ""
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
                .get(this.URL.node_type + 
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
                        // this.openNotification('warn', 'Node type data is empty!', ' Please create a new node type')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate node type list', err)
                })
        },
        actionUpdate(val, key) {
            switch(key) {
                case "edit":
                    if(this.dataTable.length > 0) {
                        this.dataItem = val
                        // this.dataItem.node_type_id = val.node_type_id
                        

                        console.log(this.dataItem,'item')
                        this.$nextTick(() => {
                            this.dialogCreateEdit = true
                        });
                    }
                    break;
                case "remove":
                    this.node_type_id = val.node_type_id;
                    this.node_type_id != "" && this.node_type_id != undefined ? this.activeDialogRemove = true : this.openNotification('warn', 'Node type remove is failed', '')
                    break;
                default:
                    //
            }
        },
        confirmRemove() {
          this.activeLoadingRemove = true;
          this.removeCosting();
        },
        closeDialogConfirmRemove(){
          this.activeDialogRemove = false
          this.activeLoadingRemove=false
          this.node_type_id = ""
        },
        closeDialogCreateEdit() {
            this.dialogCreateEdit = false
            this.dataItem = {}
            this.node_type_id = ""
        },
        async removeCosting(){
            await axios
                .delete(
                    this.URL.node_type + `/${this.node_type_id}?n=${this.listenNodeId}`,
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