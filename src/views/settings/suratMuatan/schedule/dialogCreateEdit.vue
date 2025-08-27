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
                    :dataItem="ediData"
                    :querySearch="querySearch"
                    @formData="formData"
                    @onChangeCustom="onChangeCustom"
                    @inputFocus="inputFocus"
                />
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end" style="margin-top: 2pc;">
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

export default {
    name:"surat-muatan-settings-schedule-dialog",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        dataItem: Object,
        title: String
    },
    data() {
        return {
            ediData: {},
            form: {},
            id: "",
            loading: false,
            vehicle_mode_id: 0
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
            return this.loading;
        },
    },
    watch: {
        active: async function(val) {
            if (val == true) {
                this.getDataVehicleMode();
            }
        },
        dataItem: function(val) {
            if (val !== undefined) {
                this.getDataDetail(val);
            }
        },
    },
    methods: {
        getDataDetail(val) {
            this.id = val.id;
            this.vehicle_mode_id = parseInt(val?.vehicle_mode_id);

            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_ID_ValueData", parseInt(val?.vehicle_id));
            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_NAME_ValueData", val?.origin_name);
            this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_DESTINATION_NAME_ValueData", val?.destination_name);

            this.ediData = {
                ...val,
                vehicle_id: val?.vehicle_name,
                vehicle_mode_id: parseInt(val?.vehicle_mode_id)
            };
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

                this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID_ArrData", options);
            } catch (err) {
                console.error('Failed to load vehicle modes:', err);
            } finally {
                this.loading = false;
            }
        },
        formData(form) {
            this.form = {
                ...form,
                is_external_source: 'N',
            };

            this.handleSubmitData();
        },
        onChangeCustom(type, val, obj) {
            switch (type) {
                case "vehicle_mode_id":
                    this.handleClearForm();
                    this.vehicle_mode_id = parseInt(val);
                    this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_MODE_ID", val);
                    break;
                case "vehicle_id":
                    this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_VEHICLE_ID_ValueData", parseInt(obj?.data?.vehicle_id));
                    break;
                case "origin_name":
                    this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_ORIGIN_NAME_ValueData", obj?.data?.label || obj?.data?.node_name);
                    break;
                case "destination_name":
                    this.$store.dispatch("SET_SURAT_MUATAN_SCHEDULE_DESTINATION_NAME_ValueData", obj?.data?.label || obj?.data?.node_name);
                    break;
                default:
            }
        },
        inputFocus(info) {
            if (!info?.key) return;

            switch (info.key) {
                case "origin_name":
                case "destination_name":
                    switch(this.vehicle_mode_id){
                        case 1:
                            this.autoComplateUrl = `${this.URL.airports_list}?n=${this.listenNodeId}`;
                            break;
                        case 2:
                            this.autoComplateUrl = `${this.URL.branch_list_v2}?n=${this.listenNodeId}`;
                            break;
                        case 3:
                            this.autoComplateUrl = `${this.URL.branch_list_v2}?n=${this.listenNodeId}`;
                            break;
                        case 4:
                            this.autoComplateUrl = `${this.URL.branch_list_v2}?n=${this.listenNodeId}`;
                            break;
                    }
                    break;
                case "vehicle_id":
                    this.autoComplateUrl = `${this.URL.vehicle}?n=${this.listenNodeId}&search_by=vehicle_name&sort_order=desc&limit=15&page=1`;
                    break;
                default:
                    break;
            }
        },
        async querySearch(queryString, cb) {
            try {
                const res = await axios.get(this.autoComplateUrl + `&s=${queryString}`, this.Helper.header());
                const result = res.data.data || [];
                const suggestions = result.map(item => {
                    const value = item.label || item.vehicle_name || item.node_name || '';
                    return { value, data: item };
                });
                cb(suggestions);
            } catch (error) {
                console.error("error", error);
            }
        },
        async handleSubmitData() {
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
            this.vehicle_mode_id = 0;
        },
        cancel() {
            this.handleClearForm();
            this.closeDialog();
            this.$emit("refresh");
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit);
    },
}
</script>