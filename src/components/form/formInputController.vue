<template>
    <form-master ref="formMaster" @onSubmit="onSubmit" :submitByEnter="submit_Enter">
        <template v-slot:inputValidator>
            <template v-if="Keys.length > 0 && Object.keys(InputObject).length > 0">
                <vs-row>
                    <template v-for="(item, keys) in Keys">
                        <vs-col justify="space-between" :key="keys" :w="InputObject[item].width || 12" :offset="InputObject[item].offset || null" style="margin-top:10px">
                            
                            <template v-if="InputObject[item].typeInput.toLowerCase().includes('text')">
                                <template v-if="InputObject[item].hasOwnProperty('visible')">
                                    <template v-if="InputObject[item]['visible'] == true">
                                        <div>
                                            <input-general 
                                            :name="InputObject[item].label"
                                            :rules="InputObject[item].rule"
                                            :formKey="InputObject[item].key"
                                            :valueData="InputObject[item].value"
                                            :typeInput="InputObject[item].typeInput"
                                            :disabled="listenIsDisabled || InputObject[item].isDisabled"
                                            @updateValue="updateValue" 
                                            @inputFocus="onfocuslah"/>
                                        </div>
                                    </template>
                                    <template v-else>
                                        
                                    </template>
                                </template>
                                <template v-else>
                                    <input-general 
                                    :name="InputObject[item].label"
                                    :rules="InputObject[item].rule"
                                    :formKey="InputObject[item].key"
                                    :valueData="InputObject[item].value"
                                    :typeInput="InputObject[item].typeInput"
                                    :placeholder="InputObject[item].placeholder"
                                    :disabled="listenIsDisabled || InputObject[item].isDisabled"
                                    @updateValue="updateValue" 
                                    @inputFocus="onfocuslah"/>
                                </template>
                                <template v-if="InputObject[item].hasOwnProperty('visible') && InputObject[item]['visible'] == true">
                                    
                                </template>
                            </template>

                            <template v-if="InputObject[item].typeInput.toLowerCase().includes('number')">
                                <template v-if="InputObject[item].hasOwnProperty('visible')">
                                    <template v-if="InputObject[item]['visible'] == true">
                                        <div>
                                            <input-general 
                                            :name="InputObject[item].label"
                                            :rules="InputObject[item].rule"
                                            :formKey="InputObject[item].key"
                                            :valueData="InputObject[item].value"
                                            :typeInput="InputObject[item].typeInput"
                                            :disabled="listenIsDisabled"
                                            @updateValue="updateValue" 
                                            @inputFocus="onfocuslah"/>
                                        </div>
                                    </template>
                                    <template v-else>
                                        
                                    </template>
                                </template>
                                <template v-else>
                                    <input-general 
                                    :name="InputObject[item].label"
                                    :rules="InputObject[item].rule"
                                    :formKey="InputObject[item].key"
                                    :valueData="InputObject[item].value"
                                    :typeInput="InputObject[item].typeInput"
                                    :placeholder="InputObject[item].placeholder"
                                    :disabled="listenIsDisabled"
                                    @updateValue="updateValue" 
                                    @inputFocus="onfocuslah"/>
                                </template>
                                <template v-if="InputObject[item].hasOwnProperty('visible') && InputObject[item]['visible'] == true">
                                    
                                </template>
                            </template>
                            
                            <template v-else-if="InputObject[item].typeInput.toLowerCase() == 'date'">
                            <input-general
                                :name="InputObject[item].label"
                                :rules="InputObject[item].rule"
                                :formKey="InputObject[item].key"
                                :valueData="InputObject[item].value"
                                :typeInput="InputObject[item].typeInput"
                                @updateValue="updateValue" />
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase() == 'datetime'">
                                <template v-if="InputObject[item].hasOwnProperty('visible')">
                                    <template v-if="InputObject[item]['visible'] == true">
                                        <div>
                                            <date-time
                                            :name="InputObject[item].label"
                                            :rules="InputObject[item].rule"
                                            :formKey="InputObject[item].key"
                                            :valueData="InputObject[item].value"
                                            :typeInput="InputObject[item].typeInput"
                                            :disabled="listenIsDisabled || (typeof partialDisabled === 'function' && partialDisabled(InputObject[item].key)) || false"
                                            @updateValue="updateValue" />
                                        </div>
                                    </template>
                                    <template v-else>
                                        
                                    </template>
                                </template>
                                <template v-else>
                                    <div>
                                        <date-time
                                        :name="InputObject[item].label"
                                        :rules="InputObject[item].rule"
                                        :formKey="InputObject[item].key"
                                        :valueData="InputObject[item].value"
                                        :typeInput="InputObject[item].typeInput"
                                        :disabled="listenIsDisabled || (typeof partialDisabled === 'function' && partialDisabled(InputObject[item].key)) || false"
                                        @updateValue="updateValue" />
                                    </div>
                                </template>
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('multipleselector') && !InputObject[item].typeInput.toLowerCase().includes('hidden')">
                                <asynchronousSelect 
                                        :ref="InputObject[item].key"
                                        :name="InputObject[item].label" 
                                        :rules="InputObject[item].rule" 
                                        :formKey="InputObject[item].key"
                                        :valueData="InputObject[item].arrData"
                                        :selectedValue="InputObject[item].value"
                                        :typeInput="InputObject[item].typeInput"
                                        :url="asynchronousSelect_url"
                                        :limitExist="limitExist"
                                        :selectLabel="selectLabel"
                                        :selectValue="selectValue"
                                        @updateValue="updateValue"
                                        @inputFocus="onfocuslah"/>
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('selectmultipletag') && !InputObject[item].typeInput.toLowerCase().includes('hidden')">
                                    <div>
                                        <selector 
                                        :ref="InputObject[item].key"
                                        :name="InputObject[item].label" 
                                        :rules="InputObject[item].rule" 
                                        :formKey="InputObject[item].key"
                                        :valueData="InputObject[item].arrData"
                                        :selectedValue="InputObject[item].value"
                                        :isMultipleTag="true"
                                        @updateValue="updateValue" />
                                    </div>
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('selectallowcreate') && !InputObject[item].typeInput.toLowerCase().includes('hidden')">
                                    <div>
                                        <selector 
                                            :ref="InputObject[item].key"
                                            :name="InputObject[item].label" 
                                            :rules="InputObject[item].rule" 
                                            :formKey="InputObject[item].key"
                                            :valueData="InputObject[item].arrData"
                                            :selectedValue="InputObject[item].value"
                                            :isMultiple="false"
                                            :disabled="listenIsDisabled"
                                            :isAllowCreate="permissionCreateSelect"
                                            @updateValue="updateValue" />
                                    </div>
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('select-barcode')">
                                <div>
                                    <selector-barcode 
                                        :ref="InputObject[item].key"
                                        :name="InputObject[item].label" 
                                        :rules="InputObject[item].rule" 
                                        :formKey="InputObject[item].key"
                                        :valueData="InputObject[item].arrData"
                                        :selectedValue="InputObject[item].value"
                                        :isMultiple="false"
                                        :disabled="listenIsDisabled || InputObject[item].isDisabled || (typeof partialDisabled === 'function' && partialDisabled(InputObject[item].key)) || false"
                                        :customBind="InputObject[item].customBind"
                                        @updateValue="updateValue" 
                                    />
                                </div>
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('select')">
                                <template v-if="InputObject[item].hasOwnProperty('visible')">
                                    <template v-if="InputObject[item]['visible'] == true">
                                        <div>
                                            <selector 
                                            :ref="InputObject[item].key"
                                            :name="InputObject[item].label" 
                                            :rules="InputObject[item].rule" 
                                            :formKey="InputObject[item].key"
                                            :valueData="InputObject[item].arrData"
                                            :selectedValue="InputObject[item].value"
                                            :isMultiple="false"
                                            :isAllowCreate="false"
                                            :disabled="listenIsDisabled || InputObject[item].isDisabled || (typeof partialDisabled === 'function' && partialDisabled(InputObject[item].key)) || false"
                                            :customBind="InputObject[item].customBind"
                                            @updateValue="updateValue" />
                                        </div>
                                    </template>
                                    <template v-else>
                                        
                                    </template>
                                </template>
                                <template v-else>
                                    <div>
                                        <selector 
                                        :ref="InputObject[item].key"
                                        :name="InputObject[item].label" 
                                        :rules="InputObject[item].rule" 
                                        :formKey="InputObject[item].key"
                                        :valueData="InputObject[item].arrData"
                                        :selectedValue="InputObject[item].value"
                                        :isMultiple="false"
                                        :disabled="listenIsDisabled || InputObject[item].isDisabled || (typeof partialDisabled === 'function' && partialDisabled(InputObject[item].key)) || false"
                                        :customBind="InputObject[item].customBind"
                                        @updateValue="updateValue" />
                                    </div>
                                </template>
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('mappicker')">
                                <map-picker 
                                    :lat="listenLatitude"
                                    :lon="listenLongitude"
                                    @pickLocation="pickLocation"
                                />
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('dynamicinputcomponent')">
                                <template v-if="iterateInputWait == false">
                                    <iterate-selector 
                                    ref="dynamicinputComponent" 
                                    :addBtn="InputObject[item].label" 
                                    :getters="listenGettersPrefix" 
                                    :fromKey="InputObject[item].key" 
                                    :typeForm="listenTypeForm"
                                    :itterateUrlAutoComplete="listenItterateUrlAutoComplete"
                                    :itterateFlagAutoComplete="listenItterateFlagAutoComplete"
                                    :asynchronousSelect_url="listenAsynchronousSelectUrl"
                                    :disabled="listenIsDisabled"
                                    @updateValue="updateValue"
                                    @inputFocus="onfocuslah"/>
                                </template>
                                <template v-else>
                                    loading...
                                </template>
                            </template>
                            
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('boolean')">
                                <switchNih
                                :name="InputObject[item].label" 
                                :titleLabel="InputObject[item].titleLabel"
                                :rules="InputObject[item].rule" 
                                :formKey="InputObject[item].key"
                                :valueData="InputObject[item].value"
                                @updateValue="updateValue"
                                :disabled="listenIsDisabled" />
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('radio')">
                                
                                <template v-if="InputObject[item].arrData.length > 0">
                                    <radio 
                                    :ref="item"
                                    :name="''" 
                                    :width="InputObject[item].width"
                                    :rules="InputObject[item].rule" 
                                    :formKey="item"
                                    :valueData="InputObject[item].arrData"
                                    :selectedValue="InputObject[item].value"
                                    @updateValue="updateValue" />
                                </template>
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('autocomplete1')">
                                <template v-if="querySearch1 !== undefined">
                                    <auto-complete
                                    :name="InputObject[item].label"
                                    :rules="InputObject[item].rule"
                                    :formKey="InputObject[item].key"
                                    :valueData="InputObject[item].value"
                                    :url="InputObject[item].url"
                                    :flag="InputObject[item].flag"
                                    :querySearch="querySearch1"
                                    :selectedValue="InputObject[item].value"
                                    :typeForm="listenTypeForm"
                                    :typeInput="InputObject[item].typeInput"
                                    :disabled="listenIsDisabled"
                                    @updateValue="updateValue"
                                    @inputFocus="onfocuslah"/>
                                </template>
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('autocomplete2')">
                                <template v-if="querySearch2 !== undefined">
                                    <auto-complete
                                    :name="InputObject[item].label"
                                    :rules="InputObject[item].rule"
                                    :formKey="InputObject[item].key"
                                    :valueData="InputObject[item].value"
                                    :url="InputObject[item].url"
                                    :flag="InputObject[item].flag"
                                    :querySearch="querySearch2"
                                    :selectedValue="InputObject[item].value"
                                    :typeForm="listenTypeForm"
                                    :typeInput="InputObject[item].typeInput"
                                    :disabled="listenIsDisabled"
                                    @updateValue="updateValue"
                                    @inputFocus="onfocuslah"/>
                                </template>
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('autocomplete3')">
                                <template v-if="querySearch3 !== undefined">
                                    <auto-complete
                                    :name="InputObject[item].label"
                                    :rules="InputObject[item].rule"
                                    :formKey="InputObject[item].key"
                                    :valueData="InputObject[item].value"
                                    :url="InputObject[item].url"
                                    :flag="InputObject[item].flag"
                                    :querySearch="querySearch3"
                                    :selectedValue="InputObject[item].value"
                                    :typeForm="listenTypeForm"
                                    :typeInput="InputObject[item].typeInput"
                                    :disabled="listenIsDisabled"
                                    @updateValue="updateValue"
                                    @inputFocus="onfocuslah"/>
                                </template>
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('autocomplete')">
                                
                                <template v-if="InputObject[item].hasOwnProperty('visible')">
                                    <template v-if="InputObject[item]['visible'] == true">
                                        <template v-if="querySearch !== undefined">
                                            <auto-complete
                                                :name="InputObject[item].label"
                                                :rules="InputObject[item].rule"
                                                :formKey="InputObject[item].key"
                                                :valueData="InputObject[item].value"
                                                :url="InputObject[item].url"
                                                :flag="InputObject[item].flag"
                                                :querySearch="querySearch"
                                                :selectedValue="InputObject[item].value"
                                                :typeForm="listenTypeForm"
                                                :typeInput="InputObject[item].typeInput"
                                                :disabled="listenIsDisabled || InputObject[item].isDisabled"
                                                @updateValue="updateValue" 
                                                @inputFocus="onfocuslah"
                                            />
                                        </template>
                                    </template>
                                </template>
                                <template v-else>
                                    <template v-if="querySearch !== undefined">
                                        <auto-complete
                                            :name="InputObject[item].label"
                                            :rules="InputObject[item].rule"
                                            :formKey="InputObject[item].key"
                                            :valueData="InputObject[item].value"
                                            :url="InputObject[item].url"
                                            :flag="InputObject[item].flag"
                                            :querySearch="querySearch"
                                            :selectedValue="InputObject[item].value"
                                            :typeForm="listenTypeForm"
                                            :typeInput="InputObject[item].typeInput"
                                            :disabled="listenIsDisabled || InputObject[item].isDisabled"
                                            @updateValue="updateValue" 
                                            @inputFocus="onfocuslah"
                                        />
                                </template>
                                </template>
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('radtex')">
                                <radio-input-general
                                    :name="InputObject[item].label"
                                    :rules="InputObject[item].rule"
                                    :formKey="InputObject[item].key"
                                    :valueData="InputObject[item].value"
                                    :arrData="InputObject[item].arrData"
                                    :arrValueData="InputObject[item].arrValue"
                                    :typeInput="InputObject[item].typeInput"
                                    :disabled="listenIsDisabled"
                                    @updateValue="updateValue" 
                                    @inputFocus="onfocuslah"
                                />
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('search-preview')">
                                <search-preview
                                    :ref="InputObject[item].key"
                                    :name="InputObject[item].label" 
                                    :rules="InputObject[item].rule" 
                                    :formKey="InputObject[item].key"
                                    :typeInput="InputObject[item].typeInput"
                                    :url="asynchronousSelect_url"
                                    :limitExist="limitExist"
                                    :tableKey="tableKey"
                                    :labelKey="labelKey"
                                    :typeForm="listenTypeForm"
                                    :disabled="listenIsDisabled"
                                    @updateValue="updateValue"
                                    @inputFocus="onfocuslah"
                                />
                            </template>
                        </vs-col>
                        <vs-col v-if="InputObject[item].reduce" :key="'reducer'+keys" :w="InputObject[item].reduce || null" />
                    </template>
                </vs-row>
            </template>
        </template>
    </form-master>
</template>
<script>
import FormMaster from "@/components/form/formMaster"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
import SelectorBarcode from "@/components/input/selectBarcode"
import Switch from "@/components/input/switch"
import MapPicker from "@/components/map"
import DateTime from "@/components/input/dateTime"
import Radio from "@/components/input/radio"
import AutoComplete from "@/components/input/autoComplete"
import iterateSelector from "@/components/input/iterateInput2"
import asynchronousSelect from "@/components/input/asynchronousSelect"
import RadioInputGeneral from "@/components/input/radioInputGeneral.vue"
import SearchPreview from "@/components/searchPreview/searchPreview.vue"

export default {
    name:"input-controller",
    components: {
        "form-master": FormMaster,
        "input-general": InputGeneral,
        "selector": Selector,
        "selector-barcode": SelectorBarcode,
        "switchNih": Switch,
        "map-picker": MapPicker,
        "iterate-selector": iterateSelector,
        "date-time": DateTime,
        "radio": Radio,
        "auto-complete": AutoComplete,
        "asynchronousSelect": asynchronousSelect,
        "radio-input-general": RadioInputGeneral,
        "search-preview": SearchPreview
    },
    props: {
        arrData: Array,
        typeForm: String,
        dataItem: Object,
        getters: String,
        submitByEnter: Boolean,
        asynchronousSelect_url: String,
        querySearch: Function, // klo ada auto complete [required]
        querySearch1: Function,
        querySearch2: Function,
        querySearch3: Function,
        partialDisabled: Function,
        itterateUrlAutoComplete: String, // klo pke itterate component dan ada auto complete [required]
        itterateFlagAutoComplete: String, // klo pke itterate component dan ada auto complete [required]
        isDisabled: Boolean,
        permissionCreateSelect: Boolean,
        limitExist: Boolean,
        selectLabel: String,
        selectValue: String,
        tableKey: String,
        labelKey: String
    },
    data() {
        return {
            Keys: [],
            InputObject: {},
            form: {},
            latlon:[0,0],
            latitude: 0,
            longitude: 0,
            hasMapPicker: false,
            submit_Enter: this.submitByEnter || false,

            iterateInputWait: null,
        }
    },
    computed: {
        listenTypeForm() {
            return this.typeForm
        },
        listenDataItem() {
            return this.dataItem || null
        },
        listenGettersPrefix() {
            return this.getters || 'getInputs' // defaultnya akan mengarah ke global input getters
        },
        listenLatitude() {
            return this.latitude
        },
        listenLongitude() {
            return this.longitude
        },
        listenItterateUrlAutoComplete() {
            return this.itterateUrlAutoComplete
        },
        listenItterateFlagAutoComplete() {
            return this.itterateFlagAutoComplete
        },
        listenAsynchronousSelectUrl() {
            return this.asynchronousSelect_url
        },
        listenIsDisabled() {
            return this.isDisabled || false
        }
    },
    methods: {
        initialize() {
            let obj = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm] || {}

                if (Object.keys(obj).length > 0) {
                    this.Keys = Object.keys(obj)
                    this.InputObject = obj
                } else {
                    this.Keys = []
                    this.InputObject = {}
                }
        },
        initializeDataItem() {
            this.iterateInputWait = true
            let obj = this.listenDataItem
            let prefix = this.listenTypeForm.toUpperCase()

            if(obj != null && Object.keys(this.InputObject).length > 0) {
                this.Keys.map(item => {
                    let action = item.toUpperCase()
                    if(item.includes('dynamicinputcomponent')){
                        let itemAlt = item.split('dynamicinputcomponent_')[1]
 
                        if(this.listenDataItem.hasOwnProperty(itemAlt)){
                            this.$store.dispatch(`SET_${prefix}_${action}`, this.listenDataItem[itemAlt])

                            
                        }
                    }
                    if(this.listenDataItem.hasOwnProperty(item)) {

 
                        this.$store.dispatch(`SET_${prefix}_${action}`, this.listenDataItem[item])

                        if(this.InputObject[item].hasOwnProperty('mapPicker')) {
                            if(this.InputObject[item]['typeInput'].toLowerCase().includes('latitude')){
                                this.latitude = parseFloat(this.listenDataItem[item])
                            } else if(this.InputObject[item]['typeInput'].toLowerCase().includes('longitude')){
                                this.longitude = parseFloat(this.listenDataItem[item])
                            }
                        }
                    }
                })
            }
            this.iterateInputWait = false
            // setTimeout(function(){ self.iterateInputWait = false }, 800);
            
        },
        pickLocation(item){
            let prefix = this.listenTypeForm.toUpperCase()
            this.Keys.map(key => {
                let action = key.toUpperCase()
                if(this.InputObject[key].hasOwnProperty('mapPicker')) {
                    if(this.InputObject[key]['typeInput'].toLowerCase().includes('latitude')){
                        this.$store.dispatch(`SET_${prefix}_${action}`, item['latitude'])
                        // this.latitude = item['latitude']
                    } else if(this.InputObject[key]['typeInput'].toLowerCase().includes('longitude')){
                        this.$store.dispatch(`SET_${prefix}_${action}`, item['longitude'])
                        // this.longitude = item['longitude']
                    }
                }

            })
        },
        updateValue(type, val, obj = {}) {
            let action = type.toUpperCase()
            let prefix = this.listenTypeForm.toUpperCase()

            try {
                // if(!type.toLowerCase().includes('dynamicinputcomponent')) {
                    
                // }
                let err = this.InputObject[`${type}`] !== undefined ? this.$store.dispatch(`SET_${prefix}_${action}`, val !== undefined && val !== '' ? val : '') : true
                if(err == true) {

                }
            } catch (error) {
                
            }
            
 
            if(obj.hasOwnProperty('typeInput')) {
                if(obj['typeInput'] == 'autocomplete') {
                    try {
                        this.$store.dispatch(`SET_${prefix}_${action + '_ValueData'}`, obj['data'] !== undefined ? obj['data'] : {})
                    } catch (error) {
                        
                    }
                }
            }
            if(obj.hasOwnProperty('typeInput')) {
                if(obj['typeInput'] == 'radtex') {
                    if (obj['statusRad']) {
                        if (['menit', 'jam', 'hari'].includes(val)) {
                            this.$store.dispatch(`SET_${prefix}_${action}_ArrValueData`, obj.statusRad)
                            this.$store.dispatch(`SET_${prefix}_${action}`, '')
                        } else {
                            this.$store.dispatch(`SET_${prefix}_${action}_ArrValueData`, obj.statusRad)
                        }                        
                    }
                }
            }

            this.$emit("onChangeCustom", type, val, obj)
        },
        onfocuslah(info) {
            if(info.typeInput !== '' && info.typeInput.includes('location_selector')) {
              this.$emit("onFocus_location_selector", info)
            }
            this.$emit("inputFocus", info)
        },
        handleSubmit(){
            this.$refs.formMaster.formSubmit() // trigger function submit form dari luar component formMaster
        },
        onSubmit(refs){
                refs.form.validate().then(success => {
                    if (!success) {

                        return;
                    }
                    this.InputObject = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm]
                    let tempKey = this.Keys.filter(item => !item.includes('mapPicker'))
                    tempKey.map(item => {
                        // yg diambil key input
                        if(this.InputObject[item]['typeInput'].toLowerCase() == 'boolean') { 
                            // fix component switch.vue onchange updateValue ga ketrigger dan return ''
                            this.form[this.InputObject[item].key] = this.InputObject[item].value !== '' && this.InputObject[item].value !== undefined ? this.InputObject[item].value : this.InputObject[item].valueData //this.InputObject[item].value == '' ? true : this.InputObject[item].value
                        } else if (this.InputObject[item]['typeInput'].toLowerCase() == 'dynamicinputcomponent') {
                            this.form[this.InputObject[item].key] = this.InputObject[item].arrData
                        } else if (this.InputObject[item]['typeInput'].toLowerCase() == 'autocomplete') {
                            this.form[this.InputObject[item].key] = this.InputObject[item].valueData
                        } else if (this.InputObject[item]['typeInput'].toLowerCase() == 'radtex') {
                            this.form[this.InputObject[item].key + '_radio'] = this.InputObject[item].arrValueData
                            this.form[this.InputObject[item].key] = this.InputObject[item].value
                        }
                        else {
                            this.form[this.InputObject[item].key] = this.InputObject[item].value
                        }
                        
                    })
                    this.$emit("formData", this.form)

                    // Wait until the models are updated in the UI
                    this.$nextTick(() => {
                        refs.form.reset();
                    });
                });
        },
        handleClearForm(){
            let prefix = this.listenTypeForm.toUpperCase()
            let tempKey = this.Keys.filter(item => !item.includes('mapPicker') && !item.includes('dynamicinputcomponent'))
            tempKey.map(item => {
                let action = item.toUpperCase()
                try {
                    if(this.InputObject[item].hasOwnProperty('typeData')) {
                        if(this.InputObject[item]["typeData"].toLowerCase() == 'boolean') {
                            this.$store.dispatch(`SET_${prefix}_${action}`, true)
                            this.$store.dispatch(`SET_${prefix}_${action}_ValueData`, true)
                        } else {
                            this.$store.dispatch(`SET_${prefix}_${action}`, '')
                            this.$store.dispatch(`SET_${prefix}_${action}_ValueData`, '')
                        }
                    } else {
                        this.$store.dispatch(`SET_${prefix}_${action}`, '')
                        this.$store.dispatch(`SET_${prefix}_${action}_ValueData`, '')
                    }
                    
                    if(this.InputObject[item].hasOwnProperty('arrData') && !InputObject[item].typeInput.toLowerCase().includes('radtex')) {
                        this.$store.dispatch(`SET_${prefix}_${action}_ArrData`, [{"label": null, "value": null}])
                    }
                } catch (error) {
                    
                }
                
            })
            this.form = {}
        },
        handleEmptyForm(){
            let prefix = this.listenTypeForm.toUpperCase()
            let tempKey = this.Keys.filter(item => !item.includes('mapPicker') && !item.includes('dynamicinputcomponent'))
            tempKey.map(item => {
                let action = item.toUpperCase()
                try {
                    if(this.InputObject[item].hasOwnProperty('typeData')) {
                        if(this.InputObject[item]["typeData"].toLowerCase() == 'boolean') {
                            this.$store.dispatch(`SET_${prefix}_${action}`, true)
                            this.$store.dispatch(`SET_${prefix}_${action}_ValueData`, true)
                        } else {
                            this.$store.dispatch(`SET_${prefix}_${action}`, '')
                            this.$store.dispatch(`SET_${prefix}_${action}_ValueData`, '')
                        }
                    } else {
                        this.$store.dispatch(`SET_${prefix}_${action}`, '')
                        this.$store.dispatch(`SET_${prefix}_${action}_ValueData`, '')
                    }
                } catch (error) {
                    
                }
                
            })
            this.form = {}
        },
    },
    mounted() {
        this.initialize()
        this.$nextTick(() => {
            this.initializeDataItem()
        });
        
    },
}
</script>