<template>
    <div class="checkbox-inp">
        <el-checkbox-group v-model="checkList" @change="updateValue">
            <template v-if="optionsArr">
                <template v-for="(item, key) in optionsArr">
                    <el-checkbox :label="item.value" :key="key">{{item.label}}</el-checkbox>
                </template>
            </template>
        </el-checkbox-group>
    </div>
</template>
<script>
export default {
    name:"checkboxGroupElUI",
    props: {
        checkList: Array,
        optionsArr: Array,
        formKey: String,
        name: String
    },
    data() {
        return {
            checkList: this.checkList
        }
    },
    computed: {
        listenFormKey(){
            return this.formKey
        },
        listenName(){
            return this.name || ''
        },
    },
    methods: {
        changed() {
            // console.log('changed',this.listenFormKey, this.option1)
            this.$emit("changed", this.checkList)
        },
        updateValue(){
            this.$emit("updateValue", this.listenFormKey, this.checkList)
            this.$emit("changed", this.checkList)
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