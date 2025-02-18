<template>
    <dialog-master 
    :actived="listenActive" 
    :loading="listenLoading"
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller 
                    ref="formUserController"
                    typeForm="user"
                    :asynchronousSelect_url="autoComplateUrl"
                    :dataItem="listenDataItem"
                    :selectValue="input_value"
                    :selectLabel="input_label"
                    @formData="formData"
                    @inputFocus="inputFocus"
                />
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
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
                    block
                    flat
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
import DialogMaster from "@/components/dialog/dialogMaster"
import FormInputController from "@/components/form/formInputController"
export default {
    name:"dialog-create-edit-user",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
    },
    props: {
       openDialogUser: Function,
       closeDialogUser: Function,
       finishGetUser: Function,
       refresh: Function,
       active: Boolean,
       title: String,
       dataItem: Object,
       btnRed: String,
       btnBlue: String
    },
    data() {
        return {
            form: {},
            formUser: this.$store.getters.getInputs.user ? this.$store.getters.getInputs.user : {},
            user_id: '',
            dataRole: [],
            dataApplicationRole: [],
            loadingDataRole: false,
            loadingDataNode: false,
            loadingDataApplicationList: false,
            autoComplateUrl: null,
            input_value: '',
            input_label: ''
        }
    },
    computed: {
        listenActive(){
            if(this.active){
                this.getDataRole()
                this.getDataEmployee()
                this.getApplicationList();
            }
            return this.active
        },
        listenTitle(){
            return this.title
        },
        listenDataItem() {
            return this.dataItem
        },
        listenLoading() {
            return this.loadingDataRole || this.loadingDataNode || this.loadingDataApplicationList
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.user_id = val.user_id
                this.getDataDetail(val);
                this.getUserDetail()
                // this.user_node_id = val.user_nodes
            }
        }
    },
    methods: {
        getDataDetail(val) {
            if (val.app_role.length > 0) {
                let template = this.$store.getters.getInputs.user.dynamicinputcomponent_user_other_application_role.inputs;
                let arr = val.app_role.map(item => ({
                    inputs: template.map(field => ({
                        ...field,
                        value: field.key === "user_application_name" 
                            ? item.app
                            : field.key === "user_application_role" 
                                ? item.role.map(roleItem => roleItem.app_role_id)
                                : field.value,
                        data: field.key === "user_application_name" 
                            ? {}
                            : item.role.map(roleItem => ({
                                label: roleItem.app_role_name,
                                value: roleItem.app_role_id
                            }))
                    }))
                }));

                let dataInfo = val.app_role.flatMap(item => 
                    item.role.map(roleItem => ({
                        label: roleItem.app_role_name,
                        value: roleItem.app_role_id
                    }))
                );

                this.$store.dispatch("SET_USER_DYNAMICINPUTCOMPONENT_USER_OTHER_APPLICATION_ROLE", arr);
                this.$store.dispatch("SET_USER_USER_APPLICATION_ROLE_ArrData", dataInfo);
            }
        },
        formData(form){
            if (form.dynamicinputcomponent_user_additional_role) {
                let additional_role = []
                let additional_node = []
                let expiry_additional_role = []
                form.dynamicinputcomponent_user_additional_role.map((item, index) =>{
                    additional_role.push(item.inputs[0].value)
                    additional_node.push(item.inputs[1].value)
                    expiry_additional_role.push(item.inputs[2].value)
                })
                form.user_additional_role_id = additional_role;
                form.user_additional_node_id = additional_node;
                form.user_expiry_additional_role = expiry_additional_role;
            }
            if (form.dynamicinputcomponent_user_other_application_role) {
                let application_name = []
                let application_role = []
                form['app_role'] = form.dynamicinputcomponent_user_other_application_role.map(item => ({
                    app: item.inputs[0].value,
                    role: item.inputs.slice(1).map(roleItem => roleItem.value)[0] // Collects all role values in an array
                }));
            }
            if(this.user_id !== undefined && this.user_id !== '') {
                    let obj = form
                    if(obj["password"] == '') {
                        delete obj.password
                    }
                    this.form = obj
                    this.updateData()
            } else {                    
                    this.form = form
                    this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formUserController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formUserController.handleClearForm()
            this.form = {}
            this.user_id = ""
        },
        inputFocus(obj){
            if (obj.key === 'user_node_id' || obj.key.includes('user_additional_node_id')){
                this.autoComplateUrl = this.URL.node +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
                this.input_value = "node_id";
                this.input_label = "node_name";
            } else if (obj.key.includes('user_application_role')) {
                this.autoComplateUrl = this.URL.role +'?n='+ this.listenNodeId +'&sort_order=desc&limit=10&page=1';
                this.input_value = "user_role_id";
                this.input_label = "user_role_name";
            }
        },
        async getApplicationList(){
            this.loadingDataApplicationList = true
            await axios
                .get(this.URL.application_list + `?n=${this.listenNodeId}&limit=-1`, 
                this.Helper.header())
                .then(res => {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.lov_value
                            obj["value"] = item.lov_value

                            arr.push(obj)
                        })
                        this.dataApplicationRole = arr
                        this.$store.dispatch("SET_USER_USER_APPLICATION_NAME_ArrData", arr)
                    
                    this.loadingDataApplicationList = false
                }).catch(err => {
                    this.loadingDataApplicationList = false
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                })
        },
        async getDataRole(){
            this.loadingDataRole = true
            await axios
                .get(this.URL.role + `?n=${this.listenNodeId}&limit=-1`, 
                this.Helper.header())
                .then(res => {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.user_role_name
                            obj["value"] = item.user_role_id

                            arr.push(obj)
                        })
                        this.dataRole = arr
                        this.$store.dispatch("SET_USER_USER_ROLE_ID_ArrData", arr)
                        this.$store.dispatch("SET_USER_USER_ADDITIONAL_ROLE_ID_ArrData", arr)
                    
                    this.loadingDataRole = false
                }).catch(err => {
                    this.loadingDataRole = false
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                })
        },
        async getDataEmployee(){
            await axios
                .get(this.URL.employee +
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.employee_name
                            obj["value"] = item.employee_id

                            arr.push(obj)
                        })
                        this.$store.dispatch("SET_USER_EMPLOYEE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
                    }

                }).catch(err => {
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                })
        },
        async getUserDetail(){
            this.loadingDataRole = true
            await axios
                .get(this.URL.user + `/${this.user_id}?n=${this.listenNodeId}`, 
                this.Helper.header())
                .then(res => {
                    let arr = []
                    let nodeArr = []
                    
                    // if (res.data.data.user_additional_role_id.length > 0) {
                    //     for (let i = 0; i < res.data.data.user_additional_role_id.length; i++) {
                    //         let obj = {};

                    //         obj["user_additional_role_id"] = res.data.data.user_additional_role_id[i]
                    //         obj["user_additional_node_id"] = res.data.data.user_additional_node_id[i]
                    //         obj["user_expiry_additional_role"] = res.data.data.user_expiry_additional_role[i]

                    //         arr.push(obj)
                    //     }
                    // }
                    
                    res.data.data.user_nodes.map(item => {
                        let obj = {}
                        obj["label"] = item.node_name
                        obj["value"] = item.node_id

                        nodeArr.push(obj)
                    })
                    this.$store.dispatch("SET_USER_DYNAMICINPUTCOMPONENT_USER_ADDITIONAL_ROLE", arr)
                    // this.$store.dispatch("SET_USER_USER_NODE_ID", res.data.data.user_node_id)
                    // this.dataItem["user_node_id"] = res.data.data.user_node_id
                    
                    this.$store.dispatch("SET_USER_USER_ADDITIONAL_NODE_ID_ArrData", nodeArr)
                    this.$store.dispatch("SET_USER_USER_NODE_ID_ArrData", nodeArr)
                    this.finishGetUser()
                }).catch(err => {
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed!', 'Failed to get data user')
                    this.finishGetUser()
                })
            this.$nextTick(() => {
                this.openDialogUser()
            });
        },
        async updateData() {
            await axios
                .put(
                    this.URL.user + `/${this.user_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialogUser()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Update user is success')
                }).catch(err => {
                    this.loading = false
                    this.checkAuth(err.response)
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.user + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialogUser()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Create user is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.checkAuth(err.response)
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed add data', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialogUser()
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>