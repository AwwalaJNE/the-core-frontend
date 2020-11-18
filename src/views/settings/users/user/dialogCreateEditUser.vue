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
            loadingDataRole: false
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
            }
        },
        active: function (val) {
            if (val == true) {
                this.getDataRole()
            }
        }
    },
    methods: {
        formData(form){
            

            if(this.user_id !== undefined && this.user_id !== '') {
                    console.log('update')
                    let obj = form
                    if(obj["password"] == '') {
                        delete obj.password
                    }
                    this.form = obj
                    this.updateData()
            } else {
                    console.log('create new')
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
        async getDataRole(){
            this.loadingDataRole = true
            await axios
                .get(this.URL.role + 
                `?n=1&sort_order=desc&limit=1000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.user_role_name
                            obj["value"] = item.user_role_id

                            arr.push(obj)
                        })
                        this.dataRole = arr
                        this.$store.dispatch("SET_USER_USER_ROLE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                    this.loadingDataRole = false
                }).catch(err => {
                    this.loadingDataRole = false
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async updateData() {
            await axios
                .put(
                    this.URL.user + `/${this.user_id}?n=1`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialogUser()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Update user is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.user + `?n=1`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialogUser()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Create user is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed add data', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialogUser()
        }
    },
    mounted() {
        
    },
}
</script>