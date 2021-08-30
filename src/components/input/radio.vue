<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <vs-row :style="vertical == true ? 'flex-direction: column !important;':''">
                <template v-if="DataArr.length > 0">
                    <vs-col xs="6" :w="width ? width : 3" v-for="(item,key) in DataArr" :key="key">
                        <vs-radio 
                        style="margin-top:.5em"
                        v-model="value" 
                        :val="item.value" 
                        :disabled="listenIsDisabled"
                        :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
                        :key="key">
                            {{item.label}}
                        </vs-radio>                      
                    </vs-col>
                </template>
            </vs-row>
        </template>
    </inputan>
    
</template>
<script>
import Inputan from "@/components/input/inputan"
export default {
    name:"radio",
    components: {
        "inputan": Inputan
    }, 
    props: {
        name: String,
        rules: String,
        valueData: Array,
        // loadingData: Boolean,
        selectedValue: [String, Number],
        formKey: String,
        typeInput: String,
        border: Boolean,
        vertical: Boolean,
        width: [String, Number],
        disabled: Boolean
    },
    data() {
        return {
            DataArr: this.valueData !== null ? this.valueData : [],
            value: this.selectedValue ? this.selectedValue :"",
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
        listenIsDisabled(){
            return this.disabled || false
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
                this.value = val
            }
        },
        value: function(n, o) {
            if (n !== o) {
                let data = this.DataArr.filter(item => item.value == n)
                this.$emit("updateValue", this.listenFormKey, n, data[0])
            }
        }
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
        // updateValue(val){
        //     this.$emit("updateValue", this.listenFormKey, val)
        // }
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
    .vs-radio-content{
            justify-content: left !important;
        &:focus-within{
            border: 1px solid black;
            border-radius: 5px;
            padding: 2px;
        }
        label{
            font-size: 14px;
        }
        // .vs-radio:focus{
        //     border: 1px solid black;
        // }
        .vs-radio__effect::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            border-radius: 50%;
        border: .1px solid rgba($color: #7a99ee, $alpha: 0.8);
        filter: blur(0);
        transform-origin: 50%;
            display: block;
        }
        &.active:focus-within{
           .vs-radio__effect::before{
               border-color: transparent;
                filter: blur(1px);
                transform: scale(3);
                transition: 800ms transform ease, 2100ms blur ease, 900ms border-color ease;
                transition-delay: 100ms;

            }
        }
    }
    
</style>