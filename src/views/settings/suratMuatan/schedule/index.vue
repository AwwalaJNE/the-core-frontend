<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="6">
                <vs-row>
                    <vs-col xs="6" sm="3" lg="3">
                        <div class="select-surat-muatan-schedule">
                            <selector 
                                formKey="filter_status"
                                :valueData="filterVehicleTypeOptions"
                                :selectedValue="filterVehicleTypeBy"
                                :isMultiple="false"
                                @updateValue="updateValue" 
                            />
                        </div>
                    </vs-col>
                    <vs-col xs="6" sm="3" lg="3">
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
                            formKey="date_range"
                            :name="''" 
                            :rules="''" 
                            :valueData="dateRange"
                            typeInput="daterange" 
                            @updateValue="updateValue" 
                        />
                    </vs-col>
                </vs-row>
            </vs-col>
            <vs-col xs="12" sm="12" lg="6">
                <vs-row justify="end">
                    <vs-col xs="6" sm="8" lg="4">
                        <select-search-by 
                        :isMultiple="false" 
                        :border="true" 
                        :selectedValue="searchBySchedule" 
                        :valueData="searchParamsSchedule" 
                        @updateSearchBy="updateSearchBy"
                        />
                    </vs-col>
                    <vs-col xs="6" sm="4" lg="4">
                        <search-input ref="searchInput" @searchValue="searchValueHandler" />
                    </vs-col>
                </vs-row>
            </vs-col>
        </vs-row>
        <table-master 
            hideColumnKey="surat-muatan-schedule" 
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
            title="Edit Surat Muatan Schedule"
            :active="dialogEditActive" 
            :closeDialog="() => closeDialog('dialog_edit')"
            :dataItem="dataItem"
            :loading="loadingEdit"
            @refresh="refresh"
        />

        <dialog-confirm
            ref="dialog_remove"
            title="Remove Surat Muatan Schedule"
            :active="dialogRemoveActive"
            :closeDialog="() => closeDialog('dialog_remove')"
            :loading="loadingRemove"
            :message="`Are you sure you want to remove this Surat Muatan Schedule?`"
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

import DialogCreateEdit from "@/views/settings/suratMuatan/schedule/dialogCreateEdit";

export default {
    name:"surat-muatan-settings-schedule-data-table",
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
                    label: "Vehicle",
                    key: "vehicle_name",
                    width: "sm"
                },
                {
                    label: "Type",
                    key: "vehicle_type_name",
                    width: "sm"
                },
                {
                    label: "SHP No",
                    key: "shipment_number",
                    width: "sm"
                },
                {
                    label: "Origin",
                    key: "origin_name",
                    width: "sm"
                },
                {
                    label: "Destination",
                    key: "destination_name",
                    width: "sm"
                },
                {
                    label: "ETD",
                    key: "etd",
                    width: "auto",
                },
                {
                    label: "ETA",
                    key: "eta",
                    width: "auto",
                },
                {
                    label: "Vehicle Info",
                    key: "vehicle_information",
                    width: "auto",
                },
                {
                    label: "Reg No",
                    key: "registration_number",
                    width: "auto",
                },
                {
                    label: "External Source",
                    key: "is_external_source",
                    width: "auto",
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
                },
                {
                    label: 'ETA',
                    value: 'eta'
                },
                {
                    label: 'ETD',
                    value: 'etd'
                }
            ],
            loadingVehicleMode: false,
            filterVehicleTypeBy: "ALL",
            filterVehicleTypeOptions: [
                {
                    label: 'All Type',
                    value: 'ALL'
                },
                {
                    label: 'AIR',
                    value: '1'
                },
                {
                    label: 'DARAT TRUK',
                    value: '2'
                },
                {
                    label: 'UDARA',
                    value: '1053'
                },
                {
                    label: 'DARAT KA LOG',
                    value: '1055'
                }
            ],
            searchBySchedule: "vehicle_name",
            searchParamsSchedule: [
                {
                    label: "Vehicle",
                    value: "vehicle_name",
                },
                {
                    label: "Origin",
                    value: "origin",
                },
                {
                    label: "Destination",
                    value: "destination",
                },
                {
                    label: "Vehicle Info",
                    value: "vehicle_information",
                },
                {
                    label: "Reg No",
                    value: "registration_number",
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
       updateSearchBy(key, val) {
            this.searchBySchedule = val;
        },
        searchValueHandler(val) {
            this.searchValue = val;
            this.refresh();
        },
        refresh(){
            this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, this.dateRange[0], this.dateRange[1], this.searchBySchedule)
        },
       updateValue(key, val, info){
            switch(key) {
                case "filter_status":
                    this.filterVehicleTypeBy = val;
                    this.refresh();
                break;
                case "date_range":
                    this.dateRange = Array.isArray(val) ? val : [];
                    this.startDate = this.dateRange.length > 0 ? this.dateRange[0] : '';
                    this.endDate = this.dateRange.length > 1 ? this.dateRange[1] : '';
                    this.refresh();
                break;
                default:
            }
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
            this.refresh();
        },
        async getTableData(limit, page, q, from, to, searchBy) {
        this.loading = true;

        const query = q || this.searchValue || '';
        const startDate = from || this.startDate || '';
        const endDate = to || this.endDate || '';
        const searchColumn = searchBy !== undefined ? searchBy : this.searchBySchedule;

        try {
            const res = await axios.get(this.URL.schedule, {
            ...this.Helper.header(),
            params: {
                n: this.listenNodeId,
                sort_order: "desc",
                limit,
                page,
                s: query,
                filter_date_by: this.filterDateBy,
                start_date: startDate,
                end_date: endDate,
                search_by: searchColumn,
                vehicle_type: this.filterVehicleTypeBy !== "ALL" ? this.filterVehicleTypeBy : undefined
            }
            });

            const arr = res.data.data || [];

            this.dataTable = arr;
            this.pagination = {
            page: res.data.meta.current_page,
            limit: parseInt(res.data.meta.per_page, 10),
            page_size: res.data.meta.last_page,
            };

        } catch (err) {
            this.openNotification('danger',err?.response?.data?.code || '','Failed',err?.response?.data?.message || 'Something went wrong');
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
            this.selected_id = val.shipment_schedule_id;
            this.dialogRemoveActive = true;
        },
        confirmRemove() {
            this.removeData();
        },
        async removeData() {
            this.loadingRemove = true;
            try {
                const res = await axios.delete(`${this.URL.schedule}/${this.selected_id}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Remove data success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingRemove = false;
                this.closeDialog('dialog_remove');
            }
        },
    },
    mounted() {
        this.refresh();
    },
}
</script>
<style scoped>
.select-surat-muatan-schedule {
    margin-top: -9px !important;
}
</style>