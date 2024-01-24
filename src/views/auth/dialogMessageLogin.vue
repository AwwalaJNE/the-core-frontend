<template>
    <dialog-master :actived="listenActive" 
    :closeDialog="cancel">

        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller ref="formProfileUpdate" @formData="formData"  :dataItem="listenDataItem"
                    typeForm="profile_dialog" :submitByEnter="true" />
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button transparent block flat :active="true" type="submit" @click="handleSubmit">
                        {{ btnBlue || 'Add' }}
                    </vs-button>
                </vs-col>
            </vs-row>


        </template>

    </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import FormInputController from "@/components/form/formInputController"
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
    name: "dialog-message-update-password",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
    },
    props: {
        closeDialog: Function, 
        active: Boolean,
        title: String,
        dataItem: Object,
        btnRed: String,
        btnBlue: String
    },
    data() {
        return {
            form: {},
            user_id: '',
            // not_close: true
        }
    },
    computed: {
        listenActive() {
            return this.active
        },
        listenTitle() {
            return this.title
        },
        listenDataItem() {
            return this.dataItem
        },
    },
    watch: {
        dataItem: function (val) {
            if (val !== undefined) {
                this.user_id = val.user_id
            }
        },
        active: function (val) {
            if (val == true) {
                this.getProfile()
            }
        }
    },
    methods: {
        formData(form) {
            this.form = form
            console.log(this.form, 'this form')
            this.updateData()
        },
        handleSubmit() {
            this.$refs.formProfileUpdate.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm() {
            this.$refs.formProfileUpdate.handleClearForm()
            this.form = {}
            this.user_id = ""
        },
        async getProfile() {
            await axios
                .get(this.URL.profile + `?n=${this.listenNodeId}`, this.Helper.header())
                .then((res) => {
                    this.dataItem = res.data.data;
                })
                .catch((err) => {
                    this.openNotification(
                        "danger",
                        "Failed!",
                        "Failed to populate data!"
                    );
                    this.checkAuth(err.response);
                });
        },
        async updateData() {
            this.form.user_name = this.dataItem.user_name
            this.form.user_login = this.dataItem.user_login
            this.form.user_email = this.dataItem.user_email
            await axios
                .put(
                    this.URL.profile + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
                .then((res) => {
                    this.openNotification("success", "Success!", "Profile Updated!");
                    this.closeDialog()
                })
                .catch((err) => {
                    let title = "Failed!";
                    let msg = "Update profile failed!";
                    if (err.response.status == 422) {
                        title = "Validation Failed";
                        msg = err.response.data.message;
                    }
                    this.openNotification("danger", "Failed!", msg);
                    this.checkAuth(err.response);
                });
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
    mounted() {
        this.getProfile()
    },
}
</script>