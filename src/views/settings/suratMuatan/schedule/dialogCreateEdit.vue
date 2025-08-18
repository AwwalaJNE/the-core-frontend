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
            originUrl: null,
            destinationUrl: null,
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
                // Load data sequentially to ensure arrays are populated
                Promise.all([
                    this.getVehicle(),
                    this.getVehicleModes()
                ]).then(() => {
                    this.updateInputTypesByVehicleMode(0);
                    
                    // Initialize vehicle mode field with empty value to show placeholder
                    this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", "");
                    
                    // Force FormInputController to re-render with loaded data
                    this.$nextTick(() => {
                        if (this.$refs.formDataController) {
                            this.$refs.formDataController.$forceUpdate();
                        }
                    });
                });
            }
        },
       dataItem: async function(val) {
            if (val !== undefined) {
                try {
                    this.getVehicle();
                    this.getVehicleModes();
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
                            // Also set the name for display
                            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", selected_mode.label);
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

            // Handle vehicle mode - ensure we show the name in UI but keep ID for submission
            if (formWithoutId.vehicle_mode_id) {
                
                let vehicle_mode_id;
                // Check if it's already a number or string number
                if (!isNaN(parseInt(formWithoutId.vehicle_mode_id))) {
                    vehicle_mode_id = parseInt(formWithoutId.vehicle_mode_id);
                } else {
                    // It's a string name like "UDARA", need to find the ID
                    
                    // Try both store array and local array
                    const store_arr = this.$store.state.surat_muatan_schedule?.vehicle_mode_id?.arrData || [];
                    const local_arr = this.vehicle_mode_arr || [];
                    const combined_arr = store_arr.length > 0 ? store_arr : local_arr;
                    
                    
                    const found_mode = combined_arr.find(item => 
                        item.label === formWithoutId.vehicle_mode_id || 
                        item.data?.vehicle_mode_name === formWithoutId.vehicle_mode_id
                    );
                    
                    if (found_mode) {
                        vehicle_mode_id = parseInt(found_mode.value);
                    } else {
                        console.error('Could not find vehicle mode for name:', formWithoutId.vehicle_mode_id);
                        // Try to get from the current selection in store
                        const storedValueData = this.$store.state.surat_muatan_schedule?.vehicle_mode_id?.valueData;
                        if (storedValueData && storedValueData.value) {
                            vehicle_mode_id = parseInt(storedValueData.value);
                        }
                    }
                }
                
                
                // Only proceed if we have a valid numeric ID
                if (vehicle_mode_id && !isNaN(vehicle_mode_id)) {
                    const vehicle_mode_arr = this.$store.state.surat_muatan_schedule?.vehicle_mode_id?.arrData || [];
                    const selected_mode = vehicle_mode_arr.find(item => parseInt(item.value) === vehicle_mode_id);
                    
                    if (selected_mode) {

                    // Store the name for display in the UI
                    this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", selected_mode.label);
                    this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID_ValueData", selected_mode);
                    
                    
                    // Keep the ID in form for submission - CRITICAL for validation
                    this.form.vehicle_mode_id = vehicle_mode_id;
                    this.form.vehicle_mode_name = selected_mode.label; // Also set the name in form
                    
                    
                    // Force FormInputController to update by triggering a re-render
                    this.$nextTick(() => {
                        if (this.$refs.formDataController) {
                            this.$refs.formDataController.$forceUpdate();
                        }
                    });
                } else {
                    
                        // If not found in array, still ensure we have the numeric ID
                        this.form.vehicle_mode_id = vehicle_mode_id;
                    }
                }
            }
            // Handle autocomplete airport objects - FormInputController passes valueData objects for autocomplete
            if (this.form.origin_name && typeof this.form.origin_name === 'object') {
                const airportObj = this.form.origin_name;
                this.form.origin_name = airportObj.label || `${airportObj.location_code} - ${airportObj.location_name}`;
                this.form.origin_point = airportObj.location_code || airportObj.value;
                this.form.origin_identifier = airportObj.location_code || airportObj.value;
            }

            if (this.form.destination_name && typeof this.form.destination_name === 'object') {
                const airportObj = this.form.destination_name;
                this.form.destination_name = airportObj.label || `${airportObj.location_code} - ${airportObj.location_name}`;
                this.form.destination_point = airportObj.location_code || airportObj.value;
                this.form.destination_identifier = airportObj.location_code || airportObj.value;
            }


            const isAirMode = this.form.vehicle_mode_id === 1;
            
            if (isAirMode) {
                // For air mode, preserve any values that were set by manual selection
                // Check multiple sources for the correct values
                
                // Check if we have empty or null values and try to get from store
                if (!this.form.origin_name || this.form.origin_name === null || this.form.origin_name === '') {
                    // First check the ValueData (autocomplete selection data)
                    const storedOriginValueData = this.$store.state.surat_muatan_schedule?.origin_name?.valueData;
                    
                    if (storedOriginValueData && storedOriginValueData.label) {
                        this.form.origin_name = storedOriginValueData.label;
                        this.form.origin_point = storedOriginValueData.location_code || storedOriginValueData.value;
                        this.form.origin_identifier = storedOriginValueData.location_code || storedOriginValueData.value;
                    } else {
                        // Fallback to value field
                        const storedOriginName = this.$store.state.surat_muatan_schedule?.origin_name?.value;
                        if (storedOriginName && storedOriginName !== '') {
                            this.form.origin_name = storedOriginName;
                        }
                    }
                }
                
                if (!this.form.destination_name || this.form.destination_name === null || this.form.destination_name === '') {
                    // First check the ValueData (autocomplete selection data)
                    const storedDestinationValueData = this.$store.state.surat_muatan_schedule?.destination_name?.valueData;
                    
                    if (storedDestinationValueData && storedDestinationValueData.label) {
                        this.form.destination_name = storedDestinationValueData.label;
                        this.form.destination_point = storedDestinationValueData.location_code || storedDestinationValueData.value;
                        this.form.destination_identifier = storedDestinationValueData.location_code || storedDestinationValueData.value;
                    } else {
                        // Fallback to value field
                        const storedDestinationName = this.$store.state.surat_muatan_schedule?.destination_name?.value;
                        if (storedDestinationName && storedDestinationName !== '') {
                            this.form.destination_name = storedDestinationName;
                        }
                    }
                }
                
                // If we still don't have proper values, try to construct them from points
                if ((!this.form.origin_name || this.form.origin_name === '') && this.form.origin_point && this.form.origin_point !== 'POINT') {
                    this.form.origin_name = this.form.origin_point;
                }
                
                if ((!this.form.destination_name || this.form.destination_name === '') && this.form.destination_point && this.form.destination_point !== 'POINT') {
                    this.form.destination_name = this.form.destination_point;
                }
                
            } else {
                // Only apply fallback logic for non-air mode
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
            // Initialize form if it doesn't exist
            if (!this.form) {
                this.form = { vehicle_mode_id: null };
            }
            
            switch (type) {
                case "vehicle_id":
                    this.vehicle_id = parseInt(val);
                    if (this.$store.state.surat_muatan_schedule?.vehicle_id?.arrData) {
                        const selectedVehicle = this.$store.state.surat_muatan_schedule.vehicle_id.arrData.find(
                            item => parseInt(item.value) === parseInt(val)
                        );
                        if (selectedVehicle && selectedVehicle.data) {
                            const vehicle_mode_id = parseInt(selectedVehicle.data.vehicle_type_id);
                            this.form.vehicle_mode_id = vehicle_mode_id;
                            
                            // Dispatch to store
                            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", vehicle_mode_id);
                            
                            // Set vehicle_mode_id value data
                            const vehicle_mode_arr = this.$store.state.surat_muatan_schedule.vehicle_mode_id?.arrData || [];
                            const selected_mode = vehicle_mode_arr.find(item => parseInt(item.value) === vehicle_mode_id);
                            if (selected_mode) {
                                this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID_ValueData", selected_mode);
                                
                                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", selected_mode.label);
                            }
                            
                            this.updateInputTypesByVehicleMode(vehicle_mode_id);
                        }
                    }
                    break;
                case "vehicle_mode_id":
                    const mode_id = parseInt(val);
                    this.form.vehicle_mode_id = mode_id;
                    
                    
                    const mode_arr = this.$store.state.surat_muatan_schedule?.vehicle_mode_id?.arrData || [];
                    
                    // Try both store array and local array
                    let selected_mode = mode_arr.find(item => parseInt(item.value) === mode_id);
                    if (!selected_mode && this.vehicle_mode_arr.length > 0) {
                        selected_mode = this.vehicle_mode_arr.find(item => parseInt(item.value) === mode_id);
                    }
                    
                    if (selected_mode) {
                        this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", selected_mode.label);
                        this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID_ValueData", selected_mode);
                        
                        // Force re-render
                        this.$nextTick(() => {
                            if (this.$refs.formDataController) {
                                this.$refs.formDataController.$forceUpdate();
                            }
                        });
                    } else {
                        this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", mode_id);
                    }
                    
                    this.updateInputTypesByVehicleMode(mode_id);
                    break;
                case "origin_name":
                    
                    // Handle autocomplete selection - check for airport data in multiple ways
                    if (this.form?.vehicle_mode_id === 1) {
                        let airportData = null;
                        let airportLabel = val;
                        let airportCode = null;
                        
                        // Case 1: Selection from autocomplete dropdown (obj.data exists)
                        if (obj && obj.data) {
                            airportData = obj.data;
                            airportLabel = airportData.label || `${airportData.location_code} - ${airportData.location_name}`;
                            airportCode = airportData.location_code || airportData.value;
                        }
                        // Case 2: Manual typing that matches airport format (contains " - ")
                        else if (val && typeof val === 'string' && val.includes(' - ')) {
                            const parts = val.split(' - ');
                            if (parts.length >= 2) {
                                airportCode = parts[0].trim();
                                airportLabel = val;
                            }
                        }
                        // Case 3: Check if obj.isValueData indicates this is a selection
                        else if (obj && obj.isValueData && val) {
                            airportLabel = val;
                            // Try to extract code from the label
                            if (val.includes(' - ')) {
                                const parts = val.split(' - ');
                                airportCode = parts[0].trim();
                            }
                        }
                        
                        if (airportCode && airportLabel) {
                            
                            this.form.origin_name = airportLabel;
                            this.form.origin_point = airportCode;
                            this.form.origin_identifier = airportCode;
                            
                            // Update the store with the new values
                            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_NAME", airportLabel);
                            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_POINT", airportCode);
                            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_IDENTIFIER", airportCode);
                            
                            // Also store the ValueData for autocomplete
                            if (airportData) {
                                this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_NAME_ValueData", airportData);
                            }

                        } else {
                            this.form.origin_name = val;
                            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_NAME", val);
                        }
                    }
                    break;
                case "destination_name":

                    // Handle autocomplete selection - check for airport data in multiple ways
                    if (this.form?.vehicle_mode_id === 1) {
                        let airportData = null;
                        let airportLabel = val;
                        let airportCode = null;
                        
                        // Case 1: Selection from autocomplete dropdown (obj.data exists)
                        if (obj && obj.data) {
                            airportData = obj.data;
                            airportLabel = airportData.label || `${airportData.location_code} - ${airportData.location_name}`;
                            airportCode = airportData.location_code || airportData.value;
                        }
                        // Case 2: Manual typing that matches airport format (contains " - ")
                        else if (val && typeof val === 'string' && val.includes(' - ')) {
                            const parts = val.split(' - ');
                            if (parts.length >= 2) {
                                airportCode = parts[0].trim();
                                airportLabel = val;
                            }
                        }
                        // Case 3: Check if obj.isValueData indicates this is a selection
                        else if (obj && obj.isValueData && val) {
                            airportLabel = val;
                            // Try to extract code from the label
                            if (val.includes(' - ')) {
                                const parts = val.split(' - ');
                                airportCode = parts[0].trim();
                            }
                        }
                        
                        if (airportCode && airportLabel) {
                            
                            this.form.destination_name = airportLabel;
                            this.form.destination_point = airportCode;
                            this.form.destination_identifier = airportCode;
                            
                            // Update the store with the new values
                            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_DESTINATION_NAME", airportLabel);
                            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_DESTINATION_POINT", airportCode);
                            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_DESTINATION_IDENTIFIER", airportCode);
                            
                            // Also store the ValueData for autocomplete
                            if (airportData) {
                                this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_DESTINATION_NAME_ValueData", airportData);
                            }

                        } else {
                            this.form.destination_name = val;
                            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_DESTINATION_NAME", val);
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

            // Only set fallback values for non-air mode or when values are truly empty
            const isAirMode = this.form.vehicle_mode_id === 1;
            
            if (!isAirMode) {
                // For non-air mode, use fallback logic
                if (!this.form.origin_name || this.form.origin_name === 'null' || this.form.origin_name === null) {
                    this.form.origin_name = this.form.origin_point || 'Origin';
                }
                
                if (!this.form.destination_name || this.form.destination_name === 'null' || this.form.destination_name === null) {
                    this.form.destination_name = this.form.destination_point || 'Destination';
                }
            }
            // For air mode, preserve the airport labels that were set by handleSelect

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
            
            if (!this.URL?.airports_list) {
                console.error('Airport URL not available');
                cb([]);
                return;
            }
            
            axios.get(
                `${this.URL.airports_list}?n=${this.listenNodeId}&limit=10&s=${queryString}`,
                this.Helper.header()
            ).then(res => {
                const data = res.data.data || [];
                
                // Transform the data based on the actual API response format
                const results = data.map(item => {
                    return {
                        // Display the full label in the dropdown
                        value: item.label || `${item.location_code} - ${item.location_name}`,
                        // Store the original API response data - this will be available as valueData in formData
                        data: item
                    };
                });
                
                cb(results);
                
            }).catch(err => {
                console.error("Error fetching airports:", err);
                cb([]);
                
            });
        },
        updateInputTypesByVehicleMode(vehicle_mode_id) {
            if (vehicle_mode_id === null || vehicle_mode_id === undefined) {
                vehicle_mode_id = 0;
            }
            
            const isAirMode = vehicle_mode_id === 1 || vehicle_mode_id === '1';
            
            // Check if store state exists before accessing
            if (this.$store.state.surat_muatan_schedule?.origin_name) {
                const originField = this.$store.state.surat_muatan_schedule.origin_name;
                if (isAirMode) {
                    originField.typeInput = "autoComplete";
                    if (this.URL?.airports_list) {
                        this.originUrl = this.URL.airports_list;
                    }
                } else {
                    originField.typeInput = "text";
                }
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_NAME", originField.value);
            }
            
            if (this.$store.state.surat_muatan_schedule?.destination_name) {
                const destinationField = this.$store.state.surat_muatan_schedule.destination_name;
                if (isAirMode) {
                    destinationField.typeInput = "autoComplete";
                    if (this.URL?.airports_list) {
                        this.destinationUrl = this.URL.airports_list;
                    }
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
                // Use the label (full airport name with code) instead of just the name
                this.form.origin_name = airportData.label || airportData.original?.label || `${airportData.code} - ${airportData.name}`;
                this.form.origin_point = airportData.code;
                this.form.origin_identifier = airportData.code;
                
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_NAME", this.form.origin_name);
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_POINT", this.form.origin_point);
                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_IDENTIFIER", this.form.origin_identifier);

            } else if (type === 'destination_name') {
                // Use the label (full airport name with code) instead of just the name
                this.form.destination_name = airportData.label || airportData.original?.label || `${airportData.code} - ${airportData.name}`;
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
        
        // Wait for the next tick to ensure the store is initialized
        this.$nextTick(() => {
            this.updateInputTypesByVehicleMode(this.form.vehicle_mode_id);
        });
        
        this.handleSubmitShortcut(this.handleSubmit);
    },
}
</script>