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
                        <p class="notes"><b>Notes</b>: *Your changes are being autosaved</p>
                        <radio
                            :name="'list_manifest_vehicle'"
                            :formKey="'list_manifest_vehicle'"
                            :valueData="list_manifest_vehicle"
                            :selectedValue="defaultManifestVehicle"
                            @updateValue="updateValue"
                            @removeRow="removeRow"
                        />
                    </template>
                    <template v-else>
                        <p>No vehicle data is currently available. Please create a new vehicle first.</p>
                    </template>
                </template>
                <template v-else-if="navActive === 'k-NEW'">
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

        <template v-slot:footer v-if="navActive === 'k-NEW'">
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
import moment from "moment";

import master from "@/mixins/master";

import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import RadioWithForm from "@/components/input/radioWithForm";
import NavItem from "@/components/navbar/navTab";

export default {
    name: "dialog-manage-vehicle-manifest",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "nav-item": NavItem,
        "radio": RadioWithForm,
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
        defaultManifestVehicle() {
            return this.list_manifest_vehicle.length ? this.list_manifest_vehicle[0].key : ''
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
        },
        formData(form){
            form.origin_branch_code = form.origin_branch_code?.branch_code;
            form.destination_branch_code = form.destination_branch_code?.branch_code;
            form.employee_driver_id = form.employee_driver_id?.employee_id;
            form.vehicle_id = form?.vehicle_id?.vehicle_id;

            this.form = form;
            this.createManifestVehilce()
        },
        handleSubmit(){
            this.$refs.formSuratMuatanVehicleController.handleSubmit();
        },
        async getManifestVehicle() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.manifest_vehicle}/${this.listenManifestNumber}?n=${this.listenNodeId}`, this.Helper.header());

                let arr = res.data.data;
                
                const revamp_arr = arr.map(item => ({
                    key: item.manifest_vehicle_log_id,
                    state: [
                        {
                            label: 'Origin*',
                            key: 'origin',
                            value: `${item.origin_branch_name} (${item.origin_branch_code})`,
                            typeInput: 'text',
                            width: "6"
                        },
                        {
                            label: 'Destination*',
                            key: 'destination',
                            value: `${item.destination_branch_name} (${item.destination_branch_code})`,
                            typeInput: 'text',
                            width: "6"
                        },
                        {
                            label: 'Flight Number',
                            key: 'flight_number',
                            value: item.flight_number,
                            typeInput: 'text',
                            width: "6"
                        },
                        {
                            label: 'Flight Schedule',
                            key: 'flight_schedule',
                            value: item.flight_schedule,
                            typeInput: 'text',
                            width: "6"
                        },
                        {
                            label: 'Vehicle',
                            key: 'vehicle',
                            value: item.vehicle_name,
                            typeInput: 'text',
                            width: "4"
                        },
                        {
                            label: 'ETD',
                            key: 'etd',
                            value: item.etd,
                            typeInput: 'text',
                            width: "4"
                        },
                        {
                            label: 'ETA',
                            key: 'eta',
                            value: item.eta,
                            typeInput: 'text',
                            width: "4"
                        }
                    ]
                }));

                this.list_manifest_vehicle = revamp_arr;
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async createManifestVehilce() {
            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.manifest_vehicle}/${this.listenManifestNumber}?n=${this.listenNodeId}`, this.form, this.Helper.header());
                this.openNotification('success', null, "Success", "Update manifest vehicle success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
                this.moveTab();
            }
        },
        async chooseManifestVehicle(log_id) {
            this.loading = true;
            try {
                const res = await axios.put(`${this.URL.manifest_vehicle}/${log_id}/active?n=${this.listenNodeId}`, null, this.Helper.header());
                this.openNotification('success', null, "Success", "Update manifest vehicle success");
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
        updateValue(key, value, itemData) {
            this.chooseManifestVehicle(value);
        },
        removeRow(row_id) {
            this.removeManifestVehicle(row_id);
            this.getManifestVehicle();
        },
        inputFocus(info) {
            if (info?.key) {
                switch (info.key) {
                    case "origin_branch_code":
                        this.autoComplateUrl = `${this.URL.branch_list_v2}?n=${this.listenNodeId}`;
                        break;
                    case "destination_branch_code":
                        this.autoComplateUrl = `${this.URL.branch_list_v2}?n=${this.listenNodeId}`;
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
                    const value = item.node_name || item.vehicle_name || item.employee_name || '';
                    return { value, data: item };
                });
                cb(suggestions);
            } catch (error) {
                console.error("error", error);
            }
        },
        handleClearForm() {
            this.$refs.formSuratMuatanVehicleController.handleClearForm();
        },
        cancel() {
            this.navActive = 'k-MANAGE';

            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_NUMBER_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_FLIGHT_SCHEDULE_visible", false);
            this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_EMPLOYEE_DRIVER_ID_visible", false);

            this.handleClearForm();
            this.closeDialog();
        },
        moveTab() {
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