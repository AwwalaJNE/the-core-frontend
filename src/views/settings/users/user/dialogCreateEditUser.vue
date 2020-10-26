<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="closeDialogUser">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-master ref="formMaster" @onSubmit="onSubmit">
                    <template v-slot:inputValidator>
                        <input-general 
                        name="Name*" 
                        rules="required" 
                        formKey="user_name"
                        :valueData="form.user_name"
                        @updateValue="updateValue" />

                        <input-general 
                        name="Username*" 
                        rules="required" 
                        formKey="user_login"
                        :valueData="form.user_login"
                        @updateValue="updateValue" />

                        <input-general 
                        name="Email*" 
                        rules="required|email" 
                        formKey="user_email"
                        :valueData="form.user_email"
                        @updateValue="updateValue" />

                        <input-general 
                        name="Password*" 
                        rules="required" 
                        formKey="password"
                        :valueData="form.password"
                        @updateValue="updateValue" />
                    </template>
                </form-master>
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
                        Add
                    </vs-button>
                </vs-col>
            </vs-row>
                
                
        </template>

    </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import FormMaster from "@/components/form/formMaster"
import InputGeneral from "@/components/input/general"
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
    name:"dialog-create-edit-user",
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        "form-master": FormMaster,
        "input-general": InputGeneral  
    },
    props: {
       closeDialogUser: Function, 
       refresh: Function,
       active: Boolean,
       title: String,
       dataItem: Object
    },
    data() {
        return {
            form: {
                user_name:'',
                user_email:'',
                user_login:'',
                password:'',
                user_role_id:'1'
            },
            user_id: ''
        }
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenTitle(){
            return this.title
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.form.user_name = val.user_name
                this.form.user_email = val.user_email
                this.form.user_login = val.user_login
                this.form.password = val.password
                this.form.user_role_id = val.user_role_id
                this.user_id = val.user_id
                console.log(this.dataItem, 'nihh watch')
                console.log(this.form, 'form')
                
            }
        }
    },
    methods: {
        updateValue(type, val) {
            let err = this.form[`${type}`] !== undefined ? this.form[type] = val : true
            if(err == true) {
                console.log(`error this.form[${type}] | val ` + val + this.form[`${type}`])
            }
        },
        handleSubmit(){
            this.$refs.formMaster.formSubmit() // trigger function submit form dari luar component formMaster
        },
        onSubmit(refs){
            console.log('onsubmit', refs)
                refs.form.validate().then(success => {
                if (!success) {
                    console.log('err niih')
                return;
                }

                console.log('this.user_id',this.user_id)
                if(this.user_id !== undefined && this.user_id !== '') {
                    console.log('update')
                    this.updateData()
                } else {
                    console.log('create new')
                    this.addData()
                }

                // Wait until the models are updated in the UI
                this.$nextTick(() => {
                    refs.form.reset();
                });
            });
        },
        async updateData() {
            console.log('form', this.form)
            await axios
                .put(
                    this.URL.user + `/${this.user_id}?n=1`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.form.user_name = ''
                    this.form.user_email = ''
                    this.form.user_login = ''
                    this.form.password = ''
                    this.form.user_role_id = ''
                    this.closeDialogRole()
                    this.refresh()
                    this.openNotification(null, 'Success', 'Update user is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to collect users list', err)
                })
        },
        async addData() {
            console.log('form', this.form)
            await axios
                .post(
                    this.URL.user + `?n=1`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.form.user_name = ''
                    this.form.user_email = ''
                    this.form.user_login = ''
                    this.form.password = ''
                    this.form.user_role_id = ''
                    this.closeDialogRole()
                    this.refresh()
                    this.openNotification(null, 'Success', 'Create user is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to collect users list', err)
                })
        },
        cancel() {
            
            this.form.user_name = ''
            this.form.user_email = ''
            this.form.user_login = ''
            this.form.password = ''
            this.form.user_role_id = ''
            
            this.closeDialogUser()
        }
    },
}
</script>