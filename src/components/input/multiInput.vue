<template>
    <div>
        <inputan :name="name" :rules="rules">
            <template v-slot:inputan="props">
                <template v-if="!listenHiddenTitle">
                    <span class="c-label">{{ name }}</span>
                </template>

                <el-select 
                    ref="autoFocusSelect"
                    class="multi-input"
                    v-if="!listenIsMultiple"
                    multiple
                    filterable
                    v-model="value"
                    :allow-create="listenAllowCreate"
                    :placeholder="placeholder"
                    :disabled="listenIsDisabled"
                    :loading="loadingActive"
                    :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
                    @keyup.enter.native="addItem"
                    @change="updateValue"
                >
                    <el-option
                        v-for="item in DataTemplate"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.value === 'none'"
                    />
                </el-select>
            </template>
        </inputan>
    </div>
</template>

<script>
import Inputan from "@/components/input/inputan";

export default {
    name: "select-filter",
    components: {
        inputan: Inputan,
    },
    props: {
        name: String,
        rules: String,
        dataObj: [Object, String, Array],
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
        autofocus: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            DataTemplate: [
                {
                    label: 'Write Connote / Bag Number Here',
                    value: 'none',
                },
            ],
            value: this.selectedValue || [],
            loadingActive: false,
        };
    },
    computed: {
        listenFormKey() {
            return this.formKey || '';
        },
        listenIsMultiple() {
            return this.isMultiple || false;
        },
        listenIsMultipleTags() {
            return this.isMultipleTag || false;
        },
        listenTabIndex() {
            return this.tabindex;
        },
        listenIsDisabled() {
            return this.disabled || false;
        },
        listenHiddenTitle() {
            return this.hiddenTitle || false;
        },
        listenAllowCreate() {
            return this.isAllowCreate || false;
        },
    },
    watch: {
        loading(val) {
            this.loadingActive = val || false;
        },
    },
    methods: {
        addItem(event) {
            const newItem = event.target.value.trim();
            if (newItem && !this.value.includes(newItem)) {
                this.value.push(newItem);
                event.target.value = '';

                this.$emit("updateValue", this.listenFormKey, this.value, null, this.dataObj);
            }
        },
        updateValue(val) {
            let dataValue = this.listenIsMultiple ? this.value : this.value[0] || '';
            let obj = this.DataTemplate.find(item => item.value === val);
            this.$emit("updateValue", this.listenFormKey, dataValue, obj, this.dataObj);
        },
        focusSelect() {
            if (this.$refs.autoFocusSelect) {
                this.$nextTick(() => {
                    this.$refs.autoFocusSelect.$el.querySelector('input').focus();
                });
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.autofocus) {
                this.focusSelect();
            }
        });
    },
};
</script>

<style lang="scss">
.multi-input {
    .vs-select__label--label {
        transform: translate(-3px, -28px) !important;
    }
    .vs-select.activeOptions .vs-select__input:focus ~ .vs-select__label--label {
        transform: translate(-3%, -28px) !important;
    }
    .el-select {
        border: none
    }
    &.el-select .el-input .el-input__inner {
        margin-bottom: 0;
        border-radius: 0px !important;
        background: none !important;
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
    position: relative;
    align-content: start;
    display: block;
    padding: 4px 7px;
    text-align: left;
}
</style>
