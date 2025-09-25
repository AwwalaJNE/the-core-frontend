<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="6" lg="3">
                <selector 
                    formKey="filter_destination_type"
                    :valueData="filterDestinationType"
                    :selectedValue="filterDestinationTypeBy"
                    :isMultiple="false"
                    :loading="loading"
                    @updateValue="updateFilterDestinationTypeBy" 
                />
            </vs-col>
        </vs-row>
        <table-master 
            hideColumnKey="active-bag-weight" 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="true"
            :hasPagination="true"
            :expandable="true"
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
            title="Remove Active Bag Weight Setting"
            :active="dialogRemoveActive"
            :closeDialog="() => closeDialog('dialog_remove')"
            :message="`Are you sure you want to remove this data?`"
            :loading="loading"
            @confirm="confirmRemove"
            @cancel="() => closeDialog('dialog_remove')"
        />
    </div>
</template>
<script>
import axios from "axios";

import master from "@/mixins/master";

import DialogConfirm from "@/components/dialog/dialogConfirm";
import Selector from "@/components/input/select";
import TableMaster from "@/components/table/tableMaster";

import DialogCreateEdit from "@/views/settings/bag/activeBagWeight/dialogCreateEdit";

export default {
    name:"active-bag-weight-data-tabel",
    mixins: [master],
    props: {
        query: String,
        searchBy: String,
    },
    components: {
        "dialog-confirm": DialogConfirm,
        "dialog-create-edit": DialogCreateEdit,
        "selector": Selector,
        "table-master" : TableMaster,
    },
    data() {
        return {
            dataItem: {},
            dataTable: [],
            datacolumn: [
                {
                    label: "Reference",
                    key: "reference",
                    width: "auto"
                },
                {
                    label: "Max Weight (kg)",
                    key: "max_weight",
                    width: "auto"
                },
                {
                    label: "Threshold (%)",
                    key: "threshold",
                    width: "auto"
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
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            loading: false,
            tempSearch: "",
            active_bag_weight_id: '',            
            dialogCreateEditActive: false,
            dialogRemoveActive: false,
            filterDestinationTypeBy: "ALL",
            filterDestinationType: [
                {
                    label: 'All Destination Type',
                    value: 'ALL'
                },
                {
                    label: 'Region',
                    value: 'REGION'
                },
                {
                    label: 'Branch',
                    value: 'BRANCH'
                },
                {
                    label: 'Origin',
                    value: 'ORIGIN'
                },
                {
                    label: 'Node',
                    value: 'NODE'
                },
            ],
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.searchBy)
                }
            }
        },
    },
    methods: {
        refresh(){
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.searchBy)
        },
        async getTableData(limit, page, q, searchBy, destinationType) {
            this.loading = true;

            let query = q || '';
            
            try {
                const res = await axios.get(`${this.URL.active_bag_weight}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&search_by=${searchBy}&destination_type=${this.filterDestinationTypeBy}`, this.Helper.header());

                let arr = (res?.data?.data || []).map(item => {
                    item.created_at = this.formatTimezone(item.created_at);
                    item.updated_at = this.formatTimezone(item.updated_at);
                    const children = item?.destination?.reduce(
                        (acc, k) => {
                            acc['Destination Type'].push(k.destination_type);
                            acc['Destination Name'].push(k.destination_name ?? k?.destination_value ?? "");
                            acc['Destination Value'].push(k?.destination_value ?? " ");
                            return acc;
                        },
                        { 'Destination Type': [], 'Destination Name': [], 'Destination Value': [] }
                    );

                    return {
                        ...item,
                        children
                    };
                });
                this.dataTable = arr;
                this.pagination = {
                    page: res.data.meta.current_page,
                    limit: parseInt(res.data.meta.per_page, 10),
                    page_size: res.data.meta.last_page,
                };
                
                this.openNotification("success", null, "Success", res?.data?.message);
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        actionLimit(val){
            this.pagination.limit = val;
            this.pagination.page = 1;
            this.refresh();
        },
        actionPagination(val) {
            this.pagination.page = val;
            this.refresh();
        },
        actionUpdate(val){
            this.dataItem = val;
            this.dialogCreateEditActive = true;
        },
        actionRemove(val){
            this.active_bag_weight_id = val.active_bag_weight_id;
            this.dialogRemoveActive = true;
        },
        confirmRemove() {
            this.removeData()
        },
        async removeData() {
            this.loading = true;
            try {
                const res = await axios.delete(`${this.URL.active_bag_weight}/${this.active_bag_weight_id}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Remove success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
                this.closeDialog('dialog_remove');
            }
        },
        closeDialog(ref) {
            switch (ref) {
                case 'dialog_create_edit':
                    this.dialogCreateEditActive = false;
                    break;
                case 'dialog_remove':
                    this.dialogRemoveActive = false;
                    this.refresh();
                    break;
                default:
                    break;
            }
        },
        updateFilterDestinationTypeBy(key, val) {
            this.filterDestinationTypeBy = val;
            this.refresh()
        },
    },
    mounted() {
        window.addEventListener('timezone-changed', this.refresh);
        this.refresh()
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh);
    },
}
</script>