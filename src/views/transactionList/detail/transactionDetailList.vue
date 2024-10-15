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
        
        :hasLinked="['connote_number']"
        :hasPagination="true"
        :onRowClickCallback="updateSelected"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @handleEdit="actionDetail"

        :customAction="true"
        :customActionList="customActionList"
        @actionUpdate="actionUpdate"
        />

      <!--avoid transaction Dialog-->
      <dialogAvoidTransaction
          :active="dialogAvoidActive"
          @refresh="refresh"
          :closeDialog="closeDialogAvoid"
          title="Cancel Transaction"
          :transactionId="transactionId"
          :connoteNumber="connote_number"
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
        dateFilter: Array,
        searchBy: String,
        filterDateBy: String
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
                {
                  label: "Cancel",
                  key: "is_void_status",
                  width: "auto"
                },


            ],
            customActionList: [
              {
                label: 'Cancel',
                key: 'void',
                attribute: 'warn',
              },
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
            transactionId: "",
            connote_number: "",
            dialogAvoidActive: false,
            tempDate: [],
            startDate: "",
            endDate: "",
            pagination: {
                limit:10,
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
                .get(this.URL.transaction +'/'+this.transactionId+`?n=${this.listenNodeId}&s=${query}&sort_order=desc&limit=${limit}&page=${page}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`,
                this.Helper.header())
                .then(res => {
                    let arr =res.data.data.connote.data
                    // arr.map((item) => {
                    //   item["isDisabled"] = item.is_void == true ? true : false;
                    //   item["is_void_status"] = item.is_void == 1 ? 'YES' : '-'
                    //   // setTimeout(() => {
                    //   //   item["isDisabled"] =
                    //   //     item.is_void == true
                    //   //       ? (this.$parent.$refs.btnPrintAll.$el.disabled = true)
                    //   //       : (this.$parent.$refs.btnPrintAll.$el.disabled = false);
                    //   // }, 1000);
                    // });
                    this.dataTable = arr
                    this.$emit("printAllData", this.dataTable)

                    this.pagination.page = res.data.data.connote.current_page
                    this.pagination.limit = parseInt(res.data.data.connote.per_page)
                    this.pagination.page_size = res.data.data.connote.last_page
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate tariff list', err)
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

            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
        },
        actionDetail(row){
          this.$router.push({name:'InventoryItem-detail', params:{ id:row.connote_number}});
          this.setRoutePageHistory(this.$route.meta, false);
        },
        getTransactionIdParam(){
          let paramId =  this.$route.params.id
          this.transactionId = String(paramId)
        },
        closeDialogAvoid() {
          this.dialogAvoidActive = false
          this.refresh()
        },
        actionAvoid(){

          this.dialogAvoidActive = true
        },
        actionUpdate(val, key) {
          switch(key) {
                case "print":
                    let kolinumber = ''
                    if(val.hasOwnProperty('koli')) {
                      val.koli.map(item => {
                          if(item.koli_number) {
                            if(kolinumber == '') {
                              kolinumber = item.koli_number
                            } else {
                              kolinumber = `${kolinumber},${item.koli_number}`
                            }
                          }
                      })
                    }
                    let routeData = this.$router.resolve({
                      name: 'printGeneral',
                      params: {
                        'id': kolinumber,
                        'type': 'koli-reprint',
                        'node_id': this.listenNodeId
                      } 
                    });

                    const printWindow = window.open(routeData.href, '_blank', 'noopener');
      
                    if (printWindow) {
                      printWindow.onload = function() {
                        printWindow.print();
                        printWindow.onafterprint = () => printWindow.close();
                      };
                    }
                    break;
                case "void":
                    this.connote_number = val.connote_number
                    this.dialogAvoidActive = true
                   break;
                default:

                    // code block
            }
        },
        updateSelected(_event, _item, selected) {
          this.selectedRow = selected.flatMap(connote => connote.koli.map(koli => koli.koli_number))
          this.$emit("handleSelectedRow", this.selectedRow)
        },
        actionPrintSelected(val){
          let routeData = this.$router.resolve({
            name: 'printGeneral',
            params: {
              'id': val ? val.toString() : this.selectedRow.toString(),
              'type': 'koli-reprint',
              'node_id': this.listenNodeId
            } 
          });
          
          const printWindow = window.open(routeData.href, '_blank', 'noopener');
      
          if (printWindow) {
            printWindow.onload = function() {
              printWindow.print();
              printWindow.onafterprint = () => printWindow.close();
            };
          }
        },
    },
    mounted() {
        this.getTransactionIdParam()
        this.refresh()
    }
}
</script>