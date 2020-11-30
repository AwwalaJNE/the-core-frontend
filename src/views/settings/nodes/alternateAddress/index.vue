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

        <dialog-create-edit-AltAddress
            :active="dialogAltAddress" 
            :closeDialog="closeDialogAltAddress"
            @refresh="refresh"
            title="Edit Alternate Address"
            :dataItem="dataItem"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import dialogCreateAltAddress from "@/views/settings/nodes/alternateAddress/dialogCreateAltAddress"
export default {
    name:"alternate-address-alt",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-AltAddress": dialogCreateAltAddress
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "node_alternate_address_id",
                    width: "xs"
                },
                {
                    label: "Node Id",
                    key: "node_id",
                    width: "xs"
                },
                {
                    label: "Alternate address name",
                    key: "node_alternate_address_name",
                    width: "auto"
                },
                {
                    label: "Alternate address",
                    key: "node_alternate_address_address",
                    width: "auto"
                },
                {
                    label: "Alternate address phone",
                    key: "node_alternate_address_phone",
                    width: "auto"
                },
                {
                    label: "Alternate address subdistrict id",
                    key: "node_alternate_address_subdistrict_id",
                    width: "xs"
                },            
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogAltAddress: false,
            pagination: {
                limit:5,
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
                query = q
            }
            await axios
                .get(this.URL.node_alternate_address + 
                `?n=1&sort_order=desc&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res)
                    this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        this.openNotification('warn', 'tariff data is empty!', ' Please create a new tariff data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate tariff list', err)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.node_alternate_address_id === val.node_alternate_address_id
                })
                this.dataItem = obj[0]
                console.log(this.dataItem, 'nihh val', val)
                this.$nextTick(() => {
                    this.dialogAltAddress = true
                });
            }
        },
        closeDialogConfirm(){
            this.confirmDialog = false
        },
        confirm(val) {
            if(val) {

            }
        },
        async actionRemove(val){
            // this.confirmDialog = true
            await axios
                .delete(
                    this.URL.node_alternate_address + `/${val.node_alternate_address_id}`,
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.refresh()
                    this.openNotification(null, 'Delete success', 'Delete tariff is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Delete failed', err.response ? err.response.data.message : 'something went wrong')
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
        closeDialogAltAddress() {
            this.dialogAltAddress = false
        }
    },
    mounted() {
        this.refresh()
    }
}
</script>