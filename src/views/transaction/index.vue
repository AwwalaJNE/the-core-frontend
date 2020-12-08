<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>New Transactions</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
            </vs-col>
        </vs-row>
        <section class="new-transaction mt-2">
            <vs-row justify="space-between">
                <vs-col xs="12" sm="9" lg="9">
                    <div>
                        <form-master ref="formTransaction" @onSubmit="onSubmit">
                            <template v-slot:inputValidator>
                                <div>
                                    <vs-row justify="space-between">
                                        <vs-col xs="12" sm="6" lg="6">
                                            <origin />
                                        </vs-col>
                                        <vs-col xs="12" sm="6" lg="6">
                                            <destination />
                                        </vs-col>
                                    </vs-row>
                                    <vs-row justify="space-between" class="mb-2" style="margin-top:10px">
                                        <vs-col xs="12" sm="12" lg="12">
                                            <package />
                                        </vs-col>
                                    </vs-row>
                                </div>
                            </template>
                        </form-master>

                        <vs-row justify="flex-end" style="top:-13px">
                            <vs-col xs="6" sm="2" lg="2">
                                <vs-button
                                transparent
                                block
                                flat
                                :active="true"
                                type="submit"
                                @click="addMoreConnote()"
                                >
                                <i class='bx bx-plus' style="margin-right: 5px" ></i> ADD MORE
                                </vs-button>
                            </vs-col>
                            <vs-col xs="6" sm="2" lg="2">
                                <vs-button
                                transparent
                                block
                                flat
                                :active="true"
                                type="submit"
                                @click="createTransaction()"
                                >
                                    FINISH
                                </vs-button>
                            </vs-col>
                        </vs-row>
                    </div>
                </vs-col>
                <vs-col xs="12" sm="3" lg="3">
                    <calc />
                </vs-col>
            </vs-row>
        </section>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import FormMaster from "@/components/form/formMaster"
import Breadcrumb from "@/components/breadcrumb/index"
import Origin from "@/views/transaction/origin"
import Destination from "@/views/transaction/destination"
import Package from "@/views/transaction/package"
import Calc from "@/views/transaction/calc"
export default {
    name: "new-transaction",
    mixins: [master],
    components: {
        "form-master": FormMaster,
        "origin" : Origin,
        "destination" : Destination,
        "breadcrumb": Breadcrumb,
        "package": Package,
        "calc": Calc
    },
    computed: {
        listenOrigin () {
            return this.$store.getters.getTransaction.origin
        },
        listenDestination () {
            return this.$store.getters.getTransaction.destination
        },
        listenPackage () {
            return this.$store.getters.getTransaction.package
        },
        listenTransaction () {
            return this.$store.getters.getTransaction.transaction
        },
    },
    data() {
        return {
            typeAction: '',
            dataTransaction: {}
        }
    },
    methods: {
        onSubmit(refs){
            console.log('onsubmit form controller', refs)
                refs.form.validate().then(success => {
                    if (!success) {
                        console.log('err niih')
                        return;
                    }
                    // this.InputObject = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm]
                    // this.Keys.map(item => {
                    //     // yg diambil key input
                    //     this.form[this.InputObject[item].key] = this.InputObject[item].value
                    // })
                    // this.$emit("formData", this.form)
                    this.collectData()
                    this.createConnote()

                    // Wait until the models are updated in the UI
                    this.$nextTick(() => {
                        refs.form.reset();
                    });
                });
        },
        addMoreConnote() {
            this.typeAction = 'addconnote'
            this.$refs.formTransaction.formSubmit()
        },
        createTransaction() {
            this.typeAction = 'finish'
            
            this.$refs.formTransaction.formSubmit()
        },
        collectData() {
            // if(info.key.includes('connote_')) {
            //         this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':info.key, 'value':val})
            //     }
            Object.keys(this.listenOrigin).map(item => {
                if(this.listenOrigin[item].key.includes('connote_')){
                    this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':this.listenOrigin[item].key, 'value':this.listenOrigin[item].value})
                }
            })
            Object.keys(this.listenDestination).map(item => {
                if(this.listenDestination[item].hasOwnProperty('key')) {
                    if(this.listenDestination[item].key.includes('connote_')){
                        this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':this.listenDestination[item].key, 'value':this.listenDestination[item].value})
                    }
                }
                if(item == 'destination_zip_code') {
                    this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':this.listenDestination['destination_zip_code'].input[0].key, 'value':this.listenDestination['destination_zip_code'].input[0].value})
                    this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':this.listenDestination['destination_zip_code'].input[1].key, 'value':this.listenDestination['destination_zip_code'].input[1].value})
                }
                
            })
            Object.keys(this.listenPackage).map(item => {
                if(this.listenPackage[item].key.includes('connote_')){
                    console.log('this.listenPackage[item].key', this.listenPackage[item].key, this.listenPackage[item].value)
                    this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':this.listenPackage[item].key, 'value':this.listenPackage[item].value})
                }
            })

            this.$store.dispatch(`MERGE_PROSES_CONNOTE_TO_TRANSACTION_CONNOTE`, true)

            console.log('==== transaction ====', this.listenTransaction)
        },
        async createConnote() {
            let dataTransaction = this.listenTransaction
            dataTransaction['transaction_finished'] = this.typeAction == 'finish' ? true : false
            dataTransaction['node_code'] = this.listenNodeId
            console.log('dataTransaction', dataTransaction)
            await axios
                .post(
                    this.URL.connote + `?n=${this.listenNodeId}`,
                    JSON.stringify(dataTransaction), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    // this.handleClearForm()
                    // this.closeDialog()
                    // this.$emit("refresh")
                    this.openNotification(null, 'Create new success', 'Create new district is success')
                }).catch(err => {
                    // this.loading = false
                    // this.handleClearForm()
                    // this.closeDialog()
                    // this.$emit("refresh")
                    this.openNotification('danger', 'Create new transaction failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
    },
}
</script>