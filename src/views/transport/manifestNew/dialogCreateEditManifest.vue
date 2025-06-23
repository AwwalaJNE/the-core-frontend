<template>
    <div>
        <dialog-master
            width="xl"
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
                        :dataItem="listenIsReadOnly ? listenGetByApi : listenDataItem"
                        :isDisabled="isDisabled"
                        :itterateUrlAutoComplete="listenItterateUrlAutoComplete"
                        :itterateFlagAutoComplete="listenItterateFlagAutoComplete"
                        :querySearch="querySearch"
                        @formData="formData"
                        @inputFocus="inputFocus"
                        @onChangeCustom="onChangeCustom"
                    />

                    <!-- Divider -->
                    <vs-divider />

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
import DialogTraceBag from "@/views/transport/manifestNew/dialogTraceBag"

export default {
    name: "transport-surat-muatan-dialog-new",
    mixins: [master],
    components: {
        CameraScanner,
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "table-master": TableMaster,
        "dialog-trace-bag": DialogTraceBag
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
            form: {},
            node_id: "",

            manifest_number: "",
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
            vehicle_id: "",
            manifest_method_id: "",
            flight_number: "",
            flight_schedule: "",
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
            isMissroute: false,
            dialogTraceBag: false,
            selectedBagNumber: "",
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

                this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_NUMBER_isDisabled", true);
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
                this.getDataEmployee();
                
                // Initialize field widths based on current state
                if (this.dataItem && this.dataItem.manifest_method_id) {
                    if (this.dataItem.manifest_method_id === 1) {
                        this.adjustFieldWidths('flight');
                    } else if (this.dataItem.manifest_method_id === 2) {
                        this.adjustFieldWidths('road-with-driver');
                    } else {
                        this.adjustFieldWidths('road-no-driver');
                    }
                    
                    setTimeout(() => {
                        const vehicleModes = this.$store.getters["getInputs"]["surat_muatan"]["manifest_method_id"]["arrData"];
                        if (vehicleModes && vehicleModes.length > 0) {
                            const selectedMode = vehicleModes.find(mode => mode.value === this.dataItem.manifest_method_id);
                            if (selectedMode && selectedMode.data && selectedMode.data.vehicle_prefix) {
                                console.log("Setting initial prefix:", selectedMode.data.vehicle_prefix);
                                this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_PREFIX", selectedMode.data.vehicle_prefix);
                                this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_PREFIX_value", selectedMode.data.vehicle_prefix);
                            }
                        }
                    }, 500);
                }
            }
        },
    },
    methods: {
        getEditData(val) {
            this.node_id = val.node_id;
            this.manifest_number = val.manifest_number;            
            this.is_approve = val.is_approve;

            this.vehicle_mode_id = val.vehicle_mode_id;
            this.vehicle_type_id = val?.vehicle_type_id ?? null;

            if (this.vehicle_mode_id) {
                this.getDataVehicleType();
            }

            if (this.vehicle_type_id) {
                this.getDataVehicle();
            }
            
            if (val.manifest_number && val.manifest_number.includes('-')) {
                const parts = val.manifest_number.split('-');
                if (parts.length === 2) {
                    this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_PREFIX", parts[0].trim());
                    this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_NUMBER", parts[1].trim());
                } else {
                    this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_NUMBER", val.manifest_number);
                }
            } else {
                this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_NUMBER", val.manifest_number);
            }
            
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION_visible", true);

            if (val.manifest_method_id === 2) {
                this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible", true);
            } else {
                this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible", false);
            }

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
                        data.status_trip = (data?.bag?.status_trip || '') + ' ' + (data?.bag?.current_node.node_name || '');
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
        },
        async getEditDataByApi() {
            this.loadingSuratMuatan = true;
            try {
                const res = await axios.get(`${this.URL.surat_muatan}/${this.listenSMNumber}?n=${this.listenNodeId}`, this.Helper.header());

                let data = res.data.data
                if (data) {
                    data["node_id_origin"] = data["origin"]["node_name"];
                    data["node_id_destination"] = data["destination"]["node_name"];
                    data['manifest_method_id'] = parseInt(data['manifest_method_id']);
                    data['vehicle_id'] = parseInt(data['vehicle_id']);
                    data['pic_employee_id'] = parseInt(data['pic_employee_id']);
                    data['vehicle_type_id'] = parseInt(data['vehicle_type_id']);
                    data['flight_number'] = data['flight_number'];
                    data['flight_schedule'] = data['flight_schedule'];
                    
                    this.dataByApi = data;

                    this.getDataPreview(data);
                }

            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loadingSuratMuatan = false;
            }
        },
        getDataPreview(val) {
            this.vehicle_mode_id = val.vehicle_mode_id;
            this.vehicle_type_id = val?.vehicle_type_id ?? null;

            if (this.vehicle_mode_id) {
                this.getDataVehicleType();
            }

            if (this.vehicle_type_id) {
                this.getDataVehicle();
            }
            
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION_visible", true);

            if (val.manifest_method_id === 2) {
                this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible", true);
            } else {
                this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible", false);
            }

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
                        data.status_trip = (data?.bag?.status_trip || '') + ' ' + (data?.bag?.current_node.node_name || '');
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
                        this.autoComplateUrl = `${this.URL.node}/${this.listenNodeId}/origin-link?n=${this.listenNodeId}&vehicle_mode_id=${this.vehicle_mode_id}`;
                        break;
                    case "node_id_destination":
                        let transit = this.$store.getters["getInputs"]["surat_muatan"]["dynamicinputcomponent_node_id_transit"];
                        let arr = transit?.arrData || [];
                        let nodeId = this.node_id_origin;

                        if (arr.length > 0 && arr[arr.length - 1]?.inputs?.[0]?.data?.node_id) {
                            nodeId = arr[arr.length - 1].inputs[0].data.node_id || this.node_id_origin;
                        }

                        this.autoComplateUrl = `${this.URL.node}/${nodeId}/destination-link?n=${this.listenNodeId}&vehicle_mode_id=${this.vehicle_mode_id}&sort_order=desc&limit=15&page=1`;
                        break;
                    default:
                        break;
                }
            }
        },
        querySearch(queryString, cb) {
            axios
                .get(this.autoComplateUrl + `&s=${queryString}`, this.Helper.header())
                .then((res) => {
                    let result = res.data.data;
 
                    let suggestions = [];

                    result.length > 0 &&
                        result.map((item) => {
                            if (item.hasOwnProperty("node_name")) {
                                suggestions.push({
                                    value: item["node_name"],
                                    data: item,
                                });
                            }
                        });

                    cb(suggestions);
                })
                .catch((error) => console.log("error", error));
        },
        formData(form) {
            let node_id = form.node_id_origin?.node_id || this.listenCurrentNode.node_id;
            form.node_id_origin = node_id;
            form.node_id_destination = form.node_id_destination?.node_id;

            if (form?.dynamicinputcomponent_node_id_transit?.length > 0) {
                for (let i = 0; i < 3; i++) {
                    form[`node_id_transit_${i + 1}`] = form.dynamicinputcomponent_node_id_transit[i]?.inputs?.[0]?.data?.node_id || "";
                }
            }

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
                    this.node_id = this.listenNodeId;
                    this.form.pickup_node_id_requestor = this.node_id;
                    this.form.manifest_item = {
                        bag_number: this.item_number
                    };
                    this.createSuratMuatan();
                }
            } else {
                this.openNotification("warning", "Wrong Input in ETA/ETD field", "ETA must more than ETD");
            }
        },
        handleSubmit() {
            this.$refs.formSuratMuatanController.handleSubmit();
        },
        handleClearForm() {
            this.$refs.formSuratMuatanController.handleClearForm();
            this.form = {};
            this.item_number = "";
            this.manifest_number = "";
            this.dataTable = [];
        },
        async getDataVehicleMode() {
            try {
                const res = await axios.get(`${this.URL.vehicle_mode_list_v2}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header());

                const data = res.data.data;
                console.log("Vehicle mode data:", data);

                if (data.length > 0) {
                    const arr = data.map(item => {
                        console.log("Vehicle mode item:", item);
                        return {
                            label: item.vehicle_mode_name,
                            value: item.vehicle_mode_id,
                            data: item
                        };
                    });

                    this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_METHOD_ID_ArrData", arr.length > 0 ? arr : null);
                }
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed to collect vehicle mode list', err?.response?.data?.message ?? 'Something went wrong');
            }
        },
        async getDataVehicleType() {
            await axios
                .get(
                    this.URL.vehicle_type +
                        `?n=${this.listenNodeId}&vehicle_mode_id=${this.vehicle_mode_id}&sort_order=desc&limit=1000&page=1`,
                    this.Helper.header()
                )
                .then((res) => {
                    let arr = [];
                    if (res.data.data.length > 0) {
                        res.data.data.map((item) => {
                            let obj = {};
                            obj["label"] = item.vehicle_type_name;
                            obj["value"] = item.vehicle_type_id;
                            obj["data"] = item;

                            arr.push(obj);
                        });
                    } else {
                        arr = [{ label: null, value: null, data: {} }];
                    }
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_TYPE_ID_ArrData", arr);
                })
                .catch((err) => {
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed to collect role list', err?.response?.data?.message ?? 'something went wrong')
                });
        },
        async getDataVehicle() {
            await axios
                .get(
                    this.URL.vehicle +
                        `?n=${this.listenNodeId}&vehicle_type_id=${this.vehicle_type_id}&sort_order=desc&limit=1000&page=1`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data.length > 0) {
                        let arr = [];
                        res.data.data.map((item) => {
                            let obj = {};
                            obj["label"] = `${item.vehicle_name} (${item.vehicle_police_no})`;
                            obj["value"] = item.vehicle_id;

                            arr.push(obj);
                        });
                        this.$store.dispatch(
                            "SET_SURAT_MUATAN_VEHICLE_ID_ArrData",
                            arr.length > 0 ? arr : null
                        );
                    } else {
                        this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID", "");
                        this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID_ArrData", []);

                        this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID", "");
                        this.$store.dispatch(
                            "SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData",
                            []
                        );
                    }
                })
                .catch((err) => {
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed to collect role list', err?.response?.data?.message ?? 'something went wrong')
                });
        },
        async getDataEmployee() {
            await axios
                .get(this.URL.employee + `/driver?n=${this.listenNodeId}`, this.Helper.header())
                .then((res) => {
                    if (res.data.data.length > 0) {
                        let arr = [];
                        res.data.data.map((item) => {
                            let obj = {};
                            obj["label"] = item.employee_name;
                            obj["value"] = item.employee_id;

                            arr.push(obj);
                        });

                        this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData", arr.length > 0 ? arr : null);
                    } else {
                        this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID", "");
                        this.$store.dispatch(
                            "SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData",
                            []
                        );
                    }
                })
                .catch((err) => {
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed to collect role list', err?.response?.data?.message ?? 'something went wrong')
                });
        },
        async createSuratMuatan() {
            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.revamp_surat_muatan}?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header());
                const data = res.data.data;
                if (data) {
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
        },
        updateValue() {
            this.handleSubmit();
        },
        onChangeCustom(type, val, info = {}) {
            const updateMasterForm = (key, value) => {
                if (this.manifest_number && this.master_form?.[key] !== value) {
                    this.master_form = { ...this.master_form, [key]: value };
                    this.updateSuratMuatan();
                }
            };

            if (this.manifest_method_id !== "" && type == "manifest_method_id") {
                this.manifest_method_id !== val && this.resetForm();
            }

            switch (type) {
                case "manifest_number":
                    updateMasterForm("manifest_number", val);
                    break;
                case "manifest_prefix":
                    updateMasterForm("manifest_prefix", val);
                    break;
                case "max_weight":
                    updateMasterForm("max_weight", val);
                    break;
                case "manifest_method_id":
                    this.manifest_method_id = val;
                    if (type == "manifest_method_id" && val == 1) {
                        this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible", false);
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_visible", true);
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible", true);
                        // Adjust widths for flight mode
                        this.adjustFieldWidths('flight');
                    } else if (type == "manifest_method_id" && val != 1) {
                        
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_visible", false);
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible", false);

                        if (val == 2) {
                            this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible", true);   
                            this.getDataEmployee();
                            // Adjust widths for road mode with driver
                            this.adjustFieldWidths('road-with-driver');
                        } else {
                            this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible", false);
                            // Adjust widths for road mode without driver
                            this.adjustFieldWidths('road-no-driver');
                        }
                    }

                    this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION_visible", true);

                    if (info?.data) {
                        this.vehicle_mode_id = info.data.vehicle_mode_id || "";
                        
                        if (info.data.vehicle_prefix) {
                            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_PREFIX", info.data.vehicle_prefix);
                            this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_PREFIX_value", info.data.vehicle_prefix);
                        }
                        
                        this.autoComplateUrl = `${this.URL.node}/${this.listenNodeId}/origin-link?n=${this.listenNodeId}&vehicle_mode_id=${this.vehicle_mode_id}&sort_order=desc&limit=15&page=1`;
                        this.getDataVehicleType();
                    }
                    updateMasterForm("manifest_method_id", val);
                    updateMasterForm("vehicle_mode_id", val);
                    break;
                case "flight_number":
                    updateMasterForm("flight_number", val);
                    break;
                case "flight_schedule":
                    updateMasterForm("flight_schedule", val);
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
                case "vehicle_type_id":
                    if (info?.data) {
                        this.vehicle_type_id = info.data.vehicle_type_id || "";
                        this.getDataVehicle();
                    }
                    updateMasterForm("vehicle_type_id", val);
                    break;
                case "vehicle_id":
                    this.vehicle_id = val;
                    updateMasterForm("vehicle_id", val);
                    break;
                case "pic_employee_id":
                    updateMasterForm("pic_employee_id", val);
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
                const nodeName = this.listenCurrentNode.node_name;
                const nodeId = this.listenCurrentNode.node_id;
                this.node_id_origin = nodeId;
                this.$store.dispatch('SET_SURAT_MUATAN_NODE_ID_ORIGIN', nodeName);
            }
        },
        resetForm() {
            this.$store.dispatch("SET_SURAT_MUATAN_DYNAMICINPUTCOMPONENT_NODE_ID_TRANSIT", []);
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION", "");
            this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION_ValueData", {});
            this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData", []);
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_TYPE_ID", "");
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_TYPE_ID_ArrData", []);
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID", "");
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID_ArrData", []);
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
        adjustFieldWidths(mode) {
            // Dynamically adjust field widths based on visibility
            const state = this.$store.state.inputs.surat_muatan;
            
            // Reset all to default first, but preserve the widths for manifest_prefix, manifest_number, and max_weight
            // to ensure they stay in one row
            if (state.manifest_prefix) state.manifest_prefix.width = "1";
            if (state.manifest_number) state.manifest_number.width = "5";
            if (state.max_weight) state.max_weight.width = "6";
            
            // Reset other fields to their default widths
            if (state.manifest_method_id) state.manifest_method_id.width = "12";
            if (state.node_id_origin) state.node_id_origin.width = "12";
            if (state.node_id_destination) state.node_id_destination.width = "12";
            if (state.vehicle_type_id) state.vehicle_type_id.width = "6";
            if (state.vehicle_id) state.vehicle_id.width = "6";
            if (state.etd) state.etd.width = "6";
            if (state.eta) state.eta.width = "6";
            if (state.auto_depart) state.auto_depart.width = "12";
            
            switch(mode) {
                case 'flight':
                    // Flight mode layout
                    if (state.flight_number) state.flight_number.width = "6";
                    if (state.flight_schedule) state.flight_schedule.width = "6";
                    // Vehicle fields in one row
                    if (state.vehicle_type_id) state.vehicle_type_id.width = "6";
                    if (state.vehicle_id) state.vehicle_id.width = "6";
                    break;
                    
                case 'road-with-driver':
                    // Road mode with driver layout
                    if (state.vehicle_type_id) state.vehicle_type_id.width = "6";
                    if (state.vehicle_id) state.vehicle_id.width = "6";
                    if (state.pic_employee_id) state.pic_employee_id.width = "12";
                    break;
                    
                case 'road-no-driver':
                    // Road mode without driver layout
                    if (state.vehicle_type_id) state.vehicle_type_id.width = "6";
                    if (state.vehicle_id) state.vehicle_id.width = "6";
                    break;
            }
            
            // Force re-render of form
            this.$forceUpdate();
        },
        openTraceBagDialog() {
            this.dialogTraceBag = true;
        }
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

</style>
