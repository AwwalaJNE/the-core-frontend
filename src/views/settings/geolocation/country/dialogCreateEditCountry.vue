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
                    ref="formGeoLocationCountryController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    :data-testid="`form`"
                    typeForm="geolocation_country"
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
    name:"dialog-create-edit-geo-country",
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
            geolocation_country_id: ''
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
                this.geolocation_country_id = val.geolocation_country_id
            }
        }
    },
    methods: {
        formData(form){
            this.form = form
            if(this.geolocation_country_id !== undefined && this.geolocation_country_id !== '') {
                    this.updateData()
            } else {
                    this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formGeoLocationCountryController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formGeoLocationCountryController.handleClearForm()
            this.form = {}
            this.geolocation_country_id = ""
        },
        // async getDataTariffCode(){
        //     await axios
        //         .get(this.URL.tariff + 
        //         `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
        //         this.Helper.header())
        //         .then(res => {
        //             if(res.data.data.length > 0) {
        //                 let arr = []
        //                 res.data.data.map(item => {
        //                     let obj = {}
        //                     obj["label"] = item.tariff_currency
        //                     obj["value"] = item.tariff_id

        //                     arr.push(obj)
        //                 })

        //                 this.$store.dispatch("SET_GEOLOCATION_COUNTRY_TARIFF_CURRENCY_CODE_ArrData", arr.length > 0 ? arr : null)
        //             } else {
        //                 // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
        //             }
                    
        //         }).catch(err => {
        //             // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
        //         })
        // },
        async updateData(){
            await axios
                .put(
                    this.URL.geolocation_country + `/${this.geolocation_country_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {

                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Update Success', 'Update country is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Update Failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        async addData() {

            await axios
                .post(
                    this.URL.geolocation_country + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {

                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create success', 'Create new country is success')
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