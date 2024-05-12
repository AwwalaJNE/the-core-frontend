<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <div :class="`vs-input-content vs-input-content--has-label custom_datePicker ${props.err !== undefined && props.err !== '' ?'danger':''}`">
                <label class="vs-input__label vs-input__label--placeholder vs-input__label--label">{{name}}</label>
                <el-date-picker
                    v-model="value"
                    :type="type"
                    :placeholder="`Select date ${typeInput.toLowerCase().includes('time') ? 'and time' : ''}`"
                    range-separator="To"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    :picker-options="isETDnETA ? pickerOptions : null"
                    :disabled="listenIsDisabled"
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
        valueData: [String, Array],
        formKey: String,
        typeInput: String,
        prefix: String,
        placeholderGabung: Boolean,
        disabled: Boolean
    },
    components: {
        "inputan": Inputan
    },
    data() {
        return {
            value: this.valueData,
            type: this.typeInput || 'date',
            pickerOptions: {
                disabledDate(time) {
                    var date = new Date();

                    date.setDate(date.getDate() - 1);

                    return time.getTime() < date;
                }
            }
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
        },
        isETDnETA() {
            if (this.name.toLowerCase() === 'eta' || this.name.toLowerCase() === 'etd') {
                return true;
            } else {
                return false;
            }
        },
        listenIsDisabled() {
            return this.disabled
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
        .el-range-input{
            background-color: transparent !important;
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