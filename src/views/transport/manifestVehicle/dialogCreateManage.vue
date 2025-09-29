<template>
    <dialog-master
        width="md"
        :actived="listenActive"
        :loading="listenLoading"
        :closeDialog="cancel"
    >
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <vs-col xs="12" sm="12" lg="12">
                <nav-item 
                    v-model="navActive"
                    :navItem="navItem" 
                    @activeTab="activeTab" 
                />
            </vs-col>
            <vs-col xs="12" sm="12" lg="12">
                <template v-if="navActive === 'k-MANAGE'">
                    <template v-if="list_manifest_vehicle.length > 0">
                        <p class="notes"><b>Notes</b>: *Click a card to select a vehicle — changes save automatically.</p>
                        <radio
                            :name="'manifest_vehicle'"
                            :value-data="list_manifest_vehicle"
                            :selected-value="listenSelectedManifestVehicle"
                            :isRemoveButton="true"
                            @updateValue="updateValue"
                            @removeRow="removeRow"
                        />
                    </template>
                    <template v-else>
                        <p>No vehicle data is currently available. Please create a new vehicle first.</p>
                    </template>
                </template>
                <template v-else-if="navActive === 'k-NEW-AUTO'">
                    <vs-input 
                        border 
                        type="text"
                        v-model="flightNumber"
                        label-placeholder="Search By Flight Number Here"
                        :autofocus="true"
                        :disabled="hasFlightNumber"
                        v-uppercase
                        ref="formFlightNumber"
                        @keyup.enter="processFlightNumber"
                    />
                    <template v-if="hasFlightNumber">
                        <div style="position:absolute; right:20px; top:15px;">
                            <span class="vs-select__chips__chip__close" @click="clearInput">
                                <i class="vs-icon-close vs-icon-hover-less"></i>
                            </span>
                        </div>

                        <template v-if="!loading">
                            <template v-if="!is_found">
                                <p>Flight number not found. Kindly enter a valid code or create the record manually.</p>
                            </template>
                            <template v-else>
                                <form-input-controller
                                    ref="formSuratMuatanVehicleController"
                                    typeForm="surat_muatan_vehicle"
                                    :querySearch="querySearch"
                                    @formData="formData"
                                    @inputFocus="inputFocus"
                                />
                            </template>
                        </template>
                    </template>
                </template>
                <template v-else-if="navActive === 'k-NEW-MANUAL'">
                    <form-input-controller
                        ref="formSuratMuatanVehicleController"
                        typeForm="surat_muatan_vehicle"
                        :querySearch="querySearch"
                        @formData="formData"
                        @inputFocus="inputFocus"
                    />
                </template>
                <template v-else-if="navActive === 'k-NEW-SCHEDULE'">
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
                                @updateValue="updateDateRange" 
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

            </vs-col>
        </template>

        <template v-slot:footer v-if="navActive === 'k-NEW-AUTO' || navActive === 'k-NEW-MANUAL' || navActive === 'k-NEW-SCHEDULE'">
            <vs-row justify="flex-end" style="margin-top: 1pc;">
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
                        Submit
                    </vs-button>
                </vs-col>
            </vs-row>                
        </template>
    </dialog-master>
</template>

<script>
import axios from "axios";

import master from "@/mixins/master";

import DateTime from "@/components/input/dateTime";
import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import RadioWithCard from "@/components/input/radioWithCard";
import NavItem from "@/components/navbar/navTab";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";

export default {
    name: "dialog-manage-vehicle-manifest",
    mixins: [master],
    components: {
        "date-time": DateTime,
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "nav-item": NavItem,
        "radio": RadioWithCard,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "table-master" : TableMaster,
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        dataItem: Object,
        manifest_method: Number,
        manifest_number: String,
        title: String,
        submitType: {
            type: String,
            default: 'api',
            validator: v => ['api', 'prefill', 'prefill-stock'].includes(v)
        },
        updateVehicleValue: Function,
        updateVehicleValueBySchedule: Function,
    },
    data() {
        return {
            navActive: "",
            navItem: [],
            loading: false,
            list_manifest_vehicle: [],
            selected_manifest_vehicle: "",

            flightNumber: "",
            hasFlightNumber: false,

            vehicle_id: "",
            vehicle_data: {},
            origin_data: {},
            destination_data: {},
            is_found: false,

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
                    key: "etd",
                    width: "sm"
                },
                {
                    label: "ETA",
                    key: "eta",
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
                limit: 20,
                page_size: 1,
                page: 1
            },
            selectedData: [],
        };
    },
    computed: {
        listenActive() {
            if (this.active) {
                this.setNavItem();
                this.setDialogActive();
            }
            return this.active;
        },
        listenTitle() {
            return this.title;
        },
        listenLoading() {
            return this.loading;
        },
        listenManifestNumber() {
            return this.manifest_number;
        },
        listenManifestMethod() {
            return this.manifest_method;
        },
        listenSelectedManifestVehicle() {
            return this.selected_manifest_vehicle || ''
        },
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
    },
    methods: {
        setNavItem() {
            if (this.submitType === 'api') {
                // TODO: SET AUTO LATER AFTER API FOR ROAD / TRAIN / SEA ALREADY EXISTS
                switch(this.listenManifestMethod){
                    case 1:
                        this.navItem = [
                            {
                                label: "MANAGE",
                                key: "k-MANAGE"
                            },
                            {
                                label: "NEW (AUTO)",
                                key: "k-NEW-AUTO"
                            },
                            {
                                label: "NEW (MANUAL)",
                                key: "k-NEW-MANUAL"
                            },
                        ];
                        break;
                    case 2:
                    case 3:
                    case 4:
                        this.navItem = [
                            {
                                label: "MANAGE",
                                key: "k-MANAGE"
                            },
                            {
                                label: "NEW (MANUAL)",
                                key: "k-NEW-MANUAL"
                            },
                        ];
                        break;
                }

                this.navActive = "k-MANAGE";

                this.getManifestVehicle();
            } else if (this.submitType === 'prefill-stock') {
                switch(this.listenManifestMethod){
                    case 1:
                        this.navItem = [
                            {
                                label: "NEW (AUTO)",
                                key: "k-NEW-AUTO"
                            },
                            {
                                label: "NEW (MANUAL)",
                                key: "k-NEW-MANUAL"
                            },
                            {
                                label: "NEW (SCHEDULE)",
                                key: "k-NEW-SCHEDULE"
                            },
                        ];
                        this.navActive = "k-NEW-AUTO";
                        break;
                    case 2:
                    case 3:
                    case 4:
                        this.navItem = [
                            {
                                label: "NEW (MANUAL)",
                                key: "k-NEW-MANUAL"
                            },
                            {
                                label: "NEW (SCHEDULE)",
                                key: "k-NEW-SCHEDULE"
                            },
                        ];
                        this.navActive = "k-NEW-MANUAL";
                        break;
                }
            } else if (this.submitType === 'prefill') {
                switch(this.listenManifestMethod){
                    case 1:
                        this.navItem = [
                            {
                                label: "NEW (AUTO)",
                                key: "k-NEW-AUTO"
                            },
                            {
                                label: "NEW (MANUAL)",
                                key: "k-NEW-MANUAL"
                            },
                        ];
                        this.navActive = "k-NEW-AUTO";
                        break;
                    case 2:
                    case 3:
                    case 4:
                        this.navItem = [
                            {
                                label: "NEW",
                                key: "k-NEW-MANUAL"
                            },
                        ];
                        this.navActive = "k-NEW-MANUAL";
                        break;
                }
            }
        },
        setDialogActive() {
            switch(this.listenManifestMethod){
                case 1:
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER_visible", true);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE_visible", true);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_EMPLOYEE_DRIVER_ID_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ORIGIN_BRANCH_CODE_visible", true);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_DESTINATION_BRANCH_CODE_visible", true);
                    break;
                case 2:
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_EMPLOYEE_DRIVER_ID_visible", true);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ORIGIN_BRANCH_CODE_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_DESTINATION_BRANCH_CODE_visible", false);
                    break;
                case 3:
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_EMPLOYEE_DRIVER_ID_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ORIGIN_BRANCH_CODE_visible", true);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_DESTINATION_BRANCH_CODE_visible", true);
                    break;
                case 4:
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_EMPLOYEE_DRIVER_ID_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ORIGIN_BRANCH_CODE_visible", true);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_DESTINATION_BRANCH_CODE_visible", true);
                    break;
            }
        },
        activeTab(val) {
            this.navActive = val;

            if (val === 'k-MANAGE') {
                this.getManifestVehicle();
            }

            this.moveTab();
        },
        searchValue (val) {
            this.tempSearch = val;
            this.refresh();
        },
        updateSearchBy(key, val) {
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        clearSearch() {
            this.$refs?.searchInput?.clear()
        },
        updateDateRange(key, val, info){
            switch(key) {
                case "date_range":
                    this.dateRange = val;
                    this.refresh();
                    break;
                default:
            }
        },
        formData(form){
            if (this.submitType === 'api') {
                form.origin_branch_code = form.origin_branch_code?.value || form.origin_branch_code;
                form.destination_branch_code = form.destination_branch_code?.value || form.destination_branch_code;
                form.vehicle_id = this.vehicle_id || form?.vehicle_id?.vehicle_id || form?.vehicle_id;
                form.employee_driver_id = form?.employee_driver_id?.employee_id || "";
                form.flight_schedule = this.formatToWIB(form?.flight_schedule) || "",
                form.eta = this.formatToWIB(form?.eta) || "",
                form.etd = this.formatToWIB(form?.etd) || "",
                
                this.form = form;
                this.createManifestVehicle();
            } else {
                let data = {};
                if (this.navActive === 'k-NEW-AUTO') {
                    data = {
                        origin_vehicle:  form.origin_branch_code,
                        origin_vehicle_name:  this.origin_data?.name,
                        destination_vehicle: form.destination_branch_code,
                        destination_vehicle_name: this.destination_data?.name,
                        vehicle_name: this.vehicle_data?.vehicle_name,
                        vehicle_id: this.vehicle_data.vehicle_id,
                        vehicle_type_id: this.vehicle_data?.vehicle_type_id,
                        pic_employee_id: form.employee_driver_id || "",
                        flight_number: form.flight_number || "",
                        flight_schedule: form.flight_schedule,
                        etd_vehicle: form.etd,
                        eta_vehicle: form.eta
                    };
                } else if (this.navActive === 'k-NEW-MANUAL') {
                    data = {
                        origin_vehicle:  form.origin_branch_code?.value || form?.origin_branch_code?.branch_code?.slice(0, 3),
                        origin_vehicle_name:  form.origin_branch_code?.label || form?.origin_branch_code?.node_name,
                        destination_vehicle: form.destination_branch_code?.value || form?.destination_branch_code?.branch_code?.slice(0, 3),
                        destination_vehicle_name: form.destination_branch_code?.label || form?.destination_branch_code?.node_name,
                        vehicle_name: form.vehicle_id?.vehicle_name,
                        vehicle_id: form.vehicle_id?.vehicle_id,
                        vehicle_type_id: form.vehicle_id?.vehicle_type_id,
                        pic_employee_id: form.employee_driver_id || "",
                        flight_number: form.flight_number || "",
                        flight_schedule: form.flight_schedule,
                        etd_vehicle: form.etd,
                        eta_vehicle: form.eta
                    };
                }
                if (data.etd_vehicle > data.eta_vehicle) {
                    this.openNotification('warning', '', 'Failed', 'ETD tidak boleh lebih besar dari ETA');
                    return
                }

                if (this.listenManifestMethod == 1) {
                    if (data.flight_number === "") {
                        this.openNotification('warning', '', 'Failed', 'Flight Number tidak boleh kosong');
                        return
                    }
                }

                this.$emit('updateVehicleValue', data);
                this.cancel();
            }
        },
        handleSubmit(){
            if (this.navActive === 'k-NEW-AUTO') {
                if (this.hasFlightNumber) {
                    this.$refs.formSuratMuatanVehicleController.handleSubmit(); 
                } else {
                    this.processFlightNumber();
                }
            } else if (this.navActive === 'k-NEW-MANUAL') {
                this.$refs.formSuratMuatanVehicleController.handleSubmit(); 
            } else if (this.navActive === 'k-NEW-SCHEDULE') {
                this.$emit('updateVehicleValueBySchedule', this.vehicle, this.vehicle_form);
                this.cancel();
            }
        },
        async getVehicle(query) {
            this.loadingVehicleId = true;
            try {
                const res = await axios.get(`${this.URL.vehicle}?n=${this.listenNodeId}&search_by=vehicle_police_no&s=${query}`, this.Helper.header());

                const data = res.data.data || [];

                this.vehicle_id = res.data.data[0].vehicle_id
                this.vehicle_data = res.data.data[0] || {};
            } catch (err) {
                // this.openNotification('danger', '', 'Failed', 'Gagal mengambil data kendaraan: ' + (err.message || 'Unknown error'));
            } finally {
                this.loadingVehicleId = false;
            }
        },
        async getManifestVehicle() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.manifest_vehicle}/${this.listenManifestNumber}?n=${this.listenNodeId}`, this.Helper.header());

                let arr = res.data.data;

                // NOTES: BELOW FOR RADIO - CARD
                const revamp_arr = arr.map(item => ({
                    key: item.manifest_vehicle_log_id,
                    state: {
                        origin_vehicle: item?.name_origin_tlc || "",
                        destination_vehicle: item?.name_destination_tlc || "",
                        origin_vehicle_tlc: item?.origin_tlc || "",
                        destination_vehicle_tlc: item?.destination_tlc || "",
                        vehicle_id: item?.vehicle_name || "",
                        pic_employee_id: item?.pic_employee_id || "",
                        flight_number: item?.flight_number || "",
                        flight_schedule: this.formatTimezone(item?.etd) || "",
                        etd_vehicle: this.formatTimezone(item?.etd) || "",
                        eta_vehicle: this.formatTimezone(item?.eta) || "",
                        status_flight: item?.status_flight,
                        is_active: item?.status === 'ACTIVE'
                    }
                }));
                

                this.selected_manifest_vehicle = arr.find(item => item.status === 'ACTIVE')?.manifest_vehicle_log_id || null;

                this.list_manifest_vehicle = revamp_arr;
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async createManifestVehicle() {
            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.manifest_vehicle}/${this.listenManifestNumber}?n=${this.listenNodeId}`, this.form, this.Helper.header());
                this.openNotification('success', null, "Success", "Update manifest vehicle success");
                this.moveTab();
                this.navActive = 'k-MANAGE';
                this.getManifestVehicle();
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async chooseManifestVehicle(log_id) {
            this.loading = true;
            try {
                const res = await axios.patch(`${this.URL.manifest_vehicle}/${log_id}/active?n=${this.listenNodeId}`, null, this.Helper.header());
                this.openNotification('success', null, "Success", "Update manifest vehicle success");

                await this.getManifestVehicle();
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async removeManifestVehicle(log_id) {
            this.loading = true;
            try {
                const res = await axios.delete(`${this.URL.manifest_vehicle}/${log_id}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", "Remove manifest vehicle success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async updateValue(newKey, done) {
            this.loading = true;
            try {
                const res = await axios.patch(`${this.URL.manifest_vehicle}/${newKey}/active?n=${this.listenNodeId}`, null, this.Helper.header());
                this.openNotification('success', null, "Success", "Update manifest vehicle success");
                done(true);
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
                done(false);
            } finally {
                this.loading = false;
            }
        },
        async removeRow(row_id) {
            await this.removeManifestVehicle(row_id);
            await this.getManifestVehicle();
        },
        async processFlightNumber() {
            if (!this.flightNumber || this.flightNumber.trim() === "") {
                return;
            }
            this.hasFlightNumber = true;

            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.search_flight}/${this.flightNumber}`, this.Helper.headerFlight());

                let data = res.data.data;

                this.is_found = true;

                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER", data?.flight);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE", this.formatTimezone(data?.detailJson?.timingInformation?.departure?.runway?.scheduled?.iso));
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_VEHICLE_ID", data?.detailJson?.flightSummary?.airline?.shortName);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ORIGIN_BRANCH_CODE", data?.detailJson?.routeInformation?.departure?.airport?.name);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_DESTINATION_BRANCH_CODE", data?.detailJson?.routeInformation?.arrival?.airport?.name);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ETD", this.formatTimezone(data?.detailJson?.timingInformation?.departure?.runway?.estimated?.iso));
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ETA", this.formatTimezone(data?.detailJson?.timingInformation?.arrival?.runway?.estimated?.iso));

                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_VEHICLE_ID_ValueData", data?.detailJson?.flightSummary?.airline?.iata);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ORIGIN_BRANCH_CODE_ValueData", data?.detailJson?.routeInformation?.departure?.airport?.iata);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_DESTINATION_BRANCH_CODE_ValueData", data?.detailJson?.routeInformation?.arrival?.airport?.iata);

                this.origin_data = data?.detailJson?.routeInformation?.departure?.airport || {};
                this.destination_data = data?.detailJson?.routeInformation?.arrival?.airport || {}

                await this.getVehicle(data?.detailJson?.flightSummary?.airline?.iata);
            } catch (err) {
                this.is_found = false;
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        inputFocus(info) {
            if (info?.key) {
                switch (info.key) {
                    case "origin_branch_code":
                    case "destination_branch_code":
                        // TODO: ADJUST LATER IF NEEDED
                        switch(this.listenManifestMethod){
                            case 1:
                                this.autoComplateUrl = `${this.URL.airports_list}?n=${this.listenNodeId}`;
                                break;
                            case 2:
                                this.autoComplateUrl = `${this.URL.branch_list_v2}?n=${this.listenNodeId}`;
                                break;
                            case 3:
                                this.autoComplateUrl = `${this.URL.branch_list_v2}?n=${this.listenNodeId}`;
                                break;
                            case 4:
                                this.autoComplateUrl = `${this.URL.branch_list_v2}?n=${this.listenNodeId}`;
                                break;
                        }
                        break;
                    case "employee_driver_id":
                        this.autoComplateUrl = `${this.URL.employee}/driver?n=${this.listenNodeId}`;
                        break;
                    case "vehicle_id":
                        this.autoComplateUrl = `${this.URL.vehicle_list_v2}/${this.listenManifestMethod}?n=${this.listenNodeId}&search_by=vehicle_name&sort_order=desc&limit=15&page=1`;
                        break;
                    default:
                        break;
                }
            }
        },
        async querySearch(queryString, cb) {
            try {
                const res = await axios.get(this.autoComplateUrl + `&s=${queryString}`, this.Helper.header());
                const result = res.data.data || [];
                const suggestions = result.map(item => {
                    const value = item.label || item.vehicle_name || item.employee_name || item.node_name || '';
                    return { value, data: item };
                });
                cb(suggestions);
            } catch (error) {
                console.error("error", error);
            }
        },
        handleClearForm() {
            if ((this.navActive === 'k-NEW-AUTO' || this.navActive === 'k-NEW-MANUAL') && this.$refs.formSuratMuatanVehicleController) {
                this.$refs.formSuratMuatanVehicleController.handleClearForm();
            }
        },
        clearInput() {
            this.moveTab();
            
            this.$nextTick(() => {
                this.$refs.formFlightNumber?.$el?.querySelector("input")?.focus();
            });
        },
        cancel() {
            this.moveTab();

            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_EMPLOYEE_DRIVER_ID_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ORIGIN_BRANCH_CODE_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_DESTINATION_BRANCH_CODE_visible", false);

            this.navActive = 'k-MANAGE';
            
            this.closeDialog();
        },
        moveTab() {
            this.selected_manifest_vehicle = "";
            this.hasFlightNumber = false;
            this.is_found = false;
            this.flightNumber = "";
            this.vehicle_id = "";
            this.vehicle_data = {};
            this.origin_data = {};
            this.destination_data = {};
            this.dataTable = [];
            this.vehicle = [];
            this.vehicle_form = [];
            this.selectedData = [];

            this.handleClearForm();
        },
        async getTableData(limit, page, q, from, to, searchBy) {
            this.loadingTableData = true

            let query = q || '';            
            let startDate = from || "";
            let endDate = to || "";
            
            try {
                const res = await axios.get(`${this.URL.schedule}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&filter_date_by=etd&start_date=${startDate}&end_date=${endDate}&search_by=${searchBy}&vehicle_type=${this.listenManifestMethod}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    arr.map(item => {
                        item,
                        item["origin"] = item?.origin_name + "\n" + item?.origin_point;
                        item["destination"] = item?.destination_name + "\n" + item?.destination_point;
                        item["etd"] = this.formatTimezone(item?.etd);
                        item["eta"] = this.formatTimezone(item?.eta);
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
        updateSelected(val, checkedItem) {
            // NOTES: THIS FUNCTION USED FOR CHECKED BY CLICKING CHECKBOX (k-NEW-SCHEDULE)
            if (val.shipment_schedule_id === this.selected_manifest_vehicle) this.selected_manifest_vehicle = '';

            if (this.selected_manifest_vehicle === '') this.selected_manifest_vehicle = checkedItem?.[0]?.shipment_schedule_id;

            this.vehicle = checkedItem.map((item, idx) => ({
                key: item?.shipment_schedule_id,
                state: {
                    shipment_schedule_id: item?.shipment_schedule_id,
                    origin_vehicle: item?.origin_name || "",
                    destination_vehicle: item?.destination_name || "",
                    origin_vehicle_tlc: this.getTLC(item?.origin_name) || item?.origin_identifier || "",
                    destination_vehicle_tlc: this.getTLC(item?.destination_name) || item?.destination_identifier || "",
                    vehicle_id: item?.vehicle_name || "",
                    pic_employee_id: "",
                    flight_number: item?.shipment_number || "",
                    flight_schedule: item?.etd || "",
                    flight_schedule_timezone: "WIB",
                    etd_vehicle: item?.etd || "",
                    etd_vehicle_timezone: "WIB",
                    eta_vehicle: item?.eta || "",
                    eta_vehicle_timezone: "WIB",
                    is_active: item?.shipment_schedule_id === this.selected_manifest_vehicle || false
                }
            }));

            this.vehicle_form = checkedItem.map((item, idx) => ({
                key: item?.shipment_schedule_id,
                state: {
                    shipment_schedule_id: item?.shipment_schedule_id,
                    origin_branch_code: this.getTLC(item?.origin_name) || item?.origin_identifier || "",
                    destination_branch_code: this.getTLC(item?.destination_name) || item?.destination_identifier || "",
                    vehicle_id: item?.vehicle_id || "",
                    flight_number: item?.shipment_number || "",
                    etd: item?.etd || "",
                    etd_timezone:  "WIB",
                    eta: item?.eta || "",
                    eta_timezone: "WIB",
                    is_active: item?.shipment_schedule_id === this.selected_manifest_vehicle || false
                }
            }));

            if (checkedItem.length === 0) this.selected_manifest_vehicle = '';
        },
        onRowClickCallback(event, val, checkedItem) {
            // NOTES: THIS FUNCTION USED FOR CHECKED BY CLICKING ROW (k-NEW-SCHEDULE)
            if (val.shipment_schedule_id === this.selected_manifest_vehicle) this.selected_manifest_vehicle = '';

            if (this.selected_manifest_vehicle === '') this.selected_manifest_vehicle = checkedItem?.[0]?.shipment_schedule_id;

            this.vehicle = checkedItem.map((item, idx) => ({
                key: item?.shipment_schedule_id,
                state: {
                    shipment_schedule_id: item?.shipment_schedule_id,
                    origin_vehicle: item?.origin_name || "",
                    destination_vehicle: item?.destination_name || "",
                    origin_vehicle_tlc: this.getTLC(item?.origin_name) || item?.origin_identifier || "",
                    destination_vehicle_tlc: this.getTLC(item?.destination_name) || item?.destination_identifier || "",
                    vehicle_id: item?.vehicle_name || "",
                    pic_employee_id: "",
                    flight_number: item?.shipment_number || "",
                    flight_schedule: item?.etd || "",
                    flight_schedule_timezone: "WIB",
                    etd_vehicle: item?.etd || "",
                    etd_vehicle_timezone: "WIB",
                    eta_vehicle: item?.eta || "",
                    eta_vehicle_timezone: "WIB",
                    is_active: item?.shipment_schedule_id === this.selected_manifest_vehicle || false
                }
            }));

            this.vehicle_form = checkedItem.map((item, idx) => ({
                key: item?.shipment_schedule_id,
                state: {
                    shipment_schedule_id: item?.shipment_schedule_id,
                    origin_branch_code: this.getTLC(item?.origin_name) || item?.origin_identifier || "",
                    destination_branch_code: this.getTLC(item?.destination_name)  || item?.destination_identifier || "",
                    vehicle_id: item?.vehicle_id || "",
                    flight_number: item?.shipment_number || "",
                    etd: item?.etd || "",
                    etd_timezone: "WIB",
                    eta: item?.eta || "",
                    eta_timezone: "WIB",
                    is_active: item?.shipment_schedule_id === this.selected_manifest_vehicle || false
                }
            }));

            if (checkedItem.length === 0) this.selected_manifest_vehicle = '';
        },
    },
    mounted() {
        this.handlePrintShortcut(this.print)
    }
};
</script>
<style scoped>
.notes {
    font-size: 11px;
    text-align: start;
}
</style>