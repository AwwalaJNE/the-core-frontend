<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <vs-input
                    v-model="amount_cod"
                />
            </div>
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
                        Collect
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
    name:"dialog-cod-collect",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
    },
    props: {
       closeDialog: Function, 
       active: Boolean,
       title: String,
       expectedAmount: Number,
       runsheetNumber: String,
       courierId: String
    },
    data() {
        return {
            amount_cod: ""
        }
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenTitle(){
            return this.title
        }
    },
    methods: {
        handleSubmit(){
            if(this.expectedAmount === this.amount_cod) {
                    this.collectCOD()
            } else {
                this.openNotification('danger', 'Unable to Collect COD', 'Mismatch in COD Amount')
            }
        },
        handleClearForm(){
            this.amount_cod = ""
        },
        async collectCOD() {
            let form = {
                courier_employee_id: this.courierId,
                delivery_runsheet_number: this.runsheetNumber
            }
            await axios
                .post(
                    this.URL.delivery_cod_collect + `?n=${this.listenNodeId}`,
                    JSON.stringify(form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification("success", "SUCCESS!", "Cod Collected!");
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'COD Collect is Failed', err?.response?.data?.message ? err?.response?.data?.message : 'something went wrong')
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
    mounted() {
    },
}
</script>