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
        dateFilter: Array,
        searchBy: String,
        filterDateBy: String
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
                label: "Orion Number",
                key: "orion_number",
                width: "sm"
              },
              {
                label: "Vehicle Type",
                key: "vehicle_type_name",
                width: "xs"
              },
              {
                label: "Driver",
                key: "driver_name",
                width: "xs"
              },
              {
                label: "Mode#",
                key: "vehicle_mode_name",
                width: "xs"
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
                width: "xs"
              },
              {
                label: "ETA",
                key: "eta",
                width: "xs"
              },
              {
                label: "Departed Time",
                key: "departed_time",
                width: "xs"
              },
              {
                label: "Status",
                key: "status",
                width: "xs"
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
              },
              {
                label: 'Cancel',
                key: 'cancel',
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
                if (q.includes("/")) {
                  query = query.replaceAll("/", "-")
                }
            }
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            await axios
                .get(this.URL.manifest_delivery_order +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`,
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    let buttonStatus = {
                          //'print': true, // tombol print default true
                          'depart': true,
                          'cancel': true
                        }
                    
                    arr.map(item => {
                      item["pickup_courier_employee_name"] = (item.employee_courier) ? item.employee_courier.employee_name: null
                      item["node_id_origin_name"] = (item.origin) ? item.origin.node_name: null
                      item["node_id_destination_name"] = (item.destination) ? item.destination.node_name: null
                      item["driver_id"] = (item.pic_employee_id) ? parseInt(item.pic_employee_id): null
                      item["driver_name"] = (item.pic) ? item.pic.employee_name: null
                      item["orion_number"] = item.mts || item.do || "";

                      if (item.hasOwnProperty('status') && item["status"] !== null) {
                          let str = item["status"].toLowerCase();
                          if (!str.includes("ready")) {

                              buttonStatus["depart"] = false;
                              item["button_status"] = buttonStatus;
                          }
                          if (str.includes("cancel")) {
 
                              buttonStatus["cancel"] = false;
                              item["button_status"] = buttonStatus;
                          }
                      }

                      if (item.is_orion == "1") {
                        buttonStatus["cancel"] = false;
                        item["button_status"] = buttonStatus;
                      }
                    })

                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'Surat Jalan data is empty!', ' Please create a new Surat Jalan data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Surat Jalan data', err)
                })
        },

        closeDialogConfirm(){
            this.confirmDialog = false
            this.refresh();
        },

        actionUpdate(val, key) {
          switch(key) {
                case "print":

                    let routeData = this.$router.resolve({ name: 'printGeneral', params: { 'id': val.manifest_do_number, 'type': 'manifest-delivery-order', 'node_id':this.listenNodeId } });
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
                    obj['is_penerusan'] = val.is_penerusan

                    this.form = obj
                    this.depart()

                    break;
                case 'cancel':
                  this.manifest_do_number = val.manifest_do_number
                  this.cancel()
                default:

                    // code block
            }
        },
        handleEdit(val){
          if(this.dataTable.length > 0) {
            this.dataItem = val
            this.dataItem["destination_id"] = val.node_id_destination ? val.node_id_destination : ''
            this.dataItem["moda_angkutan_id"] = val.vehicle_mode_id ? parseInt(val.vehicle_mode_id) : ''
            this.dataItem["no_moda_angkutan_id"] = val.vehicle_id ? parseInt(val.vehicle_id) : ''
            this.dataItem["manifest_do_item"] = val.detail ? val.detail : ''
            this.dataItem["driver_id"] = val.pic_employee_id ? parseInt(val.pic_employee_id) : ''
            this.dataItem["max_weight"] = val.max_weight
            this.dataItem["driver_id"] = val.driver_id ? parseInt(val.driver_id) : ''
            this.dataItem["vehicle_type_id"] = val.vehicle_type_id ? parseInt(val.vehicle_type_id) : ''
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

            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
        },

        actionCancel(row){
          this.pickupData = row;
          this.activeDialogCancel = true;
        },
        async depart() {
            this.loading = true
            await axios
                .put(
                    this.URL.manifest_delivery_order + `/${this.manifest_do_number}/detail/${this.manifest_do_number}?n=${this.listenNodeId}`,
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
        async cancel() {
            this.loading = true
          let formCancel={}
            await axios
                .post(
                    this.URL.manifest_delivery_order + `/${this.manifest_do_number}/cancel?n=${this.listenNodeId}`,
                    JSON.stringify(formCancel),
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
          this.refresh();
        },
        closeDialogSuratJalan() {
          this.dialogSuratJalan = false
          this.refresh();
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