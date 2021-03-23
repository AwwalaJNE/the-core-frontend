<!--
    Component ini butuh formMaster.vue (WAJIB) untuk trigger validasi
    @props
        - rules | type string | ex = 'required|email'
-->

<template>
    <ValidationProvider class="validation" :name="name" :rules="listenRules" v-slot="{ errors }">
        <slot name='inputan' v-bind:err="errors[0]"></slot>
        <p class="err-message">{{ errors[0] }}</p>
    </ValidationProvider>
</template>
<script>
import "@/components/input/rules"
import { ValidationProvider } from 'vee-validate';
export default {
    name:"inputan",
    components: {
        ValidationProvider
    },
    props: {
        name: String,
        rules: String
    },
    computed: {
        listenRules() {
            if (this.name === 'phone' || this.name === 'Phone' || this.name === 'Phone*') {
                return `${this.rules}|phone`
            } else if (this.name === 'email' || this.name === 'Email' || this.name === 'Email') {
                return `${this.rules}|email`
            } else if (this.name === 'Longitude' || this.name === 'Latitude' || this.name === 'Longitude*' || this.name === 'Latitude*') {
                return `${this.rules}|coordinate`
            } else {
                return this.rules
            }
        }
    }
}
</script>
<style lang="scss">
    .validation{
        text-align: left;
        .err-message{
            margin: 0;
            padding: 0;
            margin-bottom: .5em;
            margin-left: .7em;
            font-size: .8em;
            color: rgba(var(--vs-danger), 1);
        }
        .con-form .vs-input-content{
            margin: 10px 0px 5px;
        }
    }
</style>