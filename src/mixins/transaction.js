const TransactionMixin = {
    data() {
        return {
            prepareSurchargeID: '',
            listKoli: [],
            service: '',
            chargeable_weight: 0,
            actual_weight: 0,
            volume_weight: 0,
            BIAYA_LAIN: 0,
            HANDLING_CHARGE: 0,


            SUM_CHARGEBLE_WEIGHT: 0,
            SUM_ACTUAL_WEIGHT: 0,
            SUM_VOLUME_WEIGHT: 0,
            BASE_TARIFF: 0,
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
        listenConnoteKoliItem () {
            return this.$store.getters.getTransaction.connote_koli_item
        },

        // new code
        listenConnoteIndexActive () {
            return this.$store.getters.getTransaction.connote_index_active
        },
    },
    methods: {
        async autoApply(){
            let node_code = this.$store.getters.getUser['node_id'].node_code
            if(node_code !== undefined) {
                console.log('PROSES AUTO APPLY NEW CODE')
                
                let listKoli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item || []
                let filterAutoSurcharge = this.listenSurchargeList || []
                
                try {
                    if(listKoli.length > 0) {
                        listKoli.map(koli => {
                            if(koli.hasOwnProperty('actual_weight')) {
                                // autoapply minimal 70kg
                                let actual_weight = koli['actual_weight'] //>= 70 ? koli['actual_weight'] : -1
                                let volume_weight = Number(koli['volume_weight']) || 0

                                let chargeable_weight = Number(Math.max(actual_weight, volume_weight)).toFixed(2)
                                chargeable_weight = chargeable_weight //>= 70 ? chargeable_weight : -1
                                let prepareSurchargeID = ''
                                
                                if(actual_weight > 0 && chargeable_weight > 0) {
                                    filterAutoSurcharge.map(surcharge => {
                                        if (surcharge.hasOwnProperty('surcharge_condition') && surcharge['surcharge_type_name'].toLowerCase().includes('overweight')){
                                            let obj = this.filterSurcharge(surcharge, koli, node_code)
                                            if(obj['service_relevant'] == true) {
                                                prepareSurchargeID = surcharge.hasOwnProperty('surcharge_id') ? surcharge['surcharge_id'] : ''
                                            }
                                        }
                                        
                                    })

                                    console.log('prepareSurchargeID', prepareSurchargeID)
                                }

                                if(koli.hasOwnProperty('surcharge_id')) {
                                    // fix setiap masing2 koli overweight, wajib hanya memiliki 1 type surcharge overweight
                                    let alreadyHasOverWeight = false
                                    let index = 0
                                    koli['surcharge_id'].map((itm) => {
                                        if(this.listenPackageSurchargeByID.hasOwnProperty(itm) == true) {
                                            if(this.listenPackageSurchargeByID[itm]['surcharge_type_name'].toLowerCase().includes('overweight')) {
                                                index = koli['surcharge_id'].indexOf(itm)
                                                alreadyHasOverWeight = true
                                            }
                                        }
                                    })

                                    if(alreadyHasOverWeight) {
                                        if (index > -1) {
                                            koli['surcharge_id'].splice(index, 1);
                                        }
                                    }

                                    if(prepareSurchargeID !== '') {
                                        koli['surcharge_id'].push(prepareSurchargeID)
                                    }
                                }
                                
                            }
                        })

                        this.$store.dispatch("SET_CONNOTE_DATA_KOLI", listKoli)
                        console.log('SET_CONNOTE_DATA_KOLI ==>', listKoli)
                    }
                } catch (error) {
                    console.log('error auto apply', error)
                }
            }
        },

        filterSurcharge(obj, koli, node_code) {
            let service = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_service_code || ''
            let status = false
            let listkoli = koli || []
            let node = node_code || ''
            
            try {
                if (Object.keys(service).length > 0) {
                    let surcharge_condition = obj['surcharge_condition'] || {}
                    
                    // console.log('--- Surcharge -> '+obj['surcharge_name']+'----------', surcharge_condition, this.koli, this.listenCurrentIndexKoli)
                            if(Object.keys(surcharge_condition).length > 0) {
                                let tempStatus = null
                                Object.keys(surcharge_condition).map(objective1 => {
                                    surcharge_condition[objective1].map( item => {
                                        
                                        let operator = Object.keys(item)[0]
                                        let objective2 = item[operator] !== undefined ? item[operator] : ''

                                        if(objective1.toLowerCase().includes('connote_service_code')) {
                                            if(service.toLowerCase().includes(objective2.toLowerCase())) {
                                                tempStatus = tempStatus !== null ? tempStatus && true : true
                                            } else {
                                                tempStatus = tempStatus !== null ? tempStatus && false : false
                                            }
                                            // console.log('Surcharge name = ', obj['surcharge_name'])
                                            // console.log('proses condition', objective1, service, objective2.toLowerCase(), tempStatus)
                                            // console.log('END ///')
                                        } else if (objective1.toLowerCase().includes('connote_shipper_tlc')) {
                                            if(node.toLowerCase().includes(objective2.toLowerCase())) {
                                                tempStatus = tempStatus !== null ? tempStatus && true : true
                                            } else {
                                                tempStatus = tempStatus !== null ? tempStatus && false : false
                                            }
                                            // console.log('Surcharge name = ', obj['surcharge_name'])
                                            // console.log('proses condition', objective1, node, objective2.toLowerCase(), tempStatus)
                                            // console.log('END ///')
                                        } else {
                                                if(Object.keys(listkoli).length > 0) {
                                                    if(!objective1.toLowerCase().includes('actual_weight') && !objective1.toLowerCase().includes('length')) {
                                                        let con1 = objective1.toLowerCase().replace("koli_", "")
                                                        let con2 = typeof objective2 !== 'number' ? objective2.toLowerCase().replace("koli_", "") : ''

                                                        let value1 = Number(listkoli[con1]) || ''
                                                        let value2 = Number(listkoli[con2]) || ''
                                                        
                                                        if(value1 !== '' && value2 !== '') {
                                                            let str = `value1 ${operator} value2`
                                                            tempStatus = tempStatus !== null ? tempStatus !== null ? tempStatus && eval(str) : eval(str) : eval(str)
                                                            // console.log('Surcharge name = ', obj['surcharge_name'])
                                                            // console.log('proses condition', objective1, objective2,str,value1,operator,value2, status)
                                                            // console.log('END ///')
                                                        }
                                                    }
                                                }

                                                if(objective1.toLowerCase().includes('actual_weight')) {
                                                    if(Object.keys(listkoli).length > 0) {
                                                        let actual_weight = Number(listkoli['actual_weight'])

                                                        let value1 = actual_weight
                                                        let value2 = objective2

                                                        // if(operator.includes('<')) {
                                                        //     value1 = objective2
                                                        //     value2 = actual_weight
                                                        // }

                                                        if(typeof objective2 == 'number') {
                                                            let str = `${value1} ${operator} ${value2}`
                                                            tempStatus = tempStatus !== null ? tempStatus && eval(str) : eval(str)
                                                            // console.log('Surcharge name = ', obj['surcharge_name'])
                                                            // console.log('proses condition', objective1, objective2,str,value1,operator,value2, eval(str))
                                                            // console.log('END ///')
                                                        }
                                                    }
                                                }

                                                if(objective1.toLowerCase().includes('chargeble_weight')) {
                                                    if(Object.keys(listkoli).length > 0) {
                                                        let volume_weight = Number(listkoli['volume_weight'])
                                                        let actual_weight = Number(listkoli['actual_weight'])
                                                        let roundUp = this.round03(volume_weight)
                                                        let chargeble_weight = 0
                                                        chargeble_weight = Number(Math.max(actual_weight, roundUp).toFixed(2))
                                                        

                                                        let value1 = chargeble_weight
                                                        let value2 = objective2

                                                        // if(operator.includes('<')) {
                                                        //     value1 = objective2
                                                        //     value2 = chargeble_weight
                                                        // }

                                                        if(typeof objective2 == 'number') {
                                                            let str = `${value1} ${operator} ${value2}`
                                                            tempStatus = tempStatus !== null ? tempStatus && eval(str) : eval(str)
                                                            // console.log('Surcharge name = ', obj['surcharge_name'])
                                                            // console.log('proses condition', objective1, objective2,str,value1,operator,value2, status)
                                                            // console.log('END ///')
                                                        }
                                                    }
                                                }
                                                if(objective1.toLowerCase() == 'length') {
                                                    if(Object.keys(this.koli).length > 0) {
                                                        let max = Number(Math.max(Number(Math.max(this.koli['length'], this.koli['width'])), this.koli['height']))
                                                        
                                                        let value1 = Number(max)
                                                        let value2 = Number(objective2)

                                                        if(operator.includes('<')) {
                                                            value1 = Number(objective2)
                                                            value2 = Number(max)
                                                        }

                                                        let str = `${value1} ${operator} ${value2}`
                                                        tempStatus = tempStatus !== null ? tempStatus && eval(str) : eval(str)
                                                        // console.log('Surcharge name = ', obj['surcharge_name'])
                                                        // console.log('proses condition', objective1, objective2,str,value1,operator,value2, status)
                                                        // console.log('END ///')
                                                    }
                                                }
                                        }
                                    })

                                })
                                if(tempStatus !== null) {
                                    status = tempStatus
                                }
                            }
                    obj['service_relevant'] = status
                    // console.log('=================== obj', obj)
                }
            } catch (error) {
                console.log('error', error)
                return {}
            }

            return obj
        },

        calculateGrandTotal() {
            let listConnote = this.$store.getters.getTransaction.transaction.connote
            let GTOTAL = 0

            if(listConnote.length > 0) {
                listConnote.map(item => {
                    if(item.hasOwnProperty('total_biaya')) {
                        GTOTAL = GTOTAL + item['total_biaya']
                    }
                })
            } 
            
            this.$nextTick(() => {
                this.$store.dispatch("SET_TRANSACTION_GRAND_TOTAL", GTOTAL)
            });
        },


        calculation(){
            // rumit cuuk
            let listKoli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item || []
            let diskon = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].amount_discount
            diskon = this.moneyParsing(diskon)
            let surchargeByID = this.listenPackageSurchargeByID
            let tarifData = this.listenPackageService || {}
            
            this.SUM_CHARGEBLE_WEIGHT= 0
            this.SUM_ACTUAL_WEIGHT= 0
            this.SUM_VOLUME_WEIGHT= 0

            let SUM_BIAYA_LAIN = 0
            let SUM_HANDLING_CHARGE = 0
            let TOTAL_BIAYA = 0
            
            
            if(listKoli.length > 0) {
                listKoli.map(koli => {
                    // koli hitung satuan
                    let koli_volume_weight = Number(koli['volume_weight'])
                    
                    let koli_actual_weight = Number(koli['actual_weight'])

                    let roundUp = Number(this.round03(koli_volume_weight))
                    let ALL_CHARGEBLE_WEIGHT = Number(Math.max(koli_actual_weight, roundUp).toFixed(2))

                    // koli total calculator
                    this.SUM_CHARGEBLE_WEIGHT = this.SUM_CHARGEBLE_WEIGHT + ALL_CHARGEBLE_WEIGHT
                    // this.SUM_ACTUAL_WEIGHT = this.SUM_ACTUAL_WEIGHT + koli_actual_weight
                    this.SUM_VOLUME_WEIGHT = this.SUM_VOLUME_WEIGHT + Number(koli_volume_weight.toFixed(2))
                    
                    let tempbiaya = 0
                    let temp_handling_charge = 0
                    let temp_chargeable_weight = 0
                    let reCompare = false

                    if(koli.surcharge_id && koli.surcharge_id.length > 0) {
                        
                        let chargeble_weight = this.SUM_CHARGEBLE_WEIGHT
                        let base_tariff = this.BASE_TARIFF 
                        // console.log('base_tariff', this.BASE_TARIFF )
                        let temp_actual = 0
                        koli.surcharge_id.map(su_id => {
                            let dataSurcharge = surchargeByID[su_id] || {}
                            
                            if(Object.keys(dataSurcharge).length > 0) {
                                if(dataSurcharge.hasOwnProperty('surcharge_formula')) {
                                    Object.keys(dataSurcharge['surcharge_formula']).map(formula => {
                                        if(dataSurcharge['surcharge_formula'].hasOwnProperty(formula)) {
                                            if(formula.toLowerCase() == 'chargeble_weight') {
                                                let str = isNaN(dataSurcharge['surcharge_formula'][formula]) ? dataSurcharge['surcharge_formula'][formula].toLowerCase() : dataSurcharge['surcharge_formula'][formula]
                                                let evalchargeable_weight = eval(str)
                                                this.SUM_CHARGEBLE_WEIGHT = evalchargeable_weight
                                                // this.BASE_TARIFF = tarifData.tarif * this.SUM_CHARGEBLE_WEIGHT
                                                this.BASE_TARIFF = this.tarifTiering(this.SUM_CHARGEBLE_WEIGHT)
                                                base_tariff = this.BASE_TARIFF
                                                // console.log('CHARGEBLE_WEIGHT', str, chargeble_weight,evalchargeable_weight, this.SUM_CHARGEBLE_WEIGHT, base_tariff)
                                            } else if (formula.toLowerCase() == 'surcharge') {
                                                let evalSurcharge = eval(dataSurcharge['surcharge_formula'][formula].toLowerCase())
                                                // tempbiaya = Number(evalSurcharge)
                                                tempbiaya = tempbiaya + Number(evalSurcharge)
                                            } else if (formula.toLowerCase() == 'handling_charge') {
                                                temp_handling_charge = Number(dataSurcharge['surcharge_formula'][formula])
                                            } else if(formula.toLowerCase() == 'koli_actual_weight') {
                                                let evalactual_weight = eval(dataSurcharge['surcharge_formula'][formula].toLowerCase())
                                                koli_actual_weight = evalactual_weight
                                                reCompare = true
                                                // console.log('ACTUAL_WEIGHT', evalactual_weight)
                                            }
                                        }
                                    })
                                    
                                }
                            }
                        })
                        
                    }

                    this.SUM_ACTUAL_WEIGHT = this.SUM_ACTUAL_WEIGHT + koli_actual_weight
                    SUM_BIAYA_LAIN = SUM_BIAYA_LAIN + tempbiaya
                    SUM_HANDLING_CHARGE = SUM_HANDLING_CHARGE + temp_handling_charge

                    // let reroundUp = Number(this.round03(this.SUM_VOLUME_WEIGHT))
                    let reCompareWeight = Number(Math.max(this.SUM_ACTUAL_WEIGHT, roundUp).toFixed(2))
                    
                    if(reCompare == true) {
                        this.SUM_CHARGEBLE_WEIGHT += reCompareWeight
                    }
                    // this.SUM_CHARGEBLE_WEIGHT += chargeble_weight_intervensi
                    
                })

                let reCompareWeight = Number(Math.max(this.SUM_ACTUAL_WEIGHT, this.SUM_CHARGEBLE_WEIGHT).toFixed(2))
                this.SUM_CHARGEBLE_WEIGHT = reCompareWeight
                    

                if(Object.keys(tarifData).length > 0) {
                    // this.BASE_TARIFF = tarifData.tarif * this.SUM_CHARGEBLE_WEIGHT
                    this.BASE_TARIFF = this.tarifTiering(this.SUM_CHARGEBLE_WEIGHT)
                }
                TOTAL_BIAYA = this.BASE_TARIFF + SUM_HANDLING_CHARGE + SUM_BIAYA_LAIN
            }

            let ASURANSI = this.$store.getters.getTransaction.calculator.asuransi.value
            let ADM_ASURANSI = this.$store.getters.getTransaction.calculator.adm_asuransi.value

            TOTAL_BIAYA = TOTAL_BIAYA + ASURANSI + ADM_ASURANSI

            if(TOTAL_BIAYA > diskon) {
                TOTAL_BIAYA = TOTAL_BIAYA - diskon
            }
            
            
            this.$store.dispatch("SET_CALCULATOR_ACTUAL_WEIGHT", this.SUM_ACTUAL_WEIGHT)
            this.$store.dispatch("SET_CALCULATOR_VOLUME_WEIGHT", this.SUM_VOLUME_WEIGHT)
            this.$store.dispatch("SET_CALCULATOR_CHARGEABLE_WEIGHT", this.SUM_CHARGEBLE_WEIGHT)
            
            this.$store.dispatch("SET_CALCULATOR_BIAYA_KIRIM", this.BASE_TARIFF)
            this.$store.dispatch("SET_CALCULATOR_SURCHARGE", SUM_BIAYA_LAIN)
            this.$store.dispatch("SET_CALCULATOR_HANDLING_CHARGE", SUM_HANDLING_CHARGE)
            this.$store.dispatch("SET_CALCULATOR_TOTAL_BIAYA", TOTAL_BIAYA)
            // this.$store.dispatch("SET_PROSES_CONNOTE_TOTAL_BIAYA", TOTAL_BIAYA)
            this.$store.dispatch('SET_CONNOTE_DATA', {'key':'total_biaya','value': TOTAL_BIAYA})
            this.calculateGrandTotal()
        },

        tarifTiering(wg){
            let service = this.listenPackageService || {}
            let weight = wg || 0
            let processTariff = 0
            let sumTariffAkumulatif = 0

            let tariffStandar = service['tariffStandar'] || {}
            let tariffAkumulatif = service['tariffAkumulatif'] || {}
            
            processTariff = Number(tariffStandar['value']) * (weight <= Number(tariffStandar['weight']) ? weight : Number(tariffStandar['weight']))
            if(weight > tariffStandar['weight']){
                let Processweight = Math.abs(Number(tariffStandar['weight']) - Number(weight))
                let sisa = 0
                let keys = Object.keys(tariffAkumulatif)
                let temp = 0
                for(let i=0; i <= keys.length -1 ; i++) {
                    let calc = (Number(Processweight) - Number(keys[i])) < 0 ? 0 : (Number(Processweight) - Number(keys[i]))
                    if(calc !== 0) {
                        let abs = Math.abs(Number(Processweight) - Number(keys[i]))
                        Processweight = abs
                        temp = temp + (Number(tariffAkumulatif[keys[i]]) * Number(keys[i]))
                        
                    } else {
                        temp = temp + (Number(tariffAkumulatif[keys[i]]) * Number(Processweight))
                        sumTariffAkumulatif = Number(sumTariffAkumulatif) + temp
                        break
                    }   
                }
            }

            processTariff = Number(processTariff) + Number(sumTariffAkumulatif)

            return processTariff
            
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
        clearTransactionStore() {
            this.$store.dispatch("CLEAR_TRANSACTION_DATA_CONNOTE", true)
        }
    },
}

export default TransactionMixin