<template>
    <div>
        <template v-if="Keys.length > 0 && Object.keys(InputObject).length > 0">
                <vs-row v-for="(item, i) in Keys" :key="i">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
                        <template v-if="InputObject[item].typeInput.toLowerCase().includes('text')">
                            <input-general 
                            :name="InputObject[item].label" 
                            :rules="InputObject[item].rule" 
                            :formKey="InputObject[item].key"
                            :valueData="InputObject[item].value"
                            :typeInput="InputObject[item].typeInput"
                            @updateValue="updateValue" 
                            @inputFocus="onfocuslah" />
                        </template>
                        <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('row')">
                            <vs-row justify="center">
                                <template v-if="InputObject[item].input.length > 0">
                                    <vs-col xs="12" :w="InputObject[item]['col']" v-for="(inp, i) in InputObject[item].input" :key="i">
                                        <input-general 
                                        :name="inp.label" 
                                        :rules="inp.rule" 
                                        :formKey="inp.key"
                                        :valueData="inp.value"
                                        :typeInput="inp.typeInput"
                                        @updateValue="updateValue" />
                                    </vs-col>
                                </template>
                            </vs-row>
                        </template>
                        <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('select')">
                            <selector 
                            :ref="InputObject[item].key"
                            :name="InputObject[item].label" 
                            :rules="InputObject[item].rule" 
                            :formKey="InputObject[item].key"
                            :valueData="InputObject[item].arrData"
                            :selectedValue="InputObject[item].value"
                            :isMultiple="false"
                            @updateValue="updateValue" />
                        </template>
                        <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('radio')">
                            <p>{{InputObject[item].label}}</p>
                            <template v-if="InputObject[item].arrData.length > 0">
                                <radio 
                                :ref="InputObject[item].key"
                                :name="''" 
                                :rules="InputObject[item].rule" 
                                :formKey="InputObject[item].key"
                                :valueData="InputObject[item].arrData"
                                :selectedValue="InputObject[item].value"
                                @updateValue="updateValue" />
                            </template>
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
                    </vs-col>
                </vs-row>
        </template>
    </div>
</template>
<script>
// import FormMaster from "@/components/form/formMaster"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
import Switch from "@/components/input/switch"
import Radio from "@/components/input/radio"
export default {
    name:"input-controller-transaction",
    components: {
        // "form-master": FormMaster,
        "input-general": InputGeneral,
        "selector": Selector,
        "switchNih": Switch,
        "radio": Radio,
    },
    props: {
        arrData: Array,
        typeForm: String,
        dataItem: Object,
        getters: String
    },
    data() {
        return {
            Keys: [],
            InputObject: {},
            form: {}
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
            return this.getters || 'getTransaction' // defaultnya akan mengarah ke transaction getters
        },
    },
    methods: {
        initialize() {
            let obj = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm] || {}
                if (Object.keys(obj).length > 0) {
                    this.Keys = Object.keys(obj)
                    this.InputObject = obj
                    console.log('ini inputObject', this.InputObject)
                } else {
                    this.Keys = []
                    this.InputObject = {}
                }
        },
        initializeDataItem() {
            // let obj = this.listenDataItem
            // let prefix = this.listenTypeForm.toUpperCase()
            // if(obj != null && Object.keys(this.InputObject).length > 0) {
            //     this.Keys.map(item => {
            //         let action = item.toUpperCase()
            //         if(this.listenDataItem.hasOwnProperty(item)) {
            //             this.$store.dispatch(`SET_${prefix}_${action}`, this.listenDataItem[item])
            //         }
            //     })
            // }
            // console.log('initilize data', this.latitude, this.longitude)

        },
        onfocuslah(info) {
            if(info.typeInput !== '' && info.typeInput.includes('calc_switch')) {
              this.$store.dispatch('SET_CALC_COMPONENT_SWITCH', info.status)
              this.$store.dispatch('SET_CALC_COMPONENT_PREFIX', this.listenTypeForm)
            }
        },
        updateValue(type, val, info) {
            let action = type.toUpperCase()
            let prefix = this.listenTypeForm.toUpperCase()
            let err = this.InputObject[`${type}`] !== undefined ? this.$store.dispatch(`SET_${prefix}_${action}`, val !== undefined && val !== '' ? val : '') : true
            if(err == true) {
                console.log(`error input controller dispatch SET_USER_${action} | val ` + val)
            }

            console.log('ini inputan ->',type, val, info)

            if(info.typeInput !== '' && info.typeInput.includes('calc_switch')) {
                this.$emit("searchTariffCode", this.listenTypeForm, val)
            }
        },
        handleSubmit(){
            this.$refs.formMaster.formSubmit() // trigger function submit form dari luar component formMaster
        },
        
        handleClearForm(){
            let prefix = this.listenTypeForm.toUpperCase()
            this.Keys.map(item => {
                let action = item.toUpperCase()
                this.$store.dispatch(`SET_${prefix}_${action}`, '')
                this.$store.dispatch(`SET_${prefix}_${action}_ValueData`, '')
                    if(item.hasOwnProperty('arrData')) {
                        this.$store.dispatch(`SET_${prefix}_${action}_ArrData`, '')
                    }
            })
            this.form = {}
            console.log('clear form', this.form, this.$store.getters[this.listenGettersPrefix][this.listenTypeForm])
        },
    },
    mounted() {
        this.initialize()
        this.$nextTick(() => {
            this.initializeDataItem()
        });
        
        console.log('form controller transaction')
    },
}
</script>