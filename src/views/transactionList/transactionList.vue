<template>
    <div>
        <table-master 
        hideColumnKey="transaction-list" 
        :dataTable="dataTable" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="false"
        
        :hasLinked="['transaction_id']"
        :hasPagination="true"
        :onRowClickCallback="updateSelected"
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
        dateFilter: Array,
        searchBy: String,
        filterDateBy: String
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Transaction ID",
                    key: "transaction_id",
                    width: "xs"
                },
                {
                    label: "Connote Number",
                    key: "connote_number",
                    width: "auto"
                },
                {
                    label: "Shipper Name",
                    key: "connote_shipper_name",
                    width: "auto"
                },
                {
                    label: "Origin",
                    key: "connote_origin",
                    width: "auto"
                },
                {
                    label: "Destination",
                    key: "connote_destination",
                    width: "auto"
                },
                {
                    label: "Total Amount (Rp)",
                    key: "transaction_amount",
                    width: "xxs",
                    type_amount: true,
                    textAlign: "right"
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
            },
            selectedRow: []
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
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
            if (from !== undefined && to !== undefined) {
              startDate = this.formatToWIB(from)
              endDate = this.formatToWIB(to)
            }
            await axios
                .get(this.URL.transaction +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&is_paid=1&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`,
                this.Helper.header())
                .then(res => {
                    let total = 0
                    let data = res.data.data
                    // data = data.filter(item => item['is_paid'] == 1)

                    data.map(item=>{
                        // if(item.hasOwnProperty('is_paid')) {
                        //     if(item['is_paid'] == '1') {
                                total = Number(total) + Number(item.transaction_amount);
                                item.created_at = this.formatTimezone(item.created_at);
                                item.updated_at = this.formatTimezone(item.updated_at);
                                item.transaction_date = this.formatTimezone(item.transaction_date);
                                item['connote_number'] = item.connote.connote_number;
                                item['connote_shipper_name'] = item.connote.connote_shipper_name || null;
                                item['user_name'] = item.user ? item.user.user_name : '-',
                                item['connote_origin'] = item.connote.connote_shipper_tlc
                                item['connote_destination'] = item.connote.connote_receiver_tlc
                        //     }
                        // }
                      
                    })

                    this.dataTable = data
                    this.setTotalAmount(total);
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', null, 'Transaction data is empty!', ' Please create a new Transaction data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate Transaction list', err)
                })
        },

        actionUpdate(val, key) {
          switch(key) {
                case "print":
                    let routeData = this.$router.resolve({ name: 'printGeneral', params: { 'id': val.transaction_id, 'type': 'transaction', 'node_id':this.listenNodeId} });

                    const printWindow = window.open(routeData.href, '_blank', 'noopener');
      
                    if (printWindow) {
                        printWindow.onload = function() {
                            printWindow.print();
                            printWindow.onafterprint = () => printWindow.close();
                        };
                    }
                    break;
                default:

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

            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
        },

        setTotalAmount(val){
          this.$emit("totalAmount", val)
        },
        actionDetail(row){
          this.$router.push({ name: 'detailConnote', params: { id: row.transaction_id } });
          this.setRoutePageHistory(this.$route.meta, false);
        },
        updateSelected(_event, _item, selected) {
          this.selectedRow = selected.map(el => el.transaction_id)
        },
        actionPrintSelected(){
            if (this.selectedRow.length > 0) {
                let routeData = this.$router.resolve({
                    name: 'printGeneral',
                    params: {
                        'id': this.selectedRow.toString(),
                        'type': 'transaction',
                        'node_id':this.listenNodeId
                    }
                });
                
                const printWindow = window.open(routeData.href, '_blank', 'noopener');
      
                if (printWindow) {
                    printWindow.onload = function() {
                        printWindow.print();
                        printWindow.onafterprint = () => printWindow.close();
                    };
                }
            }
            else {
                this.openNotification('warn', null, 'Shortcut Print Gagal', 'Silakan pilih Transaksi terlebih dahulu')
            }
        }
    },
    mounted() {
        window.addEventListener('timezone-changed', this.refresh);
        this.refresh()
        this.handlePrintShortcut(this.actionPrintSelected)
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh);
    },
}
</script>