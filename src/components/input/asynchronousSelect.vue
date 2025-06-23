<!--
    - @description component table yg reusable
    
    - @emit {
        - inputFocus | event saat input focus, bisa dipake untuk ganti url di function querySearch
        - updateValue | event saat input selected 
    }
    - @props {
        - width: String | 'md','sm','xs','xxs','auto'
        
    }
-->
<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <div style="text-align:left;" class="el-select-async">
                <span class="c-label">{{name}}</span>
                <el-select
                    v-model="value"
                    :multiple="!listenIsSingleInput"
                    filterable
                    remote
                    placeholder="Please enter a keyword"
                    :remote-method="asynchronousSelect"
                    @change="handleSelect"
                    @focus="inputFocus"
                    :loading="loading"
                    :disabled="listenIsDisabled"
                >
                        <template v-if="options.length > 0">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </template>
                </el-select>
            </div>
        </template>
    </inputan>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Inputan from "@/components/input/inputan"
import _ from 'lodash'

export default {
    name: "asynchronous-select",
    mixins: [master],
    props: {
        name: String,
        rules: String,
        selectedValue: [String, Number, Array],
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
        isSingleInput: Boolean,
        isNestedData: Boolean,
        nestedKey: String
    },
    components: {
        "inputan": Inputan
    },
    computed: {
        listenFormKey(){
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
    },
    data() {
        return {
            value: this.selectedValue ?? null,
            options: this.valueData ?? [{"label": null, "value": null}],
            loading: false,
            query: '',
            limit: 10,
            debouncedAsynchronousSelect: null
        }
    },
    created() {
        // Create a debounced version of the asynchronousSelect method
        this.debouncedAsynchronousSelect = _.debounce(this.asynchronousSelectImpl, 400)
    },
    watch: {
        selectedValue: function (val) {
            if (val != undefined) {
                this.value = val
            }
        },
        limit: function (val, old) {
            if (val !== old) {
                this.asynchronousSelect(this.query)
            }
        }
        // valueData: function(val) {
        //     if (val != undefined) {
        //         this.options = val
        //     }
        // }
    },
    methods: {
        asynchronousSelect(queryString) {
            this.query = queryString
            if (queryString && queryString.length > 2) {
                this.loading = true
                this.debouncedAsynchronousSelect(queryString)
            } else {
                this.options = []
            }
        },
        asynchronousSelectImpl(queryString) {
            queryString != '' && axios.get(this.listenUrl +`&s=${queryString}` + `${this.limit ? `&limit=${this.limit}` : ''}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
                let suggestions = [];

                if (this.isNestedData) {
                    result.length > 0 && result[0][this.nestedKey].map(item => {
                        if (this.selectLabel && this.selectValue){
                            suggestions.push({
                                value: item[this.selectValue],
                                label: item[this.selectLabel],
                                data: item
                            });
                        }
                    })
                    
                    this.options = suggestions
                    // this.$store.dispatch("SET_COST_TO_COST_REPORT_CONTOHMULTIPLESELECTASYNC_ArrData", suggestions.length > 0 ? suggestions : [{"label": null, "value": null, "data": {}}])
                    this.loading = false
                } else {
                    result.length > 0 && result.map(item => {
                        if (this.selectLabel && this.selectValue){
                            suggestions.push({
                                value: item[this.selectValue],
                                label: item[this.selectLabel],
                                data: item
                            });
                        } else if(item.hasOwnProperty('node_name')) {
                            suggestions.push({
                                value: item['node_id'],
                                label: item['node_name'],
                                data: item
                            });
                        } else if(item.hasOwnProperty('user_name')) {
                            suggestions.push({
                                value: item['user_id'],
                                label: item['user_name'],
                                data: item
                            });
                        } else if (typeof item === 'string') {
                            suggestions.push({
                                value: item,
                                label: item,
                                data: item
                            });
                        }
                    })
                    
                    this.options = suggestions
                    // this.$store.dispatch("SET_COST_TO_COST_REPORT_CONTOHMULTIPLESELECTASYNC_ArrData", suggestions.length > 0 ? suggestions : [{"label": null, "value": null, "data": {}}])
                    this.loading = false
                }
                
            })
            .catch(error => {
                this.loading = false
            });
        },
        updateOption(arr) {

           this.options = arr && arr.length > 0 ? arr : [{"label": null, "value": null}] 
        },
        inputFocus(){
            let info = {}
            info["key"] = this.listenFormKey
            info["typeInput"] = this.listenTypeInput
            info["data"] = this.value

            this.$emit("inputFocus", info)

            this.options = []
        },
        handleSelect(item) {
            let info = {}
            info['name'] = this.name
            info['key'] = this.listenFormKey
            info['typeInput'] = this.listenTypeInput
            info['status'] = status
            // info['data'] = item.data



            this.$emit("updateValue", this.listenFormKey, item, info, this.dataObj)
        }
    },
    mounted() {
        if (this.limitExist) {
            const masonry = document.querySelector('.el-select-async .el-select-dropdown__wrap.el-scrollbar__wrap');
            masonry.addEventListener('scroll', e => {
                if (masonry.scrollHeight - (masonry.scrollTop + masonry.clientHeight) < 1) {
                    this.limit += 10;
                }
            });
        }
    }
}
</script>
<style lang="scss">
    .el-select-async{
        .el-select {
            .el-input .el-input__inner{
                margin-bottom: 0 !important;
                min-height: 40px;
                height: fit-content;
                padding: 0px 13px;
            }
            &:focus-within {
                border: none !important;
            }
            .el-select__tags{
                width: auto !important;
                margin-top: -2px;
                min-height: 40px !important;
                height: fit-content !important;
            }
        }
    }
</style>