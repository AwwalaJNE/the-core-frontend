<template>
    <dialog-master 
    :actived="listenActive" 
    width="lg"
    :closeDialog="cancel">
        <template v-slot:header>
            
        </template>

        <template v-slot:content>
            <div>
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
                        <h2>{{price}}</h2>
                        <br>
                        <p>Special Tariff Discount</p>
                        <h2>{{discount}}</h2>
                        <br>
                        <p>Total After Discount</p>
                        <h2>{{(price - discount)}}</h2>
                    </vs-col>
                </vs-row>
                <h2>Payment Method</h2>
                <vs-row>
                    <vs-col xs="12" sm="4" lg="4">
                        <ul>
                            <li><a href="javascript:void(0)">Cash</a></li>
                            <li><a href="javascript:void(0)">Card</a></li>
                            <li><a href="javascript:void(0)">Payment Wallet</a></li>
                        </ul>
                    </vs-col>
                    <vs-col xs="12" sm="8" lg="8">
                        <div></div>
                    </vs-col>
                </vs-row>
                
            </div>
        </template>

        <template v-slot:footer>
        </template>
    </dialog-master>
</template>
<script>
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
    name: "dialog-surcharge",
    components: {
        "dialog-master": DialogMaster,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "Cash",
                    key: "k-CASH"
                },
                {
                    label: "Card",
                    key: "k-CARD"
                },
                {
                    label: "Payment Wallet",
                    key: "k-WALLET"
                },
            ],
            selectedItem: 'k-CASH',
            dataTransaction: {},
            koli_qty: 0,
            connote_qty: 0,
            price: 0,
            discount: 0
        }
    },

}
</script>