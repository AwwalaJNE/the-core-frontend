<template>
    <div>
        <el-autocomplete
        class="inline-input"
        v-model="value"
        :fetch-suggestions="querySearch"
        :placeholder="`Cari ${name}`"
        :trigger-on-focus="false"
        @select="handleSelect"
        ></el-autocomplete>
    </div>
</template>
<script>

// import axios from "axios";
// import master from "@/mixins/master"
import Inputan from "@/components/input/inputan"
export default {
    name:"auto-complete",
    // mixins: [master],
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
        querySearch: Function
    },
    components: {
        "inputan": Inputan
    },
    data() {
        return {
            value: this.selectedValue,
        }
    },
    watch: {
        value: function(val){
            if(val.length > 2) {
                this.resolveQuery()
            }
        }
    },
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
        isDisabled() {
            return this.typeInput.includes('disabled')
        }
    },
    methods:{
        // querySearch(queryString, cb){
        //     axios.get()
        //     .then(res => {
        //         let result = res.data
        //         console.log('result',result)
        //         let suggestions = [];

        //         if (result["items"] != undefined && result["items"].length > 0) {
        //             result["items"].forEach(item => {
        //             suggestions.push({
        //                 value: item.address.label,
        //                 data: item
        //             });
        //             });
        //         }

        //         console.log('suggestions', suggestions)

        //         cb(suggestions);
        //         })
        //     .catch(error => console.log("error", error));
        // },
        resolveQuery(){
            let action = this.listenFormKey.toUpperCase() + '_Query'
            let prefix = this.listenTypeForm.toUpperCase()
            console.log('resolve query', this.value)
            this.$store.dispatch(`SET_${prefix}_${action}`, this.value)
        },
        updateValue(){
            
        },
        handleSelect(item) {

            let info = {}
            info['name'] = this.name
            info['key'] = this.listenFormKey
            info['typeInput'] = this.listenTypeInput
            info['status'] = status
            info['data'] = item.data

            let action = this.listenFormKey.toUpperCase() + '_ValueData'
            let prefix = this.listenTypeForm.toUpperCase()
            this.$store.dispatch(`SET_${prefix}_${action}`, item.data)
            

            this.$emit("updateValue", this.listenFormKey, item.value, info)
        }
    }
}
</script>