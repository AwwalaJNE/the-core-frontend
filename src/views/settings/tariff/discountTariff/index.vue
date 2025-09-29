<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="6">
                <vs-row>
                    <vs-col w="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy"
                            :valueData="dateParams" :selectedValue="filterDateBy" />
                    </vs-col>
                    <vs-col w="8">
                        <date-time :name="''" :rules="''" :formKey="'TRIGGER_DATE'" :valueData="dateRange"
                            typeInput="daterange" @updateValue="updateValue" />
                    </vs-col>
                </vs-row>
            </vs-col>
            <vs-col xs="12" sm="12" lg="6">
                <vs-row justify="end">
                    <vs-col xs="6" sm="8" lg="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"
                            :valueData="searchParams" :selectedValue="searchBy" />
                    </vs-col>
                    <vs-col xs="6" sm="4" lg="4">
                        <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" />
                    </vs-col>
                </vs-row>
            </vs-col>
        </vs-row>
        <table-master 
        hideColumnKey="setting-discount-tariff" 
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
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"

export default {
    name:"discount-tariff-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-confirm": DialogConfirm,
        "dialog-create-edit-discount-tariff": dialogCreateEditDiscountTariff,
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "date-time": DateTime,
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
                {
                    label: "Created Date",
                    key: "created_at",
                    width: "auto"
                },
                {
                    label: "Created By",
                    key: "user_creator",
                    width: "auto"
                },
                {
                    label: "Updated Date",
                    key: "updated_at",
                    width: "auto"
                },
                {
                    label: "Updated By",
                    key: "user_editor",
                    width: "auto"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogDiscountTariff: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            dateRange: [],
            searchBy: "discount tariff origin",
            filterDateBy: "create",
            searchPlaceholder: "Search Discount Tariff",
            searchParams: [
                {
                    label: "Origin",
                    value: "discount tariff origin",
                },
                {
                    label: "Destination",
                    value: "discount_tariff_destination",
                },
                {
                    label: "Service",
                    value: "discount_tariff_service_code",
                },
                {
                    label: "Daily Discount (%)",
                    value: "discount_tariff_persentase",
                },
            ],
            dateParams: [
              {
                label: 'Created Date',
                value: 'create'
              }
            ]
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
                }
            }
        }
    },
    methods: {
        async getTableData(limit,page,q,from,to) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            if(q !== undefined) {
                query = q
            }
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            await axios
                .get(this.URL.discount_tariff + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, 
                this.Helper.header())
                .then(res => {

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
                        item['created_at'] =  this.formatTimezone(item['created_at'])
                        item['updated_at'] =  this.formatTimezone(item['updated_at'])
                    })



                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', null, 'tariff data is empty!', ' Please create a new tariff data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate tariff list', err)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.discount_tariff_id === val.discount_tariff_id
                })
                this.dataItem = obj[0]
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

                    this.refresh()
                    this.closeDialogConfirmTariff();
                    this.openNotification(null, 'Delete success', 'Delete tariff is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialogConfirmTariff();
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Delete failed', err.response ? err.response.data.message : 'something went wrong')
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
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch,from,to)
        },
        closeDialogTariffDiscount() {
            this.dialogDiscountTariff = false
        },
        closeDialogConfirmTariff(){
          this.activeDialogDiscountTariff=false
          this.activeLoadingTariff=false
        },
        updateValue(key, val) {
            this.dateRange = val
            this.refresh()
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh()
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
        },
    },
    mounted() {
        this.refresh()
        window.addEventListener('timezone-changed', this.refresh);
    },

    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh);
    },
}
</script>