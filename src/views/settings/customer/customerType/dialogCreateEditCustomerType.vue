<template>
    <dialog-master 
    :actived="listenActive" 
    width="sm"
    :loading="listenLoading"
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller 
                    ref="formUserCustomerController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="customer_type"
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
    name:"dialog-create-edit-customer-type",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,    
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
            customer_type_id: '',
            loading:false,
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
        },
        listenLoading(){
            return this.loading
        },
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.customer_type_id = val.customer_type_id
            }
        }
    },
    methods: {
        formData(form){
            this.form = form

           
            if(this.customer_type_id !== undefined && this.customer_type_id !== '') {
                     this.loading=true;
                    this.updateData()
            } else {
                    this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formUserCustomerController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formUserCustomerController.handleClearForm()
            this.form = {}
            this.customer_type_id = ""
        },
       
        async updateData(){
            await axios
                .put(
                    this.URL.customer_type + `/${this.customer_type_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.loading = false
                    this.openNotification(null, 'Update success', 'Update customer is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Update failed', err)
                })
        },
        async addData() {

            await axios
                .post(
                    this.URL.customer_type + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                     this.loading=true;
                    this.openNotification(null, 'Create Success', 'Create new customer is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Create failed', err)
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        },
        
    },
    mounted() {

    },
}
</script>