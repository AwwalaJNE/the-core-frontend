<template>
    <div>
        <table-master 
        :dataTable="dataTable" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="false"
        :hasPagination="true"
        
        @actionRemove="actionRemove"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"

        :customAction="true"
        :customActionList="customActionList"
        @actionUpdate="actionUpdate"

        />

        <dialog-create-edit-VehicleType
            :active="dialogVehicleType" 
            :closeDialog="closeDialogVehicleType"
            :refresh="refresh"
            title="Edit Vehicle Type"
            :dataItem="dataItem"
            />
        
        <dialog-confirm
          :active="confirmDialog"
          :closeDialog="closeDialogConfirm"
          title="Vehicle Type"
          :message="message"
          @confirm="confirm"
          @cancel="closeDialogConfirm"
      />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import dialogCreateEditVehicleType from "@/views/settings/vehicles/vehicleType/dialogCreateEditVehicleType"
import DialogConfirm from "@/components/dialog/dialogConfirm"

export default {
    name:"vehicle-type",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-VehicleType": dialogCreateEditVehicleType,
        "dialog-confirm": DialogConfirm
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "vehicle_type_id",
                    width: "xs"
                },
                {
                    label: "Vehicle type name",
                    key: "vehicle_type_name",
                    width: "md"
                },
                {
                    label: "Vehicle mode name",
                    key: "vehicle_mode_name",
                    width: "md"
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
            dialogVehicleType: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            confirmDialog: false,
            message: "",
            tempData: {}
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
                .get(this.URL.vehicle_type + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    
                    this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'Vehicle mode data is empty!', ' Please create a new Vehicle mode data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Vehicle mode list', err)
                })
        },
        actionUpdate(val, key){
            switch(key) {
                case "edit":
                    if(this.dataTable.length > 0) {
                        let obj = this.dataTable.filter(item => {
                            return item.vehicle_type_id === val.vehicle_type_id
                        })
                        this.dataItem = obj[0]
                        
                        this.$nextTick(() => {
                            this.dialogVehicleType = true
                        });
                    }
                    break;
                case "remove":
                    this.tempData = val
                    this.confirmDialog = true
                    this.message = `Are you sure want to delete vehicle type ${val.vehicle_type_name}`
                   break;
                default:
                    console.log('meong')
                    // code block
            }
            
        },
        
        closeDialogConfirm(){
          this.confirmDialog = false
        },
        confirm(val) {
          if(val) {
              this.confirmDialog = false
              this.actionRemove()
          }
        },
        async actionRemove(val){
            // this.confirmDialog = true
            await axios
                .delete(
                    this.URL.vehicle_type + `/${this.tempData.vehicle_type_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.refresh()
                    this.openNotification(null, 'Delete success', 'Delete vehicle type is success')
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
        closeDialogVehicleType() {
            this.dialogVehicleType = false
        }
    },
    mounted() {
        this.refresh()
    }
}
</script>