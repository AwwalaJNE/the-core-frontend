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
                <template v-if="listenManifestMethod === 1">
                    <vs-input 
                        border 
                        type="text"
                        v-model="flightNumber"
                        label-placeholder="Search Flight Number Here"
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

                        <form-input-controller
                            ref="formSuratMuatanVehicleController"
                            typeForm="surat_muatan_vehicle"
                            :querySearch="querySearch"
                            @formData="formData"
                            @inputFocus="inputFocus"
                        />
                    </template>
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
            </vs-col>
        </template>

        <template v-slot:footer>
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

import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";

export default {
    name: "dialog-manage-vehicle-manifest",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        dataItem: Object,
        manifest_method: Number,
        title: String,
        updateVehicleValue: Function
    },
    data() {
        return {
            loading: false,
            flightNumber: "",
            hasFlightNumber: false
        };
    },
    computed: {
        listenActive() {
            if (this.active) {
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
        listenManifestMethod() {
            return this.manifest_method;
        },
    },
    methods: {
        setDialogActive() {
            switch(this.listenManifestMethod){
                case 1:
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER_visible", true);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE_visible", true);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_EMPLOYEE_DRIVER_ID_visible", false);
                    break;
                case 2:
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_EMPLOYEE_DRIVER_ID_visible", true);
                    break;
                case 3:
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_EMPLOYEE_DRIVER_ID_visible", false);
                    break;
                case 4:
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE_visible", false);
                    this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_EMPLOYEE_DRIVER_ID_visible", false);
                    break;
            }
        },
        formData(form){
            this.form = {
                origin_vehicle: form.origin_branch_code,
                destination_vehicle: form.destination_branch_code,
                vehicle_id: form.vehicle_id,
                pic_employee_id: form.employee_driver_id || "",
                flight_number: form.flight_number || "",
                flight_schedule: form.flight_schedule || "",
                etd_vehicle: form.etd,
                eta_vehicle: form.eta
            };

            this.$emit('updateVehicleValue', this.form);
            this.cancel();
        },
        handleSubmit(){
            this.$refs.formSuratMuatanVehicleController.handleSubmit();
        },
        inputFocus(info) {
            if (info?.key) {
                switch (info.key) {
                    case "origin_branch_code":
                        this.autoComplateUrl = `${this.URL.airports_list}?n=${this.listenNodeId}`;
                        break;
                    case "destination_branch_code":
                        this.autoComplateUrl = `${this.URL.airports_list}?n=${this.listenNodeId}`;
                        break;
                    case "employee_driver_id":
                        this.autoComplateUrl = `${this.URL.employee}/driver?n=${this.listenNodeId}`;
                        break;
                    case "vehicle_id":
                        this.autoComplateUrl = `${this.URL.vehicle}?n=${this.listenNodeId}&search_by=vehicle_name&sort_order=desc&limit=15&page=1`;
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
                    const value = item.label || item.vehicle_name || item.employee_name || '';
                    return { value, data: item };
                });
                cb(suggestions);
            } catch (error) {
                console.error("error", error);
            }
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

                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER", data?.flight);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE", data?.detailJson?.timingInformation?.departure?.runway?.scheduled?.iso);
                // this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_VEHICLE_ID", data?.detailJson?.aircraftInformation?.type?.friendlyName); TODO: confirm later
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ORIGIN_BRANCH_CODE", data?.detailJson?.routeInformation?.departure?.airport?.iata);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_DESTINATION_BRANCH_CODE", data?.detailJson?.routeInformation?.arrival?.airport?.iata);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ETD", data?.detailJson?.timingInformation?.departure?.runway?.estimated?.iso);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ETA", data?.detailJson?.timingInformation?.arrival?.runway?.estimated?.iso);

                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ORIGIN_BRANCH_CODE_ValueData", data?.detailJson?.routeInformation?.departure?.airport?.iata);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_DESTINATION_BRANCH_CODE_ValueData", data?.detailJson?.routeInformation?.arrival?.airport?.iata);
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        handleClearForm() {
            this.$refs.formSuratMuatanVehicleController.handleClearForm();
        },
        cancel() {
            this.handleClearForm();

            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_EMPLOYEE_DRIVER_ID_visible", false);

            this.hasFlightNumber = false;
            this.flightNumber = "";
            
            this.closeDialog();
        },
        clearInput() {
            this.hasFlightNumber = false;
            this.flightNumber = "";

            this.handleClearForm();
            
            this.$nextTick(() => {
                this.$refs.formFlightNumber?.$el?.querySelector("input")?.focus();
            });
        },
    },
    mounted() {
        this.handlePrintShortcut(this.print)
    }
};
</script>