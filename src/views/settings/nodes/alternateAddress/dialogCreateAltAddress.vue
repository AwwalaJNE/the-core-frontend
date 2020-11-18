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
                    ref="formNodeAlternateAddressController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="node_alternate_address"
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
    name:"dialog-create-edit-altAddress",
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
            node_alternate_address_id: ''
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
                this.node_alternate_address_id = val.node_alternate_address_id
            }
        },
        active: function (val) {
            if (val == true) {
                this.getDataProvince()
                this.getDataCity()
                this.getDataDistrict()
                this.getDataSubDistrict()
                this.getDataTimezone()
                this.getDataTariffCode()
            }
        }
    },
    methods: {
        formData(form){
            let obj = form
            obj.hasOwnProperty('node_alternate_address_time_zone_id') ? 
                obj['node_alternate_address_time_zone_id'] = obj['node_alternate_address_time_zone_id'].replace(/[&\/\\#,+()$~%._'":*?<>{}]/g, "/").toUpperCase() : 
                obj['node_alternate_address_time_zone_id']
            this.form = obj
            if(this.node_alternate_address_id !== undefined && this.node_alternate_address_id !== '') {
                    console.log('update')
                    this.updateData()
            } else {
                    this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formNodeAlternateAddressController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formNodeAlternateAddressController.handleClearForm()
            this.form = {}
            this.node_alternate_address_id = ""
        },
        async getDataProvince(){
            await axios
                .get(this.URL.geolocation_province + 
                `?n=1&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.geolocation_province_name
                            obj["value"] = item.geolocation_province_id

                            arr.push(obj)
                        })

                        this.$store.dispatch("SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_PROVINCE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataCity(){
            await axios
                .get(this.URL.geolocation_city + 
                `?n=1&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.geolocation_city_name
                            obj["value"] = item.node_alternate_address_id

                            arr.push(obj)
                        })

                        this.$store.dispatch("SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_CITY_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataDistrict(){
            await axios
                .get(this.URL.geolocation_district + 
                `?n=1&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.geolocation_district_name
                            obj["value"] = item.geolocation_district_id

                            arr.push(obj)
                        })

                        this.$store.dispatch("SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_DISTRICT_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataSubDistrict(){
            await axios
                .get(this.URL.geolocation_subdistrict + 
                `?n=1&sort_order=desc&limit=2000&page=1`, 
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

                        this.$store.dispatch("SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_SUBDISTRICT_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataTimezone(){
            await axios
                .get(this.URL.geolocation_timezone + 
                `?n=1&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        // replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "_") /
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.name.toString()
                            obj["value"] = item.code.toString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "_").toLowerCase();

                            arr.push(obj)
                        })

                        console.log('timezone', arr)

                        this.$store.dispatch("SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_TIME_ZONE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataTariffCode(){
            await axios
                .get(this.URL.tariff + 
                `?n=1&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.tariff_origin
                            obj["value"] = item.tariff_origin

                            arr.push(obj)
                        })

                        this.$store.dispatch("SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_TARIFF_CODE_ArrData", arr.length > 0 ? arr : null)
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
                    this.URL.node_alternate_address + `/${this.node_alternate_address_id}?n=1`,
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
                    this.URL.node_alternate_address,
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