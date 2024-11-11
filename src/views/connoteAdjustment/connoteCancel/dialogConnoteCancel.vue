<template>
    <dialog-master 
        width="md"
        :actived="listenActive" 
        :closeDialog="cancel"
        :loading="loading"
    >

        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <vs-row>
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="Connote Number"
                        typeInput="text"
                        :disabled="true"
                        :valueData="listenItemNumber"
                    />
                </vs-col>
            </vs-row>
            <vs-row>
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="Remark"
                        formKey="remark"
                        rules="required" 
                        typeInput="text"
                        :disabled="isDisabled"
                        :valueData="remark"
                        @updateValue="updateValue" 
                    />
                </vs-col>
            </vs-row>
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
                        :disabled="isDisabled"
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
import InputGeneral from "@/components/input/general";

export default {
    name:"connote-cancel-dialog",
    mixins:[master],
    components: {
        "dialog-master": DialogMaster,
        "input-general": InputGeneral,
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        dataItem: Object,
        itemNumber: String,
        title: String
    },
    computed: {
        listenActive(){
            return this.active;
        },
        listenTitle() {
            return this.title;
        },
        listenItemNumber() {
            return this.itemNumber;
        }
    },
    watch: {
        dataItem: function (val) {
            if (val !== undefined) {
                this.request_id = val.request_id;
                this.remark = val.remark;
                this.isDisabled = val.isDisabled;
            }
        }
    },
    data() {
        return {
            request_id: '',
            isDisabled: false,
            remark: '',
            loading: false
        }
    },
    methods: {
        updateValue(key, val){
            switch(key) {
                case "remark":
                    this.remark= val;
                    break;
                default:
            }
        },
        async handleSubmit() {
            let form = {
                item_number: this.listenItemNumber,
                remark: this.remark
            }
            
            this.loading = true;
            try {
                const res = this.request_id ? await axios.put(`${this.URL.connote_cancel}/${this.request_id}?n=${this.listenNodeId}`, form, this.Helper.header()) : await axios.post(`${this.URL.connote_cancel}?n=${this.listenNodeId}`, form, this.Helper.header());
                this.openNotification('success', null, "Success", "Request cancel connote is success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
                this.cancel();
                this.$emit("handleClearInput");
                this.$emit("refresh");
            }
        },
        handleClearForm(){
            this.$emit("handleClearInput");
            this.remark= '';
            this.request_id = '';
        },
        cancel() {
            this.handleClearForm();
            this.closeDialog();
        }
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    }
}
</script>