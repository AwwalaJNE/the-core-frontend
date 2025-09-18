<template>
    <dialog-master 
        width="md"
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
                    ref="formActiveBagWeight" 
                    typeForm="active_bag_weight"
                    :dataItem="listenDataItem"
                    :querySearch="querySearch"
                    :data-testid="`form`"
                    @formData="formData"
                    @inputFocus="inputFocus"
                    @onChangeCustom="onChangeCustom"
                />
            </div>
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
                        :data-testid="`cancel-button`"
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
                        :data-testid="`submit-button`"
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
import master from "@/mixins/master"

import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import Selector from "@/components/input/select";

export default {
    name:"active-bag-weight-dialog",
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
       title: String,
    },
    data() {
        return {
            form: {},
            loading: false,
            active_bag_weight_id: "",
            autoCompleteUrl: "",
            input_value: "",
            input_label: ""
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
        listenDestinationType() {
            return this.$store.getters.getInputs.active_bag_weight.destination_type.value;
        },
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.getEditData(val);
            }
        },
        listenDestinationType: function (val, oldVal) {
            if (val !== undefined && val !== oldVal) {
                this.autoCompleteUrl = null;
                this.input_value = "";
            }
        },
    },
    methods: {
        getEditData(val) {
            this.active_bag_weight_id = val.active_bag_weight_id;
            
            if (val.destination.length > 0) {
                const { destination } = val;

                const [mainDestination, ...otherDestination] = destination;

                this.$store.dispatch("SET_ACTIVE_BAG_WEIGHT_DESTINATION_TYPE", mainDestination.destination_type);
                this.$store.dispatch("SET_ACTIVE_BAG_WEIGHT_DESTINATION_VALUE", mainDestination.destination_value);
                this.$store.dispatch("SET_ACTIVE_BAG_WEIGHT_DESTINATION_VALUE_ValueData", mainDestination.destination_value);
                this.$store.dispatch("SET_ACTIVE_BAG_WEIGHT_HELPER_DYNAMIC_DESTINATION_TYPE", mainDestination.active_bag_weight_detail_id); // NOTES: HELPER TO GET ID

                if (otherDestination.length) {
                    const template = this.$store.getters.getInputs.active_bag_weight.dynamicinputcomponent_other_destination.inputs;

                    const arr = otherDestination.map(({ active_bag_weight_detail_id, destination_type, destination_value }) => ({
                        inputs: template.map(field => ({
                            ...field,
                            id: active_bag_weight_detail_id,
                            value:
                                field.key === "helper_dynamic_destination_type"
                                    ? destination_type
                                    : field.key === "helper_dynamic_destination_value"
                                        ? destination_value || ""
                                        : field.value
                        }))
                    }));

                    this.$store.dispatch("SET_ACTIVE_BAG_WEIGHT_DYNAMICINPUTCOMPONENT_OTHER_DESTINATION", arr);
                }
            }
            this.dataItem = val;
        },
        formData(form){
            const { 
                dynamicinputcomponent_other_destination, 
                destination_type, 
                destination_value,
                helper_dynamic_destination_type, 
                helper_dynamic_destination_value,
                ...formPayload 
            } = form;

            formPayload['destination'] = [{
                ...(this.active_bag_weight_id && helper_dynamic_destination_type && {
                    active_bag_weight_detail_id: helper_dynamic_destination_type || ""
                }),
                destination_type,
                destination_value
            }]

            if (Array.isArray(form.dynamicinputcomponent_other_destination) && form.dynamicinputcomponent_other_destination.length) {
                formPayload['destination'].push(
                    ...form.dynamicinputcomponent_other_destination
                        .map(item => ({
                            ...(this.active_bag_weight_id && item?.inputs?.[0]?.id &&{
                                active_bag_weight_detail_id: item?.inputs?.[0]?.id || ""
                            }),
                            destination_type: item.inputs?.[0]?.value || "",
                            destination_value: item.inputs?.[1]?.value || ""
                        }))
                        .filter(item => item.destination_type && item.destination_value) // Remove empty values
                );
            }

            this.form = formPayload;
            this.handleSubmitData();
        },
        handleSubmit(){
            this.$refs.formActiveBagWeight.handleSubmit();
        },
        async handleSubmitData() {
            this.loading = true;
            try {
                const res = this.active_bag_weight_id ? await axios.put(`${this.URL.active_bag_weight}/${this.active_bag_weight_id}?n=${this.listenNodeId}`, this.form, this.Helper.header()) : await axios.post(`${this.URL.active_bag_weight}?n=${this.listenNodeId}`, this.form, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || this.active_bag_weight_id ? "Success Update Data" : "Success Create Data");
                this.cancel();
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        handleClearForm(){
            this.$refs.formActiveBagWeight.handleClearAllForm();
            this.form = {}
            this.active_bag_weight_id = ""
        },
        cancel() {
            this.closeDialog();
            this.handleClearForm();
            this.$emit("refresh");
        },
        async querySearch(queryString, cb) {
            try {
                const res = await axios.get(this.autoCompleteUrl + `&s=${queryString}`, this.Helper.header());
                const result = res.data.data || [];
                const suggestions = result.map(item => {
                    return { 
                        value: item[this.input_label], 
                        data: String(item[this.input_value]) 
                    };
                });
                cb(suggestions);
            } catch (error) {
                console.error("error", error);
            }
        },
        inputFocus(obj){
            if (obj.key.includes("destination_value")) {
                let destination_type = this.listenDestinationType;

                if (obj.key.includes("|")) {
                    let index = obj.key.split("|")[0];
                    let parsedIndex = isNaN(index) ? index : parseInt(index, 10);

                    destination_type = Number.isInteger(parsedIndex)
                        ? this.$store.getters.getInputs.active_bag_weight.dynamicinputcomponent_other_destination.arrData?.[parsedIndex]?.inputs[0]?.value
                        : this.$store.getters.getInputs.active_bag_weight.destination_value.value;
                }

                switch(destination_type) {
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
                        this.input_label = "node_code";
                        break;
                    default:
                }
            }
        },
        onChangeCustom(type, val, obj) {
            switch (type) {
                case "destination_type":
                    this.$store.dispatch("SET_ACTIVE_BAG_WEIGHT_DESTINATION_VALUE", "");
                    this.$store.dispatch("SET_ACTIVE_BAG_WEIGHT_DESTINATION_VALUE_ValueData", "");
                    break;
                case "dynamicinputcomponent_other_destination":
                    switch (obj?.typeInput) {
                        case "select":
                        case "select|hidden":
                            let index = obj?.option?.index;

                            let latest_data = val;
                            latest_data[index].inputs[1].value = "";
                            latest_data[index].inputs[1].data = "";
                            latest_data[index].inputs[1].id = "";

                            this.$store.dispatch("SET_ACTIVE_BAG_WEIGHT_DYNAMICINPUTCOMPONENT_OTHER_DESTINATION", latest_data);
                            break;
                        case "autocomplete":
                        case "autocomplete|hidden":
                            let index_ = obj?.option?.index;
                            let selected_ = obj?.option?.value;

                            let latest_data_ = val;
                            latest_data_[index_].inputs[1].value = selected_;
                            latest_data_[index_].inputs[1].id = "";
                            latest_data_[index_].inputs[0].id = "";

                            this.$store.dispatch("SET_ACTIVE_BAG_WEIGHT_DYNAMICINPUTCOMPONENT_OTHER_DESTINATION", latest_data_);
                            break;
                        default:
                            break;
                    }
                    break;
                default:
            }
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>