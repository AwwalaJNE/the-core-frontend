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
                <!-- <div v-if="selectedEditType === 'EDIT_BAG'">
                    <form-input-controller
                        key="formHelpdeskEditBag"
                        ref="formHelpdeskEditBag"
                        typeForm="helpdesk_edit_bag"
                        :dataItem="formHelpdeskEditBag"
                        @formData="formDataEditBag"
                        @onChangeCustom="onChangeCustom"
                    />
                </div> -->
                <div v-if="selectedEditType === 'MOVE_BAG'">
                    <form-input-controller 
                        key="formHelpdeskMoveBag"
                        ref="formHelpdeskMoveBag"
                        typeForm="helpdesk_move_bag"
                        :querySearch="querySearch"
                        @formData="formDataMoveBag"
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

import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import InputGeneral from "@/components/input/general";
import Selector from "@/components/input/select";
import TableMaster from "@/components/table/tableMaster";

export default {
    name: "dialog-helpdesk-edit-bag",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "table-master": TableMaster,
        "input-general": InputGeneral,
        "form-input-controller": FormInputController,
        "selector": Selector
    },
    props: {
        active: Boolean,
        closeDialog: Function, 
        bagNumber: String,
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
        listenBagNumber() {
            return this.bagNumber;
        },
    },
    watch: {
        active: function(val) {
            if (val == true) {
                this.getBag();
            }
        },
    },
    data() {
        return {
            formHelpdeskEditBag: {},
            formHelpdeskMoveBag: "",
            loading: false,
            selectedEditType: "",
            edit_type_list: [
                {
                    label: "Edit Bag Form",
                    value: "EDIT_BAG",
                },
                {
                    label: "Move Bag Location",
                    value: "MOVE_BAG",
                },
            ],
        };
    },
    methods: {
        async getBag() {
            this.loading = true;
                try {
                    let res = await axios.get(`${this.URL.bag}/${this.listenBagNumber}?n=${this.listenNodeId}`, this.Helper.header());
                    let val = res.data.data;
                    
                    
                    this.formHelpdeskMoveBag = val.current_node_id;
                    this.$store.dispatch(`SET_HELPDESK_MOVE_BAG_NODE_LOCATION_ID`, val?.node_name);
                    this.formHelpdeskEditBag = {
                        bag_shipper_name: val.bag_shipper_name,
                        bag_shipper_street_address: val.bag_shipper_street_address,
                        bag_shipper_email: val.bag_shipper_email,
                        bag_shipper_phone_number: val.bag_shipper_phone_number,
                        bag_receiver_name: val.bag_receiver_name,
                        bag_receiver_street_address: val.bag_receiver_street_address,
                        bag_receiver_email: val.bag_receiver_email,
                        bag_receiver_phone_number: val.bag_receiver_phone_number,
                        amount_cod: val.amount_cod,
                        amount_price: val.amount_price,
                        remarks: val.remarks
                    };
                } catch (err) {
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed to populate list',  err?.response?.data?.message ?? '');
                } finally {
                    this.loading = false;
                }

        },
        querySearch(queryString, cb){
            axios.get(this.URL.node +`?n=${this.listenNodeId}&s=${queryString}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
                let suggestions = [];
                result.length > 0 && result.map(item => {

                    suggestions.push({
                        value: item['node_name'],
                        data: item
                    });
                });

                cb(suggestions);
                })
            .catch(error => console.log("error", error));
        },
        formDataEditBag(){
            this.updateBag();
        },
        formDataMoveBag(form){
            if (form.node_location_id) {
                this.formHelpdeskMoveBag = form['node_location_id']['node_id'];
            }
            this.updateLocation();
        },
        async updateLocation(){
            this.loading = true;
            try {
                const res = await axios.patch(`${this.URL.bag}/${this.listenBagNumber}/move?n=${this.listenNodeId}&node_location_id=${this.formHelpdeskMoveBag}`, {}, this.Helper.header());
                this.openNotification("success", null, "Success", res?.data?.message);
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? "", "Failed", err?.response?.data?.message ?? "Something went wrong"); 
            } finally {
                this.cancel();
                this.loading = false;
                this.$router.push('/helpdesk/bag');
            }
        },
        async updateBag(){
            this.loading = true;
            try {
                const res = await axios.put(`${this.URL.bag}/${this.listenBagNumber}?n=${this.listenNodeId}`, JSON.stringify(this.formHelpdeskEditBag), this.Helper.header());
                this.openNotification("success", null, "Success", res?.data?.message);
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? "", "Failed", err?.response?.data?.message ?? "Something went wrong"); 
            } finally {
                this.cancel();
                this.loading = false;
            }
        },
        handleSubmit(){
            if (this.selectedEditType === "MOVE_BAG") {
                this.$refs.formHelpdeskMoveBag.handleSubmit();
            } else if (this.selectedEditType === "EDIT_BAG") {
                this.$refs.formHelpdeskEditBag.handleSubmit();
            }
        },
        handleClearForm() {
            this.formHelpdeskEditBag = {};
            this.formHelpdeskMoveBag = "";
            this.flag = "";
            this.autoComplateUrl = "";
            this.selectedEditType = "";
            
            if (this.selectedEditType === "MOVE_BAG") {
                this.$refs.formHelpdeskMoveBag.handleClearForm();
            } else if (this.selectedEditType === "EDIT_BAG") {
                this.$refs.formHelpdeskEditBag.handleClearForm();
            }
        },
        cancel() {
            this.handleClearForm();
            this.closeDialog();
        },        
        updateValue(key, val){
            if (key === "editType") {
                this.selectedEditType = this.edit_type_list.find(item => item.value === val)?.value;
            }
        },
        onChangeCustom(type, val, obj) {
            this.formHelpdeskEditBag[type] = val;
        },
    }
};
</script>
