<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <vs-input
                class="mt-input"
                :type="listenTypeInput.includes('password') == true ? 'password' : 'text'"
                :label="name"
                :label-placeholder="name"
                v-model="value"
                :disabled="isDisabled"
                @input="updateValue"
                @focus="focus(true)"
                @blur="focus(false)"
                :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
            />
        </template>
    </inputan>
</template>
<script>
import Inputan from "@/components/input/inputan"
export default {
    name:"input-general",
    props: {
        name: String,
        rules: String,
        valueData: [String, Number],
        formKey: String,
        typeInput: String,
        prefix: String
    },
    components: {
        "inputan": Inputan
    },
    data() {
        return {
            value: this.valueData
        }
    },
    computed: {
        listenFormKey(){
            return this.formKey
        },
        listenTypeInput() {
            return this.typeInput || 'text'
        },
        isDisabled() {
            return this.typeInput.includes('disabled')
        }
    },
    watch: {
        valueData: function(val){
            if(val !== undefined) {
                this.value = val
            }
        }
    },
    methods: {
        focus(status){
            let info = {}
            info['name'] = this.name
            info['key'] = this.listenFormKey
            info['typeInput'] = this.listenTypeInput
            info['status'] = status
            let self = this
            setTimeout(function(){ self.$emit("inputFocus", info) }, 200);
        },
        updateValue(){
            let info = {}
            info['name'] = this.name
            info['key'] = this.listenFormKey
            info['typeInput'] = this.listenTypeInput
            info['status'] = status
            this.$emit("updateValue", this.listenFormKey, this.value, info)
        }
    }
}
</script>