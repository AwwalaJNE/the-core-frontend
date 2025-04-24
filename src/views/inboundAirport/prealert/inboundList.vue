<template>
    <div>
        <table-master 
            hideColumnKey="pre-alert-receiving-airport" 
            :dataTable="dataTable" 
            :dataColumn="!isMobile ? datacolumn.concat(allColumn) : datacolumn" 
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
import master from "@/mixins/master";

import TableMaster from "@/components/table/tableMaster";

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
            ],
            allColumn: [
                {
                    label: "Status",
                    key: "status",
                    width: "auto"
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
                    label: "Total Bag",
                    key: "total_bag",
                    width: "auto",
                },
                {
                    label: "Total Master Bag",
                    key: "total_master_bag",
                    width: "auto",
                },
                {
                    label: "Total Connote",
                    key: "total_koli",
                    width: "auto",
                },
                // {
                //     label: "Item",
                //     key: "inbound_total_bag",
                //     width: "auto"
                // },
                // {
                //     label: "Connote",
                //     key: "inbound_total_koli",
                //     width: "auto"
                // },
                {
                  label: "Fix Cost Weight",
                  key: "fix_cost_weight",
                  width: "auto"
                },
                {
                  label: "Live Cost Weight",
                  key: "live_cost_weight",
                  width: "auto"
                },
                {
                  label: "Fix Actual Weight",
                  key: "fix_actual_weight",
                  width: "auto"
                },
                {
                  label: "Live Actual Weight",
                  key: "live_actual_weight",
                  width: "auto"
                },
                {
                    label: "PIC",
                    key: "carrier_employee_name",
                    width: "xs"
                },
                {
                    label: "Created",
                    key: "created_orion",
                    width: "xs"
                },
                {
                    label: "ETD",
                    key: "inbound_etd",
                    width: "xs"
                },
                {
                    label: "ETA",
                    key: "inbound_eta",
                    width: "xs"
                },
                {
                    label: "Departed",
                    key: "departed_at",
                    width: "xs"
                },
                {
                    label: "Received At",
                    key: "inbound_node_name_receiver",
                    width: "auto"
                },
                {
                    label: "Received By",
                    key: "received_by_user_name",
                    width: "auto"
                },
                {
                    label: "Received Times",
                    key: "received_at",
                    width: "auto"
                },
            ],
            loading: false,
            tempSearch: JSON.parse(localStorage.getItem("InboundAirportPreAlertFilters"))?.tempSearch || '',
            tempDate: JSON.parse(localStorage.getItem("InboundAirportPreAlertFilters"))?.tempDate || [],
            nodeOrigin: JSON.parse(localStorage.getItem("InboundAirportPreAlertFilters"))?.origin || '',
            nodeDestination: JSON.parse(localStorage.getItem("InboundAirportPreAlertFilters"))?.destination || '',
            node_type: JSON.parse(localStorage.getItem("InboundAirportPreAlertFilters"))?.node_type || '',
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            search_by: JSON.parse(localStorage.getItem("InboundAirportPreAlertFilters"))?.searchBy || '',
            statusReceived: JSON.parse(localStorage.getItem("InboundAirportPreAlertFilters"))?.statusReceived || '',
            prealertFilter: JSON.parse(localStorage.getItem("InboundAirportPreAlertFilters"))?.prealertFilter || ''
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(
                      this.pagination.limit, 
                      this.pagination.page, 
                      val, 
                      this.nodeOrigin, 
                      this.nodeDestination, 
                      this.node_type,
                      this.prealertFilter, 
                      this.startDate, 
                      this.endDate, 
                      this.search_by, 
                      this.filterDateBy
                    )
                    this.updateLocalStorage();
                }
            }
        },
        nodeType: function(val, old) {
          if(val !== undefined) {
            this.node_type = val
            if(this.node_type !== old) {
              this.getTableData(
                this.pagination.limit, 
                this.pagination.page, 
                this.tempSearch, 
                this.nodeOrigin, 
                this.nodeDestination, 
                val,
                this.prealertFilter, 
                this.startDate, 
                this.endDate, 
                this.search_by, 
                this.filterDateBy
              )
              this.updateLocalStorage();
            }
          }
        },
        received: function(val, old) {
          if(val !== undefined) {
            this.statusReceived = val
            if(this.statusReceived !== old) {
              this.getTableData(
                this.pagination.limit, 
                this.pagination.page, 
                this.tempSearch, 
                this.node_type, 
                this.nodeOrigin, 
                this.nodeDestination, 
                val,
                this.prealertFilter, 
                this.startDate, 
                this.endDate, 
                this.search_by, 
                this.filterDateBy
              )
              this.updateLocalStorage();
            }
          }
        },
        origin: function(val, old) {
          if(val !== undefined) {
            this.nodeOrigin = val
            if(this.nodeOrigin !== old) {
              this.getTableData(
                this.pagination.limit, 
                this.pagination.page, 
                this.tempSearch, 
                val, 
                this.nodeDestination, 
                this.node_type,
                this.prealertFilter, 
                this.startDate, 
                this.endDate, 
                this.search_by, 
                this.filterDateBy
              )
              this.updateLocalStorage();
            }
          }
        },
        destination: function(val, old) {
          if(val !== undefined) {
            this.nodeDestination = val
            if(this.nodeDestination !== old) {
              this.getTableData(
                this.pagination.limit, 
                this.pagination.page, 
                this.tempSearch, 
                this.nodeOrigin, 
                val, 
                this.node_type,
                this.prealertFilter, 
                this.startDate, 
                this.endDate, 
                this.search_by,
                this.filterDateBy
              )
              this.updateLocalStorage();
            }
          }
        },
        prealert: function(val, old) {
          if(val !== undefined) {
            this.prealertFilter = val
            if(this.prealertFilter !== old) {
              this.getTableData(
                this.pagination.limit, 
                this.pagination.page, 
                this.tempSearch, 
                this.nodeOrigin, 
                this.nodeDestination,  
                this.node_type, 
                this.statusReceived,
                val, 
                this.startDate, 
                this.endDate, 
                this.search_by, 
                this.filterDateBy
              )
              this.updateLocalStorage();
            }
          }
        },
        searchBy: function(val, old) {
          if (val !== undefined) {
            this.search_by = val;
            if (this.search_by !== old) {
              this.getTableData(
                this.pagination.limit,
                this.pagination.page,
                this.tempSearch,
                this.nodeOrigin,
                this.nodeDestination,
                this.node_type,
                this.statusReceived,
                this.prealertFilter,
                this.startDate,
                this.endDate,
                val,
                this.filterDateBy
              );
              this.updateLocalStorage()
            }
          }
        },
        dateFilter: function(val, old) {
          if(val !== undefined) {
            this.tempDate = val
            if(this.tempDate !== old ) {
              this.startDate = this.tempDate !== null ? this.tempDate[0] : ''
              this.endDate = this.tempDate !== null ? this.tempDate[1] : ''
              this.updateLocalStorage()
            }
            this.getTableData(
              this.pagination.limit, 
              this.pagination.page, 
              this.tempSearch, 
              this.nodeOrigin, 
              this.nodeDestination, 
              this.node_type, 
              this.statusReceived, 
              this.prealertFilter, 
              this.startDate, 
              this.endDate, 
              this.search_by, 
              this.filterDateBy
            )
            this.updateLocalStorage();
          }
        }, 
        filterDateBy: function(val, old) {
            if (val !== undefined) {
                if (val !== old && !this.isReset) {
                this.getTableData(
                  this.pagination.limit, 
                  this.pagination.page, 
                  this.tempSearch, 
                  this.nodeOrigin, 
                  this.nodeDestination,  
                  this.node_type, 
                  this.statusReceived, 
                  this.prealertFilter, 
                  this.startDate, 
                  this.endDate, 
                  this.search_by, 
                  val
                );
                this.updateLocalStorage();
              }
            }
        },
    },
    methods: {
        async getTableData(limit,page,q, origin, destination,node_type,statusReceived, prealertFilter, from, to, qFilter, dateFilter) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            let isReceived = "";
            let queryFilter = "";
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
            
            if(qFilter !== undefined) {
                queryFilter = qFilter
            }

            let dateFilterBy = dateFilter || '';

            await axios
                .get(this.URL.inbound_incoming +
                `?n=${this.listenNodeId}&type=${node_type}&status=${isReceived}&origin=${origin}&destination=${destination}&prealert=${isPrealert}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&search_by=${queryFilter}&filter_date_by=${dateFilterBy}&start_date=${startDate}&end_date=${endDate}&is_airport=true&prealert_airport=1`,
                this.Helper.header())
                .then(res => {
                    let total = 0
                    this.dataTable = res.data.data
                    this.dataTable.map(item=>{
                      let im = []
                      item['created_orion'] = item['created_orion'] == null ? this.dateConvert(item['created_at']) : this.dateConvert(item['created_orion']);
                      item['inbound_eta'] = this.dateConvert(item['inbound_eta'])
                      item['inbound_etd'] = this.dateConvert(item['inbound_etd'])
                      item['departed_at'] = this.dateConvert(item['departed_at'])
                      item['vehicle'] = item['vehicle_name']
                      item['inbound_number'] = isPrealert == 'bag' ? item['bag_number'] : item['inbound_number']
                      if(item['vehicle_name'] != null){
                        item['vehicle'] = item['vehicle'] + '('+item['vehicle_police_no']+')'
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
        refresh() {
            this.getTableData(
                this.pagination.limit, 
                this.pagination.page, 
                this.tempSearch, 
                this.nodeOrigin, 
                this.nodeDestination, 
                this.node_type, 
                this.statusReceived, 
                this.prealertFilter, 
                this.startDate, 
                this.endDate,
                this.search_by,
                this.filterDateBy
            );
        },
        updateLocalStorage() {
            const filterData = {
              origin: this.nodeOrigin,
              destination: this.nodeDestination,
              tempSearch: this.tempSearch,
              tempDate: this.tempDate,
              prealertFilter: this.prealertFilter,
              filterDateBy: this.filterDateBy,
              statusReceived: this.statusReceived,
              searchBy: this.search_by,
            };
            localStorage.setItem("InboundAirportPreAlertFilters", JSON.stringify(filterData));
        },
        actionDetail(row){
            this.$router.push({
                name: 'InboundAirportScan', 
                params: { 
                  inbound_number: row.inbound_number 
                } 
            });
            this.setRoutePageHistory(this.$route.meta, false);
        },
        loadFiltersFromStorage() {
            const storedFilters = localStorage.getItem("InboundAirportPreAlertFilters");
            if (storedFilters) {
                const filters = JSON.parse(storedFilters);
                
                this.nodeOrigin = filters.origin;
                this.nodeDestination = filters.destination;
                this.tempSearch = filters.tempSearch;
                this.tempDate = filters.tempDate;
                this.prealertFilter = filters.prealertFilter;
                this.filterDateBy = filters.filterDateBy;
                this.statusReceived = filters.statusReceived;
                this.search_by = filters.searchBy;

                if (this.tempDate) {
                    this.startDate = this.tempDate[0];
                    this.endDate = this.tempDate[1];
                }
            }
        },
    },
    async mounted() {
        this.loadFiltersFromStorage();

        await this.getTableData(
            this.pagination.limit, 
            this.pagination.page, 
            this.tempSearch, 
            this.nodeOrigin, 
            this.nodeDestination, 
            this.node_type, 
            this.statusReceived, 
            this.prealertFilter, 
            this.startDate, 
            this.endDate,
            this.search_by,
            this.filterDateBy
        );
    }
}
</script>