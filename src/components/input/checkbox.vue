<template>
    <div class="checkbox-inp">
      <vs-checkbox v-model="option1" @change="updateValue">
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
        name: String
    },
    data() {
        return {
            option1: this.isChecked
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
            this.$emit("changed", this.option1)
        },
        updateValue(){
            this.$emit("updateValue", this.listenFormKey, this.option1)
            this.$emit("changed", this.option1)
        }
    },
}
</script>
<style lang="scss">
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