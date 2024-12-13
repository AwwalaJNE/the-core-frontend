<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="12">
                <vs-row>
                    <vs-col xs="6" sm="3" lg="2">
                        <div class="select-surat-muatan-stock">
                            <selector 
                                formKey="filter_vehicle_mode"
                                :valueData="filterVehicleMode"
                                :selectedValue="filterVehicleModeBy"
                                :isMultiple="false"
                                :loading="loadingVehicleMode"
                                @updateValue="updateValue2" 
                            />
                        </div>
                    </vs-col>
                    <vs-col xs="6" sm="3" lg="2">
                        <div class="select-surat-muatan-stock">
                            <selector 
                                formKey="filter_status"
                                :valueData="filterStatus"
                                :selectedValue="filterStatusBy"
                                :isMultiple="false"
                                @updateValue="updateValue2" 
                            />
                        </div>
                    </vs-col>
                    <vs-col xs="6" sm="3" lg="2">
                        <select-search-by 
                            :border="true"
                            :isMultiple="false" 
                            :selectedValue="filterDateBy" 
                            :valueData="dateParams" 
                            @updateSearchBy="updateFilterDateBy"
                        />
                    </vs-col>
                    <vs-col xs="12" sm="6" lg="6">
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
            title="Edit Surat Muatan Stock"
            :active="dialogEditActive" 
            :closeDialog="() => closeDialog('dialog_edit')"
            :dataItem="dataItem"
            :loading="loadingEdit"
            @refresh="refresh"
        />

        <dialog-confirm
            ref="dialog_remove"
            title="Remove Surat Muatan Stock"
            :active="dialogRemoveActive"
            :closeDialog="() => closeDialog('dialog_remove')"
            :loading="loadingRemove"
            :message="`Are you sure you want to remove this Surat Muatan Stock?`"
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
import Selector from "@/components/input/select";
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";

import DialogCreateEdit from "@/views/settings/suratMuatan/stock/dialogCreateEdit";

export default {
    name:"surat-muatan-settings-stock-data-table",
    mixins: [master],
    props: {
        query: String,
        searchBy: String,
    },
    components: {
        "date-time": DateTime,
        "dialog-create-edit": DialogCreateEdit,
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
                    label: "Vehicle Mode",
                    key: "vehicle_mode_name",
                    width: "sm"
                },
                {
                    label: "Vehicle Name",
                    key: "vehicle_name",
                    width: "sm"
                },
                {
                    label: "Surat Muatan",
                    key: "no_sm",
                    width: "sm"
                },
                {
                    label: "ETD",
                    key: "etd",
                    width: "sm"
                },
                {
                    label: "ETA",
                    key: "eta",
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
                    width: "auto",
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
            filterVehicleModeBy: "ALL",
            filterVehicleMode: [
                {
                    label: 'All Mode',
                    value: 'ALL'
                },
            ],
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
        updateValue(key, val) {
            this.dateRange = val
            this.refresh()
        },
        updateValue2(key, val, info){
            switch(key) {
                case "filter_vehicle_mode":
                    this.filterVehicleModeBy = this.filterVehicleMode.find(item => item.value == val)?.value;
                    this.refresh();
                    break;
                case "filter_status":
                    this.filterStatusBy = this.filterStatus.find(item => item.value == val)?.value;
                    this.refresh();
                    break;
                default:
            }
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;

            if (this.dateRange.length !== 0) {
                this.dateRange = [];
            }
        },
        async getTableData(limit, page, q, from, to, searchBy) {
            this.loading = true

            let query = q || '';            
            let startDate = from || "";
            let endDate = to || "";
            
            try {
                const res = await axios.get(`${this.URL.sm_stock}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&filter_date_by=${this.filterDateBy}&start_date=${startDate}&end_date=${endDate}&search_by=${searchBy}&is_active=${this.filterStatusBy}&vehicle_mode=${this.filterVehicleModeBy}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    arr.map(item => {
                        item,
                        item["is_active"] = item.is_active === "1" ? true : false;
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
            this.selected_id = val.id;
            this.dialogRemoveActive = true;
        },
        confirmRemove() {
            this.removeData();
        },
        async removeData() {
            this.loadingRemove = true;
            try {
                const res = await axios.delete(`${this.URL.sm_stock}/${this.selected_id}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Remove data success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingRemove = false;
                this.closeDialog('dialog_remove');
            }
        },
        async getVehicleMode() {
            this.loadingVehicleMode = true;
            try {
                const res = await axios.get(`${this.URL.vehicle_mode_list_v2}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header());

                const data = res.data.data;

                if (data.length > 0) {
                    const arr = data.map(item => ({
                        label: item.vehicle_mode_name,
                        value: item.vehicle_mode_id
                    }));

                    this.filterVehicleMode = [...this.filterVehicleMode, ...arr];
                }
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingVehicleMode = false;
            }
        },
    },
    mounted() {
        this.refresh();
        this.getVehicleMode();
    },
}
</script>
<style scoped>
.select-surat-muatan-stock {
    margin-top: -10px !important;
}
</style>