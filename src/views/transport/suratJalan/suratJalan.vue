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

        :hasLinked="['manifest_do_number']"
        :customAction="true"
        :customActionList="customActionList"
        @actionUpdate="actionUpdate"
        @handleEdit="handleEdit"
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
              <!--Create pickup Request-->
        <dialogCreateSuratJalan
          :active="dialogSuratJalan"
          @refresh="refresh"
          :closeDialog="closeDialogSuratJalan"
          title="Edit Transport Surat Jalan"
          :dataItem="dataItem"
          btnBlue="Edit"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import DialogCreateSuratJalan from "@/views/transport/suratJalan/dialogCreateSuratJalan"
export default {
    name:"surat-jalan",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array
    },
    components: {
      "table-master" : TableMaster,
      "dialog-confirm": DialogConfirm,
      "dialogCreateSuratJalan": DialogCreateSuratJalan
    },
    data() {
        return {
            form: {},
            dataTable: [],
            dialogSuratJalan:false,
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
                key: "node_id_origin_name",
                width: "sm"
              },
              {
                label: "Destination",
                key: "node_id_destination_name",
                width: "sm"
              },
              {
                label: "Kg",
                key: "total_weight",
                width: "auto"
              },
              {
                label: "ETD",
                key: "etd",
                width: "sm"
              },
              {
                label: "ETA",
                key: "eta",
                width: "sm"
              },
              {
                label: "Status",
                key: "status",
                width: "auto"
              },
              {
                label: "Received",
                key: "received_time",
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
                limit:20,
                page_size: 1,
                page: 1
            },
            activeDialogCancel:false,
            activeLoadingCancel:false,
            pickupData:{},
            manifest_do_number: '',
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
                      item["node_id_origin_name"] = (item.origin) ? item.origin.node_name: null
                      item["node_id_destination_name"] = (item.destination) ? item.destination.node_name: null
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
                    this.manifest_do_number = val.manifest_do_number
                    let obj = {}
                    obj['node_id_origin'] = val.node_id_origin
                    obj['node_id_destination'] = val.node_id_destination
                    obj['vehicle_mode_id'] = val.vehicle_mode_id
                    obj['vehicle_type_id'] = val.vehicle_type_id
                    obj['vehicle_id'] = val.vehicle_id
                    obj['pic_employee_id'] = val.pic_employee_id
                    obj['max_weight'] = val.max_weight
                    obj['etd'] = val.etd
                    obj['eta'] = val.eta
                    obj['status'] = "DEPARTED"

                    this.form = obj
                    this.depart()

                    break;
                default:
                    console.log('meong')
                    // code block
            }
        },
        handleEdit(val){
          if(this.dataTable.length > 0) {
            this.dataItem = val
            this.$nextTick(() => {
              this.dialogSuratJalan = true
            });
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
        async depart() {
            this.loading = true
            await axios
                .put(
                    this.URL.manifest_delivery_order + `/${this.manifest_do_number}/detail/1?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.loading = false
                    this.refresh()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Update surat jalan success')
                }).catch(err => {
                    this.loading = false
                    this.refresh()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Update surat jalan failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },

        closeDialogConfirmCancel(){
          this.activeDialogCancel = false
          this.activeLoadingCancel=false
        },
        closeDialogSuratJalan() {
          this.dialogSuratJalan = false
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