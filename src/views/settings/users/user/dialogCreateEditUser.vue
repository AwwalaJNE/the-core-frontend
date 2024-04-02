<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="closeDialogUser">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller 
                    ref="formUserController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    :querySearch="querySearch"
                    @inputFocus="inputFocus"
                    typeForm="user"
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
       btnRed: String,
       btnBlue: String
    },
    data() {
        return {
            form: {},
            formUser: this.$store.getters.getInputs.user ? this.$store.getters.getInputs.user : {},
            user_id: '',
            dataRole: [],
            loadingDataRole: false,
            loadingDataNode: false,
            autoComplateUrl: null
        }
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenTitle(){
            return this.title
        },
        listenDataItem() {
            return this.dataItem
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.user_id = val.user_id
                this.getUserDetail()
                // this.user_node_id = val.user_nodes
            }
        },
        active: function (val) {
            if (val == true) {
                this.getDataRole()
                this.getDataEmployee()
            }
        }
    },
    methods: {
        formData(form){
            form['user_node_id'] = form['user_node_id']['node_id'];
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
        querySearch(queryString, cb){
            axios.get(this.autoComplateUrl +`?n=${this.listenNodeId}&s=${queryString}`,
                this.Helper.header()
            )
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
            .catch();
        },
        inputFocus(obj){
            if(obj.key == 'user_node_id'){
                this.autoComplateUrl = this.URL.node;
            }
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
                    // this.openNotification('danger', 'Failed to collect role list', err)
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
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }

                }).catch(err => {
                    this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getUserDetail(){
            this.loadingDataRole = true
            await axios
                .get(this.URL.user + `/${this.user_id}?n=${this.listenNodeId}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res.data);
                }).catch(err => {
                        this.openNotification('danger', 'Failed!', 'Failed to get data user')
                })
        },
        async updateData() {
            if (this.form.user_additional_role_id && this.form.user_additional_role_id.length === 0) {
                this.form.user_expiry_additional_role = ""
                this.form.user_additional_role_id = ""
            }
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
                    this.openNotification('danger', 'Failed', err.response ? err.response.data.message : 'something went wrong')
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
                    this.openNotification('danger', 'Failed add data', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialogUser()
        },
    },
    mounted() {
        
    },
}
</script>