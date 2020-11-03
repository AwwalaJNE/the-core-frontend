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
                        name="Customer Type" 
                        rules="required" 
                        formKey="customer_type_name"
                        :valueData="form.customer_type_name"
                        @updateValue="updateValue" />

                        <switch 
                        :label="['Active','Unactive']"
                        :valueData="form.is_active"
                        formKey="is_active"
                        />
                        
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
import Switch from "@/components/input/switch"
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
    name:"dialog-create-edit-customer-type",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-master": FormMaster,
        "input-general": InputGeneral,
        "switch": Switch
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
                customer_type_name:'',
                is_active:false
            },
            customer_type_id: ''
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.form.user_role_name = val.user_role_name
                this.form.user_role_code = val.user_role_code
                this.customer_type_id = val.customer_type_id
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

                console.log('this.customer_type_id',this.customer_type_id)
                if(this.customer_type_id !== undefined && this.customer_type_id !== '') {
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
                    this.URL.customer_type + `/${this.customer_type_id}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.form.customer_type_name = ''
                    this.form.is_active = false
                    this.customer_type_id = ''
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
                    this.URL.customer_type,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.form.customer_type_name = ''
                    this.form.is_active = false
                    this.customer_type_id = ''
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
            
            this.form.customer_type_name = ''
            this.form.is_active = false
            this.customer_type_id = ''
            
            this.closeDialogRole()
        }
    },
}
</script>