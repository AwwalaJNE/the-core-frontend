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

        <dialog-create-edit-VehicleMode
            :active="dialogVehicleMode" 
            :closeDialog="closeDialogVehicleMode"
            :refresh="refresh"
            title="Edit Vehicle Mode"
            :dataItem="dataItem"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import dialogCreateEditVehicleMode from "@/views/settings/vehicles/vehicleMode/dialogCreateEditVehicleMode"
export default {
    name:"vehicle-mode",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-VehicleMode": dialogCreateEditVehicleMode
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "vehicle_mode_id",
                    width: "xs"
                },
                {
                    label: "Vehicle mode name",
                    key: "vehicle_mode_name",
                    width: "xs"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogVehicleMode: false,
            pagination: {
                limit:5,
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
                .get(this.URL.vehicle_mode + 
                `?n=1&sort_order=desc&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res)
                    this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        this.openNotification('warn', 'Vehicle mode data is empty!', ' Please create a new Vehicle mode data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Vehicle mode list', err)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.vehicle_mode_id === val.vehicle_mode_id
                })
                this.dataItem = obj[0]
                console.log(this.dataItem, 'nihh val', val)
                this.$nextTick(() => {
                    this.dialogVehicleMode = true
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
                    this.URL.vehicle_mode + `/${val.vehicle_mode_id}`,
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.refresh()
                    this.openNotification(null, 'Delete success', 'Delete Vehicle mode is success')
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
            console.log("refresh")
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        closeDialogVehicleMode() {
            this.dialogVehicleMode = false
        }
    },
    mounted() {
        this.refresh()
    }
}
</script>