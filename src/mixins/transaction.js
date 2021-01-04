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
        listenConnoteKoliItem () {
            return this.$store.getters.getTransaction.connote_koli_item
        },

        // new code
        listenConnoteIndexActive () {
            return this.$store.getters.getTransaction.connote_index_active
        },
    },
    methods: {
        async autoApply(node_code){
            if(node_code !== undefined) {
                console.log('PROSES AUTO APPLY NEW CODE')
                
                let listKoli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item || []
                let filterAutoSurcharge = await this.filterAutoSurcharge(node_code)
                
                console.log('filterAutoSurcharge', filterAutoSurcharge)
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
                                        if(surcharge.hasOwnProperty('surcharge_condition')) {
                                            let objectives = surcharge['surcharge_condition']
                                            let str = ''
                                            if(objectives.hasOwnProperty('KOLI_ACTUAL_WEIGHT')){
                                                console.log('1')
                                                let operator = Object.keys(objectives['KOLI_ACTUAL_WEIGHT'])[0]
                                                let val1 = objectives['KOLI_ACTUAL_WEIGHT'][operator]
                                                let val2 = actual_weight
                                                // fix jika type operator lebih dari ('>='), maka switch value
                                                if(operator == '>=') {
                                                    val1 = actual_weight
                                                    val2 = objectives['KOLI_ACTUAL_WEIGHT'][operator]
                                                }
                                                str = `if(${val1} ${operator} ${val2}){
                                                    prepareSurchargeID = surcharge.hasOwnProperty('surcharge_id') ? surcharge['surcharge_id'] : ''
                                                }`
    
                                            } else if(objectives.hasOwnProperty('CHARGEBLE_WEIGHT')) {
                                                console.log('2')
                                                let operator = Object.keys(objectives['CHARGEBLE_WEIGHT'])[0]
                                                let val1 = objectives['CHARGEBLE_WEIGHT'][operator]
                                                let val2 = chargeable_weight
                                                // fix jika type operator lebih dari ('>='), maka switch value
                                                if(operator == '>=') {
                                                    val1 = chargeable_weight
                                                    val2 = objectives['CHARGEBLE_WEIGHT'][operator]
                                                }
                                                str = `if(${val1} ${operator} ${val2}){
                                                    prepareSurchargeID = surcharge.hasOwnProperty('surcharge_id') ? surcharge['surcharge_id'] : ''
                                                }`
                                                console.log('str', str)
    
                                            } else if(objectives.hasOwnProperty('WEIGHT')) {
                                                console.log('3')
                                                let operator = Object.keys(objectives['WEIGHT'])[0]
                                                let val1 = objectives['WEIGHT'][operator]
                                                let val2 = actual_weight
                                                // fix jika type operator lebih dari ('>='), maka switch value
                                                if(operator == '>=') {
                                                    val1 = actual_weight
                                                    val2 = objectives['WEIGHT'][operator]
                                                }
                                                str = `if(${val1} ${operator} ${val2}){
                                                    prepareSurchargeID = surcharge.hasOwnProperty('surcharge_id') ? surcharge['surcharge_id'] : ''
                                                }`
                                                console.log('str', str)
                                            }
                                            eval(str)
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

        async filterAutoSurcharge(node = ''){
            // filter berdasarkan selected service code sebelum koli checking, untuk mengurangi time complexity
            this.service = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_service_code || ''
            let surchargeList = this.listenSurchargeList || []
            let result = []
            console.log('ini service', this.service)
            try {
                if(surchargeList.length > 0) {
                    surchargeList.map(surcharge => {
                        if(surcharge.hasOwnProperty('surcharge_condition')) {
                            let objectives = surcharge['surcharge_condition'] || {}
                            let serviceObjectives = false
                            let hasShipperObjectives = false
                            let shipperObjectivesStatus = false
                            if(objectives.hasOwnProperty('CONNOTE_SERVICE_CODE')) {
                               let operator = Object.keys(objectives['CONNOTE_SERVICE_CODE'])[0] || ''
                               if(operator !== ''){
                                    serviceObjectives = this.service.toLowerCase().includes(objectives['CONNOTE_SERVICE_CODE'][operator].toLowerCase())
                               }
                            }

                            if(objectives.hasOwnProperty('CONNOTE_SHIPPER_TLC')) {
                                hasShipperObjectives = true
                                let operator = Object.keys(objectives['CONNOTE_SHIPPER_TLC'])[0] || ''
                                if(operator !== ''){
                                    shipperObjectivesStatus = node.toLowerCase().includes(objectives['CONNOTE_SHIPPER_TLC'][operator].toLowerCase())
                                }
                            }

                            if(serviceObjectives) {
                                if(hasShipperObjectives){
                                    if(shipperObjectivesStatus == true) {
                                        result.push(surcharge)
                                    } else {
                                        // jika punya kondisi shipper tlc, namun tidak memenuhi syarat maka batal
                                    }
                                } else {
                                    result.push(surcharge)
                                }
                            }
                        }
                    })
                }  
            } catch (error) {
                console.log('filter error ', error)
                return []
            }
            return result
        },


        calculationold(index) {
            let CONNOTE_INDEX = index != undefined ? index : 0
            this.calcDataKoli()

            // let BIAYA_LAIN = 0
            // let HANDLING_CHARGE = 0
            // let CHARGEBLE_WEIGHT = Number(this.$store.getters.getTransaction.calculator.chargeable_weight.value) || 0
            // let PROSES_CHARGEBLE_WEIGHT = 0

            // if(this.listKoli.length > 0) {
            //     this.listKoli.map(item => {
            //         if(item.surcharge_id && item.surcharge_id.length > 0) {
            //             let tempbiaya = 0
            //             let temp_handling_charge = 0
            //             let temp_chargeable_weight = 0
            //             item.surcharge_id.map(su_id => {
            //                 let dataSurcharge = surchargeByID[su_id] || {}
                            
            //                 if(Object.keys(dataSurcharge).length > 0) {
            //                     if(dataSurcharge.hasOwnProperty('surcharge_formula')) {
            //                         if(dataSurcharge['surcharge_formula'].hasOwnProperty('SURCHARGE')) {
            //                             let evalSurcharge = eval(dataSurcharge['surcharge_formula']['SURCHARGE'])
            //                             tempbiaya = tempbiaya + Number(evalSurcharge)
            //                         }
            //                         if(dataSurcharge['surcharge_formula'].hasOwnProperty('HANDLING_CHARGE')) {
            //                             temp_handling_charge = Number(dataSurcharge['surcharge_formula']['HANDLING_CHARGE'])
            //                         }
            //                         if(dataSurcharge['surcharge_formula'].hasOwnProperty('CHARGEBLE_WEIGHT')) {
            //                             let evalchargeable_weight = eval(dataSurcharge['surcharge_formula']['CHARGEBLE_WEIGHT'])
            //                             PROSES_CHARGEBLE_WEIGHT = PROSES_CHARGEBLE_WEIGHT + Number(evalchargeable_weight)
            //                             console.log('CHARGEBLE_WEIGHT', evalchargeable_weight)
            //                             // temp_chargeable_weight = temp_chargeable_weight + Number(evalchargeable_weight)
            //                         }
            //                     }
            //                 }
            //             })
            //             BIAYA_LAIN = BIAYA_LAIN + tempbiaya
            //             HANDLING_CHARGE = HANDLING_CHARGE + temp_handling_charge
                        
            //         }
            //     })
            // }

            // console.log('CHARGEBLE_WEIGHT_additional', CHARGEBLE_WEIGHT_additional)

            // let chargeable_weight_calc = CHARGEBLE_WEIGHT
            // if(PROSES_CHARGEBLE_WEIGHT > 0) {
            //     this.$store.dispatch("SET_CALCULATOR_CHARGEABLE_WEIGHT", PROSES_CHARGEBLE_WEIGHT) 
            //     chargeable_weight_calc = PROSES_CHARGEBLE_WEIGHT
            // }

            // let BASE_TARIFF = 0
            // if(Object.keys(tarifData).length > 0) {
            //    BASE_TARIFF = tarifData.tarif * this.chargeable_weight
            // }
            let TOTAL_BIAYA = 0
            TOTAL_BIAYA = this.BASE_TARIFF + this.HANDLING_CHARGE + this.BIAYA_LAIN

            this.$nextTick(() => {
                this.$store.dispatch("SET_CALCULATOR_BIAYA_KIRIM", this.BASE_TARIFF)
                this.$store.dispatch("SET_CALCULATOR_SURCHARGE", this.BIAYA_LAIN)
                this.$store.dispatch("SET_CALCULATOR_HANDLING_CHARGE", this.HANDLING_CHARGE)
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


        calculation(){
            let listKoli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item || []
            let surchargeByID = this.listenPackageSurchargeByID
            let tarifData = this.listenPackageService || {}
            let service = this.listenPackageService.data || {}

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
                    
                    this.SUM_VOLUME_WEIGHT = this.SUM_VOLUME_WEIGHT + Number(koli_volume_weight.toFixed(2))

                    if(koli.surcharge_id && koli.surcharge_id.length > 0) {
                        let tempbiaya = 0
                        let temp_handling_charge = 0
                        let temp_chargeable_weight = 0
                        let CHARGEBLE_WEIGHT = this.SUM_CHARGEBLE_WEIGHT
                        let ACTUAL_WEIGHT = koli_actual_weight
                        let temp_actual = 0
                        koli.surcharge_id.map(su_id => {
                            let dataSurcharge = surchargeByID[su_id] || {}
                            
                            if(Object.keys(dataSurcharge).length > 0) {
                                if(dataSurcharge.hasOwnProperty('surcharge_formula')) {
                                    if(dataSurcharge['surcharge_formula'].hasOwnProperty('SURCHARGE')) {
                                        let evalSurcharge = eval(dataSurcharge['surcharge_formula']['SURCHARGE'])
                                        tempbiaya = tempbiaya + Number(evalSurcharge)
                                    }
                                    if(dataSurcharge['surcharge_formula'].hasOwnProperty('HANDLING_CHARGE')) {
                                        temp_handling_charge = Number(dataSurcharge['surcharge_formula']['HANDLING_CHARGE'])
                                    }
                                    if(dataSurcharge['surcharge_formula'].hasOwnProperty('CHARGEBLE_WEIGHT')) {
                                        let evalchargeable_weight = eval(dataSurcharge['surcharge_formula']['CHARGEBLE_WEIGHT'])
                                        this.SUM_CHARGEBLE_WEIGHT = evalchargeable_weight
                                        console.log('CHARGEBLE_WEIGHT', evalchargeable_weight)
                                        // temp_chargeable_weight = temp_chargeable_weight + Number(evalchargeable_weight)
                                    }
                                    if(dataSurcharge['surcharge_formula'].hasOwnProperty('ACTUAL_WEIGHT')) {
                                        let evalactual_weight = eval(dataSurcharge['surcharge_formula']['ACTUAL_WEIGHT'])
                                        koli_actual_weight = evalactual_weight

                                        

                                        console.log('ACTUAL_WEIGHT', evalactual_weight)
                                        // temp_chargeable_weight = temp_chargeable_weight + Number(evalchargeable_weight)
                                    }
                                }
                            }
                        })
                        this.SUM_ACTUAL_WEIGHT = this.SUM_ACTUAL_WEIGHT + koli_actual_weight
                        SUM_BIAYA_LAIN = SUM_BIAYA_LAIN + tempbiaya
                        SUM_HANDLING_CHARGE = SUM_HANDLING_CHARGE + temp_handling_charge

                        // let reroundUp = Number(this.round03(this.SUM_VOLUME_WEIGHT))
                        let reCompare = Number(Math.max(this.SUM_ACTUAL_WEIGHT, roundUp).toFixed(2))
                        this.SUM_CHARGEBLE_WEIGHT = reCompare
                    }

                })

                if(Object.keys(tarifData).length > 0) {
                    this.BASE_TARIFF = tarifData.tarif * this.SUM_CHARGEBLE_WEIGHT
                }
                TOTAL_BIAYA = this.BASE_TARIFF + SUM_HANDLING_CHARGE + SUM_BIAYA_LAIN
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

        calcDataKoliold(){
            let listKoli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item
            let surchargeByID = this.listenPackageSurchargeByID
            let tarifData = this.listenPackageService || {}
            // let roundUp = this.round03(volume_weight.toFixed(2))
            // let chargeable_weight = Math.max(listKoli[index]['actual_weight'], roundUp).toFixed(2)
            this.chargeable_weight = 0
            this.actual_weight = 0
            this.volume_weight = 0

            let BIAYA_LAIN = 0
            let HANDLING_CHARGE = 0
            let PROSES_CHARGEBLE_WEIGHT = 0

            let BASE_TARIFF = 0
            
            
            if(listKoli.length > 0) {
                listKoli.map(item => {
                    let volume_weight_temp = 0
                    if(item['volume_weight']) {
                        volume_weight_temp = volume_weight_temp + Number(item['volume_weight'])
                    }
                    if(item['actual_weight']) {
                        this.actual_weight = this.actual_weight + Number(item['actual_weight'])
                    }

                    this.volume_weight = this.volume_weight + volume_weight_temp
                    let roundUp = this.round03(this.volume_weight)
                    this.chargeable_weight = Number(Math.max(this.actual_weight, roundUp).toFixed(2))

                    let CHARGEBLE_WEIGHT = this.chargeable_weight
                    
                    
                    if(item.surcharge_id && item.surcharge_id.length > 0) {
                        let tempbiaya = 0
                        let temp_handling_charge = 0
                        let temp_chargeable_weight = 0
                        item.surcharge_id.map(su_id => {
                            let dataSurcharge = surchargeByID[su_id] || {}
                            
                            if(Object.keys(dataSurcharge).length > 0) {
                                if(dataSurcharge.hasOwnProperty('surcharge_formula')) {
                                    if(dataSurcharge['surcharge_formula'].hasOwnProperty('SURCHARGE')) {
                                        let evalSurcharge = eval(dataSurcharge['surcharge_formula']['SURCHARGE'])
                                        tempbiaya = tempbiaya + Number(evalSurcharge)
                                    }
                                    if(dataSurcharge['surcharge_formula'].hasOwnProperty('HANDLING_CHARGE')) {
                                        temp_handling_charge = Number(dataSurcharge['surcharge_formula']['HANDLING_CHARGE'])
                                    }
                                    if(dataSurcharge['surcharge_formula'].hasOwnProperty('CHARGEBLE_WEIGHT')) {
                                        let evalchargeable_weight = eval(dataSurcharge['surcharge_formula']['CHARGEBLE_WEIGHT'])
                                        temp_chargeable_weight = temp_chargeable_weight + Number(evalchargeable_weight)
                                        console.log('CHARGEBLE_WEIGHT', evalchargeable_weight)
                                        // temp_chargeable_weight = temp_chargeable_weight + Number(evalchargeable_weight)
                                    }
                                }
                            }
                        })
                        BIAYA_LAIN = BIAYA_LAIN + tempbiaya
                        HANDLING_CHARGE = HANDLING_CHARGE + temp_handling_charge
                        PROSES_CHARGEBLE_WEIGHT = PROSES_CHARGEBLE_WEIGHT + temp_chargeable_weight

                        if(PROSES_CHARGEBLE_WEIGHT !== 0) {
                            this.chargeable_weight = PROSES_CHARGEBLE_WEIGHT
                            console.log('PROSES_CHARGEBLE_WEIGHT', this.chargeable_weight, PROSES_CHARGEBLE_WEIGHT)
                        }
                        
                    } else {
                        this.chargeable_weight = CHARGEBLE_WEIGHT
                        console.log('ELSE PROSES_CHARGEBLE_WEIGHT', this.chargeable_weight)
                    }
                })

                

                
            }

            if(Object.keys(tarifData).length > 0) {
                BASE_TARIFF = tarifData.tarif * this.chargeable_weight
            }
            
            this.BASE_TARIFF = BASE_TARIFF

            console.log('calcDataKoli', this.chargeable_weight,this.actual_weight,this.volume_weight)
            
            
            this.$store.dispatch("SET_CALCULATOR_ACTUAL_WEIGHT", this.actual_weight)
            this.$store.dispatch("SET_CALCULATOR_VOLUME_WEIGHT", this.volume_weight)
            this.$store.dispatch("SET_CALCULATOR_CHARGEABLE_WEIGHT", this.chargeable_weight) 
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