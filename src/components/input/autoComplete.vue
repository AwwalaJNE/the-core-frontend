<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <div style="text-align:left;">
                <small style="padding-left:10px;">{{name}}</small>
                <el-autocomplete
                    class="inline-input"
                    v-model="value"
                    :fetch-suggestions="querySearch"
                    :placeholder="`Search ${name}`"
                    :trigger-on-focus="false"
                    :debounce="400"
                    :data-testid="`autocomplete-${formKey}`"
                    @select="handleSelect"
                    @input="updateValue"
                    @focus="inputFocus"
                    :disabled="isDisabled"
                />
            </div>
        </template>
    </inputan>
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
        disabled: Boolean
    },
    components: {
        "inputan": Inputan
    },
    data() {
        return {
            value: this.selectedValue,
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
            return this.typeInput.includes('disabled') || this.disabled
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
        updateValue(event){
            if (event && typeof event === 'string') {
                this.value = event.replace(/[^a-zA-Z0-9_\-\*\(\)~ ,\/]/g, '');
            }

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
        },
        clear() {
            this.value = '';
        }
    }
}
</script>