<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }}</h2>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        <vs-col xs="12" lg="6">
                            <vs-row>
                                <vs-col w="4">
                                    <select-search-by 
                                        :border="true"
                                        :isMultiple="false" 
                                        :selectedValue="filterDateBy" 
                                        :valueData="dateParams" 
                                        @updateSearchBy="updateFilterDateBy"
                                    />
                                </vs-col>
                                <vs-col w="8">
                                    <date-time 
                                        :name="''" 
                                        :rules="''" 
                                        :formKey="'TRIGGER_DATE'" 
                                        :valueData="dateRange"
                                        typeInput="daterange" 
                                        @updateValue="updateValue" 
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>

                        <vs-col xs="12" lg="6">
                            <vs-row justify="end">
                                <vs-col xs="6" sm="8" lg="4">
                                    <select-search-by 
                                        :border="true" 
                                        :formKey="'TRIGGER_SEARCH_BY'" 
                                        :isMultiple="false" 
                                        :valueData="searchParams" 
                                        :selectedValue="searchBy" 
                                        @updateSearchBy="updateSearchBy"
                                    />
                                </vs-col>
                                <vs-col xs="6" sm="4" lg="4">
                                    <search-input 
                                        :formKey="'SEARCH_INPUT'" 
                                        :placeholder="searchPlaceholder"
                                        @searchValue="updateValue('SEARCH_INPUT', $event)"
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                    </vs-row>
                </div>

                <transition name="slide-fade">
                    <table-master 
                        :dataTable="dataTable" 
                        :dataColumn="datacolumn" 
                        :tableLoading="loading"
                        :pageSize="pagination.page_size"
                        :page="pagination.page"
                        :limit="pagination.limit"
                        :hasPagination="true"
                        :customAction="false"
                        @actionLimit="actionLimit"
                        @actionPagination="actionPagination"
                    />
                </transition>
            </div>
        </section>
    </div>
</template>

<script>

import axios from "axios";
import moment from "moment";

import master from "@/mixins/master";

import Breadcrumb from "@/components/breadcrumb/index";
import DateTime from "@/components/input/dateTime"
import NavItem from "@/components/navbar/navTab";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";


export default {
    name: "invalid-receiving",
    mixins: [master],
    components: {
        "breadcrumb": Breadcrumb,
        "date-time": DateTime,
        "nav-item": NavItem,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "table-master" : TableMaster,
    },
    data() {
        return {
            title: "Invalid Receiving",
            dateRange: [],
            tempSearch: "",
            searchPlaceholder: "Search Item Number",
            searchBy:"item_number",
            searchParams: [
                {
                    label: 'Item Number',
                    value: 'item_number'
                },
                {
                    label: 'DO Number',
                    value: 'do_number'
                },
                {
                    label: 'Vehicle Type',
                    value: 'vehicle_type'
                },
                {
                    label: 'Driver',
                    value: 'pic'
                },
                {
                    label: 'Mode',
                    value: 'mode'
                },
                {
                    label: 'Origin',
                    value: 'origin'
                },
                {
                    label: 'Destination',
                    value: 'destination'
                },
                {
                    label: 'Weight',
                    value: 'weight'
                }
            ],
            filterDateBy:"created_at",
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'created_at'
                },
                {
                    label: 'Updated Date',
                    value: 'updated_at'
                }
            ],
            loading: false,
            dataTable: [],
            datacolumn: [
                {
                    label: "Surat Jalan #",
                    key: "manifest_do_number",
                    width: "xs"
                },
                {
                    label: "Orion Number",
                    key: "orion_number",
                    width: "xs"
                },
                {
                    label: "Vehicle Type",
                    key: "vehicle_type_name",
                    width: "xs"
                },
                {
                    label: "Driver",
                    key: "driver_name",
                    width: "xs"
                },
                {
                    label: "Mode#",
                    key: "vehicle_mode_name",
                    width: "auto"
                },
                {
                    label: "Origin",
                    key: "node_id_origin_name",
                    width: "sm"
                },
                {
                    label: "Destination",
                    key: "node_id_destination_name",
                    width: "sm"
                },
                {
                    label: "Kg",
                    key: "total_weight",
                    width: "auto"
                },
                {
                    label: "ETD",
                    key: "etd",
                    width: "xs"
                },
                {
                    label: "ETA",
                    key: "eta",
                    width: "xs"
                },
                {
                    label: "Departed Time",
                    key: "departed_time",
                    width: "xs"
                },
                {
                    label: "Approved",
                    key: "approved",
                    width: "xxs"
                },
            ],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
        };
    },
    methods: {
        async getTableData(limit, page, q, from, to) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            let queryDate = "";
            if(q !== undefined) {
                query = q
                if (q.includes("/")) {
                    query = query.replaceAll("/", "-")
                }
            }
            if(from !== undefined && to !== undefined) {
                startDate = from
                endDate = to
            }
            await axios
                .get(this.URL.manifest_delivery_order + `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    let buttonStatus = {
                        'depart': true,
                        'cancel': true
                    }
                    
                    arr.map(item => {
                        item["pickup_courier_employee_name"] = (item.employee_courier) ? item.employee_courier.employee_name: null
                        item["node_id_origin_name"] = (item.origin) ? item.origin.node_name: null
                        item["node_id_destination_name"] = (item.destination) ? item.destination.node_name: item.facility_code_destination
                        item["driver_id"] = (item.pic_employee_id) ? parseInt(item.pic_employee_id): null
                        item["driver_name"] = (item.pic) ? item.pic.employee_name: null
                        item["orion_number"] = item.mts || item.do || "";
                        item["approved"] = item.is_approve    === 1 ? 'YES' : 'NO';
                        
                        if (item.hasOwnProperty('status') && item["status"] !== null) {
                            let str = item["status"].toLowerCase();
                            if (!str.includes("ready")) {
                                buttonStatus["depart"] = false;
                                item["button_status"] = buttonStatus;
                            }
                            if (str.includes("cancel")) {
                                buttonStatus["cancel"] = false;
                                item["button_status"] = buttonStatus;
                            }
                        }

                        if (item.is_orion == "1") {
                            buttonStatus["cancel"] = false;
                            item["button_status"] = buttonStatus;
                        }
                    })

                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', null, 'Surat Jalan data is empty!', ' Please create a new Surat Jalan data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate Surat Jalan data', err)
                })
        },
        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1;
            this.refresh();
        },
        actionPagination(val) {
            this.pagination.page = val;
            this.refresh();
        },
        refresh() {
            const [from, to] = this.dateRange?.length 
                ? [moment(this.dateRange[0]).format("YYYY-MM-DD"), moment(this.dateRange[1]).format("YYYY-MM-DD")]
                : ["", ""];

            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, from, to);
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;

            if (this.dateRange.length !== 0) {
                this.dateRange = [];
            }
        },
        updateValue(key, val) {
            switch(key) {
                case "TRIGGER_DATE":
                    this.dateRange = val
                    this.refresh()
                    break;
                case "SEARCH_INPUT":
                    this.tempSearch = val
                    this.refresh();
                    break;
                default:
            }
        },
    },
    mounted() {
        this.refresh();
    }
};
</script>

