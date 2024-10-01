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
            <div>
                <div>
                    <selector 
                        ref="editType"
                        formKey="editType"
                        name="Edit Type"
                        :isMultiple="false"
                        :rules="'required'" 
                        :selectedValue="selectedEditType"
                        :valueData="edit_type_list"
                        @updateValue="updateValue" 
                    />
                </div>

                <div v-if="selectedEditType === 'EDIT_CONNOTE'">
                    <form-input-controller
                        ref="formHelpdeskEditConnote"
                        typeForm="helpdesk_edit_connote"
                        :dataItem="editData"
                        @formData="formData"
                        @onChangeCustom="onChangeCustom"
                    />
                </div>
                <div v-else-if="selectedEditType === 'MOVE_CONNOTE'">
                    <form-input-controller 
                        ref="formHelpdeskMoveConnote"
                        typeForm="helpdesk_move_connote"
                        :querySearch="querySearch"
                        @formData="formData"
                        @inputFocus="inputFocus"
                    />
                </div>
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
                        Close
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
                        Edit
                    </vs-button>
                </vs-col>
            </vs-row>
        </template>
    </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import moment from "moment";

import CameraScanner from "@/components/scanner/camera";
import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import InputGeneral from "@/components/input/general";
import Selector from "@/components/input/select";
import TableMaster from "@/components/table/tableMaster";

export default {
    name: "dialog-helpdesk-edit-connote",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "table-master": TableMaster,
        "input-general": InputGeneral,
        "form-input-controller": FormInputController,
        CameraScanner,
        "selector": Selector
    },
    props: {
        active: Boolean,
        closeDialog: Function, 
        connoteNumber: String,
        dataItem: Object,
        refresh: Function,
        title: String,
    },
    computed: {
        listenActive() {
            return this.active;
        },
        listenLoading() {
            return this.loading;
        },
        listenTitle() {
            return this.title;
        },
        listenConnoteNumber() {
            return this.connoteNumber;
        },
        listenDataItem() {
            return this.dataItem;
        }
    },
    watch: {
        dataItem: function(val) {
            if (val !== undefined) {
                this.getEditData(val);
            }
        },
        active: function(val) {
            if (val == true) {
                // 
            }
        },
    },
    data() {
        return {
            form: {},
            form_helpdesk_move_connote: {},
            loading: false,
            dataTable: [],
            item_number: "",
            editData: {},
            selectedEditType: "",
            edit_type_list: [
                {
                    label: "Edit Connote Form",
                    value: "EDIT_CONNOTE",
                },
                {
                    label: "Move Connote Location",
                    value: "MOVE_CONNOTE",
                },
            ],
            node_location_id: ""
        };
    },
    methods: {
        getEditData(val) {
            console.log("PAS", val)
            this.form_helpdesk_move_connote = {
                connote_shipper_name: val.connote_shipper_name,
                connote_shipper_street_address: val.connote_shipper_street_address,
                connote_shipper_email: val.connote_shipper_email,
                connote_shipper_phone_number: val.connote_shipper_phone_number,
                connote_receiver_name: val.connote_receiver_name,
                connote_receiver_street_address: val.connote_receiver_street_address,
                connote_receiver_email: val.connote_receiver_email,
                connote_receiver_phone_number: val.connote_receiver_phone_number,
                amount_cod: val.amount_cod,
                amount_price: val.amount_price,
                remarks: val.remarks
            };
        },
        querySearch(queryString, cb){
            axios.get(this.autoComplateUrl +`&s=${queryString}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
                let suggestions = [];

                result.length > 0 && result.map(item => {
                    if(item.hasOwnProperty(this.flag)) {
                        suggestions.push({
                            value: item[this.flag],
                            data: item
                        });
                    }
                })
                cb(suggestions);
            })
            .catch(error => console.log("error", error));
        },
        inputFocus(info) {
            let key = info.hasOwnProperty("key") ? info["key"] : "";
            let url = "";

            switch(key) {
                case "node_location_id":
                    url = this.URL.node + '?n=' + this.listenNodeId + '&sort_order=desc&limit=15&page=1';
                    this.flag = "node_name";
                    break;
                default:
                    url = ""; 
            }
            
            this.autoComplateUrl = url;
        },
        formData(form){
            this.node_location_id = form?.node_location_id?.node_id;
            this.updateLocation();
        },
        async updateLocation(){
            this.loading = true;
            try {
                const res = await axios.patch(`${this.URL.connote}/${this.listenConnoteNumber}/move?n=${this.listenNodeId}&node_location_id=${this.node_location_id}`, {}, this.Helper.header());
                this.openNotification("success", null, "Success", res?.data?.message);
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? "", "Failed", err?.response?.data?.message ?? "Something went wrong"); 
            } finally {
                this.cancel();
                this.loading = false;
            }
        },
        handleSubmit(){
            this.$refs.formHelpdeskMoveConnote.handleSubmit();
        },
        handleClearForm() {
            this.form = {};
            this.flag = "";
            this.autoComplateUrl = "";
            this.node_location_id = "";
            this.selectedEditType = "";
            this.$refs.formHelpdeskMoveConnote.handleClearForm();
        },
        cancel() {
            this.handleClearForm();
            this.closeDialog();
        },
        updateValue(key, val, info){
            switch(key) {
                case "editType":
                    this.selectedEditType = this.edit_type_list.find(item => item.value == val).value;
                    break;
            }
        },
        onChangeCustom(type, val, obj) {
            switch (type) {
                case "destination_id":
                    if (typeof obj === "object") {
                        const { item, value } = obj;
                        if (item?.estimated_time_in_hour) {
                            this.estimated_time_in_hour = item.estimated_time_in_hour;
                            this.handleEta(this.etd, this.estimated_time_in_hour);
                        }
                    }
                    break;

                case "no_moda_angkutan_id":
                    if (typeof obj === "object" && obj.item) {
                        const { vehicle_max_weight, vehicle_type_id } = obj.item;
                        this.vehicle_max_weight = vehicle_max_weight;
                        this.vehicle_type_id = vehicle_type_id;
                    }
                    this.no_moda_angkutan_id = val;
                    break;
                default:
                    break;
            }
        },
    }
};
</script>
