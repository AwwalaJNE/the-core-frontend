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
        :hasPagination="true"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"

        :customAction="true"
        :customActionList="customActionList"
        @actionUpdate="actionUpdate"
        />

        <!--Create User Dialog end-->
            <dialog-create-edit
            :active="dialogCreateEdit" 
            :closeDialog="closeDialogCreateEdit"
            @refresh="refresh"
            title="Node Commision"
            :dataItem="dataItem"
            btnBlue="Edit"
            />

            <!-- dialog confirm remove Costing-->
            <dialog-confirm
            :active="activeDialogRemove"
            :loading="activeLoadingRemove"
            :closeDialog="closeDialogConfirmRemove"
            title="Remove Node Commision"
            message="Are you sure you want to Remove Node Commision ?"
            @confirm="confirmRemove"
            @cancel="closeDialogConfirmRemove"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import dialogCreateEditNodeCommission from "@/views/settings/nodes/nodesCommision/dialogCreateEditNodeCommission"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"

export default {
    name:"node-commision-list",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array,
        node:String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit": dialogCreateEditNodeCommission,
        "dialog-confirm" : DialogConfirm,
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "date-time": DateTime
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Node",
                    key: "node_commision_node",
                    width: "auto"
                },
                {
                    label: "Service",
                    key: "node_commision_service_code",
                    width: "auto"
                },
                {
                    label: "Daily",
                    key: "node_commision_daily",
                    width: "auto"
                },
                {
                    label: "Amount 1 (Rp)",
                    key: "node_commision_amount1",
                    width: "auto"
                },
                {
                    label: "Amount 2 (Rp)",
                    key: "node_commision_amount2",
                    width: "auto"
                },
            ],
            customActionList: [
              {
                label: 'Edit',
                key: 'edit',
                attribute: '',
              },
              {
                label: 'Remove',
                key: 'remove',
                attribute: 'danger',
              }
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogCreateEdit: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            activeDialogRemove:false,
            activeLoadingRemove:false,
            node_commission_id: "",
            dateRange: [],
            searchBy: "node",
            filterDateBy: "create",
            searchPlaceholder: "Search Node Name",
            searchParams: [
                {
                    label: "Node Name",
                    value: "node"
                },
                {
                    label: "Service",
                    value: "commision_service_code"
                },
                {
                    label: "Daily",
                    value: "commision_daily"
                },
                {
                    label: "Amount 1",
                    value: "commision_amount1"
                },
                {
                    label: "Amount 2",
                    value: "commision_amount2"
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
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
                }
            }
        },
        
        
    },
    methods: {
        refresh(){
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch,from,to)
        },
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
                .get(this.URL.node_commission + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, 
                this.Helper.header())
                .then(res => {

                    if(res.data.data.length > 0) {
                        this.dataTable = res.data.data
                        this.dataTable.map(item=>{
                          item['node_commision_node'] = item.node != null ? item.node.node_name : ""
                        })
                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    } else {
                        // this.openNotification('warn', 'node commission data is empty!', ' Please create a new node commission')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate node commission list', err)
                })
        },
        actionUpdate(val, key) {
            switch(key) {
                case "edit":
                    if(this.dataTable.length > 0) {
                        this.dataItem = val
                        // this.dataItem.node_commission_id = val.node_commission_id
                        

                        this.dataItem.node_id = val.node_id.toString();

                        this.$nextTick(() => {
                            this.dialogCreateEdit = true
                        });
                    }
                    break;
                case "remove":
                    this.node_commission_id = val.node_commission_id;
                    this.node_commission_id != "" && this.node_commission_id != undefined ? this.activeDialogRemove = true : this.openNotification('warn', 'Node type remove is failed', '')
                    break;
                default:
                    //
            }
        },
        confirmRemove() {
          this.activeLoadingRemove = true;
          this.removeCommision();
        },
        closeDialogConfirmRemove(){
          this.activeDialogRemove = false
          this.activeLoadingRemove=false
          this.node_commission_id = ""
        },
        closeDialogCreateEdit() {
            this.dialogCreateEdit = false
            this.dataItem = {}
            this.node_commission_id = ""
        },
        async removeCommision(){
            await axios
                .delete(
                    this.URL.node_commission + `/${this.node_commission_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {

                    this.refresh()
                    this.closeDialogConfirmRemove();
                    this.openNotification(null, 'Romove success', 'Node type is success')
                    
                }).catch(err => {
                    this.loading = false
                     this.closeDialogConfirmRemove();
                    this.openNotification('danger', 'Node type is failed', err)
                   
                })
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
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page)
    },
}
</script>