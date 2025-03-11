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
                    ref="formFacilityCodeController" 
                    typeForm="facility_code"
                    :dataItem="listenDataItem"
                    :asynchronousSelect_url="autoCompleteUrl"
                    :permissionCreateSelect="checkPermission('create-facility-code')"
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
    name:"dialog-create-edit-facility-code",
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
            facility_code_id: "",
            autoCompleteUrl: null,
        }
    },
    computed: {
        listenActive(){
            if(this.active){
                this.getUrlUserName()
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
            const permissions = this.listenPermissions?.CORE || [];
            return permissions.includes(permission);
        },
        async getDataDetail(val){
            this.facility_code_id = val.facility_code_id

            let arr_user_id = []
            let arr = []
            val.users.map(item => {
                let obj = {}
                obj["label"] = item.user_name
                obj["value"] = item.user_id

                arr.push(obj)
                arr_user_id.push(item.user_id)
            })
            this.$store.dispatch("SET_FACILITY_CODE_USER_ID", arr_user_id)
            this.$store.dispatch("SET_FACILITY_CODE_USER_ID_ArrData", arr)
        },
        formData(form){
            const { facility_code_id, ...formWithoutId } = form;
            this.form = formWithoutId
            
            if (this.form.user_id === "" || this.form.user_id.length === 0) {
                this.openNotification('warn', null, 'Invalid input', 'User must not be empty')
                return
            }

            if(this.facility_code_id !== undefined && this.facility_code_id !== '') {
                this.updateData()
            } else {
                this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formFacilityCodeController.handleSubmit()
        },
        handleClearForm(){
            this.$refs.formFacilityCodeController.handleClearForm()
            this.form = {}
            this.facility_code_id = ""
        },
        getUrlUserName(){
            let url = this.URL.user +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
            this.autoCompleteUrl = url
        },
        async updateData(){
            await axios
                .put(
                    this.URL.facility_code + `/${this.facility_code_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('success', null, 'Update success', 'Update Facility Code is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Update failed', err?.response?.data?.message ?? err)
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.facility_code + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('success', null, 'Create Success', 'Create new Facility Code is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Create failed', err?.response?.data?.message ?? err)
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>