<template>
    <div class="com_switch">
        <small>{{listenLabel}}</small>
        <vs-switch class="switch-Cus" v-model="active" @change="updateValue">
            <template #on>
                {{ listenName[0] }}
            </template>
            <template #off>
                {{ listenName[1] }}
            </template>
        </vs-switch>
    </div>
</template>
<script>
export default {
    name:"switch-input",
    props: {
        name: String,
        titleLabel: String,
        valueData: Boolean,
        formKey: String
    },
    computed: {
        listenName(){
            return this.name.split("|")
        },
        listenLabel(){
            return this.titleLabel || ''
        },
        listenFormKey(){
            return this.formKey
        },
    },
    data() {
        return {
            active: this.valueData
        }
    },
    watch: {
        valueData: function(val) {
            this.active = val
        }
    },
    methods: {
        updateValue(){
            this.$emit("updateValue", this.listenFormKey, this.active)
        }
    },
}
</script>
<style lang="scss">
    .com_switch{
        text-align: left;
        margin-bottom: 1em;
        small{
        }
        .switch-Cus{
            margin-top: .5em;
            max-width:100px !important;
        }
    }
</style>