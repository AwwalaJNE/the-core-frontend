<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="12">
                <vs-row>
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
            ref="dialog_create_edit"
            title="Edit Bag Weight Setting"
            :active="dialogCreateEditActive" 
            :closeDialog="() => closeDialog('dialog_create_edit')"
            :dataItem="dataItem"
            @refresh="refresh"
        />

        <dialog-confirm
            ref="dialog_remove"
            title="Remove Bag Weight Setting"
            :active="dialogRemoveActive"
            :closeDialog="() => closeDialog('dialog_remove')"
            :message="`Are you sure you want to remove this data with id ${this.bag_weight_setting_id}?`"
            :loading="loadingDialog"
            @confirm="confirmRemove"
            @cancel="() => closeDialog('dialog_remove')"
        />
    </div>
</template>
<script>
import axios from "axios";
import moment from "moment"

import master from "@/mixins/master"

import DateTime from "@/components/input/dateTime"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import SearchInput from "@/components/search/searchInput"
import TableMaster from "@/components/table/tableMaster.vue"

import DialogCreateEdit from "@/views/settings/bagWeight/bagWeight/dialogCreateEdit"

export default {
    name:"bag-weight-data-tabel",
    mixins: [master],
    props: {
        query: String,
        searchBy: String,
    },
    components: {
        "date-time": DateTime,
        "dialog-confirm": DialogConfirm,
        "dialog-create-edit": DialogCreateEdit,
        "search-input": SearchInput,
        "table-master" : TableMaster,
    },
    data() {
        return {
            dataItem: {},
            dataTable: [],
            datacolumn: [
                {
                    label: "Bag Type",
                    key: "bag_type",
                    width: "xs"
                },
                {
                    label: "Routing Type",
                    key: "routing_type",
                    width: "sm"
                },
                {
                    label: "Service Type",
                    key: "service_type",
                    width: "sm"
                },
                {
                    label: "Destination",
                    key: "destination",
                    width: "sm"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "sm"
                }
            ],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            loading: false,
            loadingDialog: false,
            tempSearch: "",
            dateRange: [],
            bag_weight_setting_id: '',            
            dialogCreateEditActive: false,
            dialogRemoveActive: false,
        }
    },
    computed: {  
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.searchBy)
                }
            }
        },
        searchBy: function(val, old) {
            if(val !== undefined) {
                if(val!== old) {
                    if (this.tempSearch !== '') {
                        this.$emit('clearSearch')
                    }
                }
            }
        },
    },
    methods: {
        async getTableData(limit, page, q, from, to, searchBy) {
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
                .get(this.URL.bag_weight_setting + `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&start_date=${startDate}&end_date=${endDate}&s=${query}&search_by=${searchBy}`, this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong')
                })
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
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, from, to, this.searchBy)
        },
        updateValue(key, val) {
            this.dateRange = val
            this.refresh()
        },
        actionUpdate(val){
            this.dataItem = val;
            this.dialogCreateEditActive = true;
        },
        actionRemove(val){
            this.bag_weight_setting_id = val.bag_weight_setting_id;
            this.dialogRemoveActive = true;
        },
        confirmRemove() {
            this.removeData()
        },
        async removeData() {
            this.loadingDialog = true;
            try {
                const res = await axios.delete(`${this.URL.bag_weight_setting}/${this.bag_weight_setting_id}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Remove success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingDialog = false;
                this.closeDialog('dialog_remove');
                this.refresh();
            }
        },
        closeDialog(ref) {
            switch (ref) {
                case 'dialog_create_edit':
                    this.dialogCreateEditActive = false;
                    break;
                case 'dialog_remove':
                    this.dialogRemoveActive = false;
                    break;
                default:
                    break;
            }
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>