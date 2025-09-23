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
                                @updateValue="updateValue" 
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
                                @updateValue="updateValue" 
                            />
                        </div>
                    </vs-col>
                    <vs-col xs="6" sm="3" lg="2">
                        <div class="select-surat-muatan-stock">
                            <selector 
                                formKey="filter_source"
                                :valueData="filterSource"
                                :selectedValue="filterSourceBy"
                                :isMultiple="false"
                                @updateValue="updateValue" 
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
                    <vs-col xs="12" sm="6" lg="4">
                        <date-time 
                            formKey="date_range"
                            :name="''" 
                            :rules="''" 
                            :valueData="dateRange"
                            typeInput="daterange" 
                            @updateValue="updateValue" 
                        />
                    </vs-col>
                    <vs-col xs="6" sm="3" lg="2">
                            <select-bag-origin
                                ref="bag_origin"
                                :border="true"
                                @updateBagOrigin="updateBagOrigin"
                            />
                    </vs-col>
                    <vs-col xs="6" sm="3" lg="2">
                            <select-bag-destination
                                ref="bag_destination"
                                :border="true"
                                @updateBagDestination="updateBagDestination"
                            />
                    </vs-col>
                </vs-row>
            </vs-col>
        </vs-row>
        <table-master 
            hideColumnKey="surat-muatan-stock" 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="true"
            :hasManageVehicle="true"
            :hasPagination="true"
            @actionManageVehicle="actionManageVehicle"
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

        <dialog-manage-vehicle-manifest
            title="Manifest Vehicle"
            :manifest_number="manifest_number"
            :manifest_method="manifest_method"
            :active="dialogManageVehicleManifest"
            :closeDialog="closeDialogManageVehicleManifest"
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
import SelectBagOrigin from "@/views/settings/suratMuatan/stock/selectBagOrigin.vue";
import SelectBagDestination from "@/views/settings/suratMuatan/stock/selectBagDestination.vue";
import DialogManageVehicleManifest from "@/views/transport/manifestVehicle/dialogCreateManage";

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
        "dialog-manage-vehicle-manifest": DialogManageVehicleManifest,
        "inputan": Inputan,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "selector": Selector,
        "table-master" : TableMaster,
        "select-bag-origin": SelectBagOrigin,
        "select-bag-destination": SelectBagDestination,
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
                    label: "Manifest Number",
                    key: "manifest_number",
                    width: "sm"
                },
                {
                    label: "Origin",
                    key: "node_code_origin",
                    width: "sm"
                },
                {
                    label: "Destination",
                    key: "node_code_destination",
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
                    label: "Via Schedule",
                    key: "schedule_id_value",
                    type: "status",
                    width: "xxxxs"
                },
                {
                    label: "Available",
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
            bagDestination: "",
            bagOrigin: "",
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
            filterStatusBy: "ALL",
            filterStatus: [
                {
                    label: 'All Status',
                    value: 'ALL'
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
            filterSourceBy: "all",
            filterSource: [
                {
                    label: 'All Creation Source',
                    value: 'all'
                },
                {
                    label: 'Schedule',
                    value: 'schedule'
                },
                {
                    label: 'Manual',
                    value: 'manual'
                }
            ],
            dialogManageVehicleManifest: false,
            manifest_number: "",
            manifest_method: 0
        }
    },
    computed: {
        selectedBagOrigin() {
            return this.bagOrigin || this.listenCurrentNode.branch_code;
        }
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
            this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, this.dateRange[0], this.dateRange[1], this.searchBy)
        },
        updateValue(key, val, info){
            switch(key) {
                case "filter_vehicle_mode":
                    this.filterVehicleModeBy = this.filterVehicleMode.find(item => item.value == val)?.value;
                    this.refresh();
                    break;
                case "filter_status":
                    this.filterStatusBy = this.filterStatus.find(item => item.value == val)?.value;
                    this.refresh();
                    break;
                case "filter_source":
                    this.filterSourceBy = this.filterSource.find(item => item.value == val)?.value;
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
        updateBagOrigin(key, val) {
            this.bagOrigin = val;
            this.refresh();
        },
        updateBagDestination(key, val) {
            this.bagDestination = val;
            this.refresh();
        },
        async getTableData(limit, page, q, from, to, searchBy) {
            this.loading = true

            let query = q || '';            
            let startDate = from || "";
            let endDate = to || "";
            
            try {
                const res = await axios.get(`${this.URL.sm_stock}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&filter_date_by=${this.filterDateBy}&start_date=${startDate}&end_date=${endDate}&search_by=${searchBy}&is_active=${this.filterStatusBy}&creation_source=${this.filterSourceBy}&vehicle_mode=${this.filterVehicleModeBy}&node_origin=${this.selectedBagOrigin}&node_destination=${this.bagDestination}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    arr.map(item => {
                        item,
                        item["is_active"] = item.is_active === "1" ? true : false;
                        item["schedule_id_value"] = item.schedule_id ? true : false;
                        item["etd"] = this.formatTimezone(item?.etd);
                        item["eta"] = this.formatTimezone(item?.eta);
                        item["created_at"] = this.formatTimezone(item?.created_at);
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
        actionManageVehicle(val) {
            this.dialogManageVehicleManifest = true;
            this.manifest_number = val.manifest_number;
            this.manifest_method = parseInt(val.vehicle_mode_id);
        },
        closeDialogManageVehicleManifest() {
            this.dialogManageVehicleManifest = false;
            this.refresh();
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