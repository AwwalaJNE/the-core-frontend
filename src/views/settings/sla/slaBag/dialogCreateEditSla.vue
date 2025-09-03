<template>
    <dialog-master
        width="lg"
        :actived="listenActive" 
        :closeDialog="cancel"
    >
        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller
                    ref="formSlaController"
                    typeForm="sla_bag"
                    @formData="formData"
                    @inputFocus="inputFocus"
                    :dataItem="listenDataItem"
                    :querySearch="querySearch"
                    :querySearch1="getBagDataType"
                    :querySearch2="getReferenceEntity"
                    :querySearch3="getSlaType"
                    :data-testid="`form`"
                    
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
import axios from 'axios';
import master from "@/mixins/master";
import FormInputController from "@/components/form/formInputController"
import DialogMaster from "@/components/dialog/dialogMaster"
import Selector from "@/components/input/select"

export default {
    name:"dialog-create-edit-sla",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "selector": Selector
    },
    props: {
       closeDialog: Function,
       active: Boolean,
       title: String,
       dataItem: Object,
       btnRed: String,
       btnBlue: String
    },
    data() {
        return {
            form: {},
            bagTypeArray: [
                {
                    label: "BAG",
                    value: "BAG"
                },
                {
                    label: "MASTERBAG",
                    value: "MASTERBAG"
                }
            ],
            slaTypeArray: [
                {
                    label: "FLAT",
                    value: "FLAT"
                },
                {
                    label: "INCREMENTAL",
                    value: "INCREMENTAL"
                }
            ],
            referenceEntityArray: [
                {
                    label: "NODE",
                    value: "NODE"
                },
                {
                    label: "ORIGIN",
                    value: "ORIGIN",
                },
                {
                    label: "BRANCH",
                    value: "BRANCH",
                },
                {
                    label: "REGION",
                    value: "REGION",
                }
            ],
            referenceValueArray: [],
            sla_id: "",
            queryReferenceEntity: "",
            queryReferenceValue: "",
            loadingDataRefEntity: false,
            loadingDataRefValue: false,
            autoCompleteUrl: null,
            input_value: "",
        }
    },
    computed: {
        listenActive(){
            if (this.active) {
                this.getBagDataType()
                this.getReferenceEntity()
                this.getSlaType()
            }
            return this.active
        },
        listenTitle() {
            return this.title
        },
        listenDataItem() {
            return this.dataItem
        },
        listenEntity() {
            return this.$store.getters.getInputs.sla_bag.reference_entity.value;
        }
    },
    watch: {
        dataItem: function (val) {
            if (val !== undefined) {
                this.sla_id = val.sla_bag_id
                this.getDataDetail(val)
            }
        },
        listenEntity: function (val, oldVal) {
            if (val !== undefined && this.listenEntity !== oldVal) {
                this.autoCompleteUrl = null;
                this.input_value = "";
            }
        },
    },
    methods: {
        checkPermission(permission) {
            const permissions = this.$lis.get('permissions') || [];
            return permissions.includes(permission);
        },
        formData(form) {
            for (const key in form) {
                if (key.endsWith('_radio')) {
                    const baseKey = key.slice(0, -6);
                    const radioValue = form[key];
                    const relatedKey = baseKey + (form.hasOwnProperty(baseKey) ? '' : '_radio');
                    
                    if (form.hasOwnProperty(relatedKey)) {
                        switch (radioValue) {
                            case 'hari':
                                form[relatedKey] *= 24 * 60;
                                this.$store.dispatch("SET_SLA_BAG_" + relatedKey.toUpperCase() + "_ArrData", 'menit');
                                break;
                            case 'jam':
                                form[relatedKey] *= 60;
                                this.$store.dispatch("SET_SLA_BAG_" + relatedKey.toUpperCase() + "_ArrData", 'menit');
                                break;
                            case 'menit':
                                break;
                            default:
                                break;
                        }

                        delete form[key];
                    }
                }
            }
            
            this.form = form
            if(this.sla_id !== undefined && this.sla_id !== '') {
                this.form.node_code = this.dataItem.node_code
                this.updateData()
            } else {
                this.addData()
            }
        },
        async getDataDetail(val){
            this.sla_id = val.sla_bag_id;

            let curr_reference_value_arr = [{
                label: val.reference_value,
                value: val.reference_value
            }]

            this.$store.dispatch("SET_SLA_BAG_REFERENCE_VALUE", val.reference_value);
            this.$store.dispatch("SET_SLA_BAG_REFERENCE_VALUE_ValueData", val.reference_value);
            this.$store.dispatch("SET_SLA_BAG_REFERENCE_VALUE_ArrData", curr_reference_value_arr);
        },
        onChangeCustom(type, val, obj) {
            switch (type) {
                case "reference_entity":
                    this.$store.dispatch("SET_SLA_BAG_REFERENCE_VALUE", "");
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
        getBagDataType(){
            this.$store.dispatch("SET_SLA_BAG_BAG_TYPE_ArrData", this.bagTypeArray)
        },
        getSlaType() {
            this.$store.dispatch("SET_SLA_BAG_SLA_TYPE_ArrData", this.slaTypeArray)
        },
        getReferenceEntity() {
            this.$store.dispatch("SET_SLA_BAG_REFERENCE_ENTITY_ArrData", this.referenceEntityArray)
        },
        handleSubmit() {
            this.$refs.formSlaController.handleSubmit()
        },
        compareSharedProperties(obj1, obj2) {
            const keys1 = Object.keys(obj1).filter(key => key !== 'is_active');
            for (const key of keys1) {
                if (obj1[key] !== obj2[key]) {
                    return false;
                }
            }
            return true;
        },
        async updateData(){
            const isActiveDifferent = this.form.is_active !== this.dataItem.is_active;
            const areOthersEqual = this.compareSharedProperties(this.form, this.dataItem);

                if (this.form.is_active == true) {
                    this.form.is_active = '1'
                } else {
                    this.form.is_active = '0'
                }

            if (isActiveDifferent && areOthersEqual) {
                await axios
                    .patch(
                        this.URL.sla_bag + `/${this.sla_id}?n=${this.listenNodeId}`,
                        JSON.stringify({
                            is_active: this.form.is_active
                        }), 
                        this.Helper.header())
                    .then(res => {
                        this.handleClearForm()
                        this.closeDialog()
                        this.$emit("refresh")
                        this.openNotification(null, 'Update success', 'Update sla is success')
                    }).catch(err => {
                        this.loading = false
                        this.closeDialog()
                        this.$emit("refresh")
                        this.openNotification('danger', err.response ? err.response.data.code : '', 'Update failed', err.response.data.message)
                    })
            } else {
                await axios
                    .put(
                        this.URL.sla_bag + `/${this.sla_id}?n=${this.listenNodeId}`,
                        JSON.stringify(this.form), 
                        this.Helper.header())
                    .then(res => {
                        this.handleClearForm()
                        this.closeDialog()
                        this.$emit("refresh")
                        this.openNotification(null, 'Update success', 'Update sla is success')
                    }).catch(err => {
                        this.loading = false
                        this.closeDialog()
                        this.$emit("refresh")
                        this.openNotification('danger', err.response ? err.response.data.code : '', 'Update failed', err.response.data.message)
                    })
            }
        },
        async addData() {
            if (this.form.is_active == true) {
                this.form.is_active = '1'
            } else {
                this.form.is_active = '0'
            }

            await axios
                .post(
                    this.URL.sla_bag + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create Success', 'Create new sla is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Create failed', err.response.data.message)
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.sla_bag_id === val.sla_bag_id
                })
                this.dataItem = obj[0]
                this.$nextTick(() => {
                    this.dialogSla = true
                });
            }
        },
        handleClearForm(){
            this.$refs.formSlaController.handleClearForm()
            this.form = {}
            this.sla_id = ""
        },  
    },
    mounted() {}
}
</script>