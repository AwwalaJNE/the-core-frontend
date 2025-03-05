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
                    ref="formConfigurationWarningRunsheetController" 
                    typeForm="configuration_warning_runsheet"
                    :dataItem="listenDataItem"
                    :asynchronousSelect_url="autoCompleteUrl"
                    :permissionCreateSelect="checkPermission('create-warning-koli-setting')"
                    @formData="formData"
                />
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end" style="margin-top: 2pc;">
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
import master from "@/mixins/master"
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
            loadingDataName: false,
            setting_id: "",
            nodeNameArray: [],
            referenceArray: [
                {
                    label: "SHIPPER",
                    value: "SHIPPER"
                },
                {
                    label: "RECEIVER",
                    value: "RECEIVER"
                },
                {
                    label: "ALL",
                    value: "ALL"
                }
            ],
            autoCompleteUrl: null,
        }
    },
    computed: {
        listenActive(){
            if(this.active){
                this.getDataReference()
                this.getUrlNodeName()
            }
            return this.active
        },
        listenTitle(){
            return this.title
        },
        listenDataItem() {
            return this.dataItem
        },
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.getDataDetail(val)
            }
        }
    },
    methods: {
        checkPermission(permission) {
            const permissions = this.listenPermissions?.core || [];
            return permissions.includes(permission);
        },
        async getDataDetail(val){
            this.setting_id = val.setting_id

            let arr_node_id = []
            let arr = []
            val.node.map(item => {
                let obj = {}
                obj["label"] = item.node_name
                obj["value"] = item.node_id

                arr.push(obj)
                arr_node_id.push(item.node_id)
            })
            this.$store.dispatch("SET_CONFIGURATION_WARNING_RUNSHEET_NODE_ID", arr_node_id)
            this.$store.dispatch("SET_CONFIGURATION_WARNING_RUNSHEET_NODE_ID_ArrData", arr)
        },
        formData(form){
            const { setting_id, ...formWithoutId } = form;
            this.form = formWithoutId

            if(this.setting_id !== undefined && this.setting_id !== '') {
                this.updateData()
            } else {
                this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formConfigurationWarningRunsheetController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formConfigurationWarningRunsheetController.handleClearForm()
            this.form = {}
            this.setting_id = ""
        },   
        getDataReference(){
            this.$store.dispatch("SET_CONFIGURATION_WARNING_RUNSHEET_REFERENCE_ArrData", this.referenceArray)
        }, 
        getUrlNodeName(){
            let url = this.URL.node +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
            this.autoCompleteUrl = url
        },
        async updateData(){
            await axios
                .put(
                    this.URL.configuration_warning_runsheet + `/${this.setting_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Update success', 'Update Warning Runsheet is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Update failed', err.response.data.message)
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.configuration_warning_runsheet + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create Success', 'Create new Warning Runsheet is success')
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
    },
    created() {
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>