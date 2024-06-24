<template>
    <div>
        <template v-if="Object.keys(dataTransaction).length > 0">
            <div>
                <h1>Thank You</h1>
                <p>Transaction Number : {{dataTransaction.id}}</p>
                <p>Customer: {{dataTransaction.name}}</p>
                <p>Press spacebar to continue</p>
            </div>
        </template>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
export default {
    name: "finish-transaction",
    mixins: [master],
    data() {
        return {
            dataTransaction: {},
            transactionId: ''
        }
    },
    methods: {
        initialize() {
            this.getParamRoute()
            this.getConnote()
        },
        getParamRoute(){
          if(this.$route.params.id){
            this.transactionId = this.$route.params.id
            // this.tempSearch = this.$route.params.delivery_runsheet_number
          }
        },
        async getConnote() {
            await axios
                .get(this.URL.transaction +'/'+this.transactionId+`?n=${this.listenNodeId}`,
                this.Helper.header())
                .then(res => {
                    let data = res.data.data
                    let obj = {}
                    obj['name'] = data.customer ? data.customer.toUpperCase() : ''
                    obj['id'] = data.transaction_id
                    this.dataTransaction = obj

                }).catch(err => {
                    this.loading = false
                })
        },
    },
    mounted() {
        this.initialize()
        let self = this
        window.document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 32) {
                self.$router.replace({ name: 'new-transactions'});
                self.$router.go()
            }
        };
    },
}
</script>