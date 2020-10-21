<!--
    Component ini butuh formMaster.vue (WAJIB) untuk trigger validasi
    @props
        - rules | type string | ex = 'required|email'
-->

<template>
    <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }">
        <slot name='inputan' v-bind:err="errors[0]"></slot>
        <span>{{ errors[0] }}</span>
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