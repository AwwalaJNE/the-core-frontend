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
        :hasPagination="false"
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
        inboundId: Number,
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Manifest No.",
                    key: "inbound_number",
                    width: "xs"
                },
                {
                    label: "Received",
                    key: "total_received",
                    width: "xxs"
                },
                {
                  label: "Unreceived",
                  key: "total_unreceived",
                  width: "xxs"
                },

                {
                  label: "Status",
                  key: "status_received",
                  width: "xxs"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            inbound_id:'',
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
          console.log('paramquery', val)
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
                }
            }
        },
        inboundId: function(val, old) {
          console.log('param', val)
          if(val !== undefined) {
            this.inbound_id = val
            if(this.inbound_id !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch)
            }
          }
        },
    },
    methods: {
        async getTableData(limit,page,q) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            if(q !== undefined) {
                query = q
            }
            await axios
                .get(this.URL.inbound +
                `/${this.inboundId}/inbound-status?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    let data=[res.data.data]
                    data.map(item=>{
                      item['total_received'] = item.total_received.toString()
                      item['total_unreceived'] = item.total_unreceived.toString()
                    })
                    this.dataTable = data

                    this.pagination.page = res.data.meta ? res.data.meta.current_page : 1
                    this.pagination.limit = res.data.meta ? parseInt(res.data.meta.per_page) : 20
                    this.pagination.page_size = res.data.meta ? res.data.meta.last_page : 1

                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Inbound list', err)
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },

        actionDetail(row){
          this.$router.push({ name: 'detailConnote', params: { id: row.transaction_id } });
        }

    },
    mounted() {
        this.refresh()
    }
}
</script>