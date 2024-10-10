<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }} {{  is_history ? "History" : "Outstanding" }}</h2>
                </div>
                <div class="mt-2" v-if="!is_history">
                    <vs-row justify="space-between">
                        <vs-col xs="9" sm="9" lg="9">
                            <form @submit.prevent="openDialog">
                                <vs-input 
                                    border
                                    placeholder="Masukkan Nomer Connote"
                                    type="text"
                                    v-model="item_number" 
                                    v-uppercase
                                    :autofocus="true"
                                />
                            </form>
                        </vs-col>
                        <vs-col xs="3" sm="3" lg="3">
                            <vs-button
                                @click="openDialog"
                            >
                                Submit
                            </vs-button>
                        </vs-col>
                    </vs-row>
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
                        :dataTable="dataTable" 
                        :dataColumn="datacolumn" 
                        :tableLoading="loading"
                        :pageSize="pagination.page_size"
                        :page="pagination.page"
                        :limit="pagination.limit"
                        :customBtn="true"
                        :customBtn_label="'APPROVE'"
                        :hasPagination="true"
                        :hasLinked="['item_number']"
                        @actionUpdate="actionUpdate"
                        @actionLimit="actionLimit"
                        @actionPagination="actionPagination"
                        @handleEdit="showData"
                    />
                </div>
            </div>
            
        </section>

        <dialog-cancel
            title="Create Connote Cancel"
            :active="dialogCreateEditActive" 
            :closeDialog="closeDialog"
            :dataItem="dataItem"
            :itemNumber="item_number || itemNumber"
            @handleClearInput="handleClearInput"
            @refresh="refresh"
        />
        
        <dialog-confirm
            title="Approve Request Cancel"
            :active="dialogApproveActive"
            :closeDialog="closeDialogApproveCancel"
            :loading="loadingApprove"
            :message="`Are you sure you want to approve request cancel with connote number ${this.dataItem.item_number} ?`"
            @confirm="approve"
            @cancel="closeDialogApproveCancel"
        />
    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";
import moment from "moment";

import Breadcrumb from "@/components/breadcrumb/index";
import DateTime from "@/components/input/dateTime";
import DialogConfirm from "@/components/dialog/dialogConfirm";
import NavItem from "@/components/navbar/navTab";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";

import DialogConnoteCancel from "@/views/connoteAdjustment/connoteCancel/dialogConnoteCancel";

export default {
    name:"connote-cancel",
    mixins:[master],
    components: {
        "breadcrumb": Breadcrumb,
        "date-time": DateTime,
        "dialog-cancel": DialogConnoteCancel,
        "dialog-confirm": DialogConfirm,
        "nav-item": NavItem,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "table-master" : TableMaster,
    },
    data() {
        return {
            title: "Connote Cancel",
            item_number: "",
            itemNumber: "",
            dateRange: [],
            tempSearch: "",
            dataTable: [],
            dataItem: {},
            datacolumn: [
                {
                    label: "Canceled Date",
                    key: "created_at",
                    width: "md"
                },
                {
                    label: "Item Number",
                    key: "item_number",
                    width: "md"
                },
                {
                    label: "Created By",
                    key: "created_user_name",
                    width: "md"
                },
                {
                    label: "Approved at",
                    key: "approved_at",
                    width: "md"
                },
                {
                    label: "Approved By",
                    key: "approved_user_name",
                    width: "md"
                },
                {
                    label: "Remark",
                    key: "remark",
                    width: "md"
                },
            ],
            loading: false,
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            dialogCreateEditActive: false,
            dialogApproveActive: false,
            loadingApprove: false,
            searchBy: "item_number",
            searchPlaceholder: "Search Item Number",
            searchParams: [
                {
                    label: 'Item Number',
                    value: 'item_number'
                },
                {
                    label: "Created By",
                    value: "created_by",
                },
            ],
            filterDateBy: "created_at",
            dateParams: [
                {
                    label: 'Canceled Date',
                    value: 'created_at'
                }
            ],
            is_history: this.$route.fullPath.includes('history')
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
                const res = await axios.get(`${this.URL.connote_cancel}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}&type=${!this.is_history ? 'OUTSTANDING' : 'HISTORY'}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data
                    arr.map(item => {
                        item["created_user_name"] = item?.user?.user_name || "";
                        item["approved_user_name"] = item?.approved_by?.user_name || "";
                        item["isDisabled"] = item?.approved_by ? true : false;
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
        actionUpdate(val){
            this.dataItem = val;
            this.dialogApproveActive = true;
        },
        async approve() {
            this.loadingApprove = true;
            try {
                const res = await axios.patch(`${this.URL.connote_cancel}/${this.dataItem.request_id}?n=${this.listenNodeId}`, { is_approve: 1 }, this.Helper.header());

                this.openNotification("success", null, "Success", res?.data?.message || "Sukses Approve");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || "", "Failed", err?.response?.data?.message || "Something went wrong"); 
            } finally {
                this.closeDialogApproveCancel()
                this.refresh()
                this.loadingApprove = false;
            }
        },
        handleClearInput(){
            this.item_number = "";
        },
        closeDialogApproveCancel() {
            this.dataItem = {};
            this.loadingApprove = false;
            this.dialogApproveActive = false;
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
        closeDialog() {
            this.dialogCreateEditActive = false;
        },
        showData(row) { 
            this.dataItem = row;
            this.itemNumber = row.item_number;
            this.dialogCreateEditActive = true;
        },
        openDialog() {
            if (this.item_number !== '') {
                this.dialogCreateEditActive = true;
            }
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
    mounted() {
        this.refresh();  
    }
}
</script>