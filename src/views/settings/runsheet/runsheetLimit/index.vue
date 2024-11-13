<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="12">
                <vs-row>
                    <vs-col xs="6" sm="4" lg="2">
                        <template v-if="filterStatus.length > 1">
                            <vs-select
                                class="m-select"
                                filter
                                v-model="filterStatusBy"
                                :border="true"
                                :multiple="false"
                                @change="updateFilterStatus"
                            >
                            <template v-if="filterStatus.length > 1">
                                <vs-option
                                    v-for="(item,key) in filterStatus"
                                    :key="key"
                                    :label="item.label"
                                    :value="item.value">
                                {{item.label}}
                                </vs-option>
                            </template>

                            </vs-select>
                        </template>
                    </vs-col>
                    <vs-col w="6">
                        <date-time 
                            :name="''" 
                            :rules="''" 
                            :valueData="dateRange"
                            typeInput="daterange" 
                            @updateValue="updateValue" 
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
            @actionUpdate="actionUpdate"
            @actionRemove="actionRemove"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />

        <dialog-create-edit
            btnBlue="Edit"
            ref="dialog_edit"
            title="Edit Runsheet Limit"
            :active="dialogEditActive" 
            :closeDialog="() => closeDialog('dialog_edit')"
            :dataItem="dataItem"
            :loading="loadingEdit"
            @refresh="refresh"
        />

        <dialog-confirm
            ref="dialog_remove"
            title="Remove Runsheet Limit"
            :active="dialogRemoveActive"
            :closeDialog="() => closeDialog('dialog_remove')"
            :loading="loadingRemove"
            :message="`Are you sure you want to remove this?`"
            @cancel="() => closeDialog('dialog_remove')"
            @confirm="confirmRemove"
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
import TableMaster from "@/components/table/tableMaster";

import DialogCreateEdit from "@/views/settings/runsheet/runsheetLimit/dialogCreateEdit";

export default {
    name:"runsheet-limit-data-tabel",
    mixins: [master],
    props: {
        query: String,
        searchBy: String,
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit": DialogCreateEdit,
        "search-input": SearchInput,
        "date-time": DateTime,
        "inputan": Inputan,
        "dialog-confirm": DialogConfirm,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Reference To",
                    key: "reference_to",
                    width: "sm"
                },
                {
                    label: "Reference Entity",
                    key: "reference_entity",
                    width: "sm"
                },
                {
                    label: "Referece Value",
                    key: "reference_value",
                    width: "sm"
                },
                {
                    label: "Created By",
                    key: "created_by",
                    width: "sm"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "sm"
                },
                {
                    label: "Active",
                    key: "is_active",
                    width: "xs",
                    type: "boolean|disabled",
                },
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
            loadingRemove:false,
            loadingEdit: false,
            filterStatusBy: "-",
            filterStatus: [
                {
                    label: 'All Status',
                    value: '-'
                },
                {
                    label: 'Active',
                    value: '1'
                },
                {
                    label: 'Inactive',
                    value: '0'
                }
            ],
        }
    },
    computed: {
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.searchValue = val
                if(this.searchValue !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.searchBy)
                }
            }
        },
        searchBy: function(val, old) {
            if(val !== undefined) {
                this.searchBy = val
                if(this.searchBy !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, this.startDate, this.endDate, val)
                }
            }
        },
    },
    methods: {
        refresh(){
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }

            this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, from, to, this.searchBy)
        },
        updateValue(key, val) {
            this.dateRange = val
            this.refresh()
        },
        updateFilterStatus(key) {
            this.filterStatusBy = key;
            this.refresh()
        },
        async getTableData(limit, page, q, from, to, searchBy) {
            this.loading = true

            let query = q || '';            
            let startDate = from || "";
            let endDate = to || "";
            
            try {
                const res = await axios.get(`${this.URL.runsheet_limit_setting}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${searchBy}&is_active=${this.filterStatusBy}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    arr.map(item => {
                        item["is_active"] = item.is_active === "1" ? true : false;
                    })
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
        actionRemove(val){
            this.selected_id = val.runsheet_limit_id;
            this.dialogRemoveActive = true;
        },
        confirmRemove() {
            this.removeData();
        },
        async removeData() {
            this.loadingRemove = true;
            try {
                const res = await axios.delete(`${this.URL.runsheet_limit_setting}/${this.selected_id}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Remove Runsheet Limit success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingRemove = false;
                this.closeDialog('dialog_remove');
            }
        }
    },
    mounted() {
        this.refresh()
    },
}
</script>