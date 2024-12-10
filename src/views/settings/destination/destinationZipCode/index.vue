<template>
    <div>
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
            ref="dialog_edit_destination_zip_code"
            title="Edit Destination Zip Code"
            btnBlue="Edit"
            :active="dialogActive" 
            :closeDialog="() => closeDialog('dialog_edit_destination_zip_code')"
            :dataItem="dataItem"
            @refresh="refresh"
        />

        <dialog-confirm
            ref="dialog_remove_destination_zip_code"
            title="Remove Destination Zip Code"
            :message="`Are you sure you want to remove this?`"
            :active="activeDialogConfirmRemove"
            :loading="loadingConfirmRemove"
            :closeDialog="() => closeDialog('dialog_remove_destination_zip_code')"
            @confirm="confirmRemove"
            @cancel="() => closeDialog('dialog_remove_destination_zip_code')"
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

import DialogCreateEdit from "@/views/settings/destination/destinationZipCode/dialogCreateEdit";

export default {
    name:"destination-zip-code-list",
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
                    width: "auto"
                },
                {
                    label: "Reference Entity",
                    key: "reference_entity",
                    width: "auto"
                },
                {
                    label: "Zip Code",
                    key: "merged_zip_code",
                    width: "auto"
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
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.searchBy)
                }
            }
        },
        searchBy: function(val, old) {
            if(val !== undefined) {
                this.searchBy = val
                if(this.searchBy !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, val)
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

            this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, this.searchBy)
        },
        async getTableData(limit, page, q, searchBy) {
            this.loading = true

            let query = q || '';
            
            try {
                const res = await axios.get(`${this.URL.destination_zip_code}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&search_by=${searchBy}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    let mergedData = Object.values(
                        arr.reduce((acc, item) => {
                            if (!acc[item.id]) {
                                acc[item.id] = { ...item, zip_code: [item.zip_code] };
                            } else {
                                acc[item.id].zip_code.push(item.zip_code);
                            }
                            return acc;
                        }, {})
                    );
                    mergedData.length > 0 && mergedData.map((item) => {
                        item["merged_zip_code"] = item.zip_code.map((itm, index) => {
                            let newline = "\n";
                            if (index == 0) {
                                newline = "";
                            }
                            return newline + '- ' + itm;
                        }).toString();
                    })
                    this.dataTable = mergedData
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
                case 'dialog_edit_destination_zip_code':
                    this.dialogActive = false;
                    this.refresh();
                    break;
                case 'dialog_remove_destination_zip_code':
                    this.activeDialogConfirmRemove = false;
                    this.refresh();
                    break;
                default:
                    break;
            }
        },
        actionRemove(val){
            this.selected_id = val.id;
            this.activeDialogConfirmRemove = true;
        },
        confirmRemove() {
            this.removeData();
        },
        async removeData() {
            this.loadingConfirmRemove = true;
            try {
                const res = await axios.delete(`${this.URL.destination_zip_code}/${this.selected_id}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Remove Destination Zip Code success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingConfirmRemove = false;
                this.closeDialog('dialog_remove_destination_zip_code');
            }
        }
    },
    mounted() {
        this.refresh()
    },
}
</script>