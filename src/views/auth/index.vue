<template>
    <vs-row justify="center">
        <vs-col xs="12" sm="3" lg="3">
            <div class="box login" style="margin-top:30%">

                <logo />

                <div class="con-form">
                    <form-input-controller 
                        ref="formLoginController"
                        @formData="formData"
                        getters="getAuth"
                        typeForm="login"
                    />
                </div>
                
                <vs-row justify="flex-end">
                    <vs-col w="3">
                        <vs-button
                        transparent
                        block
                        flat
                        :active="true"
                        type="submit"
                        @click="handleSubmit"
                        >
                            Login
                        </vs-button>
                    </vs-col>
                </vs-row>
            </div>
        </vs-col>
    </vs-row>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Logo from "@/components/logo/logo.vue"
import FormInputController from "@/components/form/formInputController"
export default {
    name: "login",
    mixins: [master],
    components: {
        "form-input-controller": FormInputController,
        "logo": Logo
    },
    data() {
        return {
            form: {}
        }
    },
    methods: {
        handleSubmit(){
            this.$refs.formLoginController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        formData(form){
            this.form = form
            this.login()
        },
        async login() {
            await axios
                .post(
                    this.URL.login,
                    JSON.stringify(this.form), 
                    this.Helper.headerLogin())
                .then(res => {
                    if(res.status == 200) {
                        this.$ls.set('tokenBearer', res.data.data.token)
                        this.$ls.set('user', res.data.data.user)
                        this.$ls.set('config', res.data.data.config)
                    }
                    // localStorage.setItem("tokenBearer", res.data.data.token);
                    // localStorage.setItem("UserID", res.data.data.user.user_id);

                    // this.$ls.set('tokenBearer', res.data.data.token)
                    // this.$ls.set('UserID', res.data.data.user.user_id)
                    // let token = this.$ls.get('tokenBearer')

                    // console.log('token local', token)

                    // this.$router.push({ name: "users"});
                    this.$router.replace('/settings/users')
                    
                }).catch(err => {
                    console.log('err', err)
                    this.openNotification('danger', 'Login failed', err ? err : 'something went wrong')
                })
            
        },
    //     logout() {
    //   localStorage.clear();
    //   // this.$router.push("/login"); push di hide supaya semua vuex dan cache bersih
    //   window.location.href = "/login";
    // },
        async getNode() {

        }
    },
}
</script>
<style lang="scss">
    .login{
        width: 30%;
        margin-bottom: 2em;
    }
</style>