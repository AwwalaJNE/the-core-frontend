<template>
    <div class="checkbox-inp">
        <inputan :name="name" :rules="rules">
            <template v-slot:inputan="props">
                <vs-checkbox 
                v-model="option1" 
                @change="changed" 
                :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"/>
            </template>
        </inputan>
    </div>
</template>
<script>
import Inputan from "@/components/input/inputan"
export default {
    name:"checkbox",
    props: {
        isChecked: Boolean,
        formKey: String
    },
    components: {
        "inputan": Inputan
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
    },
    methods: {
        changed() {
            this.$emit("changed", this.option1)
        },
        updateValue(){
            this.$emit("updateValue", this.listenFormKey, this.option1)
        }
    },
}
</script>
<style lang="scss">
    // .checkbox-inp{
    //     .vs-icon-check span{
    //         width: 11px;
    //         margin-left: -1px;
    //     }
    //     // .vs-icon-check span .line1{
    //     //     width: 4px;
    //     // }
    //     // .vs-icon-check span .line2{
    //     //     width: 4px;
    //     // }
    // }
</style>