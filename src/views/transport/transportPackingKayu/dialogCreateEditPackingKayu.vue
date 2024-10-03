<template>
    <dialog-master 
    :actived="listenActive" 
    width="lg"
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
                    typeForm="packingkayu"
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
    name:"dialog-create-edit-packingkayu",
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
            koli_number: '',
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
                this.koli_number = val.koli_number
            }
        }
    },
    methods: {
        formData(form){
            this.form = form
            if(this.koli_number !== undefined && this.koli_number !== '') {
                    this.loading=true;
                    this.updateData()
            } 
        },
        handleSubmit(){
            this.$refs.formUserCustomerController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formUserCustomerController.handleClearForm()
            this.form = {}
            this.koli_number = ""
        },
       
        async updateData(){
            await axios
                .put(
                    this.URL.packing_kayu + `/${this.koli_number}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.loading = false
                    this.openNotification(null, 'Update success', 'Update Koli is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Update failed', err)
                })
        },
       
        cancel() {
            this.handleClearForm()
            this.closeDialog()
             this.$emit("refresh")
        },
        
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>