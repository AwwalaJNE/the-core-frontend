<template>
    <inputan :name="name" :rules="rules">
       <template v-slot:inputan>
            <div style="text-align:left;" class="el-select-async">
                <span class="c-label">{{ name }}</span>
                <el-select
                    v-model="value"
                    :multiple="multipleFlag"
                    filterable
                    remote
                    placeholder="Please enter a keyword"
                    :remote-method="asynchronousSelect"
                    @change="handleSelect"
                    @focus="inputFocus"
                    :loading="loading"
                    :disabled="listenIsDisabled"
                    :data-testid="`select-${formKey}`"
                >
                    <template v-if="options.length > 0">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </template>
                </el-select>
            </div>
        </template>
    </inputan>
</template>

<script>
import axios from 'axios'
import master from '@/mixins/master'
import Inputan from '@/components/input/inputan'
import _ from 'lodash'

export default {
    name: 'asynchronous-select',
    mixins: [master],
    components: {
        inputan: Inputan,
    },
    props: {
        name: String,
        rules: String,
        selectedValue: [String, Number, Array, Object, null],
        dataObj: [Object, String, Array],
        valueData: Array,
        querySearch: Function,
        formKey: String,
        typeInput: String,
        limitExist: Boolean,
        selectLabel: String,
        selectValue: String,
        url: String,
        disabled: Boolean,

        // ====== BARU ======
        // kalau diisi, ini yang dipakai untuk mode multiple/single
        isMultiple: {
            type: Boolean,
            default: null, // null = ikuti isSingleInput (backward compatible)
        },

        // properti lama (masih dipakai di tempat lain)
        isSingleInput: Boolean,

        isNestedData: Boolean,
        nestedKey: String,
    },
    computed: {
        listenFormKey() {
            return this.formKey
        },
        listenTypeInput() {
            return this.typeInput
        },
        listenUrl() {
            return this.url
        },
        listenIsDisabled() {
            return this.disabled ? this.disabled : false
        },
        listenIsSingleInput() {
            return this.isSingleInput ? this.isSingleInput : false
        },

        // TRUE kalau multiple, FALSE kalau single
        multipleFlag() {
            if (this.isMultiple !== null) {
                return this.isMultiple
            }
            // fallback lama: multiple kalau bukan singleInput
            return !this.listenIsSingleInput
        },
    },
    data() {
        return {
            value: null,
            options: this.valueData ?? [{ label: null, value: null }],
            loading: false,
            query: '',
            limit: 10,
            debouncedAsynchronousSelect: null,
        }
    },
    created() {
        this.debouncedAsynchronousSelect = _.debounce(
            this.asynchronousSelectImpl,
            400
        )

        // normalisasi initial value
        this.value = this.normalizeValue(this.selectedValue)
    },
    watch: {
        selectedValue(val) {
            this.value = this.normalizeValue(val)
        },
        limit(val, old) {
            if (val !== old) {
                this.asynchronousSelect(this.query)
            }
        },
    },
    methods: {
        // bikin value sesuai mode (multiple/single)
        normalizeValue(val) {
            if (this.multipleFlag) {
                if (Array.isArray(val)) return val
                if (val === null || val === undefined || val === '') return []
                return [val]
            }

            // single
            if (Array.isArray(val)) {
                return val[0] || null
            }
            return val ?? null
        },

        asynchronousSelect(queryString) {
            this.query = queryString
            // kirim keyword ke parent kalau perlu
            this.$emit('search', queryString)

            if (queryString && queryString.length > 2) {
                this.loading = true
                this.debouncedAsynchronousSelect(queryString)
            } else {
                this.options = []
            }
        },

        asynchronousSelectImpl(queryString) {
            if (!this.listenUrl) {
                this.loading = false
                return
            }

            queryString !== '' &&
                axios
                    .get(
                        this.listenUrl +
                            `&s=${queryString}` +
                            `${this.limit ? `&limit=${this.limit}` : ''}`,
                        this.Helper.header()
                    )
                    .then((res) => {
                        let result = res.data.data
                        let suggestions = []

                        if (this.isNestedData) {
                            result.length > 0 &&
                                result[0][this.nestedKey].map((item) => {
                                    if (this.selectLabel && this.selectValue) {
                                        suggestions.push({
                                            value: item[this.selectValue],
                                            label: item[this.selectLabel],
                                            data: item,
                                        })
                                    }
                                })

                            this.options = suggestions
                            this.loading = false
                        } else {
                            result.length > 0 &&
                                result.map((item) => {
                                    if (this.selectLabel && this.selectValue) {
                                        suggestions.push({
                                            value: item[this.selectValue],
                                            label: item[this.selectLabel],
                                            data: item,
                                        })
                                    } else if (
                                        Object.prototype.hasOwnProperty.call(
                                            item,
                                            'node_name'
                                        )
                                    ) {
                                        suggestions.push({
                                            value: item['node_id'],
                                            label: item['node_name'],
                                            data: item,
                                        })
                                    } else if (
                                        Object.prototype.hasOwnProperty.call(
                                            item,
                                            'user_name'
                                        )
                                    ) {
                                        suggestions.push({
                                            value: item['user_id'],
                                            label: item['user_name'],
                                            data: item,
                                        })
                                    } else if (typeof item === 'string') {
                                        suggestions.push({
                                            value: item,
                                            label: item,
                                            data: item,
                                        })
                                    }
                                })

                            this.options = suggestions
                            this.loading = false
                        }
                    })
                    .catch(() => {
                        this.loading = false
                    })
        },

        updateOption(arr) {
            this.options =
                arr && arr.length > 0 ? arr : [{ label: null, value: null }]
        },

        inputFocus() {
            const info = {
                key: this.listenFormKey,
                typeInput: this.listenTypeInput,
                data: this.value,
            }

            this.$emit('inputFocus', info)
            this.options = []
        },

        handleSelect(selectedValue) {
            // selectedValue = value atau array of value (dari el-select)
            let selected

            if (this.multipleFlag) {
                const values = Array.isArray(selectedValue)
                    ? selectedValue
                    : [selectedValue]
                selected = this.options.filter((opt) =>
                    values.includes(opt.value)
                )
            } else {
                selected =
                    this.options.find(
                        (opt) => opt.value === selectedValue
                    ) || null
            }

            const info = {
                name: this.name,
                key: this.listenFormKey,
                typeInput: this.listenTypeInput,
                data: selected,
            }

            // val yang dikirim ke parent = object option (atau array object)
            this.$emit(
                'updateValue',
                this.listenFormKey,
                selected,
                info,
                this.dataObj
            )
        },
    },
    mounted() {
        if (this.limitExist) {
            const masonry = document.querySelector(
                '.el-select-async .el-select-dropdown__wrap.el-scrollbar__wrap'
            )
            if (masonry) {
                masonry.addEventListener('scroll', (e) => {
                    if (
                        masonry.scrollHeight -
                            (masonry.scrollTop + masonry.clientHeight) <
                        1
                    ) {
                        this.limit += 10
                    }
                })
            }
        }
    },
}
</script>