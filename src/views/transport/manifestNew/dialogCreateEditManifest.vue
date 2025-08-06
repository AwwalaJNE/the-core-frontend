<template>
    <div>
        <dialog-master
            width="lg"
            :actived="listenActive"
            :loading="listenLoading"
            :closeDialog="cancel"
            class="manifest-dialog"
        >
            <template v-slot:header>
                <div class="button-helper">
                    <div class="title-helper">
                        {{ listenTitle }}
                    </div>
                    
                    <div class="button-group" v-if="!listenIsReadOnly">
                        <template v-if="is_approve === 1">
                            <vs-button 
                                :disabled="isDisabledPrint"
                                @click="print"
                            >
                                Print
                            </vs-button>
                        </template>
                        <template v-if="listenUserRoleName === 'HELPDESK'">
                            <vs-button  
                                :danger="is_approve === 1"
                                :disabled="isDisabledApprove"
                                @click="approve" 
                            >
                                {{ is_approve === 1 ? 'Unapprove' : 'Approve' }}
                            </vs-button>
                        </template>
                        <template v-else>
                            <vs-button
                                :disabled="is_approve === 1 || isDisabledApprove"
                                @click="approve" 
                            >
                                {{ is_approve === 1 ? 'Approved' : 'Approve' }}
                            </vs-button>
                        </template>
                    </div>
                </div>
            </template>

            <template v-slot:content>
                <camera-scanner 
                    ref="cameraScanner" 
                    @data="onCameraScannerGetData" 
                />

                <div>
                    <!-- Form Section -->
                    <form-input-controller
                        v-if="!listenIsReadOnly || !loadingSuratMuatan"
                        ref="formSuratMuatanController"
                        typeForm="surat_muatan"
                        :dataItem="listenIsReadOnly ? listenGetByApi : editData"
                        :isDisabled="isDisabled"
                        :itterateUrlAutoComplete="listenItterateUrlAutoComplete"
                        :itterateFlagAutoComplete="listenItterateFlagAutoComplete"
                        :querySearch="querySearch"
                        @formData="formData"
                        @inputFocus="inputFocus"
                        @onChangeCustom="onChangeCustom"
                        @handleIconClick="openSelectStockModal"
                    />

                    <div v-if="vehicle.length > 0">
                        <vs-row justify="space-between" style="margin: 0!important;">
                            <vs-col w="6" >
                                <h3 v-if="is_sm_created" class="title">List Vehicle</h3>
                                <h3 v-if="is_sm_edit" class="title">Current Vehicle</h3>
                            </vs-col>
                            <vs-col w="6" >
                                <vs-row justify="flex-end" v-if="!is_sm_edit">
                                    <vs-button
                                        shadow
                                        :active="false"
                                        :disabled="isDisabled"
                                        @click="openDialogCreateVehicleManifest"
                                        style="min-width: 120px;"
                                    >
                                        <i class='bx bx-plus'></i> More Vehicle
                                    </vs-button>
                                </vs-row>
                                <vs-row justify="flex-end" v-else>
                                    <vs-button
                                        shadow
                                        :active="false"
                                        :disabled="isDisabled"
                                        @click="openDialogManageVehicleManifest"
                                    >
                                        <i class='bx bx-cog'></i> Manage
                                    </vs-button>
                                </vs-row>
                            </vs-col>
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
                    </div>

                    <vs-button
                        v-if="vehicle.length === 0"
                        shadow
                        :active="false"
                        :disabled="isDisabled"
                        @click="openDialogCreateVehicleManifest"
                    >
                        <i class='bx bx-plus'></i> Vehicle
                    </vs-button>

                    <div v-if="!isDisabled && !manifest_number" style="justify-content: flex-end; display: flex;">
                        <div class="container-clear-item" @click="handleClearForm(); resetForm()">
                            Reset Inputs
                        </div>
                    </div>

                    <!-- Input Bag Section -->
                    <div class="mt-2 mb-2">
                        <vs-row align="center" v-if="!listenIsReadOnly">
                            <vs-col xs="6" sm="3" lg="3">
                                <vs-input
                                    border
                                    icon-after
                                    label-placeholder="Masukkan nomor bag"
                                    ref="formInputItemManifest"
                                    type="text"
                                    v-model="item_number"
                                    v-on:keyup.enter="updateValue"
                                    v-uppercase
                                    :autofocus="true"
                                    :disabled="isDisabled"
                                    @click-icon="handleIconClick"
                                    @input="sanitizeAlphanumeric('item_number')"
                                >
                                    <template #icon>
                                        <i class="bx bx-barcode-reader"></i>
                                    </template>
                                </vs-input>
                            </vs-col>
                        </vs-row>

                        <!-- Table Section -->
                        <div v-if="!loadingDetail && !loading">
                            <table-master 
                                hideColumnKey="dialog-surat-muatan"
                                :dataTable="dataTable"
                                :dataColumn="datacolumn"
                                :tableLoading="loadingDetail"
                                :pageSize="pagination.page_size"
                                :page="pagination.page"
                                :limit="pagination.limit"
                                :hasAction="false"
                                :hasPagination="true"
                                :customAction="!listenIsReadOnly"
                                :customActionList="!listenIsReadOnly ? customActionList : null"
                                @actionUpdate="actionUpdate"
                                @actionLimit="actionLimit"
                                @actionPagination="actionPagination"
                            />
                        </div>
                    </div>
                </div>
            </template>
        </dialog-master>

        <dialog-trace-bag
            title="Trace Bag Activity"
            :active="dialogTraceBag"
            :closeDialog="() => dialogTraceBag = false"
            :bag_number="selectedBagNumber"
        />

        <dialog-select-manifest-stock
            title="Pilih Stock"
            :active="showSelectStockModal"
            :close="() => showSelectStockModal = false"
            @selectManifest="handleSelectManifest"
        />

        <dialog-manage-vehicle-manifest
            title="Manifest Vehicle"
            :manifest_number="manifest_number"
            :manifest_method="manifest_method_id"
            :active="dialogManageVehicleManifest"
            :closeDialog="closeDialogManageVehicleManifest"
        />

        <dialog-create-vehicle-manifest
            title="Manifest Vehicle"
            :manifest_method="manifest_method_id"
            :active="dialogCreateVehicleManifest"
            :closeDialog="closeDialogCreateVehicleManifest"
            @updateVehicleValue="updateVehicleValue"
        />
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import master from "@/mixins/master";

import CameraScanner from "@/components/scanner/camera";
import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import TableMaster from "@/components/table/tableMaster.vue";
import DialogTraceBag from "@/views/transport/manifestNew/dialogTraceBag";
import dialogSelectManifestStock from "./dialogSelectManifestStock.vue";

import DialogManageVehicleManifest from "@/views/transport/manifestVehicle/dialogCreateManage";
import DialogCreateVehicleManifest from "@/views/transport/manifestNew/dialogCreateVehicleManifest";
import VehicleCard from "@/views/transport/manifestNew/vehicleCard";

export default {
    name: "transport-surat-muatan-dialog-new",
    mixins: [master],
    components: {
        CameraScanner,
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "table-master": TableMaster,
        "dialog-trace-bag": DialogTraceBag,
        "dialog-select-manifest-stock": dialogSelectManifestStock,
        "dialog-manage-vehicle-manifest": DialogManageVehicleManifest,
        "dialog-create-vehicle-manifest": DialogCreateVehicleManifest,
        "vehicle-card": VehicleCard
    },
    props: {
        active: Boolean,
        btnRed: String,
        btnBlue: String,
        closeDialog: Function,
        dataItem: Object,
        refresh: Function,
        isReadOnly: Boolean,
        title: String,
        sm_number: String, 
    },
    data() {
        return {
            editData: {},
            form: {},
            manifest_number: "",
            manifest_method_id: 0,
            item_number: "",
            dataTable: [],
            datacolumn: [
                {
                    label: "Item No",
                    key: "item_number",
                    width: "sm",
                },
                {
                    label: "Trip Status",
                    key: "status_trip",
                    width: "sm",
                },
                {
                    label: "Received By",
                    key: "received_by",
                    width: "xxs",
                },
                {
                    label: "Type",
                    key: "item_type",
                    width: "xs",
                },
                {
                    label: "Cost Weight (Kg)",
                    key: "cost_weight",
                    width: "xs",
                    textAlign: "center",
                },
                {
                    label: "Actual Weight (Kg)",
                    key: "actual_weight",
                    width: "xs",
                    textAlign: "center",
                },
                {
                    label: "Destination",
                    key: "destination_name",
                    width: "xs",
                },
                {
                    label: "Total Bag",
                    key: "total_inner",
                    width: "xs",
                    textAlign: "center",
                },
                {
                    label: "Total Connote",
                    key: "total_connote_of_bag",
                    width: "xs",
                    textAlign: "center",
                },  
                {
                    label: "Status Irregularity",
                    key: "status_irregularity",
                    width: "xs",
                },
                {
                    label: "Received",
                    key: "received_status",
                    type: "status",
                    width: "xs",
                },
            ],
            customActionList: [
                {
                    label: 'Remove',
                    key: 'remove',
                    attribute: 'danger',
                },
                {
                    label: 'Trace Bag',
                    key: 'trace_bag',
                    attribute: 'primary',
                }
            ],
            loading: false,
            loadingDetail: false,
            loadingConfirmApprove: false,
            pagination: {
                limit: 10,
                page_size: 1,
                page: 1,
            },
            vehicle_mode_id: "",
            vehicle_type_id: "",
            node_id_origin: "",
            autoComplateUrl: "",
            itterateUrlAutoComplete: "",
            itterateFlagAutoComplete: "node_name",
            etd: null,
            estimated_time_in_hour: null,
            isDisabled: false,
            isDisabledPrint: false,
            isDisabledApprove: false,
            is_approve: 0,
            item_remove: "",
            master_form: {},
            dataByApi: {},
            loadingSuratMuatan: false,
            dialogTraceBag: false,
            showSelectStockModal: false,
            selectedBagNumber: "",
            dialogCreateVehicleManifest: false,
            dialogManageVehicleManifest: false,
            is_sm_created: false,
            is_sm_edit: false,
            vehicle_form: [],
            vehicle: []
        };
    },
    computed: {
        listenActive() {
            return this.active;
        },
        listenTitle() {
            return this.title;
        },
        listenDataItem() {
            return this.dataItem || {};
        },
        listenGetByApi() {
            return this.dataByApi || {};
        },
        listenItterateUrlAutoComplete() {
            return this.itterateUrlAutoComplete;
        },
        listenItterateFlagAutoComplete() {
            return this.itterateFlagAutoComplete;
        },
        listenLoading() {
            return this.loading || this.loadingSuratMuatan || this.loadingDetail || this.loadingConfirmApprove;
        },
        listenIsReadOnly() {
            return this.isReadOnly;
        },
        listenSMNumber() {
            return this.sm_number;
        }
    },
    watch: {
        dataItem: function(val) {
            if (val !== undefined) {
                this.getEditData(val);

                this.isDisabled = (val.status !== 'UNAPPROVED' && val.status !== 'UNRECEIVED') || val.is_approve === 1;
                this.isDisabledPrint = val.status === 'CANCELED';
                this.isDisabledApprove = (val.status !== 'UNAPPROVED' && val.status !== 'UNRECEIVED') ;
            }
        },
        dataByApi: function(val) {
            if (val !== undefined) {
                if (this.listenIsReadOnly) {
                    this.isDisabled = true
                }
            }
        },
        active: async function(val) {
            if (val == true) {
                if (this.listenIsReadOnly) {
                    await this.getEditDataByApi();
                }
                
                this.getDataVehicleMode();
                this.originNode()
            }
        }
    },
    methods: {
        handleSelectManifest(val) {
            this.vehicle_type_id = val.vehicle_type_id;
            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_PREFIX", val.vehicle_prefix_name + "-");
            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_NUMBER", val.manifest_number);
            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_METHOD_ID", parseInt(val.vehicle_mode_id));
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN", val?.node_name_origin + " (" + val?.node_code_origin + ")");
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION", val?.node_name_destination + " (" + val?.node_code_destination + ")");
            this.$store.dispatch("SET_SURAT_MUATAN_ETD", val.etd);
            this.$store.dispatch("SET_SURAT_MUATAN_ETA", val.eta);

            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_PREFIX_ValueData", val.vehicle_prefix_name + "-");
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN_ValueData", val.node_id_origin);
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION_ValueData", val.node_id_destination);

            // Notes: Disabled field for SM Stock
            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_NUMBER_isDisabled", true);
            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_METHOD_ID_isDisabled", true);
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN_isDisabled", true);
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION_isDisabled", true);
            this.$store.dispatch("SET_SURAT_MUATAN_ETD_isDisabled", true);
            this.$store.dispatch("SET_SURAT_MUATAN_ETA_isDisabled", true);
        },
        openSelectStockModal() {
            if (!this.isDisabled) {
                this.showSelectStockModal = true;
            }
        },
        closeSelectStockModal() {
            this.showSelectStockModal = false;
        },
        getEditData(val) {
            this.is_sm_edit = true;

            this.manifest_method_id = parseInt(val.manifest_method_id);

            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_METHOD_ID_isDisabled", true);
            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_NUMBER_isDisabled", true);

            this.manifest_number = val.manifest_number;            
            this.is_approve = val.is_approve;

            this.vehicle_type_id = val.vehicle_type_id;

            if (val?.detail) {
                let arr = [];

                val.detail.forEach(data => {
                    data.received_status = data.received_at ? 1 : 0;
                    
                    if (data.item_number) {
                        data.bag_number = data.item_number;
                        data.type = data.item_type;
                        data.bag_weight = data.total_weight;
                        data.cost_weight = data.cost_weight || '0';
                        data.actual_weight = data.bag?.bag_actual_weight || '0';
                        data.total_inner = data.bag_detail_count || '';
                        data.total_connote_of_bag = data.total_connote_of_bag || '';
                        data.destination_name = (data.bag?.destination?.node_code || '') + ' - ' + (data.bag?.destination?.node_name || '');
                        data.status_trip = (data?.bag?.status_trip || '') + ' ' + (data?.bag?.current_node.node_name || '') + " (" + (data?.bag?.current_node?.node_code) + ")";
                        data.received_by = data?.bag?.received_by_user || '';
                        if (data.is_masterbag === '1') {
                            data.item_type = 'MASTERBAG'
                        } else {
                            data.item_type = 'BAG'
                        }
                        
                        if ((val.status !== "UNAPPROVED" && val.status !== "UNRECEIVED") || val.is_approve === 1) {
                            data.button_status = { remove: false };
                        }

                        if (data.status_irregularity !== null && data.status_irregularity !== undefined) {
                            data.status_irregularity += " (" + data.status_description + ") ";
                        }

                        arr.push(data);
                    }
                });

                this.dataTable = arr;
            }

            this.master_form = {
                manifest_number: val.manifest_number,
                max_weight: val.max_weight,
                manifest_method_id: val.manifest_method_id,
                flight_number: val.flight_number,
                flight_schedule: val.flight_schedule,
                node_id_origin: this.listenNodeId,
                node_id_destination: val.destination.node_id,
                vehicle_mode_id: val.vehicle_mode_id,
                vehicle_type_id: val.vehicle_type_id,
                vehicle_id: val.vehicle_id,
                pic_employee_id: val.pic_employee_id,
                etd: val.etd,
                eta: val.eta,
                auto_depart: val.auto_depart
            };

            const active_vehicle = val?.vehicle_log?.find(item => item.status === 'ACTIVE');
            this.vehicle =  [{
                origin_vehicle: active_vehicle?.name_origin_tlc || "",
                destination_vehicle: active_vehicle?.name_destination_tlc || "",
                origin_vehicle_tlc: active_vehicle?.origin_tlc || "",
                destination_vehicle_tlc: active_vehicle?.destination_tlc || "",
                vehicle_id: active_vehicle?.vehicle_name || "",
                pic_employee_id: active_vehicle?.pic_employee_id || "",
                flight_number: active_vehicle?.flight_number || "",
                flight_schedule: active_vehicle?.etd || "",
                etd_vehicle: active_vehicle?.etd || "",
                eta_vehicle: active_vehicle?.eta || "",
                status_flight: active_vehicle?.status_flight,
                is_active: active_vehicle?.status === 'ACTIVE'
            }];


            val.manifest_prefix = val?.manifest_method?.prefix_name;

            // TODO: COMMENT IF WANNA USE NODE
            // val.node_id_origin = val?.origin?.node_name + " (" + val?.origin?.node_code + ")";
            // val.node_id_destination = val?.destination?.node_name + " (" + val?.destination?.node_code + ")";

            // TODO: COMMENT IF DON'T WANNA USE BRANCH
            val.node_id_origin = val?.origin_branch_name + " (" + val?.origin_branch_code + ")";
            val.node_id_destination = val?.destination_branch_name + " (" + val?.destination_branch_code + ")";

            val.vehicle_id = val?.vehicle?.vehicle_name;
            val.pic_employee_id = val?.employee_pic?.employee_name;
            
            this.editData = val;
        },
        async getEditDataByApi() {
            this.loadingSuratMuatan = true;
            try {
                const res = await axios.get(`${this.URL.surat_muatan}/${this.listenSMNumber}?n=${this.listenNodeId}`, this.Helper.header());

                let data = res.data.data
                if (data) {
                    this.getDataPreview(data);
                }

            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.is_sm_edit = true;
                this.loadingSuratMuatan = false;
            }
        },
        getDataPreview(val) {

            this.manifest_method_id = parseInt(val.manifest_method_id);
            val.manifest_method_id = parseInt(val.manifest_method_id);
            val.manifest_prefix = val?.manifest_method?.prefix_name;
            
            // TODO: UNCOMMENT IF WANNA USE NODE
            // val.node_id_origin = val?.origin?.node_name + " (" + val?.origin?.node_code + ")";
            // val.node_id_destination = val?.destination?.node_name + " (" + val?.destination?.node_code + ")";
            
            // TODO: COMMENT IF DON'T WANNA USE BRANCH
            val.node_id_origin = val?.origin_branch_name + " (" + val?.origin_branch_code + ")";
            val.node_id_destination = val?.destination_branch_name + " (" + val?.destination_branch_code + ")";

            val.vehicle_id = val?.vehicle?.vehicle_name;
            val.pic_employee_id = val?.employee_pic?.employee_name;
            val.flight_number = val?.flight_number;
            val.flight_schedule = val?.flight_schedule;

            const active_vehicle = val?.vehicle_log?.find(item => item.status === 'ACTIVE');
            this.vehicle =  [{
                origin_vehicle: active_vehicle?.name_origin_tlc || "",
                destination_vehicle: active_vehicle?.name_destination_tlc || "",
                origin_vehicle_tlc: active_vehicle?.origin_tlc || "",
                destination_vehicle_tlc: active_vehicle?.destination_tlc || "",
                vehicle_id: active_vehicle?.vehicle_name || "",
                pic_employee_id: active_vehicle?.pic_employee_id || "",
                flight_number: active_vehicle?.flight_number || "",
                flight_schedule: active_vehicle?.etd || "",
                etd_vehicle: active_vehicle?.etd || "",
                eta_vehicle: active_vehicle?.eta || "",
                status_flight: active_vehicle?.status_flight,
                is_active: active_vehicle?.status === 'ACTIVE'
            }];

            this.dataByApi = val;
            
            if (val?.detail) {
                let arr = [];

                val.detail.forEach(data => {
                    data.received_status = data.received_at ? 1 : 0;
                    
                    if (data.item_number) {
                        data.bag_number = data.item_number;
                        data.type = data.item_type;
                        data.bag_weight = data.total_weight;
                        data.cost_weight = data.cost_weight || '0';
                        data.actual_weight = data.bag?.bag_actual_weight || '0';
                        data.total_inner = data.bag_detail_count || '0';
                        data.destination_name = (data.bag?.destination?.node_code || '') + ' - ' + (data.bag?.destination?.node_name || '');
                        data.status_trip = (data?.bag?.status_trip || '') + ' ' + (data?.bag?.current_node.node_name || '') + " (" + (data?.bag?.current_node?.node_code) + ")";
                        data.received_by = data?.bag?.received_by_user || '';
                        if (data.is_masterbag === '1') {
                            data.item_type = 'MASTERBAG'
                        } else {
                            data.item_type = 'BAG'
                        }
                        
                        if ((val.status !== "UNAPPROVED" && val.status !== "UNRECEIVED") || val.is_approve === 1) {
                            data.button_status = { remove: false };
                        }

                        if (data.status_irregularity !== null && data.status_irregularity !== undefined) {
                            data.status_irregularity += " (" + data.status_description + ") ";
                        }

                        arr.push(data);
                    }
                });

                this.dataTable = arr;
            }
        },
        actionUpdate(val, key) {
            switch (key) {
                case "remove":
                    this.item_remove = val.item_number;
                    this.removeSuratMuatanDetail();
                    break;
                case "trace_bag":
                    this.selectedBagNumber = val.item_number;
                    this.dialogTraceBag = true;
                    break;
                default:
            }
        },
        inputFocus(info) {
            if (info?.key) {
                let url = "";
                switch (info.key) {
                    case "node_id_origin":
                        // TODO: UNCOMMENT IF WANNA USE NODE
                        // this.autoComplateUrl = `${this.URL.node}/${this.listenNodeId}/origin-link?n=${this.listenNodeId}&vehicle_mode_id=${this.vehicle_mode_id}`;

                        // TODO: COMMENT IF DON'T WANNA USE BRANCH
                        this.autoComplateUrl = `${this.URL.branch_list_v2}?n=${this.listenNodeId}`;
                        break;
                    case "node_id_destination":
                        // TODO: UNCOMMENT IF WANNA USE NODE
                        // this.autoComplateUrl = `${this.URL.node}/${nodeId}/destination-link?n=${this.listenNodeId}&vehicle_mode_id=${this.vehicle_mode_id}&sort_order=desc&limit=15&page=1`;

                        // TODO: COMMENT IF DON'T WANNA USE BRANCH
                        this.autoComplateUrl = `${this.URL.branch_list_v2}?n=${this.listenNodeId}`;
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
                    const value = item.node_name || item.branch_name || item.vehicle_name || item.employee_name || '';
                    return { value, data: item };
                });
                cb(suggestions);
            } catch (error) {
                console.error("error", error);
            }
        },
        formData(form) {
            form.node_id_origin = form.node_id_origin?.node_id || form.node_id_origin || this.listenCurrentNode.node_id;
            form.node_id_destination = form.node_id_destination?.node_id || form.node_id_destination;

            form.vehicles = this.vehicle_form;
            form.vehicle_id = this.vehicle_form[0]?.vehicle_id;
            form.vehicle_type_id = this.vehicle_form[0]?.vehicle_type_id;
            form.vehicle_mode_id = this.vehicle_form[0]?.vehicle_mode_id;

            if (form.manifest_prefix && form.manifest_number) {
                form.manifest_number = `${form.manifest_prefix}${form.manifest_number}`;
            }
            
            this.form = form;
            if (this.form.eta > this.form.etd) {
                if (this.manifest_number !== undefined && this.manifest_number !== "") {
                    this.form.manifest_number = this.manifest_number;
                    this.form.etd = moment(this.form.etd).format("YYYY-MM-DD HH:mm:ss");
                    this.form.eta = moment(this.form.eta).format("YYYY-MM-DD HH:mm:ss");
                    this.addSuratMuatanDetail();
                } else {
                    this.form.pickup_node_id_requestor = this.listenNodeId;
                    this.form.manifest_item = {
                        bag_number: this.item_number
                    };
                    this.createSuratMuatan();
                }
            } else {
                this.openNotification("warning", "Wrong Input in ETA/ETD field", "ETA must more than ETD");
            }
        },
        handleClearForm() {
            this.$refs.formSuratMuatanController.handleClearForm();
            this.vehicle_type_id = "";
            this.node_id_origin = "";
            this.editData = {};
            this.form = {};
            this.item_number = "";
            this.manifest_number = "";
            this.dataTable = [];

            this.vehicle_form = [];
            this.vehicle = [];
        },
        async getDataVehicleMode() {
            this.loading = true;
            try {
                const { data } = await axios.get(`${this.URL.vehicle_mode_list_v2}?n=${this.listenNodeId}`, this.Helper.header() );

                const options = data.data.map(item => ({
                    value: item.vehicle_mode_id,
                    label: item.vehicle_mode_name,
                    data: item
                }));

                this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_METHOD_ID_ArrData", options);
            } catch (err) {
                console.error('Failed to load vehicle modes:', err);
            } finally {
                this.loading = false;
            }
        },
        async createSuratMuatan() {
            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.revamp_surat_muatan}?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header());
                const data = res.data.data;
                if (data) {
                    this.is_sm_created = true;
                    this.manifest_number = data.manifest_number;
                    this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_NUMBER_isDisabled", true);
                    this.master_form = {
                        manifest_number: data.manifest_number,
                        max_weight: data.max_weight,
                        manifest_method_id: data.manifest_method_id,
                        flight_number: data.flight_number,
                        flight_schedule: data.flight_schedule,
                        node_id_origin: data.node_id_origin,
                        node_id_destination: data.node_id_destination,
                        vehicle_mode_id: data.vehicle_mode_id,
                        vehicle_type_id: data.vehicle_type_id,
                        vehicle_id: data.vehicle_id,
                        pic_employee_id: data.pic_employee_id,
                        etd: data.etd,
                        eta: data.eta,
                        auto_depart: data.auto_depart,     
                        status: data.status
                    };
                    await this.getSuratMuatanDetail();
                }

                this.openNotification('success', null, "Success", "Create surat jalan success");

            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.item_number = "";
                this.loading = false;
            }
        },
        async addSuratMuatanDetail() {
            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.revamp_surat_muatan}/${this.manifest_number}/detail?n=${this.listenNodeId}`, {item_number: this.item_number}, this.Helper.header());

                if (res.data.data) {
                    this.manifest_number = res.data.data.manifest_number;
                    await this.getSuratMuatanDetail();
                }
                
                this.openNotification("success", null, "Success", "Add detail surat muatan success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.item_number = "";
                this.loading = false;
            }
        },
        async getSuratMuatanDetail() {
            this.loadingDetail = true;
            try {
                const res = await axios.get(`${this.URL.revamp_surat_muatan}/${this.manifest_number}/detail?n=${this.listenNodeId}`, this.Helper.header());

                if (res.data.data) {
                    let arr = res.data.data;

                    arr = arr.map(item => ({
                        ...item,
                        received_status: item.received_at ? 1 : 0,
                        destination_name: item.item_destination
                    }));

                    this.dataTable = arr;
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loadingDetail = false;
            }
        },
        async updateSuratMuatan() {
            this.loading = true;
            try {
                const res = await axios.put(`${this.URL.revamp_surat_muatan}/${this.manifest_number}?n=${this.listenNodeId}`, JSON.stringify(this.master_form), this.Helper.header());
                this.openNotification('success', null, "Success", "Update surat muatan success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async removeSuratMuatanDetail() {
            this.loading = true;
            try {
                const res = await axios.delete(`${this.URL.revamp_surat_muatan}/${this.manifest_number}/detail/${this.item_remove}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", "Remove surat muatan success");
                await this.getSuratMuatanDetail();
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async getManifestVehicle() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.manifest_vehicle}/${this.manifest_number}?n=${this.listenNodeId}`, this.Helper.header());

                let arr = res.data.data;

                const active_vehicle = arr?.find(item => item.status === 'ACTIVE');
                this.vehicle =  [{
                    origin_vehicle: active_vehicle?.name_origin_tlc || "",
                    destination_vehicle: active_vehicle?.name_destination_tlc || "",
                    origin_vehicle_tlc: active_vehicle?.origin_tlc || "",
                    destination_vehicle_tlc: active_vehicle?.destination_tlc || "",
                    vehicle_id: active_vehicle?.vehicle_name || "",
                    pic_employee_id: active_vehicle?.pic_employee_id || "",
                    flight_number: active_vehicle?.flight_number || "",
                    flight_schedule: active_vehicle?.etd || "",
                    etd_vehicle: active_vehicle?.etd || "",
                    eta_vehicle: active_vehicle?.eta || "",
                    status_flight: active_vehicle?.status_flight,
                    is_active: active_vehicle?.status === 'ACTIVE'
                }];
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async approve() {
            this.loadingDetail = true;
            try {
                const res = await axios.patch(`${this.URL.revamp_surat_muatan}/${this.manifest_number}/approval?n=${this.listenNodeId}`, { is_approve: this.is_approve ^ 1 }, this.Helper.header());
                
                this.is_approve ^= 1;
                this.openNotification("success", null, "Success", res?.data?.message);
                if (this.is_approve === 1) {
                    this.print();
                    this.isDisabled = true;
                    this.isDisabledApprove = true;
                    
                    this.dataTable.forEach(data => {
                        data.button_status = { remove: false };
                    });
                } else {
                    this.isDisabled = false;
                    this.isDisabledApprove = false;
                    
                    this.dataTable.forEach(data => {
                        data.button_status = { remove: true };
                    });
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? "", "Failed", err?.response?.data?.message ?? "Something went wrong"); 
            } finally {
                this.loadingDetail = false;
            }
        },
        print(){
            let routeData = this.$router.resolve({ 
                name: 'printGeneral', 
                params: { 
                    'id': this.manifest_number, 
                    'type': 'manifest',
                    'node_id': this.listenNodeId
                } 
            });

            const printWindow = window.open(routeData.href, '_blank', 'noopener');
      
            if (printWindow) {
                printWindow.onload = function() {
                    printWindow.print();
                    printWindow.onafterprint = () => printWindow.close();
                };
            }

        },
        cancel() {
            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_NUMBER_isDisabled", false);
            this.isDisabledApprove = false;
            this.isDisabled = false
            this.is_approve = 0
            this.resetForm();
            this.handleClearForm();
            this.closeDialog();
            this.dataTable = [];

            this.is_sm_created = false;
            this.is_sm_edit = false;
        },
        updateValue() {
            this.$refs.formSuratMuatanController.handleSubmit();
        },
        onChangeCustom(type, val, info = {}) {
            const updateMasterForm = (key, value) => {
                if (this.manifest_number && this.master_form?.[key] !== value) {
                    this.master_form = { ...this.master_form, [key]: value };
                    this.updateSuratMuatan();
                }
            };

            if (this.manifest_method_id !== 0 && type == "manifest_method_id") {
                this.manifest_method_id !== val && this.resetForm();
            }

            switch (type) {
                case "manifest_number":
                    updateMasterForm("manifest_number", val);
                    break;
                case "max_weight":
                    updateMasterForm("max_weight", val);
                    break;
                case "manifest_method_id":
                    this.manifest_method_id = Number(val);

                    if (info?.data) {
                        this.vehicle_mode_id = info.data.vehicle_mode_id || "";
                        
                        if (info.data.vehicle_prefix) {
                            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_PREFIX", info.data.vehicle_prefix);
                            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_PREFIX_value", info.data.vehicle_prefix);
                        }
                        
                        this.autoComplateUrl = `${this.URL.node}/${this.listenNodeId}/origin-link?n=${this.listenNodeId}&vehicle_mode_id=${this.vehicle_mode_id}&sort_order=desc&limit=15&page=1`;
                    }

                    this.vehicle = [];
                    this.vehicle_form = [];
                    updateMasterForm("manifest_method_id", val);
                    updateMasterForm("vehicle_mode_id", val);
                    break;
                    break;
                case "node_id_origin":
                    if (info?.data) {
                        this.node_id_origin = info.data.node_id;
                        this.itterateUrlAutoComplete = `${this.URL.node}/${this.node_id_origin}/destination-link?n=${this.listenNodeId}&vehicle_mode_id=${this.vehicle_mode_id}&sort_order=desc&limit=15&page=1`;
                    }
                    updateMasterForm("node_id_origin", val);
                    break;
                case "node_id_destination":
                    if (info?.data) {
                        this.estimated_time_in_hour = info.data.estimated_time_in_hour;
                        this.handleEta(this.etd, this.estimated_time_in_hour);
                        updateMasterForm("node_id_destination", info?.data?.node_id);
                    }
                    break;
                case "etd":
                    this.etd = val;
                    this.handleEta(this.etd, this.estimated_time_in_hour);

                    if (val) {
                        updateMasterForm("etd", val);
                    }
                    break;
                case "eta":
                    if (val) {
                        updateMasterForm("eta", val);
                    }
                    break;
                case "auto_depart":
                    if (this.dataTable.length === 0 && val && this.manifest_number) {
                        this.openNotification("warning", "Data Item is Empty", "Please Scan at least one more item");
                    } else {
                        updateMasterForm("auto_depart", val);
                    }
                    
                    break;
                default:
            }
        },
        originNode(){
            if (this.listenNode.length > 0) {
                this.node_id_origin = this.listenCurrentNode.node_id;
                // TODO: UNCOMMENT IF WANNA USE NODE
                // this.$store.dispatch('SET_SURAT_MUATAN_NODE_ID_ORIGIN', this.listenCurrentNode.node_name + " (" + this.listenCurrentNode.node_code + ")");

                // TODO: COMMENT DON'T IF WANNA USE NODE
                this.$store.dispatch('SET_SURAT_MUATAN_NODE_ID_ORIGIN', this.listenCurrentNode.branch_name);
            }
        },
        resetForm() {
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION", "");
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION_ValueData", {});
            this.$store.dispatch("SET_SURAT_MUATAN_ETD", "");
            this.$store.dispatch("SET_SURAT_MUATAN_ETA", "");

            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_NUMBER_isDisabled", false);
            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_METHOD_ID_isDisabled", false);
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN_isDisabled", false);
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION_isDisabled", false);
            this.$store.dispatch("SET_SURAT_MUATAN_ETD_isDisabled", false);
            this.$store.dispatch("SET_SURAT_MUATAN_ETA_isDisabled", false);
        },
        handleEta(dateTime, amount) {
            if (dateTime && amount) {
                let dateEta = moment(dateTime).add(amount, "hours").format("YYYY-MM-DD HH:mm:ss");
                this.$store.dispatch("SET_SURAT_MUATAN_ETA", dateEta);
            }
        },
        handleIconClick() {
            if (!this.isDisabled) {
                this.$refs.cameraScanner.open('formInputItemManifest');
            }
        },
        onCameraScannerGetData(data) {
            if (!this.isDisabled && data?.event === "result" && data.namespace === "formInputItemManifest") {
                this.item_number = data.data.text;
                this.updateValue();
            }
        },
        actionLimit(val){
            this.pagination.limit = val;
            this.pagination.page = 1;
            this.refreshDetail();
        },
        actionPagination(val) {
            this.pagination.page = val;
            this.refreshDetail();
        },
        refreshDetail() {
            this.getSuratMuatanDetail();
        },
        openTraceBagDialog() {
            this.dialogTraceBag = true;
        },
        openDialogCreateVehicleManifest() {
            if (this.manifest_method_id === 0) {
                this.openNotification("warn", null, "Failed", 'Please choose manifest mode first');
            } else {
                this.dialogCreateVehicleManifest = true;
            }
        },
        closeDialogCreateVehicleManifest() {
            this.dialogCreateVehicleManifest = false;
        },
        updateVehicleValue(form) {
            let created_vehicle = {
                origin_vehicle: form.origin_vehicle?.label,
                destination_vehicle: form.destination_vehicle?.label,
                vehicle_id: form.vehicle_id?.vehicle_name,
                pic_employee_id: form.pic_employee_id?.employee_name,
                flight_number: form.flight_number,
                flight_schedule: form.flight_schedule,
                etd_vehicle: form.etd_vehicle,
                eta_vehicle: form.eta_vehicle,
                is_active: this.vehicle.length === 0
            };

            let vehicle_form = {
                vehicle_id: form?.vehicle_id?.vehicle_id || "",
                vehicle_type_id: form?.vehicle_id?.vehicle_type_id || "",
                employee_driver_id: form?.pic_employee_id?.employee_id || "",
                flight_number: form?.flight_number || "",
                flight_schedule: form?.flight_schedule || "",
                etd: form?.etd_vehicle || "",
                eta: form?.eta_vehicle || "",
                origin_branch_code: form?.origin_vehicle?.value || "",
                destination_branch_code: form?.destination_vehicle?.value || "",
                is_active: this.vehicle.length === 0
            };

            this.vehicle.push(created_vehicle);
            this.vehicle_form.push(vehicle_form)
        },
        openDialogManageVehicleManifest() {
            this.dialogManageVehicleManifest = true;
        },
        closeDialogManageVehicleManifest() {
            this.dialogManageVehicleManifest = false;
            this.getManifestVehicle();
        },
    },
    mounted() {
        this.handlePrintShortcut(this.print)
    }
};
</script>
<style scoped>
.button-helper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px 0;
}

.title-helper {
  flex-grow: 1;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.button-group {
  display: flex;
  gap: 10px;
}

button {
    width: 6em;
}

.manifest-dialog .vs-dialog-content {
    width: 95vw !important;  /* Lebar 95% dari viewport */
    max-width: 95vw !important;
}

.manifest-dialog .vs-dialog {
    width: 95vw !important;
    max-width: 95vw !important;
}

.manifest-dialog table {
    width: 100%;
    min-width: 1200px; /* Pastikan tabel cukup lebar */
}

.mt-2 {
    margin-top: 1rem;
}

.mb-2 {
    margin-bottom: 1rem;
}

/* Form field spacing improvements */
.manifest-dialog >>> .vs-input-parent {
    margin-bottom: 0.5rem;
}

.manifest-dialog >>> .vs-select {
    margin-bottom: 0.5rem;
}

.manifest-dialog >>> .form-master {
    padding: 0.5rem;
}

/* Group related fields visually */
.manifest-dialog >>> .vs-row {
    margin-bottom: 0.75rem;
}

/* Ensure consistent field heights */
.manifest-dialog >>> .vs-input,
.manifest-dialog >>> .vs-select__input {
    min-height: 40px;
}

/* Better label alignment */
.manifest-dialog >>> .vs-input__label,
.manifest-dialog >>> .vs-select__label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 0.25rem;
}

.title {
    margin-bottom: 15px;
    text-transform: capitalize;
    font-size: 0.8em;
    font-weight: bold;
    color: #333;
    text-align: left;
}

.label {
  font-size: 0.75rem;
  color: #7f8c8d;
  margin-bottom: 0.2rem;
  text-align: left;
}

.value {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2d3436;
  text-align: left;
}
</style>
