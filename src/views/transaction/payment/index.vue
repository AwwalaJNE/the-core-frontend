<template>
    <dialog-master 
    :actived="listenActive" 
    width="xl"
    :closeDialog="cancel">
        <template v-slot:header>
            
        </template>

        <template v-slot:content>
            <div class="payment_dialog">
                <h2>Summary</h2>
                <vs-row>
                    <vs-col xs="12" sm="3" lg="3">
                        <p>Jumlah Connote</p>
                        <h2>{{connote_qty}}</h2>
                    </vs-col>
                    <vs-col xs="12" sm="3" lg="3">
                        <p>Jumlah Koli</p>
                        <h2>{{koli_qty}}</h2>
                    </vs-col>
                    <vs-col xs="12" sm="3" lg="3">
                        <p>Total Price</p>
                        <h2>{{moneyformat(price)}}</h2>
                        <br>
                        <p>Special Tariff Discount</p>
                        <h2>{{moneyformat(discount)}}</h2>
                        <br>
                        <p>Total After Discount</p>
                        <h2>{{moneyformat(price)}}</h2>
                    </vs-col>
                </vs-row>
                <h2>Payment Method</h2>
                <vs-row>
                    <vs-col xs="12" sm="4" lg="4">
                        <div class="box">
                            <ul class="mnu_payment">
                                <li><a href="javascript:void(0)" @click="changeTypePayment(navItemm[0])"><i class='bx bx-dots-horizontal-rounded' v-if="navActive === 'k-CASH'"></i>Cash</a></li>
                                <li><a href="javascript:void(0)" @click="changeTypePayment(navItemm[1])"><i class='bx bx-dots-horizontal-rounded' v-if="navActive === 'k-CARD'"></i> Card</a></li>
                                <li><a href="javascript:void(0)" @click="changeTypePayment(navItemm[2])"><i class='bx bx-dots-horizontal-rounded' v-if="navActive === 'k-WALLET'"></i> Payment Wallet</a></li>
                            </ul>
                        </div>
                    </vs-col>
                    <vs-col xs="12" sm="8" lg="8">
                        <div class="box">
                            <template v-if="navActive === 'k-CASH'">
                                <transition name="slide-fade">
                                    <div>
                                        <vs-row>
                                            <vs-col xs="12" sm="3" lg="3">
                                                <p>Payment</p>
                                            </vs-col>
                                            <vs-col xs="12" sm="6" lg="6">
                                                <vs-input v-model="jumlahbayar" placeholder="payment" @input="updateValue" />
                                            </vs-col>
                                        </vs-row>
                                        <vs-row>
                                            <vs-col xs="12" sm="3" lg="3">
                                                <p>Change</p>
                                            </vs-col>
                                            <vs-col xs="12" sm="6" lg="6">
                                                <vs-input v-model="change" placeholder="change" :disabled="true"/>
                                            </vs-col>
                                        </vs-row>
                                    </div>
                                </transition>
                            </template>
                            <template v-else-if="navActive === 'k-CARD'">
                                <transition name="slide-fade">
                                    <div>
                                        <vs-row>
                                            <vs-col xs="12" sm="3" lg="3">
                                                <p>Card Number</p>
                                            </vs-col>
                                            <vs-col xs="12" sm="6" lg="6">
                                                <vs-input v-model="cardNumber" placeholder="Card Number" @input="updateValue" />
                                            </vs-col>
                                        </vs-row>
                                    </div>
                                </transition>
                            </template>
                            <template v-else-if="navActive === 'k-WALLET'">
                                <transition name="slide-fade">
                                    <div>
                                        Wallet payment
                                    </div>
                                </transition>
                            </template>
                        </div>
                    </vs-col>
                </vs-row>

                <vs-row justify="flex-end" class="mt-2">
                            <vs-col xs="6" sm="2" lg="2">
                                <vs-button
                                transparent
                                block
                                flat
                                :active="true"
                                :disabled="paymentBtnDisabled"
                                type="submit"
                                @click="CreatePayment()"
                                >
                                    PAY
                                </vs-button>
                            </vs-col>
                </vs-row>
                
            </div>
        </template>

        <template v-slot:footer>
        </template>
    </dialog-master>
</template>
<script>
import axios from "axios"
import master from "@/mixins/master"
import TransactionMixin from "@/mixins/transaction.js"
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
    name: "dialog-payment",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
    },
    computed: {
        listenActive(){
            return this.active
        },
    },
    watch: {
        active: function(val) {
            if(val != undefined) {
                if(val == true) {
                    this.initialize()
                }
            }
        },
    },
    data() {
        return {
            navItemm: [
                {
                    label: "Cash",
                    key: "k-CASH",
                    payment_type_name: "Tunai",
                    payment_provider_name: "Cash",
                    payment_provider_code_number: "Cash"
                },
                {
                    label: "Card",
                    key: "k-CARD",
                    payment_type_name: "Kartu",
                    payment_provider_name: "Card",
                    payment_provider_code_number: "Card"
                },
                {
                    label: "Payment Wallet",
                    key: "k-WALLET",
                    payment_type_name: "Wallet",
                    payment_provider_name: "Wallet",
                    payment_provider_code_number: "Wallet"
                },
            ],
            navActive: 'k-CASH',
            typePayment: {},
            dataTransaction: {},
            koli_qty: 0,
            connote_qty: 0,
            price: 0,
            discount: 0,
            transaction_id: null,
            jumlahbayar: 0,
            change: 0,
            cardNumber:'',
            paymentBtnDisabled: false
        }
    },
    methods: {
        initialize() {
            let data = this.$store.getters.getTransaction.transaction
            if(data['transaction_id'] !== '' && data['transaction_finished'] == true) {
                this.transaction_id = data['transaction_id']
                this.connote_qty = data['connote'].length
                this.price = data['grand_total']
                // this.discount = data['discount']
                let koli_qty = 0
                // data['connote'].map(item => {
                //     let connotekoli = item['connote_koli_item'].length
                //     koli_qty += connotekoli
                // })
                this.jumlahbayar = this.price
                this.koli_qty = koli_qty
            }
            console.log('PAYMENT', data)
        },
        updateValue(){
            switch(this.navActive) {
                case "k-CASH":
                    this.change = this.jumlahbayar > this.price ? Math.abs(this.jumlahbayar - this.price) : 0
                    this.paymentBtnDisabled = this.jumlahbayar < this.price
                    break;
                default:
                    console.log('meong')
                    // code block
            }
        },
        changeTypePayment(obj) {
            this.navActive = obj['key']
            this.typePayment = obj
        },
        async CreatePayment() {
            if(this.transaction_id !== null) {

                let form = {}
                form['payment_amount'] = this.price
                form['payment_type_name'] = this.typePayment['payment_type_name']
                form['payment_provider_name'] = this.typePayment['payment_provider_name']
                form['payment_provider_code_number'] = this.typePayment['payment_provider_code_number']
                await axios
                .post(
                    this.URL.transaction + `/${this.transaction_id}/payment?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.dataTransaction= {}
                    this.koli_qty= 0
                    this.connote_qty= 0
                    this.price= 0
                    this.discount= 0  
                    this.$store.dispatch("CLEAR_TRANSACTION_DATA_CONNOTE", true)
                    this.$store.dispatch("EMPTY_TRANSACTION_DATA_CONNOTE", true)
                    this.openNotification(null, 'Success', 'Payment success')
                }).catch(err => {
                    this.openNotification('danger', 'Payment failed', err)
                })
            }
        },
        cancel() {
            this.closeDialog()
            this.dataTransaction= {}
            this.koli_qty= 0
            this.connote_qty= 0
            this.price= 0
            this.discount= 0        
        },
    },

}
</script>
<style lang="scss">
    .payment_dialog{
        text-align: left;
        .box{
            padding: 1.5em .5em;
            min-height: 200px;
        }
        ul{
            padding: 0;
            &.mnu_payment{
                li{
                    display: flex;
                    i{
                        position: absolute;
                        left: -1px;
                        top: 11px;
                    }
                }
                a{
                    position: relative;
                    width: 100%;
                    height: 40px;
                    display: block;
                    padding-top: .5em;
                    padding-left: 1.2em;
                    border-radius: 6px;
                    transition: all ease .4s;
                    &:hover{
                        background: rgba(204, 204, 204, .2);
                    }
                }
            }
        }
    }
</style>