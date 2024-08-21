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
        :hasLinked="hasLinkedItem"
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
        searchBy: String,
        nodeType:String,
        origin:String/Number,
        destination:String,
        received:String/Number,
        prealert:String/Number,
        hasLinkedItem: {
          type: Array,
          default: () => ['inbound_number'],
        },
        filterDateBy: String,
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
                  label: "Vehicle",
                  key: "vehicle",
                  width: "xs"
                },
                {
                    label: "From",
                    key: "inbound_node_name_origin",
                    width: "xs"
                },
                {
                    label: "Bag",
                    key: "inbound_total_bag",
                    width: "auto"
                },
                {
                    label: "Koli",
                    key: "inbound_total_koli",
                    width: "auto"
                },
                {
                    label: "Weight (Kg)",
                    key: "inbound_total_weight",
                    width: "auto"
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
                {
                  label: "Status",
                  key: "status",
                  width: "auto"
                },
                {
                  label: "Received At",
                  key: "inbound_node_name_receiver",
                  width: "auto"
                },
                {
                  label: "Received Time",
                  key: "received_at",
                  width: "auto"
                },
            ],
            loading: false,
            tempSearch: "",
            tempDate: [],
            nodeOrigin: "",
            nodeDestination: "",
            node_type:'',
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            statusReceived:"",
            prealertFilter:""
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.nodeOrigin, this.nodeDestination, this.node_type,this.prealertFilter, this.startDate, this.endDate)
                }
            }
        },
        nodeType: function(val, old) {
          if(val !== undefined) {
            this.node_type = val
            if(this.node_type !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.nodeOrigin, this.nodeDestination, val,this.prealertFilter, this.startDate, this.endDate)
            }
          }
        },
        received: function(val, old) {
          if(val !== undefined) {
            this.statusReceived = val
            if(this.statusReceived !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.node_type, this.nodeOrigin, this.nodeDestination, val,this.prealertFilter, this.startDate, this.endDate)
            }
          }
        },
        origin: function(val, old) {
          if(val !== undefined) {
            this.nodeOrigin = val
            if(this.nodeOrigin !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, val, this.nodeDestination, this.node_type,this.prealertFilter, this.startDate, this.endDate)
            }
          }
        },
        destination: function(val, old) {
          if(val !== undefined) {
            this.nodeDestination = val
            if(this.nodeDestination !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.nodeOrigin, val, this.node_type,this.prealertFilter, this.startDate, this.endDate)
            }
          }
        },
        prealert: function(val, old) {
          if(val !== undefined) {
            this.prealertFilter = val
            if(this.prealertFilter !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.nodeOrigin, this.nodeDestination,  this.node_type, this.statusReceived,val, this.startDate, this.endDate)
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
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.nodeOrigin, this.nodeDestination, this.node_type, this.statusReceived, this.prealertFilter, this.startDate, this.endDate)
          }
        }
    },
    methods: {
        async getTableData(limit,page,q, origin, destination,node_type,statusReceived, prealertFilter, from, to) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            let isReceived = "";
            let isPrealert = "";
            if(q !== undefined) {
                query = q
            }

            
            if(statusReceived !== undefined && statusReceived !== '-') {
              isReceived = statusReceived
            }
            if(prealertFilter !== undefined && prealertFilter !== '-') {
              isPrealert = prealertFilter
            }
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            await axios
                .get(this.URL.inbound_incoming +
                `?n=${this.listenNodeId}&type=${node_type}&status=${isReceived}&origin=${origin}&destination=${destination}&prealert=${isPrealert}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}&start_date=${startDate}&end_date=${endDate}&is_airport=true`,
                this.Helper.header())
                .then(res => {
                    let total = 0
                    this.dataTable = res.data.data
                    this.dataTable.map(item=>{
                      let im = []
                      item['inbound_eta'] = this.dateConvert(item['inbound_eta'])
                      item['inbound_etd'] = this.dateConvert(item['inbound_etd'])
                      item['departed_at'] = this.dateConvert(item['departed_at'])
                      item['vehicle'] = item['vehicle_type_name']
                      item['inbound_number'] = isPrealert == 'bag' ? item['bag_number'] : item['inbound_number']
                      if(item['vehicle_name'] != null){
                        item['vehicle'] = item['vehicle'] + '('+item['vehicle_name']+')'
                      }
                      if (item['manifest_do_items'].length > 0) {
                        item['manifest_do_items'].map(el => {
                          im.push(el.im_number)
                        })
                      }
                      if (item['manifest_items'].length > 0) {
                        item['manifest_items'].map(el => {
                          im.push(el.im_number)
                        })
                      }
                      if (im.length > 0) {
                        im = [...new Set(im)]
                        item['im_numbers'] = im.join(", ")
                      }
                      total = Number(total) + Number(item.transaction_amount);
                    })
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', null, 'inbound data is empty!', ' Please create a new data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate data', err)
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
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.nodeOrigin, this.nodeDestination, this.node_type, this.statusReceived, this.prealertFilter, this.startDate, this.endDate)
        },

        actionDetail(row){
          this.$router.push({ name: 'InboundIncomingDetail', params: { inbound_id: row.inbound_id } });
        },
    },
    mounted() {
        this.refresh()
    }
}
</script>