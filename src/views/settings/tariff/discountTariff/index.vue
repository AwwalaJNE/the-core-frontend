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

        <dialog-create-edit-discount-tariff
            :active="dialogDiscountTariff" 
            :closeDialog="closeDialogTariffDiscount"
            @refresh="refresh"
            title="Edit Discount Tariff"
            :dataItem="dataItem"
            />

        <!-- dialog confirm remove discount tariff-->
        <dialog-confirm
                :active="activeDialogDiscountTariff"
                :loading="activeLoadingTariff"
                :closeDialog="closeDialogTariffDiscount"
                title="Remove Discount Tariff"
                message="Are you sure you want to Remove Discount Tariff ?"
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
import dialogCreateEditDiscountTariff from "@/views/settings/tariff/discountTariff/dialogCreateEditDiscountTariff"
export default {
    name:"discount-tariff-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-confirm": DialogConfirm,
        "dialog-create-edit-discount-tariff": dialogCreateEditDiscountTariff
    },
    data() {
        return {
            activeDialogDiscountTariff:false,
            activeLoadingTariff:false,
            dataTable: [],
            datacolumn: [
                {
                    label: "Origin",
                    key: "discount_tariff_origin",
                    width: "sm"
                },
                {
                    label: "Destination",
                    key: "discount_tariff_destination",
                    width: "auto"
                },
                {
                    label: "Service",
                    key: "discount_tariff_service_code",
                    width: "auto"
                },
                {
                    label: "Daily Discount (%)",
                    key: "discount_tariff_persentase",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogDiscountTariff: false,
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
                .get(this.URL.discount_tariff + 
                `?n=${this.listenNodeId}&sort_order=asc&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res)
                    this.dataTable = res.data.data
                    this.dataTable.length > 0 && this.dataTable.map((item) => {
                        let up_to_amount = []
                        let up_to_discount = []
                        let iterate = 1
                        let children = {}
                        let keys = Object.keys(item)

                        keys.map((header, i) => {
                            if(header.includes('_amount_') || header.includes('_discount_')) {
                                if(item.hasOwnProperty(`up_to_amount_${iterate}`)) {
                                        let obj = {}
                                        let val = item[`up_to_amount_${iterate}`];
                                        obj[`up_to_amount_${iterate}`] = val !== undefined ? val : 0;

                                        up_to_amount.push(obj)
                                        
                                } 
                                if(item.hasOwnProperty(`up_to_discount_${iterate}`)) {
                                        let obj = {}
                                        let val = item[`up_to_discount_${iterate}`];
                                        obj[`up_to_discount_${iterate}`] = val !== undefined ? val : 0;
                                        
                                        
                                        up_to_discount.push(obj)
                                        
                                }
                                iterate++
                            }
                            
                        })

                        children['up_to_amount'] = up_to_amount
                        children['up_to_discount'] = up_to_discount


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
                    return item.discount_tariff_id === val.discount_tariff_id
                })
                this.dataItem = obj[0]
                // console.log(this.dataItem, 'nihh val', val)
                this.$nextTick(() => {
                    this.dialogDiscountTariff = true
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
          this.activeDialogDiscountTariff = true;
          this.discount_tariff_id = val.discount_tariff_id;
        },
        confirmTariff(){
          this.removeTariff();
        },
        async removeTariff(){
            // this.confirmDialog = true
            await axios
                .delete(
                    this.URL.discount_tariff + `/${this.discount_tariff_id}?n=${this.listenNodeId}`,
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
        closeDialogTariffDiscount() {
            this.dialogDiscountTariff = false
        },
        closeDialogConfirmTariff(){
          this.activeDialogDiscountTariff=false
          this.activeLoadingTariff=false
        }
    },
    mounted() {
        this.refresh()
    }
}
</script>