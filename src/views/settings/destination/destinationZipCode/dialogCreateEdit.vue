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
                    typeForm="destination_zip_code"
                    :querySearch="querySearch"
                    :asynchronousSelect_url="listenAsyncUrl"
                    :limitExist="true"
                    @formData="formData"
                    @inputFocus="inputFocus"
                    @onChangeCustom="onChangeCustom"
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

import FormInputController from "@/components/form/formInputController";
import DialogMaster from "@/components/dialog/dialogMaster";
import Selector from "@/components/input/select";

export default {
    name:"destination-zip-code-dialog",
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
        dataItem: Object,
        closeDialog: Function,
        title: String
    },
    data() {
        return {
            form: {},
            id: "",
            autoCompleteUrl: null,
            input_value: "",
            loading: false,
        }
    },
    computed: {
        listenActive(){
            return this.active;
        },
        listenTitle(){
            return this.title;
        },
        listenDataItem() {
            return this.dataItem;
        },
        listenLoading() {
            return this.loading;
        },
        listenEntity() {
            return this.$store.getters.getInputs.destination_zip_code.reference_entity.value;
        },
        listenAsyncUrl() {
            return this.URL.zip_code_list +'?n='+ this.listenNodeId
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.getDataDetail(val)
            }
        },
        listenEntity: function (val, oldVal) {
            if (val !== undefined && this.reference_entity !== oldVal) {
                this.autoCompleteUrl = null;
                this.input_value = "";
            }
        },
    },
    methods: {
        async getDataDetail(val){
            this.id = val.id;

            let curr_reference_value_arr = [{
                label: val.reference_value,
                value: val.reference_value
            }]

            let curr_zip_code_arr = []
            val.zip_code.map((itm) => {
                curr_zip_code_arr.push({
                    label: itm,
                    value: itm
                })
            });
            this.$store.dispatch("SET_DESTINATION_ZIP_CODE_REFERENCE_ENTITY", val.reference_entity);

            this.$store.dispatch("SET_DESTINATION_ZIP_CODE_REFERENCE_VALUE", val.reference_value);
            this.$store.dispatch("SET_DESTINATION_ZIP_CODE_REFERENCE_VALUE_ValueData", val.reference_value);
            this.$store.dispatch("SET_DESTINATION_ZIP_CODE_REFERENCE_VALUE_ArrData", curr_reference_value_arr);

            this.$store.dispatch("SET_DESTINATION_ZIP_CODE_ZIP_CODE", val.zip_code);
            this.$store.dispatch("SET_DESTINATION_ZIP_CODE_ZIP_CODE_ArrData", curr_zip_code_arr);
        },
        formData(form){
            const { destination_zipcode_id, id, ...formWithoutId } = form;
            this.form = formWithoutId;
            this.handleSubmitData();
        },
        onChangeCustom(type, val, obj) {
            switch (type) {
                case "reference_entity":
                    this.$store.dispatch("SET_DESTINATION_ZIP_CODE_REFERENCE_VALUE", "");
                    break;
                default:
            }
        },
        inputFocus(obj){
            if(obj.key == 'reference_value' && this.listenEntity){
                switch(this.listenEntity) {
                    case "REGION":
                        this.autoCompleteUrl = this.URL.regional_list +'?n='+ this.listenNodeId +'&sort_order=desc&limit=10&page=1';
                        this.input_value = "regional_code";
                        this.input_label = "regional_code";
                        break;
                    case "BRANCH":
                        this.autoCompleteUrl = this.URL.branch_list +'?n='+ this.listenNodeId +'&sort_order=desc&limit=10&page=1';
                        this.input_value = "branch_code";
                        this.input_label = "branch_code";
                        break;
                    case "ORIGIN":
                        this.autoCompleteUrl = this.URL.origin_list +'?n='+ this.listenNodeId +'&sort_order=desc&limit=10&page=1';
                        this.input_value = "origin_code";
                        this.input_label = "origin_code";
                        break;
                    case "NODE":
                        this.autoCompleteUrl = this.URL.node_list +'?n='+ this.listenNodeId +'&sort_order=desc&limit=10&page=1';
                        this.input_value = "node_code";
                        this.input_label = "node_name";
                        break;
                    case "USER":
                        this.autoCompleteUrl = `${this.URL.user_list}?n=${this.listenNodeId}&sort_order=desc&limit=10&page=1`;
                        this.input_value = "user_login";
                        this.input_label = "user_name";
                        break;
                    default:
                }
            }
        },
        querySearch(queryString, cb){
            axios.get(this.autoCompleteUrl +`?n=${this.listenNodeId}&s=${queryString}`,
                this.Helper.header()
            )
            .then(res => {
                let result = res.data.data
                let suggestions = [];
                result.length > 0 && result.map(item => {
                    suggestions.push({
                        value: item[this.input_label],
                        data: String(item[this.input_value])
                    });
                });
                cb(suggestions);
                })
            .catch();
        },
        async handleSubmitData() {
            this.loading = true;
            try {
                const res = this.id ? await axios.put(`${this.URL.destination_zip_code}/${this.id}?n=${this.listenNodeId}`, this.form, this.Helper.header()) : await axios.post(`${this.URL.destination_zip_code}?n=${this.listenNodeId}`, this.form, this.Helper.header());
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
            this.form = {}
            this.id = ""
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