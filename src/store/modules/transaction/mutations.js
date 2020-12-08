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


    
    SET_TEMP_KOLI_ITEM(state, payload) {
        state.temp_koli_item = payload
    },
    SET_CONNOTE_KOLI_ITEM(state, payload) {
        state.connote_koli_item = payload
    },
    SET_CONNOTE_KOLI_ITEM_index(state, payload) {
        state.connote_koli_item[payload.index][payload.key] = payload.value
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
        state.transaction.connote.push(state.proses_connote)
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
    }


}
