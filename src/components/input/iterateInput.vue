<template>
    <div>
        <template v-if="listInput.length > 0">
            <vs-row justify="space-between" v-for="(item, key) in listInput" :key="key">
                <vs-col xs="8" sm="8" lg="8">
                    <template v-if="item.typeInput.toLowerCase().includes('text')">
                        <input-general 
                            :name="InputObject[item.key].label"
                            :rules="InputObject[item.key].rule" 
                            :formKey="item.key"
                            :valueData="InputObject[item.key].value"
                            :typeInput="InputObject[item.key].typeInput"
                            @updateValue="updateValue" />
                    </template>
                    <template v-else-if="item.typeInput.toLowerCase() == 'select'">
                        <selector 
                            :ref="InputObject[item.key].key"
                            :name="InputObject[item.key].label" 
                            :rules="InputObject[item.key].rule" 
                            :formKey="item.key"
                            :valueData="InputObject[item.key].arrData"
                            :selectedValue="InputObject[item.key].value"
                            :isMultiple="false"
                            @updateValue="updateValue" />
                    </template>
                </vs-col>
                <vs-col xs="2" sm="2" lg="2">
                    <vs-button
                        shadow
                        :active="false"
                        @click="Remove(item.key)"
                    >
                        <i class='bx bx-minus' style="margin-right:5px"></i> Del
                    </vs-button>
                </vs-col>
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
        addBtn: String
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
            keys: [],
            index: 0
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
    methods: {
        initialize() {
            let obj = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm] || {}
            this.keys = obj['dynamicinputcomponent']['arrData'] || []
            this.InputObject = obj
            console.log('dynamicinputcomponent', obj, this.keys)
        },
        Add() {
            if(this.index == 0) {
                if (this.keys.length > 0)
                this.listInput.push(this.keys[0])
                this.index++
            } else if(this.index <= this.keys.length) {
                
                if (this.keys.length > 0) {
                    if(this.keys[this.index] !== undefined && this.keys[this.index] !== null)
                        this.listInput.push(this.keys[this.index])
                        this.index++
                }
                
            }
        },
        Remove(key) {
            if(this.index >= 0) {
                this.index -= 1

                if (this.keys.length > 0) {
                    let filtered =  this.listInput.filter( item => {return item.key !== key})
                    console.log('del',this.listInput, key, filtered)
                    let currentKey = this.keys[this.index]
                    this.$emit("updateValue", key, '')
                    this.listInput = filtered
                }
                    
            }
        },
        updateValue(key, value){
            let currentKey = this.keys[this.index]
            console.log('update value', key, value)

            // this.$emit("updateValue", currentKey['key'], '')
            this.$emit("updateValue", key, value)
        }
    },
    mounted() {
        this.initialize()
    },
}
</script>