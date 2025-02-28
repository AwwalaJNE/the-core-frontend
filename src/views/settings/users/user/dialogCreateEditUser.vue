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
                    :isNestedData="isNestedData"
                    :nestedKey="nestedKey"
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
       closeDialogUser: Function,
       refresh: Function,
       active: Boolean,
       title: String,
       dataItem: Object,
       btnBlue: String
    },
    data() {
        return {
            form: {},
            formUser: this.$store.getters.getInputs.user ? this.$store.getters.getInputs.user : {},
            user_id: '',
            loading: false,
            autoComplateUrl: null,
            input_value: '',
            input_label: '',
            isNestedData: false,
            nestedKey: ''
        }
    },
    computed: {
        listenActive(){
            if (this.active){
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
            return this.loading
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.user_id = val.user_id
                this.getDataDetail(val);
            }
        }
    },
    methods: {
        getDataDetail(val) {
            if (val.app_role.length > 0) {
                const { app_role } = val;

                const [mainAppRole, ...otherAppRoles] = app_role;

                this.$store.dispatch("SET_USER_USER_APPLICATION_NAME", mainAppRole.app);
                this.$store.dispatch("SET_USER_USER_APPLICATION_ROLE", mainAppRole.role?.[0]?.app_role_id || "");

                if (otherAppRoles.length) {
                    const template = this.$store.getters.getInputs.user.dynamicinputcomponent_user_other_application_role.inputs;

                    const arr = otherAppRoles.map(({ app, role }) => ({
                        inputs: template.map(field => ({
                            ...field,
                            value: field.key === "user_application_name" 
                                ? app
                                : field.key === "user_application_role" 
                                    ? role?.[0]?.app_role_id || ""
                                    : field.value,
                            data: field.key === "user_application_name" 
                                ? {}
                                : role.map(({ app_role_name, app_role_id }) => ({
                                    label: app_role_name,
                                    value: app_role_id
                                }))
                        }))
                    }));

                    this.$store.dispatch("SET_USER_DYNAMICINPUTCOMPONENT_USER_OTHER_APPLICATION_ROLE", arr);
                }

                const dataInfo = val.app_role.flatMap(item => 
                    item.role.map(roleItem => ({
                        label: roleItem.app_role_name,
                        value: roleItem.app_role_id
                    }))
                );

                this.$store.dispatch("SET_USER_USER_APPLICATION_ROLE_ArrData", dataInfo);
            }


            if (val.user_nodes.length > 0) {
                let arr_node_id = []
                let arr = []
                val.user_nodes.map(item => {
                    let obj = {}
                    obj["label"] = item.node_name
                    obj["value"] = item.node_id

                    arr.push(obj)
                    arr_node_id.push(item.node_id)
                })
                this.$store.dispatch("SET_USER_USER_NODE_ID", arr_node_id)
                this.$store.dispatch("SET_USER_USER_NODE_ID_ArrData", arr)
            }

            console.log("A", val, this.$store.getters.getInputs.user)
        },
        formData(form){
            const { 
                dynamicinputcomponent_user_other_application_role, 
                user_application_name, 
                user_application_role,
                ...formPayload 
            } = form;

            formPayload['app_role'] = [{
                app: user_application_name,
                role: [user_application_role]
            }]
            
            if (Array.isArray(form.dynamicinputcomponent_user_other_application_role) && form.dynamicinputcomponent_user_other_application_role.length) {
                formPayload['app_role'].push(
                    ...form.dynamicinputcomponent_user_other_application_role.map(item => ({
                        app: item.inputs?.[0]?.value || "",
                        role: Array.isArray(item.inputs?.[1]?.value) ? item.inputs[1].value : [item.inputs?.[1]?.value]
                    }))
                );
            }

            if (this.user_id !== undefined && this.user_id !== '') {
                let obj = formPayload
                if(obj["password"] == '') {
                    delete obj.password
                }
                this.form = obj
                this.updateData()
            } else {                    
                this.form = formPayload
                this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formUserController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formUserController.handleClearAllForm()
            this.form = {}
            this.user_id = ""
        },
        onChangeCustom(type, val, obj) {
            switch (type) {
                case "dynamicinputcomponent_user_other_application_role":
                    switch (obj?.typeInput) {
                        case "select":
                        case "select|hidden":
                            let index = obj?.option?.index;
                            let selected = obj?.value;

                            let latest_data = this.$store.getters.getInputs.user.dynamicinputcomponent_user_other_application_role.arrData;
                            latest_data[index].inputs[1].value = [];

                            this.$store.dispatch("SET_USER_DYNAMICINPUTCOMPONENT_USER_OTHER_APPLICATION_ROLE", latest_data);
                            break;
                        case "multipleSelector":
                        case "multipleSelector|hidden":
                            let index_ = obj?.option?.index;
                            let selected_ = obj?.option?.value;

                            let latest_data_ = this.$store.getters.getInputs.user.dynamicinputcomponent_user_other_application_role.arrData;
                            latest_data_[index_].inputs[1].value = selected_;

                            this.$store.dispatch("SET_USER_DYNAMICINPUTCOMPONENT_USER_OTHER_APPLICATION_ROLE", latest_data_);
                            break;
                        default:
                            break;
                    }

                    break;
                case "user_application_name":
                    this.$store.dispatch("SET_USER_USER_APPLICATION_ROLE", "");
                    break;
                default:
                    break;
            }
        },
        inputFocus(obj, val, info){
            if (obj.key === 'user_node_id' || obj.key.includes('user_additional_node_id')){
                this.autoComplateUrl = this.URL.node +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
                this.input_value = "node_id";
                this.input_label = "node_name";
                this.isNestedData = false;
            } else if (obj.key.includes('user_application_role')) {
                let index = obj.key.split("|")[0];
                let parsedIndex = isNaN(index) ? index : parseInt(index, 10);

                let app_role_name_index = Number.isInteger(parsedIndex)
                    ? this.$store.getters.getInputs.user.dynamicinputcomponent_user_other_application_role.arrData?.[parsedIndex]?.inputs[0]?.value
                    : this.$store.getters.getInputs.user.user_application_name.value;

                this.autoComplateUrl = this.URL.application_role_list +'?n='+ this.listenNodeId + `&sort_order=desc&limit=10&page=1&search_by=${app_role_name_index}`;
                this.isNestedData = true;
                this.nestedKey = "role";
                this.input_value = "app_role_id";
                this.input_label = "app_role_name";
            }
        },
        async getApplicationList() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.application_list}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1&search_by=${this.listenUserApplicationName || 'ALL_APPLICATION'}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = []
                    res.data.data.map(item => {
                        let obj = {}
                        obj["label"] = item.lov_value
                        obj["value"] = item.lov_value

                        arr.push(obj)
                    })
                    this.$store.dispatch("SET_USER_USER_APPLICATION_NAME_ArrData", arr)
                } else {
                    this.$store.dispatch("SET_USER_USER_APPLICATION_NAME_ArrData", [])
                }
            } catch (err) {
                this.redirectError(err)
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false
            }
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
                    this.checkAuth(err.response)
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed add data', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialogUser()
            this.$emit("refresh")
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>