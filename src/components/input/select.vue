<template>
    <div>
        <template v-if="DataArr.length > 0">
            <inputan :name="name" :rules="rules">
                <template v-slot:inputan="props">
                    <!-- <vs-select
                        class="m-select"
                        autocomplete="off"
                        filter
                        :multiple="listenIsMultiple"
                        :placeholder="placeholder"
                        :label="name"
                        v-model="value"
                        :border="border"
                        :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                        @change="updateValue"
                        :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
                    >
                        
                            <vs-option 
                            v-for="(item,key) in DataArr"
                            :key="key"
                            :label="item.label" 
                            :value="item.value">
                                {{item.label}}
                            </vs-option>
                        
                        
                    </vs-select> -->
                    <template v-if="listenHiddenTitle == false">
                      <span class="c-label">{{name}}</span>
                    </template>
                    
                    <template v-if="listenIsMultiple == true">
                      <el-select 
                      v-model="arrValue" 
                      filterable
                      multiple
                      :collapse-tags="listenIsCollapseTags"
                      class="m-select"
                      :placeholder="placeholder"
                      :disabled="listenIsDisabled"
                      @change="updateValue"
                      :state="props.err !== undefined && props.err !== '' ?'danger':'gray'">
                          <el-option
                          v-for="(item,key) in DataArr"
                          :key="key"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                      </el-select>
                    </template>
                    <template v-else>
                     <el-select
                      v-model="value" 
                      filterable
                      class="m-select"
                      :placeholder="placeholder"
                      :disabled="listenIsDisabled"
                      @change="updateValue"
                      :loading="loadingActive"
                      :state="props.err !== undefined && props.err !== '' ?'danger':'gray'">
                          <el-option
                          v-for="(item,key) in DataArr"
                          :key="key"
                          :label="item.label"
                          :value="item.value">
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
import Inputan from "@/components/input/inputan"
export default {
    name:"select-filter",
    components: {
        "inputan": Inputan
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
        border: Boolean,
        placeholder:String,
        tabindex: [Number, String],
        disabled: Boolean,
        hiddenTitle: Boolean,
        collapseTags: Boolean
    },
    data() {
        return {
            DataArr: this.valueData ? this.valueData : [
                {
                    label: 'No Data',
                    value: 'nodata'
                }
            ],
            value: this.selectedValue ? this.selectedValue :"",
            arrValue: this.selectedValue ? this.selectedValue : [],
            loadingActive: false,
            // loading: true,
            // loadingInjector : null
        }
    },
    computed: {
        listenFormKey(){
            return this.formKey || ''
        },
        listenIsMultiple(){
            return this.isMultiple ? this.isMultiple : false
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
                if(this.isMultiple == false) {
                    this.value = val
                } else {
                    this.arrValue = val
                }
            }
        },
        loading: function(val) {
          if(val !== undefined) {
            this.loadingActive = val || false
          }
          console.log('loading', val);
        },
        // loadingData: function (val) {
        //     if(val != undefined) {
        //         this.loading = val || false
        //     }
        // },
        // loading : function (val) {
        //     val == true ? this.loadingHandler() : this.closeLoading()
        // }
    },
    methods: {
        // loadingHandler(){
        //     let ref = `${this.name}`
        //     console.log('this.$refs.ref', this.$refs.nameah, this.name)
        //     this.loadingInjector = this.$vs.loading({
        //         target: this.$refs.nameah,
        //         color: '#333'
        //     })
        // },
        // closeLoading(){
        //     this.loadingInjector !== null ? this.loadingInjector.close() : null
        // },
        updateValue(val){
            let dataValue = this.listenIsMultiple == false ? this.value : this.arrValue
            
            let obj = this.DataArr.filter(item => item.value == val)[0]
            this.$emit("updateValue", this.listenFormKey, dataValue, obj, this.dataObj)
        }
    },
}
</script>
<style lang="scss">
    .m-select{
        &.vs-select-content{
            max-width: unset;
            margin: 10px 0;
        }
        .vs-select__label--label{
            transform: translate(-3px, -28px) !important;
        }
        .vs-select.activeOptions .vs-select__input:focus ~ .vs-select__label--label {
            transform: translate(-3%, -28px) !important;
        }
        &.el-select .el-input .el-input__inner{
            margin-bottom: 0;
        }

        &.el-input{
            &.el-input--suffix{
                .el-input__suffix{
                    .el-input__suffix-inner{
                        position: relative;
                        top: 8px;
                    }
                }
            }
        }
        .el-input__icon{
            height: auto;
        }
    }
    .c-label{
            font-size: 0.75rem;
            /* left: 0px; */
            position: relative;
            align-content: start;
            display: block;
            padding: 4px 7px;
            text-align: left;
        }
</style>