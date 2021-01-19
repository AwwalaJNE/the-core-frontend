export default {
    SET_ORIGIN_ORIGIN_NAME({ commit, dispatch  }, payload) {
        commit('SET_ORIGIN_ORIGIN_NAME', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_shipper_name','value': payload})
    },
    SET_ORIGIN_ORIGIN_NAME_ValueData({ commit, dispatch }, payload) {
        commit('SET_ORIGIN_ORIGIN_NAME_ValueData', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_shipper_name','value': payload})
    },

    SET_ORIGIN_ORIGIN_PHONE({ commit, dispatch }, payload) {
        commit('SET_ORIGIN_ORIGIN_PHONE', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_shipper_phone_number','value': payload})
    },
    SET_ORIGIN_ORIGIN_PHONE_ValueData({ commit }, payload) {
        commit('SET_ORIGIN_ORIGIN_PHONE_ValueData', payload)
    },

    SET_ORIGIN_ORIGIN_ADDRESS({ commit, dispatch }, payload) {
        commit('SET_ORIGIN_ORIGIN_ADDRESS', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_shipper_street_address','value': payload})
    },
    SET_ORIGIN_ORIGIN_ADDRESS_ValueData({ commit }, payload) {
        commit('SET_ORIGIN_ORIGIN_ADDRESS_ValueData', payload)
    },

    SET_ORIGIN_ORIGIN_ONCHANGE_ADDRESS({ commit, dispatch }, payload) {
        commit('SET_ORIGIN_ORIGIN_ONCHANGE_ADDRESS', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_shipper_administrative_address','value': payload})
    },
    SET_ORIGIN_ORIGIN_ONCHANGE_ADDRESS_ValueData({ commit }, payload) {
        commit('SET_ORIGIN_ORIGIN_ONCHANGE_ADDRESS_ValueData', payload)
    },

    SET_ORIGIN_ORIGIN_SUBDISTRICT_ID({ commit, dispatch }, payload) {
        commit('SET_ORIGIN_ORIGIN_SUBDISTRICT_ID', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_shipper_geolocation_subdistrict_id','value': payload})
    },
    SET_ORIGIN_ORIGIN_SUBDISTRICT_ID_ValueData({ commit }, payload) {
        commit('SET_ORIGIN_ORIGIN_SUBDISTRICT_ID_ValueData', payload)
    },

    SET_ORIGIN_ORIGIN_ZIP_CODE({ commit, dispatch }, payload) {
        commit('SET_ORIGIN_ORIGIN_ZIP_CODE', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_shipper_zip_code','value': payload})
    },
    SET_ORIGIN_ORIGIN_ZIP_CODE_ValueData({ commit }, payload) {
        commit('SET_ORIGIN_ORIGIN_ZIP_CODE_ValueData', payload)
    },



    SET_DESTINATION_DESTINATION_TYPE({ commit, dispatch }, payload) {
        commit('SET_DESTINATION_DESTINATION_TYPE', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_receiver_address_type','value': payload})
    },
    SET_DESTINATION_DESTINATION_TYPE_ValueData({ commit }, payload) {
        commit('SET_DESTINATION_DESTINATION_TYPE_ValueData', payload)
    },

    SET_DESTINATION_DESTINATION_NAME({ commit, dispatch }, payload) {
        commit('SET_DESTINATION_DESTINATION_NAME', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_receiver_name','value': payload})
    },
    SET_DESTINATION_DESTINATION_NAME_ValueData({ commit }, payload) {
        commit('SET_DESTINATION_DESTINATION_NAME_ValueData', payload)
    },

    SET_DESTINATION_DESTINATION_PHONE({ commit,dispatch }, payload) {
        commit('SET_DESTINATION_DESTINATION_PHONE', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_receiver_phone_number','value': payload})
    },
    SET_DESTINATION_DESTINATION_PHONE_ValueData({ commit }, payload) {
        commit('SET_DESTINATION_DESTINATION_PHONE_ValueData', payload)
    },

    SET_DESTINATION_DESTINATION_ADDRESS({ commit, dispatch }, payload) {
        commit('SET_DESTINATION_DESTINATION_ADDRESS', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_receiver_street_address','value': payload})
    },
    SET_DESTINATION_DESTINATION_ADDRESS_ValueData({ commit }, payload) {
        commit('SET_DESTINATION_DESTINATION_ADDRESS_ValueData', payload)
    },

    SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS({ commit, dispatch }, payload) {
        commit('SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_receiver_administrative_address','value': payload})
    },
    SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_ValueData({ commit }, payload) {
        commit('SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_ValueData', payload)
    },
    SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_arrData({ commit }, payload) {
        commit('SET_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_arrData', payload)
    },

    SET_DESTINATION_DESTINATION_SUBDISTRICT_ID({ commit, dispatch }, payload) {
        commit('SET_DESTINATION_DESTINATION_SUBDISTRICT_ID', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_receiver_geolocation_subdistrict_id','value': payload})
    },
    SET_DESTINATION_DESTINATION_SUBDISTRICT_ID_ValueData({ commit }, payload) {
        commit('SET_DESTINATION_DESTINATION_SUBDISTRICT_ID_ValueData', payload)
    },

    SET_DESTINATION_DESTINATION_ZIP_CODE({ commit, dispatch }, payload) {
        commit('SET_DESTINATION_DESTINATION_ZIP_CODE', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_receiver_zip_code','value': payload.zip_code})
        dispatch('SET_CONNOTE_DATA', {'key':'connote_receiver_tariff_code','value': payload.destination_code})
    },
    SET_DESTINATION_DESTINATION_ZIP_CODE_zipCode({ commit }, payload) {
        commit('SET_DESTINATION_DESTINATION_ZIP_CODE_zipCode', payload)
    },
    SET_DESTINATION_DESTINATION_ZIP_CODE_destinationCode({ commit }, payload) {
        commit('SET_DESTINATION_DESTINATION_ZIP_CODE_destinationCode', payload)
    },

    //package
    SET_PACKAGE_PACKAGE_DESCRIPTION({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_DESCRIPTION', payload)
    },
    SET_PACKAGE_PACKAGE_DESCRIPTION_ValueData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_DESCRIPTION_ValueData', payload)
    },

    SET_PACKAGE_PACKAGE_CATEGORY({ commit,dispatch }, payload) {
        commit('SET_PACKAGE_PACKAGE_CATEGORY', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_category','value': payload})
    },
    SET_PACKAGE_PACKAGE_CATEGORY_ValueData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_CATEGORY_ValueData', payload)
    },
    SET_PACKAGE_PACKAGE_CATEGORY_arrData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_CATEGORY_arrData', payload)
    },

    SET_PACKAGE_PACKAGE_SERVICE({ commit, dispatch }, payload) {
        commit('SET_PACKAGE_PACKAGE_SERVICE', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'connote_service_code','value': payload})
    },
    SET_PACKAGE_PACKAGE_SERVICE_ValueData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_SERVICE_ValueData', payload)
    },
    SET_PACKAGE_PACKAGE_SERVICE_arrData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_SERVICE_arrData', payload)
    },

    SET_PACKAGE_PACKAGE_SURCHARGE({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_SURCHARGE', payload)
    },
    SET_PACKAGE_PACKAGE_SURCHARGE_ValueData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_SURCHARGE_ValueData', payload)
    },
    SET_PACKAGE_PACKAGE_SURCHARGE_arrData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_SURCHARGE_arrData', payload)
    },

    SET_PACKAGE_PACKAGE_JUMLAH({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_JUMLAH', payload)
    },
    SET_PACKAGE_PACKAGE_JUMLAH_ValueData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_JUMLAH_ValueData', payload)
    },

    SET_PACKAGE_PACKAGE_INSURED_GOODS_VALUE({ commit, dispatch }, payload) {
        commit('SET_PACKAGE_PACKAGE_INSURED_GOODS_VALUE', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'insured_goods_value','value': payload})
        if(payload > 0) {
            dispatch('SET_CONNOTE_DATA', {'key':'is_insured','value': true})
        } else {
            dispatch('SET_CONNOTE_DATA', {'key':'is_insured','value': false})
        }
    },
    SET_PACKAGE_PACKAGE_INSURED_GOODS_VALUE_ValueData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_INSURED_GOODS_VALUE_ValueData', payload)
    },

    SET_PACKAGE_PACKAGE_DISKON({ commit, dispatch }, payload) {
        commit('SET_PACKAGE_PACKAGE_DISKON', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'amount_discount','value': payload})
    },
    SET_PACKAGE_PACKAGE_DISKON_ValueData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_DISKON_ValueData', payload)
    },

    SET_PACKAGE_PACKAGE_INSTRUKSI({ commit, dispatch }, payload) {
        commit('SET_PACKAGE_PACKAGE_INSTRUKSI', payload)
        dispatch('SET_CONNOTE_DATA', {'key':'remarks','value': payload})
    },
    SET_PACKAGE_PACKAGE_INSTRUKSI_ValueData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_INSTRUKSI_ValueData', payload)
    },

    SET_PACKAGE_PACKAGE_TIDAK_ASURANSI({ commit, dispatch, state }, payload) {
        commit('SET_PACKAGE_PACKAGE_TIDAK_ASURANSI', payload)

        let insured_goods_value = state.transaction.connote[state.connote_index_active]['insured_goods_value'] || 0
        if(payload == true && insured_goods_value > 0) {
            dispatch('SET_CONNOTE_DATA', {'key':'is_insured','value': false})
        } else {
            dispatch('SET_CONNOTE_DATA', {'key':'is_insured','value': true})
        }
        
    },
    SET_PACKAGE_PACKAGE_TIDAK_ASURANSI_ValueData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_TIDAK_ASURANSI_ValueData', payload)
    },

    SET_PACKAGE_PACKAGE_TIDAK_PACKING_KAYU({ commit, dispatch, state }, payload) {
        commit('SET_PACKAGE_PACKAGE_TIDAK_PACKING_KAYU', payload)

        if(payload == true) {
            dispatch('SET_CONNOTE_DATA', {'key':'is_packing_kayu','value': false})
        } else {
            dispatch('SET_CONNOTE_DATA', {'key':'is_packing_kayu','value': true})
        }
        
    },
    SET_PACKAGE_PACKAGE_TIDAK_PACKING_KAYU_ValueData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_TIDAK_PACKING_KAYU_ValueData', payload)
    },

    SET_PACKAGE_PACKAGE_DO_RETURN({ commit, dispatch, state }, payload) {
        commit('SET_PACKAGE_PACKAGE_DO_RETURN', payload)

        dispatch('SET_CONNOTE_DATA', {'key':'is_need_do_return','value': payload})
        
    },
    SET_PACKAGE_PACKAGE_DO_RETURN_ValueData({ commit }, payload) {
        commit('SET_PACKAGE_PACKAGE_DO_RETURN_ValueData', payload)
    },
    


    // Switch Calc component
    SET_CALC_COMPONENT_ARRDATA({ commit }, payload) {
        commit('SET_CALC_COMPONENT_ARRDATA', payload)
    },
    SET_CALC_COMPONENT_SWITCH({ commit }, payload) {
        commit('SET_CALC_COMPONENT_SWITCH', payload)
    },
    SET_CALC_COMPONENT_PREFIX({ commit }, payload) {
        commit('SET_CALC_COMPONENT_PREFIX', payload)
    },

    // calculator component
    SET_CALCULATOR_ACTUAL_WEIGHT({ commit }, payload) {
        commit('SET_CALCULATOR_ACTUAL_WEIGHT', payload)
    },
    SET_CALCULATOR_ACTUAL_WEIGHT_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_ACTUAL_WEIGHT_ValueData', payload)
    },
        
    SET_CALCULATOR_VOLUME_WEIGHT({ commit }, payload) {
        commit('SET_CALCULATOR_VOLUME_WEIGHT', payload)
    },
    SET_CALCULATOR_VOLUME_WEIGHT_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_VOLUME_WEIGHT_ValueData', payload)
    },
        
    SET_CALCULATOR_CHARGEABLE_WEIGHT({ commit }, payload) {
        commit('SET_CALCULATOR_CHARGEABLE_WEIGHT', payload)
    },
    SET_CALCULATOR_CHARGEABLE_WEIGHT_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_CHARGEABLE_WEIGHT_ValueData', payload)
    },
        
    SET_CALCULATOR_BIAYA_KIRIM({ commit }, payload) {
        commit('SET_CALCULATOR_BIAYA_KIRIM', payload)
    },
    SET_CALCULATOR_BIAYA_KIRIM_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_BIAYA_KIRIM_ValueData', payload)
    },
        
    SET_CALCULATOR_HANDLING_CHARGE({ commit }, payload) {
        commit('SET_CALCULATOR_HANDLING_CHARGE', payload)
    },
    SET_CALCULATOR_HANDLING_CHARGE_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_HANDLING_CHARGE_ValueData', payload)
    },
        
    SET_CALCULATOR_SURCHARGE({ commit }, payload) {
        commit('SET_CALCULATOR_SURCHARGE', payload)
    },
    SET_CALCULATOR_SURCHARGE_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_SURCHARGE_ValueData', payload)
    },
        
    SET_CALCULATOR_SURCHARGE_MANUAL({ commit }, payload) {
        commit('SET_CALCULATOR_SURCHARGE_MANUAL', payload)
    },
    SET_CALCULATOR_SURCHARGE_MANUAL_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_SURCHARGE_MANUAL_ValueData', payload)
    },
        
    SET_CALCULATOR_AIRLINE_DOCUMENT({ commit }, payload) {
        commit('SET_CALCULATOR_AIRLINE_DOCUMENT', payload)
    },
    SET_CALCULATOR_AIRLINE_DOCUMENT_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_AIRLINE_DOCUMENT_ValueData', payload)
    },
        
    SET_CALCULATOR_SHIPPER_DECLARATION({ commit }, payload) {
        commit('SET_CALCULATOR_SHIPPER_DECLARATION', payload)
    },
    SET_CALCULATOR_SHIPPER_DECLARATION_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_SHIPPER_DECLARATION_ValueData', payload)
    },
        
    SET_CALCULATOR_ADM_KARANTINA({ commit }, payload) {
        commit('SET_CALCULATOR_ADM_KARANTINA', payload)
    },
    SET_CALCULATOR_ADM_KARANTINA_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_ADM_KARANTINA_ValueData', payload)
    },
        
    SET_CALCULATOR_PELEPASAN_KARANTINA({ commit }, payload) {
        commit('SET_CALCULATOR_PELEPASAN_KARANTINA', payload)
    },
    SET_CALCULATOR_PELEPASAN_KARANTINA_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_PELEPASAN_KARANTINA_ValueData', payload)
    },
        
    SET_CALCULATOR_ASURANSI({ commit }, payload) {
        commit('SET_CALCULATOR_ASURANSI', payload)
    },
    SET_CALCULATOR_ASURANSI_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_ASURANSI_ValueData', payload)
    },
        
    SET_CALCULATOR_ADM_ASURANSI({ commit }, payload) {
        commit('SET_CALCULATOR_ADM_ASURANSI', payload)
    },
    SET_CALCULATOR_ADM_ASURANSI_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_ADM_ASURANSI_ValueData', payload)
    },
        
    SET_CALCULATOR_DISKON({ commit }, payload) {
        commit('SET_CALCULATOR_DISKON', payload)
    },
    SET_CALCULATOR_DISKON_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_DISKON_ValueData', payload)
    },
        
    SET_CALCULATOR_TOTAL_BIAYA({ commit }, payload) {
        commit('SET_CALCULATOR_TOTAL_BIAYA', payload)
    },
    SET_CALCULATOR_TOTAL_BIAYA_ValueData({ commit }, payload) {
        commit('SET_CALCULATOR_TOTAL_BIAYA_ValueData', payload)
    },

    SET_CONNOTE_BPIK({ commit }, payload) {
        commit('SET_CONNOTE_BPIK', payload)
    },

    // Koli Item
    SET_CONNOTE_KOLI_ITEM_EMPTY({ commit }, payload) {
        commit('SET_CONNOTE_KOLI_ITEM_EMPTY', payload)
    },
    SET_CONNOTE_KOLI_ITEM({ commit }, payload) {
        commit('SET_CONNOTE_KOLI_ITEM', payload)
    },
    SET_CONNOTE_KOLI_ITEM_index({ commit }, payload) {
        commit('SET_CONNOTE_KOLI_ITEM_index', payload)
    },

    SET_PROSES_CONNOTE_EMPTY({ commit }, payload) {
        commit('SET_PROSES_CONNOTE_EMPTY', payload)
    },
    SET_PROSES_CONNOTE_TOTAL_BIAYA({ commit }, payload) {
        commit('SET_PROSES_CONNOTE_TOTAL_BIAYA', payload)
    },
    SET_PROSES_CONNOTE_PROPERTY({ commit }, payload) {
        commit('SET_PROSES_CONNOTE_PROPERTY', payload)
    },

    SET_TRANSACTION_CONNOTE_TOTAL_BIAYA({ commit }, payload) {
        commit('SET_TRANSACTION_CONNOTE_TOTAL_BIAYA', payload)
    },
    SET_TRANSACTION_GRAND_TOTAL({ commit }, payload) {
        commit('SET_TRANSACTION_GRAND_TOTAL', payload)
    },

    

    MERGE_TRANSACTION_CONNOTE({ commit }, payload) {
        commit('MERGE_TRANSACTION_CONNOTE', payload)
    },
    PUSH_CONNOTE_TO_TRANSACTION({ commit }, payload) {
        commit('PUSH_CONNOTE_TO_TRANSACTION', payload)
    },

    // new code

    SET_CONNOTE_INDEX_ACTIVE({ commit }, payload) {
        commit('SET_CONNOTE_INDEX_ACTIVE', payload)
    },
    ADD_MORE_CONNOTE({ commit }, payload) {
        commit('ADD_MORE_CONNOTE', payload)
    },

    SET_CONNOTE_DATA({ commit }, payload) {
        commit('SET_CONNOTE_DATA', payload)
    },
    SET_CONNOTE_DATA_KOLI({ commit }, payload) {
        commit('SET_CONNOTE_DATA_KOLI', payload)
    },

    FILL_TRANSACTION_DATA({ commit }, payload) {
        commit('FILL_TRANSACTION_DATA', payload)
    },

    SWITCH_CONNOTE_ACTIVE({ commit }, payload) {
        commit('SWITCH_CONNOTE_ACTIVE', payload)
    },

    EMPTY_TRANSACTION_DATA_CONNOTE({ commit }, payload) {
        commit('EMPTY_TRANSACTION_DATA_CONNOTE', payload)
    },
    CLEAR_TRANSACTION_DATA_CONNOTE({ commit }, payload) {
        commit('CLEAR_TRANSACTION_DATA_CONNOTE', payload)
    },
}
