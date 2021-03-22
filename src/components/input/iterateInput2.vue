<template>
    <div>
        <template v-if="listInput.length > 0">
            <vs-row justify="space-between" v-for="(item, index) in listInput" :key="index">
               
                <template v-if="item.hasOwnProperty('inputs')">
                    <vs-col xs="10" sm="10" lg="10">
                        <vs-row justify="space-between">
                            <template v-for="(input, key) in item.inputs">
                                <vs-col xs="4" sm="4" lg="4" :key="key">
                                    <template v-if="input.typeInput.toLowerCase().includes('text')">
                                        <input-general 
                                            :name="InputObject[input.key].label"
                                            :rules="InputObject[input.key].rule" 
                                            :formKey="`${index}|${input.key}`"
                                            :valueData="input.value"
                                            :typeInput="input.typeInput"
                                            @updateValue="updateValue" />
                                    </template>
                                    <template v-else-if="input.typeInput.toLowerCase().includes('select')">
                                        <div class="mt-1">
                                            <selector 
                                            :ref="input.key"
                                            :name="InputObject[input.key].label" 
                                            :rules="InputObject[input.key].rule" 
                                            :formKey="`${index}|${input.key}`"
                                            :valueData="InputObject[input.key].arrData"
                                            :selectedValue="input.value"
                                            :isMultiple="false"
                                            @updateValue="updateValue" />
                                        </div>
                                    </template>
                                </vs-col>
                            </template>
                        </vs-row>
                    </vs-col>
                    <vs-col xs="2" sm="2" lg="2">
                        <vs-button
                            shadow
                            :active="false"
                            @click="Remove(index)"
                        >
                            <i class='bx bx-minus' style="margin-right:5px"></i> Del
                        </vs-button>
                    </vs-col>
                </template>


                
            </vs-row>
        </template>
        <vs-button
            shadow
            :active="false"
            @click="Add"
        >
            <i class='bx bx-plus' style="margin-right:5px"></i> {{ addBtn || 'Add' }}
        </vs-button>
    </div>
</template>
<script>
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
export default {
    name: "iterate-input",
    props: {
        inputList: Array,
        getters: String,
        typeInput: String,
        typeForm: String,
        addBtn: String,
        fromKey: String
    },
    components: {
        "input-general": InputGeneral,
        "selector": Selector,
    },
    data() {
        return {
            listInput: [],
            dataInput: {},
            InputObject: {},
            template: {},
            keys: [],
            index: 0,
            tempform: []
        }
    },
    computed: {
        listenGettersPrefix() {
            return this.getters || 'getInputs' // defaultnya akan mengarah ke global input getters
        },
        listenTypeForm() {
            return this.typeForm
        },
        listenFromKey() {
            return this.fromKey
        },
        listenTypeInput() {
            return this.typeInput
        },
        listenInputs() {
            return this.$store.getters[this.listenGettersPrefix][this.listenTypeForm][this.listenFromKey]['arrData']
        }
    },
    methods: {
        initialize() {
            let obj = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm] || {}
            // this.keys = obj['dynamicinputcomponent']['arrData'] || []
            this.InputObject = obj

            let inputs = obj[this.listenFromKey]['arrData'] || []
            
            let arr = []
            let tempObj = {}
            inputs[0] && inputs[0]['inputs'] && inputs[0]['inputs'].map(item => {
                item.value = ''
                arr.push(item)
            })
            tempObj['inputs'] = arr
            this.template = tempObj

            console.log('this.template', obj,this.template, arr)
            this.listInput = [...inputs]
            this.tempform = [...inputs]
            console.log('dynamicinputcomponent', obj, this.listInput, this.form)
        },
        Add() {
            this.listInput.push(this.template)
            this.tempform.push(this.template)
            
        },
        Remove(index) {
            this.listInput.splice(index,1)
            this.tempform.splice(index,1)
        },
        updateValue(key, value){
            let index = key.split("|")[0]
            let getkey = key.split("|")[1]

            let arr = this.test(this.tempform)
            arr[index]['inputs'].map(item => {
                if(item.key == getkey) {item.value = value}
            })
            this.tempform = arr
            this.$emit("updateValue", this.listenFromKey, this.tempform)
        },
        test(json) {
            return JSON.parse(JSON.stringify(json))
        }
    },
    mounted() {
        this.initialize()
    },
}
</script>