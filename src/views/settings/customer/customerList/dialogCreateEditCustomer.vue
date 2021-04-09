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
                    typeForm="customer"
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
    name:"dialog-create-edit-customer",
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
            customer_id: '',
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
                this.customer_id = val.customer_id
            }
        }
    },
    methods: {
        formData(form){
            this.form = form
            if(this.customer_id !== undefined && this.customer_id !== '') {
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
            this.customer_id = ""
        },
        async getDataSubdistrict(){
            this.loading = true
            await axios
                .get(this.URL.geolocation_subdistrict + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.geolocation_subdistrict_name
                            obj["value"] = item.geolocation_subdistrict_id

                            arr.push(obj)
                        })
                        this.dataRole = arr
                        this.$store.dispatch("SET_CUSTOMER_CUSTOMER_SUBDISTRICT_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataCustomerType(){
            this.loading = true
            await axios
                .get(this.URL.customer_type + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.customer_type_name
                            obj["value"] = item.customer_type_id

                            arr.push(obj)
                        })
                        this.dataRole = arr
                        this.$store.dispatch("SET_CUSTOMER_CUSTOMER_TYPE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataNodeId(){
            this.loading = true
            await axios
                .get(this.URL.node + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, 
                this.Helper.header())
                .then(res => {
                    console.log(res.data.data,'him')
                    if(res.data.data.length > 0) {
                        let arr = []
                        let arr_n = []
                        res.data.data.map(item => {
                            let obj = {}
                            let obj_n = {}
                            obj["label"] = item.node_name
                            obj["value"] = item.default_node_link_id

                            obj_n["label"] = item.node_name
                            obj_n["value"] = item.node_id

                            arr.push(obj)
                            arr_n.push(obj_n)
                        })
                        this.dataRole = arr
                        this.$store.dispatch("SET_CUSTOMER_CUSTOMER_DEFAULT_NODE_ID_ArrData", arr_n.length > 0 ? arr_n : null)
                        this.$store.dispatch("SET_CUSTOMER_N_ArrData", arr_n.length > 0 ? arr_n : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async updateData(){
            await axios
                .put(
                    this.URL.customer + `/${this.customer_id}?n=${this.listenNodeId}`,
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
            console.log('form', this.form)
            await axios
                .post(
                    this.URL.customer + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
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
        this.getDataNodeId()
        this.getDataCustomerType()
        this.getDataSubdistrict()
    },
}
</script>