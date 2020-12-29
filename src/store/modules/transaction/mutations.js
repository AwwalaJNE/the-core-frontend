export default {
    SET_ORIGIN_ORIGIN_NAME(state, payload) {
        state.origin.origin_name.value = payload
    },
    SET_ORIGIN_ORIGIN_NAME_ValueData(state, payload) {
        state.origin.origin_name.valueData = payload
    },

    SET_ORIGIN_ORIGIN_PHONE(state, payload) {
        state.origin.origin_phone.value = payload
    },
    SET_ORIGIN_ORIGIN_PHONE_ValueData(state, payload) {
        state.origin.origin_phone.valueData = payload
    },

    SET_ORIGIN_ORIGIN_ADDRESS(state, payload) {
        state.origin.origin_address.value = payload
    },
    SET_ORIGIN_ORIGIN_ADDRESS_ValueData(state, payload) {
        state.origin.origin_address.valueData = payload
    },

    SET_ORIGIN_ORIGIN_ONCHANGE_ADDRESS(state, payload) {
        state.origin.origin_onchange_address.value = payload
    },
    SET_ORIGIN_ORIGIN_ONCHANGE_ADDRESS_ValueData(state, payload) {
        state.origin.origin_onchange_address.valueData = payload
    },

    SET_ORIGIN_ORIGIN_SUBDISTRICT_ID(state, payload) {
        state.origin.origin_subdistrict_id.value = payload
    },
    SET_ORIGIN_ORIGIN_SUBDISTRICT_ID_ValueData(state, payload) {
        state.origin.origin_subdistrict_id.valueData = payload
    },

    SET_ORIGIN_ORIGIN_ZIP_CODE(state, payload) {
        state.origin.origin_zip_code.value = payload
    },
    SET_ORIGIN_ORIGIN_ZIP_CODE_ValueData(state, payload) {
        state.origin.origin_zip_code.valueData = payload
    },

    // destination
    SET_DESTINATION_DESTINATION_TYPE(state, payload) {
        state.destination.destination_type.value = payload
    },
    SET_DESTINATION_DESTINATION_TYPE_ValueData(state, payload) {
        state.destination.destination_type.valueData = payload
    },

    SET_DESTINATION_DESTINATION_NAME(state, payload) {
        state.destination.destination_name.value = payload
    },
    SET_DESTINATION_DESTINATION_NAME_ValueData(state, payload) {
        state.destination.destination_name.valueData = payload
    },

    SET_DESTINATION_DESTINATION_PHONE(state, payload) {
        state.destination.destination_phone.value = payload
    },
    SET_DESTINATION_DESTINATION_PHONE_ValueData(state, payload) {
        state.destination.destination_phone.valueData = payload
    },

    SET_DESTINATION_DESTINATION_ADDRESS(state, payload) {
        state.destination.destination_address.value = payload
    },
    SET_DESTINATION_DESTINATION_ADDRESS_ValueData(state, payload) {
        state.destination.destination_address.valueData = payload
    },

    SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS(state, payload) {
        state.destination.destination_onchange_address.value = payload
    },
    SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_ValueData(state, payload) {
        state.destination.destination_onchange_address.valueData = payload
    },
    SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_arrData(state, payload) {
        state.destination.destination_onchange_address.arrData = payload
    },

    SET_DESTINATION_DESTINATION_SUBDISTRICT_ID(state, payload) {
        state.destination.destination_subdistrict_id.value = payload
    },
    SET_DESTINATION_DESTINATION_SUBDISTRICT_ID_ValueData(state, payload) {
        state.destination.destination_subdistrict_id.valueData = payload
    },

    SET_DESTINATION_DESTINATION_ZIP_CODE(state, payload) {
        state.destination.destination_zip_code.input[0].value = payload.zip_code
        state.destination.destination_zip_code.input[1].value = payload.destination_code
    },
    SET_DESTINATION_DESTINATION_ZIP_CODE_zipCode(state, payload) {
        state.destination.destination_zip_code.zip_code = payload
    },
    SET_DESTINATION_DESTINATION_ZIP_CODE_destinationCode(state, payload) {
        state.destination.destination_zip_code.destination_code = payload
    },


    //package
    SET_PACKAGE_PACKAGE_DESCRIPTION(state, payload) {
        state.package.package_description.value = payload
    },
    SET_PACKAGE_PACKAGE_DESCRIPTION_ValueData(state, payload) {
        state.package.package_description.valueData = payload
    },

    SET_PACKAGE_PACKAGE_CATEGORY(state, payload) {
        state.package.package_category.value = payload
    },
    SET_PACKAGE_PACKAGE_CATEGORY_ValueData(state, payload) {
        state.package.package_category.valueData = payload
    },
    SET_PACKAGE_PACKAGE_CATEGORY_arrData(state, payload) {
        state.package.package_category.arrData = payload
    },

    SET_PACKAGE_PACKAGE_SERVICE(state, payload) {
        state.package.package_service.value = payload
    },
    SET_PACKAGE_PACKAGE_SERVICE_ValueData(state, payload) {
        state.package.package_service.valueData = payload
    },
    SET_PACKAGE_PACKAGE_SERVICE_arrData(state, payload) {
        state.package.package_service.arrData = payload
    },

    SET_PACKAGE_PACKAGE_SURCHARGE(state, payload) {
        state.package.package_surcharge.value = payload
    },
    SET_PACKAGE_PACKAGE_SURCHARGE_ValueData(state, payload) {
        state.package.package_surcharge.valueData = payload
    },
    SET_PACKAGE_PACKAGE_SURCHARGE_arrData(state, payload) {
        state.package.package_surcharge.arrData = payload
    },

    SET_PACKAGE_PACKAGE_JUMLAH(state, payload) {
        state.package.package_jumlah.value = payload
    },
    SET_PACKAGE_PACKAGE_JUMLAH_ValueData(state, payload) {
        state.package.package_jumlah.valueData = payload
    },

    SET_PACKAGE_PACKAGE_INSURED_GOODS_VALUE(state, payload) {
        state.package.package_insured_goods_value.value = payload
    },
    SET_PACKAGE_PACKAGE_INSURED_GOODS_VALUE_ValueData(state, payload) {
        state.package.package_insured_goods_value.valueData = payload
    },

    SET_PACKAGE_PACKAGE_DISKON(state, payload) {
        state.package.package_diskon.value = payload
    },
    SET_PACKAGE_PACKAGE_DISKON_ValueData(state, payload) {
        state.package.package_diskon.valueData = payload
    },

    SET_PACKAGE_PACKAGE_INSTRUKSI(state, payload) {
        state.package.package_instruksi.value = payload
    },
    SET_PACKAGE_PACKAGE_INSTRUKSI_ValueData(state, payload) {
        state.package.package_instruksi.valueData = payload
    },


    // Switch Calc component
    SET_CALC_COMPONENT_ARRDATA(state, payload) {
        state.calc_component.arrData = payload
    },
    SET_CALC_COMPONENT_SWITCH(state, payload) {
        state.calc_component.switch = payload
    },
    SET_CALC_COMPONENT_PREFIX(state, payload) {
        state.calc_component.prefix = payload
    },


    // calculator component
    SET_CALCULATOR_ACTUAL_WEIGHT(state, payload) {
        state.calculator.actual_weight.value = payload
    },
    SET_CALCULATOR_ACTUAL_WEIGHT_ValueData(state, payload) {
        state.calculator.actual_weight.valueData = payload
    },
        
    SET_CALCULATOR_VOLUME_WEIGHT(state, payload) {
        state.calculator.volume_weight.value = payload
    },
    SET_CALCULATOR_VOLUME_WEIGHT_ValueData(state, payload) {
        state.calculator.volume_weight.valueData = payload
    },
        
    SET_CALCULATOR_CHARGEABLE_WEIGHT(state, payload) {
        state.calculator.chargeable_weight.value = payload
    },
    SET_CALCULATOR_CHARGEABLE_WEIGHT_ValueData(state, payload) {
        state.calculator.chargeable_weight.valueData = payload
    },
        
    SET_CALCULATOR_BIAYA_KIRIM(state, payload) {
        state.calculator.biaya_kirim.value = payload
    },
    SET_CALCULATOR_BIAYA_KIRIM_ValueData(state, payload) {
        state.calculator.biaya_kirim.valueData = payload
    },
        
    SET_CALCULATOR_HANDLING_CHARGE(state, payload) {
        state.calculator.handling_charge.value = payload
    },
    SET_CALCULATOR_HANDLING_CHARGE_ValueData(state, payload) {
        state.calculator.handling_charge.valueData = payload
    },
        
    SET_CALCULATOR_SURCHARGE(state, payload) {
        state.calculator.surcharge.value = payload
    },
    SET_CALCULATOR_SURCHARGE_ValueData(state, payload) {
        state.calculator.surcharge.valueData = payload
    },
        
    SET_CALCULATOR_SURCHARGE_MANUAL(state, payload) {
        state.calculator.surcharge_manual.value = payload
    },
    SET_CALCULATOR_SURCHARGE_MANUAL_ValueData(state, payload) {
        state.calculator.surcharge_manual.valueData = payload
    },
        
    SET_CALCULATOR_AIRLINE_DOCUMENT(state, payload) {
        state.calculator.airline_document.value = payload
    },
    SET_CALCULATOR_AIRLINE_DOCUMENT_ValueData(state, payload) {
        state.calculator.airline_document.valueData = payload
    },
        
    SET_CALCULATOR_SHIPPER_DECLARATION(state, payload) {
        state.calculator.shipper_declaration.value = payload
    },
    SET_CALCULATOR_SHIPPER_DECLARATION_ValueData(state, payload) {
        state.calculator.shipper_declaration.valueData = payload
    },
        
    SET_CALCULATOR_ADM_KARANTINA(state, payload) {
        state.calculator.adm_karantina.value = payload
    },
    SET_CALCULATOR_ADM_KARANTINA_ValueData(state, payload) {
        state.calculator.adm_karantina.valueData = payload
    },
        
    SET_CALCULATOR_PELEPASAN_KARANTINA(state, payload) {
        state.calculator.pelepasan_karantina.value = payload
    },
    SET_CALCULATOR_PELEPASAN_KARANTINA_ValueData(state, payload) {
        state.calculator.pelepasan_karantina.valueData = payload
    },
        
    SET_CALCULATOR_ASURANSI(state, payload) {
        state.calculator.asuransi.value = payload
    },
    SET_CALCULATOR_ASURANSI_ValueData(state, payload) {
        state.calculator.asuransi.valueData = payload
    },
        
    SET_CALCULATOR_ADM_ASURANSI(state, payload) {
        state.calculator.adm_asuransi.value = payload
    },
    SET_CALCULATOR_ADM_ASURANSI_ValueData(state, payload) {
        state.calculator.adm_asuransi.valueData = payload
    },
        
    SET_CALCULATOR_DISKON(state, payload) {
        state.calculator.diskon.value = payload
    },
    SET_CALCULATOR_DISKON_ValueData(state, payload) {
        state.calculator.diskon.valueData = payload
    },
        
    SET_CALCULATOR_TOTAL_BIAYA(state, payload) {
        state.calculator.total_biaya.value = payload
    },
    SET_CALCULATOR_TOTAL_BIAYA_ValueData(state, payload) {
        state.calculator.total_biaya.valueData = payload
    },


    SET_CONNOTE_BPIK(state, payload) {
        let index = state.connote_index_active
        state.transaction.connote[index].connote_bpik = payload
    },
    
    SET_CONNOTE_KOLI_ITEM_EMPTY(state, payload) {
        let arr = [
            {
              koli_id: '',
              height: 0,
              length: 0,
              width: 0,
              volume_weight: 0,
              actual_weight: 1,
              surcharge_id: [],
              description: ' '
            }
          ]
        state.connote_koli_item = arr
    },
    SET_CONNOTE_KOLI_ITEM(state, payload) {
        state.connote_koli_item = payload
    },
    SET_CONNOTE_KOLI_ITEM_index(state, payload) {
        state.connote_koli_item[payload.index][payload.key] = payload.value
    },

    SET_PROSES_CONNOTE_EMPTY(state, payload) {
        let obj = {
            connote_number: '',
            connote_shipper_customer_id: '',
            connote_receiver_customer_id: '',
            is_insured: true,
            is_need_do_return: false,
            connote_koli_item: [],
            connote_bpik:[],
            total_biaya: 0,
            connote_index: ''
          }
        state.proses_connote = obj
    },
    SET_PROSES_CONNOTE_TOTAL_BIAYA(state, payload) {
        state.proses_connote['total_biaya'] = payload
    },
    SET_PROSES_CONNOTE_PROPERTY(state, payload) {
        state.proses_connote[payload.key] = payload.value
    },
    
    MERGE_PROSES_CONNOTE(state, payload) {
        state.proses_connote.connote_koli_item = state.connote_koli_item
    },
    MERGE_PROSES_CONNOTE_TO_TRANSACTION_CONNOTE(state, payload) {
        if(state.transaction.connote.length == 0) {
            state.transaction.connote.push(state.proses_connote)
        } else {
            state.transaction.connote[payload.index] = state.proses_connote
        }
    },

    SET_TRANSACTION_CONNOTE_TOTAL_BIAYA(state, payload) {
        state.transaction.connote[payload.index]['total_biaya'] = payload.value
    },
    SET_TRANSACTION_GRAND_TOTAL(state, payload) {
        state.transaction.grand_total = payload
    },

    

    MERGE_TRANSACTION_CONNOTE(state, payload) {
        state.transaction.connote[payload.index].connote_koli_item = state.connote_koli_item
    },
    PUSH_CONNOTE_TO_TRANSACTION(state, payload) {
        state.transaction.connote.push(proses_connote)
    },


    // new code

    SET_CONNOTE_INDEX_ACTIVE(state, payload) {
        state.connote_index_active = payload
    },

    SET_CONNOTE_DATA(state, payload) {
        state.transaction.connote[state.connote_index_active][payload.key] = payload.value
    },

    SET_CONNOTE_DATA_KOLI(state, payload) {
        state.transaction.connote[state.connote_index_active]['connote_koli_item'] = payload
    },
    
    ADD_MORE_CONNOTE(state, payload) {
        let data = state.connote_template
        state.transaction.connote.push(data)
    },

    FILL_TRANSACTION_DATA(state, payload) {
        state.transaction[payload.key] = payload.value
    },

    SWITCH_CONNOTE_ACTIVE(state, payload) {
        let index = state.connote_index_active
        let data = state.transaction.connote[index] || {}

        if(Object.keys(data).length > 0) {
            // ORIGIN
            Object.keys(state.origin).map(item => {
                if(data.hasOwnProperty(state.origin[item].key)){
                    if(state.origin[item]['typeData'].includes("Number")) {
                        state.origin[item].value = data[state.origin[item].key] || 0
                    } else if (state.origin[item]['typeData'].includes("Array")) {
                        state.origin[item].value = data[state.origin[item].key] || []
                    } else if (state.origin[item]['typeData'].includes("Boolean")) {
                        state.origin[item].value = data[state.origin[item].key] || false
                    } else {
                        state.origin[item].value = data[state.origin[item].key] || ''
                    }
                } else if(item == 'origin_onchange_address'){
                    if(data.hasOwnProperty('connote_shipper_administrative_address')) {
                        state.origin[item].value = data['connote_shipper_administrative_address'] || ''
                    }
                }
            })

            // DESTINATION
            Object.keys(state.destination).map(item => {
                if(data.hasOwnProperty(state.destination[item].key)){
                    if(state.destination[item]['typeData'].includes("Number")) {
                        state.destination[item].value = data[state.destination[item].key] || 0
                    } else if (state.destination[item]['typeData'].includes("Array")) {
                        state.destination[item].value = data[state.destination[item].key] || []
                    } else if (state.destination[item]['typeData'].includes("Boolean")) {
                        state.destination[item].value = data[state.destination[item].key] || false
                    } else {
                        state.destination[item].value = data[state.destination[item].key] || ''
                    }
                } else if(item == 'destination_onchange_address') {
                    //connote_receiver_administrative_address
                    if(data.hasOwnProperty('connote_receiver_administrative_address')) {
                        state.destination[item].value = data['connote_receiver_administrative_address'] || ''
                    }
                } else if(item == 'destination_zip_code') {
                    if(data.hasOwnProperty(state.destination[item]['input'][0].key)) {
                        state.destination[item]['input'][0].value = data[state.destination[item]['input'][0].key] || ''
                    }
                    if(data.hasOwnProperty(state.destination[item]['input'][1].key)) {
                        state.destination[item]['input'][1].value = data[state.destination[item]['input'][1].key] || ''
                    }
                }
            })


            // PACKAGE
            Object.keys(state.package).map(item => {
                if(state.package[item].key.includes("koli_")) {
                    if(state.package[item].key == 'koli_jumlah') {
                        state.package[item].value = data['connote_koli_item'].length
                    } else if(state.package[item].key == 'koli_description') {
                        state.package[item].value = data['connote_koli_item'][0]['description'] || ''
                    } else if(state.package[item].key == 'koli_weight') {
                        state.package[item].value = data['connote_koli_item'][0]['koli_actual_weight'] || 0
                    } else {
                        state.package[item].value = data['connote_koli_item'][0][state.package[item].key] || 0
                    }
                } else if(state.package[item].key !== 'koli_jumlah' && data.hasOwnProperty(state.package[item].key)){
                    if(state.package[item]['typeData'].includes("Number")) {
                        state.package[item].value = data[state.package[item].key] || 0
                    } else if (state.package[item]['typeData'].includes("Array")) {
                        state.package[item].value = data[state.package[item].key] || []
                    } else if (state.package[item]['typeData'].includes("Boolean")) {
                        state.package[item].value = data[state.package[item].key] || false
                    } else {
                        state.package[item].value = data[state.package[item].key].toLowerCase() || ''
                    }
                }

            })
        }

    },

    EMPTY_TRANSACTION_DATA_CONNOTE(state, payload) {
        Object.keys(state.origin).map(item => {
            if(state.origin[item].hasOwnProperty('value')){
                state.origin[item].value = ''
            }
        })

        Object.keys(state.destination).map(item => {
            switch(item) {
                case "destination_type":
                    if(state.destination[item].hasOwnProperty('value')){
                        state.destination[item].value = 'rumah'
                    }
                    break;
                case "destination_zip_code":
                    if(state.destination[item].hasOwnProperty('input')){
                        state.destination[item]['input'][0].value = ''
                        state.destination[item]['input'][1].value = ''
                    }
                    break;
                default:
                    if(state.destination[item].hasOwnProperty('value')){
                        state.destination[item].value = ''
                    }
                    // code block
            }
        })

        Object.keys(state.package).map(item => {
            switch(true) {
                case state.package[item]['typeData'].includes("Number"):
                    if(state.package[item].hasOwnProperty('value')){
                        if(item == 'package_dimensi_weight') {
                            state.package[item].value = 1
                        } else {
                            state.package[item].value = 0
                        }
                    }
                    break;
                case state.package[item]['typeData'].includes("Boolean"):
                    if(state.package[item].hasOwnProperty('value')){
                        state.package[item].value = false
                    }
                    break;
                case state.package[item]['typeData'].includes("Array"):
                    if(state.package[item].hasOwnProperty('value')){
                        state.package[item].value = []
                    }
                    break;
                case state.package[item]['key'] == 'connote_service_code':
                    console.log('connote_service_code =', state.package[item]['key'])
                    if(state.package[item].hasOwnProperty('value')){
                        state.package[item].value = ''
                        state.package[item].value = {}
                        state.package[item].arrData = [
                            {
                              'label': 'null',
                              'value': 'null',
                              'data': {},
                              'tarif': 0
                            }
                          ]
                    }
                    console.log('state.package[item] ====', state.package[item])
                    
                    break;
                default:
                    if(state.package[item].hasOwnProperty('value')){
                        state.package[item].value = ''
                    }
                    // code block
            }
        })

        
    },


}
