<template>
    <div>
        <template v-if="listInput.length > 0">
            <vs-row justify="space-between" align="center" v-for="(item, index) in listInput" :key="index">
               
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
                                    <template v-else-if="input.typeInput.toLowerCase() == 'date'">
                                        <div class="dynamic-date">
                                            <input-general
                                            :name="InputObject[input.key].label"
                                            :rules="InputObject[input.key].rule"
                                            :formKey="`${index}|${input.key}`"
                                            :valueData="input.value"
                                            :typeInput="input.typeInput"
                                            @updateValue="updateValue" />
                                        </div>
                                    </template>
                                    <template v-else-if="input.typeInput.toLowerCase().includes('multipleselector')">
                                        <asynchronousSelect 
                                                :ref="input.key"
                                                :name="InputObject[input.key].label" 
                                                :rules="input.rule" 
                                                :formKey="`${index}|${input.key}`"
                                                :valueData="InputObject[input.key].arrData"
                                                :selectedValue="input.value"
                                                :url="asynchronousSelect_url"
                                                :selectLabel="selectLabel"
                                                :selectValue="selectValue"
                                                :isSingleInput="InputObject[input.key].isSingleInput"
                                                :isNestedData="isNestedData"
                                                :nestedKey="nestedKey"
                                                :typeInput="InputObject[input.key].typeInput"
                                                @updateValue="updateValue(InputObject[input.key].typeInput, ...arguments)"
                                                @inputFocus="onfocuslah" />
                                    </template>
                                    <template v-else-if="input.typeInput.toLowerCase().includes('selectmultipletag')">
                                            <div>
                                                <selector 
                                                :ref="input.key"
                                                :name="InputObject[input.key].label" 
                                                :rules="InputObject[input.key].rule" 
                                                :formKey="`${index}|${input.key}`"
                                                :valueData="InputObject[input.key].arrData"
                                                :selectedValue="input.value"
                                                :isMultipleTag="true"
                                                @updateValue="updateValue" />
                                            </div>
                                    </template>
                                    <template v-else-if="input.typeInput.toLowerCase().includes('select')">
                                            <selector 
                                            :ref="input.key"
                                            :name="InputObject[input.key].label" 
                                            :rules="input.rule" 
                                            :formKey="`${index}|${input.key}`"
                                            :valueData="InputObject[input.key].arrData"
                                            :selectedValue="input.value"
                                            :isMultiple="false"
                                            :isAllowCreate="false"
                                            :typeInput="InputObject[input.key].typeInput"
                                            @updateValue="updateValue(InputObject[input.key].typeInput, ...arguments)"
                                            @inputFocus="onfocuslah" />
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
            style="max-width: 200px !important;"
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
import asynchronousSelect from "@/components/input/asynchronousSelect"
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
        asynchronousSelect_url: String,
        fromKey: String,
        disabled: Boolean,
        selectLabel: String,
        selectValue: String,
        isSingleInput: Boolean,
        isNestedData: Boolean,
        nestedKey: String
    },
    components: {
        "input-general": InputGeneral,
        "selector": Selector,
        "auto-complete": AutoComplete,
        "asynchronousSelect": asynchronousSelect
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
            if (this.disabled) {
                this.addDisabled = true
            }
            let obj = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm] || {}
            // this.keys = obj['dynamicinputcomponent']['arrData'] || []
            this.InputObject = obj
            this.Max = obj[this.listenFromKey].hasOwnProperty('max') ? obj[this.listenFromKey]['max'] : null
            
            let dataInputs = obj[this.listenFromKey]['arrData'] || []
            this.listInput = [...dataInputs]
            this.tempform = [...dataInputs]

            let inputs_template = obj[this.listenFromKey]['inputs'] || []

            let arr = []
            let tempObj = {}
            inputs_template && inputs_template.map(item => {
                item.value = ''
                arr.push(item)
            })
            tempObj['inputs'] = arr
            this.template = tempObj

            


            

        },
        onfocuslah(info) {
            this.$emit("inputFocus", info)
        },
        querySearch(queryString, cb){
            
            // let flag = this.listenFlag
            axios.get(this.listenItterateUrlAutoComplete +`&s=${queryString}`, this.Helper.header())
            .then(res => {
                let result = res.data.data

                let suggestions = [];

                result.length > 0 && result.map(item => {
                    if(item.hasOwnProperty(this.itterateFlagAutoComplete)) {
                        suggestions.push({
                                value: item[this.itterateFlagAutoComplete],
                                data: item
                        });
                    }
                })
                



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

            let prefix = this.listenTypeForm.toUpperCase()
            let action = ""
            for (const [key, value] of Object.entries(this.InputObject)) {
                if (value["key"].includes("dynamicinputcomponent") && _.isEqual(value["inputs"], this.template["inputs"])) {
                    action = value["key"].toUpperCase()
                }
            }
            this.$store.dispatch(`SET_${prefix}_${action}`, this.tempform)

        },
        updateValue(typeInput, key, value, info = {}){
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
                info['typeInput'] = typeInput;
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
<style lang="scss">
    .dynamic-date .validation {
        .vs-input-parent {
            margin-top: 14px;
            .vs-input-content {
                height: fit-content;
                input {
                    height: 40px;
                }
            }
        }
    }
</style>