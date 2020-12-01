<template>
    <div class="box calculator">
        <template v-if="switch_component == true">
            <transition name="slide-fade">
                <div> 
                    <table class="tariff_selector">
                        <thead>
                            <tr>
                                <th>Place</th>
                                <th>Zip</th>
                                <th>Tariff Code</th>
                            </tr>
                        </thead>

                        <tbody>
                            <template v-if="listenCalcArrData.length > 0">
                                <template v-for="(item, key) in listenCalcArrData">
                                    <tr class="lin" :key="key" @click="clickdulu(item)">
                                        <td style="width: 50%;">
                                            <small>{{item.geolocation_subdistrict_name}}</small> <br>
                                            <small>{{item.geolocation_district_name}}</small> <br>
                                            <small>{{item.geolocation_location_name}}</small>
                                        </td>
                                        <td>
                                            <small>{{item.geolocation_subdistrict_zip_code}}</small>
                                        </td>
                                        <td>
                                            <small>{{item.geolocation_subdistrict_tarif_code}}</small>
                                        </td>
                                    </tr>
                                </template>
                            </template>
                            <template v-else>
                                <tr>Data not found</tr>
                            </template>
                        </tbody>
                        
                        
                    </table>
                </div>
            </transition>
        </template>
        <template v-else-if="switch_component == false">
            <transition name="slide-fade">
                <div class="calc_slide">
                    <div class="select_connote">
                        <p>{{listConnote.length}} Package (s)</p>
                        <selector 
                            :name="''"
                            :rules="''" 
                            :formKey="''"
                            :valueData="listConnote"
                            :selectedValue="''"
                            :isMultiple="false"
                            @updateValue="selectConnote" />
                    </div>
                    <table>
                        <template v-if="Object.keys(objectKeys).length > 0">
                            <tr>
                                <td>{{objectKeys['actual_weight'].label}}</td>
                                <td>{{objectKeys['actual_weight'].value}}</td>
                            </tr>
                            <tr>
                                <td>{{objectKeys['volume_weight'].label}}</td>
                                <td>{{objectKeys['volume_weight'].value}}</td>
                            </tr>
                            <tr>
                                <td>{{objectKeys['chargeable_weight'].label}}</td>
                                <td>{{objectKeys['chargeable_weight'].value}}</td>
                            </tr>
                        </template>
                        <hr>
                        <template v-for="(item, i) in Keys">
                            <template v-if="item !== 'actual_weight' && 
                            item !== 'volume_weight' && 
                            item !== 'chargeable_weight'">
                                <tr :key="i">
                                    <td>{{objectKeys[item].label}}</td>
                                    <td>{{objectKeys[item].value}}</td>
                                </tr>
                            </template>
                        </template>
                        <hr>
                        <tr>
                            <td><h3>Grand Total</h3></td>
                            <td><h3>{{listenGrandTotal}}</h3></td>
                        </tr>
                    </table>
                </div>
            </transition>
        </template>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TransactionMixin from "@/mixins/transaction.js"
import Selector from "@/components/input/select"
export default {
    name: "calc-transaction",
    mixins: [master, TransactionMixin],
    components: {
        "selector": Selector,
    },
    data() {
        return {
            switch_component: false,
            Keys: [],
            objectKeys: {},
            destinationCode: '',
            listConnote: []
        }
    },
    computed: {
        listenTransactionConnote () {
            return this.$store.getters.getTransaction.transaction.connote
        },
        listenCalcComponentSwitch() {
            return this.$store.getters.getTransaction.calc_component.switch
        },
        listenCalcArrData() {
            return this.$store.getters.getTransaction.calc_component.arrData
        },
        listenCalcPrefix() {
            return this.$store.getters.getTransaction.calc_component.prefix
        },
        listenGrandTotal() {
            return this.$store.getters.getTransaction.transaction.grand_total || 0
        },

        listenPackageService () {
            return this.$store.getters.getTransaction.package.package_service.valueData
        },
        listenPackageSurchargeByID () {
            return this.$store.getters.getTransaction.package.package_surcharge.valueData
        },

        listenCalculatorChargeableWeight () {
            return this.$store.getters.getTransaction.calculator.chargeable_weight.value
        },
        listenConnoteKoliItem () {
            return this.$store.getters.getTransaction.connote_koli_item
        },
    },
    watch: {
        listenCalcComponentSwitch: function(val) {
            if(val !== undefined) {
                this.switch_component = val
            }
        },

        listenPackageService: function (n,o) {
            if(n !== o) {
                this.calculation()
            }
        },
        listenCalculatorChargeableWeight: function (val) {
            if(val) {
                this.calculation()
            }
        },
        listenConnoteKoliItem: function (val) {
            if(val) {
                this.calculation()
            }
        },
        listenTransactionConnote: function (n,o) {
            if(n.length !== o.length) {
                this.prosesListConnote()
            }
        }
    },
    methods: {
        initialize() {
            let obj = this.$store.getters.getTransaction.calculator || {}
                if (Object.keys(obj).length > 0) {
                    this.Keys = Object.keys(obj)
                    this.objectKeys = obj
                    console.log('ini objectKeys clac', this.objectKeys)
                } else {
                    this.Keys = []
                    this.objectKeys = {}
                }
        },
        prosesListConnote() {
            let listconnote = this.listenTransactionConnote
            if(listconnote > 0) {
                let arr = []
                listconnote.map(item => {
                    let obj = {}
                    obj['label'] = `connote number: ${item.connote_number}`
                    obj['value'] = item.connote_number
                })
                this.listConnote = arr
            }
        },
        selectConnote(k, value) {

        },
        clickdulu(item){
            switch(this.listenCalcPrefix) {
                case "origin":
                    this.$store.dispatch(`SET_ORIGIN_ORIGIN_ZIP_CODE`, item.geolocation_subdistrict_zip_code)
                    this.$store.dispatch(`SET_ORIGIN_ORIGIN_ONCHANGE_ADDRESS`, item.geolocation_location_name)
                    break;
                case "destination":
                    let obj = {
                        zip_code: item.geolocation_subdistrict_zip_code,
                        destination_code: item.geolocation_subdistrict_tarif_code
                    }
                    this.destinationCode = item.geolocation_subdistrict_tarif_code
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ZIP_CODE`, obj)
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ZIP_CODE_zipCode`, item.geolocation_subdistrict_zip_code)
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ZIP_CODE_destinationCode`, item.geolocation_subdistrict_tarif_code)
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS`, item.geolocation_location_name)

                    this.getShippingService()
                    break;
                default:
                    console.log('meong')
                    // code block
            }
        },
        async getShippingService() {
            await axios
                .get(this.URL.tariff_shipping_service + 
                `?n=1&destination=${this.destinationCode}`, 
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
                    // this.loading = false
                }).catch(err => {
                    // this.loading = false
                    // this.openNotification('danger', 'Failed to populate country list', err)
                })
        },

    },
    mounted() {
        this.initialize()
    },
}
</script>
<style lang="scss">
    .calculator{
        text-align: left;
        .select_connote{
            p{
                margin: 0;
            }
        }
        .calc_slide{
            table{
                position: relative;
                width: 100%;
                tr{
                    td{
                        &:last-of-type{
                            text-align: right;
                        }
                    }
                }
            }
        }
        .tariff_selector{
            position: relative;
            widows: 100%;
            thead{
                th{
                    // text-align: center;
                }
            }
            tr{
                td{
                    padding: .5em 0;
                    border-top: 1px solid #333;
                }
            }
            
        }
    }
</style>