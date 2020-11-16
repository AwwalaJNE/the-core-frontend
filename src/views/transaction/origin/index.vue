<template>
    <div class="box">
        <div class="con-form">
            <form-input-controller 
                ref="formTransactionOriginController"
                @formData="formData"
                typeForm="origin"
            />
        </div>
    </div>
</template>
<script>
import FormInputController from "@/components/form/formInputControllerTransaction"
export default {
    name: "origin",
    components: {
        "form-input-controller": FormInputController, 
    },
    data() {
        return {
            
        }
    },
    methods: {
        formData(form) {
            console.log(form)
            
        },
        handleSubmit(){
            this.$refs.formTransactionOriginController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
    },
}
</script>