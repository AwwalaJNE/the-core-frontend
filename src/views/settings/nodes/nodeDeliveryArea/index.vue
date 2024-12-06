<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="6">
                <vs-row>
                    <vs-col w="4">
                        <select-search-by 
                            :border="true" 
                            :isMultiple="false" 
                            :selectedValue="filterDateBy" 
                            :valueData="dateParams" 
                            @updateSearchBy="updateFilterDateBy"
                        />
                    </vs-col>
                    <vs-col w="8">
                        <date-time 
                            typeInput="daterange" 
                            :name="''" 
                            :rules="''" 
                            :valueData="dateRange"
                            @updateValue="updateValue" />
                    </vs-col>
                </vs-row>
            </vs-col>
            <vs-col xs="12" sm="12" lg="6">
                <vs-row justify="end">
                    <vs-col xs="6" sm="8" lg="4">
                        <select-search-by 
                            :border="true" 
                            :isMultiple="false" 
                            :selectedValue="searchBy" 
                            :valueData="searchParams" 
                            @updateSearchBy="updateSearchBy"
                        />
                    </vs-col>
                    <vs-col xs="6" sm="4" lg="4">
                        <search-input 
                            ref="searchInput" 
                            :placeholder="searchPlaceholder" 
                            @searchValue="searchValue" 
                        />
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
        <dialog-create-edit-node-delivery-area
            btnBlue="Edit"
            title="Edit Node Delivery Area"
            :active="dialogNodeDeliveryArea"
            :closeDialog="closeDialogNodeDeliveryArea"
            :dataItem="dataItem"
            @refresh="refresh"
        />

        <dialog-confirm
            title="Remove Node Delivery Area"
            :message="`Are you sure you want to remove this node delivery area with id ${this.id}?`"
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
import DialogCreateEditNodeDeliveryArea from "@/views/settings/nodes/nodeDeliveryArea/dialogCreateEditNodeDeliveryArea"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"

export default {
    name:"node-delivery-area",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "date-time": DateTime,
        "dialog-create-edit-node-delivery-area": DialogCreateEditNodeDeliveryArea,
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "table-master" : TableMaster,
        "dialog-confirm": DialogConfirm,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "node_delivery_id",
                    width: "auto"
                },
                {
                    label: "Node Code",
                    key: "node_code",
                    width: "auto"
                },
                {
                    label: "Destination Code",
                    key: "destination_code",
                    width: "auto"
                },
                {
                    label: "Active",
                    key: "is_active",
                    width: "xs",
                    type: "boolean|disabled",
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogNodeDeliveryArea: false,
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            dateRange: [],
            searchBy: "node_code",
            filterDateBy: "create",
            searchPlaceholder: "Search Node Code",
            searchParams: [
                {
                    label: "Node Code",
                    value: "node_code"
                },
                {
                    label: "Destination Code",
                    value: "destination_code"
                }
            ],
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                }
            ],
            id: '',
            activeDialogConfirmRemove: false,
            loadingConfirmRemove:false,
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch)
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
                .get(this.URL.node_delivery_area +
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        this.dataTable = res.data.data.map(item => ({
                            ...item,
                            is_active: item.is_active === '1' ? true : false
                        }));
                        
                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    } else {
                        this.dataTable = []
                        this.pagination.page = 1
                        this.pagination.limit = 20
                        this.pagination.page_size = 1
                    }
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate node type list', err.response.data.message)
                })
        },

        actionUpdate(val){
            if(this.dataTable.length > 0) {
                if(this.dataTable.length > 0) {
                    let obj = this.dataTable.filter(item => {
                        return item.node_delivery_id === val.node_delivery_id
                    })
                    this.dataItem = obj[0]
                    this.$nextTick(() => {
                        this.dialogNodeDeliveryArea = true
                    });
                }
            }
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
        refresh(){
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, from, to)
        },
        closeDialogNodeDeliveryArea() {
            this.dialogNodeDeliveryArea = false
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
            this.id = val.node_delivery_id;
            this.activeDialogConfirmRemove = true
        },
        confirmRemove() {
            this.loadingConfirmRemove=true
            this.removeData()
        },
        async removeData(){
            await axios
                .delete(
                    this.URL.node_delivery_area + `/${this.id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.closeDialogConfirmRemove()
                    this.loadingConfirmRemove = false
                    this.refresh()
                    this.openNotification(null, 'Success', res.data.message)
                }).catch(err => {
                    this.loadingConfirmRemove = false
                    this.closeDialogConfirmRemove()
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Delete node link is failed', err.response.data.message)
              })
        },
        closeDialogConfirmRemove(){
            this.activeDialogConfirmRemove = false
            this.loadingConfirmRemove=false
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>