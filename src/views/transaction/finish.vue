<template>
    <div>
        <h1>Thank You</h1>
        <p>Transaction Number : 0018140342100002</p>
        <p>Customer: SELAMET</p>
        <p>Press spacebar to continue</p>
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

                    console.log(arr)
                    this.dataTransaction = data
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate tariff list', err)
                })
        },
    },
    mounted() {
        this.initialize()
    },
}
</script>