<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <div
                :class="`custom_datePicker ${
                    props.err !== undefined && props.err !== '' ? 'danger' : ''
                }`"
            >
                <template v-if="listenName">
                    <span class="c-label"
                        >{{ name }}<span v-if="rules && rules.includes('required')"> *</span></span
                    >
                </template>
                <template>
                    <el-date-picker
                        ref="customDateInput"
                        v-model="value"
                        :type="type"
                        :placeholder="`Select date ${
                            typeInput.toLowerCase().includes('time') ? 'and time' : ''
                        }`"
                        range-separator="To"
                        :value-format="isInventoryBag ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd HH:mm:ss'"
                        :format="isInventoryBag ? 'yyyy-MM-dd HH:mm' : null"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                        :picker-options="isETDnETA ? pickerOptions : null"
                        :default-time="isETDnETA ? null : ['00:00:00', '23:59:59']"
                        :disabled="listenIsDisabled"
                        :data-testid="
                            name ? `input-date-time-${name.toLowerCase()}` : 'input-date-time'
                        "
                        @change="updateValue"
                        @focus="attachInputSanitizer"
                    >
                    </el-date-picker>
                </template>
            </div>
        </template>
    </inputan>
</template>
<script>
import Inputan from '@/components/input/inputan'
export default {
    name: 'date-time-picker',
    props: {
        name: String,
        rules: String,
        valueData: [String, Array],
        formKey: String,
        typeInput: String,
        prefix: String,
        placeholderGabung: Boolean,
        disabled: Boolean,
    },
    components: {
        inputan: Inputan,
    },
    data() {
        return {
            value: this.valueData || '',
            type: this.typeInput || 'date',
            pickerOptions: {
                disabledDate(time) {
                    var date = new Date()

                    date.setDate(date.getDate() - 1)

                    return time.getTime() < date
                },
            },
        }
    },
    computed: {
        listenName() {
            return this.name ? this.name : false
        },
        listenFormKey() {
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
        isInventoryBag() {
            if (this?.formKey?.toLowerCase() === 'date_time_without_seconds') {
                return true
            } else {
                return false
            }
        },
        isETDnETA() {
            if (
                this.name.toLowerCase() === 'eta' ||
                this.name.toLowerCase() === 'etd' ||
                this.name.toLowerCase() === 'flight schedule'
            ) {
                return true
            } else {
                return false
            }
        },
        listenIsDisabled() {
            return this.disabled
        },
    },
    watch: {
        valueData: function (val) {
            if (val !== undefined) {
                this.value = val || ''
                this.updateValue()
            }
        },
    },
    methods: {
        focus(status) {
            let info = {}
            info['name'] = this.name
            info['key'] = this.listenFormKey
            info['typeInput'] = this.listenTypeInput
            info['status'] = status
            let self = this
            setTimeout(function () {
                self.$emit('inputFocus', info)
            }, 200)
        },
        updateValue() {
            let info = {}
            info['name'] = this.name
            info['key'] = this.listenFormKey
            info['typeInput'] = this.listenTypeInput
            info['status'] = status
            this.$emit('updateValue', this.listenFormKey, this.value, info)
        },
        attachInputSanitizer() {
            this.$nextTick(() => {
                const inputs = this.$refs.customDateInput?.$el?.querySelectorAll('input')
                inputs?.forEach((input) => {
                    input.oninput = () => {
                        input.value = input.value.replace(/[^0-9:\- ]/g, '')
                        this.value = input.value
                    }
                })
            })
        },
    },
}
</script>
<style lang="scss">
.c-label {
    font-size: 0.75rem;
    /* left: 0px; */
    position: relative;
    align-content: start;
    display: block;
    padding: 4px 7px;
    text-align: left;
}
.custom_datePicker {
    .el-date-editor.el-range-editor {
        width: 100%;
        display: flex;
    }
    .el-date-editor.el-input {
        width: 100% !important;
    }
    .el-date-editor .el-range-separator {
        padding: 0 !important;
        margin: 0 5px;
    }
    .el-input__inner {
        background-color: rgba(var(--vs-gray-2), 1) !important;
        border-radius: 12px !important;
        border: 0 !important;
        height: 38px !important;
        line-height: 38px !important;
    }
    .el-range-input {
        background-color: transparent !important;
    }
    &.danger {
        .el-input__inner {
            background: rgba(var(--vs-danger), 0.1) !important;
            color: rgba(var(--vs-danger), 1);
        }

        label {
            color: rgba(var(--vs-danger), 1);
        }
    }
}
.el-picker-panel {
    z-index: 999999 !important;
}
.el-time-spinner__item {
    line-height: 16px !important;
}
</style>
