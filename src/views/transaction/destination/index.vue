<template>
    <div class="box">
        <div class="con-form">
            <form-input-controller 
                ref="formTransactionOriginController"
                @formData="formData"
                @searchTariffCode="searchTariffCode"
                typeForm="destination"
            />
        </div>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import FormInputController from "@/views/transaction/formInputControllerTransaction"
export default {
    name: "destination",
    mixins: [master],
    components: {
        "form-input-controller": FormInputController, 
    },
    data() {
        return {
            
        }
    },
    methods: {
        formData(form) {
            console.log(form)
            
        },
        searchTariffCode(prefix, val){
            console.log(prefix, val)
            this.getTableData(val)
        },
        async getTableData(q) {
            console.log('get', q)
            await axios
                .get(this.URL.geolocation_search + 
                `?n=1&s=${q}`, 
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    this.$store.dispatch("SET_CALC_COMPONENT_ARRDATA", arr.length > 0 ? arr : [])
                    // this.loading = false
                }).catch(err => {
                    console.log(err.response)
                    this.checkAuth(err.response.status)
                    // this.loading = false
                    // this.openNotification('danger', 'Failed to populate country list', err)
                })
        },
    },
}
</script>