<template>
    <vs-switch v-model="active" @change="updateValue">
        <template #on>
            {{ listenLabel[0] }}
        </template>
        <template #off>
            {{ listenLabel[1] }}
        </template>
    </vs-switch>
</template>
<script>
export default {
    name:"switch-input",
    props: {
        name: String,
        label: Array,
        valueData: Boolean,
        formKey: String
    },
    computed: {
        listenLabel(){
            return this.label()
        }
    },
    data() {
        return {
            active: this.valueData ? this.valueData : false
        }
    },
    methods: {
        updateValue(){
            this.$emit("updateValue", this.active)
        }
    },
}
</script>