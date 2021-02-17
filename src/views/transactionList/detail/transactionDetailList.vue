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
                    key: "koli_qty",
                    width: "auto"
                },
                {
                    label: "From",
                    key: "connote_shipper_name",
                    width: "auto"
                },
                {
                    label: "To",
                    key: "connote_receiver_name",
                    width: "auto"
                },
                {
                    label: "Service",
                    key: "connote_service_code",
                    width: "auto"
                },
                {
                  label: "Origin",
                  key: "connote_shipper_tlc",
                  width: "xs"
                },
                {
                  label: "Destination",
                  key: "connote_receiver_tlc",
                  width: "xs"
                },
                {
                  label: "Date",
                  key: "created_at",
                  width: "xs"
                },
                {
                  label: "Due Date",
                  key: "connote_sla_date",
                  width: "xs"
                },
                {
                  label: "Amount",
                  key: "amount_price",
                  width: "auto"
                },
                {
                  label: "Surcharges",
                  key: "amount_surcharge",
                  width: "auto"
                },
                {
                  label: "Insurance",
                  key: "amount_insurance",
                  width: "auto"
                },
                {
                  label: "Adm. Fee",
                  key: "amount_adm_insurance",
                  width: "sm"
                },
                {
                  label: "Discount",
                  key: "amount_discount",
                  width: "auto"
                },
                {
                  label: "Total",
                  key: "amount_total_price",
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