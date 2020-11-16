<template>
    <form-master ref="formMaster" @onSubmit="onSubmit">
        <template v-slot:inputValidator>
            <template v-if="Keys.length > 0 && Object.keys(InputObject).length > 0">
                <vs-row v-for="(item, keys) in Keys" :key="keys">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
                        <template v-if="InputObject[item].typeInput.toLowerCase().includes('text')">
                            <input-general 
                            :name="InputObject[item].label" 
                            :rules="InputObject[item].rule" 
                            :formKey="InputObject[item].key"
                            :valueData="InputObject[item].value"
                            :typeInput="InputObject[item].typeInput"
                            @updateValue="updateValue" />
                        </template>
                        <template v-if="InputObject[item].typeInput.toLowerCase().includes('row')">
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
        </template>
    </form-master>
</template>
<script>
import FormMaster from "@/components/form/formMaster"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
import Switch from "@/components/input/switch"
export default {
    name:"input-controller-transaction",
    components: {
        "form-master": FormMaster,
        "input-general": InputGeneral,
        "selector": Selector,
        "switchNih": Switch,
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
        updateValue(type, val) {
            let action = type.toUpperCase()
            let prefix = this.listenTypeForm.toUpperCase()
            let err = this.InputObject[`${type}`] !== undefined ? this.$store.dispatch(`SET_${prefix}_${action}`, val !== undefined && val !== '' ? val : '') : true
            if(err == true) {
                console.log(`error input controller dispatch SET_USER_${action} | val ` + val)
            }
        },
        handleSubmit(){
            this.$refs.formMaster.formSubmit() // trigger function submit form dari luar component formMaster
        },
        onSubmit(refs){
            console.log('onsubmit form controller', refs)
                refs.form.validate().then(success => {
                    if (!success) {
                        console.log('err niih')
                        return;
                    }
                    this.InputObject = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm]
                    this.Keys.map(item => {
                        // yg diambil key input
                        this.form[this.InputObject[item].key] = this.InputObject[item].value
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