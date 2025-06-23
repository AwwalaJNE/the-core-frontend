<template>
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
                <form-input-controller
                    ref="formDataController" 
                    typeForm="surat_muatan_schedule"
                    :dataItem="dataItem"
                    @formData="formData"
                    @onChangeCustom="onChangeCustom"
                    @inputFocus="inputFocus"
                    :querySearch="querySearch"
                />
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
                        Save Changes
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
import Selector from "@/components/input/select";

export default {
    name:"surat-muatan-settings-schedule-dialog",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "selector": Selector
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
            form: {
                vehicle_mode_id: null
            },
            id: "",
            loading: false,
            loadingVehicleId: false,
            loadingVehicleMode: false,
            loadingOrigin: false,
            loadingDestination: false,
            vehicle_mode_arr: [],
            vehicle_mode: '',
            vehicle_id: '',
            originUrl: this.URL.airports_list,
            destinationUrl: this.URL.airports_list,
            currentField: null
        }
    },
    computed: {
        listenActive(){
            return this.active;
        },
        listenTitle(){
            return this.title;
        },
        listenLoading() {
            return this.loading || this.loadingVehicleId || this.loadingVehicleMode || this.loadingOrigin || this.loadingDestination;
        },
        listenDataItem() {
            return this.dataItem;
        }
    },
    watch: {
       active(val) {
            if (val && !this.dataItem) {
                this.getVehicle(); 
                this.getVehicleModes();
                this.updateInputTypesByVehicleMode(0);
            }
        },
       dataItem: async function(val) {
            if (val !== undefined) {
                try {
                    await this.getVehicle();
                    await this.getVehicleModes();
                    this.getDataDetail(val);
                    
                    if (val.vehicle_type_id) {
                        this.updateInputTypesByVehicleMode(val.vehicle_type_id);
                    }
                } catch (err) {
                    console.error("Error in dataItem watch:", err);
                }
            }
        },
    },
    methods: {
       async getDataDetail(val) {
            if (!val || typeof val !== 'object') {
                console.error('getDataDetail error: parameter tidak valid', val);
                return;
            }

            try {
                this.id = val.id;

                // Set vehicle_id
                const vehicle_id = parseInt(val.vehicle_id);
                this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_ID", vehicle_id);

                const arrData = this.$store.state.surat_muatan_schedule.vehicle_id.arrData || [];
                const selected = arrData.find(item => parseInt(item.value) === vehicle_id);

                if (selected) {
                    this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_ID_ValueData", selected);
                    
                    // Set vehicle_mode_id if it exists in the selected vehicle data
                    if (selected.data && selected.data.vehicle_type_id) {
                        const vehicle_mode_id = parseInt(selected.data.vehicle_type_id);
                        this.form.vehicle_mode_id = vehicle_mode_id;
                        this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", vehicle_mode_id);
                        
                        // Set vehicle_mode_id value data
                        const vehicle_mode_arr = this.$store.state.surat_muatan_schedule.vehicle_mode_id.arrData || [];
                        const selected_mode = vehicle_mode_arr.find(item => parseInt(item.value) === vehicle_mode_id);
                        if (selected_mode) {
                            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID_ValueData", selected_mode);
                        }
                        
                        // Update input types based on vehicle mode
                        this.updateInputTypesByVehicleMode(vehicle_mode_id);
                    }
                }
            } catch (err) {
                console.error("getDataDetail failed:", err);
            }
        },
       formData(form){
            const { id, ...formWithoutId } = form;
          
            this.form = {
                ...formWithoutId,
                vehicle_id: parseInt(formWithoutId.vehicle_id),
                vehicle_mode_id: parseInt(formWithoutId.vehicle_mode_id),
                is_external_source: 'N',
            };

            const isAirMode = this.form.vehicle_mode_id === 1;
            
            if (!isAirMode) {
                if (!this.form.origin_name) {
                    this.form.origin_name = this.form.origin_point ? `${this.form.origin_point} (Origin)` : '';
                }
                
                if (!this.form.destination_name) {
                    this.form.destination_name = this.form.destination_point ? `${this.form.destination_point} (Destination)` : '';
                }
            }
            
            this.handleSubmitData();
        },
        onChangeCustom(type, val, obj) {
            
            switch (type) {
                case "vehicle_id":
                    this.vehicle_id = parseInt(val);
                    const selectedVehicle = this.$store.state.surat_muatan_schedule.vehicle_id.arrData.find(
                        item => parseInt(item.value) === parseInt(val)
                    );
                    if (selectedVehicle && selectedVehicle.data) {
                        const vehicle_mode_id = parseInt(selectedVehicle.data.vehicle_type_id);
                        this.form.vehicle_mode_id = vehicle_mode_id;
                        
                        // Dispatch to store
                        this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", vehicle_mode_id);
                        
                        // Set vehicle_mode_id value data
                        const vehicle_mode_arr = this.$store.state.surat_muatan_schedule.vehicle_mode_id.arrData || [];
                        const selected_mode = vehicle_mode_arr.find(item => parseInt(item.value) === vehicle_mode_id);
                        if (selected_mode) {
                            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID_ValueData", selected_mode);
                            
                            this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", selected_mode.label);
                        }
                        
                        this.updateInputTypesByVehicleMode(vehicle_mode_id);
                    }
                    break;
                case "vehicle_mode_id":
                    const mode_id = parseInt(val);
                    this.form.vehicle_mode_id = mode_id;
                    
                    const mode_arr = this.$store.state.surat_muatan_schedule.vehicle_mode_id.arrData || [];
                    const selected_mode = mode_arr.find(item => parseInt(item.value) === mode_id);
                    
                    if (selected_mode) {
                        this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", selected_mode.label);
                        
                        this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID_ValueData", selected_mode);
                    } else {
                        this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", mode_id);
                    }
                    
                    this.updateInputTypesByVehicleMode(mode_id);
                    break;
                case "origin_name":
                    if (this.form.vehicle_mode_id === 1) {
                        if (obj && obj.data) {
                            this.handleSelect({value: val, data: obj.data}, 'origin_name');
                        }
                    }
                    break;
                case "destination_name":
                    if (this.form.vehicle_mode_id === 1) {
                        if (obj && obj.data) {
                            this.handleSelect({value: val, data: obj.data}, 'destination_name');
                        }
                    }
                    break;
                default:
            }
        },
        updateValue(key, val, info){
            if (key === 'vehicle_mode_id') {
                this.form.vehicle_mode_id = parseInt(val); // ⬅️ pastikan tipe number
            }

            if (key === 'vehicle_id') {
                this.form.vehicle_id = parseInt(val);
            }

            if (key === 'vehicle_mode') {
                this.vehicle_mode = this.vehicle_mode_arr.find(item => item.value == val)?.value;
            }
        },
        async getVehicleModes() {
            this.loadingVehicleMode = true;
            try {
                const res = await axios.get(
                    `${this.URL.vehicle_mode_list_v2}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                    this.Helper.header()
                );
                
                const data = res.data.data || [];
                
                if (!data || !Array.isArray(data)) {
                    console.error("Invalid data format received:", data);
                    throw new Error("Invalid data format received");
                }
                
                const arr = data.map(item => ({
                    label: item.vehicle_mode_name,
                    value: item.vehicle_mode_id.toString(),
                    data: {
                        vehicle_prefix: item.vehicle_prefix,
                        vehicle_mode_name: item.vehicle_mode_name
                    }
                }));
                
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID_ArrData", arr);
                this.vehicle_mode_arr = arr;
            } catch (err) {
                console.error("Error fetching vehicle modes:", err);
                this.openNotification('danger', '', 'Failed', 'Gagal mengambil data mode kendaraan: ' + (err.message || 'Unknown error'));
            } finally {
                this.loadingVehicleMode = false;
            }
        },
        async getVehicle() {
            this.loadingVehicleId = true;
            try {
                const res = await axios.get(
                `${this.URL.vehicle}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header()
                );

                const data = res.data.data || [];
                
                if (!data || !Array.isArray(data)) {
                    console.error("Invalid vehicle data format received:", data);
                    throw new Error("Invalid vehicle data format received");
                }
                
                const arr = data.map(item => ({
                label: item.vehicle_name,
                value: item.vehicle_id,
                data: item
                }));

                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_ID_ArrData", arr);
            } catch (err) {
                console.error("Error fetching vehicles:", err);
                this.openNotification('danger', '', 'Failed', 'Gagal mengambil data kendaraan: ' + (err.message || 'Unknown error'));
            } finally {
                this.loadingVehicleId = false;
            }
        },
        async handleSubmitData() {
            const vehicleIdArrData = this.$store.state.surat_muatan_schedule?.vehicle_id?.arrData || [];
            
            const selectedVehicle = vehicleIdArrData.find(
                item => parseInt(item.value) === parseInt(this.form.vehicle_id)
            );
            
            if (selectedVehicle && selectedVehicle.data) {
                // Use vehicle_type_id from vehicle data as vehicle_mode_id
                this.form.vehicle_mode_id = parseInt(selectedVehicle.data.vehicle_type_id);
                this.form.vehicle_mode_name = selectedVehicle.data.vehicle_type_name;
                this.form.vehicle_name = selectedVehicle.label;
            }

            if (!this.form.origin_name || this.form.origin_name === 'null' || this.form.origin_name === null) {
                this.form.origin_name = this.form.origin_point || 'Origin';
            }
            
            if (!this.form.destination_name || this.form.destination_name === 'null' || this.form.destination_name === null) {
                this.form.destination_name = this.form.destination_point || 'Destination';
            }

            if (
                this.form.vehicle_mode_id === undefined ||
                this.form.vehicle_mode_id === null ||
                this.form.vehicle_mode_id === '' ||
                isNaN(Number(this.form.vehicle_mode_id))
            ) {
                this.openNotification("danger", "", "Validation Error", "Vehicle Mode wajib dipilih.");
                this.loading = false;
                return;
            }

            this.loading = true;
            try {
                const formToSubmit = { ...this.form };
                
                const res = this.id
                    ? await axios.put(`${this.URL.schedule}/${this.id}?n=${this.listenNodeId}`, formToSubmit, this.Helper.header())
                    : await axios.post(`${this.URL.schedule}?n=${this.listenNodeId}`, { data: [formToSubmit] }, this.Helper.header());

                this.openNotification('success', null, "Success", res?.data?.message || (this.id ? "Success Update Data" : "Success Create Data"));
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
            this.form = {
                vehicle_mode_id: null
            };
            this.id = "";
            this.vehicle_mode_arr = [];
            this.vehicle_mode = '';
            this.vehicle_id = '';
            this.$emit("handleClearInput");
            this.$emit("refresh");
        },
        cancel() {
            this.handleClearForm();
            this.closeDialog();
        },
        inputFocus(info) {
            if (info.key === 'origin_name') {
                this.currentField = 'origin_name';
            } else if (info.key === 'destination_name') {
                this.currentField = 'destination_name';
            }
        },
        querySearch(queryString, cb) {
            const vehicle_mode_id = this.form?.vehicle_mode_id;
            const isAirMode = vehicle_mode_id === 1 || vehicle_mode_id === '1';
            
            if (!isAirMode) {
                cb([]);
                return;
            }
            
            if (!queryString || queryString.length < 2) {
                cb([]);
                return;
            }
            
            if (this.currentField === 'origin_name') {
                this.loadingOrigin = true;
            } else if (this.currentField === 'destination_name') {
                this.loadingDestination = true;
            }
            
            axios.get(
                `${this.URL.airports_list}?n=${this.listenNodeId}&limit=10&s=${queryString}`,
                this.Helper.header()
            ).then(res => {
                const data = res.data.data || [];
                
                // Transform the data based on the actual API response format
                const results = data.map(item => {
                    // For debugging
                    
                    return {
                        // Display the full label in the dropdown
                        value: item.label || `${item.location_code} - ${item.location_name}`,
                        // Store the FULL airport data for selection
                        data: {
                            // The most important fields with fallbacks
                            name: item.location_name || '',
                            code: item.location_code || item.value || '',
                            identifier: item.location_code || item.value || '',
                            point: item.location_code || item.value || '',
                            // Additional fields
                            city: item.city || '',
                            country: item.country || '',
                            label: item.label || '',
                            // Store the original item
                            original: item
                        }
                    };
                });
                
                cb(results);
                
                if (this.currentField === 'origin_name') {
                    this.loadingOrigin = false;
                } else if (this.currentField === 'destination_name') {
                    this.loadingDestination = false;
                }
            }).catch(err => {
                console.error("Error fetching airports:", err);
                cb([]);
                
                if (this.currentField === 'origin_name') {
                    this.loadingOrigin = false;
                } else if (this.currentField === 'destination_name') {
                    this.loadingDestination = false;
                }
            });
        },
        updateInputTypesByVehicleMode(vehicle_mode_id) {
            if (vehicle_mode_id === null || vehicle_mode_id === undefined) {
                vehicle_mode_id = 0;
            }
            
            const isAirMode = vehicle_mode_id === 1 || vehicle_mode_id === '1';
            
            const originField = this.$store.state.surat_muatan_schedule.origin_name;
            if (originField) {
                if (isAirMode) {
                    originField.typeInput = "autoComplete";
                    this.originUrl = this.URL.airports_list;
                } else {
                    originField.typeInput = "text";
                }
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_NAME", originField.value);
            }
            
            const destinationField = this.$store.state.surat_muatan_schedule.destination_name;
            if (destinationField) {
                if (isAirMode) {
                    destinationField.typeInput = "autoComplete";
                    this.destinationUrl = this.URL.airports_list;
                } else {
                    destinationField.typeInput = "text";
                }
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_DESTINATION_NAME", destinationField.value);
            }
            
            if (this.$refs.formDataController) {
                this.$refs.formDataController.$forceUpdate();
            }
        },
        handleSelect(item, type) {
            
            if (!item || !item.data) {
                console.error(`Invalid airport data for ${type}`);
                return;
            }
            
            const airportData = item.data;
            
            if (type === 'origin_name') {
                this.form.origin_name = airportData.name;
                this.form.origin_point = airportData.code;
                this.form.origin_identifier = airportData.code;
                
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_NAME", this.form.origin_name);
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_POINT", this.form.origin_point);
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_IDENTIFIER", this.form.origin_identifier);

            } else if (type === 'destination_name') {
                this.form.destination_name = airportData.name;
                this.form.destination_point = airportData.code;
                this.form.destination_identifier = airportData.code;
                
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_DESTINATION_NAME", this.form.destination_name);
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_DESTINATION_POINT", this.form.destination_point);
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_DESTINATION_IDENTIFIER", this.form.destination_identifier);

            }
        },
    },
    mounted() {
        if (!this.form) {
            this.form = {
                vehicle_mode_id: null
            };
        }
        
        this.updateInputTypesByVehicleMode(this.form.vehicle_mode_id);
        
        this.handleSubmitShortcut(this.handleSubmit);
    },
}
</script>