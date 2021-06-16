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

            koliBeforeSurcharge: {},

            defaultCalculator: {},
            defaultDestination: {},
            defaultOrigin: {},
            defaultPackage: {},
            defaultTransaction: {},
            defaultCalcComponent: {},

            temp_autoapply_weight: 0
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
            return this.$store.getters.getTransaction.package.package_service.valueData || {}
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
            let tempSurchargeActualWeight = 0

            if(node_code !== undefined) {
                // console.log('PROSES AUTO APPLY NEW CODE')
                
                let listKoli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item || []

                let filterAutoSurcharge = this.listenSurchargeList || []
                // console.log('listKoli', listKoli)
                try {
                    if(listKoli.length > 0) {
                        let hasPackingKayu = false
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
                                            // console.log('auto complete surcharge', obj)
                                            
                                            if(obj['service_relevant'] == true) {
                                                if(obj.hasOwnProperty("KOLI_ACTUAL_WEIGHT")) {
                                                    if(obj["KOLI_ACTUAL_WEIGHT"] >= tempSurchargeActualWeight) {
                                                        prepareSurchargeID = surcharge.hasOwnProperty('surcharge_id') ? surcharge['surcharge_id'] : ''

                                                        tempSurchargeActualWeight = obj["KOLI_ACTUAL_WEIGHT"]
                                                    }
                                                } else {
                                                    prepareSurchargeID = surcharge.hasOwnProperty('surcharge_id') ? surcharge['surcharge_id'] : ''
                                                }
                                            }
                                        }
                                        
                                    })

                                    // console.log('prepareSurchargeID', prepareSurchargeID)
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
                                            if(this.listenPackageSurchargeByID[itm]['surcharge_type_name'].toLowerCase().includes('packing kayu')) {
                                                // console.log('HAS PACKING KAYU')
                                                hasPackingKayu = true
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

                        // console.log('AUTO APPLY OVERWEIGHT ==>', listKoli)
                        this.$store.dispatch("SET_CONNOTE_DATA_KOLI", listKoli)

                        
                        this.$store.dispatch('SET_CONNOTE_DATA', {'key':'is_packing_kayu','value': hasPackingKayu})
                        
                    }
                } catch (error) {
                    console.log('error auto apply', error)
                }
            }
        },

        filterSurcharge(obj, koli, node_code) {
            let service = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_service_code || ''
            let selectedServiceData = this.$store.getters.getTransaction.package["package_service"]["valueData"] || {}
            let selectedService = selectedServiceData['label'].toLowerCase()
            
            let tarifData = this.listenPackageService.data || {}
            let status = false
            let listkoli = koli || []
            let node = node_code || ''
            // console.log('tarifData filter surcharge', tarifData)
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

                                        
                                        if(objective1.toLowerCase().includes('geolocation_is_intl')) {
                                            // console.log('geolocation_is_intl', item, objective1, objective2)
                                            if(tarifData.hasOwnProperty('is_intl')) {
                                                
                                                if(tarifData['is_intl'] == objective1['geolocation_is_intl']) {
                                                    tempStatus = tempStatus !== null ? tempStatus && true : true
                                                } else {
                                                    tempStatus = tempStatus !== null ? tempStatus && false : false
                                                }
                                            }
                                        }
                                        

                                        if(objective1.toLowerCase().includes('connote_service_code')) {
                                            // if(service.toLowerCase().includes(objective2.toLowerCase())) {
                                            //     tempStatus = tempStatus !== null ? tempStatus && true : true
                                            // } else {
                                            //     tempStatus = tempStatus !== null ? tempStatus && false : false
                                            // }
                                            if(operator === '=') {
                                                operator = '=='
                                            }
                                            let str = `'${selectedService}' ${operator} '${objective2.toLowerCase()}'`
                                            let evalstr = eval(str)

                                            tempStatus = tempStatus !== null ? tempStatus && evalstr : evalstr


                                            // console.log('Surcharge name = ', obj['surcharge_name'],)
                                            // console.log('SERVICE CODE STR >>>', str, evalstr)
                                            // console.log('proses condition', objective1, service, operator, objective2.toLowerCase(), tempStatus)
                                            // console.log('END ///')
                                        } 
                                        if (objective1.toLowerCase().includes('connote_shipper_tlc')) {
                                            if(node.toLowerCase().includes(objective2.toLowerCase())) {
                                                tempStatus = tempStatus !== null ? tempStatus && true : true
                                            } else {
                                                tempStatus = tempStatus !== null ? tempStatus && false : false
                                            }
                                            // console.log('Surcharge name = ', obj['surcharge_name'])
                                            // console.log('proses condition', objective1, node, objective2.toLowerCase(), tempStatus)
                                            // console.log('END ///')
                                        } 

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
                                            obj['KOLI_ACTUAL_WEIGHT'] = objective2
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
                                                    // console.log('Surcharge name = ', obj['surcharge_name'], objective2, eval(str))
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

                                                // if(operator.includes('<')) {
                                                //     value1 = Number(objective2)
                                                //     value2 = Number(max)
                                                // }

                                                let str = `${value1} ${operator} ${value2}`
                                                tempStatus = tempStatus !== null ? tempStatus && eval(str) : eval(str)
                                                // console.log('Surcharge name = ', obj['surcharge_name'], eval(str))
                                                // console.log('proses condition', objective1, objective2,str,value1,operator,value2, status, tempStatus)
                                                // console.log('END ///')
                                            }
                                        }
                                        
                                    })

                                })
                                if(tempStatus !== null) {
                                    status = tempStatus
                                }
                            }
                    obj['service_relevant'] = status
                    // console.log('=================== Hasil obj>>>', obj)
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

        surchargeCalculation(koli, dataSurcharge = {} , formula = '', chargeble_weight = null, koli_actual_weight = null) {
            let ngubah = {}
            let str = ''
            if(koli.surcharge_id && koli.surcharge_id.length > 0) {
                try {
                        switch(true) {
                            case formula.toLowerCase() == 'chargeble_weight':
                                console.log('formula chargeble_weight', formula.toLowerCase() == 'chargeble_weight')
                                if(chargeble_weight != null) {
                                    str = isNaN(dataSurcharge['surcharge_formula'][formula]) ? 
                                            dataSurcharge['surcharge_formula'][formula].toLowerCase() : 
                                            dataSurcharge['surcharge_formula'][formula]
                                    let evalchargeable_weight = eval(str)
                                    
                                    ngubah['chargeble_weight'] = evalchargeable_weight
                                }
                                break;
                            case formula.toLowerCase().includes('surcharge'):
                                console.log('formula surcharge', formula.toLowerCase().includes('surcharge'))
                                if(chargeble_weight != null) {
                                    let base_tariff = this.tarifTiering(chargeble_weight)
                                    str = dataSurcharge['surcharge_formula'][formula].toLowerCase() 
                                    let evalSurcharge = eval(str)
                                    console.log('str evalSurcharge', str, evalSurcharge, base_tariff, chargeble_weight) 
                                    ngubah['surcharge'] = evalSurcharge
                                }
                                break;
                            case formula.toLowerCase() == 'handling_charge':
                                let handling_charge = Number(dataSurcharge['surcharge_formula'][formula])
                                ngubah['handling_charge'] = handling_charge
                                break;
                            case formula.toLowerCase() == 'adm_karantina':
                                let adm_karantina = Number(dataSurcharge['adm_karantina'][formula])
                                ngubah['adm_karantina'] = adm_karantina
                                break;
                            case formula.toLowerCase() == 'volume_weight':
                                let koli_length = Number(koli.length)
                                let koli_width = Number(koli.width)
                                let koli_height = Number(koli.height)
                                // let oooppi = "(koli_length+5)"
                                let evalactual_weight = eval(dataSurcharge['surcharge_formula'][formula].toLowerCase())

                                let volume_weight = evalactual_weight.toFixed(2)
                                ngubah['volume_weight'] = volume_weight
                                break;
                            case formula.toLowerCase() == 'koli_actual_weight':
                                if(koli_actual_weight != null) {
                                    let actual_weight = eval(dataSurcharge['surcharge_formula'][formula].toLowerCase())
                                    ngubah['koli_actual_weight'] = actual_weight
                                }
                                break;
                            default:
                        }
                } catch (err) {
                    console.log('surchargeCalculation err', err)
                }
            }

            console.log('surchargeCalculation', ngubah)
            return ngubah
        },

        calculation(){
            // rumit cuuk
            let listKoli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item || []
            let diskon = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].amount_discount
            diskon = this.moneyParsing(diskon)
            let surchargeByID = this.listenPackageSurchargeByID
            let tarifData = this.listenPackageService || {}

            let service = this.listenPackageService.data || {}
            
            this.SUM_CHARGEBLE_WEIGHT= 0
            this.SUM_ACTUAL_WEIGHT= 0
            this.SUM_VOLUME_WEIGHT= 0

            let SUM_BIAYA_LAIN = 0
            let SUM_HANDLING_CHARGE = 0
            let SUM_ADM_KARANTINA = 0
            let TOTAL_BIAYA = 0

            let SUM_CHARGEBLE_WEIGHT = 0
            let base_tariff = 0
            
            
            if(listKoli.length > 0) {
                listKoli.map((koli, indexKoli) => {
                    // koli hitung satuan
                    let vw = 0
            
                    if(Object.keys(service).length > 0) {
                        let service_volume_divider = Number(service['service_volume_divider'])
                        vw = (koli['length'] * koli['width'] * koli['height']) / service_volume_divider 
                    }
                         
                    let koli_volume_weight = Number(vw.toFixed(2))
                    
                    let koli_actual_weight = Number(koli['actual_weight'])
                    // let chargeble_weight = Number(Math.max(koli_actual_weight, Number(this.round03(koli_volume_weight))).toFixed(2))

                    let tempbiaya = 0
                    let temp_handling_charge = 0
                    let temp_adm_karantina = 0
                    let temp_chargeable_weight = 0
                    
                    let roundUp = Number(this.round03(koli_volume_weight))
                    let KOLI_CHARGEBLE_WEIGHT = Number(Math.max(koli_actual_weight, roundUp).toFixed(2))
                    
                    if(koli.surcharge_id && koli.surcharge_id.length > 0) {    
                        try{
                            // array koli surcharge (tiap koli bisa punya banyak surcharge)
                            koli.surcharge_id.map(su_id => {
                                let dataSurcharge = surchargeByID[su_id] || {}
                                console.log("dataSurcharge", dataSurcharge)

                                // Object dari surcharge formula (tiap surcharge bisa merubah banyak hal)
                                Object.keys(dataSurcharge['surcharge_formula']).map(formula => {
                                    let perubahan = this.surchargeCalculation(
                                        koli, 
                                        dataSurcharge,
                                        formula,
                                        KOLI_CHARGEBLE_WEIGHT,
                                        koli_actual_weight
                                        )
                                    
                                        console.log('obj perubahan', perubahan)
                                    
                                    // jika ada surcharge formula yg memberi efek pada calculation
                                    if(Object.keys(perubahan).length > 0) { // if perubahan != {} (empty object)
                                        if (perubahan.hasOwnProperty('chargeble_weight')) {
                                            let valCW = perubahan['chargeble_weight']

                                            KOLI_CHARGEBLE_WEIGHT = Number(Math.max(KOLI_CHARGEBLE_WEIGHT, valCW).toFixed(2))
                                        }
                                        if (perubahan.hasOwnProperty('surcharge')) {
                                            tempbiaya = perubahan['surcharge']
                                        }
                                        if (perubahan.hasOwnProperty('handling_charge')) {
                                            temp_handling_charge = perubahan['handling_charge']
                                        }
                                        if (perubahan.hasOwnProperty('adm_karantina')) {
                                            temp_adm_karantina = perubahan['adm_karantina']
                                        }
                                        if (perubahan.hasOwnProperty('volume_weight')) {
                                            koli_volume_weight = perubahan['volume_weight']
                                            koli.volume_weight = perubahan['volume_weight']

                                            let round = Number(this.round03(koli_volume_weight))
                                            KOLI_CHARGEBLE_WEIGHT = Number(Math.max(koli_actual_weight, round).toFixed(2))
                                        }
                                        if (perubahan.hasOwnProperty('koli_actual_weight')) {
                                            // surcharge formula ada yg merubah actual weight, akan issue jika surcharge yg dipilih tersebut dihapus/diganti namun actual weight sudah terlanjur kena efek
                                            // maka perlu penampungan sementara 
                                                
                                            if(this.koliBeforeSurcharge.hasOwnProperty(indexKoli)) {
                                                // console.log('beda surcharge',this.koliBeforeSurcharge[indexKoli].surchargeId,su_id)
                                                koli.actual_weight = this.koliBeforeSurcharge[indexKoli].value
                                                koli_actual_weight = Number(koli['actual_weight'])
                                            } else {
                                                let objData = {}
                                                objData['key'] = 'actual_weight'
                                                objData['value'] = Number(koli['actual_weight'])
                                                objData['surchargeId'] = su_id
                                                this.koliBeforeSurcharge[indexKoli] = objData
                                            }
                                            // console.log('BEFORE SURCHARGE CALCULATED', this.koliBeforeSurcharge, su_id)
                                            
                                                koli_actual_weight = perubahan['koli_actual_weight']
                                                koli.actual_weight = koli_actual_weight

                                                // KOLI_CHARGEBLE_WEIGHT = Number(Math.max(KOLI_CHARGEBLE_WEIGHT, perubahan['koli_actual_weight']).toFixed(2))
                                        }
                                        
                                        
                                    }
                                })
                                
                            })
                            
                        }
                        catch (err) {
                            console.log('implementasi perubahan err', err)
                        }
                    } else {
                        if(this.koliBeforeSurcharge.hasOwnProperty(indexKoli)) {
                            koli.actual_weight = this.koliBeforeSurcharge[indexKoli].value
                            koli_actual_weight = Number(koli['actual_weight'])
                        } 
                    }

                    
                    

                    // koli total calculator
                    this.SUM_VOLUME_WEIGHT = this.SUM_VOLUME_WEIGHT + Number(koli_volume_weight)
                    this.SUM_ACTUAL_WEIGHT = this.SUM_ACTUAL_WEIGHT + koli_actual_weight
                    SUM_CHARGEBLE_WEIGHT = SUM_CHARGEBLE_WEIGHT + Number(this.round03(KOLI_CHARGEBLE_WEIGHT))
                    SUM_BIAYA_LAIN = SUM_BIAYA_LAIN + tempbiaya
                    SUM_HANDLING_CHARGE = SUM_HANDLING_CHARGE + temp_handling_charge

                    
 
                })

                this.SUM_CHARGEBLE_WEIGHT = SUM_CHARGEBLE_WEIGHT

                if(Object.keys(tarifData).length > 0) {
                    // this.BASE_TARIFF = tarifData.tarif * this.SUM_CHARGEBLE_WEIGHT
                    base_tariff = this.tarifTiering(SUM_CHARGEBLE_WEIGHT)
                    // this.BASE_TARIFF = this.diskonCalc(this.BASE_TARIFF,diskon)
                }

                this.BASE_TARIFF = base_tariff

                
                TOTAL_BIAYA = this.BASE_TARIFF + SUM_HANDLING_CHARGE + SUM_BIAYA_LAIN
            }

            let ASURANSI = this.$store.getters.getTransaction.calculator.asuransi.value
            let ADM_ASURANSI = this.$store.getters.getTransaction.calculator.adm_asuransi.value

            TOTAL_BIAYA = TOTAL_BIAYA + ASURANSI + ADM_ASURANSI
            TOTAL_BIAYA = this.diskonCalc(TOTAL_BIAYA,diskon)

            // if(TOTAL_BIAYA > diskon) {
            //     TOTAL_BIAYA = TOTAL_BIAYA - diskon
            // }
            
            if(Object.keys(tarifData).length > 0) {
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
            }
            
        },

        diskonCalc(base_tariff, diskon){
            let val = 0
            if(base_tariff >= diskon) {
                val = base_tariff - diskon
            }
            return val
        },

        tarifTiering(wg){
            let service = this.listenPackageService || {}
            let weight = wg || 0
            let processTariff = 0
            let sumTariffAkumulatif = 0

            let tariffStandar = service['tariffStandar'] || {}
            let tariffAkumulatif = service['tariffAkumulatif'] || {}

            // console.log('tariff tiering nihh >>>', wg, service)

            if(Object.keys(service).length > 0) {
                // console.log('tariff tiering nihh kondisi oke>>>', Object.keys(service).length)
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
            }
            
            return processTariff
            
        },

        round03(numToRound){
            let oo = numToRound | 0
            let ooo = oo + 0.3
            let res = oo
            if(numToRound > ooo) {
                res = res +1
            } else if (numToRound < 1) {
                res = 1
            }
            return res;
        },
        getDefaultState() {
            // console.log('get default', this.$store.state.transaction.calc_component)
            this.defaultCalculator = this.putusin(this.$store.state.transaction.calculator)
            this.defaultDestination = this.putusin(this.$store.state.transaction.destination)
            this.defaultOrigin = this.putusin(this.$store.state.transaction.origin)
            this.defaultPackage = this.putusin(this.$store.state.transaction.package)
            this.defaultCalcComponent = this.putusin(this.$store.state.transaction.calc_component)
            this.defaultTransaction = this.putusin(this.$store.state.transaction.transaction)
        },
        putusin(obj) {
            // remove data binding
            // JSON.parse(JSON.stringify(obj))
            return JSON.stringify(obj)
        },
        refreshStateCustom(key) {
            switch(true) {
                case key.includes("transaction"):
                    this.$store.dispatch("RESET_STATE", {'key': 'transaction','state': this.defaultTransaction})
                    break;
                case key.includes("calculator"):
                    this.$store.dispatch("RESET_STATE", {'key': 'calculator','state': this.defaultCalculator})
                    break;
                case key.includes("destination"):
                    this.$store.dispatch("RESET_STATE", {'key': 'destination','state': this.defaultDestination})
                    break;
                case key.includes("origin"):
                    this.$store.dispatch("RESET_STATE", {'key': 'origin','state': this.defaultOrigin})
                    break;
                case key.includes("package"):
                    this.$store.dispatch("RESET_STATE", {'key': 'package','state': this.defaultPackage})
                    break;
                default:
            }
        },
        refreshTransactionFields() {
            this.$store.dispatch("RESET_STATE", {'key': 'calculator','state': this.defaultCalculator})
            this.$store.dispatch("RESET_STATE", {'key': 'destination','state': this.defaultDestination})
            this.$store.dispatch("RESET_STATE", {'key': 'origin','state': this.defaultOrigin})

            this.$store.dispatch("RESET_STATE", {'key': 'package','state': this.defaultPackage})
            
            let self = this
            setTimeout(function(){ self.$store.dispatch("RESET_STATE", {'key': 'calc_component','state': self.defaultCalcComponent}) }, 200);
        },
        refreshTransactionStore() {

            this.BIAYA_LAIN = 0
            this.HANDLING_CHARGE = 0
            this.SUM_CHARGEBLE_WEIGHT = 0
            this.SUM_ACTUAL_WEIGHT = 0
            this.SUM_VOLUME_WEIGHT = 0
            this.BASE_TARIFF = 0

            this.$store.dispatch("RESET_STATE", {'key': 'transaction','state': this.defaultTransaction})
            this.$store.dispatch(`SET_CONNOTE_INDEX_ACTIVE`, 0)
            this.$store.dispatch("RESET_STATE", {'key': 'calculator','state': this.defaultCalculator})

            this.$store.dispatch("RESET_STATE", {'key': 'destination','state': this.defaultDestination})
            this.$store.dispatch("RESET_STATE", {'key': 'origin','state': this.defaultOrigin})

            this.$store.dispatch("RESET_STATE", {'key': 'package','state': this.defaultPackage})
            
            let self = this
            setTimeout(function(){ self.$store.dispatch("RESET_STATE", {'key': 'calc_component','state': self.defaultCalcComponent}) }, 200);
            
            
            
            // this.$store.dispatch("EMPTY_TRANSACTION_DATA_CONNOTE", true)
        },
        clearTransactionStore() {
            // this.$store.dispatch("CLEAR_TRANSACTION_DATA_CONNOTE", true)
        },
    },
}

export default TransactionMixin