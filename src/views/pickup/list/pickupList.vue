<template>
    <div>
      <!-- action table ini bisa diganti pke customActionList contohnya kaya di views/transport/suratJalan.vue -->
        <table-master 
        hideColumnKey="pickup-list" 
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
        :hasLinked="['total_picked_bag']"
        :hasLinked2="['total_picked_koli']"
        :hasLinked3="['user_name']"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @actionUpdate="actionUpdate"
        @actionPicked="actionPicked"
        @actionCancel="actionCancel"
        @actionFailed="actionFailed"
        @actionApprove="actionApprove"
        @handleEdit="handleEdit"
        @handleEdit2="handleEditKoli"
        @handleEdit3="handleRedirectToWhatsApp"
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

         <!--dialog picked show bag/connote -->
      <DialogBagPicked
          :active="dialogPickedShowActive"
          @refresh="refresh"
          :closeDialog="closeDialogShowConfirmPicked"
          title="List of Bags Picking"
          :pickupData="pickupData"
        />

        <DialogKoliPicked
          :active="dialogPickedKoliActive"
          @refresh="refresh"
          :closeDialog="closeDialogKoliConfirmPicked"
          title="List of Koli Picked"
          :pickupDataKoli="pickupDataKoli"
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

      <!--Failed pickup List-->
      <dialogPickupListFailed
          :active="dialogPickupListFailed"
          :loading="dialogPickupListFailedLoading"
          :pickupNumber="pickupNumber"
          @refresh="refresh"
          :closeDialog="closeDialogPickupListFailed"
          title="Failed Pickup List"
      />

      <dialog-confirm
          :active="dialogApproveActive"
          :loading="loadingApproveActive"
          :closeDialog="closeDialogApproveCancel"
          title="Approve Failed Pickup"
          message="Are you sure you want to approve failed pickup ?"
          @confirm="confirmApprove"
          @cancel="closeDialogApproveCancel"
      />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreatePickupList from "@/views/pickup/list/dialogCreateEditPickupList"
import DialogPicked from "@/views/pickup/list/dialogPicked"
import DialogBagPicked from "@/views/pickup/list/dialogBagPicked"
import DialogKoliPicked from "@/views/pickup/list/dialogKoliPicked"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import dialogCancelPickupList from "@/views/pickup/list/dialogCancelPickupList";
import dialogFailedPickupList from "@/views/pickup/list/dialogFailedPickupList";

export default {
    name:"pickup-requestlist",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array,
        node:String,
        status_pickup:String,
        courier_pickup:String/Number,
        searchBy: String,
        filterDateBy: String
    },
    components: {
    "table-master": TableMaster,
    "dialogCreatePickupList": DialogCreatePickupList,
    "DialogPicked": DialogPicked,
    "DialogBagPicked": DialogBagPicked,
    "DialogKoliPicked": DialogKoliPicked,
    "dialog-confirm": DialogConfirm,
    "dialogPickupListCancel": dialogCancelPickupList,
    "dialogPickupListFailed": dialogFailedPickupList
},
    data() {
        return {
            //cancel pickup
            dialogPickupListCancel:false,
            dialogPickupListCancelLoading:false,

            dataTable: [],
            dialogPickupList:false,
            dialogPickedActive: false,
            dialogPickedShowActive: false,
            dialogPickedKoliActive: false,
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
                  label: "Connote",
                  key: "total_koli",
                  width: "auto"
                },
                {
                  label: "Bag Picked",
                  key: "total_picked_bag",
                  width: "auto"
                },
                {
                  label: "Connote Picked",
                  key: "total_picked_koli",
                  width: "auto"
                },
                {
                  label: "Total Weight (Kg)",
                  key: "total_weight",
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
            pickupDataKoli:{},
            tempSearch: "",
            tempDate: [],
            startDate: "",
            endDate: "",
            node_filter: "",
            temp_pickup_status:'',
            temp_pickup_courier:'',
            dialogTariff: false,
            pickupNumber:null,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            isKurirAccount: true,

            dialogApproveActive: false,
            loadingApproveActive: false,

            dialogPickupListFailed:false,
            dialogPickupListFailedLoading:false,
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
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
            if (val !== undefined) {
                this.temp_pickup_status = val;
                if (this.temp_pickup_status !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, this.node_filter, val, this.temp_pickup_courier);
                }

            }
        },
        courier_pickup: function(val, old) {
            if (val !== undefined) {
                this.temp_pickup_courier = val;
                if (this.temp_pickup_courier !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, this.node_filter, this.temp_pickup_status, val);
                }

            }
        },
    },
    methods: {
        async getTableData(limit,page,q, from, to, node, status=null, courier=null) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            let status_pickup=''
            let courier_pickup=''
            if(q !== undefined) {
                query = q
            }
            if(from !== undefined && to !== undefined) {
               startDate = this.formatToWIB(from)
               endDate = this.formatToWIB(to)
            }
          
            if(status !== undefined && status !== null) {
              status_pickup = status
            } 
            if(courier !== undefined && courier !== null) {
              courier_pickup = courier
            } 

            await axios
                .get(this.URL.pickup +
                `?n=${this.listenNodeId}&pickup_status=${status_pickup}&pickup_courier=${courier_pickup}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`,
                this.Helper.header())
                .then(res => {
                    // this.dataTable = res.data.data 
                    let arr = res.data.data
                    let userRole = this.listenUserRole["user_role_code"] ? this.listenUserRole["user_role_code"].toLowerCase() : ""
                    
                    arr.map(item => {
                        item["pickup_request_time"] = this.formatTimezone(item["pickup_request_time"]);
                        item["pickup_picked_time"] = this.formatTimezone(item["pickup_picked_time"]);
                        item.total_unpicked_bag = parseInt(item.total_bag);
                        item.total_unpicked_koli = parseInt(item.total_koli);
                        item.total_picked_bag = item.total_picked_bag+" / "+item.total_unpicked_bag;
                        item.total_picked_koli = item.total_picked_koli+" / "+item.total_unpicked_koli;
                        if (item.total_weight !== null) {
                          item.total_weight = item.total_weight;
                        } else {
                          item.total_weight = "";
                        }

                        item["is_kurir_user"] = userRole.includes("courier") || false
                        item["is_CT_user"] = userRole.includes("pum") || false

                        item["is_disabled_failed_button"] = false
                        item["is_disabled_approve_button"] = false

                        item["request_failed_by"] = item.pickup_status == 'WAITING APPROVAL' ? item.user_courier : ""
                        item["approve_failed_by"] = item.pickup_status == 'FAILED' ? item.node_destination : ""

                        if (item["is_kurir_user"]) {
                          if (item.pickup_status == 'WAITING APPROVAL' || item.pickup_status == 'FAILED'){
                            item["is_disabled_failed_button"] = true;
                          }
                        } 
                        
                        if (item["is_CT_user"]) {
                          if (item.pickup_status == 'FAILED') {
                            item["is_disabled_approve_button"] = true;
                          }
                        }

                        item["isDisabled"] = (item.pickup_status == 'PICKED' || item.pickup_status == 'UNRECEIVED' || item.pickup_status == 'CANCELED' || item.pickup_status == 'CANCELLED' || item.pickup_status == 'RECEIVED' || item.pickup_status == 'COMPLETED' || item["is_disabled_failed_button"] || item["is_disabled_approve_button"]) ? true : false;
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', null, 'Pickup data is empty!', ' Please create a new pickup data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate tariff list', err)
                })
        },
        closeDialogApproveCancel(){
            this.dataItem = {};
            this.loadingApproveActive = false
            this.dialogApproveActive = false
        },
        confirmApprove(val) {
          if(val) {
            let formUpdate = {
              'pickup_number' : this.dataItem.pickup_number,
              'pickup_status' : 'FAILED',
              'is_pickup_canceled'  : 1
            }
            let pickup_number = this.dataItem.pickup_number
            this.loadingApproveActive = true;

            const connoteNumbers = [];
            const irregularitiesList = [];

            for (const detail of this.dataItem.pickup_detail) {
              if (detail.item_type === "KOLI") {
                connoteNumbers.push(detail.item_number);
              }
            }

            const commonData = {
              "irregularity_status_code": "TESTFAILED01",
              "irregularity_type": "FAILED",
              "remark": "Failed Pickup"
            };

            for (const connoteNumber of connoteNumbers) {
              const irregularity = {
                "connote_number": connoteNumber,
                ...commonData
              };
              irregularitiesList.push(irregularity);
            }
            this.approveFailedPickup(formUpdate, pickup_number)
            this.addDataToIrregularFailed(irregularitiesList.splice(0, 3))
          }
        },
        async approveFailedPickup(formUpdate, pickup_number) {
          this.loading = true
          await axios
          .post(
            this.URL.pickup + `/${pickup_number}/approve-failed?n=${this.listenNodeId}`,
            JSON.stringify(formUpdate), 
            this.Helper.header())
          .then(res => {
            this.closeDialogApproveCancel()
            this.refresh()
            this.openNotification(null, 'Success', 'Failed Pickup Approved')
          })
          .catch(err => {
            this.closeDialogApproveCancel()
            this.refresh()
            this.openNotification('danger', err.response ? err.response.data.code : '', 'Cannot approve failed pickup', err.response ? err.response.data.message : 'something went wrong')
          })
          this.loading = false
          return true;
        },
        async addDataToIrregularFailed(irregularitiesList) {
          try {
            for (const item of irregularitiesList) {
              const response = await axios.post(
                this.URL.irregularities + `/failed?n=${this.listenNodeId}`,
                item,
                this.Helper.header()
              );
            }

            this.closeDialogApproveCancel();
            this.refresh();
            this.openNotification(null, 'Success', 'Added to Irregularities - Failed is success');
          } catch (error) {
            this.closeDialogApproveCancel()
            this.refresh()
            this.openNotification('danger', err.response ? err.response.data.code : '', 'Added to Irregularities - Failed is failed', error.response ? error.response.data.message : 'something went wrong')
          }
        },
        closeDialogConfirmPicked(){
            this.dialogPickedActive = false
        },
        closeDialogShowConfirmPicked(){
            this.dialogPickedShowActive = false
        },
        closeDialogKoliConfirmPicked(){
            this.dialogPickedKoliActive = false
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
        handleEdit(val){
          if(this.dataTable.length > 0) {
            this.pickupData = val
            this.$nextTick(() => {
              this.dialogPickedShowActive = true
            });
          }
        },
        handleEditKoli(val){
          if(this.dataTable.length > 0) {
            this.pickupDataKoli = val
            this.$nextTick(() => {
              this.dialogPickedKoliActive = true
            });
          }
        },
        handleRedirectToWhatsApp(val) {
          if(this.dataTable.length > 0) {
            this.pickupData = val
            this.$nextTick(() => {
              let courierPhoneNumber = val.pickup_phone_number;
              let encodeMessage = encodeURIComponent("Halo, apa benar terjadi overload dan anda melakukan request untuk gagal pickup?");
              let whatsappURL = `https://wa.me/${courierPhoneNumber}?text=${encodeMessage}`
              window.open(whatsappURL, '_blank');
            });
          }
        },
        actionPicked(val){
          this.pickupData = val;
          this.dialogPickedActive = true;

        },
        actionFailed(val) {
          let userRole = this.listenUserRole["user_role_code"] ? this.listenUserRole["user_role_code"].toLowerCase() : ""
          if(userRole.includes("courier")) {
            this.dialogPickupListFailed = true;
            this.pickupNumber = val.pickup_number;
          }
        },
        actionApprove(val) {
          let userRole = this.listenUserRole["user_role_code"] ? this.listenUserRole["user_role_code"].toLowerCase() : ""
          
          // TODO: Check for Control Tower User
          if(this.dataTable.length > 0 && userRole.includes("pum")) {
            this.dataItem = val;
            this.$nextTick(() => {
              this.dialogApproveActive = true;
            });
          }
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
        closeDialogPickupListFailed(){
          this.dialogPickupListFailed = false;
          this.dialogPickupListFailedLoading = false;
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
                this.openNotification('danger', err.response ? err.response.data.code : '', 'Cancel Pickup is failed', err)
              })
        },

    },
    mounted() {
        this.refresh()
        window.addEventListener('timezone-changed', this.refresh);
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh);
    }
}
</script>
<style>
  .el-picker-panel__content, .el-date-range-picker__content{
    font-family: "NunitoSans-Regular";
    -webkit-font-smoothing: antialiased;
  }
</style>