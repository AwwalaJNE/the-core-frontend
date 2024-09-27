<template>
    <dialog-master
        width="lg"
        :actived="listenActive"
        :closeDialog="cancel"
        class="custom-width"
    >
        <template v-slot:header>
            <div class="button-helper">
                <div class="title-helper">
                    {{ listenTitle }}
                </div>
                <vs-button 
                    :disabled="isDisabledPrint"
                    @click="print"
                >
                    Print
                </vs-button>
                <vs-button  
                    :danger="is_approve === 1"
                    :disabled="isDisabledApprove"
                    @click="approve" 
                >
                    {{ is_approve === 1 ? 'Unapproved' : 'Approve' }}
                </vs-button>
            </div>
        </template>

        <template v-slot:content>
            <camera-scanner 
                ref="cameraScanner" 
                @data="onCameraScannerGetData" 
            />

            <vs-row>
                <vs-col lg="5" sm="5">
                    <div>
                        <form-input-controller
                            ref="formSuratMuatanController"
                            typeForm="surat_muatan"
                            :dataItem="listenDataItem"
                            :isDisabled="isDisabled"
                            :itterateUrlAutoComplete="listenItterateUrlAutoComplete"
                            :itterateFlagAutoComplete="listenItterateFlagAutoComplete"
                            :querySearch="querySearch"
                            @formData="formData"
                            @inputFocus="inputFocus"
                            @onChangeCustom="onChangeCustom"
                        />
                    </div>
                </vs-col>
                <vs-col lg="7" sm="7">
                    <vs-row>
                        <vs-col>
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

                    <vs-row>
                        <vs-col style="overflow: auto;">
                            <table-master
                                :dataTable="dataTable"
                                :dataColumn="datacolumn"
                                :tableLoading="loading"
                                :pageSize="pagination.page_size"
                                :page="pagination.page"
                                :limit="pagination.limit"
                                :hasAction="false"
                                :hasPagination="false"
                                :customAction="true"
                                :customActionList="customActionList"
                                @actionUpdate="actionUpdate"
                            />
                        </vs-col>
                    </vs-row>
                </vs-col>
            </vs-row>
        </template>
    </dialog-master>
</template>

<script>
import axios from "axios";
import moment from "moment";
import master from "@/mixins/master";

import CameraScanner from "@/components/scanner/camera";
import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import TableMaster from "@/components/table/tableMaster.vue";

export default {
    name: "transport-surat-muatan-dialog-new",
    mixins: [master],
    components: {
        CameraScanner,
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "table-master": TableMaster
    },
    props: {
        active: Boolean,
        btnRed: String,
        btnBlue: String,
        closeDialog: Function,
        dataItem: Object,
        refresh: Function,
        title: String,        
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
                    label: "Type",
                    key: "item_type",
                    width: "xs",
                },
                {
                    label: "Weight (Kg)",
                    key: "total_weight",
                    width: "xs",
                },
                {
                    label: "Destination",
                    key: "destination_name",
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
                }
            ],
            loading: false,
            loadingConfirmApprove: false,
            pagination: {
                limit: 5,
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
            master_form: {}
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
        listenItterateUrlAutoComplete() {
            return this.itterateUrlAutoComplete;
        },
        listenItterateFlagAutoComplete() {
            return this.itterateFlagAutoComplete;
        },
    },
    watch: {
        dataItem: function(val) {
            if (val !== undefined) {
                this.getEditData(val);

                this.isDisabled = val.status !== 'READY' || val.is_orion === "1" || val.is_approve === 1;
                this.isDisabledPrint = val.status === 'CANCELED';
                this.isDisabledApprove = (val.status !== 'READY' && val.is_approve === 1) || val.is_orion === "1";

            }
        },
        active: function(val) {
            if (val == true) {
                this.getDataVehicleMode();
                this.originNode()
                this.getDataEmployee();
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

            if (val?.detail) {
                let arr = [];

                val.detail.forEach(data => {
                    data.received_status = data.received_at ? 1 : 0;
                    
                    if (data.item_number) {
                        data.bag_number = data.item_number;
                        data.type = data.item_type;
                        data.bag_weight = data.total_weight;
                        data.destination_name = data.bag?.destination?.node_tariff_code || '';
                        
                        if (val.status !== "READY") {
                            data.button_status = { remove: false };
                        }

                        arr.push(data);
                    }
                });

                this.dataTable = arr;
                
                if (val.status !== "READY") {
                    item.button_status = { remove: false };
                }
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
        actionUpdate(val, key) {
            switch (key) {
                case "remove":
                    this.item_remove = val.item_number;
                    this.removeSuratMuatanDetail();
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
            let node_id = form.node_id_origin?.node_id || this.listenActiveUser.nodes[0].node_id;
            form.node_id_origin = node_id;
            form.node_id_destination = form.node_id_destination?.node_id;

            if (form?.dynamicinputcomponent_node_id_transit?.length > 0) {
                for (let i = 0; i < 3; i++) {
                    form[`node_id_transit_${i + 1}`] = form.dynamicinputcomponent_node_id_transit[i]?.inputs?.[0]?.data?.node_id || "";
                }
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
                const res = await axios.get(`${this.URL.vehicle_mode}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header());

                const data = res.data.data;

                if (data.length > 0) {
                    const arr = data.map(item => ({
                        label: item.vehicle_mode_name,
                        value: item.vehicle_mode_id,
                        data: item
                    }));

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
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
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
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                });
        },
        async getDataEmployee() {
            //this.URL.employee + `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`
            await axios
                .get(
                    this.URL.employee +
                        `/driver?n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data.length > 0) {
                        let arr = [];
                        res.data.data.map((item) => {
                            let obj = {};
                            obj["label"] = item.employee_name;
                            obj["value"] = item.employee_id;

                            arr.push(obj);
                        });
                        // this.dataNodeType = arr
                        this.$store.dispatch(
                            "SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData",
                            arr.length > 0 ? arr : null
                        );
                    } else {
                        this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID", "");
                        this.$store.dispatch(
                            "SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData",
                            []
                        );
                    }
                })
                .catch((err) => {
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
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
            try {
                const res = await axios.patch(`${this.URL.revamp_surat_muatan}/${this.manifest_number}/approval?n=${this.listenNodeId}`, { is_approve: this.is_approve ^ 1 }, this.Helper.header());
                
                this.is_approve ^= 1;
                this.openNotification("success", null, "Success", res?.data?.message);
                if (this.is_approve === 1) {
                    this.print();
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? "", "Failed", err?.response?.data?.message ?? "Something went wrong"); 
            } finally {
                this.$emit('refresh');
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
            window.open(routeData.href, '_blank');

        },
        cancel() {
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
                case "max_weight":
                    updateMasterForm("max_weight", val);
                    break;
                case "manifest_method_id":
                    this.manifest_method_id = val;
                    if (type == "manifest_method_id" && val == 1) {
                        this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible", false);
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_visible", true);
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible", true);
                    } else if (type == "manifest_method_id" && val != 1) {
                        this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible", true);
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_visible", false);
                        this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible", false);
                    }
                    if (info?.data) {
                        this.vehicle_mode_id = info.data.vehicle_mode_id || "";
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
                    updateMasterForm("auto_depart", val);
                    break;
                default:
            }
        },
        originNode(){
            if (this.listenActiveUser.nodes.length > 0) {
                const nodeName = this.listenActiveUser.nodes[0].node_name;
                const nodeId = this.listenActiveUser.nodes[0].node_id;
                this.node_id_origin = nodeId;
                this.$store.dispatch('SET_SURAT_MUATAN_NODE_ID_ORIGIN', nodeName);
            }
        },
        resetForm() {
            // this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData", [{label: null, value: null, data: {}}])
            // this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN", "");
            // this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN_ValueData", {});
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
    }
};
</script>
<style scoped>
.title-helper {
    width: 60%;
    align-content: center;
}

.button-helper {
    display: flex; 
    justify-content: flex-end;
}

button {
    width: 6em;
}
</style>
