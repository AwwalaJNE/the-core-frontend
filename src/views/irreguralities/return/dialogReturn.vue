<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="cancel"
    width="xl">

        <template v-slot:header>
            Return Koli
        </template>

        <template v-slot:content>
            <vs-row justify="space-between">
                <vs-col xs="6" sm="6" lg="6">
                    <vs-row justify="space-between">
                        <vs-col xs="12" sm="12" lg="12">
                            <input-general
                            name="connote_number"
                            :rules="''"
                            formKey="connote_number"
                            :valueData="''"
                            typeInput="text"
                            @updateValue="updateValue" />
                        </vs-col>

                        <vs-col xs="12" sm="12" lg="12">
                            <template>
                                <div>
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
                                    :rules="''" 
                                    formKey="status_code"
                                    :valueData="status_code_arr"
                                    :selectedValue="''"
                                    :isMultiple="false"
                                    @updateValue="updateValue" />
                                </div>
                            </template>
                        </vs-col>
                        <vs-col xs="12" sm="12" lg="12">
                            <input-general
                            name="Remark"
                            :rules="''"
                            formKey="remark"
                            :valueData="''"
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
                       Submit
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
                this.getDataStatus()
            }
        }
    },
    data() {
        return {
            form: {},
            alt_address_arr: [],
            
            connote_number: '',
            loading: true,
            dataItem: {},
            isEdit: false,

            status_code_arr: [],
            irregularity_type: '',
            irregularity_status_code: '',
            remark: '',

            locationSelectorActive: false,
            query: ''
        }
    },
    methods: {
        formData(form){
            this.form = form
            console.log('form data', form)
            
        },
        updateValue(key, val, info){
            switch(key) {
                case "alt_address":
                    
                    let obj = this.alt_address_arr.filter(item => item.value == val)[0]
                    console.log('alt_address', val, obj)
                    if(Object.keys(obj).length > 0) {
                        if(obj.hasOwnProperty('item')) {
                            // this.irregularity_type = obj.item.status_type || ''
                            // this.irregularity_alt_address = obj.item.alt_address || ''
                        }
                    }
                    break;
                case "connote_number":
                    this.connote_number= val
                    break;
                default:
                    console.log('meong')
                    // code block
            }
        },
        async getDataStatus(){
            this.loading = true
            await axios
                .get(this.URL.status + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            if(item.hasOwnProperty('status_subtype')) {
                                if(item['status_subtype'].toLowerCase().includes('return')) {
                                    let obj = {}
                                    obj["label"] = item.status_description
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
            this.$refs.irreguralitiesReturnDestination.handleSubmit()
            // form['irregularity_type'] = this.irregularity_type
            // form['irregularity_alt_address'] = this.irregularity_alt_address
            // form['connote_number'] = this.connote_number
            // this.$emit("updateValue", 'DIALOG_CANCEL',form)
        },
        handleClearForm(){
            // this.form = {}
            // this.irregularity_type = ''
            // this.irregularity_alt_address = ''
            // this.connote_number= ''
        },
        onFocusLocationSelector(info){
            console.log(info)
            if(info.key == 'destination_onchange_address' && info.status == true) {
                this.openDialogLocationSelector()
            }
        },
        onChangeCustom(key, val){
            console.log(key, val)
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