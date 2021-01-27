<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <div :class="`vs-input-content vs-input-content--has-label custom_datePicker ${props.err !== undefined && props.err !== '' ?'danger':''}`">
                <label class="vs-input__label vs-input__label--placeholder vs-input__label--label">{{name}}</label>
                <el-date-picker
                    v-model="value"
                    :type="`${typeInput.toLowerCase().includes('time') ? 'datetime' : 'date'}`"
                    :placeholder="`Select date ${typeInput.toLowerCase().includes('time') ? 'and time' : ''}`"
                    @change="updateValue">
                </el-date-picker>
            </div>
        </template>
    </inputan>
</template>
<script>
import Inputan from "@/components/input/inputan"
export default {
    name:"date-time-picker",
    props: {
        name: String,
        rules: String,
        valueData: [String, Number],
        formKey: String,
        typeInput: String,
        prefix: String,
        placeholderGabung: Boolean
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
            return this.typeInput || 'text'
        },
        isDisabled() {
            return this.typeInput.includes('disabled')
        },
        isPlaceholderGabung() {
            return this.placeholderGabung || false
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
<style lang="scss">
    .custom_datePicker{
        .el-date-editor.el-input {
            width: 100% !important;
        }
        .el-input__inner {
            background-color: rgba(var(--vs-gray-2), 1) !important;
            border-radius: 12px !important;
            border: 0 !important;
            height: 38px !important;
            line-height: 38px !important;
        }
        &.danger{
            .el-input__inner {
                background: rgba(var(--vs-danger), 0.1) !important;
                color: rgba(var(--vs-danger), 1);
            }
            label{
                color: rgba(var(--vs-danger), 1);
            }
        }
    }
    .el-picker-panel{
        z-index: 999999 !important;
    }
</style>