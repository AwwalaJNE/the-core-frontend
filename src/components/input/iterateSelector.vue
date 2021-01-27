<template>
    <div>
        <template v-for="(item,key) in inputArray">
            <vs-row justify="space-between" :key="key">
                <vs-col xs="12" sm="6" lg="6">
                    <selector 
                        :valueData="Keys"
                        :selectedValue="''"
                        :isMultiple="false"
                        @updateValue="updateValue" />
                </vs-col>
                <vs-col xs="12" sm="6" lg="6">
                    <!-- <input-general 
                        :name="''" 
                        :rules="''" 
                        :formKey="''"
                        :valueData="InputObject[item.key].value"
                        :typeInput="InputObject[item.key].typeInput"
                        @updateValue="updateValue" /> -->
                        <!-- {{'ooo'}} -->
                </vs-col>
            </vs-row>
        </template>
        <vs-button
            transparent
            block
            flat
            :active="false"
            @click="addInputArray"
            >
                + Add Setting
        </vs-button>
    </div>
</template>
<script>
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
export default {
    name: "iterate-selector",
    props: {
        inputList: [],
        getters: '',
        typeForm: ''
    },
    components: {
        "input-general": InputGeneral,
        "selector": Selector,
    },
    data() {
        return {
            inputArray: [],
            input: {
                        label: 'o',
                        value: 'o',
                        key: 'o',
                        rule: 'o'
                    },
            typeInput: '',
            InputObject: {},
            Keys: [],
            index: 1
        }
    },
    computed: {
        listenGettersPrefix() {
            return this.getters || 'getInputs' // defaultnya akan mengarah ke global input getters
        },
        listenTypeForm() {
            return this.typeForm
        },
        listenTypeInput() {
            return this.typeInput
        }
    },
    watch: {
        typeForm: function(val) {
            if(val !== undefined) {
                this.initialize()
            }
        }
    },
    methods: {
        initialize(){
            let obj = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm] || {}
                if (Object.keys(obj).length > 0) {
                    let keys = Object.keys(obj)
                    this.InputObject = obj

                    keys.length > 0 && keys.map(item => {
                        
                           if(this.InputObject[item].hasOwnProperty('typeInput') && 
                               this.InputObject[item]['typeInput'].includes('dynamicInput')) {

                                   let inputObj = {}
                                   inputObj['label'] = this.InputObject[item]['label']
                                   inputObj["value"] = item
                                   inputObj["key"] = this.InputObject[item]['key']
                                   inputObj["rule"] = this.InputObject[item]['rule']

                                   this.Keys.push(inputObj)
                           }
                        
                    })

                    

                    // inputan pertama
                    this.index = 1
                    this.inputArray.push(this.Keys[0])

                    console.log('iterate-selector ', this.Keys, this.InputObject)
                } else {
                    this.InputObject = {}
                }
        },
        addInputArray() {
            this.index++
            this.inputArray.push(this.input)
            console.log('this.input', this.inputArray,this.input)
        },
        removeInputArray(index) {
            this.inputArray.splice(index, 1)
        },
        updateValue(type, val) {
            console.log(type,val)
        }
    },
    mounted() {
        this.initialize()
    },
}
</script>