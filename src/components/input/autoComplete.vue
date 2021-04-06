<template>
    <div>
        <el-autocomplete
        class="inline-input"
        v-model="value"
        :fetch-suggestions="querySearch"
        :placeholder="`Cari ${name}`"
        :trigger-on-focus="false"
        @select="handleSelect"
        @input="updateValue"
        @focus="inputFocus"
        ></el-autocomplete>
    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master"
import Inputan from "@/components/input/inputan"
export default {
    name:"auto-complete",
    mixins: [master],
    props: {
        name: String,
        rules: String,
        valueData: [String, Number],
        selectedValue: [String, Number],
        formKey: String,
        typeInput: String,
        focusToInput: Boolean,
        getters: String,
        typeForm: String,
        querySearch: Function,

        // url: String,
        // flag: [String, Number]
    },
    components: {
        "inputan": Inputan
    },
    data() {
        return {
            value: this.selectedValue,
        }
    },
    // watch: {
    //     value: function(val){
    //         if(val.length > 2) {
    //             // this.resolveQuery()
    //         }
    //     }
    // },
    computed: {
        listenFormKey(){
            return this.formKey
        },
        listenTypeInput() {
            return this.typeInput
        },
        listenGettersPrefix() {
            return this.getters || 'getInputs' // defaultnya akan mengarah ke global input getters
        },
        listenTypeForm() {
            return this.typeForm
        },
        // listenUrl() {
        //     return this.url || ''
        // },
        // listenFlag() {
        //     return this.flag || ''
        // },
        isDisabled() {
            return this.typeInput.includes('disabled')
        }
    },
    watch: {
        selectedValue: function (val) {
            if (val != undefined) {
                this.value = val
            }
        },
    },
    methods:{
        // querySearch(queryString, cb){
            
        //     let flag = this.listenFlag
        //     console.log('autocomplete url', flag)
        //     console.log('meanwhile from prop was', this.listenUrl)
        //     axios.get(this.listenUrl +`&s=${queryString}`, this.Helper.header())
        //     .then(res => {
        //         let result = res.data.data
        //         console.log('result',result)
        //         let suggestions = [];

        //         result.length > 0 && result.map(item => {
        //             if(item.hasOwnProperty(flag)) {
        //                 suggestions.push({
        //                         value: item[flag],
        //                         data: item
        //                 });
        //             }
        //         })
                

        //         console.log('suggestions', suggestions)

        //         cb(suggestions);
        //         })
        //     .catch(error => console.log("error", error));
        // },
        // resolveQuery(){
        //     let action = this.listenFormKey.toUpperCase() + '_Query'
        //     let prefix = this.listenTypeForm.toUpperCase()
        //     console.log('resolve query', this.value)
        //     this.$store.dispatch(`SET_${prefix}_${action}`, this.value)
        // },
        updateValue(){
            this.$emit("updateValue", this.listenFormKey, this.value, {})
        },
        inputFocus(){
            let info = {}
            info["key"] = this.listenFormKey
            info["typeInput"] = this.listenTypeInput
            info["data"] = this.value
            this.$emit("inputFocus", info)
        },
        handleSelect(item) {

            let info = {}
            info['name'] = this.name
            info['key'] = this.listenFormKey
            info['typeInput'] = this.listenTypeInput
            info['status'] = status
            info['data'] = item.data

            this.$emit("updateValue", this.listenFormKey, item.value, info)
        }
    }
}
</script>