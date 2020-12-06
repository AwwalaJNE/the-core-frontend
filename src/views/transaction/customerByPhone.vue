<template>
    <div>
        <dialog-master 
        :actived="listenActive" 
        width="md"
        :closeDialog="cancel">

            <template v-slot:header>
                <h3>Search by JLC/Corp ID/Phone</h3>
            </template>

            <template v-slot:content>
                <div>
                    <form v-on:submit.prevent="submit">
                        <input-general 
                        name="JLC/Corp ID/Phone" 
                        rules="required" 
                        :formKey="listenType"
                        :valueData="value"
                        typeInput="text"
                        @updateValue="updateValue" />
                    </form>
                </div>
            </template>
        </dialog-master>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import DialogMaster from "@/components/dialog/dialogMaster"
import InputGeneral from "@/components/input/general"
export default {
    name: "get-customer-by-phone",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "input-general": InputGeneral,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        title: String,
        type: String
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenType() {
            return this.type
        }
    },
    data() {
        return {
            key: '',
            value: ''
        }
    },
    methods: {
        updateValue(key, value, value2) {
            if(value) {
                this.value = value
            }
        },
        cancel() {
            this.closeDialog()
        },
        async submit() {

            await axios
                .get(
                    this.URL.search_customer_code + `?n=${this.listenNodeId}&customer_code=${this.value}`,
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    if(res.status == 200) {
                        let data = res.data.data
                        this.$emit("updateValue", this.listenType, data)
                        this.closeDialog()
                    }
                }).catch(err => {
                    this.checkAuth(err.response.status)
                    this.closeDialog()
                    // this.loading = false
                    // this.handleClearForm()
                    // this.closeDialog()
                    // this.$emit("refresh")
                    this.openNotification('danger', 'Message :', err.response ? err.response.data.message : 'something went wrong')
                })
        }
    },
}
</script>