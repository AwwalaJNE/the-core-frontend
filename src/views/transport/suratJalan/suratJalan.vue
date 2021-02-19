<template>
    <div>
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
        @actionPrint="actionPrint"

        :customAction="true"
        :customActionList="customActionList"
        @actionUpdate="actionUpdate"
        >
          
        </table-master>

      <!-- dialog confirm cancel pickup request-->
      <!-- <dialog-confirm
          :active="activeDialogCancel"
          :loading="activeLoadingCancel"
          :closeDialog="closeDialogConfirmCancel"
          title="Cancel Pickup"
          message="Are you sure you want to cancel Pickup ?"
          @confirm="confirmCancel"
          @cancel="closeDialogConfirmCancel"
      /> -->
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"
export default {
    name:"surat-jalan",
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
                label: "Surat Jalan #",
                key: "manifest_do_number",
                width: "xs"
              },
              {
                label: "Vehicle Type",
                key: "vehicle_type_name",
                width: "auto"
              },
              {
                label: "Mode#",
                key: "vehicle_mode_name",
                width: "auto"
              },
              {
                label: "Origin",
                key: "node_id_origin",
                width: "auto"
              },
              {
                label: "Destination",
                key: "node_id_destination",
                width: "auto"
              },
              {
                label: "Kg",
                key: "total_weight",
                width: "auto"
              },
              {
                label: "ETD",
                key: "etd",
                width: "auto"
              },
              {
                label: "ETA",
                key: "eta",
                width: "auto"
              },
              {
                label: "Status",
                key: "status",
                width: "auto"
              },
              {
                label: "Received",
                key: "pickup_status",
                width: "auto"
              },
            ],
            customActionList: [
              {
                label: 'Print',
                key: 'print',
                attribute: '',
                option: {
                  type: 'redirect',

                }
              },
              {
                label: 'Depart',
                key: 'depart',
                attribute: '',
              }
            ],

            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            startDate: "",
            endDate: "",
            dialogTariff: false,
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            },
            activeDialogCancel:false,
            activeLoadingCancel:false,
            pickupData:{}
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
            // this.loading = true
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
                .get(this.URL.manifest_delivery_order +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    console.log('manifest_delivery_order', arr, res)
                    arr.map(item => {
                      item["pickup_courier_employee_name"] = (item.employee_courier) ? item.employee_courier.employee_name: null
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        this.openNotification('warn', 'Surat Jalan data is empty!', ' Please create a new Surat Jalan data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Surat Jalan data', err)
                })
        },

        closeDialogConfirm(){
            this.confirmDialog = false
        },

        actionUpdate(val, key) {
          switch(key) {
                case "print":
                    console.log('print', val)
                    let routeData = this.$router.resolve({ name: 'printGeneral', params: { 'id': val.manifest_do_number, 'type': 'manifest-delivery-order'} });
                    window.open(routeData.href, '_blank');
                    break;
                case "depart":
                  console.log('depart', val)
                   break;
                default:
                    console.log('meong')
                    // code block
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
            console.log("refresh")
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
        },
        actionPrint(row){
          console.log(row,'print')
        },
        actionCancel(row){
          this.pickupData = row;
          this.activeDialogCancel = true;
        },
        async updateData(form){
          await axios
              .put(
                  this.URL.pickup + `?n=${this.listenNodeId}`,
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
            this.updateData(formupdate)
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