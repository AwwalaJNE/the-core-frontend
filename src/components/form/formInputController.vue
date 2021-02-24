<template>
    <form-master ref="formMaster" @onSubmit="onSubmit" :submitByEnter="submit_Enter">
        <template v-slot:inputValidator>
            <template v-if="Keys.length > 0 && Object.keys(InputObject).length > 0">
                <vs-row>
                    <template v-for="(item, keys) in Keys">
                        <vs-col justify="space-between" :key="keys" :w="InputObject[item].width || 12">
                            
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
                                        <div style="margin-top:16px;">
                                            <date-time
                                            :name="InputObject[item].label"
                                            :rules="InputObject[item].rule"
                                            :formKey="InputObject[item].key"
                                            :valueData="InputObject[item].value"
                                            :typeInput="InputObject[item].typeInput"
                                            @updateValue="updateValue" />
                                        </div>
                                    </template>
                                    <template v-else>
                                        
                                    </template>
                                </template>
                                <template v-else>
                                    <div style="margin-top:16px;">
                                        <date-time
                                        :name="InputObject[item].label"
                                        :rules="InputObject[item].rule"
                                        :formKey="InputObject[item].key"
                                        :valueData="InputObject[item].value"
                                        :typeInput="InputObject[item].typeInput"
                                        @updateValue="updateValue" />
                                    </div>
                                </template>
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('select')">
                                <template v-if="InputObject[item].hasOwnProperty('visible')">
                                    <template v-if="InputObject[item]['visible'] == true">
                                        <div style="margin-top:16px;">
                                            <selector 
                                            :ref="InputObject[item].key"
                                            :name="InputObject[item].label" 
                                            :rules="InputObject[item].rule" 
                                            :formKey="InputObject[item].key"
                                            :valueData="InputObject[item].arrData"
                                            :selectedValue="InputObject[item].value"
                                            :isMultiple="false"
                                            @updateValue="updateValue" />
                                        </div>
                                    </template>
                                    <template v-else>
                                        
                                    </template>
                                </template>
                                <template v-else>
                                    <div style="margin-top:16px;">
                                        <selector 
                                        :ref="InputObject[item].key"
                                        :name="InputObject[item].label" 
                                        :rules="InputObject[item].rule" 
                                        :formKey="InputObject[item].key"
                                        :valueData="InputObject[item].arrData"
                                        :selectedValue="InputObject[item].value"
                                        :isMultiple="false"
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
                                <iterate-selector ref="dynamicinputComponent" :addBtn="InputObject[item].label" :getters="listenGettersPrefix" :fromKey="InputObject[item].key" :typeForm="listenTypeForm" @updateValue="updateValue"/>
                            </template>
                            
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('boolean')">
                                <switchNih
                                :name="InputObject[item].label" 
                                :titleLabel="InputObject[item].titleLabel"
                                :rules="InputObject[item].rule" 
                                :formKey="InputObject[item].key"
                                :valueData="InputObject[item].value"
                                @updateValue="updateValue" />
                            </template>
                            <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('radio')">
                                
                                <template v-if="InputObject[item].arrData.length > 0">
                                    <radio 
                                    :ref="item"
                                    :name="''" 
                                    :rules="InputObject[item].rule" 
                                    :formKey="item"
                                    :valueData="InputObject[item].arrData"
                                    :selectedValue="InputObject[item].value"
                                    @updateValue="updateValue" />
                                </template>
                            </template>
                        </vs-col>
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
import Switch from "@/components/input/switch"
import MapPicker from "@/components/map"
import DateTime from "@/components/input/dateTime"
import Radio from "@/components/input/radio"
import iterateSelector from "@/components/input/iterateInput2"
export default {
    name:"input-controller",
    components: {
        "form-master": FormMaster,
        "input-general": InputGeneral,
        "selector": Selector,
        "switchNih": Switch,
        "map-picker": MapPicker,
        "iterate-selector": iterateSelector,
        "date-time": DateTime,
        "radio": Radio,
    },
    props: {
        arrData: Array,
        typeForm: String,
        dataItem: Object,
        getters: String,
        submitByEnter: Boolean
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
            submit_Enter: this.submitByEnter || false
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
        }
    },
    methods: {
        initialize() {
            let obj = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm] || {}
            console.log('this.listenTypeForm',this.listenTypeForm,obj)
                if (Object.keys(obj).length > 0) {
                    this.Keys = Object.keys(obj)
                    this.InputObject = obj
                } else {
                    this.Keys = []
                    this.InputObject = {}
                }
        },
        initializeDataItem() {
            let obj = this.listenDataItem
            let prefix = this.listenTypeForm.toUpperCase()
            if(obj != null && Object.keys(this.InputObject).length > 0) {
                this.Keys.map(item => {
                    let action = item.toUpperCase()
                    if(item.includes('dynamicinputcomponent')){
                        let itemAlt = item.split('dynamicinputcomponent_')[1]
                        console.log('itemAlt', itemAlt)
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
        updateValue(type, val) {
            let action = type.toUpperCase()
            let prefix = this.listenTypeForm.toUpperCase()

            let err = this.InputObject[`${type}`] !== undefined ? this.$store.dispatch(`SET_${prefix}_${action}`, val !== undefined && val !== '' ? val : '') : true
            if(err == true) {
                console.log(`error input controller dispatch SET_${prefix}_${action} | val ` + val)
            }
            this.$emit("onChangeCustom", type, val)
        },
        onfocuslah(info) {
            if(info.typeInput !== '' && info.typeInput.includes('location_selector')) {
              this.$emit("onFocus_location_selector", info)
            }
        },
        handleSubmit(){
            this.$refs.formMaster.formSubmit() // trigger function submit form dari luar component formMaster
        },
        onSubmit(refs){
                refs.form.validate().then(success => {
                    if (!success) {
                        console.log('err niih')
                        return;
                    }
                    this.InputObject = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm]
                    let tempKey = this.Keys.filter(item => !item.includes('mapPicker'))
                    tempKey.map(item => {
                        // yg diambil key input
                        if(this.InputObject[item]['typeInput'].toLowerCase() == 'boolean') { 
                            // fix component switch.vue onchange updateValue ga ketrigger dan return ''
                            this.form[this.InputObject[item].key] = this.InputObject[item].value == '' ? true : this.InputObject[item].value 
                        } else if (this.InputObject[item]['typeInput'].toLowerCase() == 'dynamicinputcomponent') {
                            this.form[this.InputObject[item].key] = this.InputObject[item].arrData
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
                    this.$store.dispatch(`SET_${prefix}_${action}`, '')
                    this.$store.dispatch(`SET_${prefix}_${action}_ValueData`, '')
                    if(item.hasOwnProperty('arrData')) {
                        this.$store.dispatch(`SET_${prefix}_${action}_ArrData`, '')
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