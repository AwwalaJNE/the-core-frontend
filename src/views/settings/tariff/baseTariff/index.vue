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

        <dialog-create-edit-Tariff
            :active="dialogTariff" 
            :closeDialog="closeDialogTariff"
            :refresh="refresh"
            title="Edit Tariff"
            :dataItem="dataItem"
            />

        <!-- dialog confirm remove tariff-->
        <dialog-confirm
                :active="activeDialogTariff"
                :loading="activeLoadingTariff"
                :closeDialog="closeDialogConfirmTariff"
                title="Remove Tariff"
                message="Are you sure you want to Remove Tariff ?"
                @confirm="confirmTariff"
                @cancel="closeDialogConfirmTariff"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import dialogCreateEditTariff from "@/views/settings/tariff/baseTariff/dialogCreateEditTariff"
export default {
    name:"base-tariff-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-confirm": DialogConfirm,
        "dialog-create-edit-Tariff": dialogCreateEditTariff
    },
    data() {
        return {
            activeDialogTariff:false,
            activeLoadingTariff:false,
            dataTable: [],
            datacolumn: [
                {
                    label: "Tariff Group",
                    key: "tariff_group",
                    width: "sm"
                },
                {
                    label: "Origin",
                    key: "tariff_origin",
                    width: "auto"
                },
                {
                    label: "Destination",
                    key: "tariff_destination",
                    width: "auto"
                },
                {
                    label: "Tariff service code",
                    key: "tariff_service_code",
                    width: "auto"
                },
                {
                    label: "Tariff amount 1",
                    key: "tariff_amount_1",
                    width: "auto"
                },
                {
                    label: "Tariff Customer Code",
                    key: "customer_name",
                    width: "auto"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogTariff: false,
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
                .get(this.URL.tariff + 
                `?n=${this.listenNodeId}&sort_order=asc&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res)
                    this.dataTable = res.data.data
                    this.dataTable.length > 0 && this.dataTable.map((item) => {
                        let tariff_amount = []
                        let tariff_weight = []
                        let iterate = 1
                        let children = {}
                        let keys = Object.keys(item)

                        keys.map((header, i) => {
                            if(header.includes('_amount_') || header.includes('_weight_')) {
                                if(item.hasOwnProperty(`tariff_amount_${iterate}`)) {
                                        let obj = {}
                                        let val = item[`tariff_amount_${iterate}`]
                                        val != undefined && val != null && val != 0 ? 
                                        obj[`tariff_amount_${iterate}`] = item[`tariff_amount_${iterate}`] : obj

                                        tariff_amount.push(obj)
                                        
                                } 
                                if(item.hasOwnProperty(`tariff_weight_${iterate}`)) {
                                        let obj = {}
                                        let val = item[`tariff_weight_${iterate}`]
                                        val != undefined && val != null && val != 0 ? 
                                        obj[`tariff_weight_${iterate}`] = item[`tariff_weight_${iterate}`] : obj
                                        
                                        
                                        tariff_weight.push(obj)
                                        
                                }
                                iterate++
                            }
                            
                        })

                        children['tariff_amount'] = tariff_amount
                        children['tariff_weight'] = tariff_weight


                        item['children'] = children

                    })

                    console.log('this.dataTable', this.dataTable)

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'tariff data is empty!', ' Please create a new tariff data')
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
                    return item.tariff_id === val.tariff_id
                })
                this.dataItem = obj[0]
                console.log(this.dataItem, 'nihh val', val)
                this.$nextTick(() => {
                    this.dialogTariff = true
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
          this.activeDialogTariff = true;
          this.tariff_id = val.tariff_id;
        },
        confirmTariff(){
          this.removeTariff();
        },
        async removeTariff(){
            // this.confirmDialog = true
            await axios
                .delete(
                    this.URL.tariff + `/${this.tariff_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.refresh()
                    this.closeDialogConfirmTariff();
                    this.openNotification(null, 'Delete success', 'Delete tariff is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialogConfirmTariff();
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
        closeDialogTariff() {
            this.dialogTariff = false
        },
        closeDialogConfirmTariff(){
          this.activeDialogTariff=false
          this.activeLoadingTariff=false
        }
    },
    mounted() {
        this.refresh()
    }
}
</script>