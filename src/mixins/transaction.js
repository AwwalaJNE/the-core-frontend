const TransactionMixin = {
    data() {
        return {
            prepareSurchargeID: '',
            listKoli: [],
            service: ''
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
        listenSurchargeList() {
            return this.$store.getters['getTransaction']['package']['package_surcharge']['arrData']
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

        // new code
        listenConnoteIndexActive () {
            return this.$store.getters.getTransaction.connote_index_active
        },
    },
    methods: {
        autoApply(node_code='') {
            console.log('PROSES AUTO APPLY')
            let surchargeList = this.listenSurchargeList

            this.listKoli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item || []
            this.service = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_service_code || ''
            
            if(surchargeList.length > 0) {
                surchargeList.map(item => {
                    if(item.hasOwnProperty('auto_apply')) {
                        if(item['auto_apply'] == true) {
                            if(item.hasOwnProperty('surcharge_condition')) {
                                let objectives = item['surcharge_condition'] || {}
                                // Cek jika punya surcharge_condition
                                if (Object.keys(objectives).length > 0) {
                                    let w_condition = ''
                                    let w_conditionValue = {}
                                    let srv_condition = null
                                    let srv_conditionValue = {}
                                    let shipper_condition = null
                                    let shipper_conditionValue = {}
                                    // jaga2 pake looping karena key setiap surcharge_condition berbeda
                                    // DAN KEY surcharge_condition DARI BACKEND TIDAK NORMALIZE ALIAS BEDA2. contoh ada yg "actual_weight" dan "weight" -> ini pada dasarnya adalah actual_weight. kan bikin KESEL.
                                    Object.keys(objectives).map(condition => {
                                        
                                        if(condition.toLowerCase().includes('weight')) {
                                            w_condition = condition
                                            w_conditionValue = objectives[condition]
                                        } 
                                        if(condition.toLowerCase().includes('service_code')) {
                                            srv_condition = condition
                                            srv_conditionValue = objectives[condition]
                                        }
                                        if(condition.toLowerCase().includes('shipper_tlc')) {
                                            shipper_condition = condition
                                            shipper_conditionValue = objectives[condition]
                                        }
                                        
                                    })

                                    this.koliCek(
                                        item,
                                        node_code,
                                        w_condition,
                                        w_conditionValue,
                                        srv_condition,
                                        srv_conditionValue,
                                        shipper_condition,
                                        shipper_conditionValue)

                                }
                                

                            }
                        }
                    }
                })

                
            }


            
        },

        // codingan pecah ndase
        koliCek(
            data={},
            node='',
            w_condition='', 
            w_conditionValue={}, 
            srv_condition=null, 
            srv_conditionValue={}, 
            shipper_condition=null, 
            shipper_conditionValue={}) {

            let listKoli = this.listKoli
            let service = this.service
            let shipper_tlc = ''

            let prepareSurchargeID = ''
            
            // WEIGHT CONDITION
            let typeWeight = 'actual_weight'
            let has_w_condition = w_condition !== '' ? true : false
            let weightCondition = Object.keys(w_conditionValue)[0]
            let weightConditionValue = w_conditionValue[weightCondition] || -1
            if(w_condition.toLowerCase().includes('chargeble_weight')) {
                typeWeight = 'chargeble_weight'
            }

            // SERVICE CODE CONDITION
            let has_srv_condition = srv_condition !== null ? true : false
            let serviceCodeCondition = Object.keys(srv_conditionValue)[0] || '='
            let serviceCodeConditionValue = srv_conditionValue[serviceCodeCondition] || ''

            // SHIPPER TLC CONDITION
            let has_shipper_tlc_condition = shipper_condition !== null ? true : false
            let shipperCodeCondition = Object.keys(shipper_conditionValue)[0] || '='
            let shipperCodeConditionValue = shipper_conditionValue[shipperCodeCondition] || ''


            // console.log('PROSES AUTO APPLY LIST KOLI', listKoli)
            if(listKoli.length > 0) {
                let self = this
                listKoli.map(koli => {

                    if(typeWeight == 'actual_weight') {
                        if(koli.hasOwnProperty('actual_weight')) {
                            
                            // Codingan dinamis based surcharge condition format data

                            let str = `if(has_w_condition == ${true}) {
                                
                                if(weightConditionValue ${weightCondition} koli['actual_weight'] && weightConditionValue > 0){
                                    self.prepareSurchargeID = data.hasOwnProperty('surcharge_id') ? data['surcharge_id'] : ''
                                    if(has_shipper_tlc_condition == ${true}) {
                                        if(node.toLowerCase().includes(shipperCodeConditionValue.toLowerCase())) {
                                            self.prepareSurchargeID = data.hasOwnProperty('surcharge_id') ? data['surcharge_id'] : ''
                                        } else {
                                            // jika ada pengecekan node code, dan kondisi tidak terpenuhi maka auto apply batal
                                            self.prepareSurchargeID = ''
                                        }
                                    } 
    
                                    if(has_srv_condition == ${true}) {
                                        if(service.toLowerCase().includes(serviceCodeConditionValue.toLowerCase())) {
                                            self.prepareSurchargeID = data.hasOwnProperty('surcharge_id') ? data['surcharge_id'] : ''
                                        } else {
                                            // jika ada pengecekan service code, dan kondisi tidak terpenuhi maka auto apply batal
                                            self.prepareSurchargeID = ''
                                        }
                                    }
                                } else {
                                    self.prepareSurchargeID = ''
                                }

                                console.log('=========APPLY=========')
                                console.log('CONDITION WEIGHT = ', weightConditionValue)
                                console.log('OPERATOR ', weightCondition)
                                console.log('WEIGHT = ',koli['actual_weight'])
                                console.log('STATUS: ',weightConditionValue ${weightCondition} koli['actual_weight'])
                                console.log('---')
                                console.log('has_shipper_tlc_condition = ', has_shipper_tlc_condition)
                                console.log('NODE ', node.toLowerCase())
                                console.log('shipperCodeConditionValue = ',shipperCodeConditionValue.toLowerCase())
                                console.log('STATUS: ', node.toLowerCase().includes(shipperCodeConditionValue.toLowerCase()))
                                console.log('---')
                                console.log('has_srv_condition = ', has_srv_condition)
                                console.log('SERVICE ', service.toLowerCase())
                                console.log('serviceCodeConditionValue = ',serviceCodeConditionValue.toLowerCase())
                                console.log('STATUS: ', service.toLowerCase().includes(serviceCodeConditionValue.toLowerCase()))
                                console.log('---')
                                console.log('HASILnya prepareSurchargeID', self.prepareSurchargeID)
                                console.log('=========APPLY END=========')
                            }`

                            // console.log(str)
                            eval(str)
                        }
                    } else if(typeWeight == 'chargeble_weight') {
                        let calcWeight = 0
                    }

                    
                    
                    if(self.prepareSurchargeID !== '') {
                        if(koli.hasOwnProperty('surcharge_id')) {
                            let idx = 0
                            let cek = true
                            koli['surcharge_id'].map((itm) => {
                                if(this.listenPackageSurchargeByID.hasOwnProperty(itm) == true) {
                                    if(this.listenPackageSurchargeByID[itm]['surcharge_type_name'].toLowerCase().includes('overweight')) {
                                        idx = koli['surcharge_id'].indexOf(itm)
                                        cek = false
                                        
                                    }
                                }
                            })
                            if(cek) {
                                koli['surcharge_id'].push(self.prepareSurchargeID)
                            } else {
                                // if (idx > -1) {
                                //     koli['surcharge_id'].splice(idx, 1);
                                // }
                                // koli['surcharge_id'].push(self.prepareSurchargeID)
                            }
                            
                            console.log('PUSH',listKoli)
                            
                        }
                    } else {
                        let idx = 0
                            koli['surcharge_id'].map((itm) => {
                                if(this.listenPackageSurchargeByID.hasOwnProperty(itm) == true) {
                                    if(this.listenPackageSurchargeByID[itm]['surcharge_type_name'].toLowerCase().includes('overweight')) {
                                        idx = koli['surcharge_id'].indexOf(itm)
                                        if (idx > -1) {
                                            koli['surcharge_id'].splice(idx, 1);
                                        }
                                    }
                                }
                            })
                    }

                })

                this.$store.dispatch("SET_CONNOTE_DATA_KOLI", listKoli)
                // this.listKoli = listKoli
                console.log('prepareSurchargeID ==>', prepareSurchargeID, data, this.listKoli)
            }

            
        },

        calculation(index) {
            let CONNOTE_INDEX = index != undefined ? index : 0
            let tarifData = this.listenPackageService || {}
            let chargeable_weight = this.listenCalculatorChargeableWeight
            let listKoli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item || []
            let surchargeByID = this.listenPackageSurchargeByID

            let BASE_TARIFF = 0
            if(Object.keys(tarifData).length > 0) {
               BASE_TARIFF = tarifData.tarif * chargeable_weight
            }

            let BIAYA_LAIN = 0
            let HANDLING_CHARGE = 0
            if(listKoli.length > 0) {
                listKoli.map(item => {
                    if(item.surcharge_id && item.surcharge_id.length > 0) {
                        let tempbiaya = 0
                        let temp_handling_charge = 0
                        item.surcharge_id.map(su_id => {
                            let dataSurcharge = surchargeByID[su_id]
                            if(dataSurcharge.hasOwnProperty('surcharge_formula')) {
                                if(dataSurcharge['surcharge_formula'].hasOwnProperty('SURCHARGE')) {
                                    let evalSurcharge = eval(dataSurcharge['surcharge_formula']['SURCHARGE'])
                                    tempbiaya = tempbiaya + Number(evalSurcharge)
                                }
                                if(dataSurcharge['surcharge_formula'].hasOwnProperty('HANDLING_CHARGE')) {
                                    temp_handling_charge = Number(dataSurcharge['surcharge_formula']['HANDLING_CHARGE'])
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

            this.$nextTick(() => {
                this.$store.dispatch("SET_CALCULATOR_BIAYA_KIRIM", BASE_TARIFF)
                this.$store.dispatch("SET_CALCULATOR_SURCHARGE", BIAYA_LAIN)
                this.$store.dispatch("SET_CALCULATOR_HANDLING_CHARGE", HANDLING_CHARGE)
                this.$store.dispatch("SET_CALCULATOR_TOTAL_BIAYA", TOTAL_BIAYA)
                // this.$store.dispatch("SET_PROSES_CONNOTE_TOTAL_BIAYA", TOTAL_BIAYA)
                this.$store.dispatch('SET_CONNOTE_DATA', {'key':'total_biaya','value': TOTAL_BIAYA})
                // this.$store.dispatch("SET_TRANSACTION_CONNOTE_TOTAL_BIAYA", {'value': TOTAL_BIAYA, 'index': CONNOTE_INDEX})
                this.calculateGrandTotal()
            });
            
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

        calcMultipleKoli(){
            let listKoli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item
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
        refreshTransactionStore() {
            this.$store.dispatch("EMPTY_TRANSACTION_DATA_CONNOTE", true)
        },
    },
}

export default TransactionMixin