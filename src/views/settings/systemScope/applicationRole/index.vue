<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="12">
                <vs-row >
                    <vs-col xs="6" sm="3" lg="2">
                        <select-search-by 
                            :border="true"
                            :isMultiple="false" 
                            :selectedValue="filterDateBy" 
                            :valueData="filterDate" 
                            @updateSearchBy="updateFilterDateBy"
                        />
                    </vs-col>
                    <vs-col xs="12" sm="6" lg="6">
                        <date-time 
                            formKey="date_range"
                            :name="''" 
                            :rules="''" 
                            :valueData="dateRange"
                            typeInput="daterange" 
                            @updateValue="updateValue" 
                        />
                    </vs-col>
                    <vs-col xs="6" sm="6" lg="2">
                        <select-search-by 
                            :border="true" 
                            :isMultiple="false" 
                            :selectedValue="searchBy" 
                            :valueData="searchParams" 
                            @updateSearchBy="updateSearchBy" 
                        />
                    </vs-col>
                    <vs-col xs="6" sm="6" lg="2">
                        <search-input 
                            ref="searchInput" 
                            :placeholder="searchPlaceholder" 
                            :isNumeric="searchByDataType"
                            @searchValue="searchValue" 
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
            :hasDuplicateEditRemove="true"
            :hasPagination="true"
            @actionUpdate="actionUpdate"
            @actionDuplicate="actionDuplicate"
            @actionRemove="actionRemove"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />

        <dialog-create-edit
            btnBlue="Edit"
            ref="dialog_edit"
            title="Edit Application Role"
            :active="dialogEditActive" 
            :closeDialog="() => closeDialog('dialog_edit')"
            :dataItem="dataItem"
            :loading="loadingEdit"
        />

        <dialog-confirm
            ref="dialog_remove"
            title="Remove Application Role"
            :active="dialogRemoveActive"
            :closeDialog="() => closeDialog('dialog_remove')"
            :loading="loadingRemove"
            :message="`Are you sure you want to remove this?`"
            @cancel="() => closeDialog('dialog_remove')"
            @confirm="removeData"
        />

        <dialog-confirm
            ref="dialog_duplicate"
            title="Duplicate Application Role"
            :active="dialogDuplicateActive"
            :closeDialog="() => closeDialog('dialog_duplicate')"
            :loading="loadingDuplicate"
            :message="`Are you sure you want to duplicate this?`"
            @cancel="() => closeDialog('dialog_duplicate')"
            @confirm="duplicateData"
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
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";

import DialogCreateEdit from "@/views/settings/systemScope/applicationRole/dialogCreateEdit";

export default {
    name:"application-role-data-table",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit": DialogCreateEdit,
        "search-input": SearchInput,
        "date-time": DateTime,
        "inputan": Inputan,
        "dialog-confirm": DialogConfirm,
        "select-search-by": SelectSearchBy
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "App",
                    key: "app",
                    width: "md"
                },
                {
                    label: "App Role Name",
                    key: "app_role_name",
                    width: "md"
                },
                {
                    label: "App Role Code",
                    key: "app_role_code",
                    width: "md"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "md"
                },
            ],
            loading: false,
            dataItem: {},
            dateRange: [],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            selected_id: '',
            dialogDuplicateActive: false,
            dialogEditActive: false,
            dialogRemoveActive: false,
            loadingDuplicate:false,
            loadingRemove:false,
            loadingEdit: false,
            tempSearch: '',
            filterDateBy: "created_at",
            filterDate: [
                {
                    label: 'Created At',
                    value: 'created_at'
                },
            ],
            searchPlaceholder: "Search Application",
            searchBy: "app",
            searchByDataType: false,
            searchParams: [
                {
                    label: "Application",
                    value: "app"
                },
                {
                    label: "Role",
                    value: "app_role_name"
                },
                {
                    label: "Role Code",
                    value: "app_role_code"
                }
            ],
        }
    },
    computed: {
    },
    methods: {
        refresh(){
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }

            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, from, to, this.searchBy)
        },
        updateValue(key, val) {
            this.dateRange = val;
            this.refresh();
        },
        updateFilterDateBy(key) {
            this.filterDateBy = key;
            this.refresh();
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh();
        },
        updateSearchBy(key, val, dataType) {
            this.searchBy = val;
            this.searchPlaceholder = key;
            this.searchByDataType = dataType;
        },
        async getTableData(limit, page, q, from, to, searchBy) {
            this.loading = true

            let query = q || '';            
            let startDate = from || "";
            let endDate = to || "";
            
            try {
                const res = await axios.get(`${this.URL.application_role}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${searchBy}&filter_date_by=${this.filterDateBy}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    arr.map(item => {
                        item["created_at"] = this.formatTimestamp(item.created_at)
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
                // TODO: REMOVE BELOW LATER
                this.dataTable = [
                    {
                        "app_role_id": "a48111b9-f747-4a96-b930-c0ba61264acb",
                        "app": "DASHBOARD_TICKETING",
                        "app_role_name": "SALES COUNTER OFFICER",
                        "app_role_code": "SCO",
                        "created_at": "2024-12-11 06:12:00"
                    }
                ],
                // TODO: UNCOMMENT BELOW LATER
                // this.redirectError(err)
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
                case 'dialog_duplicate':
                    this.dialogDuplicateActive = false;
                    this.refresh();
                    break;
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
        actionDuplicate(val){
            this.selected_id = val.app_role_id;
            this.dialogDuplicateActive = true;
        },
        actionRemove(val){
            this.selected_id = val.app_role_id;
            this.dialogRemoveActive = true;
        },
        async removeData() {
            this.loadingRemove = true;
            try {
                const res = await axios.delete(`${this.URL.application_role}/${this.selected_id}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Remove Application Role success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingRemove = false;
                this.closeDialog('dialog_remove');
            }
        },
        async duplicateData() {
            this.loadingDuplicate = true;
            try {
                const res = await axios.post(`${this.URL.application_role}/${this.selected_id}/duplicate?n=${this.listenNodeId}`, {}, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Duplicate Application Role success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingDuplicate = false;
                this.closeDialog('dialog_duplicate');
            }
        }
    },
    mounted() {
        this.refresh()
    },
}
</script>