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
    name: "invalid-open-bag",
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
            title: "Invalid Open Bag",
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
                    label: 'Process',
                    value: 'process'
                },
                {
                    label: 'User Login',
                    value: 'user_login'
                },
                {
                    label: 'Origin',
                    value: 'origin'
                },
                {
                    label: 'Node Name',
                    value: 'node_name'
                },
                {
                    label: 'Is Data Existed',
                    value: 'is_data_existed'
                },
                {
                    label: 'Reason',
                    value: 'reason'
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
                    label: "id",
                    key: "invalid_item_log_id",
                    width: "xs"
                },
                {
                    label: "Item Number",
                    key: "item_number",
                    width: "xs"
                },
                {
                    label: "Process",
                    key: "process",
                    width: "xs"
                },
                {
                    label: "User Login",
                    key: "user_login",
                    width: "xs"
                },
                {
                    label: "Origin",
                    key: "origin",
                    width: "xs"
                },
                {
                    label: "Node Name",
                    key: "node_name",
                    width: "sm"
                },
                {
                    label: "Is Exist",
                    key: "is_data_existed",
                    width: "xxs"
                },
                {
                    label: "Reason",
                    key: "reason",
                    width: "xs"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "xs"
                },
                {
                    label: "Updated At",
                    key: "updated_at",
                    width: "xs"
                }
            ],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            type: 'OPEN BAG'
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
            }
            if(from !== undefined && to !== undefined) {
                startDate = from
                endDate = to
            }
            await axios
                .get(this.URL.audit_invalid_log + `?n=${this.listenNodeId}&type=${this.type}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, this.Helper.header())
                .then(res => {
                    let arr = res.data.data;

                    if (arr.length > 0) {
                        arr.map(item => {
                            item["is_data_existed"] = item.is_data_existed === 1 ? 'TRUE' : 'FALSE';
                        })

                        this.dataTable = arr;
                        this.pagination.page = res.data.meta.current_page;
                        this.pagination.limit = parseInt(res.data.meta.per_page);
                        this.pagination.page_size = res.data.meta.last_page;
                        this.loading = false;
                    } else {
                        this.dataTable = [];
                        this.loading = false;
                    }               
                }).catch(err => {
                    this.loading = false;
                    this.openNotification('danger', err?.response?.data?.code || '', 'Failed',  err?.response?.data?.message || 'Something went wrong')
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

