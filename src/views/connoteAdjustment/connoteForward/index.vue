<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    <div style="width: 100px;padding-right: 5px;">
                        <vs-button
                            flat
                            block
                            :active="true"
                            @click="openDialog"
                        > 
                            <i class="bx bx-plus"></i> New
                        </vs-button>
                    </div>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        <vs-col xs="12" sm="12" lg="6">
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
                                        typeInput="daterange"
                                        :name="''"
                                        :rules="''"
                                        :formKey="'TRIGGER_DATE'"
                                        :valueData="dateRange"
                                        @updateValue="updateValue" 
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                        <vs-col xs="12" sm="12" lg="6">
                            <vs-row justify="end">
                                <vs-col xs="6" sm="8" lg="4">
                                    <select-search-by 
                                        :border="true"
                                        :isMultiple="false" 
                                        :selectedValue="searchBy"
                                        :valueData="searchParams"
                                        @updateSearchBy="updateSearchBy" 
                                    />
                                </vs-col>
                                <vs-col xs="6" sm="4" lg="4">
                                    <search-input 
                                        ref="searchInput"
                                        :placeholder="searchPlaceholder" 
                                        @searchValue="searchValue"
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                    </vs-row>
                </div>

                <div class="mt-05">
                    <table-master 
                        hideColumnKey="connote-forward"
                        :dataTable="dataTable" 
                        :dataColumn="datacolumn" 
                        :tableLoading="loading"
                        :pageSize="pagination.page_size"
                        :page="pagination.page"
                        :limit="pagination.limit"
                        :hasPagination="true"
                        :hasAction="false"
                        :printAction="true"
                        @actionLimit="actionLimit"
                        @actionPagination="actionPagination"
                        @actionPrint="actionPrint"
                    />
                </div>
            </div>
            
        </section>

        <dialog-forward
            title="Create Connote Forward"
            :active="dialogActive" 
            :closeDialog="closeDialog"
        />
    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";
import moment from "moment";

import Breadcrumb from "@/components/breadcrumb/index";
import DateTime from "@/components/input/dateTime";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";

import DialogConnoteForward from "@/views/connoteAdjustment/connoteForward/dialogConnoteForward";

export default {
    name:"connote-forward",
    mixins:[master],
    components: {
        "breadcrumb": Breadcrumb,
        "date-time": DateTime,
        "dialog-forward": DialogConnoteForward,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "table-master" : TableMaster,
    },
    data() {
        return {
            title: "Connote Forward",
            dateRange: [],
            tempSearch: "",
            dataTable: [],
            dataItem: {},
            datacolumn: [
                {
                    label: "Created Date",
                    key: "created_at",
                    width: "md"
                },
                {
                    label: "Old Connote",
                    key: "koli_number_original",
                    width: "md"
                },
                {
                    label: "Connote Forward",
                    key: "koli_number_forward",
                    width: "md"
                },
                {
                    label: "Created By",
                    key: "user_login",
                    width: "md"
                }
            ],
            loading: false,
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            dialogActive: false,
            searchBy: "old_connote",
            searchPlaceholder: "Search Item Number",
            searchParams: [
                {
                    label: 'Old Connote',
                    value: 'old_connote'
                },
                {
                    label: 'Connote Forward',
                    value: 'return_connote'
                }
            ],
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
        refresh() {
            let d = new Date();
            let [from, to] = this.dateRange.length > 0 
                ? [moment(this.dateRange[0]).format("YYYY-MM-DD"), moment(this.dateRange[1]).format("YYYY-MM-DD")] 
                : ["", ""];

            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, from, to);
        },
        async getTableData(limit, page, q, from, to) {
            this.loading = true

            let query = q || '';            
            let startDate = from || "";
            let endDate = to || "";
            
            try {
                const res = await axios.get(`${this.URL.connote_forward}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data
                    arr.map(item => {
                        item["created_user_name"] = item?.user?.user_name || "";
                        item["created_at"] = this.formatTimezone(item?.created_at);
                    })
                    this.dataTable = arr
                    this.pagination = {
                        page: res.data.meta.current_page,
                        limit: parseInt(res.data.meta.per_page, 10),
                        page_size: res.data.meta.last_page,
                    };
                } else {
                    this.dataTable = [];
                }  
                
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        searchValue (val) {
            this.tempSearch = val;
            this.refresh();
        },
        updateValue(key, val) {
            switch(key) {
                case "TRIGGER_DATE":
                    this.dateRange = val
                    this.refresh()
                    break;
                default:
            }
        },
        actionPrint(val) {
            let routeData = this.$router.resolve({ 
                name: 'printGeneral', 
                params: { 
                    'id': val.koli_number_forward,
                    'type': 'koli-reprint', // TODO: Change later
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
        },
        actionPrintSelected(){
            if (this.selectedRow.length > 0) {
                let routeData = this.$router.resolve({
                    name: 'printGeneral',
                    params: {
                        'id': this.selectedRow.toString(),
                        'type': 'koli-reprint', // TODO: Change later
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
                this.openNotification('warn', null, 'Shortcut Print Gagal', 'Silakan pilih Connote Return terlebih dahulu');
            }
        },
        openDialog(){
            this.dialogActive = true
        },
        closeDialog() {
            this.dialogActive = false;
            this.refresh();
        },
        actionLimit(val) {
            this.pagination.limit = val;
            this.pagination.page = 1;
            this.refresh();
        },
        actionPagination(val) {
            this.pagination.page = val;
            this.refresh();
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
        },
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh);
    },
    mounted() {
        window.addEventListener('timezone-changed', this.refresh);
        this.refresh();
        this.handlePrintShortcut(this.actionPrintSelected);
    }
}
</script>