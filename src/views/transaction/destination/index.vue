<template>
    <div class="box" style="min-height: 500px;">
        <div>
            <vs-row justify="space-between">
                <vs-col xs="12" sm="2" lg="2">
                    <h3>Destination</h3>
                </vs-col>
                <vs-col xs="12" sm="2" lg="2">
                    <vs-tooltip>
                        <vs-button
                            shadow
                            icon
                            :active="false"
                            @click="openGetCustomer"
                            style="margin:10px auto 0;"
                        >
                            <i class='bx bx-user'></i>
                        </vs-button>
                        <template #tooltip>
                            Search customer destination
                        </template>
                    </vs-tooltip>
                </vs-col>
            </vs-row>
        </div>
        <div class="con-form">
            <template v-if="listenforcererender == true">
                <transition>
                    loading ...
                </transition>
            </template>
            <template v-else-if="listenforcererender == false">
                <transition>
                    <form-input-controller 
                        ref="formTransactionOriginController"
                        @formData="formData"
                        :dataItem="listenDataItem"
                        @searchTariffCode="searchTariffCode"
                        typeForm="destination"
                    />
                </transition>
            </template>
        </div>
        <customerByPhone
            :active="dialogGetCustomer" 
            :closeDialog="closeGetCustomer"
            title="detination"
            type="detination"
            @updateValue="updateValue"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import customerByPhone from "@/views/transaction/customerByPhone"
import FormInputController from "@/views/transaction/formInputControllerTransaction"
export default {
    name: "destination",
    mixins: [master],
    components: {
        "form-input-controller": FormInputController, 
        "customerByPhone": customerByPhone
    },
    data() {
        return {
            dialogGetCustomer: false,
            dataItem: null,
            forcererender: false,
            destinationCode: ''
        }
    },
    computed: {
        listenDataItem(){
            return this.dataItem
        },
        listenforcererender() {
            return this.forcererender
        }
    },
    methods: {
        formData(form) {
            console.log(form)
            
        },
        searchTariffCode(prefix, val){
            if(val.length > 2) {
                this.getTableData(val)
            }
        },
        async getTableData(q) {
            await axios
                .get(this.URL.geolocation_search + 
                `?n=${this.listenNodeId}&s=${q}`, 
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    if(res.status == 200 && arr.length > 0) {
                        arr.map((item, key) => {
                            item['index'] = key
                        })
                        this.$store.dispatch("SET_CALC_COMPONENT_ARRDATA", arr.length > 0 ? arr : [])
                    }
                    // this.loading = false
                }).catch(err => {
                    console.log(err.response)
                    this.checkAuth(err.response)
                    // this.loading = false
                    // this.openNotification('danger', 'Failed to populate country list', err)
                })
        },
        openGetCustomer() {
            this.dialogGetCustomer = true
        },
        closeGetCustomer() {
            this.dialogGetCustomer = false
        },
        updateValue(key,value,fromBooking = false) {
            if(Object.keys(value).length > 0 && key == 'detination') {
                this.forcererender = true
                let typeaddress = value.customer_address_type.toLowerCase() || ''
                let zipndestiCode = {'zip_code' : value.geolocation_subdistrict_zip_code, 'destination_code': value.geolocation_subdistrict_tarif_code}
                this.destinationCode = value.geolocation_subdistrict_tarif_code
                let booking_connote_service_code = value.booking_connote_service_code ? value.booking_connote_service_code : ''
                this.getShippingService(booking_connote_service_code, fromBooking)

                this.$store.dispatch(`SET_DESTINATION_DESTINATION_TYPE`, typeaddress)
                this.$store.dispatch(`SET_DESTINATION_DESTINATION_NAME`, value.customer_name)
                this.$store.dispatch(`SET_DESTINATION_DESTINATION_PHONE`, value.customer_phone)
                this.$store.dispatch(`SET_DESTINATION_DESTINATION_ADDRESS`, value.geolocation_location_name)
                this.$store.dispatch(`SET_DESTINATION_DESTINATION_SUBDISTRICT_ID`, value.customer_subdistrict_id)
                this.$store.dispatch(`SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS`, value.geolocation_location_name)
                this.$store.dispatch(`SET_DESTINATION_DESTINATION_ZIP_CODE`, zipndestiCode)

                let self = this
                setTimeout(function(){ self.forcererender = false }, 100);
            }
        },
        async getShippingService(booking_connote_service_code, fromBooking = false) {
            await axios
                .get(this.URL.tariff_shipping_service + 
                `?n=${this.listenNodeId}&destination=${this.destinationCode}`, 
                this.Helper.header())
                .then(res => {
                    console.log('getShippingService', res.data.data)
                    let data = res.data.data
                    let arr = []
                    data.map(item => {
                        let obj = {}
                        obj['label'] = item.service_name
                        obj['value'] = item.tariff_service_code
                        obj['data'] = item
                        obj['tarif'] = item.tariff_amount_1
                        
                        arr.push(obj)
                    })
                    console.log('getShippingService arr', arr)
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE", arr.length > 0 ? arr[0].value : '')
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE_ValueData", arr[0])
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE_arrData", arr.length > 0 ? arr : [])

                    if(fromBooking == true && booking_connote_service_code != '') {
                        let dat = arr.filter(item => item.value == booking_connote_service_code)
                        let serviceItem = dat[0]
                        this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE_ValueData", serviceItem)
                        this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE", booking_connote_service_code)
                    }
                    // this.loading = false
                }).catch(err => {
                    // this.loading = false
                    this.checkAuth(err.response.status)
                    // this.openNotification('danger', 'Failed to populate country list', err)
                })
        },
    },
}
</script>