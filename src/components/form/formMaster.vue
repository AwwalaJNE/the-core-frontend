<!--
    onSubmit | parameter ValidationObserver ref
-->

<template>
    <div>
        <template v-if="submit_Enter">
            <ValidationObserver ref="form" @keyup.enter.native="formSubmit">
                <!-- <form @submit.prevent="formSubmit">
                        <slot name='inputValidator'></slot>
                </form> -->
                <slot name='inputValidator'></slot>
            </ValidationObserver>
        </template>
        <template v-else>
            <ValidationObserver ref="form">
                <!-- <form @submit.prevent="formSubmit">
                        <slot name='inputValidator'></slot>
                </form> -->
                <slot name='inputValidator'></slot>
            </ValidationObserver>
        </template>
    </div>
    
</template>
<script>
import { ValidationObserver } from 'vee-validate';
export default {
    name:"form-master",
    props: {
        submitByEnter: Boolean
    },
    components: {
        ValidationObserver
    },
    data() {
        return {
            submit_Enter: this.submitByEnter || false
        }
    },
    methods: {
        formSubmit(){
            this.$emit("onSubmit", this.$refs)
        },
    },
}
</script>