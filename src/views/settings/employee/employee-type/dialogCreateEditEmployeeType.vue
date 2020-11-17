<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="closeDialogRole">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-master ref="formMaster" @onSubmit="onSubmit">
                    <template v-slot:inputValidator>
                        <input-general 
                        name="Role" 
                        rules="required" 
                        formKey="user_role_name"
                        :valueData="form.user_role_name"
                        @updateValue="updateValue" />

                        <input-general 
                        name="Role code" 
                        rules="required" 
                        formKey="user_role_code"
                        :valueData="form.user_role_code"
                        @updateValue="updateValue" />
                    </template>
                </form-master>
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
    name:"dialog-create-edit-role",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-master": FormMaster,
        "input-general": InputGeneral     
    },
    props: {
       closeDialogRole: Function, 
       refresh: Function,
       active: Boolean,
       title: String,
       dataItem: Object
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenTitle(){
            return this.title
        }
    },
    data() {
        return {
            form: {
                user_role_name:'',
                user_role_code:''
            },
            user_role_id: ''
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.form.user_role_name = val.user_role_name
                this.form.user_role_code = val.user_role_code
                this.user_role_id = val.user_role_id
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

                console.log('this.user_role_id',this.user_role_id)
                if(this.user_role_id !== undefined && this.user_role_id !== '') {
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
        async updateData(){
            await axios
                .put(
                    this.URL.role + `/${this.user_role_id}?n=1`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.form.user_role_name = ''
                    this.form.user_role_code = ''
                    this.user_role_id = ''
                    this.closeDialogRole()
                    this.refresh()
                    this.openNotification(null, 'Success', 'Update role is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialogRole()
                    this.refresh()
                    this.openNotification('danger', 'Update role is failed', err)
                })
        },
        async addData() {
            console.log('form', this.form)
            await axios
                .post(
                    this.URL.role + `?n=1`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.form.user_role_name = ''
                    this.form.user_role_code = ''
                    this.closeDialogRole()
                    this.refresh()
                    this.openNotification(null, 'Success', 'Create new role is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialogRole()
                    this.refresh()
                    this.openNotification('danger', 'Create new role is failed', err)
                })
        },
        cancel() {
            
            this.form.user_role_name = ''
            this.form.user_role_code = ''
            
            this.closeDialogRole()
        }
    },
}
</script>