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
                    <div v-if="!is_edit" class="parent-container">
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

                    <template v-if="!is_edit">
                        <template v-if="vehicle.length === 0">
                            <vs-row justify="space-between" align="center">
                                <vs-col w="10">
                                    <selector 
                                        formKey="vehicle_mode"
                                        name="" 
                                        rules="" 
                                        placeholder="Select Vehicle Mode"
                                        :valueData="vehicleModeArray"
                                        :selectedValue="vehicle_mode"
                                        @updateValue="updateValue" 
                                    />
                                </vs-col>
                                <vs-col w=2>
                                    <vs-button
                                        shadow
                                        :active="false"
                                        @click="openDialogManageVehicleManifest"
                                    >
                                        <i class='bx bx-plus'></i> Vehicle
                                    </vs-button>
                                </vs-col>
                            </vs-row>
                            <img src="@/assets/svg/defaultVehicle.svg" alt="Core JNE Default Vehicle" style="width: 100%; margin-bottom: 20px;"/>
                        </template>
                        <template v-else>
                            <vs-row justify="space-between" align="center">
                                <h3 class="title">List Vehicle</h3>
                                <vs-button
                                    shadow
                                    :active="false"
                                    @click="openDialogManageVehicleManifest"
                                >
                                    <i class='bx bx-plus'></i> Vehicle
                                </vs-button>
                            </vs-row>
                            <vs-col w="12">
                                <radio
                                    :name="'manifest_vehicle'"
                                    :value-data="vehicle"
                                    :selected-value="listenSelectedManifestVehicle"
                                    :isRemoveButton="false"
                                    @updateValue="chooseRow"
                                />
                            </vs-col>
                        </template>
                    </template>
                    <template v-else>
                        <vs-row justify="space-between">
                            <h3 class="title">Active Vehicle</h3>
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
                            <vs-col w="12" v-if="item.is_active">
                                <vehicle-card 
                                    :data="item" 
                                    :isActive="item.is_active"
                                />
                            </vs-col>
                        </vs-row>
                    </template>
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

        <!--  --TODO: INI DIBENERIN NANTI -->
        <dialog-manage-vehicle-manifest
            title="Manifest Vehicle"
            :manifest_number="edit_data.manifest_number"
            :manifest_method="is_edit ? parseInt(edit_data.vehicle_mode_id) : parseInt(vehicle_mode)"
            :active="dialogManageVehicleManifest"
            :closeDialog="closeDialogManageVehicleManifest"
            :submitType="is_edit ? 'api' : 'prefill-stock'"
            @updateVehicleValue="updateVehicleValue"
            @updateVehicleValueBySchedule="updateVehicleValueBySchedule"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";

import DateTime from "@/components/input/dateTime"
import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import RadioWithCard from "@/components/input/radioWithCard";
import Selector from "@/components/input/select";
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
        "radio": RadioWithCard,
        "selector": Selector,
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
            form: {},
            id: "",
            loading: false,
            edit_data: {},
            schedule_id: "",
            vehicle: [],
            vehicle_form: [],
            manifest_number: "",
            manifest_method_id: 0,
            dialogManageVehicleManifest: false,
            selected_manifest_vehicle: "",
            is_edit: false,

            vehicle_mode: "",
            vehicleModeArray: []
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
        },
        listenSelectedManifestVehicle() {
            return this.selected_manifest_vehicle || ''
        }
    },
    watch: {
        active: async function(val) {
            if (val == true) {
                this.getDataVehicleMode();
            }
        },
        dataItem: function (val) {
            if(val !== undefined) {
                this.is_edit = true;
                this.getDataDetail(val);
                this.getManifestVehicle();
            }
        },
    },
    methods: {
        async getDataDetail(val) {
            this.edit_data = val;
            this.id = val.id;

            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_MANIFEST_NUMBER_isDisabled", true);
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

            if (!this.is_edit) {
                formWithoutId.vehicle = this.vehicle_form?.map(item => item.state)?.map(item => ({
                    vehicle_id: item.vehicle_id,
                    tlc_origin: item.origin_branch_code,
                    tlc_destination: item.destination_branch_code,
                    flight_number: item.flight_number,
                    etd: item.etd,
                    etd_timezone: item.etd_timezone,
                    eta: item.eta,
                    eta_timezone: item.eta_timezone,
                    is_active: item.is_active ? 1 : 0
                }));
            }
            formWithoutId.is_active = formWithoutId.is_active === true ? "1" : "0";
            formWithoutId.schedule_id = this.vehicle.find(item => item?.state?.is_active)?.state?.shipment_schedule_id || this.edit_data?.schedule_id || null; // TODO: CONFIRM AGAIN

            this.form = formWithoutId;

            if (this.form.etd > this.form.eta) {
                this.openNotification("warning", "Wrong Input in ETA/ETD field", "ETA must more than ETD");
                return
            }

            this.handleSubmitData();
        },
        updateValue(key, val, info){
            switch(key) {
                case "vehicle_mode":
                    this.vehicle_mode = val;
                    break;
                default:
            }
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

                this.vehicleModeArray = options;
            } catch (err) {
                console.error('Failed to load vehicle modes:', err);
            } finally {
                this.loading = false;
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
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_MANIFEST_NUMBER_isDisabled", false);
            this.vehicle = [];
            this.vehicle_form = [];
            this.dataTable = [];
            this.selected_manifest_vehicle = "";
            this.handleClearForm();
            this.handleClearAll();
            this.closeDialog();
        },
        handleClearAll() {
            this.vehicle_mode = "";
            this.vehicle = [];
            this.vehicle_form = [];
            this.selected_manifest_vehicle = "";
            this.is_edit = false;
            this.schedule_id = "";
            this.$refs?.formDataController?.handleEmptyForm();
            this.form = {}; 
        },
        openDialogManageVehicleManifest() {
            if (this.is_edit) {
                this.dialogManageVehicleManifest = true;
            } else {
                if (!this.vehicle_mode) {
                    this.openNotification("warn", null, "Failed", 'Please choose manifest mode first');
                } else {
                    this.dialogManageVehicleManifest = true;
                }
            }
        },
        closeDialogManageVehicleManifest() {
            this.dialogManageVehicleManifest = false;

            if (this.is_edit) {
                this.getManifestVehicle();
            }
        },
        chooseRow(newKey, done) {
            this.selected_manifest_vehicle = newKey;
            this.vehicle = this.vehicle.map(item => ({
                ...item,
                state: {
                    ...item.state,
                    is_active: item.key === newKey
                }
            }));
            this.vehicle_form = this.vehicle_form.map(item => ({
                ...item,
                state: {
                    ...item.state,
                    is_active: item.key === newKey
                }
            }));
        },
        updateVehicleValue(form) {
            if (!this.is_edit) {
                let form_id =  Date.now() + Math.random();
            
                if (this.selected_manifest_vehicle === '') this.selected_manifest_vehicle = form_id;

                let created_vehicle = {
                    key: form_id,
                    state: {
                        origin_vehicle: form?.origin_vehicle_name || "",
                        destination_vehicle: form?.destination_vehicle_name || "",
                        origin_vehicle_tlc: form?.origin_vehicle?.value || form.origin_vehicle || "",
                        destination_vehicle_tlc: form?.destination_vehicle?.value || form.destination_vehicle || "",
                        vehicle_id: form.vehicle_name,
                        pic_employee_id: form.pic_employee_id?.employee_name || form?.pic_employee_id || "",
                        flight_number: form.flight_number,
                        flight_schedule: form.flight_schedule,
                        etd_vehicle: form.etd_vehicle,
                        eta_vehicle: form.eta_vehicle,
                        is_active: this.vehicle.length === 0
                    }
                };

                let vehicle_form = {
                    key: form_id,
                    state: {
                        shipment_schedule_id: null,
                        origin_branch_code: form?.origin_vehicle?.value || form.origin_vehicle || "",
                        destination_branch_code: form?.destination_vehicle?.value || form.destination_vehicle || "",
                        vehicle_id: form?.vehicle_id || "",
                        flight_number: form?.shipment_number || "",
                        etd: form?.etd_vehicle || "",
                        etd_timezone: form?.etd_timezone || "WIB",
                        eta: form?.eta_vehicle || "",
                        eta_timezone: form?.eta_timezone || "WIB",
                        is_active: this.vehicle.length === 0
                    }
                };

                this.vehicle.push(created_vehicle);
                this.vehicle_form.push(vehicle_form);
            } else {
                let form_id =  Date.now() + Math.random();
            
                if (this.selected_manifest_vehicle === '') this.selected_manifest_vehicle = form_id;

                let created_vehicle = {
                    key: form_id,
                    state: {
                        origin_vehicle: form?.origin_vehicle_name || "",
                        destination_vehicle: form?.destination_vehicle_name || "",
                        origin_vehicle_tlc: form?.origin_vehicle?.value || form.origin_vehicle || "",
                        destination_vehicle_tlc: form?.destination_vehicle?.value || form.destination_vehicle || "",
                        vehicle_id: form.vehicle_name,
                        pic_employee_id: form.pic_employee_id?.employee_name || form?.pic_employee_id || "",
                        flight_number: form.flight_number,
                        flight_schedule: form.flight_schedule,
                        etd_vehicle: form.etd_vehicle,
                        eta_vehicle: form.eta_vehicle,
                        is_active: this.vehicle.length === 0
                    }
                };

                let vehicle_form = {
                    key: form_id,
                    state: {
                        vehicle_id: form?.vehicle_id || "",
                        vehicle_type_id: form?.vehicle_type_id || "",
                        employee_driver_id: form?.pic_employee_id?.employee_id || "",
                        flight_number: form?.flight_number || "",
                        flight_schedule: form?.flight_schedule || "",
                        etd: form?.etd_vehicle || "",
                        eta: form?.eta_vehicle || "",
                        origin_branch_code: form?.origin_vehicle || "",
                        destination_branch_code: form?.destination_vehicle || "",
                        is_active: this.vehicle.length === 0
                    }
                };

                this.vehicle.push(created_vehicle);
                this.vehicle_form.push(vehicle_form);
            }
        },
        updateVehicleValueBySchedule(vehicle, vehicle_form) {
            this.vehicle = [...this.vehicle, ...vehicle];
            this.vehicle_form = [...this.vehicle_form, ...vehicle_form];

            if (this.selected_manifest_vehicle === '') this.selected_manifest_vehicle = this.vehicle.find(item => item.state.is_active === true)?.key;
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