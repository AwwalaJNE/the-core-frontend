<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <template v-if="isHidden == false">
                <template v-if="isPlaceholderGabung">
                    <vs-input
                        :class="`mt-input`"
                        :type="listenTypeInput.includes('password') == true ? 'password' : 'text'"
                        :placeholder="name"
                        v-model="value"
                        :disabled="isDisabled"
                        :autofocus="isFocusToInput"
                        :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                        @input="updateValue"
                        @focus="focus(true)"
                        @blur="focus(false)"
                        ref="generalInput"
                        :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
                    />
                </template>
                <template v-else-if="listenCurrencyMasking">
                    <!-- v-currency -->
                    <vs-input
                        :class="`mt-input`"
                        :type="'text'"
                        :label="name"
                        :label-placeholder="name"
                        
                        v-model="value"
                        :disabled="isDisabled"
                        :autofocus="isFocusToInput"
                        :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                        @input="updateValue"
                        @focus="focus(true)"
                        @blur="focus(false)"
                        ref="generalInput"
                        :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
                    />
                </template>
                <template v-else-if="listenTypeInput.includes('date') == true ">
                    <vs-input
                        :class="`mt-input`"
                        :type="listenTypeInput.includes('date') == true ? 'date' : 'text'"
                        :label="name"
                        :label-placeholder="name"
                        v-model="value"
                        format="yyyy-mm-dd HH:i"
                        :disabled="isDisabled"
                        :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                        @input="updateValue"
                        @focus="focus(true)"
                        @blur="focus(false)"
                        ref="generalInput"
                        :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
                    />
                </template>
                <template v-else>
                    <vs-input
                        :class="`mt-input`"
                        :type="listenTypeInput ? listenTypeInput.includes('password') == true ? 'password' : listenTypeInput : 'text'"
                        :label="name"
                        :label-placeholder="name"
                        v-model="value"
                        :autofocus="isFocusToInput"
                        :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                        :disabled="isDisabled"
                        @input="updateValue"
                        @focus="focus(true)"
                        @blur="focus(false)"
                        ref="generalInput"
                        :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
                    />
                </template>
            </template>
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
        prefix: String,
        placeholderGabung: Boolean,
        focusToInput: Boolean,
        tabindex: [Number, String],
        currencyMasking: Boolean
    },
    components: {
        "inputan": Inputan
    },
    data() {
        return {
            value: this.valueData,
        }
    },
    computed: {
        listenFormKey(){
            return this.formKey
        },
        listenTypeInput() {
            return this.typeInput
        },
        isDisabled() {
            return this.typeInput.includes('disabled')
        },
        isHidden() {
            return this.typeInput.includes('hidden')
        },
        isPlaceholderGabung() {
            return this.placeholderGabung || false
        },
        isFocusToInput() {
            return this.focusToInput || false
        },
        listenTabIndex() {
            return this.tabindex
        },
        listenCurrencyMasking() {
            return this.currencyMasking
        }
    },
    watch: {
        valueData: function(val){
            if(val !== undefined) {
                this.value = val
                this.updateValue()
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
        },
    },
}
</script>