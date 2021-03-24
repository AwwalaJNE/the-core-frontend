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
        :hasLinked="['inbound_number']"
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
    name:"Inbound-Incoming",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array,
        nodeType:String,
        origin:String,
        destination:String
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                  label: "Inbound Number",
                  key: "inbound_number",
                  width: "xs"
                },
                {
                    label: "Vehicle Type",
                    key: "transaction_id",
                    width: "xs"
                },
                {
                    label: "From",
                    key: "ibound_node_name_origin",
                    width: "xs"
                },
                {
                    label: "#SM /SJ /PICKUP",
                    key: "inbound_type",
                    width: "xs"
                },
                {
                    label: "Bag",
                    key: "inbound_total_bag",
                    width: "auto"
                },
                {
                    label: "Weight (Kg)",
                    key: "inbound_total_weight",
                    width: "xs"
                },
                {
                  label: "Unreceive",
                  key: "transaction_date",
                  width: "auto"
                },
                {
                  label: "Vehicle No",
                  key: "vehicle_type_name",
                  width: "xs"
                },
                {
                  label: "PIC",
                  key: "carrier_employee_name",
                  width: "xs"
                },
                {
                  label: "ETA",
                  key: "inbound_eta",
                  width: "xs"
                },
                {
                  label: "ETD",
                  key: "inbound_etd",
                  width: "xs"
                },
                {
                  label: "Departed",
                  key: "departed_at",
                  width: "xs"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            nodeOrigin: "",
            nodeDestination: "",
            node_type:'',
            dialogTariff: false,
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
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.nodeOrigin, this.nodeDestination, this.node_type)
                }
            }
        },
        nodeType: function(val, old) {
          if(val !== undefined) {
            this.node_type = val
            if(this.node_type !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.nodeOrigin, this.nodeDestination, val)
            }
          }
        },
        origin: function(val, old) {
          if(val !== undefined) {
            this.nodeOrigin = val
            if(this.nodeOrigin !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, val, this.nodeDestination, this.node_type)
            }
          }
        },
        destination: function(val, old) {
          if(val !== undefined) {
            this.nodeDestination = val
            if(this.nodeDestination !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.nodeOrigin, val, this.node_type)
            }
          }
        },
    },
    methods: {
        async getTableData(limit,page,q, origin, destination,node_type) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            if(q !== undefined) {
                query = q
            }


            await axios
                .get(this.URL.inbound_incoming +
                `?n=${this.listenNodeId}&type=${node_type}&origin=${origin}&destination=${destination}&sort_order=desc&limit=${limit}&page=${page}&s=${query}`,
                this.Helper.header())
                .then(res => {

                    let total = 0
                    this.dataTable = res.data.data
                    this.dataTable.map(item=>{
                      item['inbound_eta'] = this.dateConvert(item['inbound_eta'])
                      item['inbound_etd'] = this.dateConvert(item['inbound_etd'])
                      item['departed_at'] = this.dateConvert(item['departed_at'])
                      total = Number(total) + Number(item.transaction_amount);
                    })
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        this.openNotification('warn', 'inbound data is empty!', ' Please create a new data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate data', err)
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
          this.$router.push({ name: 'InboundIncomingScan', params: { inbound_id: row.inbound_id } });
        }

    },
    mounted() {
        this.refresh()
    }
}
</script>