<template>
    <div>
        <template>
            <inputan :name="name" :rules="rules">
                <template v-slot:inputan="props">
                    <template v-if="listenHiddenTitle == false">
                        <span class="c-label">
                            {{ name }}
                            <span v-if="rules && rules.includes('required')"> *</span>
                        </span>
                    </template>

                    <template v-if="listenIsMultiple == true">
                        <el-select
                            ref="filterInputRef"
                            v-model="arrValue"
                            filterable
                            multiple
                            :collapse-tags="listenIsCollapseTags"
                            class="m-select"
                            :placeholder="placeholder"
                            :disabled="listenIsDisabled"
                            :loading="loadingActive"
                            @change="updateValue"
                            @visible-change="setupSanitizeFilterInput"
                            :data-testid="`select-${formKey}`"
                            :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
                        >
                            <el-option
                                v-for="(item, key) in DataArr"
                                :key="key"
                                :label="item.label"
                                :value="item.value"
                                v-bind="getCustomAttribute(item.label)"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template v-else-if="listenIsMultipleTags == true">
                        <el-select
                            ref="filterInputRef"
                            v-model="arrValue"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            :reserve-keyword="false"
                            :disabled="listenIsDisabled"
                            class="m-select"
                            :placeholder="placeholder"
                            :loading="loadingActive"
                            :is-Multiple-Tag="listenIsMultipleTags"
                            @change="updateValue"
                            @visible-change="setupSanitizeFilterInput"
                            :data-testid="`select-${formKey}`"
                            :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
                        >
                            <el-option
                                v-for="(item, key) in DataArr"
                                :key="key"
                                :label="item.label"
                                :value="item.value"
                                v-bind="getCustomAttribute(item.label)"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template v-else-if="listenIsMultiple == false">
                        <el-select
                            ref="filterInputRef"
                            v-model="value"
                            :allow-create="listenAllowCreate"
                            filterable
                            class="m-select"
                            :placeholder="placeholder"
                            :disabled="listenIsDisabled"
                            @change="updateValue"
                            @focus="inputFocus"
                            @visible-change="setupSanitizeFilterInput"
                            :clearable="listenHasClearButton"
                            :loading="loadingActive"
                            :data-testid="`select-${formKey}`"
                            :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
                        >
                            <el-option
                                v-for="(item, key) in DataArr"
                                :key="key"
                                :value="item.value"
                                :label="item.formattedLabel ? item.formattedLabel.join(' ') : (item.code || item.label || '')"
                            >
                                <template v-if="item.hasOwnProperty('formattedLabel')">
                                    <span v-for="(line, index) in item.formattedLabel" :key="index">
                                        {{ line }}
                                        <br v-if="index < item.formattedLabel.length - 1" />
                                    </span>
                                </template>
                                <template v-else>
                                    {{ item.label }}
                                </template>
                            </el-option>
                        </el-select>
                    </template>
                </template>
            </inputan>
        </template>
        <!-- {{value}} -->
    </div>
</template>
<script>
import Inputan from '@/components/input/inputan'
export default {
    name: 'select-filter',
    components: {
        inputan: Inputan,
    },
    props: {
        name: String,
        rules: String,
        valueData: Array,
        dataObj: [Object, String, Array],
        // loadingData: Boolean,
        loading: Boolean,
        selectedValue: [Array, String, Number],
        formKey: String,
        isMultiple: Boolean,
        isMultipleTag: Boolean,
        border: Boolean,
        placeholder: String,
        tabindex: [Number, String],
        disabled: Boolean,
        hiddenTitle: Boolean,
        collapseTags: Boolean,
        isAllowCreate: Boolean,
        customBind: String,
        hasClearButton: Boolean,
    },
    data() {
        return {
            DataArr: this.valueData
                ? this.valueData
                : [
                      {
                          label: 'No Data',
                          value: 'nodata',
                      },
                  ],
            value: this.selectedValue ? this.selectedValue : '',
            arrValue: this.selectedValue ? this.selectedValue : [],
            loadingActive: false,
        }
    },
    computed: {
        listenFormKey() {
            return this.formKey || ''
        },
        listenIsMultiple() {
            return this.isMultiple ? this.isMultiple : false
        },
        listenIsMultipleTags() {
            return this.isMultipleTag ? this.isMultipleTag : false
        },
        listenTabIndex() {
            return this.tabindex
        },
        listenIsDisabled() {
            return this.disabled ? this.disabled : false
        },
        listenHiddenTitle() {
            return this.hiddenTitle ? this.hiddenTitle : false
        },
        listenIsCollapseTags() {
            return this.collapseTags ? this.collapseTags : false
        },
        listenAllowCreate() {
            return this.isAllowCreate ? this.isAllowCreate : false
        },
        listenHasClearButton() {
            return this.hasClearButton || false
        },
    },
    watch: {
        valueData: function (val) {
            if (val != undefined) {
                this.DataArr = val
                // this.DataArr.length > 0 ? this.loading = false : this.loading = true
            }
        },
        selectedValue: function (val) {
            if (val != undefined) {
                if (this.isMultiple == false && this.listenIsMultipleTags == false) {
                    this.value = val
                } else if (this.listenIsMultipleTags == true) {
                    this.arrValue = val
                } else {
                    this.arrValue = val
                }
            }
        },
        loading: function (val) {
            if (val !== undefined) {
                this.loadingActive = val || false
            }
        },
    },
    methods: {
        updateValue(val) {
            let dataValue =
                this.listenIsMultiple == false && this.isMultipleTag === false
                    ? this.value
                    : this.arrValue
            let obj = this.DataArr.filter((item) => item.value == val)[0]
            this.$emit('updateValue', this.listenFormKey, dataValue, obj, this.dataObj)
        },
        inputFocus() {
            this.$emit('inputFocus', this.dataObj)
        },
        getCustomAttribute(label) {
            return {
                [this.customBind]: label,
            }
        },
        setupSanitizeFilterInput() {
            this.$nextTick(() => {
                const inputEls = this.$el.querySelectorAll(
                    'input.el-input__inner, input.el-select__input'
                )

                inputEls.forEach((input) => {
                    if (input._hasSanitizeListener) return

                    input.addEventListener('input', (e) => {
                        const clean = e.target.value.replace(/[^a-zA-Z0-9_\-\*\(\)~ ,\/]/g, '')
                        if (e.target.value !== clean) {
                            e.target.value = clean
                            e.target.dispatchEvent(new Event('input'))
                        }
                    })

                    input._hasSanitizeListener = true
                })
            })
        },
    },
    mounted() {
        this.setupSanitizeFilterInput()
    },
}
</script>
<style lang="scss" scoped>
.m-select {
    &.vs-select-content {
        max-width: unset;
        margin: 10px 0;
    }
    .vs-select__label--label {
        transform: translate(-3px, -28px) !important;
    }
    .vs-select.activeOptions .vs-select__input:focus ~ .vs-select__label--label {
        transform: translate(-3%, -28px) !important;
    }
    &.el-select .el-input .el-input__inner {
        margin-bottom: 0;
    }

    &.el-input {
        &.el-input--suffix {
            .el-input__suffix {
                .el-input__suffix-inner {
                    position: relative;
                    top: 8px;
                }
            }
        }
    }
    .el-input__icon {
        height: auto;
    }
}
.c-label {
    font-size: 0.75rem;
    /* left: 0px; */
    position: relative;
    align-content: start;
    display: block;
    padding: 4px 7px;
    text-align: left;
}
</style>
<style scoped>
.el-select-dropdown__item {
    min-height: 34px;
    height: fit-content !important;
}
</style>
