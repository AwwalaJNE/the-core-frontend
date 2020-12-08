const TransactionMixin = {
    data() {
        return {
            
        }
    },
    computed: {
        listenTransactionConnote () {
            return this.$store.getters.getTransaction.transaction.connote
        },
        listenProsesConnote () {
            return this.$store.getters.getTransaction.proses_connote
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
            return this.$store.getters.getTransaction.grand_total
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
    methods: {
        calculation(index) {
            let CONNOTE_INDEX = index != undefined ? index : 0
            let tarifData = this.listenPackageService || {}
            let chargeable_weight = this.listenCalculatorChargeableWeight
            let listKoli = this.listenConnoteKoliItem
            let surchargeByID = this.listenPackageSurchargeByID

            let BASE_TARIFF = 0
            if(Object.keys(tarifData).length > 0) {
               BASE_TARIFF = tarifData.tarif * chargeable_weight
            }

            let BIAYA_LAIN = 0
            let HANDLING_CHARGE = 0
            if(listKoli.length > 0) {
                listKoli.map(item => {
                    if(item.surcharge_id.length > 0) {
                        let tempbiaya = 0
                        let temp_handling_charge = 0
                        item.surcharge_id.map(su_id => {
                            let dataSurcharge = surchargeByID[su_id]
                            if(dataSurcharge.hasOwnProperty('surcharge_formula')) {
                                if(dataSurcharge['surcharge_formula'].hasOwnProperty('SURCHARGE')) {
                                    let evalSurcharge = eval(dataSurcharge['surcharge_formula']['SURCHARGE'])
                                    tempbiaya = tempbiaya + evalSurcharge
                                }
                                if(dataSurcharge['surcharge_formula'].hasOwnProperty('HANDLING_CHARGE')) {
                                    temp_handling_charge = dataSurcharge['surcharge_formula']['HANDLING_CHARGE']
                                }
                            }
                        })
                        BIAYA_LAIN = BIAYA_LAIN + tempbiaya
                        HANDLING_CHARGE = HANDLING_CHARGE + temp_handling_charge
                    }
                })
            }


            let TOTAL_BIAYA = 0
            TOTAL_BIAYA = BASE_TARIFF + HANDLING_CHARGE + BIAYA_LAIN
            
            console.log('listenConnoteKoliItem', listKoli, surchargeByID)
            

            this.$nextTick(() => {
                this.$store.dispatch("SET_CALCULATOR_BIAYA_KIRIM", BASE_TARIFF)
                this.$store.dispatch("SET_CALCULATOR_SURCHARGE", BIAYA_LAIN)
                this.$store.dispatch("SET_CALCULATOR_HANDLING_CHARGE", HANDLING_CHARGE)
                this.$store.dispatch("SET_CALCULATOR_TOTAL_BIAYA", TOTAL_BIAYA)
                this.$store.dispatch("SET_PROSES_CONNOTE_TOTAL_BIAYA", TOTAL_BIAYA)
                // this.$store.dispatch("SET_TRANSACTION_CONNOTE_TOTAL_BIAYA", {'value': TOTAL_BIAYA, 'index': CONNOTE_INDEX})

                this.mergeProsesConnote(CONNOTE_INDEX)
                this.calculateGrandTotal()
            });
            
        },
        mergeProsesConnote (CONNOTE_INDEX) {
            // this.$store.dispatch("MERGE_TRANSACTION_CONNOTE", { 'value':true, 'index': CONNOTE_INDEX })
            
            // let transaction = this.$store.getters.getTransaction.transaction
            // console.log("==== transaction ====", transaction)

            this.$store.dispatch("MERGE_PROSES_CONNOTE", true)
            console.log("==== proses_connote ====", this.listenProsesConnote)
        },
        calculateGrandTotal() {
            let listConnote = this.listenTransactionConnote
            let GTOTAL = 0

            if(listConnote.length > 0) {
                listConnote.map(item => {
                    if(item.hasOwnProperty('total_biaya')) {
                        GTOTAL = GTOTAL + item['total_biaya']
                    }
                })
            } else {
                let proses_connote = this.listenProsesConnote
                GTOTAL = GTOTAL + proses_connote['total_biaya']
            }
            
            this.$nextTick(() => {
                this.$store.dispatch("SET_TRANSACTION_GRAND_TOTAL", GTOTAL)
            });
        },

        // prosesKoli(key, value, index) {
        //     let listKoli = this.listenConnoteKoliItem
        //     let service = this.listenPackageService.data || {}
        //     console.log('proses koli', listKoli, key, value, index)
        //     if(listKoli.length > 0) {
        //         if(listKoli[index].hasOwnProperty(key)) {
        //             listKoli[index][key] = value
        //         }
        //         // if(key.includes('length')) {
        //         //    listKoli[index]['length'] = value
        //         // }

        //         // if(key.includes('width')) {
        //         //    listKoli[index]['width'] = value
        //         // }

        //         // if(key.includes('height')) {
        //         //    listKoli[index]['height'] = value
        //         // }
                
        //         let volume_weight = 0
                
        //         if(Object.keys(service).length > 0) {
        //             let service_volume_divider = service['service_volume_divider'].toString()
        //             volume_weight = (listKoli[index]['length'] * listKoli[index]['width'] * listKoli[index]['height']) / service_volume_divider 
        //             volume_weight = volume_weight / 1000
        //         }
        //         listKoli[index]['volume_weight'] = volume_weight.toFixed(2)
    
        //         this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", listKoli)
        //         this.calcMultipleKoli()
        //     }
        // },
        calcMultipleKoli(){
            let listKoli = this.listenConnoteKoliItem
            // let roundUp = this.round03(volume_weight.toFixed(2))
            // let chargeable_weight = Math.max(listKoli[index]['actual_weight'], roundUp).toFixed(2)
            let chargeable_weight = 0
            let actual_weight = 0
            let volume_weight = 0
            if(listKoli.length > 0) {
                listKoli.map(item => {
                    let volume_weight_temp = 0
                    if(item['volume_weight']) {
                        volume_weight_temp = volume_weight_temp + Number(item['volume_weight'])
                    }
                    if(item['actual_weight']) {
                        actual_weight = actual_weight + Number(item['actual_weight'])
                    }
                    volume_weight = volume_weight + volume_weight_temp
                })

                
            }

            console.log('calcMultipleKoli', chargeable_weight,actual_weight,volume_weight)
            
            let roundUp = this.round03(volume_weight)
            chargeable_weight = Number(Math.max(actual_weight, roundUp)).toFixed(2)
            this.$store.dispatch("SET_CALCULATOR_ACTUAL_WEIGHT", actual_weight)
            this.$store.dispatch("SET_CALCULATOR_VOLUME_WEIGHT", volume_weight)
            this.$store.dispatch("SET_CALCULATOR_CHARGEABLE_WEIGHT", chargeable_weight) 
        },
        round03(numToRound){
            let oo = numToRound | 0
            let ooo = oo + 0.3
            let res = oo
            if(numToRound > ooo) {
                res = res +1
            } 
            return res;
        },
    },
}

export default TransactionMixin