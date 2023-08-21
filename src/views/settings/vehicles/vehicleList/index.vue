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

        <dialog-create-edit-Vehicle
            :active="dialogVehicle" 
            :closeDialog="closeDialogVehicle"
            :refresh="refresh"
            title="Edit Vehicle"
            :dataItem="dataItem"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import dialogCreateEditVehicle from "@/views/settings/vehicles/vehicleList/dialogCreateEditVehicle"
export default {
    name:"vehicle-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-Vehicle": dialogCreateEditVehicle
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
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogVehicle: false,
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
                .get(this.URL.vehicle + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    
                    this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'Vehicle data is empty!', ' Please create a new Vehicle data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Vehicle list', err)
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
        async actionRemove(val){
            // this.confirmDialog = true
            await axios
                .delete(
                    this.URL.vehicle + `/${val.vehicle_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    
                    this.refresh()
                    this.openNotification(null, 'Delete success', 'Delete Vehicle is success')
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
        closeDialogVehicle() {
            this.dialogVehicle = false
        }
    },
    mounted() {
        this.refresh()
    }
}
</script>