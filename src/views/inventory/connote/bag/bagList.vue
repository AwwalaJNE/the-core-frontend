<!--
    - @desc component yang handle crud frontend user role
    - @param -
    - @emit -
    - @props -
-->

<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="6">
                <vs-row>
                    <vs-col w="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy"
                            :valueData="dateParams" :selectedValue="filterDateBy" />
                    </vs-col>
                    <vs-col w="8">
                        <date-time :name="''" :rules="''" :valueData="dateRange" typeInput="daterange"
                            @updateValue="updateValue" />
                    </vs-col>
                </vs-row>
            </vs-col>
            <vs-col xs="12" sm="12" lg="6">
                <vs-row justify="end">
                    <vs-col xs="6" sm="8" lg="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"
                            :valueData="searchParamsBag" :selectedValue="searchByBag" />
                    </vs-col>
                    <vs-col xs="6" sm="4" lg="4">
                        <search-input ref="searchInput" @searchValue="searchValue"
                            :placeholder="searchPlaceholderBag" />
                    </vs-col>
                </vs-row>
            </vs-col>
        </vs-row>
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
        :hasPagination="true"
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
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.bagFilter, this.routingFilter, this.tipeBagFilter, this.startDate, this.endDate);
                }
            }
        },
        bagDestination: function(val, old) {
          if(val !== undefined) {
            this.bagFilter = val
            if(this.bagFilter !== old) {
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, val, this.routingFilter, this.tipeBagFilter, this.startDate, this.endDate);
            }
          }
        },
        bagRouting: function(val, old) {
          if(val !== undefined) {
            this.routingFilter = val
            if(this.routingFilter !== old) {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.bagFilter, val, this.tipeBagFilter, this.startDate, this.endDate)
            }
          }
        },
        bagTipe: function(val, old) {
          if(val !== undefined) {
            this.tipeBagFilter = val
            if(this.tipeBagFilter !== old) {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.bagFilter, this.routingFilter, val, this.startDate, this.endDate);
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
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.bagFilter, this.routingFilter, this.tipeBagFilter, this.startDate, this.endDate);
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
                    label: "Date #",
                    key: "created_at",
                    width: "xs"
                },
                {
                    label: "# Connote",
                    key: "bag_detail_qty",
                    width: "auto"
                },
                {
                    label: "Weight (Kg)",
                    key: "bag_weight",
                    width: "auto"
                },
                {
                    label: "Origin",
                    key: "origin_tariff_code",
                    width: "auto"
                },
                {
                    label: "Destination",
                    key: "destination_tariff_code",
                    width: "auto"
                },
                {
                    label: "Runsheet",
                    key: "runsheet_count",
                    width: "xs"
                },
                {
                    label: "Un Runsheet",
                    key: "un_runsheet_count",
                    width: "xs"
                },
                {
                    label: "Consolidation",
                    key: "is_consolidated",
                    width: "xs"
                },
                {
                    label: "With Courier",
                    key: "with_courier",
                    width: "auto"
                },
                {
                    label: "Surat Muatan",
                    key: "surat_muatan",
                    width: "auto"
                },
                {
                    label: "Surat Jalan",
                    key: "surat_jalan",
                    width: "auto"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            bagFilter: this.bagDestination ? this.bagDestination : "",
            routingFilter: this.bagRouting ? this.bagRouting : "",
            tipeBagFilter: this.bagTipe ? this.bagTipe : "",
            dialogRole: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            tempDate:[],
            startDate: "",
            endDate: "",
            searchByBag:"bag_number",
            searchPlaceholderBag: "Search Bag Number",
            searchParamsBag: [
                {
                    label: "Bag Number",
                    value: "bag_number",

                },
                {
                    label: "Bag Detail Qty",
                    value: "bag_detail_qty",

                },
                {
                    label: "Weight",
                    value: "bag_weight",

                },
                {
                    label: "Origin",
                    value: "origin_tariff_code",

                },
                {
                    label: "Destination",
                    value: "destination_tariff_code",

                },
                {
                    label: "Courier",
                    value: "courier",

                },
                {
                    label: "Surat Muatan",
                    value: "sm",

                },
                {
                    label: "Surat Jalan",
                   value: "sj",

                }
            ],
            dateRange: [],
            filterDateBy: "create",
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                }
            ]
            
        }
    },
    methods: {
        async getTableData(limit,page,q, bagDestination, bagRouting, bagTipe,  from, to) {
            this.loading = true
            let query = "";
            let bagDes = "";
            let bagRout= "";
            let bagTipee= "";
            let startDate = "";
            let endDate = "";
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
            await axios
                .get(this.URL.bag +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&destination_node=${bagDes}&routing=${bagRout}&tipe_bag=${bagTipee}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchByBag}&filter_date_by=${this.filterDateBy}`,
                this.Helper.header())
                .then(res => {
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
                    });
                    this.dataTable = res.data.data

                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length == 0) {
                        if (query != "") {
                            this.openNotification('danger', 'Failed to populate bag data', ' data is empty or not found, please check your keyword in the input search')
                        }
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate bag list', err)
                })
        },
        actionDetail(val){
            let bag = val.bag_number.replaceAll("/", "-")
            this.$router.push('/bagging-detail/'+bag)
        },
        actionPrint(val){
            let routeData = this.$router.resolve({ 
                name: 'printGeneral', 
                params: { 
                    'id': val.bag_number, 
                    'type': 'bag',
                    'node_id': this.listenNodeId
                } 
            });
        window.open(routeData.href, '_blank');
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
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.bagFilter, this.routingFilter, this.tipeBagFilter, from, to)
        },
        closeDialogRole() {
            this.dialogRole = false
        },
        searchValue(val) {
            this.tempSearch = val
            this.refresh()
        },
        updateSearchBy(key, val) {
            this.searchByBag = val;
            this.searchPlaceholderBag = key;
        },
        updateValue(key, val) {
            this.dateRange = val
            this.refresh()
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
        }
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.bagFilter, this.routingFilter, this.tipeBagFilter)
    },
}
</script>