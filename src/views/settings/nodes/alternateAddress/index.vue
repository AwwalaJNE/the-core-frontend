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
                        <date-time :name="''" :rules="''" :valueData="dateRange"
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

        <dialog-confirm
            title="Remove Node Alternate Address"
            :message="`Are you sure you want to remove this node alternate address with id ${this.id}?`"
            :active="activeDialogConfirmRemove"
            :loading="loadingConfirmRemove"
            :closeDialog="closeDialogConfirmRemove"
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
import dialogCreateAltAddress from "@/views/settings/nodes/alternateAddress/dialogCreateAltAddress"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"

export default {
    name:"alternate-address-alt",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-AltAddress": dialogCreateAltAddress,
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "date-time": DateTime,
        "dialog-confirm": DialogConfirm,
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
                limit:20,
                page_size: 1,
                page: 1
            },
            dateRange: [],
            searchBy: "alternate address name",
            filterDateBy: "create",
            searchPlaceholder: "Search Alternate Address Name",
            searchParams: [
                {
                    label: "Node alternate ID",
                    value: "node_alternate_address_id"
                },
                {
                    label: "Node Id",
                    value: "node_id"
                },
                {
                    label: "Alternate address name",
                    value: "alternate address name"
                },
                {
                    label: "Alternate address",
                    value: "node_alternate_address_address"
                },
                {
                    label: "Alternate address phone",
                    value: "node_alternate_address_phone"
                },
                {
                    label: "Alternate address subdistrict id",
                    value: "node_alternate_address_subdistrict_id"
                }
            ],
            dateParams: [
              {
                label: 'Created Date',
                value: 'create'
              }
            ],
            id: '',
            dialogConfigurationWarningRunsheet: false,
            activeDialogConfirmRemove: false,
            loadingConfirmRemove:false,
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
        async getTableData(limit,page,q,from,to) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            if(q !== undefined) {
                this.tempSearch = q
                query = q
            }
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            await axios
                .get(this.URL.node_alternate_address + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, 
                this.Helper.header())
                .then(res => {

                    this.dataTable = res.data.data

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
                    return item.node_alternate_address_id === val.node_alternate_address_id
                })
                this.dataItem = obj[0]

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
        closeDialogAltAddress() {
            this.dialogAltAddress = false
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
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
        },
        actionRemove(val){
            this.id = val.node_alternate_address_id;
            this.activeDialogConfirmRemove = true
        },
        confirmRemove() {
            this.loadingConfirmRemove=true
            this.removeData()
        },
        async removeData(){
            await axios
                .delete(
                    this.URL.node_alternate_address + `/${this.id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.closeDialogConfirmRemove()
                    this.loadingConfirmRemove = false
                    this.refresh()
                    this.openNotification(null, 'Delete success', 'Delete tariff is success')
                }).catch(err => {
                    this.loadingConfirmRemove = false
                    this.closeDialogConfirmRemove()
                    this.loading = false
                    this.openNotification('danger', 'Delete failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        closeDialogConfirmRemove(){
            this.activeDialogConfirmRemove = false
            this.loadingConfirmRemove=false
        },
    },
    mounted() {
        this.refresh()
    }
}
</script>