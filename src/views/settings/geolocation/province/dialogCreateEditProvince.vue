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
                    ref="formGeoLocationProvinceController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="geolocation_province"
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
    name:"dialog-create-edit-geo-province",
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
            formRole: this.$store.getters.getInputs.geolocation_city ? this.$store.getters.getInputs.geolocation_city : {},
            geolocation_province_id: ''
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
            let obj = this.dataItem || {}
            if(obj != undefined) {
                obj.hasOwnProperty('geolocation_province_time_zone') ? 
                obj['geolocation_province_time_zone'] = obj['geolocation_province_time_zone'].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "_").toLowerCase() : 
                obj['geolocation_province_time_zone']
            }
            
            return obj
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.geolocation_province_id = val.geolocation_province_id
            }
        },
        active: function (val) {
            if (val == true) {
                this.getDataCountry()
                this.getDataTimezone()
            }
        }
    },
    methods: {
        formData(form){
            let obj = form
            obj.hasOwnProperty('geolocation_province_time_zone') ? 
                obj['geolocation_province_time_zone'] = obj['geolocation_province_time_zone'].replace(/[&\/\\#,+()$~%._'":*?<>{}]/g, "/").toUpperCase() : 
                obj['geolocation_province_time_zone']
            this.form = obj
            if(this.geolocation_province_id !== undefined && this.geolocation_province_id !== '') {

                    this.updateData()
            } else {
                    this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formGeoLocationProvinceController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formGeoLocationProvinceController.handleClearForm()
            this.form = {}
            this.geolocation_province_id = ""
        },
        async getDataCountry(){
            await axios
                .get(this.URL.geolocation_country + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.geolocation_country_name
                            obj["value"] = item.geolocation_country_id

                            arr.push(obj)
                        })

                        this.$store.dispatch("SET_GEOLOCATION_PROVINCE_GEOLOCATION_COUNTRY_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                })
        },
        async getDataTimezone(){
            await axios
                .get(this.URL.geolocation_timezone + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
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



                        this.$store.dispatch("SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_TIME_ZONE_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                })
        },
        async updateData(){
            await axios
                .put(
                    this.URL.geolocation_province + `/${this.geolocation_province_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {

                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Update success', 'Update district is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Update failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        async addData() {

            await axios
                .post(
                    this.URL.geolocation_province + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {

                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create success', 'Create new district is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Create failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>