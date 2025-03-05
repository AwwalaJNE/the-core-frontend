<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="12">
                <vs-row>
                    <vs-col xs="12" sm="3" lg="2">
                        <div class="select-surat-muatan-stock">
                            <selector 
                                formKey="filter_vehicle_mode"
                                :valueData="filterReason"
                                :selectedValue="filterReasonBy"
                                :isMultiple="false"
                                :loading="loadingVehicleMode"
                                @updateValue="updateValue" 
                            />
                        </div>
                    </vs-col>
                    <vs-col xs="12" sm="3" lg="2">
                        <div class="select-surat-muatan-stock">
                            <selector 
                                formKey="filter_status"
                                :valueData="filterStatus"
                                :selectedValue="filterStatusBy"
                                :isMultiple="false"
                                @updateValue="updateValue" 
                            />
                        </div>
                    </vs-col>
                    <vs-col xs="12" sm="3" lg="2">
                        <select-search-by 
                            :border="true"
                            :isMultiple="false" 
                            :selectedValue="filterDateBy" 
                            :valueData="dateParams" 
                            @updateSearchBy="updateFilterDateBy"
                        />
                    </vs-col>
                    <vs-col xs="12" sm="3" lg="2">
                        <date-time 
                            formKey="date_range"
                            :name="''" 
                            :rules="''" 
                            :valueData="dateRange"
                            typeInput="daterange" 
                            @updateValue="updateValue" 
                        />
                    </vs-col>
                    <vs-col xs="12" sm="3" lg="2">
                        <select-search-by
                                key="searchByClaimAndBurden"
                                :border="true"
                                :isMultiple="false"
                                :selectedValue="searchByClaimAndBurden"
                                :valueData="searchParamsClaimAndBurden"
                                @updateSearchBy="updateSearchBy"
                            />
                    </vs-col>
                    <vs-col xs="12" sm="3" lg="2">
                        <search-input
                            class="search-input"
                            key="searchInput"
                            ref="searchInput"
                            :placeholder="searchPlaceholderCalimAndBurden"
                            @searchValue="updateSearchValue"
                        />
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
            :hasAction="true"
            :hasPagination="true"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />

    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";
import moment from "moment";

import DateTime from "@/components/input/dateTime"
import DialogConfirm from "@/components/dialog/dialogConfirm";
import Inputan from "@/components/input/inputan";
import SearchInput from "@/components/search/searchInput";
import Selector from "@/components/input/select";
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";

import DialogCreateEdit from "@/views/settings/suratMuatan/stock/dialogCreateEdit";

export default {
    name:"claim-and-burden-data-table",
    mixins: [master],
    props: {
        query: String,
        searchBy: String,
    },
    components: {
        "date-time": DateTime,
        "dialog-confirm": DialogConfirm,
        "inputan": Inputan,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "selector": Selector,
        "table-master" : TableMaster,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Connote Number",
                    key: "connote_number",
                    width: "sm"
                },
                {
                    label: "Status",
                    key: "status",
                    width: "sm"
                },
                {
                    label: "Proposed Claim (Rp)",
                    key: "proposed_claim",
                    width: "sm"
                },
                {
                    label: "Approved Claim (Rp)",
                    key: "approved_claim",
                    width: "sm"
                },
                {
                    label: "Reason",
                    key: "reason",
                    width: "sm"
                },
                {
                    label: "Burden (%)",
                    key: "burden_percentage_1",
                    width: "sm"
                },
                {
                    label: "Burden PIC",
                    key: "burdened_pic_1",
                    width: "sm"
                },
                {
                    label: "Burden Value (Rp)",
                    key: "eta",
                    width: "sm"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "sm"
                },
                {
                    label: "Updated At",
                    key: "updated_at",
                    width: "sm"
                }
            ],
            loading: false,
            dataItem: {},
            dateRange: [],
            searchValue: this.query ? this.query : "",
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            selected_id: '',
            dialogEditActive: false,
            dialogRemoveActive: false,
            loadingRemove: false,
            loadingEdit: false,
            filterDateBy:"create",
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                }
            ],
            loadingVehicleMode: false,
            filterReasonBy: "ALL",
            filterReason: [
                {
                    label: 'All Reason',
                    value: 'ALL'
                },
                {
                    label: 'HILANG',
                    value: 'HILANG'
                },
                {
                    label: 'RUSAK',
                    value: 'RUSAK'
                },
            ],
            filterStatusBy: "ALL",
            filterStatus: [
                {
                    label: 'All Status',
                    value: 'ALL'
                },
                {
                    label: 'CLOSED',
                    value: 'CLOSED'
                },
                {
                    label: 'OPEN',
                    value: 'OPEN'
                }
            ],
            title: "Claim and Burden",
            tempSearch: "",
            dialogActiveStock: false,
            searchPlaceholderCalimAndBurden: "Connote",
            searchByClaimAndBurden: "connote",
            searchParamsClaimAndBurden: [
                {
                    label: "Connote",
                    value: "connote"
                },
                {
                    label: "Status",
                    value: "status"
                },
                {
                    label: "Reason",
                    value: "reason"
                }
            ]
        }
    },
    computed: {
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.searchValue = val
                if(this.searchValue !== old) {
                    this.pagination.page = 1
                    this.refresh()
                }
            }
        },
    },
    methods: {
        refresh() {
            this.getTableData(
                this.pagination.limit,
                this.pagination.page,
                this.searchValue,
                this.dateRange[0],
                this.dateRange[1]
            )
        },
        updateValue(key, val, info){
            switch(key) {
                   case "filter_vehicle_mode":
                    this.filterReasonBy = this.filterReason.find(item => item.value == val)?.value;
                    this.refresh();
                    break;
                case "filter_status":
                    this.filterStatusBy = this.filterStatus.find(item => item.value == val)?.value;
                    this.refresh();
                    break;
                case "date_range":
                    this.dateRange = val
                    this.startDate = this.dateRange[0];
                    this.endDate = this.dateRange[1];
                    this.refresh()
                    break;
                default:
            }
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
            this.refresh();
        },
        searchValue(val) {
            this.tempSearch = val;
        },
        updateSearchValue(val) {
            this.searchValue = val;
            this.pagination.page = 1;
            this.refresh();
        },
        clearSearch() {
            this.$refs.searchInput.clear();
        },
        updateSearchBy(key, val) {
            this.searchByClaimAndBurden = val;
            this.searchPlaceholderCalimAndBurden = key;
            this.refresh();
        },
        async getTableData(limit, page, q, from, to) {
            this.loading = true;

            let query = q || this.searchValue || '';
            let startDate = from || "";
            let endDate = to || "";
            let status = this.filterStatusBy !== "ALL" ? this.filterStatusBy : "";
            let reason = this.filterReasonBy !== "ALL" ? this.filterReasonBy : "";
            let searchBy = this.searchByClaimAndBurden; // Pakai ini langsung
            try {
                const res = await axios.get(
                    `${this.URL.claim_and_burden}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&filter_date_by=${this.filterDateBy}&start_date=${startDate}&end_date=${endDate}&search_by=${searchBy}&status=${status}&reason=${reason}`,
                    this.Helper.header()
                );

                if (res.data.data.length > 0) {
                    let arr = res.data.data;
                   
                    this.dataTable = arr;
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
        actionUpdate(val){
            this.dataItem = val;
            this.dialogEditActive = true;
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
        closeDialog(ref) {
            switch (ref) {
                case 'dialog_edit':
                    this.dialogEditActive = false;
                    this.refresh();
                    break;
                case 'dialog_remove':
                    this.dialogRemoveActive = false;
                    this.refresh();
                    break;
                default:
                    break;
            }
        },
       
       
    },
    mounted() {
        this.refresh();
    },
}
</script>
<style scoped>
.select-surat-muatan-stock {
    margin-top: -10px !important;
}
</style>