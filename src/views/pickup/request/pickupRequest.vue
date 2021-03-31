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
        :pickupListAction="true"
        :cancelRequestAction="true"
        :hasPagination="true"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @actionPrint="actionPrint"
        @actionCancel="actionCancel"
        />

      <!-- dialog confirm cancel pickup request-->
      <dialog-confirm
          :active="activeDialogCancel"
          :loading="activeLoadingCancel"
          :closeDialog="closeDialogConfirmCancel"
          title="Cancel Pickup"
          message="Are you sure you want to cancel Pickup ?"
          @confirm="confirmCancel"
          @cancel="closeDialogConfirmCancel"
      />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"
export default {
    name:"pickup-requestlist",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array
    },
    components: {
        "table-master" : TableMaster,
      "dialog-confirm": DialogConfirm
    },
    data() {
        return {
            dataTable: [],
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
                label: "Bags",
                key: "total_bag",
                width: "auto"
              },
              {
                label: "Picked",
                key: "total_bag_picked",
                width: "auto"
              },
              {
                label: "Courier",
                key: "pickup_courier_employee_name",
                width: "auto"
              },
              {
                label: "Pickup Time",
                key: "pickup_date",
                width: "auto"
              },
              {
                label: "Type",
                key: "pickup_type",
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
            tempSearch: "",
            tempDate: [],
            startDate: "",
            endDate: "",
            dialogTariff: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            activeDialogCancel:false,
            activeLoadingCancel:false,
            pickupData:{},
            form:{}
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate)
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
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate)
          }
        }
    },
    methods: {
        async getTableData(limit,page,q, from, to) {
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
                .get(this.URL.pickup_request +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    arr.map(item => {
                      item["pickup_courier_employee_name"] = (item.employee_courier) ? item.employee_courier.employee_name: null
                      item["isDisabled"] = (item.pickup_status == 'PICKED' || item.pickup_status == 'CANCELED') ? true : false
                    })
                    this.dataTable = arr
                    console.log('arrrrrr',arr);
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        this.openNotification('warn', 'Pickup request is empty!', ' Please create a new Pickup request')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate tariff list', err)
                })
        },

        closeDialogConfirm(){
            this.confirmDialog = false
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
        },
        actionPrint(row){
          let routeData = this.$router.resolve({ 
            name: 'printGeneral', 
            params: { 
                'id': row.pickup_number, 
                'type': 'pickup'
            } 
          });
          window.open(routeData.href, '_blank');
        },
        actionCancel(row){
          this.pickupData = row;
          this.activeDialogCancel = true;
        },
        async updateData(form, pickup_number){
          await axios
              .put(this.URL.pickup + `/${pickup_number}?n=${this.listenNodeId}`,
                  JSON.stringify(form),
                  this.Helper.header())
              .then(res => {
                this.closeDialogConfirmCancel()
                this.activeLoadingCancel = false
                this.refresh()
                this.openNotification(null, 'Success', 'Cancel Pickup is success')
              }).catch(err => {
                this.activeLoadingCancel = false
                this.closeDialogConfirmCancel()
                this.refresh()
                this.openNotification('danger', 'Cancel Pickup is failed', err)
              })
        },

        closeDialogConfirmCancel(){
          this.activeDialogCancel = false
          this.activeLoadingCancel=false
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