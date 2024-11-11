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
<div style="text-align:left;" class="el-select-async">
    <span class="c-label">{{name}}</span>
    <el-select
        v-model="value"
        multiple
        filterable
        remote
        placeholder="Please enter a keyword"
        :remote-method="asynchronousSelect"
        @change="handleSelect"
        :loading="loading">
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
<script>
import axios from "axios";
import master from "@/mixins/master"
import Inputan from "@/components/input/inputan"
export default {
    name: "asynchronous-select",
    mixins: [master],
    props: {
        name: String,
        rules: String,
        selectedValue: [String, Number, Array],
        valueData: Array,
        querySearch: Function,
        formKey: String,
        typeInput: String,
        limitExist: Boolean,
        url: String
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
        }
    },
    data() {
        return {
            value: this.selectedValue ?? null,
            options: this.valueData ?? [{"label": null, "value": null}],
            loading: false,
            query: '',
            limit: 10,
        }
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
            this.loading = true
            this.query = queryString

            queryString != '' && axios.get(this.listenUrl +`&s=${queryString}` + `${this.limit ? `&limit=${this.limit}` : ''}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
                let suggestions = [];

                result.length > 0 && result.map(item => {
                    if(item.hasOwnProperty('node_name')) {
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
        },
        handleSelect(item) {
            let info = {}
            info['name'] = this.name
            info['key'] = this.listenFormKey
            info['typeInput'] = this.listenTypeInput
            info['status'] = status
            // info['data'] = item.data



            this.$emit("updateValue", this.listenFormKey, item, info)
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