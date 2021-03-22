<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <vs-select
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
                <template v-if="DataArr.length > 0">
                    <vs-option 
                    v-for="(item,key) in DataArr"
                    :key="key"
                    :label="item.label" 
                    :value="item.value">
                        {{item.label}}
                    </vs-option>
                </template>
                
            </vs-select>
        </template>
    </inputan>
    
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
        // loadingData: Boolean,
        selectedValue: [Array, String, Number],
        formKey: String,
        isMultiple: Boolean,
        border: Boolean,
        placeholder:String,
        tabindex: [Number, String]
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
        }
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
            let obj = this.DataArr.filter(item => item.value == val)[0]
            this.$emit("updateValue", this.listenFormKey, val, obj)
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
    }
</style>