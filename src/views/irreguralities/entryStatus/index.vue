<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Entry Status</h2>
                </div>
                <div class="mt-2">
                    <vs-row justify="space-between">
                        <vs-col xs="9" sm="9" lg="9">
                            <form @submit.prevent="openDialog">
                                <multi-input
                                    ref="koliCode"
                                    placeholder="Masukkan Nomor Bag / Connote"
                                    rules="" 
                                    formKey="KOLI_CODE"
                                    :loading="loading"
                                    :selectedValue="koliCode"
                                    :isMultiple="false"
                                    :disabled="false"
                                    :isAllowCreate="true"
                                    @updateValue="updateValue"  
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
                                    <select-search-by :isMultiple="false" :border="true"
                                        @updateSearchBy="updateFilterDateBy" :valueData="dateParams"
                                        :selectedValue="filterDateBy" />
                                </vs-col>
                                <vs-col w="8">
                                    <date-time
                                        :name="''"
                                        :rules="''"
                                        :formKey="'TRIGGER_DATE'"
                                        :valueData="dateRange"
                                        typeInput="daterange"
                                        @updateValue="updateValue" />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                        <vs-col xs="12" sm="12" lg="6">
                            <vs-row justify="end">
                                <vs-col xs="6" sm="8" lg="4">
                                    <select-search-by :isMultiple="false" :border="true"
                                        @updateSearchBy="updateSearchBy" :valueData="searchParams"
                                        :selectedValue="searchBy" />
                                </vs-col>
                                <vs-col xs="6" sm="4" lg="4">
                                    <search-input ref="searchInput" @searchValue="searchValue"
                                        :placeholder="searchPlaceholder" />
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
                        :hasAction="true"
                        :hasPagination="true"
                        :hasLinked4="['image']"
                        @actionLimit="actionLimit"
                        @actionPagination="actionPagination"
                        @actionUpdate="editIrreg"
                        @actionRemove="actionRemove"
                    />
                </div>
            </div>
            
        </section>

        <dialog-entry-status
            :active="dialogEntryStatusActive" 
            :closeDialog="closeDialog"
            :dataItem="dataItem"
            @updateValue="updateValue"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import moment from "moment"
import TableMaster from "@/components/table/tableMaster.vue"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import SelectSearchBy from "@/components/search/selectSearchBy";
import MultiInput from "@/components/input/multiInput"
import Selector from "@/components/input/select"

import DialogEntryStatus from "@/views/irreguralities/entryStatus/dialogEntryStatus"
export default {
    name:"irregularities-entry-status",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "date-time": DateTime,
        "select-search-by": SelectSearchBy,
        "table-master" : TableMaster,
        "dialog-entry-status": DialogEntryStatus,
        "multi-input": MultiInput,
        "selector": Selector
    },
    data() {
        return {
            koliCode: [],
            dateRange: [],
            tempSearch: "",
            dataTable: [],
            datacolumn: [
                {
                    label: "Date",
                    key: "created_at",
                    width: "md"
                },
                {
                    label: "Bag Number",
                    key: "bag_number",
                    width: "xs"
                },
                {
                    label: "Connote",
                    key: "koli_number",
                    width: "xs"
                },
                {
                    label: "Gambar",
                    key: "image",
                    width: "auto"
                },
                {
                    label: "Status Code",
                    key: "irregularity_status_code",
                    width: "auto"
                },
                {
                    label: "Status Description",
                    key: "irregularity_status_description",
                    width: "auto"
                },
                {
                    label: "Remark",
                    key: "remark",
                    width: "auto"
                },
                {
                    label: "User",
                    key: "user_name",
                    width: "auto"
                },
            ],
            dataItem: {},
            customActionList: [
              {
                label: 'Edit',
                key: 'edit',
                attribute: '',
              },
            ],
            loading:false,
            pagination: {
                limit: 10,
                page_size: 1,
                page: 1
            },
            form: {},
            dialogEntryStatusActive: false,
            searchBy: "koli_number",
            filterDateBy: "create",
            searchPlaceholder: "Search Koli Number",
            searchParams: [
                {
                    label: 'Koli number',
                    value: 'koli_number'
                },
                {
                    label: 'Bag number',
                    value: 'bag_number'
                },
                {
                    label: "Status Code",
                    value: "irregularity_status_code",
                },
                {
                    label: "Status Description",
                    value: "irregularity_status_description",
                },
                {
                    label: "Remarks",
                    value: "remark",
                },
                {
                    label: "User",
                    value: "userApprove",
                },
            ],
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                }
            ]
        }
    },
    methods: {
        refresh(){

            let d = new Date()
            let from = ''
            let to = ''

            if(this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            } else {
                from = moment(d).format("YYYY-MM-DD")
                to = moment(d).format("YYYY-MM-DD")
            }

            
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, from, to)
        },
        async editIrreg(val){
            if(this.dataTable.length > 0) {
                this.dataItem = val;

                this.$nextTick(() => {
                    this.dialogEntryStatusActive = true;
                });
            }
        },
        async actionRemove(val){
            await axios
                .delete(
                    this.URL.irregularities + `/${val.irregularity_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.refresh()
                    this.openNotification(null, 'Remove success', 'Remove Irreg success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Remove Irreg failed', err)
                })
        },
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
                .get(this.URL.irregularities +
                `?n=${this.listenNodeId}&irregularity_type=PROBLEM&show_archive=false&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`,
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Irreguralities Problem', err)
                })
        },
        async handleSubmit() {
            const formData = new FormData();
            for (const key in this.form) {
                formData.append(key, this.form[key]);
            }

            await axios
                .post(
                    this.URL.irregularities + `?n=${this.listenNodeId}`,
                    formData, 
                    this.Helper.header())
                .then(res => {
                    this.dialogEntryStatusActive = false
                    this.handleClearForm();
                    this.refresh()
                    this.openNotification(null, 'Success', 'Create new entry status is success')
                }).catch(err => {
                    this.loading = false
                    this.dialogEntryStatus = false
                    this.handleClearForm();
                    this.refresh()

                    this.openNotification('danger', 'Create new entry status failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh()
        },
        actionUpdate(val, key) {
            switch(key) {
                case "edit":
                    if(this.dataTable.length > 0) {
                        this.dataItem = val

                        this.$nextTick(() => {
                            this.dialogEntryStatus = true
                        });
                    }
                    break;
                default:
            }
        },
        generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }
            return result;
        },
        handleClearForm(){
            this.koliCode = []
        },
        updateValue(key, val) {
            switch(key) {
                case "KOLI_CODE":
                    this.koliCode = [val];
                    break;
                case "TRIGGER_DATE":
                    this.dateRange = val
                    this.refresh()

                    break;
                case "DIALOG_ENTRY_STATUS":
                    this.form = val
                    let formattedItems = {};
                    this.koliCode.forEach(item => {
                        let key = `item_number_${this.generateRandomString(5)}`;
                        formattedItems[key] = item;
                    });

                    this.form = {
                        ...this.form,
                        ...formattedItems
                    };

                    this.handleSubmit()
                    break;
                default:
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
        closeDialog() {
            this.dialogEntryStatusActive = false
        },
        openDialog() {
            if(this.koliCode !== '') {
                this.dialogEntryStatusActive = true
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
        this.refresh()   
    }
}
</script>