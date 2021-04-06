<template>
    <div>
        <template v-if="listInput.length > 0">
            <vs-row justify="space-between" v-for="(item, index) in listInput" :key="index">
               
                <template v-if="item.hasOwnProperty('inputs')">
                    <vs-col xs="10" sm="10" lg="10">
                        <vs-row justify="space-between">
                            <template v-for="(input, key) in item.inputs">
                                <vs-col 
                                :xs="`${input.width ? input.width:'4'}`" 
                                :sm="`${input.width ? input.width:'4'}`" 
                                :lg="`${input.width ? input.width:'4'}`"
                                :key="key">
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
                                    <template v-else-if="input.typeInput.toLowerCase().includes('autocomplete')">
                                        <template v-if="querySearch !== undefined">
                                            <auto-complete
                                            :ref="input.key"
                                            :name="InputObject[input.key].label"
                                            :rules="InputObject[input.key].rule"
                                            :formKey="`${index}|${input.key}`"
                                            :valueData="InputObject[input.key].value"
                                            :querySearch="querySearch"
                                            :selectedValue="input.value"
                                            :typeForm="listenTypeForm"
                                            :typeInput="InputObject[input.key].typeInput"
                                            @updateValue="updateValue"
                                            @inputFocus="onfocuslah" />
                                        </template>
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
            :disabled="addDisabled"
        >
            <i class='bx bx-plus' style="margin-right:5px"></i> {{ addBtn || 'Add' }}
        </vs-button>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
import AutoComplete from "@/components/input/autoComplete"
export default {
    name: "iterate-input",
    mixins: [master],
    props: {
        inputList: Array,
        getters: String,
        typeInput: String,
        typeForm: String,
        addBtn: String,
        itterateUrlAutoComplete: String,
        itterateFlagAutoComplete: String,
        fromKey: String
    },
    components: {
        "input-general": InputGeneral,
        "selector": Selector,
        "auto-complete": AutoComplete
    },
    data() {
        return {
            listInput: [],
            dataInput: {},
            InputObject: {},
            template: {},
            keys: [],
            index: 0,
            tempform: [],
            Max: null,
            addDisabled: false
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
        },
        listenItterateUrlAutoComplete() {
            return this.itterateUrlAutoComplete
        },
        listenItterateFlagAutoComplete() {
            return this.itterateFlagAutoComplete
        }
        
    },
    methods: {
        initialize() {
            let obj = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm] || {}
            // this.keys = obj['dynamicinputcomponent']['arrData'] || []
            this.InputObject = obj
            this.Max = obj[this.listenFromKey].hasOwnProperty('max') ? obj[this.listenFromKey]['max'] : null
            
            let dataInputs = obj[this.listenFromKey]['arrData'] || []
            this.listInput = [...dataInputs]
            this.tempform = [...dataInputs]

            let inputs_template = obj[this.listenFromKey]['inputs'] || []
            console.log('inputs', inputs_template)
            let arr = []
            let tempObj = {}
            inputs_template && inputs_template.map(item => {
                item.value = ''
                arr.push(item)
            })
            tempObj['inputs'] = arr
            this.template = tempObj

            

            console.log('this.template', obj,this.template, arr)
            
            console.log('dynamicinputcomponent', obj, this.listInput, this.form)
        },
        onfocuslah(info) {
            this.$emit("inputFocus", info)
        },
        querySearch(queryString, cb){
            
            // let flag = this.listenFlag
            // console.log('autocomplete url', flag)
            // console.log('meanwhile from prop was', this.listenUrl)
            axios.get(this.listenItterateUrlAutoComplete +`&s=${queryString}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
                console.log('result',result)
                let suggestions = [];

                result.length > 0 && result.map(item => {
                    if(item.hasOwnProperty(this.itterateFlagAutoComplete)) {
                        suggestions.push({
                                value: item[this.itterateFlagAutoComplete],
                                data: item
                        });
                    }
                })
                

                console.log('suggestions', suggestions)

                cb(suggestions);
                })
            .catch(error => console.log("error", error));
        },
        Add() {
            if(this.Max == null) {
                this.listInput.push(this.template)
                this.tempform.push(this.template)
            } else {
                if(this.listInput.length <= this.Max) {
                    this.addDisabled = false
                    this.listInput.push(this.template)
                    this.tempform.push(this.template)
                } else {
                    this.addDisabled = true // atau bisa pake watcher aja biar langsung
                }
            }
        },
        Remove(index) {
            this.listInput.splice(index,1)
            this.tempform.splice(index,1)

            if(this.Max !== null && this.Max > this.listInput.length) {
                this.addDisabled = false
            }
        },
        updateValue(key, value, info = {}){
            let index = key.split("|")[0]
            let getkey = key.split("|")[1]

            let arr = this.test(this.tempform)
            arr[index]['inputs'].map(item => {
                if(item.key == getkey) {
                    item.value = value
                    item["data"] = info['data'] || {}
                }
            })
            this.tempform = arr

            if(Object.keys(info).length > 0) {
                info['option'] = {
                    'index' : index,
                    'key': getkey,
                    'value': value,
                }
            }
            
            this.$emit("updateValue", this.listenFromKey, this.tempform, info)
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