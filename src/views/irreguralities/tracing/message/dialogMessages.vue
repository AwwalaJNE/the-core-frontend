<template>
    <dialog-master 
        :actived="listenActive" 
        :closeDialog="cancel"
        width="md"
    >

        <template v-slot:header>
            Message Masking
        </template>

        <template v-slot:content v-if="loadingMessage === false">
            <vs-row justify="space-between">
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="Koli"
                        formKey="koli"
                        type-input="text|disabled"
                        :rules="''"
                        :value-data="form.koli_number"
                    />
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="Koli Created Date"
                        formKey="date_created"
                        typeInput="text|disabled"
                        :rules="''"
                        :valueData="form.created_at"
                    />
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="User"
                        formKey="user"
                        typeInput="text|disabled"
                        :rules="''"
                        :valueData="form.user_login"
                    />
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="Receiver Phone"
                        formKey="receiver_phone"
                        typeInput="text|disabled"
                        :rules="''"
                        :valueData="form.receiver_phone_number"
                    />
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <input-text-area 
                        id="message"
                        label="Message"
                        v-model="form.message"
                    />
                </vs-col>
            </vs-row>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
                        transparent
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
                        transparent
                        block
                        flat
                        :active="true"
                        type="submit"
                        @click="handleSubmit"
                    >
                       Submit
                    </vs-button>
                </vs-col>
            </vs-row>  
        </template>

    </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";

import DialogMaster from "@/components/dialog/dialogMaster";
import InputGeneral from "@/components/input/general";
import InputTextArea from "@/components/input/textArea";
import Selector from "@/components/input/select";

export default {
    name:"rregularities-tracing-message-dialog",
    mixins:[master],
    components: {
        "input-general": InputGeneral,
        "selector": Selector,
        "dialog-master": DialogMaster,
        "input-text-area": InputTextArea,
    },
    props: {
       closeDialog: Function, 
       active: Boolean,
       title: String,
    },
    computed: {
        listenActive() {
            return this.active;
        },
    },
    watch: {
        active: function (val) {
            if (val === true) {
                this.getDataMessage();
            }
        }
    },
    data() {
        return {
            koli_number: this.$route.params.id,
            loadingMessage: true,
            form: {
                koli_number: '',
                created_at: '',
                receiver_phone_number: '',
                user_login: '',
                message: '' 
            }
        }
    },
    methods: {
        async getDataMessage() {
            this.loadingMessage = true;
            try {
                const response = await axios.get(`${this.URL.tracing}/${this.koli_number}?n=${this.listenNodeId}`, this.Helper.header());
                const data = response.data;
                if (data) {
                    const { koli_number, koli_created_at, receiver_phone_number, user_login, message_template } = data.data;

                    let form = {
                        koli_number: koli_number,
                        created_at: koli_created_at,
                        receiver_phone_number: receiver_phone_number,
                        user_login: user_login,
                        message: message_template
                    };

                    this.form = form;
                } else {
                    // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                }
            } catch (err) {
                this.openNotification('danger', 'Failed to get data', err);
            } finally {
                this.loadingMessage = false;
            }
        },
        async handleSubmit() {
            await axios
                .post(
                    this.URL.tracing + `/${this.koli_number}/message?n=${this.listenNodeId}`,
                    JSON.stringify({
                        "message": this.form.message
                    }), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    // this.refresh()

                    this.cancel()
                    this.openNotification(null, 'Success', 'Create new tracing message is success')
                }).catch(err => {
                    this.loadingMessage = false
                    // this.refresh()
                    this.openNotification('danger', 'Create new tracing message failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.form = {};
            this.closeDialog();
        }
    },
}
</script>