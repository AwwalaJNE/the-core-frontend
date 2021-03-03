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
                    label: "Vehicle Type",
                    key: "transaction_id",
                    width: "xs"
                },
                {
                    label: "From",
                    key: "tariff_origin",
                    width: "auto"
                },
                {
                    label: "#SM /SJ /PICKUP",
                    key: "inbound_number",
                    width: "auto"
                },
                {
                    label: "Bag",
                    key: "inbound_total_bag",
                    width: "auto"
                },
                {
                    label: "Weight (Kg)",
                    key: "inbound_total_weight",
                    width: "auto"
                },
                {
                  label: "Unreceive",
                  key: "transaction_date",
                  width: "sm"
                },
                {
                  label: "Vehicle No",
                  key: "payment_type_name",
                  width: "auto"
                },
                {
                  label: "PIC",
                  key: "payment_type_name",
                  width: "auto"
                },
                {
                  label: "ETA",
                  key: "inbound_eta",
                  width: "auto"
                },
                {
                  label: "ETD",
                  key: "inbound_etd",
                  width: "auto"
                },
                {
                  label: "Departed",
                  key: "departed_at",
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
                .get(this.URL.inbound_incoming +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    let total = 0
                    this.dataTable = res.data.data
                    this.dataTable.map(item=>{
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
          this.$router.push({ name: 'InboundIncomingScan', params: { inbound_number: row.inbound_number } });
        }

    },
    mounted() {
        this.refresh()
    }
}
</script>