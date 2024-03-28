<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="cancel"
    width="xl">

        <template v-slot:header>
            Return Koli
        </template>

        <template v-slot:content>
            
            <div>
                <vs-row justify="space-between">
                    <vs-col xs="6" sm="6" lg="6">
                        <form @submit.prevent="scanConnote">
                                    <vs-input type="text"
                                        v-model="connote_number"
                                        label-placeholder="Nomer Connote"
                                        :autofocus="true">
                                    </vs-input>
                        </form>
                    </vs-col>
                </vs-row>

                

                <template v-if="Object.keys(dataItem).length > 0">
                    <hr>
                    <vs-row justify="space-between">
                        <vs-col xs="6" sm="6" lg="6">
                            <vs-row justify="space-between">
                                <vs-col xs="12" sm="12" lg="12">
                                    <template>
                                        <div>
                                            <template v-if="alt_address_arr.length > 0">
                                                <div class="mt-1">
                                                    <selector 
                                                    :ref="''"
                                                    name="Alternate Address" 
                                                    :rules="''" 
                                                    formKey="alt_address"
                                                    :valueData="alt_address_arr"
                                                    :selectedValue="''"
                                                    :isMultiple="false"
                                                    @updateValue="updateValue" />
                                                </div>
                                            </template>
                                            
                                        </div>
                                        <div style="position:relative;display:flex;justify-content:flex-end;">
                                            <vs-switch v-model="isEdit">
                                                Edit
                                            </vs-switch>
                                        </div>
                                        <div class="address_box">
                                            <div :class="`overlay ${isEdit == false ? 'disabled': ''}`"></div>
                                            <form-input-controller 
                                                ref="irreguralitiesReturnDestination"
                                                @formData="formData"
                                                @onFocus_location_selector="onFocusLocationSelector"
                                                @onChangeCustom="onChangeCustom"
                                                :dataItem="dataItem"
                                                typeForm="irreguralities_return_destination"
                                            />
                                        </div>
                                    </template>
                                </vs-col>
                            </vs-row>
                        </vs-col>
                        <vs-col xs="6" sm="6" lg="6">
                            <vs-row justify="space-between">
                                <vs-col xs="12" sm="12" lg="12">
                                    <template v-if="loading == false && status_code_arr.length > 0">
                                        <div class="mt-1">
                                            <selector 
                                            :ref="''"
                                            name="Status Code" 
                                            :rules="'required'" 
                                            formKey="status_code"
                                            :valueData="status_code_arr"
                                            :selectedValue="selectedStatusCode"
                                            :isMultiple="false"
                                            @updateValue="updateValue" />
                                        </div>
                                    </template>
                                </vs-col>
                                <vs-col xs="12" sm="12" lg="12">
                                    <input-general
                                    name="Remark"
                                    :rules="'required'"
                                    formKey="remark"
                                    :valueData="remark"
                                    typeInput="text"
                                    @updateValue="updateValue" />
                                </vs-col>
                            </vs-row>
                            <div>
                                <location-selector
                                    :active="locationSelectorActive" 
                                    :closeDialog="closeDialogLocationSelector"
                                    :q="query"
                                    @selectedData="selectedDataLocation"
                                />
                            </div>
                        </vs-col>
                    </vs-row>
                </template>
            </div>
            
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="2">
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
                <vs-col w="2">
                    <vs-button
                    transparent
                    block
                    flat
                    :active="true"
                    type="submit"
                    @click="handleSubmit"
                    >
                       {{`${Object.keys(dataItem).length > 0 ? 'Submit': 'Scan'}`}}
                    </vs-button>
                </vs-col>
            </vs-row>
                
                
        </template>

    </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
import DialogMaster from "@/components/dialog/dialogMaster"
import FormInputController from "@/components/form/formInputController"

import LocationSelector from "@/components/LocationSelector"
export default {
    name:"irreguralities-return-dialog",
    mixins:[master],
    components: {
        "input-general": InputGeneral,
        "selector": Selector,
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "location-selector": LocationSelector,
    },
    props: {
       closeDialog: Function, 
       active: Boolean,
       title: String,
    },
    computed: {
        listenActive(){
            return this.active
        },
    },
    watch: {
        active: function (val) {
            if (val == true) {
                
            }
        }
    },
    data() {
        return {
            form: {},
            alt_address_arr: [],
            alt_address_obj: {},
            
            connote_number: '',
            loading: true,
            dataItem: {},
            isEdit: false,

            status_code_arr: [],
            selectedStatusCode: '',
            irregularity_type: '',
            irregularity_status_code: '',
            remark: '',
            node_id: '',
            

            locationSelectorActive: false,
            query: ''
        }
    },
    methods: {
        formData(form){
            let obj = {}
            obj['connote_number'] = this.connote_number
            obj['irregularity_type'] = this.dataItem['irregularity_type']
            obj['irregularity_status_code'] = this.dataItem['irregularity_status_code']
            obj['irregularity_status_description'] = this.dataItem['irregularity_status_description']
            obj['remark'] = this.dataItem.remark
            obj['edited'] = this.isEdit

            let connote = {}
            // connote = {...form}
            connote['connote_receiver_tariff_code'] = form.tariff_code ? form.tariff_code : this.dataItem['tariff_code']
            connote['connote_receiver_zip_code'] = form.zip_code ? form.zip_code :  this.dataItem['zip_code']
            connote['connote_receiver_administrative_address'] = form.connote_receiver_administrative_address ? form.connote_receiver_administrative_address : this.dataItem['connote_receiver_administrative_address']
            connote['connote_receiver_street_address'] = form.destination_address ? form.destination_address : this.dataItem['destination_address']
            connote['connote_receiver_customer_id'] = form.user_id ? form.user_id : this.dataItem['user_id']
            connote['connote_receiver_name'] = form.destination_name ? form.destination_name : this.dataItem['destination_name']
            connote['connote_receiver_phone_number'] = form.destination_phone ? form.destination_phone : this.dataItem['destination_phone']
            connote['connote_receiver_address_type'] = form.destination_type ? form.destination_type : this.dataItem['destination_type']
            connote['connote_receiver_geolocation_subdistrict_id'] = this.dataItem['connote_receiver_geolocation_subdistrict_id']
            connote['connote_receiver_administrative_address'] = this.dataItem['connote_receiver_administrative_address']
            connote['connote_receiver_email'] = form.destination_email ? form.connote_receiver_email : this.dataItem['connote_receiver_email']
            connote['connote_receiver_tlc'] = this.dataItem['connote_receiver_tlc']
            connote['connote_receiver_city_zone'] = this.dataItem['connote_receiver_city_zone']

            obj['connote'] = connote

            console.log("AWWALA", obj,form.destination_email,  this.dataItems )

            this.form = obj
            this.addData()
            
        },
        async addData() {
            console.log('form', this.form)
            await axios
                .post(
                    this.URL.irregularities + `/return?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Create new return is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Create new return is failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        updateValue(key, val, info){
            switch(key) {
                case "alt_address":
                    let prefix = 'IRREGURALITIES_RETURN_DESTINATION'
                    let obj = this.$store.getters['getInputs']['irreguralities_return_destination']
                    let Keys = []

                    let selectedData = this.alt_address_obj[val] ? this.alt_address_obj[val] : {}

                    if(Object.keys(selectedData).length > 0) {
                        if (Object.keys(obj).length > 0) {
                            Keys = Object.keys(obj)
                            Keys.map(item => {
                                let action = item.toUpperCase()
                                if(selectedData.hasOwnProperty(item)) {
                                    this.$store.dispatch(`SET_${prefix}_${action}`, selectedData[item])
                                }
                            })
                        }
                    }

                    
                    break;
                case "connote_number":
                    this.connote_number= val
                    this.scanConnote()
                    break;
                case "remark":
                  this.dataItem.remark= val
                  break;
                case "status_code":
                    this.dataItem.irregularity_status_code = info.item.status_code
                    this.dataItem.irregularity_type = info.item.status_subtype
                    this.dataItem.irregularity_status_description =info.item.status_description
                  break;
                default:
                    console.log(key,'meong', val)
                    // code block
            }
        },
        async scanConnote(){
            await axios
                .get(this.URL.irregularities + 
                `/return/${this.connote_number}?n=${this.listenNodeId}`, 
                this.Helper.header())
                .then(res => {
                    
                    if(res.data) {
                        let obj = {}

                        obj['destination_type'] = 'rumah' // res.data.koli.connote.connote_shipper_address_type.toLowerCase() || 'rumah'
                        obj['destination_name'] = res.data.koli.connote.connote_shipper_name || ''
                        obj['destination_phone'] = res.data.koli.connote.connote_shipper_phone_number || ''
                        obj['destination_address'] = res.data.koli.connote.connote_shipper_street_address || ''
                        obj['destination_onchange_address'] = res.data.koli.connote.connote_shipper_administrative_address || ''
                        obj['destination_subdistrict_id'] = res.data.koli.connote.connote_shipper_geolocation_subdistrict_id || ''
                        obj['zip_code'] = res.data.koli.connote.connote_shipper_zip_code || ''
                        obj['tariff_code'] = res.data.koli.connote.connote_shipper_tariff_code || ''
                        obj['connote_receiver_geolocation_subdistrict_id'] = res.data.koli.connote.connote_receiver_geolocation_subdistrict_id || ""
                        obj['connote_receiver_administrative_address'] = res.data.koli.connote.connote_receiver_administrative_address || ''
                        obj['connote_receiver_email'] = res.data.koli.connote.connote_receiver_email || ''
                        obj['connote_receiver_tlc'] = res.data.koli.connote_receiver_tlc || ''
                        obj['connote_receiver_city_zone'] = res.data.koli.connote_receiver_city_zone || ''

                        obj['remark'] = ''
                        obj['irregularity_id'] = res.data.irregularity_id || ''
                        obj['created_at'] = res.data.created_at || ''
                        obj['irregularity_status_code'] = res.data.irregularity_status_code || ''
                        obj['irregularity_status_description'] = res.data.irregularity_status_description || ''
                        obj['irregularity_type'] = ''
                        obj['koli_number'] = res.data.koli_number || ''
                        obj['node_id'] = res.data.node_id || ''
                        obj['unhold_at'] = res.data.unhold_at || ''
                        obj['user_id'] = res.data.user_id || ''
                        obj['approved_at'] = res.data.approved_at || ''
                        obj['approved_by'] = res.data.approved_by || ''


                        this.dataItem = obj
                        this.node_id = res.data.node_id

                        if(res.data.koli.connote.hasOwnProperty('shipper_customer')) {
                            if(res.data.koli.connote['shipper_customer'].hasOwnProperty('customer_shipper_alternatif_address')) {
                                let altAddress = res.data.koli.connote['shipper_customer']['customer_shipper_alternatif_address'] || []
                                let altAddressObj = {}
                                let altAddressArr = []

                                

                                altAddress.map(item => {
                                    let obj = {}
                                    obj['destination_address'] = item.node_alternate_address_address || ''
                                    obj['destination_onchange_address'] = item.node_alternate_address_address || ''
                                    obj['destination_subdistrict_id'] = item.node_alternate_address_subdistrict_id || ''
                                    obj['zip_code'] = item.node_alternate_address_zip_code || ''
                                    obj['tariff_code'] = item.node_alternate_address_tariff_code || ''
                                    obj['destination_name'] = item.node_alternate_address_name || ''
                                    obj['destination_phone'] = item.node_alternate_address_phone || ''

                                    altAddressObj[item.node_alternate_address_id] = obj

                                    let objArr = {}
                                    objArr['label'] = item.node_alternate_address_name
                                    objArr['value'] = item.node_alternate_address_id

                                    altAddressArr.push(objArr)
                                    
                                })

                                this.alt_address_arr = altAddressArr
                                this.alt_address_obj = altAddressObj
                                console.log('altAddressObj', altAddressObj, altAddressArr)


                            }
                        }
                    }
                    // this.AltAddress()
                    this.getDataStatus()
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataStatus(){
            this.loading = true
            let self = this
            await axios
                .get(this.URL.status + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            if(item.hasOwnProperty('status_subtype')) {
                                if(item['status_subtype'].toLowerCase() === 'return') {
                                    let obj = {}
                                    obj["label"] = `${item.status_description}`
                                    obj["value"] = item.status_id
                                    obj["item"] = item

                                    arr.push(obj)
                                }
                            }
                        })

                        if(arr.length == 0) {
                            arr = [{'label': null, 'value': null}]
                        }

                        this.status_code_arr = arr
                        
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        handleSubmit(){
            let form = {}

            if(Object.keys(this.dataItem).length == 0) {
                this.scanConnote()
            } else {
                this.$refs.irreguralitiesReturnDestination.handleSubmit()
            }

            // form['irregularity_type'] = this.irregularity_type
            // form['irregularity_alt_address'] = this.irregularity_alt_address
            // form['connote_number'] = this.connote_number
            // this.$emit("updateValue", 'DIALOG_CANCEL',form)
        },
        handleClearForm(){
            this.form = {}
            this.alt_address_arr = []
            
            this.connote_number = ''
            this.dataItem = {}

            this.status_code_arr = []
            this.selectedStatusCode = ''
            this.irregularity_type = ''
            this.irregularity_status_code = ''
            this.remark = ''
            this.node_id = ''
            this.query = ''
            this.edited = false
        },
        onFocusLocationSelector(info){
            console.log(info)
            if(info.key == 'destination_onchange_address' && info.status == true) {
                this.openDialogLocationSelector()
            }
        },
        onChangeCustom(key, val){
            if(key == 'destination_onchange_address') {
                this.query = val
            }
        },
        openDialogLocationSelector() {
            this.locationSelectorActive = true
        },
        closeDialogLocationSelector() {
            this.locationSelectorActive = false
        },
        selectedDataLocation(val){
            console.log(val)
            let data = val || {}
            if(Object.keys(data).length > 0) {
                let obj = {}
                obj['destination_address'] = data.geolocation_location_name || ''
                obj['destination_onchange_address'] = data.geolocation_location_name || ''
                obj['destination_subdistrict_id'] = data.geolocation_subdistrict_id || ''
                obj['zip_code'] = data.geolocation_subdistrict_zip_code || ''
                obj['tariff_code'] = data.geolocation_subdistrict_tarif_code || ''

                this.dispatchStore(obj)
            }
        },

        dispatchStore(val) {
            let prefix = 'IRREGURALITIES_RETURN_DESTINATION'
            let obj = this.$store.getters['getInputs']['irreguralities_return_destination']
            let Keys = []

            let selectedData = val || {}

            if(Object.keys(selectedData).length > 0) {
                if (Object.keys(obj).length > 0) {
                    Keys = Object.keys(obj)
                    Keys.map(item => {
                        let action = item.toUpperCase()
                        if(selectedData.hasOwnProperty(item)) {
                            this.$store.dispatch(`SET_${prefix}_${action}`, selectedData[item])
                        }
                    })
                }
            }
        },

        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
}
</script>
<style lang="scss">
    .address_box{
        position: relative;
        .overlay{
            &.disabled {
                position: absolute;
                height: 100%;
                width: 100%;
                left: 0;
                top: 0;
                z-index: 999;
                background: rgba(255,255,255,0.3);
            }
        }
    }
</style>