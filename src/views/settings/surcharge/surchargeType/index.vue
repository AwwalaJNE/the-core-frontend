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

        
            <dialog-create-SurchargeType
            :active="dialogSurchargeType" 
            :closeDialog="closeDialogSurchargeType"
            @refresh="refresh"
            btnBlue="Edit"
            title="Edit surcharge type"
            :dataItem="dataItem"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateEditSurchargeType from "@/views/settings/surcharge/surchargeType/dialogCreateEditSurchargeType"
export default {
    name:"surcharge-type",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-SurchargeType": DialogCreateEditSurchargeType
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "surcharge_type_id",
                    width: "xs"
                },
                {
                    label: "Name",
                    key: "surcharge_type_name",
                    width: "xs"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogSurchargeType: false,
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
                query = q
            }
            await axios
                .get(this.URL.surcharge_type + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data
                    this.dataTable.map(item => {
                        item["selected"] = item.is_active
                    })

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'surcharge type data is empty!', ' Please create a new surcharge type data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate surcharge type list', err)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.surcharge_type_id === val.surcharge_type_id
                })
                this.dataItem = obj[0]
                this.$nextTick(() => {
                    this.dialogSurchargeType = true
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
                    this.URL.surcharge_type + `/${val.surcharge_type_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.refresh()
                    this.openNotification(null, 'Delete success', 'Delete surcharge type is success')
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        closeDialogSurchargeType() {
            this.dialogSurchargeType = false
        }
    },
    mounted() {
        this.refresh()
    }
}
</script>