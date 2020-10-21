<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="closeDialogUser">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form>
                    <vs-input
                        label-placeholder="Name*"
                        v-model="form.user_name"
                    />
                    <vs-input
                        label-placeholder="Username*"
                        v-model="form.user_login"
                    />
                    <vs-input
                        label-placeholder="Email*"
                        v-model="form.user_email"
                    />
                    <vs-input
                        label-placeholder="Password*"
                        v-model="form.password"
                    />
                    <!-- <vs-input
                        label-placeholder="Phone number*"
                        v-model="form.phone"
                    /> -->
                </form>
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
                    block
                    danger
                    flat
                    :active="true"
                    @click="cancel"
                    >
                        Cancel
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                    block
                    flat
                    :active="true"
                    @click="addData"
                    >
                        Add
                    </vs-button>
                </vs-col>
            </vs-row>
                
                
        </template>

    </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
    name:"dialog-create-edit-user",
    mixins: [master],
    components: {
        'dialog-master': DialogMaster
    },
    props: {
       closeDialogUser: Function, 
       active: Boolean,
       title: String
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenTitle(){
            return this.title
        }
    },
    data() {
        return {
            form: {
                user_name:'',
                user_email:'',
                user_login:'',
                password:'',
                user_role_id:'1'
            }
        }
    },
    methods: {
        async addData() {
            console.log('form', this.form)
            await axios
                .post(
                    this.URL.user + `?n=1`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to collect users list', err)
                })
        },
        cancel() {
            
            this.form.user_name = ''
            this.form.user_email = ''
            this.form.user_login = ''
            this.form.password = ''
            this.form.user_role_id = ''
            
            this.closeDialogUser()
        }
    },
}
</script>