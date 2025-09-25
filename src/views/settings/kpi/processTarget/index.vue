<template>
    <div>
        <table-master 
            hideColumnKey="kpi-process-target" 
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
            ref="dialog_edit_kpi_process_target"
            title="Edit KPI Process Target"
            btnBlue="Edit"
            :active="dialogActive" 
            :closeDialog="() => closeDialog('dialog_edit_kpi_process_target')"
            :dataItem="dataItem"
            @refresh="refresh"
        />

        <dialog-confirm
            ref="dialog_remove_kpi_process_target"
            title="Remove KPI Process Target"
            :message="`Are you sure you want to remove this KPI Process Target with id ${this.selected_id}?`"
            :active="activeDialogConfirmRemove"
            :loading="loadingConfirmRemove"
            :closeDialog="() => closeDialog('dialog_remove_kpi_process_target')"
            @confirm="confirmRemove"
            @cancel="() => closeDialog('dialog_remove_kpi_process_target')"
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

import DialogCreateEdit from "@/views/settings/kpi/processTarget/dialogCreateEdit";

export default {
    name:"kpi-process-target-list",
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
                    label: "Referece Value",
                    key: "reference_value",
                    width: "xs"
                },
                {
                    label: "Reference Entity",
                    key: "reference_entity",
                    width: "xs"
                },
                {
                    label: "Process Name",
                    key: "process_name",
                    width: "xs"
                },
                {
                    label: "Value",
                    key: "value",
                    width: "xxxxs"
                },
                {
                    label: "Description",
                    key: "description",
                    width: "sm"
                },
                {
                    label: "Start Date",
                    key: "start_date",
                    width: "xxs"
                },
                {
                    label: "End Date",
                    key: "end_date",
                    width: "xxs"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "lg"
                },
                {
                    label: "Created By",
                    key: "user_creator",
                    width: "lg"
                },
                {
                    label: "Updated At",
                    key: "updated_at",
                    width: "lg"
                },
                {
                    label: "Updated By",
                    key: "user_editor",
                    width: "lg"
                },
            ],
            loading: false,
            dataItem: {},
            searchValue: this.query ? this.query : "",
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            selected_id: '',
            dialogActive: false,
            activeDialogConfirmRemove: false,
            loadingConfirmRemove:false,
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
        async getTableData(limit, page, q, from, to, searchBy) {
            this.loading = true

            let query = q || '';            
            let startDate = from || "";
            let endDate = to || "";
            
            try {
                const res = await axios.get(`${this.URL.kpi_process_target}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&search_by=${searchBy}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    arr.map((item) => {
                        item.created_at = this.formatTimezone(item.created_at)
                        item.updated_at = this.formatTimezone(item.updated_at)
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
        actionUpdate(val){
            this.dataItem = val;
            this.dialogActive = true;
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
                case 'dialog_edit_kpi_process_target':
                    this.dialogActive = false;
                    this.refresh();
                    break;
                case 'dialog_remove_kpi_process_target':
                    this.activeDialogConfirmRemove = false;
                    this.refresh();
                    break;
                default:
                    break;
            }
        },
        actionRemove(val){
            this.selected_id = val.kpi_process_target_id;
            this.activeDialogConfirmRemove = true;
        },
        confirmRemove() {
            this.removeData();
        },
        async removeData() {
            this.loadingConfirmRemove = true;
            try {
                const res = await axios.delete(`${this.URL.kpi_process_target}/${this.selected_id}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Remove KPI Process Target success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingConfirmRemove = false;
                this.closeDialog('dialog_remove_kpi_process_target');
            }
        }
    },
    mounted() {
        window.addEventListener('timezone-changed', this.refresh);
        this.refresh()
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh);
    }
}
</script>