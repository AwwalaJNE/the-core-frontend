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

            <dialog-create-edit-node
            :active="dialogNode" 
            :closeDialog="closeDialogNode"
            @refresh="refresh"
            btnBlue="Edit"
            title="Edit node"
            :dataItem="dataItem"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateEditNode from "@/views/settings/nodes/nodes/dialogCreateEditNode"
export default {
    name:"nodes-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-node": DialogCreateEditNode
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Code",
                    key: "node_code",
                    width: "sm"
                },
                {
                    label: "Name",
                    key: "node_name",
                    width: "auto"
                },
                {
                    label: "Address",
                    key: "node_address",
                    width: "auto"
                },
                {
                    label: "Phone",
                    key: "node_phone",
                    width: "auto"
                },
                {
                    label: "Pic",
                    key: "nodes_pic",
                    width: "auto"
                },
                {
                    label: "Remark",
                    key: "node_remark",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogNode: false,
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
                .get(this.URL.node + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                        this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate node list', err.response.data.message)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.node_id === val.node_id
                })
                this.dataItem = obj[0]
                // this.$store.dispatch("SET_NODE_MAPPICKER_LATITUDE", this.dataItem['node_lat'] ? this.dataItem['node_lat'] : 0)
                // this.$store.dispatch("SET_NODE_MAPPICKER_LONGITUDE", this.dataItem['node_lon'] ? this.dataItem['node_lon'] : 0)
                console.log(this.dataItem, 'nihh val', val)
                this.$nextTick(() => {
                    this.dialogNode = true
                });
            }
        },
        async actionRemove(val){
            await axios
                .delete(
                    this.URL.node + `/${val.node_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.refresh()
                    this.openNotification(null, 'Success', 'Delete node is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Delete node is failed', err)
                })
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
        closeDialogNode() {
            this.dialogNode = false
        }
    },
    mounted() {
        this.refresh()
    },
}
</script>