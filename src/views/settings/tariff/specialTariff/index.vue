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

        <dialog-create-edit-SpecialTariff
            :active="dialogTariffSpecial" 
            :closeDialog="closeDialogTariffSpecial"
            :refresh="refresh"
            title="Edit Special Tariff"
            :dataItem="dataItem"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import dialogCreateEditSpecialTariff from "@/views/settings/tariff/specialTariff/dialogCreateEditSpecialTariff"
export default {
    name:"base-tariff-special",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-SpecialTariff": dialogCreateEditSpecialTariff
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "tariff_id",
                    width: "xs"
                },
                {
                    label: "Group",
                    key: "tariff_group",
                    width: "auto"
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
                    label: "Tariff amount 1 (Rp)",
                    key: "tariff_amount_1",
                    width: "auto",
                    textAlign: "right"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogTariffSpecial: false,
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
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {

                    this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'tariff special data is empty!', ' Please create a new tariff special data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate tariff special list', err)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.tariff_special_id === val.tariff_special_id
                })
                this.dataItem = obj[0]

                this.$nextTick(() => {
                    this.dialogTariffSpecial = true
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
                    this.URL.tariff_special + `/${val.tariff_special_id}`,
                    this.Helper.header())
                .then(res => {

                    this.refresh()
                    this.openNotification(null, 'Delete success', 'Delete tariff special is success')
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
        closeDialogTariffSpecial() {
            this.dialogTariffSpecial = false
        }
    },
    mounted() {
        this.refresh()
    }
}
</script>