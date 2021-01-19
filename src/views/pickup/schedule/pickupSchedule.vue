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
        :expandable="true"
        @actionUpdate="actionUpdate"
        @actionRemove="actionRemove"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        />

      <!--Create nodelik Dialog end-->
      <dialog-create-edit-pickup-schedule
          :active="dialogPickupSchedule"
          :closeDialog="closeDialogPickupSchedule"
          @refresh="refresh"
          btnBlue="Edit"
          :withSchedule="true"
          title="Edit Pickup Schedule"
          :dataItem="dataItem"
      />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import dialogCreateEditPickupSchedule from "@/views/pickup/schedule/dialogCreateEditPickupSchedule";
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
        "dialog-create-edit-pickup-schedule" : dialogCreateEditPickupSchedule
    },
    data() {
        return {
            dialogPickupSchedule:false,
            dataTable: [],
            datacolumn: [
                {
                    label: "Name",
                    key: "pickup_schedule_name",
                    width: "xs"
                },
                {
                    label: "PIC",
                    key: "pickup_schedule_pic_name",
                    width: "auto"
                },
                {
                    label: "Destination",
                    key: "pickup_schedule_node_id_destination",
                    width: "auto"
                },
                {
                    label: "Courier",
                    key: "pickup_courier_employee_name",
                    width: "auto"
                },
                {
                    label: "Remark",
                    key: "pickup_schedule_remarks",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            startDate: "",
            endDate: "",
            node_filter: "",
            dialogTariff: false,
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            },

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
                .get(this.URL.pickup_schedule +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {

                    let arr = res.data.data
                    arr.map(item => {
                      item["pickup_courier_employee_name"] = (item.employee_courier) ? item.employee_courier.employee_name: null
                    })

                    this.dataTable = arr
                    this.dataTable.length > 0 && this.dataTable.map((item,i) => {
                      let detail = item.detail
                      let objchild = []
                      let date = []
                      let time = []
                      detail.map(itemdetail =>{
                        date.push(this.dayConverter(itemdetail.day_of_week))
                        time.push(itemdetail.pickup_time)
                      })
                      objchild['Date'] = date
                      objchild['Times'] = time
                      item['children'] = objchild
                    })
                  console.log(this.dataTable)
                  this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        this.openNotification('warn', 'tariff data is empty!', ' Please create a new tariff data')
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

        actionUpdate(val){
          this.dataItem = val

          console.log(this.dataItem, 'nihh val', val)
          this.$nextTick(() => {
            this.dialogPickupSchedule = true
          });
        },
        actionRemove(val){

        },
        closeDialogPickupSchedule() {
          this.dialogPickupSchedule = false
        }


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