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
        :hasLinked="['manifest_number']"
        :pickupListAction="true"
        :cancelRequestAction="true"
        :hasPagination="true"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @actionPrint="actionPrint"
        @actionCancel="actionCancel"
        @handleEdit="actionUpdate"
        />

      <!--Create pickup List-->
      <dialogCreateManifest
          :active="dialogManifestList"
          @refresh="refresh"
          :closeDialog="closeDialogPickupList"
          title="Edit Manifest"
          :dataItem="dataItem"
      />

      <!-- dialog confirm remove manifest-->
      <dialog-confirm
          :active="activeDialogCancel"
          :loading="activeLoadingCancel"
          :closeDialog="closeDialogConfirmCancel"
          title="Cancel Surat Muatan"
          message="Are you sure you want to Cancel Surat Muatan ?"
          @confirm="confirmCancel"
          @cancel="closeDialogConfirmCancel"
      />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateManifest from "@/views/transport/manifest/dialogCreateEditManifest"
import DialogPicked from "@/views/pickup/list/dialogPicked"
import DialogConfirm from "@/components/dialog/dialogConfirm"

export default {
    name:"pickup-requestlist",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array,
        node:String
    },
    components: {
        "table-master" : TableMaster,
        "dialogCreateManifest": DialogCreateManifest,
        "DialogPicked": DialogPicked,
        "dialog-confirm": DialogConfirm
    },
    data() {
        return {
            //cancel pickup
            activeDialogCancel:false,
            activeLoadingCancel:false,

            dataTable: [],
            dialogManifestList:false,
            dialogPickedActive: false,
            datacolumn: [
                {
                    label: "No Surat Muatan",
                    key: "manifest_number",
                    width: "xs"
                },
                {
                    label: "Date#",
                    key: "created_at",
                    width: "sm"
                },
                {
                    label: "Type SM",
                    key: "manifest_type_name",
                    width: "auto"
                },
                {
                  label: "Jenis Kiriman",
                  key: "jenis_kiriman",
                  width: "xs"
                },
                {
                  label: "Origin",
                  key: "origin_name",
                  width: "sm"
                },
                {
                  label: "Destination",
                  key: "destination_name",
                  width: "sm"
                },
                {
                    label: "Max Weight",
                    key: "max_weight",
                    width: "auto"
                },
                {
                    label: "ETA",
                    key: "eta",
                    width: "sm"
                },
                {
                    label: "ETD",
                    key: "etd",
                    width: "sm"
                },
                {
                    label: "status",
                    key: "status",
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
            dialogTariff: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            manifest_number:''
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.node_filter)
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
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, this.node_filter)
          }
        },
        node: function(val, old) {
          if(val !== undefined) {
            this.node_filter = val
            if(this.node_filter !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, val)
            }
          }
        },
    },
    methods: {
        async getTableData(limit,page,q, from, to, node) {
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
                .get(this.URL.surat_muatan +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    // this.dataTable = res.data.data
                    let arr = res.data.data
                    arr.map(item => {
                        item["pickup_courier_employee_name"] = (item.employee_courier) ? item.employee_courier.employee_name: null
                        item["manifest_type_name"] = (item.manifest_method) ? item.manifest_method.vehicle_mode_name: null
                        item['jenis_kiriman'] = (item.vehicle_type) ? item.vehicle_type.vehicle_type_name: '-'
                        item['origin_name']       = (item.origin) ? item.origin.node_name: '-'
                        item['destination_name']  = (item.destination) ? item.destination.node_name: '-'
                        item['eta']  = this.dateConvert(item.eta)
                        item['etd']  = this.dateConvert(item.etd)
                        item['created_at']  = this.dateConvert(item.created_at)
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'Surat Muatan data is empty!', ' Please create Surat Muatan data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Surat Muatan', err)
                })
        },

        closeDialogConfirmPicked(){
            this.dialogPickedActive = false
            this.refresh();
        },
        closeDialogPickupList() {
          this.dialogManifestList = false
          this.refresh();
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

        actionUpdate(val){
          if(this.dataTable.length > 0) {
            val["node_id_origin"] = val["origin_name"] 
            val["node_id_destination"] = val["destination_name"]
            val['manifest_method_id'] = parseInt(val['manifest_method_id'])
            val['vehicle_id'] = parseInt(val['vehicle_id'])
            val['pic_employee_id'] = parseInt(val['pic_employee_id'])
            val['vehicle_type_id'] = parseInt(val['vehicle_type_id'])
            val['flight_number'] = val['flight_number']
            val['flight_schedule'] = val['flight_schedule']
            console.log(val,'bagus')
            this.dataItem = val
            if (parseInt(val['manifest_method_id']) === 1) {
              this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_visible", true)
              this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible", true)
              this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_ValueData", val["origin"])
            }else{
              this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_visible", false)
              this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible", false)
              this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_ValueData", val["origin"])
            }
            this.$store.dispatch(`SET_SURAT_MUATAN_NODE_ID_ORIGIN_ValueData`, val["origin"])
            this.$store.dispatch(`SET_SURAT_MUATAN_NODE_ID_DESTINATION_ValueData`, val["destination"])

            this.$nextTick(() => {
              this.dialogManifestList = true
            });
          }
        },


        //cancel pickup
        confirmCancel(val) {
          let form = {};
          form.status = 'CANCELED';
          form.manifest_number = this.manifest_number;
          this.cancelData(form, this.manifest_number)
        },

        closeDialogConfirmCancel(){
          this.activeDialogCancel = false
          this.activeLoadingCancel=false
          this.refresh();
        },
        async cancelData(form, surat_muatan){
          await axios
              .put(
                  this.URL.surat_muatan + `/${this.manifest_number}?n=${this.listenNodeId}`,
                  JSON.stringify(form),
                  this.Helper.header())
              .then(res => {
                this.closeDialogConfirmCancel()
                this.btnLoading = false
                this.activeLoadingCancel = false
                this.refresh()
                this.openNotification(null, 'Success', 'Delete manifest is success')
              }).catch(err => {
                this.btnLoading = false
                this.activeLoadingCancel = false
                this.closeDialogConfirmCancel()
                this.refresh()
                this.openNotification('danger', 'Delete Manifest is failed', err)
              })
        },

        actionPrint(row){
        let routeData = this.$router.resolve({ 
          name: 'printGeneral', 
          params: { 
              'id': row.manifest_number, 
              'type': 'manifest',
              'node_id': this.listenNodeId
          } 
        });
        window.open(routeData.href, '_blank');
          console.log(row,'print')
        },
        actionCancel(row){

          this.manifest_number = row.manifest_number
          this.activeDialogCancel = true;
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