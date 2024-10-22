<!--
    - @desc component yang handle crud frontend user role
    - @param -
    - @emit -
    - @props -
-->

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
        :hasLinked="['bag_number']"
        :printAction="true"
        :actionSize="'xxs'"
        :hasPagination="true"
        :onRowClickCallback="updateSelected"
        @handleEdit="actionDetail"
        @actionPrint="actionPrint"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"
export default {
    name:"Role-list",
    mixins: [master],
    props: {
        query: String,
        bagDestination: [],
        bagRouting: String,
        bagTipe: String,
        dateFilter: Array,
        searchDateBy: String,
        searchBy: String,
        bagStatus: String,
    },
    components: {
        "table-master" : TableMaster,
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "date-time": DateTime
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.bagFilter, this.routingFilter, this.tipeBagFilter, this.startDate, this.endDate, this.searchByBag, this.filterDateBy, this.bagStatus);
                }
            }
        },
        bagDestination: function(val, old) {
          if(val !== undefined) {
            this.bagFilter = val
            if(this.bagFilter !== old) {
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, val, this.routingFilter, this.tipeBagFilter, this.startDate, this.endDate, this.searchByBag, this.filterDateBy, this.bagStatus);
            }
          }
        },
        bagRouting: function(val, old) {
          if(val !== undefined) {
            this.routingFilter = val
            if(this.routingFilter !== old) {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.bagFilter, val, this.tipeBagFilter, this.startDate, this.endDate, this.searchByBag, this.filterDateBy, this.bagStatus)
            }
          }
        },
        bagTipe: function(val, old) {
          if(val !== undefined) {
            this.tipeBagFilter = val
            if(this.tipeBagFilter !== old) {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.bagFilter, this.routingFilter, val, this.startDate, this.endDate, this.searchByBag, this.filterDateBy, this.bagStatus);
            }
          }
        },
        searchDateBy: function(val, old) {
          if(val !== undefined) {
            this.filterDateBy = val
            if(this.filterDateBy !== old) {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.bagFilter, this.routingFilter, this.tipeBagFilter, this.startDate, this.endDate, this.searchByBag, val, this.bagStatus);
            }
          }
        },
        searchBy: function(val, old) {
          if(val !== undefined) {
            this.searchByBag = val
            if(this.searchByBag !== old) {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.bagFilter, this.routingFilter, this.tipeBagFilter, this.startDate, this.endDate, val, this.filterDateBy, this.bagStatus);
            }
          }
        },
        dateFilter: function(val, old) {
            if (val !== undefined) {
                this.tempDate = val;
                if (this.tempDate !== old) {
                    this.startDate = this.tempDate !== null ? this.tempDate[0] : '';
                    this.endDate = this.tempDate !== null ? this.tempDate[1] : '';
                }
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.bagFilter, this.routingFilter, this.tipeBagFilter, this.startDate, this.endDate, this.searchByBag, this.filterDateBy, this.bagStatus);
            }
        },
        bagStatus: function(val, old) {
          if(val !== undefined) {
            this.statusBagFilter = val
            if(this.statusBagFilter !== old) {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.bagFilter, this.routingFilter, this.tipeBagFilter, this.startDate, this.endDate, this.searchByBag, this.filterDateBy, val);
            }
          }
        },
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Bag #",
                    key: "bag_number",
                    width: "xs"
                },
                {
                    label: "Bag type",
                    key: "tipe_bag",
                    width: "xs"
                },
                {
                    label: "Date #",
                    key: "created_at",
                    width: "xs"
                },
                {
                    label: "Scanned Date",
                    key: "first_opened_bag",
                    width: "xs"
                },
                {
                    label: "# Item",
                    key: "bag_detail_qty",
                    width: "auto"
                },
                {
                    label: "Weight (Kg)",
                    key: "bag_weight",
                    width: "auto"
                },
                {
                    label: "Destination",
                    key: "destination_node_code",
                    width: "auto"
                },
                {
                    label: "Destination Name",
                    key: "destination_node_name",
                    width: "auto"
                },
                {
                    label: "Runsheet",
                    key: "runsheet_count",
                    width: "xxxxs"
                },
                {
                    label: "Un Runsheet",
                    key: "un_runsheet_count",
                    width: "xxxxs"
                },
                {
                    label: "Consolidation",
                    key: "is_consolidated",
                    width: "xxxxs"
                },
                {
                    label: "With Courier",
                    key: "with_courier",
                    width: "xs"
                },
                {
                    label: "Surat Muatan",
                    key: "surat_muatan",
                    width: "xs"
                },
                {
                    label: "Surat Jalan",
                    key: "surat_jalan",
                    width: "xs"
                },
                {
                    label: "Approved",
                    key: "approved",
                    width: "xxxxs"
                },
                {
                    label: "Status",
                    key: "summary_status",
                    width: "xxxxs",
                    tooltip_desc: "Status SM/SJ"
                },
                {
                    label: "Status Irregularity",
                    key: "status_irregularity_description",
                    width: "xxxxs",
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            bagFilter: this.bagDestination ? this.bagDestination : "",
            routingFilter: this.bagRouting ? this.bagRouting : "",
            tipeBagFilter: this.bagTipe ? this.bagTipe : "",
            statusBagFilter: this.bagStatus ? this.bagStatus : "",
            filterDateBy: this.searchDateBy ? this.searchDateBy : "",
            searchByBag: this.searchBy ? this.searchBy : "",
            dialogRole: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            tempDate:[],
            startDate: "",
            endDate: "",
            dateRange: [],
            selectedRow: []
        }
    },
    methods: {
        async getTableData(limit,page,q, bagDestination, bagRouting, bagTipe,  from, to, searchByBag, filterDateBy, bagStatus) {
            this.loading = true
            let query = "";
            let bagDes = "";
            let bagRout= "";
            let bagTipee= "";
            let startDate = "";
            let endDate = "";
            let bagStat = "";
            if(q !== undefined) {
                query = q
            }
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            if(bagDestination !== undefined && bagDestination !== '-') {
              bagDes = bagDestination
            }
            if(bagRouting !== undefined && bagRouting !== '-') {
              bagRout = bagRouting
            }
            if(bagTipe !== undefined && bagTipe !== '-') {
              bagTipee = bagTipe
            }
            if(bagStatus !== undefined) {
                bagStat = bagStatus
            }
            await axios
                .get(this.URL.bag_inventory +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&destination_node=${bagDes}&routing=${bagRout}&tipe_bag=${bagTipee}&start_date=${startDate}&end_date=${endDate}&search_by=${searchByBag}&filter_date_by=${filterDateBy}&is_opened=${bagStat}`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length == 0) {
                        if (query != "") {
                            this.loading = false;
                            this.dataTable = [];
                            return;
                        }
                    }

                    res.data.data.forEach(el => {
                        el.surat_muatan = []
                        el.surat_jalan = []
                        
                        if (el.sj.length > 0) {
                            el.sj.forEach(sj => {
                                el.surat_jalan.push(sj.manifest_do_number)
                            });
                            
                        }
                        if (el.sm.length > 0) {
                            el.sm.forEach(sm => {
                                el.surat_muatan.push(sm.manifest_number)
                            })
                        }

                        el.surat_muatan = el.surat_muatan.join(", ")
                        el.surat_jalan = el.surat_jalan.join(", ")
                        el.with_courier = el.courier ? el.courier.employee_name : ""
                        el.approved = el.is_approve === 1 ? "Yes" : "No"
                        el.status_irregularity_description = el.irregularity_status_description || ""
                    });
                    this.dataTable = res.data.data

                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length == 0) {
                        if (query != "") {
                            this.openNotification('warn', '', 'Failed to populate bag data', ' data is empty or not found')
                        }
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate bag list', err?.response?.data?.message ?? 'something went wrong')
                })
        },
        actionDetail(val){
            let bag = val.bag_number.replaceAll("/", "-")
            this.$router.push('/bagging-detail/'+bag)
            this.setRoutePageHistory(this.$route.meta, false);
        },
        actionPrint(val){
            let routeData = this.$router.resolve({ 
                name: 'printGeneral', 
                params: { 
                    'id': val.bag_number.replaceAll("/","~"), 
                    'type': 'bag',
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
        actionPrintSelected(){
            if (this.selectedRow.length > 0) {
                let routeData = this.$router.resolve({ 
                    name: 'printGeneral', 
                    params: { 
                        'id': this.selectedRow.toString().replaceAll("/","~"), 
                        'type': 'bag',
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
            }
            else {
                this.openNotification('warn', null, 'Shortcut Print Gagal', 'Silakan pilih Bag terlebih dahulu')
            }
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
            let d = new Date();
            let [from, to] = this.dateRange.length > 0 
                ? [moment(this.dateRange[0]).format("YYYY-MM-DD"), moment(this.dateRange[1]).format("YYYY-MM-DD")] 
                : ["", ""];
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.bagFilter, this.routingFilter, this.tipeBagFilter, from, to, this.searchByBag, this.filterDateBy, this.statusBagFilter)
        },
        updateSelected(_event, _item, selected) {
            this.selectedRow = selected.filter(bag => bag.is_approve !== 0).map(bag => bag.bag_number);
        },
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.bagFilter, this.routingFilter, this.startDate, this.endDate, this.tipeBagFilter, this.searchByBag, this.filterDateBy, this.statusBagFilter)
        this.handlePrintShortcut(this.actionPrintSelected)
    },
}
</script>