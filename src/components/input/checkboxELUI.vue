<template>
    <div @keyup.enter="keyHandler" style="text-align: left;">
        <el-checkbox ref="elBoxc" :disabled="listenIsDisabled" v-model="option1" @change="updateValue">{{listenName}}</el-checkbox>
    </div>
</template>
<script>
export default {
    name:"checkboxELUI",
    props: {
        isChecked: Boolean,
        formKey: String,
        name: String,
        disabled: Boolean
    },
    data() {
        return {
            option1: this.isChecked
        }
    },
    watch:{
        isChecked: function(val) {
            if(val != undefined) {
                this.option1 = val
            }
        },
    },
    computed: {
        listenFormKey(){
            return this.formKey
        },
        listenName(){
            return this.name || ''
        },
        listenIsDisabled(){
            return this.disabled || false
        },
    },
    methods: {
        updateValue(){
            this.$emit("updateValue", this.listenFormKey, this.option1)
            // this.$emit("changed", this.option1)
        },
        keyHandler(e){
            this.option1 = !this.option1
            this.updateValue()

        },
    },
}
</script>
<style lang="scss">
    .el-checkbox{
        font-size: 16px;
        &:focus-within{
            border: 1px solid black;
            border-radius: 5px;
            padding: 2px;
        }
    }
// .checkbox-inp{
//     $root: &;
    
//     .vs-checkbox:focus {
//             @at-root {
//                 #{$root} {
//                     border: 1px solid red;
//                 }
//             }
//         }
// }


    // .checkbox-inp{
    //     // .vs-icon-check span{
    //     //     width: 11px;
    //     //     margin-left: -1px;
    //     // }
    //     // .vs-icon-check span .line1{
    //     //     width: 4px;
    //     // }
    //     // .vs-icon-check span .line2{
    //     //     width: 4px;
    //     // }
    // }
</style>