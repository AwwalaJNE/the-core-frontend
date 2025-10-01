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
                        <date-time :name="''" :rules="''" :valueData="dateRange" typeInput="daterange" @updateValue="updateValue" />
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
        hideColumnKey="setting-vehicle" 
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

        <dialog-create-edit-Vehicle
            :active="dialogVehicle" 
            :closeDialog="closeDialogVehicle"
            @refresh="refresh"
            title="Edit Vehicle"
            :dataItem="dataItem"
        />

        <dialog-confirm
            title="Remove Vehicle"
            :message="`Are you sure you want to remove this vehicle with id ${this.id}?`"
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
import dialogCreateEditVehicle from "@/views/settings/vehicles/vehicleList/dialogCreateEditVehicle"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"

export default {
    name:"vehicle-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-Vehicle": dialogCreateEditVehicle,
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
                    key: "vehicle_id",
                    width: "xs"
                },
                {
                    label: "Vehicle name",
                    key: "vehicle_name",
                    width: "xs"
                },
                {
                    label: "Vehicle police no",
                    key: "vehicle_police_no",
                    width: "auto"
                },
                {
                    label: "Vehicle owned by",
                    key: "vehicle_owned_by",
                    width: "auto"
                },
                {
                    label: "Max Weight",
                    key: "vehicle_max_weight",
                    width: "auto"
                },
                {
                    label: "Max Volume",
                    key: "vehicle_max_volume",
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
            dialogVehicle: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            dateRange: [],
            searchBy: "vehicle_name",
            filterDateBy: "create",
            searchPlaceholder: "Search Vehicle Name",
            searchParams: [
            {
                    label: "Vehicle ID",
                    value: "vehicle_id"
                },
                {
                    label: "Vehicle Name",
                    value: "vehicle_name"
                },
                {
                    label: "Vehicle police no",
                    value: "vehicle_police_no"
                },
                {
                    label: "Vehicle owned by",
                    value: "vehicle_owned_by"
                },
                {
                    label: "Max Weight",
                    value: "vehicle_max_weight"
                },
                {
                    label: "Max Volume",
                    value: "vehicle_max_volume"
                },
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
                .get(this.URL.vehicle + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, 
                this.Helper.header())
                .then(res => {
                    
                    this.dataTable = res.data.data
                    this.dataTable.map(item => {
                        item['created_at'] =  this.formatTimezone(item['created_at'])
                        item['updated_at'] =  this.formatTimezone(item['updated_at'])
                    })

                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', null, 'Vehicle data is empty!', ' Please create a new Vehicle data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate Vehicle list', err)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.vehicle_id === val.vehicle_id
                })
                this.dataItem = obj[0]
                this.dataItem.vehicle_mode_id = this.dataItem.vehicle_type.vehicle_mode_id
                
                // perlu object node id dari BE
                // this.dataItem.vehicle_node_id = this.dataItem["vehicle_node_name"]

                // this.$store.dispatch(`SET_VEHICLE_VEHICLE_NODE_ID_ValueData`, val["cost_owner"][0]) // asumsi ada flag node_name (samain dg querysearch. klo mau dinamis pakein prop aja)
                
                this.$nextTick(() => {
                    this.dialogVehicle = true
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
        closeDialogVehicle() {
            this.dialogVehicle = false
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
        actionRemove(val){
            this.id = val.vehicle_id;
            this.activeDialogConfirmRemove = true
        },
        confirmRemove() {
            this.loadingConfirmRemove=true
            this.removeData()
        },
        async removeData(){
            await axios
                .delete(
                    this.URL.vehicle + `/${this.id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.closeDialogConfirmRemove()
                    this.loadingConfirmRemove = false
                    this.refresh()
                    this.openNotification(null, 'Delete success', 'Delete Vehicle is success')
                }).catch(err => {
                    this.loadingConfirmRemove = false
                    this.closeDialogConfirmRemove()
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Delete failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        closeDialogConfirmRemove(){
            this.activeDialogConfirmRemove = false
            this.loadingConfirmRemove=false
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