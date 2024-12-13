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
                <template v-if="loadingVehicleMode == false && vehicle_mode_arr.length > 0">
                    <selector 
                        name="Vehicle Mode" 
                        rules="required" 
                        formKey="vehicle_mode"
                        :valueData="vehicle_mode_arr"
                        :selectedValue="vehicle_mode"
                        :isMultiple="false"
                        @updateValue="updateValue" 
                    />
                </template>
                <form-input-controller
                    ref="formDataController" 
                    typeForm="surat_muatan_stock"
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
    name:"surat-muatan-settings-stock-dialog",
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
            loadingVehicleMode: false,
            loadingVehicleId: false,
            loadingManifestNumber: false,
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
            return this.loading || this.loadingVehicleMode || this.loadingVehicleId || this.loadingManifestNumber;
        },
        listenDataItem() {
            return this.dataItem;
        }
    },
    watch: {
        active: function (val) {
            if (val && !this.dataItem) {
                this.getVehicleMode();
            }
        },
        dataItem: function (val) {
            if(val !== undefined) {
                this.getDataDetail(val);
            }
        },
        vehicle_mode (newVal, oldVal) {
            if (newVal !== undefined && newVal !== oldVal) {
                this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID", '');
                this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID_ArrData", []);
                this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NO_SM", '');
                this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NO_SM_ArrData", []);
                this.getVehicle();
            }
        },
        vehicle_id (newVal, oldVal) {
            if (newVal !== undefined && newVal !== oldVal) {
                this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NO_SM", '');
                this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NO_SM_ArrData", []);
                this.getManifestNumber();
            }
        }
    },
    methods: {
        async getDataDetail(val) {
            this.id = val.id;

            await this.getVehicleMode();
            this.vehicle_mode = this.vehicle_mode_arr.find(item => item.value == val.vehicle_mode_id)?.value;

            await this.getVehicle();
            this.vehicle_id = parseInt(val.vehicle_id);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID", this.vehicle_id);

            await this.getManifestNumber();
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NO_SM", val.no_sm);
        },
        formData(form){
            const { id, ...formWithoutId } = form;

            this.form = formWithoutId;
            this.handleSubmitData();
        },
        onChangeCustom(type, val, obj) {
            switch (type) {
                case "vehicle_id":
                    this.vehicle_id = val;
                    break;
                default:
            }
        },
        updateValue(key, val, info){
            switch(key) {
                case "vehicle_mode":
                    this.vehicle_mode = this.vehicle_mode_arr.find(item => item.value == val)?.value;
                    break;
                default:
            }
        },
        async getVehicleMode() {
            this.loadingVehicleMode = true;
            try {
                const res = await axios.get(`${this.URL.vehicle_mode_list_v2}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header());

                const data = res.data.data;

                if (data.length > 0) {
                    const arr = data.map(item => ({
                        label: item.vehicle_mode_name,
                        value: item.vehicle_mode_id,
                        data: item
                    }));

                    this.vehicle_mode_arr = arr
                }
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingVehicleMode = false;
            }
        },
        async getVehicle() {
            if (!this.vehicle_mode) return

            this.loadingVehicleId = true;
            try {
                const res = await axios.get(`${this.URL.vehicle_list_v2}/${this.vehicle_mode}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header());

                const data = res.data.data;

                if (data.length > 0) {
                    const arr = data.map(item => ({
                        label: item.vehicle_name,
                        value: item.vehicle_id,
                        data: item
                    }));

                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID_ArrData", arr.length > 0 ? arr : null);
                } else {
                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID", "");
                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID_ArrData", []);
                }
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingVehicleId = false;
            }
        },
        async getManifestNumber() {
            if (!this.vehicle_id) return

            this.loadingManifestNumber = true;
            try {
                const res = await axios.get(`${this.URL.list_sm}/${this.vehicle_id}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header());

                const data = res.data.data;

                if (data.length > 0) {
                    const arr = data.map(item => ({
                        label: item,
                        value: item,
                        data: item
                    }));

                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NO_SM_ArrData", arr.length > 0 ? arr : null);
                } else {
                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NO_SM", "");
                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NO_SM_ArrData", []);
                }
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingManifestNumber = false;
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
                this.$emit("handleClearInput");
                this.$emit("refresh");
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