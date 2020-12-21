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
import TransactionMixin from "@/mixins/transaction.js"
import FormMaster from "@/components/form/formMaster"
import Breadcrumb from "@/components/breadcrumb/index"
import Origin from "@/views/transaction/origin"
import Destination from "@/views/transaction/destination"
import Package from "@/views/transaction/package"
import Calc from "@/views/transaction/calc"
export default {
    name: "new-transaction",
    mixins: [master, TransactionMixin],
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
        listenConnoteActive () {
            return this.$store.getters.getTransaction.connote_index_active
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
            dataTransaction: {},
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
            // fix jika data origin dan destination didapat dari dialog get customer by code dan/atau get data transaction
            // maka perlu collect manual
            // Object.keys(this.listenOrigin).map(item => {
            //     if(this.listenOrigin[item].key.includes('connote_')){
            //         this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':this.listenOrigin[item].key, 'value':this.listenOrigin[item].value})
            //     }
            // })
            // Object.keys(this.listenDestination).map(item => {
            //     if(this.listenDestination[item].hasOwnProperty('key')) {
            //         if(this.listenDestination[item].key.includes('connote_')){
            //             this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':this.listenDestination[item].key, 'value':this.listenDestination[item].value})
            //         }
            //     }
            //     if(item == 'destination_zip_code') {
            //         this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':this.listenDestination['destination_zip_code'].input[0].key, 'value':this.listenDestination['destination_zip_code'].input[0].value})
            //         this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':this.listenDestination['destination_zip_code'].input[1].key, 'value':this.listenDestination['destination_zip_code'].input[1].value})
            //     }
                
            // })
            // Object.keys(this.listenPackage).map(item => {
            //     if(this.listenPackage[item].key.includes('connote_')){
            //         console.log('this.listenPackage[item].key', this.listenPackage[item].key, this.listenPackage[item].value)
            //         this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':this.listenPackage[item].key, 'value':this.listenPackage[item].value})
            //     } else {
            //         switch(this.listenPackage[item].key) {
            //             case "insured_goods_value":
            //                 this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':'insured_goods_value', 'value':this.listenPackage[item].value})
            //                 //break;
            //             case "amount_discount":
            //                 this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':'amount_discount', 'value':this.listenPackage[item].value})
            //                 //break;
            //             case "remarks":
            //                 this.$store.dispatch(`SET_PROSES_CONNOTE_PROPERTY`, {'key':'remarks', 'value':this.listenPackage[item].value})
            //                 //break;
            //             default:
            //                 console.log('meong')
            //                 // code block
            //         }
            //     }
            // })

            // this.$store.dispatch(`MERGE_PROSES_CONNOTE_TO_TRANSACTION_CONNOTE`, {'index': this.listenConnoteActive})

            console.log('==== transaction ====', this.listenTransaction)
        },
        async createConnote() {
            this.dataTransaction = this.listenTransaction
            this.dataTransaction['transaction_finished'] = this.typeAction == 'finish' ? true : false
            this.dataTransaction['node_code'] = this.listenNodeCode
            console.log('this.dataTransaction', this.dataTransaction)
            await axios
                .post(
                    this.URL.connote + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.dataTransaction), 
                    this.Helper.header())
                .then(res => {
                    console.log('res connote', res)
                    if(res.status == 200) {
                        if(this.typeAction == 'addconnote') {
                            this.fillTransactionDataAddMoreConnote(res.data.data)
                        }
                        this.refreshTransactionStore()
                    }
                    
                    this.openNotification(null, 'Create new success', 'Create new district is success')
                }).catch(err => {
                    this.openNotification('danger', 'Create new transaction failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },

        fillTransactionDataAddMoreConnote(data){
            
            this.dataTransaction['transaction_id'] = data.transaction_id || ''
            let res_connote = {}
            Object.keys(data).length > 0 && Object.keys(data).map(item => {
                if(item !== 'shipper_geolocation' && 
                item !== 'receiver_geolocation' &&
                item !== 'tariff' &&
                item !== 'koli' &&
                item !== 'transaction_id') {
                    if(item == 'connote_number' ||
                    item == 'connote_booking_number' ||
                    item == 'connote_reference_number') {
                        res_connote[item] = data[item].toString()
                    } else {
                        res_connote[item] = data[item]
                    }
                    
                }

                if(item == 'koli') {
                    res_connote['connote_koli_item'] = data[item]
                }
            })

            

            // connote yg terakhir dibuat / connote dengan connote_number yg sebelumnya kosong 
            let lastIndex = this.dataTransaction['connote'].length - 1
            this.dataTransaction['connote'][lastIndex] = res_connote

            console.log('CCCConote', this.dataTransaction, res_connote)

            this.$store.dispatch(`FILL_TRANSACTION_DATA`, {'key':'transaction_id', 'value':this.dataTransaction['transaction_id']})
            this.$store.dispatch(`FILL_TRANSACTION_DATA`, {'key':'connote', 'value':this.dataTransaction['connote']})
            this.$store.dispatch(`FILL_TRANSACTION_DATA`, {'key':'transaction_finished', 'value':this.dataTransaction['transaction_finished']})
            this.$store.dispatch(`FILL_TRANSACTION_DATA`, {'key':'node_code', 'value':this.dataTransaction['node_code']})


            // setelah proses ngisi transaction data connote dari respond post connote selesai,
            // - add obj data connote template
            // - connote index active + 1.
            this.$store.dispatch(`ADD_MORE_CONNOTE`, true)
            this.$store.dispatch(`SET_CONNOTE_INDEX_ACTIVE`, this.listenConnoteActive + 1)
        }

        
    },
}
</script>