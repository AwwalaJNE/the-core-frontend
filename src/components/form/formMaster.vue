<!--
    onSubmit | parameter ValidationObserver ref
-->

<template>
    <ValidationObserver ref="form">
        <form @submit.prevent="formSubmit">
            <slot name='inputValidator'></slot>
        </form>
    </ValidationObserver>
</template>
<script>
import { ValidationObserver } from 'vee-validate';
export default {
    name:"form-master",
    components: {
        ValidationObserver
    },
    methods: {
        formSubmit(){
            this.$emit("onSubmit", this.$refs)
        },
    },
}
</script>