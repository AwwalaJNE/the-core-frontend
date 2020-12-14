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
        :printAction="true"
        :avoidAction="true"
        :hasLinked="['connote_number']"
        :hasPagination="false"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @handleEdit="actionDetail"
        @actionAvoid="actionAvoid"
        />

      <!--avoid transaction Dialog-->
      <dialogAvoidTransaction
          :active="dialogAvoidActive"
          @refresh="refresh"
          :closeDialog="closeDialogAvoid"
          title="Void Transaction"
          :transactionId="transactionId"
      />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import dialogAvoidTransaction from "@/views/transactionList/detail/dialogAvoidTransaction"
export default {
    name:"transaction-Detail",
    mixins: [master],
    props: {
        query: String,
    },
    components: {
        "table-master" : TableMaster,
        "dialogAvoidTransaction" : dialogAvoidTransaction
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Connote #",
                    key: "connote_number",
                    width: "xs"
                },
                {
                    label: "Koli",
                    key: "tariff_origin",
                    width: "auto"
                },
                {
                    label: "From",
                    key: "tariff_destination",
                    width: "auto"
                },
                {
                    label: "To",
                    key: "transaction_amount",
                    width: "auto"
                },
                {
                    label: "Service",
                    key: "tariff_amount_1",
                    width: "auto"
                },
                {
                  label: "Origin",
                  key: "transaction_date",
                  width: "sm"
                },
                {
                  label: "Destination",
                  key: "payment_type_name",
                  width: "auto"
                },
                {
                  label: "Date",
                  key: "created_at",
                  width: "auto"
                },
                {
                  label: "Due Date",
                  key: "created_at",
                  width: "auto"
                },
                {
                  label: "Amount",
                  key: "created_at",
                  width: "auto"
                },
                {
                  label: "Surcharges",
                  key: "created_at",
                  width: "auto"
                },
                {
                  label: "Insurance",
                  key: "created_at",
                  width: "auto"
                },
                {
                  label: "Adm. Fee",
                  key: "created_at",
                  width: "auto"
                },
                {
                  label: "Discount",
                  key: "created_at",
                  width: "auto"
                },
                {
                  label: "Total",
                  key: "created_at",
                  width: "auto"
                },

            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            transactionId: "",
            dialogAvoidActive: false,
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
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
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
            await axios
                .get(this.URL.transaction +'/'+this.transactionId+`?n=${this.listenNodeId}`,
                this.Helper.header())
                .then(res => {
                    let arr =res.data.data.connote

                  console.log(arr)
                    this.dataTable = arr

                    this.pagination.page = res.data.meta ? res.data.meta.current_page : 1
                    this.pagination.limit = res.data.meta ? parseInt(res.data.meta.per_page) : 1000
                    this.pagination.page_size = res.data.meta ? res.data.meta.last_page : 1
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate tariff list', err)
                })
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        actionDetail(row){
          this.$router.push({name:'InventoryItem-detail', params:{ id:row.connote_number}});
        },
        getTransactionIdParam(){
          let paramId =  this.$route.params.id
          this.transactionId = String(paramId)
        },
        closeDialogAvoid() {
          this.dialogAvoidActive = false
        },
        actionAvoid(){
          console.log('gas')
          this.dialogAvoidActive = true
        }

    },
    mounted() {
        this.getTransactionIdParam()
        this.refresh()
    }
}
</script>