<template>
    <div>
      <!-- action table ini bisa diganti pke customActionList contohnya kaya di views/transport/suratJalan.vue -->
        <table-master 
        :dataTable="dataTable" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="false"
        :pickupListAction="true"
        :updateAction="true"
        :hasPagination="true"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @actionUpdate="actionUpdate"
        @actionPicked="actionPicked"
        @actionCancel="actionCancel"
        />

      <!--Create pickup List-->
      <dialogCreatePickupList
          :active="dialogPickupList"
          @refresh="refresh"
          :closeDialog="closeDialogPickupList"
          title="Edit Pickup List"
          :dataItem="dataItem"
          btnBlue="Edit"
      />

      <!--dialog d picked -->
      <DialogPicked
          :active="dialogPickedActive"
          @refresh="refresh"
          :closeDialog="closeDialogConfirmPicked"
          title="List of Bags"
          :pickupData="pickupData"
            
        />


      <!--Create pickup Request-->
      <dialogPickupListCancel
          :active="dialogPickupListCancel"
          :loading="dialogPickupListCancelLoading"
          :pickupNumber="pickupNumber"
          @refresh="refresh"
          :closeDialog="closeDialogPickupListCancel"
          title="Cancel Pickup List"
      />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreatePickupList from "@/views/pickup/list/dialogCreateEditPickupList"
import DialogPicked from "@/views/pickup/list/dialogPicked"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import dialogCancelPickupList from "@/views/pickup/list/dialogCancelPickupList";

export default {
    name:"pickup-requestlist",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array,
        node:String,
        status_pickup:String
    },
    components: {
        "table-master" : TableMaster,
        "dialogCreatePickupList": DialogCreatePickupList,
        "DialogPicked": DialogPicked,
        "dialog-confirm": DialogConfirm,
        "dialogPickupListCancel": dialogCancelPickupList
    },
    data() {
        return {
            //cancel pickup
            dialogPickupListCancel:false,
            dialogPickupListCancelLoading:false,

            dataTable: [],
            dialogPickupList:false,
            dialogPickedActive: false,
            datacolumn: [
                {
                    label: "Request Date",
                    key: "pickup_request_time",
                    width: "xs"
                },
                {
                    label: "Pickup Number#",
                    key: "pickup_number",
                    width: "auto"
                },
                {
                    label: "Name#",
                    key: "pickup_name",
                    width: "auto"
                },
                {
                  label: "Bag",
                  key: "total_bag",
                  width: "auto"
                },
                {
                  label: "Koli",
                  key: "total_koli",
                  width: "auto"
                },
                {
                  label: "Picked",
                  key: "total_picked",
                  width: "auto"
                },
                {
                  label: "Courier",
                  key: "user_name",
                  width: "auto"
                },
                {
                    label: "Pickup Time",
                    key: "pickup_picked_time",
                    width: "auto"
                },
                {
                    label: "Status",
                    key: "pickup_status",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            pickupData:{},
            tempSearch: "",
            tempDate: [],
            startDate: "",
            endDate: "",
            node_filter: "",
            temp_pickup_status:'',
            dialogTariff: false,
            pickupNumber:null,
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
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.node_filter, this.temp_pickup_status)
                }
            }
        },
        dateFilter: function(val, old) {
          if(val !== undefined) {
            this.tempDate = val
            if(this.tempDate !== old ) {
              this.startDate = this.tempDate !== null ? this.tempDate[0] : ''
              this.endDate = this.tempDate !== null ? this.tempDate[1] : ''
            }
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, this.node_filter, this.temp_pickup_status)
          }
        },
        node: function(val, old) {
          if(val !== undefined) {
            this.node_filter = val
            if(this.node_filter !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, val, this.temp_pickup_status)
            }
          }
        },
        status_pickup: function(val, old) {
          if(val !== undefined) {
            this.temp_pickup_status = val
            if(this.temp_pickup_status !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, this.node_filter, val)
            }
          }
        },
    },
    methods: {
        async getTableData(limit,page,q, from, to, node, status=null) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            let status_pickup=''
            if(q !== undefined) {
                query = q
            }
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            if(status !== undefined && status !== null) {
              status_pickup = status
            }
            await axios
                .get(this.URL.pickup +
                `?n=${this.listenNodeId}&pickup_status=${status_pickup}&s=${query}`,
                this.Helper.header())
                .then(res => {
                    // this.dataTable = res.data.data
                    let arr = res.data.data
                    arr.map(item => {
                        item.total_unpicked = parseInt(item.total_bag) + parseInt(item.total_koli);
                        item.total_picked = item.total_picked+" / "+item.total_unpicked;
                        item["isDisabled"] = (item.pickup_status == 'PICKED' || item.pickup_status == 'CANCELED' || item.pickup_status == 'DONE') ? true : false
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'Pickup data is empty!', ' Please create a new pickup data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate tariff list', err)
                })
        },

        closeDialogConfirmPicked(){
            this.dialogPickedActive = false
        },
        closeDialogPickupList() {
          this.dialogPickupList = false
          this.dataItem = {}
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
        },

        actionUpdate(val){
          let userRole = this.listenUserRole["user_role_code"] ? this.listenUserRole["user_role_code"].toLowerCase() : ""
          
          console.log("update with role", userRole)
          if(this.dataTable.length > 0 && !userRole.includes("courier")) {
            val["pickup_node_id_destination"] = val["node_destination"] ? val["node_destination"]["node_name"] : ""     
            this.dataItem = val
            this.dataItem.pickup_date = (val.pickup_date) ? val.pickup_date.substring(0,10) : val.pickup_date

            this.$store.dispatch(`SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION_ValueData`, val["node_destination"])

            this.$nextTick(() => {
              this.dialogPickupList = true
            });
          }
        },
        actionPicked(val){
          this.pickupData = val;
          this.dialogPickedActive = true;
        },
        actionCancel(val){
          let userRole = this.listenUserRole["user_role_code"] ? this.listenUserRole["user_role_code"].toLowerCase() : ""
          if(!userRole.includes("courier")) {
            this.pickupNumber = val.pickup_number
            this.dialogPickupListCancel = true;
          }
        },

        //cancel pickup
        confirmCancel(val) {
          if(val) {
            this.activeLoadingCancel=true
            let formupdate = {
                'pickup_number' : this.pickupData.pickup_number,
                'pickup_status' : 'CANCELED',
                'is_pickup_canceled'  : 1
            }
            let pickup_number = this.pickupData.pickup_number
            this.updateData(formupdate, pickup_number)
          }
        },
      closeDialogPickupListCancel(){
          this.dialogPickupListCancel = false
          this.activeLoadingCancel=false
        },
        async updateData(form, pickup_number){
          await axios
              .put(
                  this.URL.pickup + `/${pickup_number}?n=${this.listenNodeId}`,
                  JSON.stringify(form),
                  this.Helper.header())
              .then(res => {
                this.closeDialogConfirmCancel()
                this.btnLoading = false
                this.activeLoadingCancel = false
                this.refresh()
                this.openNotification(null, 'Success', 'Cancel Pickup is success')
              }).catch(err => {
                this.btnLoading = false
                this.activeLoadingCancel = false
                this.closeDialogConfirmCancel()
                this.refresh()
                this.openNotification('danger', 'Cancel Pickup is failed', err)
              })
        },

    },
    mounted() {
        this.refresh()
    }
}
</script>
<style>
  .el-picker-panel__content, .el-date-range-picker__content{
    font-family: "NunitoSans-Regular";
    -webkit-font-smoothing: antialiased;
  }
</style>