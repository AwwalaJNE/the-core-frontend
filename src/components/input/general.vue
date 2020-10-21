<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <vs-input
                :label-placeholder="name"
                v-model="value"
                @input="updateValue"
                :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
            />
        </template>
    </inputan>
</template>
<script>
import Inputan from "@/components/input/inputan"
export default {
    name:"input-general",
    props: {
        name: String,
        rules: String,
        valueData: [String, Number],
        formKey: String
    },
    components: {
        "inputan": Inputan
    },
    data() {
        return {
            value: this.valueData
        }
    },
    computed: {
        listenFormKey(){
            return this.formKey
        },
    },
    watch: {
        valueData: function(val){
            if(val !== undefined) {
                this.value = val
            }
        }
    },
    methods: {
        updateValue(){
            this.$emit("updateValue", this.listenFormKey, this.value)
        }
    }
}
</script>