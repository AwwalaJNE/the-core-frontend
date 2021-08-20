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
        :hasLinked="['employee_name']"
        :hasPagination="true"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @handleEdit="actionDetail"
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
        dateFilter: String,
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
                    label: "Runsheet #",
                    key: "delivery_runsheet_number",
                    width: "md"
                },
                {
                    label: "Courier Code",
                    key: "employee_code",
                    width: "xs"
                },
                {
                    label: "Name",
                    key: "employee_name",
                    width: "auto"
                },
                {
                    label: "Total Koli",
                    key: "total_koli",
                    width: "xs"
                },
                // {
                //   label: "Cod",
                //   key: "total_cod",
                //   width: "xs"
                // },
                // {
                //   label: "Cod Collected",
                //   key: "total_cod_collected",
                //   width: "xs"
                // },
                {
                    label: "Delivered",
                    key: "total_delivered",
                    width: "xs"
                },
                {
                    label: "Undelivered",
                    key: "total_undelivered",
                    width: "xs"
                },
                {
                  label: "Undeliver Receiving",
                  key: "total_undelivery_received",
                  width: "xs"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            date: "",
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
                .get(this.URL.courier_delivery +
                `?n=${this.listenNodeId}&s=${query}&date_filter=${this.dateFilter}`,
                this.Helper.header())
                .then(res => { 
                    this.dataTable = res.data.data.map((value)=>{
                        return value
                    })
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
        },

        actionDetail(row){
            let params = {
                employee_id: row.employee_id,
                employee_code: row.employee_code,
                employee_name: row.employee_name,
            }
            let routeName = 'delivery-runsheet-new'
            if(row.delivery_runsheet_number){
                params.delivery_runsheet_number = row.delivery_runsheet_number;
                routeName = 'delivery-runsheet-edit';                
            }
            this.$router.push({ name: routeName, params: params });            
        }

    },
    mounted() {
        this.refresh()
    }
}
</script>