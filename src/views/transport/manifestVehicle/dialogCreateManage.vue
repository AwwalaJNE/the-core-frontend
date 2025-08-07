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
                <template v-else-if="navActive === 'k-NEW'">
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
                </template>
            </vs-col>
        </template>

        <template v-slot:footer v-if="navActive === 'k-NEW' && hasFlightNumber">
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
import RadioWithCard from "@/components/input/radioWithCard";
import NavItem from "@/components/navbar/navTab";

export default {
    name: "dialog-manage-vehicle-manifest",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "nav-item": NavItem,
        "radio": RadioWithCard,
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        dataItem: Object,
        manifest_method: Number,
        manifest_number: String,
        title: String
    },
    data() {
        return {
            navActive: "k-MANAGE",
            navItem: [
                {
                    label: "MANAGE",
                    key: "k-MANAGE"
                },
                {
                    label: "NEW",
                    key: "k-NEW"
                },
            ],
            loading: false,
            list_manifest_vehicle: [],
            selected_manifest_vehicle: "",

            flightNumber: "",
            hasFlightNumber: false,

            vehicle_id: ""
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
        listenManifestNumber() {
            return this.manifest_number;
        },
        listenManifestMethod() {
            return this.manifest_method;
        },
        listenSelectedManifestVehicle() {
            return this.selected_manifest_vehicle || ''
        }
    },
    methods: {
        setDialogActive() {
            this.getManifestVehicle();

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
        activeTab(val) {
            this.navActive = val;

            if (val === 'k-MANAGE') {
                this.getManifestVehicle();
            }
        },
        formData(form){
            form.origin_branch_code = form.origin_branch_code?.value || form.origin_branch_code;
            form.destination_branch_code = form.destination_branch_code?.value || form.destination_branch_code;
            form.vehicle_id = this.vehicle_id || form?.vehicle_id?.vehicle_id || form?.vehicle_id;
            form.employee_driver_id = form?.employee_driver_id?.employee_id || "";
            
            this.form = form;
            this.createManifestVehicle()
        },
        handleSubmit(){
            this.$refs.formSuratMuatanVehicleController.handleSubmit();
        },
        async getVehicle(query) {
            this.loadingVehicleId = true;
            try {
                const res = await axios.get(`${this.URL.vehicle}?n=${this.listenNodeId}&search_by=vehicle_police_no&s=${query}`, this.Helper.header());

                const data = res.data.data || [];

                this.vehicle_id = res.data.data[0].vehicle_id
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
                
                // NOTES: BELOW FOR RADIO - FORM
                // const revamp_arr = arr.map(item => ({
                //     key: item.manifest_vehicle_log_id,
                //     state: [
                //         {
                //             label: '',
                //             key: 'label',
                //             value: item.status_flight,
                //             typeInput: 'badge',
                //             width: "12"
                //         },
                //         {
                //             label: 'Origin*',
                //             key: 'origin',
                //             value: `${item.origin_branch_name} (${item.origin_branch_code})`,
                //             typeInput: 'text',
                //             width: "6"
                //         },
                //         {
                //             label: 'Destination*',
                //             key: 'destination',
                //             value: `${item.destination_branch_name} (${item.destination_branch_code})`,
                //             typeInput: 'text',
                //             width: "6"
                //         },
                //         {
                //             label: 'Flight Number',
                //             key: 'flight_number',
                //             value: item.flight_number,
                //             typeInput: 'text',
                //             width: "6"
                //         },
                //         {
                //             label: 'Flight Schedule',
                //             key: 'flight_schedule',
                //             value: item.flight_schedule,
                //             typeInput: 'text',
                //             width: "6"
                //         },
                //         {
                //             label: 'Vehicle',
                //             key: 'vehicle',
                //             value: item.vehicle_name,
                //             typeInput: 'text',
                //             width: "4"
                //         },
                //         {
                //             label: 'ETD',
                //             key: 'etd',
                //             value: item.etd,
                //             typeInput: 'text',
                //             width: "4"
                //         },
                //         {
                //             label: 'ETA',
                //             key: 'eta',
                //             value: item.eta,
                //             typeInput: 'text',
                //             width: "4"
                //         }
                //     ]
                // }));

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
                        flight_schedule: item?.etd || "",
                        etd_vehicle: item?.etd || "",
                        eta_vehicle: item?.eta || "",
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

                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER", data?.flight);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE", data?.detailJson?.timingInformation?.departure?.runway?.scheduled?.iso);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_VEHICLE_ID", data?.detailJson?.flightSummary?.airline?.shortName);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ORIGIN_BRANCH_CODE", data?.detailJson?.routeInformation?.departure?.airport?.name);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_DESTINATION_BRANCH_CODE", data?.detailJson?.routeInformation?.arrival?.airport?.name);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ETD", data?.detailJson?.timingInformation?.departure?.runway?.estimated?.iso);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ETA", data?.detailJson?.timingInformation?.arrival?.runway?.estimated?.iso);

                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_VEHICLE_ID_ValueData", data?.detailJson?.flightSummary?.airline?.iata);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ORIGIN_BRANCH_CODE_ValueData", data?.detailJson?.routeInformation?.departure?.airport?.iata);
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_DESTINATION_BRANCH_CODE_ValueData", data?.detailJson?.routeInformation?.arrival?.airport?.iata);

                await this.getVehicle(data?.detailJson?.flightSummary?.airline?.iata);
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
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
        handleClearForm() {
            if (this.navActive === 'k-NEW' && this.$refs.formSuratMuatanVehicleController) {
                this.$refs.formSuratMuatanVehicleController.handleClearForm();
            }
        },
        clearInput() {
            this.hasFlightNumber = false;
            this.flightNumber = "";
            this.vehicle_id = "";

            this.handleClearForm();
            
            this.$nextTick(() => {
                this.$refs.formFlightNumber?.$el?.querySelector("input")?.focus();
            });
        },
        cancel() {
            this.handleClearForm();

            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_EMPLOYEE_DRIVER_ID_visible", false);

            this.navActive = 'k-MANAGE';

            this.hasFlightNumber = false;
            this.flightNumber = "";
            this.vehicle_id = "";
            
            this.closeDialog();
        },
        moveTab() {
            this.hasFlightNumber = false;
            this.flightNumber = "";
            this.vehicle_id = "";

            this.handleClearForm();

            this.navActive = 'k-MANAGE';
            this.getManifestVehicle();
        }
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