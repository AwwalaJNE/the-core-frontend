<template>
    <div class="box" style="min-height: 500px;">
        <div>
            <vs-row justify="space-between">
                <vs-col xs="12" sm="2" lg="2">
                    <h3>Destination</h3>
                </vs-col>
                <vs-col xs="12" sm="6" lg="6">
                    <vs-row justify="flex-end">
                        <vs-col xs="12" sm="8" lg="8">
                            <template v-if="customer !== ''">
                                <span 
                                    :data-value="customer" 
                                    class="vs-select__chips__chip baloon"
                                    style="width: fit-content;"
                                    >
                                        {{`${customer}`}}
                                        <span class="vs-select__chips__chip__close" @click="removeCustomer()">
                                            <i class="vs-icon-close vs-icon-hover-less"></i>
                                        </span>
                                </span>
                            </template>
                        </vs-col>
                        <vs-col xs="12" sm="2" lg="2">
                            <vs-tooltip>
                                <vs-button
                                    shadow
                                    icon
                                    :active="false"
                                    @click="openGetCustomer"
                                    :tabindex="-1"
                                    style="margin:10px auto 0;"
                                >
                                    <i class='bx bx-user'></i>
                                </vs-button>
                                <template #tooltip>
                                    {{`Alt + f2 | Search customer destination`}}
                                </template>
                            </vs-tooltip>
                        </vs-col>
                    </vs-row>
                    
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
                        ref="formTransactionDestinationController"
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
// import TransactionMixin from "@/mixins/transaction.js"
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
            destinationCode: '',
            customer:"",

            defaultCalculator:"",
            defaultDestination:"",
            defaultPackage:""
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
        getDefaultState() {
            // console.log('get default', this.$store.state.transaction.calc_component)
            this.defaultCalculator = this.putusin(this.$store.state.transaction.calculator)
            this.defaultDestination = this.putusin(this.$store.state.transaction.destination)
            this.defaultPackage = this.putusin(this.$store.state.transaction.package)
            
        },
        putusin(obj) {
            // remove data binding
            // JSON.parse(JSON.stringify(obj))
            return JSON.stringify(obj)
        },
        removeCustomer(){
            this.customer = ""
            this.$store.dispatch("RESET_STATE", {'key': 'destination','state': this.defaultDestination})
            this.$store.dispatch("RESET_STATE", {'key': 'package','state': this.defaultPackage})
            this.$store.dispatch("RESET_STATE", {'key': 'calculator','state': this.defaultCalculator})
            
        },
        setFocus(){
            let inp = this.$refs.formTransactionDestinationController.$refs.connote_receiver_name[0]
            this.$nextTick(() => {
                inp.$refs.generalInput.$el.querySelector('input').focus()
            });
        },
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
            this.dialogGetCustomer = !this.dialogGetCustomer
        },
        closeGetCustomer() {
            this.dialogGetCustomer = false
            this.setFocus()
        },
        // onChangeCustom(key,val) {
        //     if(key != undefined) {
        //         if(key == 'destination_onchange_address') {
        //             this.$store.dispatch('SET_CALC_COMPONENT_SWITCH', true)
        //         }
        //     }
        // },
        updateValue(key,value,fromBooking = false, value2) {
            if(Object.keys(value).length > 0 && key == 'detination') {
                // this.forcererender = true
                let typeaddress = value.customer_address_type.toLowerCase() || ''
                let zipndestiCode = {'zip_code' : value.geolocation_subdistrict_zip_code, 'destination_code': value.geolocation_subdistrict_tarif_code}
                this.destinationCode = value.geolocation_subdistrict_tarif_code
                let booking_connote_service_code = value.booking_connote_service_code ? value.booking_connote_service_code : ''
                

                this.$store.dispatch(`SET_DESTINATION_DESTINATION_TYPE`, typeaddress)
                this.$store.dispatch(`SET_DESTINATION_DESTINATION_NAME`, value.customer_name)
                this.$store.dispatch(`SET_DESTINATION_DESTINATION_PHONE`, value.customer_phone)
                this.$store.dispatch(`SET_DESTINATION_DESTINATION_ADDRESS`, value.geolocation_location_name)
                this.$store.dispatch(`SET_DESTINATION_DESTINATION_SUBDISTRICT_ID`, value.customer_subdistrict_id)
                this.$store.dispatch(`SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS`, value.geolocation_location_name)
                this.$store.dispatch(`SET_DESTINATION_DESTINATION_ZIP_CODE`, zipndestiCode)

                !fromBooking ? this.customer = value2 : ''
                // let self = this
                // this.$nextTick(() => {
                //     this.getShippingService(booking_connote_service_code, fromBooking)
                // });
                // setTimeout(function(){ 
                //     // self.forcererender = false 
                //     // self.getShippingService(booking_connote_service_code, fromBooking)
                // }, 3000);
            }
        },
        async getShippingService(booking_connote_service_code, fromBooking = false) {
            await axios
                .get(this.URL.tariff_shipping_service + 
                `?n=${this.listenNodeId}&destination=${this.destinationCode}`, 
                this.Helper.header())
                .then(res => {
                    // console.log('getShippingService', res.data.data)
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
                    // console.log('getShippingService arr', arr)
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE", arr.length > 0 ? arr[0].value : '')
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE_ValueData", arr[0])
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE_arrData", arr.length > 0 ? arr : [])

                    if(fromBooking == true && booking_connote_service_code != '') {
                        console.log('jangan jalanin lagi')
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
    created() {
        this.getDefaultState()
    },
}
</script>
<style lang="scss">
    .coba{
        &:focus{
            color: red;
        }
    }
</style>