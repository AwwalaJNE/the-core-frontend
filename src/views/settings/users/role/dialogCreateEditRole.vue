<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="closeDialogRole">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller 
                    ref="formUserRoleController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="role"
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
export default {
    name:"dialog-create-edit-role",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,    
    },
    props: {
       closeDialogRole: Function,
       active: Boolean,
       title: String,
       dataItem: Object,
       btnRed: String,
       btnBlue: String
    },
    data() {
        return {
            form: {},
            user_role_id: ''
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
                this.user_role_id = val.user_role_id
            }
        }
    },
    methods: {
        formData(form){
            this.form = form
            if(this.user_role_id !== undefined && this.user_role_id !== '') {

                    this.updateData()
            } else {

                    this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formUserRoleController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formUserRoleController.handleClearForm()
            this.form = {}
            this.user_role_id = ""
        },
        async updateData(){
            await axios
                .put(
                    this.URL.role + `/${this.user_role_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialogRole()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Update role is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialogRole()
                    this.$emit("refresh")
                    this.checkAuth(err.response)
                    this.openNotification('danger', 'Update role is failed', err)
                })
        },
        async addData() {

            await axios
                .post(
                    this.URL.role + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialogRole()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Create new role is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialogRole()
                    this.$emit("refresh")
                    this.checkAuth(err.response)
                    this.openNotification('danger', 'Create new role is failed', err)
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialogRole()
        }
    },
}
</script>