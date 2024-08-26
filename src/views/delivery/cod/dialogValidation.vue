<template>
    <dialog-master 
        :actived="listenActive"
        :loading="listenLoading" 
        :closeDialog="cancel"
        width="md"
    >

        <template v-slot:header>
            Paid Deposit COD
        </template>

        <template v-slot:content>
            <vs-row justify="space-between">
                <vs-row>
                    <vs-col 
                        v-if="validHrsNumber.length > 0"
                        xs="12" 
                        sm="12" 
                        :lg="`${invalidHrsNumber.length > 0 ? '6':'12'}`"
                    >
                        <input-text-area 
                            id="valid_item"
                            label="Valid HRS Number"
                            v-model="validHrsNumberWithAmount"
                            :disabled="true"
                        />
                    </vs-col>
                    <vs-col xs="12" sm="12" lg="6" v-if="invalidHrsNumber.length > 0">
                        <input-text-area 
                            id="invalid_item"
                            label="Invalid HRS Number"
                            v-model="invalidHrsNumber"
                            :disabled="true"
                        />
                    </vs-col>
                </vs-row>
                <vs-row>
                    <vs-col xs="12" sm="12" lg="12">
                        <input-general
                            typeInput="text"
                            name="Total Amount COD (Rp)"
                            formKey="total_amount_cod"
                            :rules="''"
                            :valueData="Intl.NumberFormat('en-GB').format((listenTotalAmountCOD))"
                            :disabled="true"
                        />
                    </vs-col>
                </vs-row>
            </vs-row>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        danger
                        flat
                        :active="true"
                        @click="cancel"
                    >
                        Cancel
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        flat
                        :active="true"
                        type="submit"
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
import master from "@/mixins/master"
import InputGeneral from "@/components/input/general"
import InputTextArea from "@/components/input/textArea";
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
    name:"dialog-validation",
    mixins:[master],
    components: {
        "input-general": InputGeneral,
        "dialog-master": DialogMaster,
        "input-text-area": InputTextArea,
    },
    props: {
        closeDialog: Function, 
        active: Boolean,
        title: String,
        dataItem: Object,
        loadingValidation: Boolean,
        validItem: Array,
        invalidItem: Array,
        totalAmountCOD: Number,
    },
    computed: {
        listenActive(){
            return this.active;
        },
        listenDataItem() {
            return this.dataItem || {};
        },
        listenLoading(){
            return this.loadingValidation;
        },
        listenValidItem() {
            return this.validItem || [];
        },
        listenInvalidItem() {
            return this.invalidItem || [];
        },
        listenTotalAmountCOD() {
            return this.totalAmountCOD || 0;
        },
    },
    watch: {
        active: function (val) {
            if (val == true) {
                this.initDataItem()
            }
        }
    },
    data() {
        return {
            form: {},
            disabled: false,
            validHrsNumber: [],
            invalidHrsNumber: [],
            loading: false,
        }
    },
    methods: {
        initDataItem() {
            if (this.listenValidItem.length > 0) {
                this.validHrsNumber = this.listenValidItem
                    .filter(item => item.status === 'SUCCESS')
                    .map(item => item.hrs_number);
                this.validHrsNumberWithAmount = this.listenValidItem
                    .filter(item => item.status === 'SUCCESS')
                    .map(item => item.hrs_number + " (Rp" + Intl.NumberFormat('en-GB').format(item.amount_cod) + ")");
                this.invalidHrsNumber = this.listenInvalidItem
                    .filter(item => item.status !== 'SUCCESS')
                    .map(item => item.hrs_number);
            }
        },
        async handleSubmit() {
            this.loading = true;

            await axios
                .post(
                    this.URL.deposit_cod + `?n=${this.listenNodeId}`,
                    JSON.stringify({
                        hrs_numbers: this.validHrsNumber
                    }), 
                    this.Helper.header())
                .then(res => {
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification("success", null, "SUCCESS!", res.data.message);
                }).catch(err => {
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'COD Collect is Failed', err?.response?.data?.message ? err?.response?.data?.message : 'something went wrong')
                })
            
            this.loading = false;
        },
        cancel() {
            this.closeDialog()
        },
    },
}
</script>