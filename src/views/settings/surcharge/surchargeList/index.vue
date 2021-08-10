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
        :expandable="true"
        @actionUpdate="actionUpdate"
        @actionRemove="actionRemove"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        />

            <dialog-create-edit-Surcharge
            :active="dialogSurcharge" 
            :closeDialog="closeDialogSurcharge"
            @refresh="refresh"
            title="Edit Surcharge"
            :dataItem="dataItem"
            btnBlue="Edit"
            />

      <!-- dialog confirm remove surcharge-->
            <dialog-confirm
                :active="activeDialogRemove"
                :loading="activeLoadingRemove"
                :closeDialog="closeDialogConfirmRemove"
                title="Remove Surcharge"
                message="Are you sure you want to Remove Surcharge ?"
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
import dialogCreateEditSurcharge from "@/views/settings/surcharge/surchargeList/dialogCreateEditSurcharge"
export default {
    name:"surcharge-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-confirm": DialogConfirm,
        "dialog-create-edit-Surcharge": dialogCreateEditSurcharge
    },
    data() {
        return {
            activeDialogRemove:false,
            activeLoadingRemove:false,
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "surcharge_id",
                    width: "xs"
                },
                {
                    label: "Name",
                    key: "surcharge_name",
                    width: "xs"
                },
                {
                    label: "Surcharge formula",
                    key: "surcharge_formula",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            surcharge_id:'',
            tempSearch: this.query ? this.query : "",
            dialogSurcharge: false,
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
                .get(this.URL.surcharge + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data

                    this.dataTable.length > 0 && this.dataTable.map((item,i) => {
                        let keys = Object.keys(item)
                        keys = keys.filter(item => !item.includes('_id'))
                        let obj = {}
                        keys.map(header => {
                            obj[`${header}`] = item[header]
                        })
                        item['children'] = obj
                    })


                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'City data is empty!', ' Please create a new city data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate city list', err)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.surcharge_id === val.surcharge_id
                })
                this.dataItem = obj[0]
                this.dataItem.hasOwnProperty('surcharge_condition') ? this.dataItem['surcharge_condition'] = JSON.stringify(this.dataItem['surcharge_condition']) : ''
                this.dataItem.hasOwnProperty('surcharge_formula') ? this.dataItem['surcharge_formula'] = JSON.stringify(this.dataItem['surcharge_formula']) : ''
                this.$nextTick(() => {
                    this.dialogSurcharge = true
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
        actionRemove(val){
          this.activeDialogRemove = true;
          this.surcharge_id = val.surcharge_id;
        },
        confirmRemove(){
          this.removeSurcharge();
        },
        async removeSurcharge(){
            // this.confirmDialog = true
            await axios
                .delete(
                    this.URL.surcharge + `/${this.surcharge_id}/?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.refresh()
                    this.closeDialogConfirmRemove();
                    this.openNotification(null, 'Delete success', 'Delete surcharge is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialogConfirmRemove();
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
        closeDialogSurcharge() {
            this.dialogSurcharge = false
        },
        closeDialogConfirmRemove(){
          this.activeDialogRemove=false
          this.activeLoadingRemove=false
        }
    },
    mounted() {
        this.refresh()
    }
}
</script>