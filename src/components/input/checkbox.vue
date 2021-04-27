<template>
    <div class="checkbox-inp">
      <vs-checkbox ref="vuesaxCheckbox" :disabled="listenIsDisabled" v-model="option1" @input="updateValue">
          {{listenName}}
      </vs-checkbox>
    </div>
</template>
<script>
export default {
    name:"checkbox",
    props: {
        isChecked: Boolean,
        formKey: String,
        dataObj: [Object, String, Array],
        name: String,
        isDisabled: Boolean
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
        listenIsDisabled(){
            return this.isDisabled
        },
        listenName(){
            return this.name || ''
        },
    },
    methods: {
        changed() {
            // console.log('changed',this.listenFormKey, this.option1)
            this.$emit("changed", this.option1)
        },
        updateValue(){
            let info = {}
            info['data'] = this.dataObj || {}
            this.$emit("updateValue", this.listenFormKey, this.option1, info)
            this.$emit("changed", this.option1)
        }
    },
}
</script>
<style lang="scss">

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