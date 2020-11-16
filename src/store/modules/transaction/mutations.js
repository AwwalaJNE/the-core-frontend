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

    SET_ORIGIN_ORIGIN_ADDRESS_ONCHANGE(state, payload) {
        state.origin.origin_address_onchange.value = payload
    },
    SET_ORIGIN_ORIGIN_ADDRESS_ONCHANGE_ValueData(state, payload) {
        state.origin.origin_address_onchange.valueData = payload
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

    SET_DESTINATION_DESTINATION_ADDRESS_ONCHANGE(state, payload) {
        state.destination.destination_address_onchange.value = payload
    },
    SET_DESTINATION_DESTINATION_ADDRESS_ONCHANGE_ValueData(state, payload) {
        state.destination.destination_address_onchange.valueData = payload
    },

    SET_DESTINATION_DESTINATION_ZIP_CODE(state, payload) {
        state.destination.destination_zip_code.input[0].value = payload.zip_code
        state.destination.destination_zip_code.input[1].value = payload.destination_code
    },
    SET_DESTINATION_DESTINATION_ZIP_CODE_zipCode(state, payload) {
        state.destination.destination_zip_code.zip_code = payload.zip_code
    },
    SET_DESTINATION_DESTINATION_ZIP_CODE_destinationCode(state, payload) {
        state.destination.destination_zip_code.destination_code = payload.zip_code
    },
}
