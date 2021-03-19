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
        
        :hasLinked="['transaction_id']"
        :hasPagination="true"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @handleEdit="actionDetail"

        :customAction="true"
        :customActionList="customActionList"
        @actionUpdate="actionUpdate"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"transaction-list",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Transaction",
                    key: "transaction_id",
                    width: "xs"
                },
                {
                    label: "Total Connotes",
                    key: "total_connote",
                    width: "auto"
                },
                {
                    label: "Shipper Name",
                    key: "connote_shipper_name",
                    width: "auto"
                },
                {
                    label: "Total Amount",
                    key: "transaction_amount",
                    width: "auto"
                },
                {
                    label: "User",
                    key: "user_name",
                    width: "auto"
                },
                {
                  label: "Date",
                  key: "transaction_date",
                  width: "sm"
                },
                {
                  label: "Payment Type",
                  key: "payment_type_name",
                  width: "auto"
                }
            ],
            customActionList: [
              {
                label: 'Print',
                key: 'print',
                attribute: '',
                option: {
                  type: 'redirect',

                }
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
        }
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
                .get(this.URL.transaction +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    let total = 0
                    this.dataTable = res.data.data
                    this.dataTable.map(item=>{
                        if(item.hasOwnProperty('is_paid')) {
                            if(item['is_paid'] == 1 || item['is_paid'] == '1') {
                                total = Number(total) + Number(item.transaction_amount);
                                item['total_connote'] = item.connote.length
                                item['connote_shipper_name'] = item.connote.length > 0 ? item.connote[0].connote_shipper_name : null
                                item['user_name'] = item.user ? item.user.user_name : '-'
                            }
                        }
                      
                    })
                    this.setTotalAmount(total);
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        this.openNotification('warn', 'Transaction data is empty!', ' Please create a new Transaction data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Transaction list', err)
                })
        },

        actionUpdate(val, key) {
          switch(key) {
                case "print":
                    let routeData = this.$router.resolve({ name: 'printGeneral', params: { 'id': val.transaction_id, 'type': 'transaction'} });
                    window.open(routeData.href, '_blank');
                    break;
                default:
                    console.log('meong')
                    // code block
            }
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

        setTotalAmount(val){
          this.$emit("totalAmount", val)
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