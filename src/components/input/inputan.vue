<!--
    Component ini butuh formMaster.vue (WAJIB) untuk trigger validasi
    @props
        - rules | type string | ex = 'required|email'
-->

<template>
    <ValidationProvider class="validation" :name="name" :rules="rules" v-slot="{ errors }">
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
    }
}
</script>
<style lang="scss">
    .validation{
        text-align: left;
        .err-message{
            margin: 0;
            padding: 0;
            font-size: .8em;
        }
    }
</style>