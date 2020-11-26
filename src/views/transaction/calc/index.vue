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
export default {
    name: "calc-transaction",
    data() {
        return {
            switch_component: false,
            Keys: [],
            objectKeys: {}
        }
    },
    computed: {
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
            return this.$store.getters.getTransaction.grand_total
        },
    },
    watch: {
        listenCalcComponentSwitch: function(val) {
            if(val !== undefined) {
                this.switch_component = val
            }
        },
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
        clickdulu(item){
            console.log('prefix', this.listenCalcPrefix)
            console.log('kita klik', item)
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
                    console.log('klick desti', item.geolocation_subdistrict_zip_code)
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ZIP_CODE`, obj)
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ZIP_CODE_zipCode`, item.geolocation_subdistrict_zip_code)
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ZIP_CODE_destinationCode`, item.geolocation_subdistrict_tarif_code)
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS`, item.geolocation_location_name)
                    break;
                default:
                    console.log('meong')
                    // code block
            }
            
        }
    },
    mounted() {
        this.initialize()
    },
}
</script>
<style lang="scss">
    .calculator{
        text-align: left;
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