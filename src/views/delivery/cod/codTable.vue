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
        :codAction="true"
        :hasLinked="['delivery_runsheet_number']"
        :hasPagination="true"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @handleEdit="actionDetail"
        @actionCollect="actionCollect"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"delivery-runsheet",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array,
        node:String
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Nama Kurir",
                    key: "courier_employee_name",
                    width: "xs"
                },
                {
                    label: "Total Connotes",
                    key: "count_connote",
                    width: "xs"
                },
                {
                    label: "Total COD",
                    key: "count_cod",
                    width: "xs"
                },
            ],
            loading: false,
            dataItem: {},
            form:{},
            tempSearch: "",
            tempDate: [],
            startDate: "",
            endDate: "",
            dialogTariff: false,
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
                .get(this.URL.delivery_cod +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data
                    this.dataTable.map(item=>{
                      item['courier_employee_name'] = item.employee_courier.employee_name
                    })
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'Delivery Runsheet data is empty!', ' Please create a new data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Delivery Runsheet list', err)
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

        actionDetail(row){
          console.log(row)
          this.$router.push({ name: 'delivery-runsheet-edit', params: { delivery_runsheet_number: row.delivery_runsheet_number } });
        },
        actionCollect(row){
          console.log(row)
          this.form = {
            courier_employee_id:row.courier_employee_id,
            date:row.date ? row.date : null,
          }
          this.updateData();
        },
        async updateData(){
          await axios
              .put(
                  this.URL.delivery_cod + `?n=${this.listenNodeId}`,
                  JSON.stringify(this.form),
                  this.Helper.header())
              .then(res => {
                this.$emit("refresh")
                this.openNotification(null, 'Collect success', 'Collect is success')
                this.form={}
              }).catch(err => {
                this.loading = false
                this.$emit("refresh")
                this.openNotification('danger', 'Collect failed', err)
                this.form={}
              })
        },

    },
    mounted() {
        this.refresh()
    }
}
</script>