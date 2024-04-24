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
<div style="text-align:left;">
    <span class="c-label">{{name}}</span>
    <div class="el-select-async">
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
</div>
    <!-- <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <div style="text-align:left;">
                <small style="padding-left:10px;">{{name}}</small>
                <el-form-item :slot-scope="props.err" :error="props.err" :label="name">
                    
                </el-form-item>
            </div>
        </template>
    </inputan> -->
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
        }
    },
    watch: {
        selectedValue: function (val) {
            if (val != undefined) {
                this.value = val
            }
        },
        // valueData: function(val) {
        //     if (val != undefined) {
        //         this.options = val
        //     }
        // }
    },
    methods: {
        asynchronousSelect(queryString) {
            this.loading = true

            queryString != '' && axios.get(this.listenUrl +`&s=${queryString}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
                // console.log('result',result)
                let suggestions = [];

                result.length > 0 && result.map(item => {
                    if(item.hasOwnProperty('node_name')) {
                        suggestions.push({
                                value: item['node_id'],
                                label: item['node_name'],
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
                console.log("error", error)
            });
        },
        updateOption(arr) {
            console.log('cb :',arr)
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

            console.log('this.listenFormKey, item.value, info', this.listenFormKey, item.value, info)

            this.$emit("updateValue", this.listenFormKey, item, info)
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