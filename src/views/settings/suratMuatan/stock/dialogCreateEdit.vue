<template>
    <div>
        <dialog-master 
            width="lg"
            :actived="listenActive" 
            :closeDialog="cancel"
            :loading="listenLoading"
        >
            <template v-slot:header>
                {{listenTitle}}
            </template>

            <template v-slot:content>
                <div>
                    <template v-if="Object.keys(edit_data).length === 0">
                        <vs-row align="center">
                            <vs-col xs="12" sm="4" lg="4">
                                <select-search-by
                                    key="searchBy"
                                    :border="true"
                                    :isMultiple="false"
                                    :selectedValue="searchBy" 
                                    :valueData="searchParams" 
                                    @updateSearchBy="updateSearchBy" 
                                />
                            </vs-col>
                            <vs-col xs="12" sm="8" lg="8">
                                <search-input 
                                    ref="searchInput"  
                                    :placeholder="searchPlaceholder" 
                                    @searchValue="searchValue"
                                />
                            </vs-col>
                        </vs-row>
                        <vs-row>
                            <vs-col xs="12" sm="12" lg="12">
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

                        <div style="margin-top: 10px;">
                            <table-master 
                                hideColumnKey="dialog-surat-muatan-stock" 
                                :dataTable="dataTable" 
                                :dataColumn="datacolumn" 
                                :tableLoading="loadingTableData"
                                :selectedData="selectedData"
                                :hasPagination="true"
                                :pageSize="pagination.page_size"
                                :page="pagination.page"
                                :limit="pagination.limit"
                                :isMultipleSelectWithIndex="true"
                                :onRowClickCallback="onRowClickCallback"
                                :isShowCheckboxAll="false"
                                @actionLimit="actionLimit"
                                @actionPagination="actionPagination"
                                @updateSelected2="updateSelected"
                            />
                        </div>
                    </template>

                    <div class="parent-container">
                        <div class="container-clear-item" @click="handleClearAll">
                            Reset Inputs
                        </div>
                    </div>

                    <form-input-controller
                        ref="formDataController" 
                        typeForm="surat_muatan_stock"
                        :dataItem="dataItem"
                        :querySearch="querySearch"
                        @formData="formData"
                    />

                    <vs-row v-if="vehicle.length > 0">
                        <vs-row justify="space-between" v-if="Object.keys(edit_data).length > 0">
                            <h3 class="title">Vehicle List</h3>
                            <vs-button
                                shadow
                                :active="false"
                                @click="openDialogManageVehicleManifest"
                            >
                                <i class='bx bx-cog'></i> Manage
                            </vs-button>
                        </vs-row>
                        <vs-row
                            v-for="(item, index) in vehicle"
                            :key="index"
                        >
                            <vs-col w="12">
                                <vehicle-card 
                                    :data="item" 
                                    :isActive="item.is_active"
                                />
                            </vs-col>
                        </vs-row>
                        
                    </vs-row>
                    <vs-row v-else>
                        <img src="@/assets/svg/defaultVehicle.svg" alt="Core JNE Default Vehicle" style="width: 100%; margin: 20px 0;"/>
                    </vs-row>
                    
                </div>
            </template>

            <template v-slot:footer>
                <vs-row justify="flex-end">
                    <vs-col w="3">
                        <vs-button
                            block
                            danger
                            flat
                            transparent
                            :active="true"
                            @click="cancel"
                        >
                            Cancel
                        </vs-button>
                    </vs-col>
                    <vs-col w="3">
                        <vs-button
                            block
                            flat
                            transparent
                            type="submit"
                            :active="true"
                            @click="handleSubmit"
                        >
                            {{btnBlue || 'Add'}}
                        </vs-button>
                    </vs-col>
                </vs-row>                
            </template>
        </dialog-master>

        <dialog-manage-vehicle-manifest
            title="Manifest Vehicle"
            :manifest_number="edit_data.manifest_number"
            :manifest_method="parseInt(edit_data.vehicle_mode_id)"
            :active="dialogManageVehicleManifest"
            :closeDialog="closeDialogManageVehicleManifest"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";

import DateTime from "@/components/input/dateTime"
import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import Selector from "@/components/input/select";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";
import VehicleCard from "@/views/transport/manifestNew/vehicleCard";

import DialogManageVehicleManifest from "@/views/transport/manifestVehicle/dialogCreateManage";

export default {
    name:"surat-muatan-settings-stock-dialog",
    mixins: [master],
    components: {
        "date-time": DateTime,
        "dialog-master": DialogMaster,
        "dialog-manage-vehicle-manifest": DialogManageVehicleManifest,
        "form-input-controller": FormInputController,
        "selector": Selector,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "table-master" : TableMaster,
        "vehicle-card": VehicleCard
    },
    props: {
        active: Boolean,
        btnRed: String,
        btnBlue: String,
        closeDialog: Function,
        dataItem: Object,
        title: String
    },
    data() {
        return {
            autoCompleteUrl: "",
            form: {},
            id: "",
            loading: false,
            tempSearch: "",
            dateRange: [],
            searchBy: "vehicle",
            searchPlaceholder: "Search Schedule Vehicle",
            searchParams: [
                {
                    label: 'Vehicle',
                    value: 'vehicle'
                },
                {
                    label: 'Origin',
                    value: 'origin'
                },
                {
                    label: 'Destination',
                    value: 'destination'
                },
                {
                    label: 'Vehicle Info',
                    value: 'vehicle_info'
                },
                {
                    label: 'Registration Number',
                    value: 'registration_number'
                },
            ],
            loadingTableData: false,
            dataTable: [],
            datacolumn: [
                {
                    label: "Vehicle",
                    key: "vehicle_name",
                    width: "sm"
                },
                {
                    label: "Type",
                    key: "vehicle_mode_name",
                    width: "sm"
                },
                {
                    label: "SHP No",
                    key: "shipment_number",
                    width: "xs"
                },
                {
                    label: "Origin",
                    key: "origin",
                    width: "md"
                },
                {
                    label: "Destination",
                    key: "destination",
                    width: "md"
                },
                {
                    label: "ETD",
                    key: "etd_formatted",
                    width: "sm"
                },
                {
                    label: "ETA",
                    key: "eta_formatted",
                    width: "sm"
                },
                {
                    label: "Vehicle Info",
                    key: "vehicle_information",
                    width: "xs"
                },
                {
                    label: "Reg No",
                    key: "registration_number",
                    width: "xs"
                },
            ],
            pagination: {
                limit: 3,
                page_size: 1,
                page: 1
            },
            edit_data: {},
            selectedData: [],
            schedule_id: "",
            vehicle: [],
            vehicle_form: [],
            manifest_number: "",
            manifest_method_id: 0,
            dialogManageVehicleManifest: false
        }
    },
    computed: {
        listenActive(){
            if (this.active) {
            }
            return this.active;
        },
        listenTitle(){
            return this.title;
        },
        listenLoading() {
            return this.loading;
        },
        listenDataItem() {
            return this.dataItem;
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.getDataDetail(val);
                this.getManifestVehicle();
            }
        },
        query: function(val, old) {
            if(val !== undefined) {
                this.searchValue = val
                if(this.searchValue !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.searchBy)
                }
            }
        },
    },
    methods: {
        refresh() {
            const isTempSearchEmpty = this.tempSearch === "";
            const isDateRangeEmpty = !this.dateRange || this.dateRange.length === 0;

            if (isTempSearchEmpty && isDateRangeEmpty) {
                this.dataTable = [];
            } else {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.dateRange?.[0] || null, this.dateRange?.[1] || null, this.searchBy);
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
        async getTableData(limit, page, q, from, to, searchBy) {
            this.loadingTableData = true

            let query = q || '';            
            let startDate = from || "";
            let endDate = to || "";
            
            try {
                const res = await axios.get(`${this.URL.schedule}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&filter_date_by=etd&start_date=${startDate}&end_date=${endDate}&search_by=${searchBy}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    arr.map(item => {
                        item,
                        item["origin"] = item?.origin_name + "\n" + item?.origin_identifier + "\n" + item?.origin_point;
                        item["destination"] = item?.destination_name + "\n" + item?.destination_identifier + "\n" + item?.destination_point;
                        item["etd_formatted"] = item?.etd + " " + item?.etd_timezone;
                        item["eta_formatted"] = item?.eta + " " + item?.eta_timezone;
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
                this.loadingTableData = false;
            }
        },
        async getDataDetail(val) {
            this.edit_data = val;
            this.id = val.id;

            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NODE_ID_ORIGIN_ValueData", val.node_id_origin.toString());
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NODE_ID_DESTINATION_ValueData", val.node_id_destination.toString());

            val.node_id_origin = val.node_name_origin + " (" + val.node_code_origin + ")";
            val.node_id_destination = val.node_name_destination + " (" + val.node_code_destination + ")";
        },
        async getManifestVehicle() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.manifest_vehicle}/${this.edit_data.manifest_number}?n=${this.listenNodeId}`, this.Helper.header());

                let arr = res.data.data;

                this.vehicle = arr.map((item, idx) => ({
                    origin_vehicle: item?.name_origin_tlc || "",
                    destination_vehicle: item?.name_destination_tlc || "",
                    origin_vehicle_tlc: item?.origin_tlc || "",
                    destination_vehicle_tlc: item?.destination_tlc || "",
                    vehicle_id: item?.vehicle_name || "",
                    pic_employee_id: item?.pic_employee_id || "",
                    flight_number: item?.flight_number || "",
                    flight_schedule: item?.etd || "",
                    etd_vehicle: item?.etd || "",
                    eta_vehicle: item?.eta || "",
                    status_flight: item?.status_flight,
                    is_active: item?.status === 'ACTIVE'
                }));
                
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        querySearch(queryString, cb){
            axios.get(this.URL.branch_list_v2 +`?n=${this.listenNodeId}&s=${queryString}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
                let suggestions = [];
                result.length > 0 && result.map(item => {

                    suggestions.push({
                        value: item['node_name'],
                        data: item['node_id']
                    });
                });
                cb(suggestions);
                })
            .catch(error => console.log("error", error));
        },
        formData(form){
            const { id, ...formWithoutId } = form;
            
            if (this.edit_data.node_id_destination !== form?.node_id_destination) {
                formWithoutId.node_id_destination = form?.node_id_destination;
            }

            if (this.edit_data.node_id_origin !== form?.node_id_origin) {
                formWithoutId.node_id_origin = form?.node_id_origin;
            }

            formWithoutId.vehicle = this.vehicle_form.map(item => ({
                vehicle_id: item.vehicle_id,
                tlc_origin: item.tlc_origin,
                tlc_destination: item.tlc_destination,
                flight_number: item.flight_number,
                etd: item.etd,
                etd_timezone: item.etd_timezone,
                eta: item.eta,
                eta_timezone: item.eta_timezone,
                is_active: item.is_active ? 1 : 0
            }));
            formWithoutId.is_active = formWithoutId.is_active === true ? "1" : "0";
            formWithoutId.schedule_id = this.vehicle[0]?.shipment_schedule_id || null; // TODO: CONFIRM AGAIN

            this.form = formWithoutId;

            this.handleSubmitData();
        },
        updateValue(key, val, info){
            switch(key) {
                case "date_range":
                    this.dateRange = val;
                    this.refresh()
                    break;
                default:
            }
        },
        async handleSubmitData() {
            this.loading = true;
            try {
                const res = this.id ? await axios.put(`${this.URL.sm_stock}/${this.id}?n=${this.listenNodeId}`, this.form, this.Helper.header()) : await axios.post(`${this.URL.sm_stock}?n=${this.listenNodeId}`, this.form, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || this.id ? "Success Update Data" : "Success Create Data");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
                this.cancel();
            }
        },
        handleSubmit(){
            this.$refs.formDataController.handleSubmit();
        },
        handleClearForm(){
            this.$refs.formDataController.handleClearForm();
            this.form = {};
            this.id = "";
            this.$emit("handleClearInput");
            this.$emit("refresh");
        },
        cancel() {
            this.vehicle = {};
            this.vehicle_form = {};
            this.dateRange = [];
            this.dataTable = [];
            this.clearSearch();
            this.handleClearForm();
            this.handleClearAll();
            this.closeDialog();
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh();
        },
        updateSearchBy(key, val) {
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        clearSearch() {
            this.$refs?.searchInput?.clear()
        },
        handleClearAll() {
            this.schedule_id = "";
            this.selectedData = [];
            this.$refs.formDataController.handleEmptyForm();
            this.form = {}; 
        },
        openDialogManageVehicleManifest() {
            this.dialogManageVehicleManifest = true;
        },
        closeDialogManageVehicleManifest() {
            this.dialogManageVehicleManifest = false;
        },
        updateSelected(val, checkedItem) {
            // NOTES: THIS FUNCTION USED FOR CHECKED BY CLICKING CHECKBOX
            this.vehicle = checkedItem.map((item, idx) => ({
                shipment_schedule_id: item?.shipment_schedule_id,
                origin_vehicle: item?.origin_name || "",
                destination_vehicle: item?.destination_name || "",
                origin_vehicle_tlc: item?.origin_identifier || "",
                destination_vehicle_tlc: item?.destination_identifier || "",
                vehicle_id: item?.vehicle_name || "",
                pic_employee_id: "",
                flight_number: item?.shipment_number || "",
                flight_schedule: item?.etd || "",
                flight_schedule_timezone: item?.etd_timezone || "",
                etd_vehicle: item?.etd || "",
                etd_vehicle_timezone: item?.etd_timezone || "",
                eta_vehicle: item?.eta || "",
                eta_vehicle_timezone: item?.eta_timezone || "",
                is_active: idx === 0
            }));

            this.vehicle_form = checkedItem.map((item, idx) => ({
                shipment_schedule_id: item?.shipment_schedule_id,
                tlc_origin: item?.origin_identifier || "",
                tlc_destination: item?.destination_identifier || "",
                vehicle_id: item?.vehicle_id || "",
                flight_number: item?.shipment_number || "",
                etd: item?.etd || "",
                etd_timezone: item?.etd_timezone || "",
                eta: item?.eta || "",
                eta_timezone: item?.eta_timezone || "",
                is_active: idx === 0
            }));
        },
        onRowClickCallback(event, val, checkedItem) {
            // NOTES: THIS FUNCTION USED FOR CHECKED BY CLICKING ROW
            this.vehicle = checkedItem.map((item, idx) => ({
                shipment_schedule_id: item?.shipment_schedule_id,
                origin_vehicle: item?.origin_name || "",
                destination_vehicle: item?.destination_name || "",
                origin_vehicle_tlc: item?.origin_identifier || "",
                destination_vehicle_tlc: item?.destination_identifier || "",
                vehicle_id: item?.vehicle_name || "",
                pic_employee_id: "",
                flight_number: item?.shipment_number || "",
                flight_schedule: item?.etd || "",
                flight_schedule_timezone: item?.etd_timezone || "",
                etd_vehicle: item?.etd || "",
                etd_vehicle_timezone: item?.etd_timezone || "",
                eta_vehicle: item?.eta || "",
                eta_vehicle_timezone: item?.eta_timezone || "",
                is_active: idx === 0
            }));

            this.vehicle_form = checkedItem.map((item, idx) => ({
                shipment_schedule_id: item?.shipment_schedule_id,
                tlc_origin: item?.origin_identifier || "",
                tlc_destination: item?.destination_identifier || "",
                vehicle_id: item?.vehicle_id || "",
                flight_number: item?.shipment_number || "",
                etd: item?.etd || "",
                etd_timezone: item?.etd_timezone || "",
                eta: item?.eta || "",
                eta_timezone: item?.eta_timezone || "",
                is_active: idx === 0
            }));
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
<style> 
.container-clear-item {
  display: flex;
  justify-content: flex-end;
}
.clear-item {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  color: red;
  margin: 10px 0;
}
.parent-container {
  padding-top: 30px;
  display: flex;
  justify-content: flex-end;
}

.container-clear-item {
  cursor: pointer;
  color: #007bff;
}

</style>