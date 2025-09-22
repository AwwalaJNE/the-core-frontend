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
                            
                                <with-keyboard-control ref="keyboardControll" :listLength="listenCalcArrData.length" @selected="selectedHandler">
                                        <template v-slot:listcontent="props">
                                            <template v-if="listenCalcArrData.length > 0">
                                                <template v-for="(item, key) in listenCalcArrData">
                                                    <tr class="lin" :class="{'selected': key === props.selectedIndex}" :key="key" @click="clickdulu(item)" :data-testid="`row-${key}`">
                                                        <td style="width: 50%;">
                                                            <!-- <small>{{item.geolocation_subdistrict_name}}</small> <br>
                                                            <small>{{item.geolocation_district_name}}</small> <br> -->
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
                                        </template>
                                </with-keyboard-control>
                            
                            
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
                            :formKey="'list-connote'"
                            :valueData="listConnote"
                            :selectedValue="''"
                            :tabindex="-1"
                            :isMultiple="false"
                            @updateValue="selectConnote" />
                    </div>
                    <table>
                        <template v-if="Object.keys(objectKeys).length > 0">
                            <tr>
                                <td style="padding:5px">{{objectKeys['actual_weight'].label}}</td>
                                <td>{{objectKeys['actual_weight'].value}}</td>
                            </tr>
                            <tr>
                                <td style="padding:5px">{{objectKeys['volume_weight'].label}}</td>
                                <td>{{objectKeys['volume_weight'].value}}</td>
                            </tr>
                            <tr>
                                <td style="padding:5px">{{objectKeys['chargeable_weight'].label}}</td>
                                <td>{{objectKeys['chargeable_weight'].value}}</td>
                            </tr>
                            <tr>
                                <td style="padding:5px">{{objectKeys['surcharge_packing'].label}}</td>
                                <td>{{moneyformat(objectKeys['surcharge_packing'].value)}}</td>
                            </tr>
                        </template>
                            <tr>
                                <td colspan="2" style="border-bottom:solid 1px #AAA; padding: 5px 2px"></td>
                            </tr>
                        <template v-for="(item, i) in Keys">
                            <template v-if="item !== 'actual_weight' && 
                            item !== 'volume_weight' && 
                            item !== 'chargeable_weight' && 
                            item !== 'surcharge_packing'">
                                <tr :key="i">
                                    <td style="padding:5px">{{objectKeys[item].label}}</td>
                                    <td>{{moneyformat(objectKeys[item].value)}}</td>
                                </tr>
                            </template>
                        </template>
                        <!-- <hr> -->
                            <tr>
                                <td colspan="2" style="border-bottom:solid 1px #AAA; padding: 5px 2px"></td>
                            </tr>
                        <tr>
                            <td><h3>Grand Total</h3></td>
                            <td><h3>{{moneyformat(listenGrandTotal)}}</h3></td>
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
import WithKeyBoardControll from "@/views/transaction/calc/withkeyboardcontrol"
export default {
    name: "calc-transaction",
    mixins: [master, TransactionMixin],
    components: {
        "selector": Selector,
        "with-keyboard-control": WithKeyBoardControll
    },
    data() {
        return {
            switch_component: false,
            Keys: [],
            objectKeys: {},
            destinationCode: '',
            listConnote: [],
        }
    },
    computed: {
        listenTransactionConnote () {
            return this.$store.getters.getTransaction.transaction.connote
        },
        listenTransactionConnoteLength () {
            return this.$store.getters.getTransaction.transaction.connote.length
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

        listenConnoteIndexActive () {
            return this.$store.getters.getTransaction.connote_index_active
        },
    },
    watch: {
        listenCalcComponentSwitch: function(val) {
            if(val !== undefined) {
                this.switch_component = val
                if(val == true) {
                    let self = this
                    setTimeout(function(){ self.$refs.keyboardControll.addKeyHandler() }, 100);
                } else {
                    this.$refs.keyboardControll.removeKeyHandler()
                }
            }
        },

        // listenPackageService: function (n,o) {
        //     if(n !== o) {
        //         this.calculation()
        //     }
        // },
        listenTransactionConnoteLength: function (n,o) {
            if(n !== o) {

                this.prosesListConnote()
            }
        },
        listenCalcArrData: function (arr) {
            if(arr.length == 1) {
                this.selectedHandler(0)
            }
        },
    },
    methods: {
        initialize() {
            let obj = this.$store.getters.getTransaction.calculator || {}
                if (Object.keys(obj).length > 0) {
                    this.Keys = Object.keys(obj)
                    this.objectKeys = obj

                } else {
                    this.Keys = []
                    this.objectKeys = {}
                }
        },
        selectedHandler(index) {
            if(index !== null) {
                let data = this.listenCalcArrData.filter(item => item.index == index)
                this.clickdulu(data[0])
            }
            this.$store.dispatch('SET_CALC_COMPONENT_SWITCH', false)
            this.$store.dispatch("SET_CALC_COMPONENT_ARRDATA", [])
        },
        prosesListConnote() {
            let listconnote = this.listenTransactionConnote
            if(listconnote.length > 0) {
                let arr = []
                listconnote.map((item,i) => {
                    let obj = {}
                    obj['label'] = `connote ${i + 1} | ${item.connote_number ? 'No: '+item.connote_number:''}`
                    obj['value'] = i
                    obj['index'] = i

                    arr.push(obj)
                })
                this.listConnote = arr
            } else {
                this.listConnote = [{'label': 'Package Empty', 'value':'-'}]
            }

        },
        selectConnote(key, value) {
            let index = 0
            this.$store.dispatch(`SET_PREVIOUS_CONNOTE_INDEX_ACTIVE`, this.listenConnoteIndexActive)
            this.$store.dispatch(`SET_CONNOTE_INDEX_ACTIVE`, value)
            this.$store.dispatch(`SWITCH_CONNOTE_ACTIVE`, value)
            
            if(this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_number!=''){
                this.connote_number = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_number;
            }

        },
        async getShippingService(booking_connote_service_code, fromBooking = false) {

            await axios
                .get(this.URL.tariff_shipping_service + 
                `?n=${this.listenNodeId}&destination=${this.destinationCode}`, 
                this.Helper.header())
                .then(res => {
                    let data = res.data.data
                    let arr = []
                    data.map(item => {
                        let obj = {}
                        obj['label'] = item.service_name
                        obj['value'] = item.tariff_service_code
                        obj['data'] = item
                        obj['tarif'] = item.tariff_amount_1


                        if(item.tariff_service_code==booking_connote_service_code){

                            this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE_ValueData", obj)

                        }
                        
                    })

                   
                    //this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE", arr.length > 0 ? arr[0].value : '')
                    
                    //this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE_arrData", arr)

                 
                    // this.loading = false
                }).catch(err => {
                    // this.loading = false
                    this.checkAuth(err.response.status)
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate country list', err)
                })
        },
        clickdulu(item){
            switch(this.listenCalcPrefix) {
                case "origin":
                    this.$store.dispatch(`SET_ORIGIN_ORIGIN_ZIP_CODE`, item.geolocation_subdistrict_zip_code)
                    this.$store.dispatch(`SET_ORIGIN_ORIGIN_ONCHANGE_ADDRESS`, item.geolocation_location_name)
                    this.$store.dispatch(`SET_ORIGIN_ORIGIN_SUBDISTRICT_ID`, item.geolocation_subdistrict_id)
                    break;
                case "destination":
                    let obj = {
                        zip_code: item.geolocation_subdistrict_zip_code,
                        destination_code: item.geolocation_subdistrict_tarif_code
                    }
                    this.destinationCode = item.geolocation_subdistrict_tarif_code
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_SUBDISTRICT_ID`, item.geolocation_subdistrict_id)
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ZIP_CODE`, obj)
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ZIP_CODE_zipCode`, item.geolocation_subdistrict_zip_code)
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ZIP_CODE_destinationCode`, item.geolocation_subdistrict_tarif_code)
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS`, item.geolocation_location_name)

                    // this.getShippingService()
                    break;
                default:

                    // code block
            }
        },
    },
    mounted() {
        this.initialize()
        this.prosesListConnote()
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
                text-transform: capitalize;
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
            
            .selected{
                background-color: #eaeaea;
            }
        }
    }
</style>