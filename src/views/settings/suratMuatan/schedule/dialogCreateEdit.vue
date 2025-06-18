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
                        {{btnBlue || 'Add'}}
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
            form: {},
            id: "",
            loading: false,
            loadingVehicleId: false,
            vehicle_mode_arr: [],
            vehicle_mode: '',
            vehicle_id: ''
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
            return this.loading || this.loadingVehicleId ;
        },
        listenDataItem() {
            return this.dataItem;
        }
    },
    watch: {
       active(val) {
            if (val && !this.dataItem) {
            this.getVehicle(); 
            }
        },
       dataItem: async function(val) {
            if (val !== undefined) {
            await this.getVehicle(); // Pastikan arrData sudah tersedia dulu
            this.getDataDetail(val); // Baru isi value + valueData
            }
        },
    },
    methods: {
        async getDataDetail(val) {
            this.id = val.id;

            const vehicle_id = parseInt(val.vehicle_id);
            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_ID", vehicle_id);

            const arrData = this.$store.state.surat_muatan_schedule.vehicle_id.arrData || [];
            const selected = arrData.find(item => parseInt(item.value) === parseInt(val.vehicle_id));
            if (selected) {
            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_ID_ValueData", selected);
            }
        },
       formData(form){
            const { id, ...formWithoutId } = form;
          
            
              this.form = {
                ...formWithoutId,
                vehicle_id: parseInt(formWithoutId.vehicle_id),
                vehicle_type_id: parseInt(formWithoutId.vehicle_type_id || this.vehicle_type_id),
                is_external_source: 'N'
            };
            this.handleSubmitData(); // pindahkan ke sini kembali
        },
        onChangeCustom(type, val, obj) {
            switch (type) {
                case "vehicle_id":
                    this.vehicle_id = val;
                    break;
                case "vehicle_type_id":
                    this.form.vehicle_type_id = parseInt(val);
                    break;
                default:
            }
        },
        updateValue(key, val, info){
            if (key === 'vehicle_type_id') {
                this.form.vehicle_type_id = parseInt(val); // ⬅️ pastikan tipe number
            }

            if (key === 'vehicle_id') {
                this.form.vehicle_id = parseInt(val);
            }

            if (key === 'vehicle_mode') {
                this.vehicle_mode = this.vehicle_mode_arr.find(item => item.value == val)?.value;
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
                const arr = data.map(item => ({
                label: item.vehicle_name,
                value: item.vehicle_id,
                data: item
                }));

                this.$store.commit("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_ID_ArrData", arr);
            } catch (err) {
                this.openNotification('danger', '', 'Failed', 'Gagal mengambil data kendaraan');
            } finally {
                this.loadingVehicleId = false;
            }
        },
        async handleSubmitData() {
           const selectedVehicle = this.vehicle_mode_arr.find(
                    item => parseInt(item.value) === parseInt(this.form.vehicle_id)
                    );
            
           if (!selectedVehicle || !selectedVehicle.data) {
                const vehicle = this.vehicle_mode_arr.find(item => item.value == this.form.vehicle_id);
                if (vehicle && vehicle.data) {
                this.form.vehicle_type_id = vehicle.data.vehicle_type_id;
                this.form.vehicle_type_name = vehicle.data.vehicle_type_name;
                this.form.vehicle_name = vehicle.label;
                }
            } else {
                // tetap set jika selectedVehicle ditemukan
                this.form.vehicle_type_id = selectedVehicle.data.vehicle_type_id;
                this.form.vehicle_type_name = selectedVehicle.data.vehicle_type_name;
                this.form.vehicle_name = selectedVehicle.label;
            }


            if (
                this.form.vehicle_type_id === undefined ||
                this.form.vehicle_type_id === null ||
                this.form.vehicle_type_id === '' ||
                isNaN(Number(this.form.vehicle_type_id))
                ) {
                this.openNotification("danger", "", "Validation Error", "Vehicle Type wajib dipilih.");
                this.loading = false;
                return;
            }

            this.loading = true;
            try {
                const res = this.id
                    ? await axios.put(`${this.URL.schedule}/${this.id}?n=${this.listenNodeId}`, this.form, this.Helper.header())
                    : await axios.post(`${this.URL.schedule}?n=${this.listenNodeId}`, { data: [this.form] }, this.Helper.header());

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
            this.form = {};
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
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>