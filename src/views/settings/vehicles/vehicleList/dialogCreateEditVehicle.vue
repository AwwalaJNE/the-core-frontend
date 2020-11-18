<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller 
                    ref="formVehicleController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="vehicle"
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
    name:"dialog-create-edit-vehicle",
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
            vehicle_id: ''
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
                this.vehicle_id = val.vehicle_id
            }
        },
        active: function (val) {
            if (val == true) {
                this.getNode()
                this.getVehicleType()
            }
        }
    },
    methods: {
        formData(form){
            this.form = form
            if(this.vehicle_id !== undefined && this.vehicle_id !== '') {
                    console.log('update')
                    this.updateData()
            } else {
                    this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formVehicleController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formVehicleController.handleClearForm()
            this.form = {}
            this.vehicle_id = ""
        },
        async getNode(){
            await axios
                .get(this.URL.node + 
                `?n=1&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.node_name
                            obj["value"] = item.node_id

                            arr.push(obj)
                        })

                        this.$store.dispatch("SET_VEHICLE_VEHICLE_NODE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getVehicleType(){
            await axios
                .get(this.URL.vehicle_type + 
                `?n=1&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.vehicle_type_name
                            obj["value"] = item.vehicle_type_id

                            arr.push(obj)
                        })

                        this.$store.dispatch("SET_VEHICLE_VEHICLE_TYPE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async updateData(){
            await axios
                .put(
                    this.URL.vehicle + `/${this.vehicle_id}?n=1`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Update role is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Update role is failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        async addData() {
            console.log('form', this.form)
            await axios
                .post(
                    this.URL.vehicle,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Create new role is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Create new role is failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
    mounted() {
    },
}
</script>