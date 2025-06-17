export default {
  // Bagging
  SET_BAGGING_destination_selected(state, payload) {
    state.bagging.destination.selected = payload
  },
  SET_BAGGING_destination_dataArray(state, payload) {
    if(payload !== undefined) {
        let data = payload.length > 0 ? payload : [
          {
            "label": null,
            "value": null
          }
        ]
        state.bagging.destination.dataArray = data
    }
  },
  
  SET_BAGGING_service_selected(state, payload) {
    state.bagging.service.selected = payload
  },
  SET_BAGGING_service_dataArray(state, payload) {
    if(payload !== undefined && typeof payload == "array") {
        let data = payload.length > 0 ? payload : [
          {
            "label": null,
            "value": null
          }
        ]
        state.bagging.service.dataArray = data
    }
  },
  
  // ==== user ====
  SET_USER_USER_NAME(state, payload) {
    state.user.user_name.value = payload
  },
  SET_USER_USER_LOGIN(state, payload) {
    state.user.user_login.value = payload
  },
  SET_USER_USER_NIK(state, payload) {
    state.user.user_nik.value = payload
  },
  SET_USER_USER_EMAIL(state, payload) {
    state.user.user_email.value = payload
  },
  SET_USER_PASSWORD(state, payload) {
    state.user.password.value = payload
  },
  SET_USER_USER_ROLE_ID(state, payload) {
    state.user.user_role_id.value = payload
  },
  SET_USER_USER_ADDITIONAL_ROLE_ID(state, payload) {
    state.user.user_additional_role_id.value = payload
  },
  SET_USER_USER_EXPIRY_ADDITIONAL_ROLE(state, payload) {
    state.user.user_expiry_additional_role.value = payload
  },
  SET_USER_USER_NODE_ID(state, payload) {
    state.user.user_node_id.value = payload
  },
  SET_USER_USER_ADDITIONAL_NODE_ID(state, payload) {
    state.user.user_additional_node_id.value = payload
  },
  SET_USER_IS_LOGIN_ENABLE(state, payload) {
    state.user.is_login_enable.value = payload || false
  },
  SET_USER_USER_NAME_ValueData(state, payload) {
    state.user.user_name.valueData = payload
  },
  SET_USER_USER_LOGIN_ValueData(state, payload) {
    state.user.user_login.valueData = payload
  },
  SET_USER_USER_NIK_ValueData(state, payload) {
    state.user.user_nik.valueData = payload
  },
  SET_USER_USER_EMAIL_ValueData(state, payload) {
    state.user.user_email.valueData = payload
  },
  SET_USER_PASSWORD_ValueData(state, payload) {
    state.user.password.valueData = payload
  },
  // type select
  SET_USER_USER_ROLE_ID_ValueData(state, payload) {
    state.user.user_role_id.valueData = payload
  },
  // type select perlu data array
  SET_USER_USER_ROLE_ID_ArrData(state, payload) {
    state.user.user_role_id.hasOwnProperty('arrData') ?
      state.user.user_role_id.arrData = payload :
      state.user.user_role_id.arrData = []
  },
  // type select
  SET_USER_USER_NODE_ID_ValueData(state, payload) {
    state.user.user_node_id.valueData = payload
  },
  // type select perlu data array
  SET_USER_USER_NODE_ID_ArrData(state, payload) {
    state.user.user_node_id.hasOwnProperty('arrData') ?
      state.user.user_node_id.arrData = payload :
      state.user.user_node_id.arrData = []
  },
  // type select
  SET_USER_USER_ADDITIONAL_NODE_ID_ValueData(state, payload) {
    state.user.user_additional_node_id.valueData = payload
  },
  // type select perlu data array
  SET_USER_USER_ADDITIONAL_NODE_ID_ArrData(state, payload) {
    state.user.user_additional_node_id.hasOwnProperty('arrData') ?
      state.user.user_additional_node_id.arrData = payload :
      state.user.user_additional_node_id.arrData = []
  },
  SET_USER_EMPLOYEE_ID(state, payload) {
    state.user.employee_id.value = payload
  },
  // type select
  SET_USER_EMPLOYEE_ID_ValueData(state, payload) {
    state.user.employee_id.valueData = payload
  },
  // type select perlu data array
  SET_USER_EMPLOYEE_ID_ArrData(state, payload) {
    state.user.employee_id.hasOwnProperty('arrData') ?
      state.user.employee_id.arrData = payload :
      state.user.employee_id.arrData = []
  },
  // type select
  SET_USER_USER_ADDITIONAL_ROLE_ID_ValueData(state, payload) {
    state.user.user_additional_role_id.valueData = payload
  },
  // type select perlu data array
  SET_USER_USER_ADDITIONAL_ROLE_ID_ArrData(state, payload) {
    state.user.user_additional_role_id.hasOwnProperty('arrData') ?
      state.user.user_additional_role_id.arrData = payload :
      state.user.user_additional_role_id.arrData = []
  },
  SET_USER_USER_EXPIRY_ADDITIONAL_ROLE_ValueData(state, payload) {
    state.user.user_expiry_additional_role.valueData = payload
  },
  // type select
  SET_USER_USER_NODE_ID_ValueData(state, payload) {
    state.user.user_node_id.valueData = payload
  },
  // type select perlu data array
  SET_USER_USER_NODE_ID_ArrData(state, payload) {
    state.user.user_node_id.hasOwnProperty('arrData') ?
      state.user.user_node_id.arrData = payload :
      state.user.user_node_id.arrData = []
  },
  SET_USER_DYNAMICINPUTCOMPONENT_USER_ADDITIONAL_ROLE(state, payload) {
    let arr = state.user.dynamicinputcomponent_user_additional_role.inputs
    let final = []
    if (payload && payload.length > 0) {
      let obj = {}
      let template = arr

      payload.map(item => {
        let newArr = []
        template.map(tmpl => {
          if (item.hasOwnProperty(tmpl.key.toLowerCase())) {
            let val = item[tmpl.key.toLowerCase()]
            let newObj = {}
            newObj['key'] = tmpl.key
            newObj['typeInput'] = tmpl.typeInput
            newObj['value'] = val

            newArr.push(newObj)
          } else if (item.hasOwnProperty("inputs")) {
            newArr = item["inputs"]
          }
        })

        let newData = { 'inputs': [] }
        newData['inputs'] = newArr
        final.push(newData)
      })
    }
    state.user.dynamicinputcomponent_user_additional_role.hasOwnProperty('arrData') ?
      state.user.dynamicinputcomponent_user_additional_role.arrData = final :
      state.user.dynamicinputcomponent_user_additional_role.arrData = []
  },

  SET_USER_DYNAMICINPUTCOMPONENT_USER_OTHER_APPLICATION_ROLE(state, payload) {
    let arr = state.user.dynamicinputcomponent_user_other_application_role.inputs
    let final = []
    if (payload && payload.length > 0) {
      let obj = {}
      let template = arr

      payload.map(item => {
        let newArr = []
        template.map(tmpl => {
          if (item.hasOwnProperty(tmpl.key.toLowerCase())) {
            let val = item[tmpl.key.toLowerCase()]
            let newObj = {}
            newObj['key'] = tmpl.key
            newObj['typeInput'] = tmpl.typeInput
            newObj['value'] = val

            newArr.push(newObj)
          } else if (item.hasOwnProperty("inputs")) {
            newArr = item["inputs"]
          }
        })

        let newData = { 'inputs': [] }
        newData['inputs'] = newArr
        final.push(newData)
      })
    }
    state.user.dynamicinputcomponent_user_other_application_role.hasOwnProperty('arrData') ?
      state.user.dynamicinputcomponent_user_other_application_role.arrData = final :
      state.user.dynamicinputcomponent_user_other_application_role.arrData = []
  },

  SET_USER_USER_APPLICATION_NAME(state, payload) {
    state.user.user_application_name.value = payload
  },
  SET_USER_USER_APPLICATION_NAME_ValueData(state, payload) {
    state.user.user_application_name.valueData = payload
  },
  SET_USER_USER_APPLICATION_NAME_ArrData(state, payload) {
    state.user.user_application_name.hasOwnProperty('arrData') ?
      state.user.user_application_name.arrData = payload :
      state.user.user_application_name.arrData = []
  },

  SET_USER_USER_APPLICATION_ROLE(state, payload) {
    state.user.user_application_role.value = payload
  },
  SET_USER_USER_APPLICATION_ROLE_ValueData(state, payload) {
    state.user.user_application_role.valueData = payload
  },
  SET_USER_USER_APPLICATION_ROLE_ArrData(state, payload) {
    state.user.user_application_role.hasOwnProperty('arrData') ?
      state.user.user_application_role.arrData = payload :
      state.user.user_application_role.arrData = []
  },
  SET_USER_USER_APPLICATION_ROLE_isSingleInput(state, payload) {
    state.user.user_application_role.isSingleInput = payload
  },


  SET_USER_HELPER_DYNAMIC_USER_APPLICATION_NAME(state, payload) {
    state.user.helper_dynamic_user_application_name.value = payload
  },
  SET_USER_HELPER_DYNAMIC_USER_APPLICATION_NAME_ValueData(state, payload) {
    state.user.helper_dynamic_user_application_name.valueData = payload
  },
  SET_USER_HELPER_DYNAMIC_USER_APPLICATION_NAME_ArrData(state, payload) {
    state.user.helper_dynamic_user_application_name.hasOwnProperty('arrData') ?
      state.user.helper_dynamic_user_application_name.arrData = payload :
      state.user.helper_dynamic_user_application_name.arrData = []
  },

  SET_USER_HELPER_DYNAMIC_USER_APPLICATION_ROLE(state, payload) {
    state.user.helper_dynamic_user_application_role.value = payload
  },
  SET_USER_HELPER_DYNAMIC_USER_APPLICATION_ROLE_ValueData(state, payload) {
    state.user.helper_dynamic_user_application_role.valueData = payload
  },
  SET_USER_HELPER_DYNAMIC_USER_APPLICATION_ROLE_ArrData(state, payload) {
    state.user.helper_dynamic_user_application_role.hasOwnProperty('arrData') ?
      state.user.helper_dynamic_user_application_role.arrData = payload :
      state.user.helper_dynamic_user_application_role.arrData = []
  },
  SET_USER_HELPER_DYNAMIC_USER_APPLICATION_ROLE_isSingleInput(state, payload) {
    state.user.user_application_role.isSingleInput = payload
  },

  // ==== user role ====
  SET_ROLE_USER_ROLE_NAME(state, payload) {
    state.role.user_role_name.value = payload
  },
  SET_ROLE_USER_ROLE_CODE(state, payload) {
    state.role.user_role_code.value = payload
  },
  SET_ROLE_USER_ROLE_NAME_ValueData(state, payload) {
    state.role.user_role_name.valueData = payload
  },
  SET_ROLE_USER_ROLE_CODE_ValueData(state, payload) {
    state.role.user_role_code.valueData = payload
  },

  // ==== geolocation country ====
  SET_GEOLOCATION_COUNTRY_GEOLOCATION_COUNTRY_CODE(state, payload) {
    state.geolocation_country.geolocation_country_code.value = payload
  },
  SET_GEOLOCATION_COUNTRY_GEOLOCATION_COUNTRY_CODE_ValueData(state, payload) {
    state.geolocation_country.geolocation_country_code.valueData = payload
  },

  SET_GEOLOCATION_COUNTRY_GEOLOCATION_COUNTRY_NAME(state, payload) {
    state.geolocation_country.geolocation_country_name.value = payload
  },
  SET_GEOLOCATION_COUNTRY_GEOLOCATION_COUNTRY_NAME_ValueData(state, payload) {
    state.geolocation_country.geolocation_country_name.valueData = payload
  },

  SET_GEOLOCATION_COUNTRY_TARIFF_CURRENCY_CODE(state, payload) {
    state.geolocation_country.tariff_currency_code.value = payload
  },
  SET_GEOLOCATION_COUNTRY_TARIFF_CURRENCY_CODE_ValueData(state, payload) {
    state.geolocation_country.tariff_currency_code.valueData = payload
  },
  SET_GEOLOCATION_COUNTRY_TARIFF_CURRENCY_CODE_ArrData(state, payload) {
    state.geolocation_country.tariff_currency_code.hasOwnProperty('arrData') ?
      state.geolocation_country.tariff_currency_code.arrData = payload :
      state.geolocation_country.tariff_currency_code.arrData = []
  },

  SET_GEOLOCATION_COUNTRY_IS_ACTIVE(state, payload) {
    state.geolocation_country.is_active.value = payload || false
  },
  SET_GEOLOCATION_COUNTRY_IS_ACTIVE_ValueData(state, payload) {
    state.geolocation_country.is_active.valueData = payload || false
  },


  // ==== geolocation province ====
  SET_GEOLOCATION_PROVINCE_GEOLOCATION_COUNTRY_ID(state, payload) {
    state.geolocation_province.geolocation_country_id.value = payload
  },
  SET_GEOLOCATION_PROVINCE_GEOLOCATION_COUNTRY_ID_ValueData(state, payload) {
    state.geolocation_province.geolocation_country_id.valueData = payload
  },
  SET_GEOLOCATION_PROVINCE_GEOLOCATION_COUNTRY_ID_ArrData(state, payload) {
    state.geolocation_province.geolocation_country_id.hasOwnProperty('arrData') ?
      state.geolocation_province.geolocation_country_id.arrData = payload :
      state.geolocation_province.geolocation_country_id.arrData = []
  },

  SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_TIME_ZONE(state, payload) {
    state.geolocation_province.geolocation_province_time_zone.value = payload
  },
  SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_TIME_ZONE_ValueData(state, payload) {
    state.geolocation_province.geolocation_province_time_zone.valueData = payload
  },
  SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_TIME_ZONE_ArrData(state, payload) {
    state.geolocation_province.geolocation_province_time_zone.hasOwnProperty('arrData') ?
      state.geolocation_province.geolocation_province_time_zone.arrData = payload :
      state.geolocation_province.geolocation_province_time_zone.arrData = []
  },

  SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_NAME(state, payload) {
    state.geolocation_province.geolocation_province_name.value = payload
  },
  SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_NAME_ValueData(state, payload) {
    state.geolocation_province.geolocation_province_name.valueData = payload
  },

  SET_GEOLOCATION_PROVINCE_IS_ACTIVE(state, payload) {
    state.geolocation_province.is_active.value = payload || false
  },
  SET_GEOLOCATION_PROVINCE_IS_ACTIVE_ValueData(state, payload) {
    state.geolocation_province.is_active.valueData = payload || false
  },


  // ==== geolocation city ====
  SET_GEOLOCATION_CITY_GEOLOCATION_PROVINCE_ID(state, payload) {
    state.geolocation_city.geolocation_province_id.value = payload
  },
  SET_GEOLOCATION_CITY_GEOLOCATION_PROVINCE_ID_ValueData(state, payload) {
    state.geolocation_city.geolocation_province_id.valueData = payload
  },
  SET_GEOLOCATION_CITY_GEOLOCATION_PROVINCE_ID_ArrData(state, payload) {
    state.geolocation_city.geolocation_province_id.hasOwnProperty('arrData') ?
      state.geolocation_city.geolocation_province_id.arrData = payload :
      state.geolocation_city.geolocation_province_id.arrData = []
  },

  SET_GEOLOCATION_CITY_GEOLOCATION_CITY_NAME(state, payload) {
    state.geolocation_city.geolocation_city_name.value = payload
  },
  SET_GEOLOCATION_CITY_GEOLOCATION_CITY_NAME_ValueData(state, payload) {
    state.geolocation_city.geolocation_city_name.valueData = payload
  },

  SET_GEOLOCATION_CITY_IS_ACTIVE(state, payload) {
    state.geolocation_city.is_active.value = payload || false
  },
  SET_GEOLOCATION_CITY_IS_ACTIVE_ValueData(state, payload) {
    state.geolocation_city.is_active.valueData = payload || false
  },

  // ==== geolocation district ====
  SET_GEOLOCATION_DISTRICT_GEOLOCATION_CITY_ID(state, payload) {
    state.geolocation_district.geolocation_city_id.value = payload
  },
  SET_GEOLOCATION_DISTRICT_GEOLOCATION_CITY_ID_ValueData(state, payload) {
    state.geolocation_district.geolocation_city_id.valueData = payload
  },
  SET_GEOLOCATION_DISTRICT_GEOLOCATION_CITY_ID_ArrData(state, payload) {
    state.geolocation_district.geolocation_city_id.hasOwnProperty('arrData') ?
      state.geolocation_district.geolocation_city_id.arrData = payload :
      state.geolocation_district.geolocation_city_id.arrData = []
  },

  SET_GEOLOCATION_DISTRICT_GEOLOCATION_DISTRICT_NAME(state, payload) {
    state.geolocation_district.geolocation_district_name.value = payload
  },
  SET_GEOLOCATION_DISTRICT_GEOLOCATION_DISTRICT_NAME_ValueData(state, payload) {
    state.geolocation_district.geolocation_district_name.valueData = payload
  },

  SET_GEOLOCATION_DISTRICT_IS_ACTIVE(state, payload) {
    state.geolocation_district.is_active.value = payload || false
  },
  SET_GEOLOCATION_DISTRICT_IS_ACTIVE_ValueData(state, payload) {
    state.geolocation_district.is_active.valueData = payload || false
  },

  // ==== geolocation subdistrict ====
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_DISTRICT_ID(state, payload) {
    state.geolocation_subdistrict.geolocation_district_id.value = payload
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_DISTRICT_ID_ValueData(state, payload) {
    state.geolocation_subdistrict.geolocation_district_id.valueData = payload
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_DISTRICT_ID_ArrData(state, payload) {
    state.geolocation_subdistrict.geolocation_district_id.hasOwnProperty('arrData') ?
      state.geolocation_subdistrict.geolocation_district_id.arrData = payload :
      state.geolocation_subdistrict.geolocation_district_id.arrData = []
  },

  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_NAME(state, payload) {
    state.geolocation_subdistrict.geolocation_subdistrict_name.value = payload
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_NAME_ValueData(state, payload) {
    state.geolocation_subdistrict.geolocation_subdistrict_name.valueData = payload
  },

  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_ZIP_CODE(state, payload) {
    state.geolocation_subdistrict.geolocation_subdistrict_zip_code.value = payload
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_ZIP_CODE_ValueData(state, payload) {
    state.geolocation_subdistrict.geolocation_subdistrict_zip_code.valueData = payload
  },

  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_TARIF_CODE(state, payload) {
    state.geolocation_subdistrict.geolocation_subdistrict_tarif_code.value = payload
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_TARIF_CODE_ValueData(state, payload) {
    state.geolocation_subdistrict.geolocation_subdistrict_tarif_code.valueData = payload
  },

  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_ZONA_WILAYAH(state, payload) {
    state.geolocation_subdistrict.geolocation_subdistrict_zona_wilayah.value = payload
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_ZONA_WILAYAH_ValueData(state, payload) {
    state.geolocation_subdistrict.geolocation_subdistrict_zona_wilayah.valueData = payload
  },

  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_KODE_ROUTING(state, payload) {
    state.geolocation_subdistrict.geolocation_subdistrict_kode_routing.value = payload
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_KODE_ROUTING_ValueData(state, payload) {
    state.geolocation_subdistrict.geolocation_subdistrict_kode_routing.valueData = payload
  },

  SET_GEOLOCATION_SUBDISTRICT_IS_ACTIVE(state, payload) {
    state.geolocation_subdistrict.is_active.value = payload || false
  },
  SET_GEOLOCATION_SUBDISTRICT_IS_ACTIVE_ValueData(state, payload) {
    state.geolocation_subdistrict.is_active.valueData = payload || false
  },

  // ==== Customer ====
  SET_CUSTOMER_N(state, payload) {
    state.customer.n.value = payload
  },
  SET_CUSTOMER_N_ValueData(state, payload) {
    state.customer.n.valueData = payload
  },
  SET_CUSTOMER_N_ArrData(state, payload) {
    state.customer.n.hasOwnProperty('arrData') ?
      state.customer.n.arrData = payload :
      state.customer.n.arrData = []
  },

  SET_CUSTOMER_CUSTOMER_NAME(state, payload) {
    state.customer.customer_name.value = payload
  },
  SET_CUSTOMER_CUSTOMER_NAME_ValueData(state, payload) {
    state.customer.customer_name.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_CODE(state, payload) {
    state.customer.customer_code.value = payload
  },
  SET_CUSTOMER_CUSTOMER_CODE_ValueData(state, payload) {
    state.customer.customer_code.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_DATE_OF_BIRTH(state, payload) {
    state.customer.customer_date_of_birth.value = payload
  },
  SET_CUSTOMER_CUSTOMER_DATE_OF_BIRTH_ValueData(state, payload) {
    state.customer.customer_date_of_birth.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_ADDRESS(state, payload) {
    state.customer.customer_address.value = payload
  },
  SET_CUSTOMER_CUSTOMER_ADDRESS_ValueData(state, payload) {
    state.customer.customer_address.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_SUBDISTRICT_ID(state, payload) {
    state.customer.customer_subdistrict_id.value = payload
  },
  SET_CUSTOMER_CUSTOMER_SUBDISTRICT_ID_ValueData(state, payload) {
    state.customer.customer_subdistrict_id.valueData = payload
  },
  SET_CUSTOMER_CUSTOMER_SUBDISTRICT_ID_ArrData(state, payload) {
    state.customer.customer_subdistrict_id.hasOwnProperty('arrData') ?
      state.customer.customer_subdistrict_id.arrData = payload :
      state.customer.customer_subdistrict_id.arrData = []
  },

  SET_CUSTOMER_CUSTOMER_EMAIL(state, payload) {
    state.customer.customer_email.value = payload
  },
  SET_CUSTOMER_CUSTOMER_EMAIL_ValueData(state, payload) {
    state.customer.customer_email.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_PHONE(state, payload) {
    state.customer.customer_phone.value = payload
  },
  SET_CUSTOMER_CUSTOMER_PHONE_ValueData(state, payload) {
    state.customer.customer_phone.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_TYPE_ID(state, payload) {
    state.customer.customer_type_id.value = payload
  },
  SET_CUSTOMER_CUSTOMER_TYPE_ID_ValueData(state, payload) {
    state.customer.customer_type_id.valueData = payload
  },
  SET_CUSTOMER_CUSTOMER_TYPE_ID_ArrData(state, payload) {
    state.customer.customer_type_id.hasOwnProperty('arrData') ?
      state.customer.customer_type_id.arrData = payload :
      state.customer.customer_type_id.arrData = []
  },

  SET_CUSTOMER_CUSTOMER_FAX(state, payload) {
    state.customer.customer_fax.value = payload
  },
  SET_CUSTOMER_CUSTOMER_FAX_ValueData(state, payload) {
    state.customer.customer_fax.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_IDENTITY_CARD_NUMBER(state, payload) {
    state.customer.customer_identity_card_number.value = payload
  },
  SET_CUSTOMER_CUSTOMER_IDENTITY_CARD_NUMBER_ValueData(state, payload) {
    state.customer.customer_identity_card_number.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_TAX_NUMBER(state, payload) {
    state.customer.customer_tax_number.value = payload
  },
  SET_CUSTOMER_CUSTOMER_TAX_NUMBER_ValueData(state, payload) {
    state.customer.customer_tax_number.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_TAX_NUMBER_ADDRESS(state, payload) {
    state.customer.customer_tax_number_address.value = payload
  },
  SET_CUSTOMER_CUSTOMER_TAX_NUMBER_ADDRESS_ValueData(state, payload) {
    state.customer.customer_tax_number_address.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_COMMODITY(state, payload) {
    state.customer.customer_commodity.value = payload
  },
  SET_CUSTOMER_CUSTOMER_COMMODITY_ValueData(state, payload) {
    state.customer.customer_commodity.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_DEFAULT_NODE_ID(state, payload) {
    state.customer.customer_default_node_id.value = payload
  },
  SET_CUSTOMER_CUSTOMER_DEFAULT_NODE_ID_ValueData(state, payload) {
    state.customer.customer_default_node_id.valueData = payload
  },
  SET_CUSTOMER_CUSTOMER_DEFAULT_NODE_ID_ArrData(state, payload) {
    state.customer.customer_default_node_id.hasOwnProperty('arrData') ?
      state.customer.customer_default_node_id.arrData = payload :
      state.customer.customer_default_node_id.arrData = []
  },

  SET_CUSTOMER_CUSTOMER_LATITUDE(state, payload) {
    state.customer.customer_latitude.value = payload
  },
  SET_CUSTOMER_CUSTOMER_LATITUDE_ValueData(state, payload) {
    state.customer.customer_latitude.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_LONGITUDE(state, payload) {
    state.customer.customer_longitude.value = payload
  },
  SET_CUSTOMER_CUSTOMER_LONGITUDE_ValueData(state, payload) {
    state.customer.customer_longitude.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_ADDRESS_TYPE(state, payload) {
    state.customer.customer_address_type.value = payload
  },
  SET_CUSTOMER_CUSTOMER_ADDRESS_TYPE_ValueData(state, payload) {
    state.customer.customer_address_type.valueData = payload
  },

  SET_CUSTOMER_CUSTOMER_CORPORATE_CREDIT(state, payload) {
    state.customer.customer_corporate_credit.value = payload
  },
  SET_CUSTOMER_CUSTOMER_CORPORATE_CREDIT_ValueData(state, payload) {
    state.customer.customer_corporate_credit.valueData = payload
  },

  //======= START Customer Type =======
  SET_CUSTOMER_TYPE_CUSTOMER_TYPE_NAME(state, payload) {
    state.customer_type.customer_type_name.value = payload
  },
  SET_CUSTOMER_TYPE_CUSTOMER_TYPE_NAME_ValueData(state, payload) {
    state.customer_type.customer_type_name.valueData = payload
  },

  SET_CUSTOMER_TYPE_IS_ACTIVE(state, payload) {
    state.customer_type.is_active.value = payload
  },
  SET_CUSTOMER_TYPE_IS_ACTIVE_ValueData(state, payload) {
    state.customer_type.is_active.valueData = payload
  },

  //======= END Customer Type =======

  // ==== Node ====
  SET_NODE_NODE_ID(state, payload) {
    state.node.node_id.value = payload
  },
  SET_NODE_NODE_ID_visible(state, payload) {
    state.node.node_id.visible = payload
  },
  SET_NODE_NODE_ID_ValueData(state, payload) {
    state.node.node_id.valueData = payload
  },
  SET_NODE_NODE_NAME(state, payload) {
    state.node.node_name.value = payload
  },
  SET_NODE_NODE_NAME_ValueData(state, payload) {
    state.node.node_name.valueData = payload
  },

  //node customer node
  SET_NODE_NODE_CUSTOMER_CODE(state, payload) {
    state.node.node_customer_code.value = payload
  },
  SET_NODE_NODE_CUSTOMER_CODE_ValueData(state, payload) {
    state.node.node_customer_code.valueData = payload
  },
  SET_NODE_NODE_CUSTOMER_CODE_ArrData(state, payload) {
    state.node.node_customer_code.hasOwnProperty('arrData') ?
      state.node.node_customer_code.arrData = payload :
      state.node.node_customer_code.arrData = []
  },

  SET_NODE_REGIONAL_CODE(state, payload) {
    state.node.regional_code.value = payload
  },
  SET_NODE_REGION_CODE_ValueData(state, payload) {
    state.node.regional_code.valueData = payload
  },

  SET_NODE_BRANCH_CODE(state, payload) {
    state.node.branch_code.value = payload
  },
  SET_NODE_BRANCH_CODE_ValueData(state, payload) {
    state.node.branch_code.valueData = payload
  },

  SET_NODE_ORIGIN_CODE(state, payload) {
    state.node.origin_code.value = payload
  },
  SET_NODE_ORIGIN_CODE_ValueData(state, payload) {
    state.node.origin_code.valueData = payload
  },

  SET_NODE_SJ_SAME_PARENT(state, payload) {
    state.node.sj_same_parent.value = payload
  },
  SET_NODE_SJ_SAME_PARENT_ValueData(state, payload) {
    state.node.sj_same_parent.valueData = payload
  },

  SET_NODE_SJ_DIFF_PARENT(state, payload) {
    state.node.sj_diff_parent.value = payload
  },
  SET_NODE_SJ_DIFF_PARENT_ValueData(state, payload) {
    state.node.sj_diff_parent.valueData = payload
  },

  SET_NODE_NODE_TYPE_ID(state, payload) {
    state.node.node_type_id.value = payload
  },
  SET_NODE_NODE_TYPE_ID_ValueData(state, payload) {
    state.node.node_type_id.valueData = payload
  },
  SET_NODE_NODE_TYPE_ID_ArrData(state, payload) {
    state.node.node_type_id.hasOwnProperty('arrData') ?
      state.node.node_type_id.arrData = payload :
      state.node.node_type_id.arrData = []
  },

  SET_NODE_NODE_PHONE(state, payload) {
    state.node.node_phone.value = payload
  },
  SET_NODE_NODE_PHONE_ValueData(state, payload) {
    state.node.node_phone.valueData = payload
  },

  SET_NODE_NODE_NPWP(state, payload) {
    state.node.node_npwp.value = payload
  },
  SET_NODE_NODE_NPWP_ValueData(state, payload) {
    state.node.node_npwp.valueData = payload
  },

  SET_NODE_NODE_CODE(state, payload) {
    state.node.node_code.value = payload
  },
  SET_NODE_NODE_CODE_ValueData(state, payload) {
    state.node.node_code.valueData = payload
  },

  SET_NODE_NODE_TARIFF_CODE(state, payload) {
    state.node.node_tariff_code.value = payload
  },
  SET_NODE_NODE_TARIFF_CODE_ValueData(state, payload) {
    state.node.node_tariff_code.valueData = payload
  },
  // SET_NODE_NODE_TARIFF_CODE_ArrData(state, payload) {
  //   state.node.node_tariff_code.hasOwnProperty('arrData') ?
  //     state.node.node_tariff_code.arrData = payload :
  //     state.node.node_tariff_code.arrData = []
  // },

  SET_NODE_TARIFF_GROUP(state, payload) {
    state.node.tariff_group.value = payload
  },
  SET_NODE_TARIFF_GROUP_ValueData(state, payload) {
    state.node.tariff_group.valueData = payload
  },
  
  SET_NODE_NODE_LAT(state, payload) {
    state.node.node_lat.value = payload
  },
  SET_NODE_NODE_LAT_ValueData(state, payload) {
    state.node.node_lat.valueData = payload
  },

  SET_NODE_NODE_LON(state, payload) {
    state.node.node_lon.value = payload
  },
  SET_NODE_NODE_LON_ValueData(state, payload) {
    state.node.node_lon.valueData = payload
  },

  SET_NODE_DEFAULT_NODE_LINK_ID(state, payload) {
    state.node.default_node_link_id.value = payload
  },
  SET_NODE_DEFAULT_NODE_LINK_ID_ValueData(state, payload) {
    state.node.default_node_link_id.valueData = payload
  },
  SET_NODE_DEFAULT_NODE_LINK_ID_ArrData(state, payload) {
    state.node.default_node_link_id.hasOwnProperty('arrData') ?
      state.node.default_node_link_id.arrData = payload :
      state.node.default_node_link_id.arrData = []
  },

  SET_NODE_DEFAULT_NODE_ALTERNATE_ADDRESS_ID(state, payload) {
    state.node.default_node_alternate_address_id.value = payload
  },
  SET_NODE_DEFAULT_NODE_ALTERNATE_ADDRESS_ID_ValueData(state, payload) {
    state.node.default_node_alternate_address_id.valueData = payload
  },
  SET_NODE_DEFAULT_NODE_ALTERNATE_ADDRESS_ID_ArrData(state, payload) {
    state.node.default_node_alternate_address_id.hasOwnProperty('arrData') ?
      state.node.default_node_alternate_address_id.arrData = payload :
      state.node.default_node_alternate_address_id.arrData = []
  },

  SET_NODE_IP_ADDRESS(state, payload) {
    state.node.ip_address.value = payload
  },
  SET_NODE_IP_ADDRESS_ValueData(state, payload) {
    state.node.ip_address.valueData = payload
  },
  SET_NODE_IP_ADDRESS_ArrData(state, payload) {

    state.node.ip_address.hasOwnProperty('arrData') ?
      state.node.ip_address.arrData = payload :
      state.node.ip_address.arrData = []
  },

  SET_NODE_PRE_ALERT_SM(state, payload) {
    state.node.pre_alert_sm.value = payload
  },
  SET_NODE_PRE_ALERT_SM_ValueData(state, payload) {
    state.node.pre_alert_sm.valueData = payload
  },
  
  SET_NODE_PRE_ALERT_SJ(state, payload) {
    state.node.pre_alert_sj.value = payload
  },
  SET_NODE_PRE_ALERT_SJ_ValueData(state, payload) {
    state.node.pre_alert_sj.valueData = payload
  },

  SET_NODE_PRE_ALERT_BAG(state, payload) {
    state.node.pre_alert_bag.value = payload
  },
  SET_NODE_PRE_ALERT_BAG_ValueData(state, payload) {
    state.node.pre_alert_bag.valueData = payload
  },

  SET_NODE_NODE_ALLOW_SPECIAL_CARGO(state, payload) {
    state.node.node_allow_special_cargo.value = payload
  },
  SET_NODE_NODE_ALLOW_SPECIAL_CARGO_ValueData(state, payload) {
    state.node.node_allow_special_cargo.valueData = payload
  },

  SET_NODE_NODE_ALLOW_CORPORATE_TRANSACTION(state, payload) {
    state.node.node_allow_corporate_transaction.value = payload
  },
  SET_NODE_NODE_ALLOW_CORPORATE_TRANSACTION_ValueData(state, payload) {
    state.node.node_allow_corporate_transaction.valueData = payload
  },

  SET_NODE_NODE_IS_EXTERNAL(state, payload) {
    state.node.node_is_external.value = payload
  },
  SET_NODE_NODE_IS_EXTERNAL_ValueData(state, payload) {
    state.node.node_is_external.valueData = payload
  },

  SET_NODE_IS_CDM(state, payload) {
    state.node.is_cdm.value = payload
  },
  SET_NODE_IS_CDM_ValueData(state, payload) {
    state.node.is_cdm.valueData = payload
  },

  SET_NODE_IS_ACTIVE(state, payload) {
    state.node.is_active.value = payload
  },
  SET_NODE_IS_ACTIVE_ValueData(state, payload) {
    state.node.is_active.valueData = payload
  },

  // node type
  SET_NODE_TYPE_NODE_TYPE_NAME(state, payload) {
    state.node_type.node_type_name.value = payload
  },
  SET_NODE_TYPE_NODE_TYPE_NAME_ValueData(state, payload) {
    state.node_type.node_type_name.valueData = payload
  },
    
  SET_NODE_TYPE_IS_ACTIVE(state, payload) {
    state.node_type.is_active.value = payload
  },
  SET_NODE_TYPE_IS_ACTIVE_ValueData(state, payload) {
    state.node_type.is_active.valueData = payload
  },

  // node commision
  SET_NODE_COMMISSION_NODE_ID(state, payload) {
    state.node_commission.node_id.value = payload
  },
  SET_NODE_COMMISSION_NODE_ID_ValueData(state, payload) {
    state.node_commission.node_id.valueData = payload
  },
  SET_NODE_COMMISSION_NODE_ID_ArrData(state, payload) {
    state.node_commission.node_id.hasOwnProperty('arrData') ?
    state.node_commission.node_id.arrData = payload :
    state.node_commission.node_id.arrData = []
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_SERVICE_CODE(state, payload) {
    state.node_commission.node_commision_service_code.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_SERVICE_CODE_ValueData(state, payload) {
    state.node_commission.node_commision_service_code.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_TYPE(state, payload) {
    state.node_commission.node_commision_type.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_TYPE_ValueData(state, payload) {
    state.node_commission.node_commision_type.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_DAILY(state, payload) {
    state.node_commission.node_commision_daily.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_DAILY_ValueData(state, payload) {
    state.node_commission.node_commision_daily.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_1(state, payload) {
    state.node_commission.node_commision_1.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_1_ValueData(state, payload) {
    state.node_commission.node_commision_1.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_1(state, payload) {
    state.node_commission.node_commision_amount_1.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_1_ValueData(state, payload) {
    state.node_commission.node_commision_amount_1.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_2(state, payload) {
    state.node_commission.node_commision_2.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_2_ValueData(state, payload) {
    state.node_commission.node_commision_2.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_2(state, payload) {
    state.node_commission.node_commision_amount_2.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_2_ValueData(state, payload) {
    state.node_commission.node_commision_amount_2.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_3(state, payload) {
    state.node_commission.node_commision_3.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_3_ValueData(state, payload) {
    state.node_commission.node_commision_3.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_3(state, payload) {
    state.node_commission.node_commision_amount_3.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_3_ValueData(state, payload) {
    state.node_commission.node_commision_amount_3.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_4(state, payload) {
    state.node_commission.node_commision_4.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_4_ValueData(state, payload) {
    state.node_commission.node_commision_4.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_4(state, payload) {
    state.node_commission.node_commision_amount_4.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_4_ValueData(state, payload) {
    state.node_commission.node_commision_amount_4.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_5(state, payload) {
    state.node_commission.node_commision_5.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_5_ValueData(state, payload) {
    state.node_commission.node_commision_5.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_5(state, payload) {
    state.node_commission.node_commision_amount_5.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_5_ValueData(state, payload) {
    state.node_commission.node_commision_amount_5.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_6(state, payload) {
    state.node_commission.node_commision_6.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_6_ValueData(state, payload) {
    state.node_commission.node_commision_6.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_6(state, payload) {
    state.node_commission.node_commision_amount_6.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_6_ValueData(state, payload) {
    state.node_commission.node_commision_amount_6.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_7(state, payload) {
    state.node_commission.node_commision_7.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_7_ValueData(state, payload) {
    state.node_commission.node_commision_7.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_7(state, payload) {
    state.node_commission.node_commision_amount_7.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_7_ValueData(state, payload) {
    state.node_commission.node_commision_amount_7.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_8(state, payload) {
    state.node_commission.node_commision_8.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_8_ValueData(state, payload) {
    state.node_commission.node_commision_8.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_8(state, payload) {
    state.node_commission.node_commision_amount_8.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_8_ValueData(state, payload) {
    state.node_commission.node_commision_amount_8.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_9(state, payload) {
    state.node_commission.node_commision_9.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_9_ValueData(state, payload) {
    state.node_commission.node_commision_9.valueData = payload
  },
    
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_9(state, payload) {
    state.node_commission.node_commision_amount_9.value = payload
  },
  SET_NODE_COMMISSION_NODE_COMMISION_AMOUNT_9_ValueData(state, payload) {
    state.node_commission.node_commision_amount_9.valueData = payload
  },
    

  // node alt address
  SET_NODE_ALTERNATE_ADDRESS_NODE_ID(state, payload) {
    state.node_alternate_address.node_id.value = payload
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ID_ValueData(state, payload) {
    state.node_alternate_address.node_id.valueData = payload
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ID_ArrData(state, payload) {
    state.node_alternate_address.node_id.hasOwnProperty('arrData') ?
      state.node_alternate_address.node_id.arrData = payload :
      state.node_alternate_address.node_id.arrData = []
  },

  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_NAME(state, payload) {
    state.node_alternate_address.node_alternate_address_name.value = payload
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_NAME_ValueData(state, payload) {
    state.node_alternate_address.node_alternate_address_name.valueData = payload
  },

  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_ADDRESS(state, payload) {
    state.node_alternate_address.node_alternate_address_address.value = payload
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_ADDRESS_ValueData(state, payload) {
    state.node_alternate_address.node_alternate_address_address.valueData = payload
  },


  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_SUBDISTRICT_ID(state, payload) {
    state.node_alternate_address.node_alternate_address_subdistrict_id.value = payload
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_SUBDISTRICT_ID_ValueData(state, payload) {
    state.node_alternate_address.node_alternate_address_subdistrict_id.valueData = payload
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_SUBDISTRICT_ID_ArrData(state, payload) {
    state.node_alternate_address.node_alternate_address_subdistrict_id.hasOwnProperty('arrData') ?
      state.node_alternate_address.node_alternate_address_subdistrict_id.arrData = payload :
      state.node_alternate_address.node_alternate_address_subdistrict_id.arrData = []
  },


  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_LATITUDE(state, payload) {
    state.node_alternate_address.node_alternate_address_latitude.value = payload
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_LATITUDE_ValueData(state, payload) {
    state.node_alternate_address.node_alternate_address_latitude.valueData = payload
  },

  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_LONGITUDE(state, payload) {
    state.node_alternate_address.node_alternate_address_longitude.value = payload
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_LONGITUDE_ValueData(state, payload) {
    state.node_alternate_address.node_alternate_address_longitude.valueData = payload
  },


  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_PHONE(state, payload) {
    state.node_alternate_address.node_alternate_address_phone.value = payload
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_PHONE_ValueData(state, payload) {
    state.node_alternate_address.node_alternate_address_phone.valueData = payload
  },

  SET_NODE_ALTERNATE_ADDRESS_IS_ACTIVE(state, payload) {
    state.node_alternate_address.is_active.value = payload
  },
  SET_NODE_ALTERNATE_ADDRESS_IS_ACTIVE_ValueData(state, payload) {
    state.node_alternate_address.is_active.valueData = payload
  },

  //======= Generate node link =======
  SET_NODELINK_NODE_LINK_ORIGIN_ID(state, payload) {
    state.nodeLink.node_link_origin_id.value = payload
  },
  SET_NODELINK_NODE_LINK_ORIGIN_ID_ValueData(state, payload) {
    state.nodeLink.node_link_origin_id.valueData = payload
  },
  SET_NODELINK_NODE_LINK_ORIGIN_ID_ArrData(state, payload) {
    state.nodeLink.node_link_origin_id.hasOwnProperty('arrData') ?
      state.nodeLink.node_link_origin_id.arrData = payload :
      state.nodeLink.node_link_origin_id.arrData = []
  },

  SET_NODELINK_NODE_LINK_DESTINATION_ID(state, payload) {
    state.nodeLink.node_link_destination_id.value = payload
  },
  SET_NODELINK_NODE_LINK_DESTINATION_ID_ValueData(state, payload) {
    state.nodeLink.node_link_destination_id.valueData = payload
  },
  SET_NODELINK_NODE_LINK_DESTINATION_ID_ArrData(state, payload) {
    state.nodeLink.node_link_destination_id.hasOwnProperty('arrData') ?
      state.nodeLink.node_link_destination_id.arrData = payload :
      state.nodeLink.node_link_destination_id.arrData = []
  },

  SET_NODELINK_NODE_LINK_VEHICLE_MODE_ID(state, payload) {
    state.nodeLink.node_link_vehicle_mode_id.value = payload
  },
  SET_NODELINK_NODE_LINK_VEHICLE_MODE_ID_ValueData(state, payload) {
    state.nodeLink.node_link_vehicle_mode_id.valueData = payload
  },
  SET_NODELINK_NODE_LINK_VEHICLE_MODE_ID_ArrData(state, payload) {
    state.nodeLink.node_link_vehicle_mode_id.hasOwnProperty('arrData') ?
      state.nodeLink.node_link_vehicle_mode_id.arrData = payload :
      state.nodeLink.node_link_vehicle_mode_id.arrData = []
  },

  SET_NODELINK_IS_ACTIVE(state, payload) {
    state.nodeLink.is_active.value = payload
  },
  SET_NODELINK_IS_ACTIVE_ValueData(state, payload) {
    state.nodeLink.is_active.valueData = payload
  },

  //======= Generate node DELIVERY AREA =======
  SET_NODE_DELIVERY_AREA_NODE_DELIVERY_ID(state, payload) {
    state.node_delivery_area.node_delivery_id.value = payload
  },
  SET_NODE_DELIVERY_AREA_NODE_DELIVERY_ID_visible(state, payload) {
    state.node_delivery_area.node_delivery_id.visible = payload
  },
  SET_NODE_DELIVERY_AREA_NODE_DELIVERY_ID_ValueData(state, payload) {
    state.node_delivery_area.node_delivery_id.valueData = payload
  },

  SET_NODE_DELIVERY_AREA_NODE_CODE(state, payload) {
    state.node_delivery_area.node_code.value = payload
  },
  SET_NODE_DELIVERY_AREA_NODE_CODE_ValueData(state, payload) {
    state.node_delivery_area.node_code.valueData = payload
  },
  SET_NODE_DELIVERY_AREA_NODE_CODE_ArrData(state, payload) {
    state.node_delivery_area.node_code.hasOwnProperty('arrData') ?
      state.node_delivery_area.node_code.arrData = payload :
      state.node_delivery_area.node_code.arrData = []
  },

  SET_NODE_DELIVERY_AREA_DESTINATION_CODE(state, payload) {
    state.node_delivery_area.destination_code.value = payload
  },
  SET_NODE_DELIVERY_AREA_DESTINATION_CODE_ValueData(state, payload) {
    state.node_delivery_area.destination_code.valueData = payload
  },
  SET_NODE_DELIVERY_AREA_DESTINATION_CODE_ArrData(state, payload) {
    state.node_delivery_area.destination_code.hasOwnProperty('arrData') ?
      state.node_delivery_area.destination_code.arrData = payload :
      state.node_delivery_area.destination_code.arrData = []
  },

  SET_NODE_DELIVERY_AREA_IS_ACTIVE(state, payload) {
    state.node_delivery_area.is_active.value = payload
  },
  SET_NODE_DELIVERY_AREA_IS_ACTIVE_ValueData(state, payload) {
    state.node_delivery_area.is_active.valueData = payload
  },

  //end node link

  // tariff
  SET_TARIFF_TARIFF_GROUP(state, payload) {
    state.tariff.tariff_group.value = payload
  },
  SET_TARIFF_TARIFF_GROUP_ValueData(state, payload) {
    state.tariff.tariff_group.valueData = payload
  },
  // SET_TARIFF_TARIFF_GROUP_visible(state, payload) {
  //   state.tariff.tariff_group.visible = payload
  // },
  // SET_TARIFF_TARIFF_GROUP_ArrData(state, payload) {
  //   state.tariff.tariff_group.hasOwnProperty('arrData') ?
  //     state.tariff.tariff_group.arrData = payload :
  //     state.tariff.tariff_group.arrData = []
  // },
  SET_TARIFF_TARIFF_ORIGIN(state, payload) {
    state.tariff.tariff_origin.value = payload
  },
  SET_TARIFF_TARIFF_ORIGIN_ValueData(state, payload) {
    state.tariff.tariff_origin.valueData = payload
  },

  SET_TARIFF_TARIFF_DESTINATION(state, payload) {
    state.tariff.tariff_destination.value = payload
  },
  SET_TARIFF_TARIFF_DESTINATION_ValueData(state, payload) {
    state.tariff.tariff_destination.valueData = payload
  },

  SET_TARIFF_TARIFF_START_DATE(state, payload) {
    state.tariff.tariff_start_date.value = payload
  },
  SET_TARIFF_TARIFF_START_DATE_ValueData(state, payload) {
    state.tariff.tariff_start_date.valueData = payload
  },

  SET_TARIFF_TARIFF_EXPIRY_DATE(state, payload) {
    state.tariff.tariff_expiry_date.value = payload
  },
  SET_TARIFF_TARIFF_EXPIRY_DATE_ValueData(state, payload) {
    state.tariff.tariff_expiry_date.valueData = payload
  },

  SET_TARIFF_TARIFF_SERVICE_CODE(state, payload) {
    state.tariff.tariff_service_code.value = payload
  },
  SET_TARIFF_TARIFF_SERVICE_CODE_ValueData(state, payload) {
    state.tariff.tariff_service_code.valueData = payload
  },

  SET_TARIFF_TARIFF_CURRENCY(state, payload) {
    state.tariff.tariff_currency.value = payload
  },
  SET_TARIFF_TARIFF_CURRENCY_ValueData(state, payload) {
    state.tariff.tariff_currency.valueData = payload
  },

  SET_TARIFF_TARIFF_VEHICLE_MODE_ID(state, payload) {
    state.tariff.tariff_vehicle_mode_id.value = payload
  },
  SET_TARIFF_TARIFF_VEHICLE_MODE_ID_ValueData(state, payload) {
    state.tariff.tariff_vehicle_mode_id.valueData = payload
  },
  SET_TARIFF_TARIFF_VEHICLE_MODE_ID_ArrData(state, payload) {
    state.tariff.tariff_vehicle_mode_id.hasOwnProperty('arrData') ?
      state.tariff.tariff_vehicle_mode_id.arrData = payload :
      state.tariff.tariff_vehicle_mode_id.arrData = []
  },

  SET_TARIFF_TARIFF_CUSTOMER_CODE(state, payload) {
    state.tariff.tariff_customer_code.value = payload
  },
  SET_TARIFF_TARIFF_CUSTOMER_CODE_ValueData(state, payload) {
    state.tariff.tariff_customer_code.valueData = payload
  },
  SET_TARIFF_TARIFF_CUSTOMER_CODE_ArrData(state, payload) {
    state.tariff.tariff_customer_code.hasOwnProperty('arrData') ?
      state.tariff.tariff_customer_code.arrData = payload :
      state.tariff.tariff_customer_code.arrData = []
  },

  SET_TARIFF_TARIFF_AMOUNT_1(state, payload) {
    state.tariff.tariff_amount_1.value = payload
  },
  SET_TARIFF_TARIFF_AMOUNT_1_ValueData(state, payload) {
    state.tariff.tariff_amount_1.valueData = payload
  },

  SET_TARIFF_TARIFF_WEIGHT_1(state, payload) {
    state.tariff.tariff_weight_1.value = payload
  },
  SET_TARIFF_TARIFF_WEIGHT_1_ValueData(state, payload) {
    state.tariff.tariff_weight_1.valueData = payload
  },

  SET_TARIFF_IS_ACTIVE(state, payload) {
    state.tariff.is_active.value = payload
  },
  SET_TARIFF_IS_ACTIVE_ValueData(state, payload) {
    state.tariff.is_active.valueData = payload
  },

  //Discount Tariff
  SET_TARIFF_DISCOUNT_DISCOUNT_TARIFF_ORIGIN(state, payload) {
    state.tariff_discount.discount_tariff_origin.value = payload
  },
  SET_TARIFF_DISCOUNT_DISCOUNT_TARIFF_ORIGIN_ValueData(state, payload) {
    state.tariff_discount.discount_tariff_origin.valueData = payload
  },

  SET_TARIFF_DISCOUNT_DISCOUNT_TARIFF_DESTINATION(state, payload) {
    state.tariff_discount.discount_tariff_destination.value = payload
  },
  SET_TARIFF_DISCOUNT_DISCOUNT_TARIFF_DESTINATION_ValueData(state, payload) {
    state.tariff_discount.discount_tariff_destination.valueData = payload
  },

  SET_TARIFF_DISCOUNT_DISCOUNT_TARIFF_SERVICE_CODE(state, payload) {
    state.tariff_discount.discount_tariff_service_code.value = payload
  },
  SET_TARIFF_DISCOUNT_DISCOUNT_TARIFF_SERVICE_CODE_ValueData(state, payload) {
    state.tariff_discount.discount_tariff_service_code.valueData = payload
  },

  SET_TARIFF_DISCOUNT_DISCOUNT_TARIFF_PERSENTASE(state, payload) {
    state.tariff_discount.discount_tariff_persentase.value = payload
  },
  SET_TARIFF_DISCOUNT_DISCOUNT_TARIFF_PERSENTASE_ValueData(state, payload) {
    state.tariff_discount.discount_tariff_persentase.valueData = payload
  },

  SET_TARIFF_DISCOUNT_UP_TO_AMOUNT_1(state, payload) {
    state.tariff_discount.up_to_amount_1.value = payload
  },
  SET_TARIFF_DISCOUNT_UP_TO_AMOUNT_1_ValueData(state, payload) {
    state.tariff_discount.up_to_amount_1.valueData = payload
  },

  SET_TARIFF_DISCOUNT_UP_TO_DISCOUNT_1(state, payload) {
    state.tariff_discount.up_to_discount_1.value = payload
  },
  SET_TARIFF_DISCOUNT_UP_TO_DISCOUNT_1_ValueData(state, payload) {
    state.tariff_discount.up_to_discount_1.valueData = payload
  },

  //
  SET_TARIFF_DISCOUNT_UP_TO_AMOUNT_2(state, payload) {
    state.tariff_discount.up_to_amount_2.value = payload
  },
  SET_TARIFF_DISCOUNT_UP_TO_AMOUNT_2_ValueData(state, payload) {
    state.tariff_discount.up_to_amount_2.valueData = payload
  },

  SET_TARIFF_DISCOUNT_UP_TO_DISCOUNT_2(state, payload) {
    state.tariff_discount.up_to_discount_2.value = payload
  },
  SET_TARIFF_DISCOUNT_UP_TO_DISCOUNT_2_ValueData(state, payload) {
    state.tariff_discount.up_to_discount_2.valueData = payload
  },

  //
  SET_TARIFF_DISCOUNT_UP_TO_AMOUNT_3(state, payload) {
    state.tariff_discount.up_to_amount_3.value = payload
  },
  SET_TARIFF_DISCOUNT_UP_TO_AMOUNT_3_ValueData(state, payload) {
    state.tariff_discount.up_to_amount_3.valueData = payload
  },

  SET_TARIFF_DISCOUNT_UP_TO_DISCOUNT_3(state, payload) {
    state.tariff_discount.up_to_discount_3.value = payload
  },
  SET_TARIFF_DISCOUNT_UP_TO_DISCOUNT_3_ValueData(state, payload) {
    state.tariff_discount.up_to_discount_3.valueData = payload
  },


  //
  SET_TARIFF_DISCOUNT_UP_TO_AMOUNT_4(state, payload) {
    state.tariff_discount.up_to_amount_4.value = payload
  },
  SET_TARIFF_DISCOUNT_UP_TO_AMOUNT_4_ValueData(state, payload) {
    state.tariff_discount.up_to_amount_4.valueData = payload
  },

  SET_TARIFF_DISCOUNT_UP_TO_DISCOUNT_4(state, payload) {
    state.tariff_discount.up_to_discount_4.value = payload
  },
  SET_TARIFF_DISCOUNT_UP_TO_DISCOUNT_4_ValueData(state, payload) {
    state.tariff_discount.up_to_discount_4.valueData = payload
  },

  // tariff special
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_NAME(state, payload) {
    state.tariff_special.tariff_special_name.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_NAME_ValueData(state, payload) {
    state.tariff_special.tariff_special_name.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_SERVICE_CODE(state, payload) {
    state.tariff_special.tariff_special_condition_service_code.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_SERVICE_CODE_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_service_code.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_START_DATE(state, payload) {
    state.tariff_special.tariff_special_start_date.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_START_DATE_ValueData(state, payload) {
    state.tariff_special.tariff_special_start_date.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_EXPIRY_DATE(state, payload) {
    state.tariff_special.tariff_special_expiry_date.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_EXPIRY_DATE_ValueData(state, payload) {
    state.tariff_special.tariff_special_expiry_date.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_TYPE(state, payload) {
    state.tariff_special.tariff_special_type.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_TYPE_ValueData(state, payload) {
    state.tariff_special.tariff_special_type.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_AMOUNT(state, payload) {
    state.tariff_special.tariff_special_amount.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_AMOUNT_ValueData(state, payload) {
    state.tariff_special.tariff_special_amount.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_MAX_AMOUNT(state, payload) {
    state.tariff_special.tariff_special_max_amount.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_MAX_AMOUNT_ValueData(state, payload) {
    state.tariff_special.tariff_special_max_amount.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_COUNTRY(state, payload) {
    state.tariff_special.tariff_special_condition_from_country.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_COUNTRY_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_from_country.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_PROVINCE(state, payload) {
    state.tariff_special.tariff_special_condition_from_province.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_PROVINCE_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_from_province.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_CITY(state, payload) {
    state.tariff_special.tariff_special_condition_from_city.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_CITY_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_from_city.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_DISTRICT(state, payload) {
    state.tariff_special.tariff_special_condition_from_district.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_DISTRICT_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_from_district.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_SUBDISTRICT(state, payload) {
    state.tariff_special.tariff_special_condition_from_subdistrict.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_SUBDISTRICT_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_from_subdistrict.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_ZIP_CODE(state, payload) {
    state.tariff_special.tariff_special_condition_from_zip_code.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_ZIP_CODE_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_from_zip_code.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_TARIFF_CODE(state, payload) {
    state.tariff_special.tariff_special_condition_from_tariff_code.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_TARIFF_CODE_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_from_tariff_code.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_COUNTRY(state, payload) {
    state.tariff_special.tariff_special_condition_to_country.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_COUNTRY_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_to_country.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_PROVINCE(state, payload) {
    state.tariff_special.tariff_special_condition_to_province.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_PROVINCE_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_to_province.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_CITY(state, payload) {
    state.tariff_special.tariff_special_condition_to_city.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_CITY_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_to_city.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_DISTRICT(state, payload) {
    state.tariff_special.tariff_special_condition_to_district.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_DISTRICT_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_to_district.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_SUBDISTRICT(state, payload) {
    state.tariff_special.tariff_special_condition_to_subdistrict.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_SUBDISTRICT_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_to_subdistrict.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_ZIP_CODE(state, payload) {
    state.tariff_special.tariff_special_condition_to_zip_code.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_ZIP_CODE_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_to_zip_code.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_TARIFF_CODE(state, payload) {
    state.tariff_special.tariff_special_condition_to_tariff_code.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_TARIFF_CODE_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_to_tariff_code.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_KOLI(state, payload) {
    state.tariff_special.tariff_special_condition_min_koli.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_KOLI_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_min_koli.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_KOLI(state, payload) {
    state.tariff_special.tariff_special_condition_max_koli.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_KOLI_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_max_koli.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_WEIGHT(state, payload) {
    state.tariff_special.tariff_special_condition_min_weight.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_WEIGHT_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_min_weight.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_WEIGHT(state, payload) {
    state.tariff_special.tariff_special_condition_max_weight.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_WEIGHT_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_max_weight.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_VOLUME(state, payload) {
    state.tariff_special.tariff_special_condition_min_volume.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_VOLUME_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_min_volume.valueData = payload
  },

  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_VOLUME(state, payload) {
    state.tariff_special.tariff_special_condition_max_volume.value = payload
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_VOLUME_ValueData(state, payload) {
    state.tariff_special.tariff_special_condition_max_volume.valueData = payload
  },

  SET_TARIFF_SPECIAL_IS_ACTIVE(state, payload) {
    state.tariff_special.is_active.value = payload
  },
  SET_TARIFF_SPECIAL_IS_ACTIVE_ValueData(state, payload) {
    state.tariff_special.is_active.valueData = payload
  },

  // SURCHARGE
  SET_SURCHARGE_SURCHARGE_NAME(state, payload) {
    state.surcharge.surcharge_name.value = payload
  },
  SET_SURCHARGE_SURCHARGE_NAME_ValueData(state, payload) {
    state.surcharge.surcharge_name.valueData = payload
  },

  SET_SURCHARGE_SURCHARGE_TYPE_ID(state, payload) {
    state.surcharge.surcharge_type_id.value = payload
  },
  SET_SURCHARGE_SURCHARGE_TYPE_ID_ValueData(state, payload) {
    state.surcharge.surcharge_type_id.valueData = payload
  },
  SET_SURCHARGE_SURCHARGE_TYPE_ID_ArrData(state, payload) {
    state.surcharge.surcharge_type_id.hasOwnProperty('arrData') ?
      state.surcharge.surcharge_type_id.arrData = payload :
      state.surcharge.surcharge_type_id.arrData = []
  },

  SET_SURCHARGE_SURCHARGE_CONDITION(state, payload) {
    state.surcharge.surcharge_condition.value = payload
  },
  SET_SURCHARGE_SURCHARGE_CONDITION_ValueData(state, payload) {
    state.surcharge.surcharge_condition.valueData = payload
  },

  SET_SURCHARGE_SURCHARGE_FORMULA(state, payload) {
    state.surcharge.surcharge_formula.value = payload
  },
  SET_SURCHARGE_SURCHARGE_FORMULA_ValueData(state, payload) {
    state.surcharge.surcharge_formula.valueData = payload
  },

  SET_SURCHARGE_AUTO_APPLY(state, payload) {
    state.surcharge.auto_apply.value = payload
  },
  SET_SURCHARGE_AUTO_APPLY_ValueData(state, payload) {
    state.surcharge.auto_apply.valueData = payload
  },

  SET_SURCHARGE_IS_ACTIVE(state, payload) {
    state.surcharge.is_active.value = payload
  },
  SET_SURCHARGE_IS_ACTIVE_ValueData(state, payload) {
    state.surcharge.is_active.valueData = payload
  },


  SET_SURCHARGE_TYPE_SURCHARGE_TYPE_NAME(state, payload) {
    state.surcharge_type.surcharge_type_name.value = payload
  },
  SET_SURCHARGE_TYPE_SURCHARGE_TYPE_NAME_ValueData(state, payload) {
    state.surcharge_type.surcharge_type_name.valueData = payload
  },

  SET_SURCHARGE_TYPE_IS_ACTIVE(state, payload) {
    state.surcharge_type.is_active.value = payload
  },
  SET_SURCHARGE_TYPE_IS_ACTIVE_ValueData(state, payload) {
    state.surcharge_type.is_active.valueData = payload
  },

  // vehicle
  SET_VEHICLE_VEHICLE_NAME(state, payload) {
    state.vehicle.vehicle_name.value = payload
  },
  SET_VEHICLE_VEHICLE_NAME_ValueData(state, payload) {
    state.vehicle.vehicle_name.valueData = payload
  },

  SET_VEHICLE_VEHICLE_POLICE_NO(state, payload) {
    state.vehicle.vehicle_police_no.value = payload
  },
  SET_VEHICLE_VEHICLE_POLICE_NO_ValueData(state, payload) {
    state.vehicle.vehicle_police_no.valueData = payload
  },

  SET_VEHICLE_VEHICLE_OWNED_BY(state, payload) {
    state.vehicle.vehicle_owned_by.value = payload
  },
  SET_VEHICLE_VEHICLE_OWNED_BY_ValueData(state, payload) {
    state.vehicle.vehicle_owned_by.valueData = payload
  },

  SET_VEHICLE_VEHICLE_MAX_WEIGHT(state, payload) {
    state.vehicle.vehicle_max_weight.value = payload
  },
  SET_VEHICLE_VEHICLE_MAX_WEIGHT_ValueData(state, payload) {
    state.vehicle.vehicle_max_weight.valueData = payload
  },

  SET_VEHICLE_VEHICLE_MAX_VOLUME(state, payload) {
    state.vehicle.vehicle_max_volume.value = payload
  },
  SET_VEHICLE_VEHICLE_MAX_VOLUME_ValueData(state, payload) {
    state.vehicle.vehicle_max_volume.valueData = payload
  },
  SET_VEHICLE_RUNSHEET_ITEM_LIMIT(state, payload) {
    state.vehicle.runsheet_item_limit.value = payload;
  },
  SET_VEHICLE_RUNSHEET_ITEM_LIMIT_ValueData(state, payload) {
    state.vehicle.runsheet_item_limit.valueData = payload;
  },

  SET_VEHICLE_VEHICLE_TYPE_ID(state, payload) {
    state.vehicle.vehicle_type_id.value = payload
  },
  SET_VEHICLE_VEHICLE_TYPE_ID_ValueData(state, payload) {
    state.vehicle.vehicle_type_id.valueData = payload
  },
  SET_VEHICLE_VEHICLE_TYPE_ID_ArrData(state, payload) {
    state.vehicle.vehicle_type_id.hasOwnProperty('arrData') ?
      state.vehicle.vehicle_type_id.arrData = payload :
      state.vehicle.vehicle_type_id.arrData = []
  },

  SET_VEHICLE_VEHICLE_MODE_ID(state, payload) {
    state.vehicle.vehicle_mode_id.value = payload
  },
  SET_VEHICLE_VEHICLE_MODE_ID_ValueData(state, payload) {
    state.vehicle.vehicle_mode_id.valueData = payload
  },
  SET_VEHICLE_VEHICLE_MODE_ID_ArrData(state, payload) {
    state.vehicle.vehicle_mode_id.hasOwnProperty('arrData') ?
      state.vehicle.vehicle_mode_id.arrData = payload :
      state.vehicle.vehicle_mode_id.arrData = []
  },

  SET_VEHICLE_VEHICLE_NODE_ID(state, payload) {
    state.vehicle.vehicle_node_id.value = payload
  },
  SET_VEHICLE_VEHICLE_NODE_ID_ValueData(state, payload) {
    state.vehicle.vehicle_node_id.valueData = payload
  },
  SET_VEHICLE_VEHICLE_NODE_ID_ArrData(state, payload) {
    state.vehicle.vehicle_node_id.hasOwnProperty('arrData') ?
      state.vehicle.vehicle_node_id.arrData = payload :
      state.vehicle.vehicle_node_id.arrData = []
  },

  SET_VEHICLE_IS_ACTIVE(state, payload) {
    state.vehicle.is_active.value = payload
  },
  SET_VEHICLE_IS_ACTIVE_ValueData(state, payload) {
    state.vehicle.is_active.valueData = payload
  },

  // vehicle mode
  SET_VEHICLE_MODE_VEHICLE_MODE_NAME(state, payload) {
    state.vehicle_mode.vehicle_mode_name.value = payload
  },
  SET_VEHICLE_MODE_VEHICLE_MODE_NAME_ValueData(state, payload) {
    state.vehicle_mode.vehicle_mode_name.valueData = payload
  },

  SET_VEHICLE_MODE_IS_ACTIVE(state, payload) {
    state.vehicle_mode.is_active.value = payload
  },
  SET_VEHICLE_MODE_IS_ACTIVE_ValueData(state, payload) {
    state.vehicle_mode.is_active.valueData = payload
  },

  // vehicle type
  SET_VEHICLE_TYPE_VEHICLE_TYPE_NAME(state, payload) {
    state.vehicle_type.vehicle_type_name.value = payload
  },
  SET_VEHICLE_TYPE_VEHICLE_TYPE_NAME_ValueData(state, payload) {
    state.vehicle_type.vehicle_type_name.valueData = payload
  },

  SET_VEHICLE_TYPE_VEHICLE_MODE_ID(state, payload) {
    state.vehicle_type.vehicle_mode_id.value = payload
  },
  SET_VEHICLE_TYPE_VEHICLE_MODE_ID_ValueData(state, payload) {
    state.vehicle_type.vehicle_mode_id.valueData = payload
  },
  SET_VEHICLE_TYPE_VEHICLE_MODE_ID_ArrData(state, payload) {
    state.vehicle_type.vehicle_mode_id.hasOwnProperty('arrData') ?
      state.vehicle_type.vehicle_mode_id.arrData = payload :
      state.vehicle_type.vehicle_mode_id.arrData = []
  },

  SET_VEHICLE_TYPE_IS_ACTIVE(state, payload) {
    state.vehicle_type.is_active.value = payload
  },
  SET_VEHICLE_TYPE_IS_ACTIVE_ValueData(state, payload) {
    state.vehicle_type.is_active.valueData = payload
  },

  SET_PICKUP_REQUEST_NODE_REQUEST(state, payload) {
    state.pickup_request.node_request.value = payload
  },
  SET_PICKUP_REQUEST_NODE_REQUEST_ValueData(state, payload) {
    state.pickup_request.node_request.valueData = payload
  },
  SET_PICKUP_REQUEST_NODE_REQUEST_ArrData(state, payload) {
    state.pickup_request.node_request.hasOwnProperty('arrData') ?
      state.pickup_request.node_request.arrData = payload :
      state.pickup_request.node_request.arrData = []
  },

  //PICKUP LIST
  SET_PICKUP_LIST_PICKUP_NAME(state, payload) {
    state.pickup_list.pickup_name.value = payload
  },
  SET_PICKUP_LIST_PICKUP_NAME_ValueData(state, payload) {
    state.pickup_list.pickup_name.valueData = payload
  },

  SET_PICKUP_LIST_PIC_NAME(state, payload) {
    state.pickup_list.pic_name.value = payload
  },
  SET_PICKUP_LIST_PIC_NAME_ValueData(state, payload) {
    state.pickup_list.pic_name.valueData = payload
  },
  SET_PICKUP_LIST_PIC_NAME_ArrData(state, payload) {
    state.pickup_list.pic_name.hasOwnProperty('arrData') ?
      state.pickup_list.pic_name.arrData = payload :
      state.pickup_list.pic_name.arrData = []
  },

  SET_PICKUP_LIST_PICKUP_PHONE_NUMBER(state, payload) {
    state.pickup_list.pickup_phone_number.value = payload
  },
  SET_PICKUP_LIST_PICKUP_PHONE_NUMBER_ValueData(state, payload) {
    state.pickup_list.pickup_phone_number.valueData = payload
  },

  SET_PICKUP_LIST_PICKUP_ADDRESS(state, payload) {
    state.pickup_list.pickup_address.value = payload
  },
  SET_PICKUP_LIST_PICKUP_ADDRESS_ValueData(state, payload) {
    state.pickup_list.pickup_address.valueData = payload
  },

  SET_PICKUP_LIST_PICKUP_DATE(state, payload) {
    state.pickup_list.pickup_date.value = payload
  },
  SET_PICKUP_LIST_PICKUP_DATE_ValueData(state, payload) {
    state.pickup_list.pickup_date.valueData = payload
  },

  SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION(state, payload) {
    state.pickup_list.pickup_node_id_destination.value = payload
  },
  SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION_ValueData(state, payload) {
    state.pickup_list.pickup_node_id_destination.valueData = payload
  },
  SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION_ArrData(state, payload) {
    state.pickup_list.pickup_node_id_destination.hasOwnProperty('arrData') ?
      state.pickup_list.pickup_node_id_destination.arrData = payload :
      state.pickup_list.pickup_node_id_destination.arrData = []
  },

  // SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID(state, payload) {
  //   state.pickup_list.pickup_courier_employee_id.value = payload
  // },
  // SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID_ValueData(state, payload) {
  //   state.pickup_list.pickup_courier_employee_id.valueData = payload
  // },
  // SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID_ArrData(state, payload) {
  //   state.pickup_list.pickup_courier_employee_id.hasOwnProperty('arrData') ?
  //     state.pickup_list.pickup_courier_employee_id.arrData = payload :
  //     state.pickup_list.pickup_courier_employee_id.arrData = []
  // },

  SET_PICKUP_LIST_PICKUP_COURIER_USER_ID(state, payload) {
    state.pickup_list.pickup_courier_user_id.value = payload
  },
  SET_PICKUP_LIST_PICKUP_COURIER_USER_ID_ValueData(state, payload) {
    state.pickup_list.pickup_courier_user_id.valueData = payload
  },
  SET_PICKUP_LIST_PICKUP_COURIER_USER_ID_ArrData(state, payload) {
    state.pickup_list.pickup_courier_user_id.hasOwnProperty('arrData') ?
      state.pickup_list.pickup_courier_user_id.arrData = payload :
      state.pickup_list.pickup_courier_user_id.arrData = []
  },

  SET_PICKUP_LIST_PICKUP_REMARKS(state, payload) {
    state.pickup_list.pickup_remarks.value = payload
  },
  SET_PICKUP_LIST_PICKUP_REMARKS_ValueData(state, payload) {
    state.pickup_list.pickup_remarks.valueData = payload
  },

  SET_PICKUP_LIST_VEHICLE_TYPE_ID(state, payload) {
    state.pickup_list.vehicle_type_id.value = payload
  },
  SET_PICKUP_LIST_VEHICLE_TYPE_ID_ValueData(state, payload) {
    state.pickup_list.vehicle_type_id.valueData = payload
  },
  SET_PICKUP_LIST_VEHICLE_TYPE_ID_ArrData(state, payload) {
    state.pickup_list.vehicle_type_id.hasOwnProperty('arrData') ?
      state.pickup_list.vehicle_type_id.arrData = payload :
      state.pickup_list.vehicle_type_id.arrData = []
  },

  SET_PICKUP_LIST_PICKUP_LATITUDE(state, payload) {
    state.pickup_list.pickup_latitude.value = payload
  },
  SET_PICKUP_LIST_PICKUP_LATITUDE_ValueData(state, payload) {
    state.pickup_list.pickup_latitude.valueData = payload
  },

  SET_PICKUP_LIST_PICKUP_LONGITUDE(state, payload) {
    state.pickup_list.pickup_longitude.value = payload
  },
  SET_PICKUP_LIST_PICKUP_LONGITUDE_ValueData(state, payload) {
    state.pickup_list.pickup_longitude.valueData = payload
  },

  SET_PICKUP_LIST_PICKUP_SCHEDULE(state, payload) {
    state.pickup_list.pickup_schedule.value = payload
  },
  SET_PICKUP_LIST_PICKUP_SCHEDULE_ValueData(state, payload) {
    state.pickup_list.pickup_schedule.valueData = payload
  },
  SET_PICKUP_LIST_PICKUP_SCHEDULE_ArrData(state, payload) {
    state.pickup_list.pickup_schedule.hasOwnProperty('arrData') ?
      state.pickup_list.pickup_schedule.arrData = payload :
      state.pickup_list.pickup_schedule.arrData = []
  },
  //END PICKUP LIST

  //START PICKUP LIST CANCEL
  SET_PICKUP_LIST_CANCEL_STATUS(state, payload) {
    state.pickup_list_cancel.status.value = payload
  },
  SET_PICKUP_LIST_CANCEL_STATUS_ValueData(state, payload) {
    state.pickup_list_cancel.status.valueData = payload
  },
  SET_PICKUP_LIST_CANCEL_STATUS_ArrData(state, payload) {
    state.pickup_list_cancel.status.hasOwnProperty('arrData') ?
      state.pickup_list_cancel.status.arrData = payload :
      state.pickup_list_cancel.status.arrData = []
  },
  //END PICKUP LIST CANCEL

  //START PICKUP LIST FAILED
  SET_PICKUP_LIST_FAILED_STATUS(state, payload) {
    state.pickup_list_failed.status.value = payload
  },
  SET_PICKUP_LIST_FAILED_STATUS_ValueData(state, payload) {
    state.pickup_list_failed.status.valueData = payload
  },
  SET_PICKUP_LIST_FAILED_STATUS_ArrData(state, payload) {
    state.pickup_list_failed.status.hasOwnProperty('arrData') ?
      state.pickup_list_failed.status.arrData = payload :
      state.pickup_list_failed.status.arrData = []
  },
  //END PICKUP LIST FAILED

  //START PICKUP REQUEST CANCEL
  SET_PICKUP_REQUEST_CANCEL_STATUS(state, payload) {
    state.pickup_request_cancel.status.value = payload
  },
  SET_PICKUP_REQUEST_CANCEL_STATUS_ValueData(state, payload) {
    state.pickup_request_cancel.status.valueData = payload
  },
  SET_PICKUP_REQUEST_CANCEL_STATUS_ArrData(state, payload) {
    state.pickup_request_cancel.status.hasOwnProperty('arrData') ?
      state.pickup_request_cancel.status.arrData = payload :
      state.pickup_request_cancel.status.arrData = []
  },
  //END PICKUP REQUEST CANCEL

  //pickup schedule start
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NAME(state, payload) {
    state.pickup_schedule.pickup_schedule_name.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NAME_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule_name.valueData = payload
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PIC_NAME(state, payload) {
    state.pickup_schedule.pickup_schedule_pic_name.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PIC_NAME_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule_pic_name.valueData = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PIC_NAME_ArrData(state, payload) {
    state.pickup_schedule.pickup_schedule_pic_name.hasOwnProperty('arrData') ?
      state.pickup_schedule.pickup_schedule_pic_name.arrData = payload :
      state.pickup_schedule.pickup_schedule_pic_name.arrData = []
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PHONE_NUMBER(state, payload) {
    state.pickup_schedule.pickup_schedule_phone_number.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PHONE_NUMBER_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule_phone_number.valueData = payload
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ADDRESS(state, payload) {
    state.pickup_schedule.pickup_schedule_address.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ADDRESS_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule_address.valueData = payload
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_DATE(state, payload) {
    state.pickup_schedule.pickup_schedule_date.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_DATE_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule_date.valueData = payload
  },
  
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_ORIGIN(state, payload) {
    state.pickup_schedule.pickup_schedule_node_id_origin.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_ORIGIN_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule_node_id_origin.valueData = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_ORIGIN_ArrData(state, payload) {
    state.pickup_schedule.pickup_schedule_node_id_origin.hasOwnProperty('arrData') ?
      state.pickup_schedule.pickup_schedule_node_id_origin.arrData = payload :
      state.pickup_schedule.pickup_schedule_node_id_origin.arrData = []
  },
  
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_DESTINATION(state, payload) {
    state.pickup_schedule.pickup_schedule_node_id_destination.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_DESTINATION_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule_node_id_destination.valueData = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_DESTINATION_ArrData(state, payload) {
    state.pickup_schedule.pickup_schedule_node_id_destination.hasOwnProperty('arrData') ?
      state.pickup_schedule.pickup_schedule_node_id_destination.arrData = payload :
      state.pickup_schedule.pickup_schedule_node_id_destination.arrData = []
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_REMARKS(state, payload) {
    state.pickup_schedule.pickup_schedule_remarks.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_REMARKS_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule_remarks.valueData = payload
  },

  SET_PICKUP_SCHEDULE_VEHICLE_TYPE_ID(state, payload) {
    state.pickup_schedule.vehicle_type_id.value = payload
  },
  SET_PICKUP_SCHEDULE_VEHICLE_TYPE_ID_ValueData(state, payload) {
    state.pickup_schedule.vehicle_type_id.valueData = payload
  },
  SET_PICKUP_SCHEDULE_VEHICLE_TYPE_ID_ArrData(state, payload) {
    state.pickup_schedule.vehicle_type_id.hasOwnProperty('arrData') ?
      state.pickup_schedule.vehicle_type_id.arrData = payload :
      state.pickup_schedule.vehicle_type_id.arrData = []
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LATITUDE(state, payload) {
    state.pickup_schedule.pickup_schedule_latitude.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LATITUDE_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule_latitude.valueData = payload
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LONGITUDE(state, payload) {
    state.pickup_schedule.pickup_schedule_longitude.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LONGITUDE_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule_longitude.valueData = payload
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_USER_COURIER_ID(state, payload) {
    state.pickup_schedule.pickup_schedule_user_courier_id.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_USER_COURIER_ID_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule_user_courier_id.valueData = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_USER_COURIER_ID_ArrData(state, payload) {
    state.pickup_schedule.pickup_schedule_user_courier_id.hasOwnProperty('arrData') ?
      state.pickup_schedule.pickup_schedule_user_courier_id.arrData = payload :
      state.pickup_schedule.pickup_schedule_user_courier_id.arrData = []
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE(state, payload) {
    state.pickup_schedule.pickup_schedule.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule.valueData = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ArrData(state, payload) {
    state.pickup_schedule.pickup_schedule.hasOwnProperty('arrData') ?
      state.pickup_schedule.pickup_schedule.arrData = payload :
      state.pickup_schedule.pickup_schedule.arrData = []
  },
  //pickup schedule end

  /* Start Surat Muatan */
  SET_SURAT_MUATAN_MANIFEST_NUMBER(state, payload) {
    state.surat_muatan.manifest_number.value = payload
  },
  SET_SURAT_MUATAN_MANIFEST_NUMBER_isDisabled(state, payload) {
    state.surat_muatan.manifest_number.isDisabled = payload
  },
  SET_SURAT_MUATAN_MANIFEST_NUMBER_ValueData(state, payload) {
    state.surat_muatan.manifest_number.valueData = payload
  },

  SET_SURAT_MUATAN_FLIGHT_NUMBER(state, payload) {
    state.surat_muatan.flight_number.value = payload
  },
  SET_SURAT_MUATAN_FLIGHT_NUMBER_ValueData(state, payload) {
    state.surat_muatan.flight_number.valueData = payload
  },
  SET_SURAT_MUATAN_FLIGHT_NUMBER_visible(state, payload) {
    state.surat_muatan.flight_number.visible = payload
  },

  SET_SURAT_MUATAN_FLIGHT_SCHEDULE(state, payload) {
    state.surat_muatan.flight_schedule.value = payload
  },
  SET_SURAT_MUATAN_FLIGHT_SCHEDULE_ValueData(state, payload) {
    state.surat_muatan.flight_schedule.valueData = payload
  },
  SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible(state, payload) {
    state.surat_muatan.flight_schedule.visible = payload
  },

  SET_SURAT_MUATAN_MAX_WEIGHT(state, payload) {
    state.surat_muatan.max_weight.value = payload
  },
  SET_SURAT_MUATAN_MAX_WEIGHT_ValueData(state, payload) {
    state.surat_muatan.max_weight.valueData = payload
  },

  SET_SURAT_MUATAN_MANIFEST_METHOD_ID(state, payload) {
    state.surat_muatan.manifest_method_id.value = payload
  },
  SET_SURAT_MUATAN_MANIFEST_METHOD_ID_ValueData(state, payload) {
    state.surat_muatan.manifest_method_id.valueData = payload
  },
  SET_SURAT_MUATAN_MANIFEST_METHOD_ID_ArrData(state, payload) {
    state.surat_muatan.manifest_method_id.hasOwnProperty('arrData') ?
      state.surat_muatan.manifest_method_id.arrData = payload :
      state.surat_muatan.manifest_method_id.arrData = []
  },

  SET_SURAT_MUATAN_NODE_ID_ORIGIN(state, payload) {
    state.surat_muatan.node_id_origin.value = payload
  },
  SET_SURAT_MUATAN_NODE_ID_ORIGIN_ValueData(state, payload) {
    state.surat_muatan.node_id_origin.valueData = payload
  },
  SET_SURAT_MUATAN_NODE_ID_ORIGIN_URL(state, payload) {
    state.surat_muatan.node_id_origin.url = payload
  },
  SET_SURAT_MUATAN_NODE_ID_ORIGIN_FLAG(state, payload) {
    state.surat_muatan.node_id_origin.flag = payload
  },
  SET_SURAT_MUATAN_NODE_ID_ORIGIN_ArrData(state, payload) {
    state.surat_muatan.node_id_origin.hasOwnProperty('arrData') ?
      state.surat_muatan.node_id_origin.arrData = payload :
      state.surat_muatan.node_id_origin.arrData = []
  },

  SET_SURAT_MUATAN_NODE_ID_TRANSIT(state, payload) {
    state.surat_muatan.node_id_transit.value = payload
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_ValueData(state, payload) {
    state.surat_muatan.node_id_transit.valueData = payload
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_URL(state, payload) {
    state.surat_muatan.node_id_transit.url = payload
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_FLAG(state, payload) {
    state.surat_muatan.node_id_transit.flag = payload
  },

  SET_SURAT_MUATAN_DYNAMICINPUTCOMPONENT_NODE_ID_TRANSIT(state, payload) {
    let arr = state.surat_muatan.dynamicinputcomponent_node_id_transit.inputs

    let final = []
    if (payload && payload.length > 0) {
      let obj = {}
      let template = arr

      payload.map(item => {
        let newArr = []
        template.map(tmpl => {
          if (item.hasOwnProperty(tmpl.key.toLowerCase())) {
            let val = item[tmpl.key.toLowerCase()]
            let newObj = {}
            newObj['key'] = tmpl.key
            newObj['typeInput'] = tmpl.typeInput
            newObj['value'] = val

            newArr.push(newObj)
          } else if (item.hasOwnProperty("inputs")) {
            newArr = item["inputs"]
          }
        })

        let newData = { 'inputs': [] }
        newData['inputs'] = newArr
        final.push(newData)
      })
    }

    state.surat_muatan.dynamicinputcomponent_node_id_transit.hasOwnProperty('arrData') ?
      state.surat_muatan.dynamicinputcomponent_node_id_transit.arrData = final :
      state.surat_muatan.dynamicinputcomponent_node_id_transit.arrData = []
  },

  SET_SURAT_MUATAN_NODE_ID_TRANSIT_ArrData(state, payload) {
    state.surat_muatan.node_id_transit.hasOwnProperty('arrData') ?
      state.surat_muatan.node_id_transit.arrData = payload :
      state.surat_muatan.node_id_transit.arrData = []
  },

  SET_SURAT_MUATAN_NODE_ID_TRANSIT_2(state, payload) {
    state.surat_muatan.node_id_transit_2.value = payload
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_2_ValueData(state, payload) {
    state.surat_muatan.node_id_transit_2.valueData = payload
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_2_ArrData(state, payload) {
    state.surat_muatan.node_id_transit_2.hasOwnProperty('arrData') ?
      state.surat_muatan.node_id_transit_2.arrData = payload :
      state.surat_muatan.node_id_transit_2.arrData = []
  },

  SET_SURAT_MUATAN_NODE_ID_TRANSIT_3(state, payload) {
    state.surat_muatan.node_id_transit_3.value = payload
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_3_ValueData(state, payload) {
    state.surat_muatan.node_id_transit_3.valueData = payload
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_3_ArrData(state, payload) {
    state.surat_muatan.node_id_transit_3.hasOwnProperty('arrData') ?
      state.surat_muatan.node_id_transit_3.arrData = payload :
      state.surat_muatan.node_id_transit_3.arrData = []
  },

  SET_SURAT_MUATAN_NODE_ID_DESTINATION(state, payload) {
    state.surat_muatan.node_id_destination.value = payload
  },
  SET_SURAT_MUATAN_NODE_ID_DESTINATION_ValueData(state, payload) {
    state.surat_muatan.node_id_destination.valueData = payload
  },
  SET_SURAT_MUATAN_NODE_ID_DESTINATION_ArrData(state, payload) {
    state.surat_muatan.node_id_destination.hasOwnProperty('arrData') ?
      state.surat_muatan.node_id_destination.arrData = payload :
      state.surat_muatan.node_id_destination.arrData = []
  },
  SET_SURAT_MUATAN_NODE_ID_DESTINATION_visible(state, payload) {
    state.surat_muatan.node_id_destination.visible = payload
  },

  SET_SURAT_MUATAN_VEHICLE_TYPE_ID(state, payload) {
    state.surat_muatan.vehicle_type_id.value = payload
  },
  SET_SURAT_MUATAN_VEHICLE_TYPE_ID_ValueData(state, payload) {
    state.surat_muatan.vehicle_type_id.valueData = payload
  },
  SET_SURAT_MUATAN_VEHICLE_TYPE_ID_ArrData(state, payload) {
    state.surat_muatan.vehicle_type_id.hasOwnProperty('arrData') ?
      state.surat_muatan.vehicle_type_id.arrData = payload :
      state.surat_muatan.vehicle_type_id.arrData = []
  },

  // SET_SURAT_MUATAN_MANIFEST_TYPE_ID(state, payload) {
  //   state.surat_muatan.manifest_type_id.value = payload
  // },
  // SET_SURAT_MUATAN_MANIFEST_TYPE_ID_visible(state, payload) {
  //   state.surat_muatan.manifest_type_id.visible = payload
  // },
  // SET_SURAT_MUATAN_MANIFEST_TYPE_ID_ValueData(state, payload) {
  //   state.surat_muatan.manifest_type_id.valueData = payload
  // },
  // SET_SURAT_MUATAN_MANIFEST_TYPE_ID_ArrData(state, payload) {
  //   state.surat_muatan.manifest_type_id.hasOwnProperty('arrData') ?
  //     state.surat_muatan.manifest_type_id.arrData = payload :
  //     state.surat_muatan.manifest_type_id.arrData = []
  // },

  SET_SURAT_MUATAN_VEHICLE_ID(state, payload) {
    state.surat_muatan.vehicle_id.value = payload
  },
  SET_SURAT_MUATAN_VEHICLE_ID_ValueData(state, payload) {
    state.surat_muatan.vehicle_id.valueData = payload
  },
  SET_SURAT_MUATAN_VEHICLE_ID_ArrData(state, payload) {
    state.surat_muatan.vehicle_id.hasOwnProperty('arrData') ?
      state.surat_muatan.vehicle_id.arrData = payload :
      state.surat_muatan.vehicle_id.arrData = []
  },

  SET_SURAT_MUATAN_PIC_EMPLOYEE_ID(state, payload) {
    state.surat_muatan.pic_employee_id.value = payload
  },
  SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible(state, payload) {
    state.surat_muatan.pic_employee_id.visible = payload
  },
  SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ValueData(state, payload) {
    state.surat_muatan.pic_employee_id.valueData = payload
  },
  SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData(state, payload) {
    state.surat_muatan.pic_employee_id.hasOwnProperty('arrData') ?
      state.surat_muatan.pic_employee_id.arrData = payload :
      state.surat_muatan.pic_employee_id.arrData = []
  },

  SET_SURAT_MUATAN_ETD(state, payload) {
    state.surat_muatan.etd.value = payload
  },
  SET_SURAT_MUATAN_ETD_ValueData(state, payload) {
    state.surat_muatan.etd.valueData = payload
  },

  SET_SURAT_MUATAN_ETA(state, payload) {
    state.surat_muatan.eta.value = payload
  },
  SET_SURAT_MUATAN_ETA_ValueData(state, payload) {
    state.surat_muatan.eta.valueData = payload
  },

  SET_SURAT_MUATAN_AUTO_DEPART(state, payload) {
    state.surat_muatan.auto_depart.value = payload
  },
  SET_SURAT_MUATAN_AUTO_DEPART_ValueData(state, payload) {
    state.surat_muatan.auto_depart.valueData = payload
  },
  SET_SURAT_MUATAN_AUTO_DEPART_ArrData(state, payload) {
    state.surat_muatan.auto_depart.hasOwnProperty('arrData') ?
    state.surat_muatan.auto_depart.arrData = payload :
    state.surat_muatan.auto_depart.arrData = []
  },


  /* End Surat Muatan */

  /* SURAT JALAN */
  SET_SURAT_JALAN_DESTINATION_ID(state, payload) {
    state.surat_jalan.destination_id.value = payload
  },
  SET_SURAT_JALAN_DESTINATION_ID_ValueData(state, payload) {
    state.surat_jalan.destination_id.valueData = payload
  },
  SET_SURAT_JALAN_DESTINATION_ID_ArrData(state, payload) {
    state.surat_jalan.destination_id.hasOwnProperty('arrData') ?
      state.surat_jalan.destination_id.arrData = payload :
      state.surat_jalan.destination_id.arrData = []
  },

  SET_SURAT_JALAN_MODA_ANGKUTAN_ID(state, payload) {
    state.surat_jalan.moda_angkutan_id.value = payload
  },
  SET_SURAT_JALAN_MODA_ANGKUTAN_ID_ValueData(state, payload) {
    state.surat_jalan.moda_angkutan_id.valueData = payload
  },
  SET_SURAT_JALAN_MODA_ANGKUTAN_ID_ArrData(state, payload) {
    state.surat_jalan.moda_angkutan_id.hasOwnProperty('arrData') ?
      state.surat_jalan.moda_angkutan_id.arrData = payload :
      state.surat_jalan.moda_angkutan_id.arrData = []
  },

  SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID(state, payload) {
    state.surat_jalan.no_moda_angkutan_id.value = payload
  },
  SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID_ValueData(state, payload) {
    state.surat_jalan.no_moda_angkutan_id.valueData = payload
  },
  SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID_ArrData(state, payload) {
    state.surat_jalan.no_moda_angkutan_id.hasOwnProperty('arrData') ?
      state.surat_jalan.no_moda_angkutan_id.arrData = payload :
      state.surat_jalan.no_moda_angkutan_id.arrData = []
  },

  SET_SURAT_JALAN_ETD(state, payload) {
    state.surat_jalan.etd.value = payload
  },
  SET_SURAT_JALAN_ETD_ValueData(state, payload) {
    state.surat_jalan.etd.valueData = payload
  },

  SET_SURAT_JALAN_ETA(state, payload) {
    state.surat_jalan.eta.value = payload
  },
  SET_SURAT_JALAN_ETA_ValueData(state, payload) {
    state.surat_jalan.eta.valueData = payload
  },

  SET_SURAT_JALAN_DRIVER_ID(state, payload) {
    state.surat_jalan.driver_id.value = payload
  },
  SET_SURAT_JALAN_DRIVER_ID_ValueData(state, payload) {
    state.surat_jalan.driver_id.valueData = payload
  },
  SET_SURAT_JALAN_DRIVER_ID_ArrData(state, payload) {
    state.surat_jalan.driver_id.hasOwnProperty('arrData') ?
      state.surat_jalan.driver_id.arrData = payload :
      state.surat_jalan.driver_id.arrData = []
  },
  SET_SURAT_JALAN_MANIFEST_LOV(state, payload) {
    state.surat_jalan.manifest_lov.value = payload
  },
  SET_SURAT_JALAN_MANIFEST_LOV_ValueData(state, payload) {
    state.surat_jalan.manifest_lov.valueData = payload
  },
  SET_SURAT_JALAN_MANIFEST_LOV_visible(state, payload) {
    state.surat_jalan.manifest_lov.visible = payload
  },
  SET_SURAT_JALAN_MANIFEST_LOV_ArrData(state, payload) {
    state.surat_jalan.manifest_lov.hasOwnProperty('arrData') ?
      state.surat_jalan.manifest_lov.arrData = payload
      : state.surat_jalan.manifest_lov.arrData = []
  },

  /* SURAT JALAN END */

  /* IRREGULARITIES RETURN */
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_TYPE(state, payload) {
    state.irreguralities_return_destination.destination_type.value = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_TYPE_isDisabled(state, payload) {
    state.irreguralities_return_destination.destination_type.isDisabled = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_TYPE_ValueData(state, payload) {
    state.irreguralities_return_destination.destination_type.valueData = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_TYPE_ArrData(state, payload) {
    state.irreguralities_return_destination.destination_type.hasOwnProperty('arrData') ?
      state.irreguralities_return_destination.destination_type.arrData = payload :
      state.irreguralities_return_destination.destination_type.arrData = []
  },

  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_NAME(state, payload) {
    state.irreguralities_return_destination.destination_name.value = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_NAME_isDisabled(state, payload) {
    state.irreguralities_return_destination.destination_name.isDisabled = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_NAME_ValueData(state, payload) {
    state.irreguralities_return_destination.destination_name.valueData = payload
  },

  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_PHONE(state, payload) {
    state.irreguralities_return_destination.destination_phone.value = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_PHONE_isDisabled(state, payload) {
    state.irreguralities_return_destination.destination_phone.isDisabled = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_PHONE_ValueData(state, payload) {
    state.irreguralities_return_destination.destination_phone.valueData = payload
  },

  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_EMAIL(state, payload) {
    state.irreguralities_return_destination.destination_email.value = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_EMAIL_isDisabled(state, payload) {
    state.irreguralities_return_destination.destination_email.isDisabled = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_EMAIL_ValueData(state, payload) {
    state.irreguralities_return_destination.destination_email.valueData = payload
  },

  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ADDRESS(state, payload) {
    state.irreguralities_return_destination.destination_address.value = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ADDRESS_isDisabled(state, payload) {
    state.irreguralities_return_destination.destination_address.isDisabled = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ADDRESS_ValueData(state, payload) {
    state.irreguralities_return_destination.destination_address.valueData = payload
  },

  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ONCHANGE_ADDRESS(state, payload) {
    state.irreguralities_return_destination.destination_onchange_address.value = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_isDisabled(state, payload) {
    state.irreguralities_return_destination.destination_onchange_address.isDisabled = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_ValueData(state, payload) {
    state.irreguralities_return_destination.destination_onchange_address.valueData = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_ArrData(state, payload) {
    state.irreguralities_return_destination.destination_onchange_address.hasOwnProperty('arrData') ?
      state.irreguralities_return_destination.destination_onchange_address.arrData = payload :
      state.irreguralities_return_destination.destination_onchange_address.arrData = []
  },

  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_SUBDISTRICT_ID(state, payload) {
    state.irreguralities_return_destination.destination_subdistrict_id.value = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_SUBDISTRICT_ID_isDisabled(state, payload) {
    state.irreguralities_return_destination.destination_subdistrict_id.isDisabled = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_SUBDISTRICT_ID_ValueData(state, payload) {
    state.irreguralities_return_destination.destination_subdistrict_id.valueData = payload
  },

  SET_IRREGURALITIES_RETURN_DESTINATION_ZIP_CODE(state, payload) {
    state.irreguralities_return_destination.zip_code.value = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_ZIP_CODE_isDisabled(state, payload) {
    state.irreguralities_return_destination.zip_code.isDisabled = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_ZIP_CODE_ValueData(state, payload) {
    state.irreguralities_return_destination.zip_code.valueData = payload
  },

  SET_IRREGURALITIES_RETURN_DESTINATION_TARIFF_CODE(state, payload) {
    state.irreguralities_return_destination.tariff_code.value = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_TARIFF_CODE_isDisabled(state, payload) {
    state.irreguralities_return_destination.tariff_code.isDisabled = payload
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_TARIFF_CODE_ValueData(state, payload) {
    state.irreguralities_return_destination.tariff_code.valueData = payload
  },
  /* IRREGULARITIES RETURN END*/

  //======= MUTATION Cost to cost Setting=======
  SET_COST_TO_COST_SETTING_COST_OWNER_NODE_ID(state, payload) {
    state.cost_to_cost_setting.cost_owner_node_id.value = payload
  },
  SET_COST_TO_COST_SETTING_COST_OWNER_NODE_ID_ValueData(state, payload) {
    state.cost_to_cost_setting.cost_owner_node_id.valueData = payload
  },
  SET_COST_TO_COST_SETTING_COST_OWNER_NODE_ID_ArrData(state, payload) {
    state.cost_to_cost_setting.cost_owner_node_id.hasOwnProperty('arrData') ?
      state.cost_to_cost_setting.cost_owner_node_id.arrData = payload :
      state.cost_to_cost_setting.cost_owner_node_id.arrData = []
  },

  SET_COST_TO_COST_SETTING_COST_PAYER_NODE_ID(state, payload) {
    state.cost_to_cost_setting.cost_payer_node_id.value = payload
  },
  SET_COST_TO_COST_SETTING_COST_PAYER_NODE_ID_ValueData(state, payload) {
    state.cost_to_cost_setting.cost_payer_node_id.valueData = payload
  },
  SET_COST_TO_COST_SETTING_COST_PAYER_NODE_ID_ArrData(state, payload) {
    state.cost_to_cost_setting.cost_payer_node_id.hasOwnProperty('arrData') ?
      state.cost_to_cost_setting.cost_payer_node_id.arrData = payload :
      state.cost_to_cost_setting.cost_payer_node_id.arrData = []
  },

  SET_COST_TO_COST_SETTING_COST_GROUP_CODE(state, payload) {
    state.cost_to_cost_setting.cost_group_code.value = payload
  },
  SET_COST_TO_COST_SETTING_COST_GROUP_CODE_ValueData(state, payload) {
    state.cost_to_cost_setting.cost_group_code.valueData = payload
  },
  SET_COST_TO_COST_SETTING_COST_GROUP_CODE_ArrData(state, payload) {
    state.cost_to_cost_setting.cost_group_code.hasOwnProperty('arrData') ?
      state.cost_to_cost_setting.cost_group_code.arrData = payload :
      state.cost_to_cost_setting.cost_group_code.arrData = []
  },

  SET_COST_TO_COST_SETTING_DYNAMICINPUTCOMPONENT_COST_TO_COST_RULE(state, payload) {
    let arr = state.cost_to_cost_setting.dynamicinputcomponent_cost_to_cost_rule.inputs

    let final = []
    if (payload && payload.length > 0) {
      let obj = {}
      let template = arr


      payload.map(item => {
        let newArr = []
        template.map(tmpl => {
          if (item.hasOwnProperty(tmpl.key.toLowerCase())) {
            let val = item[tmpl.key.toLowerCase()]
            let newObj = {}
            newObj['key'] = tmpl.key
            newObj['typeInput'] = tmpl.typeInput
            newObj['value'] = val

            newArr.push(newObj)
          } else if (item.hasOwnProperty("inputs")) {
            newArr = item["inputs"]
          }
        })

        let newData = { 'inputs': [] }
        newData['inputs'] = newArr
        final.push(newData)
      })
    }

    state.cost_to_cost_setting.dynamicinputcomponent_cost_to_cost_rule.hasOwnProperty('arrData') ?
      state.cost_to_cost_setting.dynamicinputcomponent_cost_to_cost_rule.arrData = final :
      state.cost_to_cost_setting.dynamicinputcomponent_cost_to_cost_rule.arrData = []
  },
  SET_COST_TO_COST_SETTING_DYNAMICINPUTCOMPONENT_COST_TO_COST_DETAIL_VALUE(state, payload) {
    let arr = state.cost_to_cost_setting.dynamicinputcomponent_cost_to_cost_detail_value.inputs

    let final = []
    if (payload && payload.length > 0) {
      let obj = {}
      let template = arr


      payload.map(item => {
        let newArr = []
        template.map(tmpl => {
          if (item.hasOwnProperty(tmpl.key.toLowerCase())) {
            let val = item[tmpl.key.toLowerCase()]
            let newObj = {}
            newObj['key'] = tmpl.key
            newObj['typeInput'] = tmpl.typeInput
            newObj['value'] = val

            newArr.push(newObj)
          } else if (item.hasOwnProperty("inputs")) {
            newArr = item["inputs"]
          }
        })

        let newData = { 'inputs': [] }
        newData['inputs'] = newArr
        final.push(newData)
      })
    }


    state.cost_to_cost_setting.dynamicinputcomponent_cost_to_cost_detail_value.hasOwnProperty('arrData') ?
      state.cost_to_cost_setting.dynamicinputcomponent_cost_to_cost_detail_value.arrData = final :
      state.cost_to_cost_setting.dynamicinputcomponent_cost_to_cost_detail_value.arrData = []

  },

  SET_COST_TO_COST_SETTING_RULE_CONDITION(state, payload) {
    state.cost_to_cost_setting.rule_condition.value = payload
  },
  SET_COST_TO_COST_SETTING_RULE_CONDITION_ValueData(state, payload) {
    state.cost_to_cost_setting.rule_condition.valueData = payload
  },
  SET_COST_TO_COST_SETTING_RULE_CONDITION_ArrData(state, payload) {
    state.cost_to_cost_setting.rule_condition.hasOwnProperty('arrData') ?
      state.cost_to_cost_setting.rule_condition.arrData = payload :
      state.cost_to_cost_setting.rule_condition.arrData = []
  },

  SET_COST_TO_COST_SETTING_CONDITION(state, payload) {
    state.cost_to_cost_setting.condition.value = payload
  },
  SET_COST_TO_COST_SETTING_CONDITION_ValueData(state, payload) {
    state.cost_to_cost_setting.condition.valueData = payload
  },
  SET_COST_TO_COST_SETTING_CONDITION_ArrData(state, payload) {
    state.cost_to_cost_setting.condition.hasOwnProperty('arrData') ?
      state.cost_to_cost_setting.condition.arrData = payload :
      state.cost_to_cost_setting.condition.arrData = []
  },

  SET_COST_TO_COST_SETTING_RULE_VALUE(state, payload) {
    state.cost_to_cost_setting.rule_value.value = payload
  },
  SET_COST_TO_COST_SETTING_RULE_VALUE_ValueData(state, payload) {
    state.cost_to_cost_setting.rule_value.valueData = payload
  },
  SET_COST_TO_COST_SETTING_RULE_VALUE_ArrData(state, payload) {
    state.cost_to_cost_setting.rule_value.hasOwnProperty('arrData') ?
      state.cost_to_cost_setting.rule_value.arrData = payload :
      state.cost_to_cost_setting.rule_value.arrData = []
  },

  SET_COST_TO_COST_SETTING_COST_TYPE_CODE(state, payload) {
    state.cost_to_cost_setting.cost_type_code.value = payload
  },
  SET_COST_TO_COST_SETTING_COST_TYPE_CODE_ValueData(state, payload) {
    state.cost_to_cost_setting.cost_type_code.valueData = payload
  },
  SET_COST_TO_COST_SETTING_COST_TYPE_CODE_ArrData(state, payload) {
    state.cost_to_cost_setting.cost_type_code.hasOwnProperty('arrData') ?
      state.cost_to_cost_setting.cost_type_code.arrData = payload :
      state.cost_to_cost_setting.cost_type_code.arrData = []
  },

  SET_COST_TO_COST_SETTING_MIN_KG(state, payload) {
    state.cost_to_cost_setting.min_kg.value = payload
  },
  SET_COST_TO_COST_SETTING_MIN_KG_ValueData(state, payload) {
    state.cost_to_cost_setting.min_kg.valueData = payload
  },

  SET_COST_TO_COST_SETTING_MAX_KG(state, payload) {
    state.cost_to_cost_setting.max_kg.value = payload
  },
  SET_COST_TO_COST_SETTING_MAX_KG_ValueData(state, payload) {
    state.cost_to_cost_setting.max_kg.valueData = payload
  },

  SET_COST_TO_COST_SETTING_COST_VALUE(state, payload) {
    state.cost_to_cost_setting.cost_value.value = payload
  },
  SET_COST_TO_COST_SETTING_COST_VALUE_ValueData(state, payload) {
    state.cost_to_cost_setting.cost_value.valueData = payload
  },

  SET_COST_TO_COST_SETTING_NAME(state, payload) {
    state.cost_to_cost_setting.name.value = payload
  },
  SET_COST_TO_COST_SETTING_NAME_ValueData(state, payload) {
    state.cost_to_cost_setting.name.valueData = payload
  },

  SET_COST_TO_COST_SETTING_TRACKING_TYPE_NAME(state, payload) {
    state.cost_to_cost_setting.tracking_type_name.value = payload
  },
  SET_COST_TO_COST_SETTING_TRACKING_TYPE_NAME_ValueData(state, payload) {
    state.cost_to_cost_setting.tracking_type_name.valueData = payload
  },
  SET_COST_TO_COST_SETTING_TRACKING_TYPE_NAME_ArrData(state, payload) {
    state.cost_to_cost_setting.tracking_type_name.hasOwnProperty('arrData') ?
      state.cost_to_cost_setting.tracking_type_name.arrData = payload :
      state.cost_to_cost_setting.tracking_type_name.arrData = []
  },
  //======= END MUTATION Cost to cost Setting=======


  //======= Cost To Cost Report =======
  // SET_COST_TO_COST_REPORT_CONTOHMULTIPLESELECTASYNC(state, payload) {
  //   state.cost_to_cost_report.contohmultipleselectasync.value = payload
  // },
  // SET_COST_TO_COST_REPORT_CONTOHMULTIPLESELECTASYNC_ValueData(state, payload) {
  //   state.cost_to_cost_report.contohmultipleselectasync.valueData = payload
  // },


  SET_COST_TO_COST_REPORT_COST_OWNER_NODE_ID(state, payload) {
    state.cost_to_cost_report.cost_owner_node_id.value = payload
  },
  SET_COST_TO_COST_REPORT_COST_OWNER_NODE_ID_ValueData(state, payload) {
    state.cost_to_cost_report.cost_owner_node_id.valueData = payload
  },
  SET_COST_TO_COST_REPORT_COST_OWNER_NODE_ID_ArrData(state, payload) {
    state.cost_to_cost_report.cost_owner_node_id.hasOwnProperty('arrData') ?
      state.cost_to_cost_report.cost_owner_node_id.arrData = payload :
      state.cost_to_cost_report.cost_owner_node_id.arrData = []
  },

  SET_COST_TO_COST_REPORT_COST_PAYER_NODE_ID(state, payload) {
    state.cost_to_cost_report.cost_payer_node_id.value = payload
  },
  SET_COST_TO_COST_REPORT_COST_PAYER_NODE_ID_ValueData(state, payload) {
    state.cost_to_cost_report.cost_payer_node_id.valueData = payload
  },
  SET_COST_TO_COST_REPORT_COST_PAYER_NODE_ID_ArrData(state, payload) {
    state.cost_to_cost_report.cost_payer_node_id.hasOwnProperty('arrData') ?
      state.cost_to_cost_report.cost_payer_node_id.arrData = payload :
      state.cost_to_cost_report.cost_payer_node_id.arrData = []
  },

  SET_COST_TO_COST_REPORT_COST_GROUP_CODE(state, payload) {
    state.cost_to_cost_report.cost_group_code.value = payload
  },
  SET_COST_TO_COST_REPORT_COST_GROUP_CODE_ValueData(state, payload) {
    state.cost_to_cost_report.cost_group_code.valueData = payload
  },
  SET_COST_TO_COST_REPORT_COST_GROUP_CODE_ArrData(state, payload) {
    state.cost_to_cost_report.cost_group_code.hasOwnProperty('arrData') ?
      state.cost_to_cost_report.cost_group_code.arrData = payload :
      state.cost_to_cost_report.cost_group_code.arrData = []
  },
  SET_COST_TO_COST_REPORT_NAME(state, payload) {
    state.cost_to_cost_report.name.value = payload
  },
  SET_COST_TO_COST_REPORT_NAME_ValueData(state, payload) {
    state.cost_to_cost_report.name.valueData = payload
  },
  SET_COST_TO_COST_REPORT_NAME_ArrData(state, payload) {
    state.cost_to_cost_report.name.hasOwnProperty('arrData') ?
      state.cost_to_cost_report.name.arrData = payload :
      state.cost_to_cost_report.name.arrData = []
  },

  SET_COST_TO_COST_REPORT_DATE_FROM(state, payload) {
    state.cost_to_cost_report.date_from.value = payload
  },
  SET_COST_TO_COST_REPORT_DATE_FROM_ValueData(state, payload) {
    state.cost_to_cost_report.date_from.valueData = payload
  },

  SET_COST_TO_COST_REPORT_DATE_TO(state, payload) {
    state.cost_to_cost_report.date_to.value = payload
  },
  SET_COST_TO_COST_REPORT_DATE_TO_ValueData(state, payload) {
    state.cost_to_cost_report.date_to.valueData = payload
  },

  //======= Cost To Cost Report =======

  //======= Start packing Kayu =======
  SET_PACKINGKAYU_KOLI_NUMBER(state, payload) {
    state.packingkayu.koli_number.value = payload
  },
  SET_PACKINGKAYU_KOLI_NUMBER_ValueData(state, payload) {
    state.packingkayu.koli_number.valueData = payload
  },
  SET_PACKINGKAYU_KOLI_ACTUAL_WEIGHT(state, payload) {
    state.packingkayu.koli_actual_weight.value = payload
  },
  SET_PACKINGKAYU_KOLI_ACTUAL_WEIGHT_ValueData(state, payload) {
    state.packingkayu.koli_actual_weight.valueData = payload
  },

  SET_PACKINGKAYU_KOLI_PACKING_KAYU_WEIGHT(state, payload) {
    state.packingkayu.koli_packing_kayu_weight.value = payload
  },
  SET_PACKINGKAYU_KOLI_PACKING_KAYU_WEIGHT_ValueData(state, payload) {
    state.packingkayu.koli_packing_kayu_weight.valueData = payload
  },

  SET_PACKINGKAYU_KOLI_HEIGHT(state, payload) {
    state.packingkayu.koli_height.value = payload
  },
  SET_PACKINGKAYU_KOLI_HEIGHT_ValueData(state, payload) {
    state.packingkayu.koli_height.valueData = payload
  },

  SET_PACKINGKAYU_KOLI_WIDTH(state, payload) {
    state.packingkayu.koli_width.value = payload
  },
  SET_PACKINGKAYU_KOLI_WIDTH_ValueData(state, payload) {
    state.packingkayu.koli_width.valueData = payload
  },

  SET_PACKINGKAYU_KOLI_LENGTH(state, payload) {
    state.packingkayu.koli_length.value = payload
  },
  SET_PACKINGKAYU_KOLI_LENGTH_ValueData(state, payload) {
    state.packingkayu.koli_length.valueData = payload
  },
  //======= END packing Kayu ==========


  //======= Start Employee =======
  SET_EMPLOYEE_EMPLOYEE_NIK(state, payload) {
    state.employee.employee_nik.value = payload
  },
  SET_EMPLOYEE_EMPLOYEE_NIK_ValueData(state, payload) {
    state.employee.employee_nik.valueData = payload
  },

  SET_EMPLOYEE_EMPLOYEE_CODE(state, payload) {
    state.employee.employee_code.value = payload
  },
  SET_EMPLOYEE_EMPLOYEE_CODE_ValueData(state, payload) {
    state.employee.employee_code.valueData = payload
  },

  SET_EMPLOYEE_EMPLOYEE_NAME(state, payload) {
    state.employee.employee_name.value = payload
  },
  SET_EMPLOYEE_EMPLOYEE_NAME_ValueData(state, payload) {
    state.employee.employee_name.valueData = payload
  },

  SET_EMPLOYEE_EMPLOYEE_PHONE_NUMBER(state, payload) {
    state.employee.employee_phone_number.value = payload
  },
  SET_EMPLOYEE_EMPLOYEE_PHONE_NUMBER_ValueData(state, payload) {
    state.employee.employee_phone_number.valueData = payload
  },

  SET_EMPLOYEE_EMPLOYEE_BIRTH_PLACE(state, payload) {
    state.employee.employee_birth_place.value = payload
  },
  SET_EMPLOYEE_EMPLOYEE_BIRTH_PLACE_ValueData(state, payload) {
    state.employee.employee_birth_place.valueData = payload
  },

  SET_EMPLOYEE_EMPLOYEE_BIRTH_DATE(state, payload) {
    state.employee.employee_birth_date.value = payload
  },
  SET_EMPLOYEE_EMPLOYEE_BIRTH_DATE_ValueData(state, payload) {
    state.employee.employee_birth_date.valueData = payload
  },

  SET_EMPLOYEE_EMPLOYEE_GENDER(state, payload) {
    state.employee.employee_gender.value = payload
  },
  SET_EMPLOYEE_EMPLOYEE_GENDER_ValueData(state, payload) {
    state.employee.employee_gender.valueData = payload
  },
  SET_EMPLOYEE_EMPLOYEE_GENDER_ArrData(state, payload) {
    state.employee.employee_gender.hasOwnProperty('arrData') ?
      state.employee.employee_gender.arrData = payload :
      state.employee.employee_gender.arrData = []
  },

  SET_EMPLOYEE_EMPLOYEE_NO_SIM(state, payload) {
    state.employee.employee_no_sim.value = payload
  },
  SET_EMPLOYEE_EMPLOYEE_NO_SIM_ValueData(state, payload) {
    state.employee.employee_no_sim.valueData = payload
  },

  SET_EMPLOYEE_EMPLOYEE_NO_KTP(state, payload) {
    state.employee.employee_no_ktp.value = payload
  },
  SET_EMPLOYEE_EMPLOYEE_NO_KTP_ValueData(state, payload) {
    state.employee.employee_no_ktp.valueData = payload
  },

  SET_EMPLOYEE_EMPLOYEE_EMPLOYEMENT_STATUS(state, payload) {
    state.employee.employee_employement_status.value = payload
  },
  SET_EMPLOYEE_EMPLOYEE_EMPLOYEMENT_STATUS_ValueData(state, payload) {
    state.employee.employee_employement_status.valueData = payload
  },

  SET_EMPLOYEE_EMPLOYEE_TYPE_ID(state, payload) {
    state.employee.employee_type_id.value = payload
  },
  SET_EMPLOYEE_EMPLOYEE_TYPE_ID_ValueData(state, payload) {
    state.employee.employee_type_id.valueData = payload
  },
  SET_EMPLOYEE_EMPLOYEE_TYPE_ID_ArrData(state, payload) {
    state.employee.employee_type_id.hasOwnProperty('arrData') ?
      state.employee.employee_type_id.arrData = payload :
      state.employee.employee_type_id.arrData = []
  },

  SET_EMPLOYEE_EMPLOYEE_NODE_ID(state, payload) {
    state.employee.employee_node_id.value = payload
  },
  SET_EMPLOYEE_EMPLOYEE_NODE_ID_ValueData(state, payload) {
    state.employee.employee_node_id.valueData = payload
  },
  SET_EMPLOYEE_EMPLOYEE_NODE_ID_ArrData(state, payload) {
    state.employee.employee_node_id.hasOwnProperty('arrData') ?
      state.employee.employee_node_id.arrData = payload :
      state.employee.employee_node_id.arrData = []
  },

  SET_EMPLOYEE_IS_ACTIVE(state, payload) {
    state.employee.is_active.value = payload
  },
  SET_EMPLOYEE_IS_ACTIVE_ValueData(state, payload) {
    state.employee.is_active.valueData = payload
  },

  SET_EMPLOYEE_RUNSHEET_ITEM_LIMIT(state, payload) {
    state.employee.runsheet_item_limit.value = payload
  },
  SET_EMPLOYEE_RUNSHEET_ITEM_LIMIT_ValueData(state, payload) {
    state.employee.runsheet_item_limit.valueData = payload
  },
  //===== end employee ======

  //======= START Employee Type =======
  SET_EMPLOYEE_TYPE_EMPLOYEE_TYPE_NAME(state, payload) {
    state.employee_type.employee_type_name.value = payload
  },
  SET_EMPLOYEE_TYPE_EMPLOYEE_TYPE_NAME_ValueData(state, payload) {
    state.employee_type.employee_type_name.valueData = payload
  },

  SET_EMPLOYEE_TYPE_IS_ACTIVE(state, payload) {
    state.employee_type.is_active.value = payload
  },
  SET_EMPLOYEE_TYPE_IS_ACTIVE_ValueData(state, payload) {
    state.employee_type.is_active.valueData = payload
  },

  //======= END Employee Type =======

  SET_PROFILE_USER_NAME(state, payload) {
    state.profile.user_name.value = payload
  },
  SET_PROFILE_USER_NAME_ValueData(state, payload) {
    state.profile.user_name.valueData = payload
  },

  SET_PROFILE_USER_LOGIN(state, payload) {
    state.profile.user_login.value = payload
  },
  SET_PROFILE_USER_LOGIN_ValueData(state, payload) {
    state.profile.user_login.valueData = payload
  },

  SET_PROFILE_PASSWORD(state, payload) {
    state.profile.password.value = payload
  },
  SET_PROFILE_PASSWORD_ValueData(state, payload) {
    state.profile.password.valueData = payload
  },

  SET_PROFILE_USER_EMAIL(state, payload) {
    state.profile.user_email.value = payload
  },
  SET_PROFILE_USER_EMAIL_ValueData(state, payload) {
    state.profile.user_email.valueData = payload
  },

  //Update Password
  SET_PROFILE_DIALOG_PASSWORD(state, payload) {
    state.profile_dialog.password.value = payload
  },
  SET_PROFILE_DIALOG_PASSWORD_ValueData(state, payload) {
    state.profile_dialog.password.valueData = payload
  },


  SET_DELIVERY_NUMBER(state, payload) {
    state.deliveryNumber = payload;
  },

  UPDATE_FORM_DATA(state, payload) {

    state.remarks = payload;
  },
  // update pod
  SET_STATUS_DELIVERY(state, payload) {

    state.status_delivery = payload;
  },
  SET_REMARKS(state, payload) {

    state.remarks = payload;
  },
  SET_RECEIVER_NAME(state, payload) {

    state.receiver_name = payload;
  },
  SET_FINISH_RECEIVING_BUTTON_VISIBILITY(state, payload) {
    state.isFinishReceivingButtonVisible = payload;
  },
  SET_ALL_RUNSHEET_ID_ValueData(state, payload) {
    state.all_runsheet = payload
  },


  //====== SLA KOLI======  

  SET_SLA_KOLI_SLA_ID(state, payload) {
    state.sla_koli.sla_id.value = payload
  },
  SET_SLA_KOLI_SLA_ID_visible(state, payload) {
    state.sla_koli.sla_id.visible = payload
  },
  SET_SLA_KOLI_SLA_ID_ValueData(state, payload) {
    state.sla_koli.sla_id.valueData = payload
  },


  SET_SLA_KOLI_GROUP_NAME(state, payload) {
    state.sla_koli.group_name.value = payload
  },
  SET_SLA_KOLI_GROUP_NAME_ValueData(state, payload) {
    state.sla_koli.group_name.valueData = payload
  },


  SET_SLA_KOLI_START_DATE(state, payload) {
    state.sla_koli.start_date.value = payload
  },
  SET_SLA_KOLI_START_DATE_ValueData(state, payload) {
    state.sla_koli.start_date.valueData = payload
  },
  SET_SLA_KOLI_START_DATE_ArrData(state, payload) {
    state.sla_koli.start_date.hasOwnProperty('arrData') ?
    state.sla_koli.start_date.arrData = payload :
    state.sla_koli.start_date.arrData = []
  },


  SET_SLA_KOLI_END_DATE(state, payload) {
    state.sla_koli.end_date.value = payload
  },
  SET_SLA_KOLI_END_DATE_ValueData(state, payload) {
    state.sla_koli.end_date.valueData = payload
  },
  SET_SLA_KOLI_END_DATE_ArrData(state, payload) {
    state.sla_koli.end_date.hasOwnProperty('arrData') ?
    state.sla_koli.end_date.arrData = payload :
    state.sla_koli.end_date.arrData = []
  },


  SET_SLA_KOLI_ORIGIN(state, payload) {
    state.sla_koli.origin.value = payload
  },
  SET_SLA_KOLI_ORIGIN_ValueData(state, payload) {
    state.sla_koli.origin.valueData = payload
  },
  SET_SLA_KOLI_ORIGIN_ArrData(state, payload) {
    state.sla_koli.origin.hasOwnProperty('arrData') ?
    state.sla_koli.origin.arrData = payload :
    state.sla_koli.origin.arrData = []
  },


  SET_SLA_KOLI_DESTINATION(state, payload) {
    state.sla_koli.destination.value = payload
  },
  SET_SLA_KOLI_DESTINATION_ValueData(state, payload) {
    state.sla_koli.destination.valueData = payload
  },
  SET_SLA_KOLI_DESTINATION_ArrData(state, payload) {
    state.sla_koli.destination.hasOwnProperty('arrData') ?
    state.sla_koli.destination.arrData = payload :
    state.sla_koli.destination.arrData = []
  },


  SET_SLA_KOLI_CUSTOMER_NAME(state, payload) {
    state.sla_koli.customer_name.value = payload
  },
  SET_SLA_KOLI_CUSTOMER_NAME_ValueData(state, payload) {
    state.sla_koli.customer_name.valueData = payload
  },
  SET_SLA_KOLI_CUSTOMER_NAME_ArrData(state, payload) {
    state.sla_koli.customer_name.hasOwnProperty('arrData') ?
    state.sla_koli.customer_name.arrData = payload :
    state.sla_koli.customer_name.arrData = []
  },


  SET_SLA_KOLI_CUSTOMER_CODE(state, payload) {
    state.sla_koli.customer_code.value = payload
  },
  SET_SLA_KOLI_CUSTOMER_CODE_ValueData(state, payload) {
    state.sla_koli.customer_code.valueData = payload
  },
  SET_SLA_KOLI_CUSTOMER_CODE_ArrData(state, payload) {
    state.sla_koli.customer_code.hasOwnProperty('arrData') ?
    state.sla_koli.customer_code.arrData = payload :
    state.sla_koli.customer_code.arrData = []
  },

  SET_SLA_KOLI_SERVICE_CODE(state, payload) {
    state.sla_koli.service_code.value = payload
  },
  SET_SLA_KOLI_SERVICE_CODE_ValueData(state, payload) {
    state.sla_koli.service_code.valueData = payload
  },
  SET_SLA_KOLI_SERVICE_CODE_ArrData(state, payload) {
    state.sla_koli.service_code.hasOwnProperty('arrData') ?
    state.sla_koli.service_code.arrData = payload :
    state.sla_koli.service_code.arrData = []
  },


  SET_SLA_KOLI_SLA(state, payload) {
    state.sla_koli.sla.value = payload
  },
  SET_SLA_KOLI_SLA_ValueData(state, payload) {
    state.sla_koli.sla.valueData = payload
  },
  SET_SLA_KOLI_SLA_ArrValueData(state, payload) {
    state.sla_koli.sla.arrValueData = payload
  },


  SET_SLA_KOLI_IS_ACTIVE(state, payload) {
    state.sla_koli.is_active.value = payload
  },
  SET_SLA_KOLI_IS_ACTIVE_ValueData(state, payload) {
    state.sla_koli.is_active.valueData = payload
  },
  //====== END SLA Koli ======    



  //====== SLA Inter Activity======  

  SET_SLA_INTER_ACTIVITY_SLA_ID(state, payload) {
    state.sla_inter_activity.sla_id.value = payload
  },
  SET_SLA_INTER_ACTIVITY_SLA_ID_visible(state, payload) {
    state.sla_inter_activity.sla_id.visible = payload
  },
  SET_SLA_INTER_ACTIVITY_SLA_ID_ValueData(state, payload) {
    state.sla_inter_activity.sla_id.valueData = payload
  },


  SET_SLA_INTER_ACTIVITY_GROUP_NAME(state, payload) {
    state.sla_inter_activity.group_name.value = payload
  },
  SET_SLA_INTER_ACTIVITY_GROUP_NAME_ValueData(state, payload) {
    state.sla_inter_activity.group_name.valueData = payload
  },


  SET_SLA_INTER_ACTIVITY_START_DATE(state, payload) {
    state.sla_inter_activity.start_date.value = payload
  },
  SET_SLA_INTER_ACTIVITY_START_DATE_ValueData(state, payload) {
    state.sla_inter_activity.start_date.valueData = payload
  },
  SET_SLA_INTER_ACTIVITY_START_DATE_ArrData(state, payload) {
    state.sla_inter_activity.start_date.hasOwnProperty('arrData') ?
    state.sla_inter_activity.start_date.arrData = payload :
    state.sla_inter_activity.start_date.arrData = []
  },


  SET_SLA_INTER_ACTIVITY_END_DATE(state, payload) {
    state.sla_inter_activity.end_date.value = payload
  },
  SET_SLA_INTER_ACTIVITY_END_DATE_ValueData(state, payload) {
    state.sla_inter_activity.end_date.valueData = payload
  },
  SET_SLA_INTER_ACTIVITY_END_DATE_ArrData(state, payload) {
    state.sla_inter_activity.end_date.hasOwnProperty('arrData') ?
    state.sla_inter_activity.end_date.arrData = payload :
    state.sla_inter_activity.end_date.arrData = []
  },


  SET_SLA_INTER_ACTIVITY_ORIGIN(state, payload) {
    state.sla_inter_activity.origin.value = payload
  },
  SET_SLA_INTER_ACTIVITY_ORIGIN_ValueData(state, payload) {
    state.sla_inter_activity.origin.valueData = payload
  },
  SET_SLA_INTER_ACTIVITY_ORIGIN_ArrData(state, payload) {
    state.sla_inter_activity.origin.hasOwnProperty('arrData') ?
    state.sla_inter_activity.origin.arrData = payload :
    state.sla_inter_activity.origin.arrData = []
  },


  SET_SLA_INTER_ACTIVITY_DESTINATION(state, payload) {
    state.sla_inter_activity.destination.value = payload
  },
  SET_SLA_INTER_ACTIVITY_DESTINATION_ValueData(state, payload) {
    state.sla_inter_activity.destination.valueData = payload
  },
  SET_SLA_INTER_ACTIVITY_DESTINATION_ArrData(state, payload) {
    state.sla_inter_activity.destination.hasOwnProperty('arrData') ?
    state.sla_inter_activity.destination.arrData = payload :
    state.sla_inter_activity.destination.arrData = []
  },


  SET_SLA_INTER_ACTIVITY_CUSTOMER_NAME(state, payload) {
    state.sla_inter_activity.customer_name.value = payload
  },
  SET_SLA_INTER_ACTIVITY_CUSTOMER_NAME_ValueData(state, payload) {
    state.sla_inter_activity.customer_name.valueData = payload
  },
  SET_SLA_INTER_ACTIVITY_CUSTOMER_NAME_ArrData(state, payload) {
    state.sla_inter_activity.customer_name.hasOwnProperty('arrData') ?
    state.sla_inter_activity.customer_name.arrData = payload :
    state.sla_inter_activity.customer_name.arrData = []
  },


  SET_SLA_INTER_ACTIVITY_CUSTOMER_CODE(state, payload) {
    state.sla_inter_activity.customer_code.value = payload
  },
  SET_SLA_INTER_ACTIVITY_CUSTOMER_CODE_ValueData(state, payload) {
    state.sla_inter_activity.customer_code.valueData = payload
  },
  SET_SLA_INTER_ACTIVITY_CUSTOMER_CODE_ArrData(state, payload) {
    state.sla_inter_activity.customer_code.hasOwnProperty('arrData') ?
    state.sla_inter_activity.customer_code.arrData = payload :
    state.sla_inter_activity.customer_code.arrData = []
  },

  SET_SLA_INTER_ACTIVITY_SERVICE_CODE(state, payload) {
    state.sla_inter_activity.service_code.value = payload
  },
  SET_SLA_INTER_ACTIVITY_SERVICE_CODE_ValueData(state, payload) {
    state.sla_inter_activity.service_code.valueData = payload
  },
  SET_SLA_INTER_ACTIVITY_SERVICE_CODE_ArrData(state, payload) {
    state.sla_inter_activity.service_code.hasOwnProperty('arrData') ?
    state.sla_inter_activity.service_code.arrData = payload :
    state.sla_inter_activity.service_code.arrData = []
  },


  SET_SLA_INTER_ACTIVITY_NODE_CODE(state, payload) {
    state.sla_inter_activity.node_code.value = payload
  },
  SET_SLA_INTER_ACTIVITY_NODE_CODE_ValueData(state, payload) {
    state.sla_inter_activity.node_code.valueData = payload
  },
  SET_SLA_INTER_ACTIVITY_NODE_CODE_ArrData(state, payload) {
    state.sla_inter_activity.node_code.hasOwnProperty('arrData') ?
    state.sla_inter_activity.node_code.arrData = payload :
    state.sla_inter_activity.node_code.arrData = []
  },


  SET_SLA_INTER_ACTIVITY_PREVIOUS_ACTIVITY(state, payload) {
    state.sla_inter_activity.previous_activity.value = payload
  },
  SET_SLA_INTER_ACTIVITY_PREVIOUS_ACTIVITY_ValueData(state, payload) {
    state.sla_inter_activity.previous_activity.valueData = payload
  },
  SET_SLA_INTER_ACTIVITY_PREVIOUS_ACTIVITY_ArrData(state, payload) {
    state.sla_inter_activity.previous_activity.hasOwnProperty('arrData') ?
    state.sla_inter_activity.previous_activity.arrData = payload :
    state.sla_inter_activity.previous_activity.arrData = []
  },


  SET_SLA_INTER_ACTIVITY_NEXT_ACTIVITY(state, payload) {
    state.sla_inter_activity.next_activity.value = payload
  },
  SET_SLA_INTER_ACTIVITY_NEXT_ACTIVITY_ValueData(state, payload) {
    state.sla_inter_activity.next_activity.valueData = payload
  },
  SET_SLA_INTER_ACTIVITY_NEXT_ACTIVITY_ArrData(state, payload) {
    state.sla_inter_activity.next_activity.hasOwnProperty('arrData') ?
    state.sla_inter_activity.next_activity.arrData = payload :
    state.sla_inter_activity.next_activity.arrData = []
  },


  SET_SLA_INTER_ACTIVITY_SLA(state, payload) {
    state.sla_inter_activity.sla.value = payload
  },
  SET_SLA_INTER_ACTIVITY_SLA_ValueData(state, payload) {
    state.sla_inter_activity.sla.valueData = payload
  },
  SET_SLA_INTER_ACTIVITY_SLA_ArrValueData(state, payload) {
    state.sla_inter_activity.sla.arrValueData = payload
  },


  SET_SLA_INTER_ACTIVITY_IS_ACTIVE(state, payload) {
    state.sla_inter_activity.is_active.value = payload
  },
  SET_SLA_INTER_ACTIVITY_IS_ACTIVE_ValueData(state, payload) {
    state.sla_inter_activity.is_active.valueData = payload
  },
  //====== END SLA INTER ACTIVITY ======



  //====== SLA Node To Node A ======  

  SET_SLA_NODE_TO_NODE_A_SLA_ID(state, payload) {
    state.sla_node_to_node_a.sla_id.value = payload
  },
  SET_SLA_NODE_TO_NODE_A_SLA_ID_visible(state, payload) {
    state.sla_node_to_node_a.sla_id.visible = payload
  },
  SET_SLA_NODE_TO_NODE_A_SLA_ID_ValueData(state, payload) {
    state.sla_node_to_node_a.sla_id.valueData = payload
  },


  SET_SLA_NODE_TO_NODE_A_GROUP_NAME(state, payload) {
    state.sla_node_to_node_a.group_name.value = payload
  },
  SET_SLA_NODE_TO_NODE_A_GROUP_NAME_ValueData(state, payload) {
    state.sla_node_to_node_a.group_name.valueData = payload
  },


  SET_SLA_NODE_TO_NODE_A_START_DATE(state, payload) {
    state.sla_node_to_node_a.start_date.value = payload
  },
  SET_SLA_NODE_TO_NODE_A_START_DATE_ValueData(state, payload) {
    state.sla_node_to_node_a.start_date.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_A_START_DATE_ArrData(state, payload) {
    state.sla_node_to_node_a.start_date.hasOwnProperty('arrData') ?
    state.sla_node_to_node_a.start_date.arrData = payload :
    state.sla_node_to_node_a.start_date.arrData = []
  },


  SET_SLA_NODE_TO_NODE_A_END_DATE(state, payload) {
    state.sla_node_to_node_a.end_date.value = payload
  },
  SET_SLA_NODE_TO_NODE_A_END_DATE_ValueData(state, payload) {
    state.sla_node_to_node_a.end_date.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_A_END_DATE_ArrData(state, payload) {
    state.sla_node_to_node_a.end_date.hasOwnProperty('arrData') ?
    state.sla_node_to_node_a.end_date.arrData = payload :
    state.sla_node_to_node_a.end_date.arrData = []
  },

  SET_SLA_NODE_TO_NODE_A_TYPE(state, payload) {
    state.sla_node_to_node_a.type.value = payload
  },
  SET_SLA_NODE_TO_NODE_A_TYPE_ValueData(state, payload) {
    state.sla_node_to_node_a.type.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_A_TYPE_ArrData(state, payload) {
    state.sla_node_to_node_a.type.hasOwnProperty('arrData') ?
    state.sla_node_to_node_a.type.arrData = payload :
    state.sla_node_to_node_a.type.arrData = []
  },


  SET_SLA_NODE_TO_NODE_A_NODE_ORIGIN(state, payload) {
    state.sla_node_to_node_a.node_origin.value = payload
  },
  SET_SLA_NODE_TO_NODE_A_NODE_ORIGIN_ValueData(state, payload) {
    state.sla_node_to_node_a.node_origin.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_A_NODE_ORIGIN_ArrData(state, payload) {
    state.sla_node_to_node_a.node_origin.hasOwnProperty('arrData') ?
    state.sla_node_to_node_a.node_origin.arrData = payload :
    state.sla_node_to_node_a.node_origin.arrData = []
  },


  SET_SLA_NODE_TO_NODE_A_NODE_DESTINATION(state, payload) {
    state.sla_node_to_node_a.node_destination.value = payload
  },
  SET_SLA_NODE_TO_NODE_A_NODE_DESTINATION_ValueData(state, payload) {
    state.sla_node_to_node_a.node_destination.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_A_NODE_DESTINATION_ArrData(state, payload) {
    state.sla_node_to_node_a.node_destination.hasOwnProperty('arrData') ?
    state.sla_node_to_node_a.node_destination.arrData = payload :
    state.sla_node_to_node_a.node_destination.arrData = []
  },

  SET_SLA_NODE_TO_NODE_A_SLA(state, payload) {
    state.sla_node_to_node_a.sla.value = payload
  },
  SET_SLA_NODE_TO_NODE_A_SLA_ValueData(state, payload) {
    state.sla_node_to_node_a.sla.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_A_SLA_ArrValueData(state, payload) {
    state.sla_node_to_node_a.sla.arrValueData = payload
  },


  SET_SLA_NODE_TO_NODE_A_IS_ACTIVE(state, payload) {
    state.sla_node_to_node_a.is_active.value = payload
  },
  SET_SLA_NODE_TO_NODE_A_IS_ACTIVE_ValueData(state, payload) {
    state.sla_node_to_node_a.is_active.valueData = payload
  },
  //====== END SLA NODE TO NODE A ======


  //====== SLA Node To Node B ======  

  SET_SLA_NODE_TO_NODE_B_SLA_ID(state, payload) {
    state.sla_node_to_node_b.sla_id.value = payload
  },
  SET_SLA_NODE_TO_NODE_B_SLA_ID_visible(state, payload) {
    state.sla_node_to_node_b.sla_id.visible = payload
  },
  SET_SLA_NODE_TO_NODE_B_SLA_ID_ValueData(state, payload) {
    state.sla_node_to_node_b.sla_id.valueData = payload
  },


  SET_SLA_NODE_TO_NODE_B_GROUP_NAME(state, payload) {
    state.sla_node_to_node_b.group_name.value = payload
  },
  SET_SLA_NODE_TO_NODE_B_GROUP_NAME_ValueData(state, payload) {
    state.sla_node_to_node_b.group_name.valueData = payload
  },


  SET_SLA_NODE_TO_NODE_B_START_DATE(state, payload) {
    state.sla_node_to_node_b.start_date.value = payload
  },
  SET_SLA_NODE_TO_NODE_B_START_DATE_ValueData(state, payload) {
    state.sla_node_to_node_b.start_date.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_B_START_DATE_ArrData(state, payload) {
    state.sla_node_to_node_b.start_date.hasOwnProperty('arrData') ?
    state.sla_node_to_node_b.start_date.arrData = payload :
    state.sla_node_to_node_b.start_date.arrData = []
  },


  SET_SLA_NODE_TO_NODE_B_END_DATE(state, payload) {
    state.sla_node_to_node_b.end_date.value = payload
  },
  SET_SLA_NODE_TO_NODE_B_END_DATE_ValueData(state, payload) {
    state.sla_node_to_node_b.end_date.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_B_END_DATE_ArrData(state, payload) {
    state.sla_node_to_node_b.end_date.hasOwnProperty('arrData') ?
    state.sla_node_to_node_b.end_date.arrData = payload :
    state.sla_node_to_node_b.end_date.arrData = []
  },


  SET_SLA_NODE_TO_NODE_B_ORIGIN(state, payload) {
    state.sla_node_to_node_b.origin.value = payload
  },
  SET_SLA_NODE_TO_NODE_B_ORIGIN_ValueData(state, payload) {
    state.sla_node_to_node_b.origin.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_B_ORIGIN_ArrData(state, payload) {
    state.sla_node_to_node_b.origin.hasOwnProperty('arrData') ?
    state.sla_node_to_node_b.origin.arrData = payload :
    state.sla_node_to_node_b.origin.arrData = []
  },


  SET_SLA_NODE_TO_NODE_B_TYPE(state, payload) {
    state.sla_node_to_node_b.type.value = payload
  },
  SET_SLA_NODE_TO_NODE_B_TYPE_ValueData(state, payload) {
    state.sla_node_to_node_b.type.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_B_TYPE_ArrData(state, payload) {
    state.sla_node_to_node_b.type.hasOwnProperty('arrData') ?
    state.sla_node_to_node_b.type.arrData = payload :
    state.sla_node_to_node_b.type.arrData = []
  },


  SET_SLA_NODE_TO_NODE_B_NODE_ORIGIN(state, payload) {
    state.sla_node_to_node_b.node_origin.value = payload
  },
  SET_SLA_NODE_TO_NODE_B_NODE_ORIGIN_ValueData(state, payload) {
    state.sla_node_to_node_b.node_origin.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_B_NODE_ORIGIN_ArrData(state, payload) {
    state.sla_node_to_node_b.node_origin.hasOwnProperty('arrData') ?
    state.sla_node_to_node_b.node_origin.arrData = payload :
    state.sla_node_to_node_b.node_origin.arrData = []
  },


  SET_SLA_NODE_TO_NODE_B_NODE_DESTINATION(state, payload) {
    state.sla_node_to_node_b.node_destination.value = payload
  },
  SET_SLA_NODE_TO_NODE_B_NODE_DESTINATION_ValueData(state, payload) {
    state.sla_node_to_node_b.node_destination.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_B_NODE_DESTINATION_ArrData(state, payload) {
    state.sla_node_to_node_b.node_destination.hasOwnProperty('arrData') ?
    state.sla_node_to_node_b.node_destination.arrData = payload :
    state.sla_node_to_node_b.node_destination.arrData = []
  },


  SET_SLA_NODE_TO_NODE_B_DELIVERY_ZONE(state, payload) {
    state.sla_node_to_node_b.delivery_zone.value = payload
  },
  SET_SLA_NODE_TO_NODE_B_DELIVERY_ZONE_ValueData(state, payload) {
    state.sla_node_to_node_b.delivery_zone.valueData = payload
  },  

  SET_SLA_NODE_TO_NODE_B_SLA(state, payload) {
    state.sla_node_to_node_b.sla.value = payload
  },
  SET_SLA_NODE_TO_NODE_B_SLA_ValueData(state, payload) {
    state.sla_node_to_node_b.sla.valueData = payload
  },
  SET_SLA_NODE_TO_NODE_B_SLA_ArrValueData(state, payload) {
    state.sla_node_to_node_b.sla.arrValueData = payload
  },


  SET_SLA_NODE_TO_NODE_B_IS_ACTIVE(state, payload) {
    state.sla_node_to_node_b.is_active.value = payload
  },
  SET_SLA_NODE_TO_NODE_B_IS_ACTIVE_ValueData(state, payload) {
    state.sla_node_to_node_b.is_active.valueData = payload
  },
  //====== END SLA NODE TO NODE B ======

  // ====== SLA BAG ======

  SET_SLA_BAG_SLA_ID(state, payload) {
    state.sla_bag.sla_id.value = payload
  },
  SET_SLA_BAG_SLA_ID_ValueData(state, payload) {
    state.sla_bag.sla_id.valueData = payload
  },
  SET_SLA_BAG_SLA_ID_visible(state, payload) {
    state.sla_bag.sla_id.visible = payload
  },

  SET_SLA_BAG_GROUP_NAME(state, payload) {
    state.sla_bag.group_name.value = payload
  },
  SET_SLA_BAG_GROUP_NAME_ValueData(state, payload) {
    state.sla_bag.group_name.valueData = payload
  },

  SET_SLA_BAG_START_DATE(state, payload) {
    state.sla_bag.start_date.value = payload
  },
  SET_SLA_BAG_START_DATE_ValueData(state, payload) {
    state.sla_bag.start_date.valueData = payload
  },

  SET_SLA_BAG_END_DATE(state, payload) {
    state.sla_bag.end_date.value = payload
  },
  SET_SLA_BAG_END_DATE_ValueData(state, payload) {
    state.sla_bag.end_date.valueData = payload
  },

  SET_SLA_BAG_BAG_TYPE(state, payload) {
    state.sla_bag.bag_type.value = payload
  },
  SET_SLA_BAG_BAG_TYPE_ValueData(state, payload) {
    state.sla_bag.bag_type.valueData = payload
  },
  SET_SLA_BAG_BAG_TYPE_ArrData(state, payload) {
    state.sla_bag.bag_type.hasOwnProperty('arrData') ?
    state.sla_bag.bag_type.arrData = payload :
    state.sla_bag.bag_type.arrData = []
  },

  SET_SLA_BAG_REFERENCE_ENTITY(state, payload) {
    state.sla_bag.reference_entity.value = payload
  },
  SET_SLA_BAG_REFERENCE_ENTITY_ValueData(state, payload) {
    state.sla_bag.reference_entity.valueData = payload
  },
  SET_SLA_BAG_REFERENCE_ENTITY_ArrData(state, payload) {
    state.sla_bag.reference_entity.hasOwnProperty('arrData') ?
    state.sla_bag.reference_entity.arrData = payload :
    state.sla_bag.reference_entity.arrData = []
  },

  SET_SLA_BAG_REFERENCE_VALUE(state, payload) {
    state.sla_bag.reference_value.value = payload
  },
  SET_SLA_BAG_REFERENCE_VALUE_ValueData(state, payload) {
    state.sla_bag.reference_value.valueData = payload
  },
  SET_SLA_BAG_REFERENCE_VALUE_ArrData(state, payload) {
    state.sla_bag.reference_value.hasOwnProperty('arrData') ?
    state.sla_bag.reference_value.arrData = payload :
    state.sla_bag.reference_value.arrData = []
  },

  SET_SLA_BAG_SLA_TYPE(state, payload) {
    state.sla_bag.sla_type.value = payload
  },
  SET_SLA_BAG_SLA_TYPE_ValueData(state, payload) {
    state.sla_bag.sla_type.valueData = payload
  },
  SET_SLA_BAG_SLA_TYPE_ArrData(state, payload) {
    state.sla_bag.sla_type.hasOwnProperty('arrData') ?
    state.sla_bag.sla_type.arrData = payload :
    state.sla_bag.sla_type.arrData = []
  },

  SET_SLA_BAG_BAG_ITEMS_QTY(state, payload) {
    state.sla_bag.bag_items_qty.value = payload
  },
  SET_SLA_BAG_BAG_ITEMS_QTY_ValueData(state, payload) {
    state.sla_bag.bag_items_qty.valueData = payload
  },

  SET_SLA_BAG_SLA(state, payload) {
    state.sla_bag.sla.value = payload
  },
  SET_SLA_BAG_SLA_ValueData(state, payload) {
    state.sla_bag.sla.valueData = payload
  },

  SET_SLA_BAG_IS_ACTIVE(state, payload) {
    state.sla_bag.is_active.value = payload
  },
  SET_SLA_BAG_IS_ACTIVE_ValueData(state, payload) {
    state.sla_bag.is_active.valueData = payload
  },
  // ====== END SLA BAG ======




  //====== CONFIGURATION WARNING RUNSHEET======  

  SET_CONFIGURATION_WARNING_RUNSHEET_SETTING_ID(state, payload) {
    state.configuration_warning_runsheet.setting_id.value = payload
  },
  SET_CONFIGURATION_WARNING_RUNSHEET_SETTING_ID_visible(state, payload) {
    state.configuration_warning_runsheet.setting_id.visible = payload
  },
  SET_CONFIGURATION_WARNING_RUNSHEET_SETTING_ID_ValueData(state, payload) {
    state.configuration_warning_runsheet.setting_id.valueData = payload
  },


  SET_CONFIGURATION_WARNING_RUNSHEET_PERCENTAGE(state, payload) {
    state.configuration_warning_runsheet.percentage.value = payload
  },
  SET_CONFIGURATION_WARNING_RUNSHEET_PERCENTAGE_ValueData(state, payload) {
    state.configuration_warning_runsheet.percentage.valueData = payload
  },


  SET_CONFIGURATION_WARNING_RUNSHEET_MINIMUM_COUNT(state, payload) {
    state.configuration_warning_runsheet.minimum_count.value = payload
  },
  SET_CONFIGURATION_WARNING_RUNSHEET_MINIMUM_COUNT_ValueData(state, payload) {
    state.configuration_warning_runsheet.minimum_count.valueData = payload
  },


  SET_CONFIGURATION_WARNING_RUNSHEET_REFERENCE(state, payload) {
    state.configuration_warning_runsheet.reference.value = payload
  },
  SET_CONFIGURATION_WARNING_RUNSHEET_REFERENCE_ValueData(state, payload) {
    state.configuration_warning_runsheet.reference.valueData = payload
  },
  SET_CONFIGURATION_WARNING_RUNSHEET_REFERENCE_ArrData(state, payload) {
    state.configuration_warning_runsheet.reference.hasOwnProperty('arrData') ?
    state.configuration_warning_runsheet.reference.arrData = payload :
    state.configuration_warning_runsheet.reference.arrData = []
  },


  SET_CONFIGURATION_WARNING_RUNSHEET_NODE_ID(state, payload) {
    state.configuration_warning_runsheet.node_id.value = payload
  },
  SET_CONFIGURATION_WARNING_RUNSHEET_NODE_ID_ValueData(state, payload) {
    state.configuration_warning_runsheet.node_id.valueData = payload
  },
  SET_CONFIGURATION_WARNING_RUNSHEET_NODE_ID_ArrData(state, payload) {
    state.configuration_warning_runsheet.node_id.hasOwnProperty('arrData') ?
    state.configuration_warning_runsheet.node_id.arrData = payload :
    state.configuration_warning_runsheet.node_id.arrData = []
  },

  //====== END CONFIGURATION WARNING RUNSHEET ======


  //====== CONFIGURATION WARNING SLA======  

  SET_CONFIGURATION_WARNING_SLA_SETTING_ID(state, payload) {
    state.configuration_warning_sla.setting_id.value = payload
  },
  SET_CONFIGURATION_WARNING_SLA_SETTING_ID_visible(state, payload) {
    state.configuration_warning_sla.setting_id.visible = payload
  },
  SET_CONFIGURATION_WARNING_SLA_SETTING_ID_ValueData(state, payload) {
    state.configuration_warning_sla.setting_id.valueData = payload
  },


  SET_CONFIGURATION_WARNING_SLA_FORMULA_TYPE(state, payload) {
    state.configuration_warning_sla.formula_type.value = payload
  },
  SET_CONFIGURATION_WARNING_SLA_FORMULA_TYPE_ValueData(state, payload) {
    state.configuration_warning_sla.formula_type.valueData = payload
  },
  SET_CONFIGURATION_WARNING_SLA_FORMULA_TYPE_ArrData(state, payload) {
    state.configuration_warning_sla.formula_type.hasOwnProperty('arrData') ?
    state.configuration_warning_sla.formula_type.arrData = payload :
    state.configuration_warning_sla.formula_type.arrData = []
  },


  SET_CONFIGURATION_WARNING_SLA_VALUE(state, payload) {
    state.configuration_warning_sla.value.value = payload
  },
  SET_CONFIGURATION_WARNING_SLA_VALUE_ValueData(state, payload) {
    state.configuration_warning_sla.value.valueData = payload
  },


  SET_CONFIGURATION_WARNING_SLA_NODE_ID(state, payload) {
    state.configuration_warning_sla.node_id.value = payload
  },
  SET_CONFIGURATION_WARNING_SLA_NODE_ID_ValueData(state, payload) {
    state.configuration_warning_sla.node_id.valueData = payload
  },
  SET_CONFIGURATION_WARNING_SLA_NODE_ID_ArrData(state, payload) {
    state.configuration_warning_sla.node_id.hasOwnProperty('arrData') ?
    state.configuration_warning_sla.node_id.arrData = payload :
    state.configuration_warning_sla.node_id.arrData = []
  },

  //====== END CONFIGURATION WARNING SLA ======

  //====== HELPDESK MOVE CONNOTE ======//
  SET_HELPDESK_MOVE_CONNOTE_NODE_LOCATION_ID(state, payload) {
    state.helpdesk_move_connote.node_location_id.value = payload
  },
  SET_HELPDESK_MOVE_CONNOTE_NODE_LOCATION_ID_ValueData(state, payload) {
    state.helpdesk_move_connote.node_location_id.valueData = payload
  },
  SET_HELPDESK_MOVE_CONNOTE_NODE_LOCATION_ID_ArrData(state, payload) {
    state.helpdesk_move_connote.node_location_id.hasOwnProperty('arrData') ?
    state.helpdesk_move_connote.node_location_id.arrData = payload :
    state.helpdesk_move_connote.node_location_id.arrData = []
  },
  //====== END HELPDESK MOVE CONNOTE ======//



  //====== HELPDESK MOVE BAG ======//
  SET_HELPDESK_MOVE_BAG_NODE_LOCATION_ID(state, payload) {
    state.helpdesk_move_bag.node_location_id.value = payload
  },
  SET_HELPDESK_MOVE_BAG_NODE_LOCATION_ID_ValueData(state, payload) {
    state.helpdesk_move_bag.node_location_id.valueData = payload
  },
  SET_HELPDESK_MOVE_BAG_NODE_LOCATION_ID_ArrData(state, payload) {
    state.helpdesk_move_bag.node_location_id.hasOwnProperty('arrData') ?
    state.helpdesk_move_bag.node_location_id.arrData = payload :
    state.helpdesk_move_bag.node_location_id.arrData = []
  },
  //====== END HELPDESK MOVE BAG ======//



  //====== HELPDESK EDIT CONNOTE ======//
  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_SHIPPER_NAME(state, payload) {
    state.helpdesk_edit_connote.connote_shipper_name.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_SHIPPER_NAME_ValueData(state, payload) {
    state.helpdesk_edit_connote.connote_shipper_name.valueData = payload
  },


  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_SHIPPER_STREET_ADDRESS(state, payload) {
    state.helpdesk_edit_connote.connote_shipper_street_address.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_SHIPPER_STREET_ADDRESS_ValueData(state, payload) {
    state.helpdesk_edit_connote.connote_shipper_street_address.valueData = payload
  },


  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_SHIPPER_EMAIL(state, payload) {
    state.helpdesk_edit_connote.connote_shipper_email.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_SHIPPER_EMAIL_ValueData(state, payload) {
    state.helpdesk_edit_connote.connote_shipper_email.valueData = payload
  },


  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_SHIPPER_PHONE_NUMBER(state, payload) {
    state.helpdesk_edit_connote.connote_shipper_phone_number.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_SHIPPER_PHONE_NUMBER_ValueData(state, payload) {
    state.helpdesk_edit_connote.connote_shipper_phone_number.valueData = payload
  },



  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_RECEIVER_NAME(state, payload) {
    state.helpdesk_edit_connote.connote_receiver_name.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_RECEIVER_NAME_ValueData(state, payload) {
    state.helpdesk_edit_connote.connote_receiver_name.valueData = payload
  },

  
  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_RECEIVER_ADMINISTRATIVE_ADDRESS(state, payload) {
    state.helpdesk_edit_connote.connote_receiver_administrative_address.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_RECEIVER_ADMINISTRATIVE_ADDRESS_ValueData(state, payload) {
    state.helpdesk_edit_connote.connote_receiver_administrative_address.valueData = payload
  },


  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_RECEIVER_EMAIL(state, payload) {
    state.helpdesk_edit_connote.connote_receiver_email.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_RECEIVER_EMAIL_ValueData(state, payload) {
    state.helpdesk_edit_connote.connote_receiver_email.valueData = payload
  },


  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_RECEIVER_PHONE_NUMBER(state, payload) {
    state.helpdesk_edit_connote.connote_receiver_phone_number.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_CONNOTE_RECEIVER_PHONE_NUMBER_ValueData(state, payload) {
    state.helpdesk_edit_connote.connote_receiver_phone_number.valueData = payload
  },


  SET_HELPDESK_EDIT_CONNOTE_AMOUNT_COD(state, payload) {
    state.helpdesk_edit_connote.amount_cod.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_AMOUNT_COD_ValueData(state, payload) {
    state.helpdesk_edit_connote.amount_cod.valueData = payload
  },


  SET_HELPDESK_EDIT_CONNOTE_AMOUNT_TARIFF(state, payload) {
    state.helpdesk_edit_connote.amount_tariff.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_AMOUNT_TARIFF_ValueData(state, payload) {
    state.helpdesk_edit_connote.amount_tariff.valueData = payload
  },


  SET_HELPDESK_EDIT_CONNOTE_REMARKS(state, payload) {
    state.helpdesk_edit_connote.remarks.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_REMARKS_ValueData(state, payload) {
    state.helpdesk_edit_connote.remarks.valueData = payload
  },

  SET_HELPDESK_EDIT_CONNOTE_SERVICE(state, payload) {
    state.helpdesk_edit_connote.connote_service_code.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_SERVICE_ValueData(state, payload) {
    state.helpdesk_edit_connote.connote_service_code.valueData = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_SERVICE_arrData(state, payload) {
    state.helpdesk_edit_connote.connote_service_code.arrData = payload
  },

  SET_HELPDESK_EDIT_CONNOTE_WEIGHT(state, payload) {
    state.helpdesk_edit_connote.connote_actual_weight.value = payload
  },
  SET_HELPDESK_EDIT_CONNOTE_WEIGHT_ValueData(state, payload) {
    state.helpdesk_edit_connote.connote_actual_weight.valueData = payload
  },


  //====== END HELPDESK EDIT CONNOTE ======//



  //====== FACILITY CODE ======  

  SET_FACILITY_CODE_USER_ID(state, payload) {
    state.facility_code.user_id.value = payload
  },
  SET_FACILITY_CODE_USER_ID_ValueData(state, payload) {
    state.facility_code.user_id.valueData = payload
  },
  SET_FACILITY_CODE_USER_ID_ArrData(state, payload) {
    state.facility_code.user_id.hasOwnProperty('arrData') ?
    state.facility_code.user_id.arrData = payload :
    state.facility_code.user_id.arrData = []
  },


  SET_FACILITY_CODE_CODE(state, payload) {
    state.facility_code.code.value = payload
  },
  SET_FACILITY_CODE_CODE_ValueData(state, payload) {
    state.facility_code.code.valueData = payload
  },


  SET_FACILITY_CODE_NAME(state, payload) {
    state.facility_code.name.value = payload
  },
  SET_FACILITY_CODE_NAME_ValueData(state, payload) {
    state.facility_code.name.valueData = payload
  },


  SET_FACILITY_CODE_ADDRESS(state, payload) {
    state.facility_code.address.value = payload
  },
  SET_FACILITY_CODE_ADDRESS_ValueData(state, payload) {
    state.facility_code.address.valueData = payload
  },


  SET_FACILITY_CODE_FACILITY_TYPE(state, payload) {
    state.facility_code.facility_type.value = payload
  },
  SET_FACILITY_CODE_FACILITY_TYPE_ValueData(state, payload) {
    state.facility_code.facility_type.valueData = payload
  },


  SET_FACILITY_CODE_DESTINATION(state, payload) {
    state.facility_code.destination.value = payload
  },
  SET_FACILITY_CODE_DESTINATION_ValueData(state, payload) {
    state.facility_code.destination.valueData = payload
  },

  //====== END FACILITY CODE ======



  //====== KPI PROCESS TARGET ======//

  SET_KPI_PROCESS_TARGET_REFERENCE_VALUE(state, payload) {
    state.kpi_process_target.reference_value.value = payload
  },
  SET_KPI_PROCESS_TARGET_REFERENCE_VALUE_ValueData(state, payload) {
    state.kpi_process_target.reference_value.valueData = payload
  },
  SET_KPI_PROCESS_TARGET_REFERENCE_VALUE_ArrData(state, payload) {
    state.kpi_process_target.reference_value.hasOwnProperty('arrData') ?
    state.kpi_process_target.reference_value.arrData = payload :
    state.kpi_process_target.reference_value.arrData = []
  },


  SET_KPI_PROCESS_TARGET_REFERENCE_ENTITY(state, payload) {
    state.kpi_process_target.reference_entity.value = payload
  },
  SET_KPI_PROCESS_TARGET_REFERENCE_ENTITY_ValueData(state, payload) {
    state.kpi_process_target.reference_entity.valueData = payload
  },
  SET_KPI_PROCESS_TARGET_REFERENCE_ENTITY_ArrData(state, payload) {
    state.kpi_process_target.reference_entity.hasOwnProperty('arrData') ?
    state.kpi_process_target.reference_entity.arrData = payload :
    state.kpi_process_target.reference_entity.arrData = []
  },


  SET_KPI_PROCESS_TARGET_PROCESS_NAME(state, payload) {
    state.kpi_process_target.process_name.value = payload
  },
  SET_KPI_PROCESS_TARGET_PROCESS_NAME_ValueData(state, payload) {
    state.kpi_process_target.process_name.valueData = payload
  },
  SET_KPI_PROCESS_TARGET_PROCESS_NAME_ArrData(state, payload) {
    state.kpi_process_target.process_name.hasOwnProperty('arrData') ?
    state.kpi_process_target.process_name.arrData = payload :
    state.kpi_process_target.process_name.arrData = []
  },


  SET_KPI_PROCESS_TARGET_VALUE(state, payload) {
    state.kpi_process_target.value.value = payload
  },
  SET_KPI_PROCESS_TARGET_VALUE_ValueData(state, payload) {
    state.kpi_process_target.value.valueData = payload
  },


  SET_KPI_PROCESS_TARGET_DESCRIPTION(state, payload) {
    state.kpi_process_target.description.value = payload
  },
  SET_KPI_PROCESS_TARGET_DESCRIPTION_ValueData(state, payload) {
    state.kpi_process_target.description.valueData = payload
  },


  SET_KPI_PROCESS_TARGET_START_DATE(state, payload) {
    state.kpi_process_target.start_date.value = payload
  },
  SET_KPI_PROCESS_TARGET_START_DATE_ValueData(state, payload) {
    state.kpi_process_target.start_date.valueData = payload
  },
  SET_KPI_PROCESS_TARGET_START_DATE_ArrData(state, payload) {
    state.kpi_process_target.start_date.hasOwnProperty('arrData') ?
    state.kpi_process_target.start_date.arrData = payload :
    state.kpi_process_target.start_date.arrData = []
  },


  SET_KPI_PROCESS_TARGET_END_DATE(state, payload) {
    state.kpi_process_target.end_date.value = payload
  },
  SET_KPI_PROCESS_TARGET_END_DATE_ValueData(state, payload) {
    state.kpi_process_target.end_date.valueData = payload
  },
  SET_KPI_PROCESS_TARGET_END_DATE_ArrData(state, payload) {
    state.kpi_process_target.end_date.hasOwnProperty('arrData') ?
    state.kpi_process_target.end_date.arrData = payload :
    state.kpi_process_target.end_date.arrData = []
  },

  //====== END KPI PROCESS TARGET ======//

  //====== CONNOTE FORWARD ======//
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADDRESS_TYPE(state, payload) {
    state.connote_forward.connote_receiver_address_type.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADDRESS_TYPE_isDisabled(state, payload) {
    state.connote_forward.connote_receiver_address_type.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADDRESS_TYPE_ValueData(state, payload) {
    state.connote_forward.connote_receiver_address_type.valueData = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADDRESS_TYPE_ArrData(state, payload) {
    state.connote_forward.connote_receiver_address_type.hasOwnProperty('arrData') ?
    state.connote_forward.connote_receiver_address_type.arrData = payload :
    state.connote_forward.connote_receiver_address_type.arrData = []
  },

  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_NAME(state, payload) {
    state.connote_forward.connote_shipper_name.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_NAME_isDisabled(state, payload) {
    state.connote_forward.connote_shipper_name.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_NAME_ValueData(state, payload) {
    state.connote_forward.connote_shipper_name.valueData = payload
  },

  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_PHONE_NUMBER(state, payload) {
    state.connote_forward.connote_shipper_phone_number.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_PHONE_NUMBER_isDisabled(state, payload) {
    state.connote_forward.connote_shipper_phone_number.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_PHONE_NUMBER_ValueData(state, payload) {
    state.connote_forward.connote_shipper_phone_number.valueData = payload
  },

  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_EMAIL(state, payload) {
    state.connote_forward.connote_shipper_email.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_EMAIL_isDisabled(state, payload) {
    state.connote_forward.connote_shipper_email.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_EMAIL_ValueData(state, payload) {
    state.connote_forward.connote_shipper_email.valueData = payload
  },

  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_STREET_ADDRESS(state, payload) {
    state.connote_forward.connote_shipper_street_address.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_STREET_ADDRESS_isDisabled(state, payload) {
    state.connote_forward.connote_shipper_street_address.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_STREET_ADDRESS_ValueData(state, payload) {
    state.connote_forward.connote_shipper_street_address.valueData = payload
  },

  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ADMINISTRATIVE_ADDRESS(state, payload) {
    state.connote_forward.connote_shipper_administrative_address.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ADMINISTRATIVE_ADDRESS_isDisabled(state, payload) {
    state.connote_forward.connote_shipper_administrative_address.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ADMINISTRATIVE_ADDRESS_ValueData(state, payload) {
    state.connote_forward.connote_shipper_administrative_address.valueData = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ADMINISTRATIVE_ADDRESS_ArrData(state, payload) {
    state.connote_forward.connote_shipper_administrative_address.hasOwnProperty('arrData') ?
      state.connote_forward.connote_shipper_administrative_address.arrData = payload :
      state.connote_forward.connote_shipper_administrative_address.arrData = []
  },

  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ZIP_CODE(state, payload) {
    state.connote_forward.connote_shipper_zip_code.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ZIP_CODE_isDisabled(state, payload) {
    state.connote_forward.connote_shipper_zip_code.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ZIP_CODE_ValueData(state, payload) {
    state.connote_forward.connote_shipper_zip_code.valueData = payload
  },

  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_TARIFF_CODE(state, payload) {
    state.connote_forward.connote_shipper_tariff_code.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_TARIFF_CODE_isDisabled(state, payload) {
    state.connote_forward.connote_shipper_tariff_code.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_TARIFF_CODE_ValueData(state, payload) {
    state.connote_forward.connote_shipper_tariff_code.valueData = payload
  },





  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_NAME(state, payload) {
    state.connote_forward.connote_receiver_name.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_NAME_isDisabled(state, payload) {
    state.connote_forward.connote_receiver_name.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_NAME_ValueData(state, payload) {
    state.connote_forward.connote_receiver_name.valueData = payload
  },

  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_PHONE_NUMBER(state, payload) {
    state.connote_forward.connote_receiver_phone_number.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_PHONE_NUMBER_isDisabled(state, payload) {
    state.connote_forward.connote_receiver_phone_number.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_PHONE_NUMBER_ValueData(state, payload) {
    state.connote_forward.connote_receiver_phone_number.valueData = payload
  },

  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_EMAIL(state, payload) {
    state.connote_forward.connote_receiver_email.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_EMAIL_isDisabled(state, payload) {
    state.connote_forward.connote_receiver_email.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_EMAIL_ValueData(state, payload) {
    state.connote_forward.connote_receiver_email.valueData = payload
  },

  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_STREET_ADDRESS(state, payload) {
    state.connote_forward.connote_receiver_street_address.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_STREET_ADDRESS_isDisabled(state, payload) {
    state.connote_forward.connote_receiver_street_address.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_STREET_ADDRESS_ValueData(state, payload) {
    state.connote_forward.connote_receiver_street_address.valueData = payload
  },

  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADMINISTRATIVE_ADDRESS(state, payload) {
    state.connote_forward.connote_receiver_administrative_address.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADMINISTRATIVE_ADDRESS_isDisabled(state, payload) {
    state.connote_forward.connote_receiver_administrative_address.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADMINISTRATIVE_ADDRESS_ValueData(state, payload) {
    state.connote_forward.connote_receiver_administrative_address.valueData = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADMINISTRATIVE_ADDRESS_ArrData(state, payload) {
    state.connote_forward.connote_receiver_administrative_address.hasOwnProperty('arrData') ?
      state.connote_forward.connote_receiver_administrative_address.arrData = payload :
      state.connote_forward.connote_receiver_administrative_address.arrData = []
  },

  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ZIP_CODE(state, payload) {
    state.connote_forward.connote_receiver_zip_code.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ZIP_CODE_isDisabled(state, payload) {
    state.connote_forward.connote_receiver_zip_code.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ZIP_CODE_ValueData(state, payload) {
    state.connote_forward.connote_receiver_zip_code.valueData = payload
  },

  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_TARIFF_CODE(state, payload) {
    state.connote_forward.connote_receiver_tariff_code.value = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_TARIFF_CODE_isDisabled(state, payload) {
    state.connote_forward.connote_receiver_tariff_code.isDisabled = payload
  },
  SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_TARIFF_CODE_ValueData(state, payload) {
    state.connote_forward.connote_receiver_tariff_code.valueData = payload
  },
  //====== END CONNOTE FORWARD ======//


  //====== BAG WEIGHT SETTINGS ======//

  SET_BAG_WEIGHT_BAG_TYPE(state, payload) {
    state.bag_weight.bag_type.value = payload
  },
  SET_BAG_WEIGHT_BAG_TYPE_ValueData(state, payload) {
    state.bag_weight.bag_type.valueData = payload
  },
  SET_BAG_WEIGHT_BAG_TYPE_ArrData(state, payload) {
    state.bag_weight.bag_type.hasOwnProperty('arrData') ?
    state.bag_weight.bag_type.arrData = payload :
    state.bag_weight.bag_type.arrData = []
  },


  SET_BAG_WEIGHT_ROUTING_TYPE(state, payload) {
    state.bag_weight.routing_type.value = payload
  },
  SET_BAG_WEIGHT_ROUTING_TYPE_ValueData(state, payload) {
    state.bag_weight.routing_type.valueData = payload
  },
  SET_BAG_WEIGHT_ROUTING_TYPE_ArrData(state, payload) {
    state.bag_weight.routing_type.hasOwnProperty('arrData') ?
    state.bag_weight.routing_type.arrData = payload :
    state.bag_weight.routing_type.arrData = []
  },


  SET_BAG_WEIGHT_SERVICE_TYPE(state, payload) {
    state.bag_weight.service_type.value = payload
  },
  SET_BAG_WEIGHT_SERVICE_TYPE_ValueData(state, payload) {
    state.bag_weight.service_type.valueData = payload
  },
  SET_BAG_WEIGHT_SERVICE_TYPE_ArrData(state, payload) {
    state.bag_weight.service_type.hasOwnProperty('arrData') ?
    state.bag_weight.service_type.arrData = payload :
    state.bag_weight.service_type.arrData = []
  },


  SET_BAG_WEIGHT_DESTINATION(state, payload) {
    state.bag_weight.destination.value = payload
  },
  SET_BAG_WEIGHT_DESTINATION_ValueData(state, payload) {
    state.bag_weight.destination.valueData = payload
  },
  SET_BAG_WEIGHT_DESTINATION_ArrData(state, payload) {
    state.bag_weight.destination.hasOwnProperty('arrData') ?
    state.bag_weight.destination.arrData = payload :
    state.bag_weight.destination.arrData = []
  },

  //====== END BAG WEIGHT SETTINGS ======//



  //====== BAG LIMIT SETTINGS ======//

  SET_BAG_LIMIT_BAG_TYPE(state, payload) {
    state.bag_limit.bag_type.value = payload
  },
  SET_BAG_LIMIT_BAG_TYPE_ValueData(state, payload) {
    state.bag_limit.bag_type.valueData = payload
  },
  SET_BAG_LIMIT_BAG_TYPE_ArrData(state, payload) {
    state.bag_limit.bag_type.hasOwnProperty('arrData') ?
    state.bag_limit.bag_type.arrData = payload :
    state.bag_limit.bag_type.arrData = []
  },


  SET_BAG_LIMIT_REFERENCE_VALUE(state, payload) {
    state.bag_limit.reference_value.value = payload
  },
  SET_BAG_LIMIT_REFERENCE_VALUE_ValueData(state, payload) {
    state.bag_limit.reference_value.valueData = payload
  },
  SET_BAG_LIMIT_REFERENCE_VALUE_ArrData(state, payload) {
    state.bag_limit.reference_value.hasOwnProperty('arrData') ?
    state.bag_limit.reference_value.arrData = payload :
    state.bag_limit.reference_value.arrData = []
  },


  SET_BAG_LIMIT_REFERENCE_ENTITY(state, payload) {
    state.bag_limit.reference_entity.value = payload
  },
  SET_BAG_LIMIT_REFERENCE_ENTITY_ValueData(state, payload) {
    state.bag_limit.reference_entity.valueData = payload
  },
  SET_BAG_LIMIT_REFERENCE_ENTITY_ArrData(state, payload) {
    state.bag_limit.reference_entity.hasOwnProperty('arrData') ?
    state.bag_limit.reference_entity.arrData = payload :
    state.bag_limit.reference_entity.arrData = []
  },


  SET_BAG_LIMIT_LIMIT(state, payload) {
    state.bag_limit.limit.value = payload
  },
  SET_BAG_LIMIT_LIMIT_ValueData(state, payload) {
    state.bag_limit.limit.valueData = payload
  },


  //====== END BAG LIMIT SETTINGS ======//



  //====== RUNSHEET LIMIT SETTINGS ======//

  SET_RUNSHEET_LIMIT_REFERENCE_TO(state, payload) {
    state.runsheet_limit.reference_to.value = payload
  },
  SET_RUNSHEET_LIMIT_REFERENCE_TO_ValueData(state, payload) {
    state.runsheet_limit.reference_to.valueData = payload
  },
  SET_RUNSHEET_LIMIT_REFERENCE_TO_ArrData(state, payload) {
    state.runsheet_limit.reference_to.hasOwnProperty('arrData') ?
    state.runsheet_limit.reference_to.arrData = payload :
    state.runsheet_limit.reference_to.arrData = []
  },


  SET_RUNSHEET_LIMIT_REFERENCE_VALUE(state, payload) {
    state.runsheet_limit.reference_value.value = payload
  },
  SET_RUNSHEET_LIMIT_REFERENCE_VALUE_ValueData(state, payload) {
    state.runsheet_limit.reference_value.valueData = payload
  },
  SET_RUNSHEET_LIMIT_REFERENCE_VALUE_ArrData(state, payload) {
    state.runsheet_limit.reference_value.hasOwnProperty('arrData') ?
    state.runsheet_limit.reference_value.arrData = payload :
    state.runsheet_limit.reference_value.arrData = []
  },


  SET_RUNSHEET_LIMIT_REFERENCE_ENTITY(state, payload) {
    state.runsheet_limit.reference_entity.value = payload
  },
  SET_RUNSHEET_LIMIT_REFERENCE_ENTITY_ValueData(state, payload) {
    state.runsheet_limit.reference_entity.valueData = payload
  },
  SET_RUNSHEET_LIMIT_REFERENCE_ENTITY_ArrData(state, payload) {
    state.runsheet_limit.reference_entity.hasOwnProperty('arrData') ?
    state.runsheet_limit.reference_entity.arrData = payload :
    state.runsheet_limit.reference_entity.arrData = []
  },


  SET_RUNSHEET_LIMIT_IS_ACTIVE(state, payload) {
    state.runsheet_limit.is_active.value = payload
  },
  SET_RUNSHEET_LIMIT_IS_ACTIVE_ValueData(state, payload) {
    state.runsheet_limit.is_active.valueData = payload
  },


  //====== END RUNSHEET LIMIT SETTINGS ======//


  //====== COURIER DELIVERY AREA SETTINGS ======//

  SET_COURIER_DELIVERY_AREA_COURIER_ID(state, payload) {
    state.courier_delivery_area.courier_id.value = payload
  },
  SET_COURIER_DELIVERY_AREA_COURIER_ID_ValueData(state, payload) {
    state.courier_delivery_area.courier_id.valueData = payload
  },
  SET_COURIER_DELIVERY_AREA_COURIER_ID_ArrData(state, payload) {
    state.courier_delivery_area.courier_id.hasOwnProperty('arrData') ?
    state.courier_delivery_area.courier_id.arrData = payload :
    state.courier_delivery_area.courier_id.arrData = []
  },
  SET_COURIER_DELIVERY_AREA_COURIER_ID_isDisabled(state, payload) {
    state.courier_delivery_area.courier_id.isDisabled = payload
  },


  SET_COURIER_DELIVERY_AREA_AREA_TYPE(state, payload) {
    state.courier_delivery_area.area_type.value = payload
  },
  SET_COURIER_DELIVERY_AREA_AREA_TYPE_ValueData(state, payload) {
    state.courier_delivery_area.area_type.valueData = payload
  },
  SET_COURIER_DELIVERY_AREA_AREA_TYPE_ArrData(state, payload) {
    state.courier_delivery_area.area_type.hasOwnProperty('arrData') ?
    state.courier_delivery_area.area_type.arrData = payload :
    state.courier_delivery_area.area_type.arrData = []
  },


  SET_COURIER_DELIVERY_AREA_AREA_VALUE(state, payload) {
    state.courier_delivery_area.area_value.value = payload
  },
  SET_COURIER_DELIVERY_AREA_AREA_VALUE_ValueData(state, payload) {
    state.courier_delivery_area.area_value.valueData = payload
  },
  SET_COURIER_DELIVERY_AREA_AREA_VALUE_ArrData(state, payload) {
    state.courier_delivery_area.area_value.hasOwnProperty('arrData') ?
    state.courier_delivery_area.area_value.arrData = payload :
    state.courier_delivery_area.area_value.arrData = []
  },

  //====== END COURIER DELIVERY AREA SETTINGS ======//


  //====== APPLICATION ROLE SETTINGS ======//

  SET_APPLICATION_ROLE_APP(state, payload) {
    state.application_role.app.value = payload
  },
  SET_APPLICATION_ROLE_APP_ValueData(state, payload) {
    state.application_role.app.valueData = payload
  },
  SET_APPLICATION_ROLE_APP_ArrData(state, payload) {
    state.application_role.app.hasOwnProperty('arrData') ?
    state.application_role.app.arrData = payload :
    state.application_role.app.arrData = []
  },


  SET_APPLICATION_ROLE_APP_ROLE_NAME(state, payload) {
    state.application_role.app_role_name.value = payload
  },
  SET_APPLICATION_ROLE_APP_ROLE_NAME_ValueData(state, payload) {
    state.application_role.app_role_name.valueData = payload
  },
  SET_APPLICATION_ROLE_APP_ROLE_NAME_ArrData(state, payload) {
    state.application_role.app_role_name.hasOwnProperty('arrData') ?
    state.application_role.app_role_name.arrData = payload :
    state.application_role.app_role_name.arrData = []
  },


  SET_APPLICATION_ROLE_APP_ROLE_CODE(state, payload) {
    state.application_role.app_role_code.value = payload
  },
  SET_APPLICATION_ROLE_APP_ROLE_CODE_ValueData(state, payload) {
    state.application_role.app_role_code.valueData = payload
  },
  SET_APPLICATION_ROLE_APP_ROLE_CODE_ArrData(state, payload) {
    state.application_role.app_role_code.hasOwnProperty('arrData') ?
    state.application_role.app_role_code.arrData = payload :
    state.application_role.app_role_code.arrData = []
  },

  //====== END APPLICATION ROLE SETTINGS ======//
  
  
  SET_BAG_IS_AUTO_OPEN_BAG(state, payload) {
    state.bag_is_auto_open_bag.bag_is_auto_open_bag.value = payload || false;
  },

  SET_BAG_IS_AUTO_OPEN_BAG_ValueData(state, payload) {
    state.bag_is_auto_open_bag.bag_is_auto_open_bag.valueData = payload || false;
  },

  // ====== VALIDATION HUB DELIVERY ======//
  SET_IS_HUB_DELIVERY_VALIDATION(state, payload) {
    state.is_hub_delivery_validation.value = payload || false
  },

  SET_IS_HUB_DELIVERY_VALIDATION_ValueData(state, payload) {
    state.is_hub_delivery_validation.valueData = payload || false
  },

  //====== DESTINATION ZIP CODE ======//

  SET_DESTINATION_ZIP_CODE_REFERENCE_VALUE(state, payload) {
    state.destination_zip_code.reference_value.value = payload
  },
  SET_DESTINATION_ZIP_CODE_REFERENCE_VALUE_ValueData(state, payload) {
    state.destination_zip_code.reference_value.valueData = payload
  },
  SET_DESTINATION_ZIP_CODE_REFERENCE_VALUE_ArrData(state, payload) {
    state.destination_zip_code.reference_value.hasOwnProperty('arrData') ?
    state.destination_zip_code.reference_value.arrData = payload :
    state.destination_zip_code.reference_value.arrData = []
  },


  SET_DESTINATION_ZIP_CODE_REFERENCE_ENTITY(state, payload) {
    state.destination_zip_code.reference_entity.value = payload
  },
  SET_DESTINATION_ZIP_CODE_REFERENCE_ENTITY_ValueData(state, payload) {
    state.destination_zip_code.reference_entity.valueData = payload
  },
  SET_DESTINATION_ZIP_CODE_REFERENCE_ENTITY_ArrData(state, payload) {
    state.destination_zip_code.reference_entity.hasOwnProperty('arrData') ?
    state.destination_zip_code.reference_entity.arrData = payload :
    state.destination_zip_code.reference_entity.arrData = []
  },


  SET_DESTINATION_ZIP_CODE_ZIP_CODE(state, payload) {
    state.destination_zip_code.zip_code.value = payload
  },
  SET_DESTINATION_ZIP_CODE_ZIP_CODE_ValueData(state, payload) {
    state.destination_zip_code.zip_code.valueData = payload
  },
  SET_DESTINATION_ZIP_CODE_ZIP_CODE_ArrData(state, payload) {
    state.destination_zip_code.zip_code.hasOwnProperty('arrData') ?
    state.destination_zip_code.zip_code.arrData = payload :
    state.destination_zip_code.zip_code.arrData = []
  },

  //====== END DESTINATION ZIP CODE ======//



  //====== DESTINATION SORTING LOV ======//

  SET_DESTINATION_SORTING_LOV_REFERENCE_TO(state, payload) {
    state.destination_sorting_lov.reference_to.value = payload
  },
  SET_DESTINATION_SORTING_LOV_REFERENCE_TO_ValueData(state, payload) {
    state.destination_sorting_lov.reference_to.valueData = payload
  },
  SET_DESTINATION_SORTING_LOV_REFERENCE_TO_ArrData(state, payload) {
    state.destination_sorting_lov.reference_to.hasOwnProperty('arrData') ?
    state.destination_sorting_lov.reference_to.arrData = payload :
    state.destination_sorting_lov.reference_to.arrData = []
  },


  SET_DESTINATION_SORTING_LOV_REFERENCE_ENTITY(state, payload) {
    state.destination_sorting_lov.reference_entity.value = payload
  },
  SET_DESTINATION_SORTING_LOV_REFERENCE_ENTITY_ValueData(state, payload) {
    state.destination_sorting_lov.reference_entity.valueData = payload
  },
  SET_DESTINATION_SORTING_LOV_REFERENCE_ENTITY_ArrData(state, payload) {
    state.destination_sorting_lov.reference_entity.hasOwnProperty('arrData') ?
    state.destination_sorting_lov.reference_entity.arrData = payload :
    state.destination_sorting_lov.reference_entity.arrData = []
  },


  SET_DESTINATION_SORTING_LOV_REFERENCE_VALUE(state, payload) {
    state.destination_sorting_lov.reference_value.value = payload
  },
  SET_DESTINATION_SORTING_LOV_REFERENCE_VALUE_ValueData(state, payload) {
    state.destination_sorting_lov.reference_value.valueData = payload
  },
  SET_DESTINATION_SORTING_LOV_REFERENCE_VALUE_ArrData(state, payload) {
    state.destination_sorting_lov.reference_value.hasOwnProperty('arrData') ?
    state.destination_sorting_lov.reference_value.arrData = payload :
    state.destination_sorting_lov.reference_value.arrData = []
  },  


  SET_DESTINATION_SORTING_LOV_ITEM_TYPE(state, payload) {
    state.destination_sorting_lov.item_type.value = payload
  },
  SET_DESTINATION_SORTING_LOV_ITEM_TYPE_ValueData(state, payload) {
    state.destination_sorting_lov.item_type.valueData = payload
  },
  SET_DESTINATION_SORTING_LOV_ITEM_TYPE_ArrData(state, payload) {
    state.destination_sorting_lov.item_type.hasOwnProperty('arrData') ?
    state.destination_sorting_lov.item_type.arrData = payload :
    state.destination_sorting_lov.item_type.arrData = []
  },  


  SET_DESTINATION_SORTING_LOV_DESTINATION_NODE_CODE(state, payload) {
    state.destination_sorting_lov.destination_node_code.value = payload
  },
  SET_DESTINATION_SORTING_LOV_DESTINATION_NODE_CODE_ValueData(state, payload) {
    state.destination_sorting_lov.destination_node_code.valueData = payload
  },
  SET_DESTINATION_SORTING_LOV_DESTINATION_NODE_CODE_ArrData(state, payload) {
    state.destination_sorting_lov.destination_node_code.hasOwnProperty('arrData') ?
    state.destination_sorting_lov.destination_node_code.arrData = payload :
    state.destination_sorting_lov.destination_node_code.arrData = []
  },  


  SET_DESTINATION_SORTING_LOV_IS_ACTIVE(state, payload) {
    state.destination_sorting_lov.is_active.value = payload
  },
  SET_DESTINATION_SORTING_LOV_IS_ACTIVE_ValueData(state, payload) {
    state.destination_sorting_lov.is_active.valueData = payload
  },

  SET_DESTINATION_SORTING_LOV_IS_SMARTPOINT(state, payload) {
    state.destination_sorting_lov.is_smartpoint.value = payload
  },
  SET_DESTINATION_SORTING_LOV_IS_SMARTPOINT_ValueData(state, payload) {
    state.destination_sorting_lov.is_smartpoint.valueData = payload
  },


  //====== END DESTINATION SORTING LOV ======//



  //====== SURAT MUATAN STOCK ======//

  SET_SURAT_MUATAN_STOCK_VEHICLE_ID(state, payload) {
    state.surat_muatan_stock.vehicle_id.value = payload
  },
  SET_SURAT_MUATAN_STOCK_VEHICLE_ID_ValueData(state, payload) {
    state.surat_muatan_stock.vehicle_id.valueData = payload
  },
  SET_SURAT_MUATAN_STOCK_VEHICLE_ID_ArrData(state, payload) {
    state.surat_muatan_stock.vehicle_id.hasOwnProperty('arrData') ?
    state.surat_muatan_stock.vehicle_id.arrData = payload :
    state.surat_muatan_stock.vehicle_id.arrData = []
  },
  
  
  SET_SURAT_MUATAN_STOCK_NO_SM(state, payload) {
    state.surat_muatan_stock.no_sm.value = payload
  },
  SET_SURAT_MUATAN_STOCK_NO_SM_ValueData(state, payload) {
    state.surat_muatan_stock.no_sm.valueData = payload
  },
  SET_SURAT_MUATAN_STOCK_NO_SM_ArrData(state, payload) {
    state.surat_muatan_stock.no_sm.hasOwnProperty('arrData') ?
    state.surat_muatan_stock.no_sm.arrData = payload :
    state.surat_muatan_stock.no_sm.arrData = []
  },


  SET_SURAT_MUATAN_STOCK_ETA(state, payload) {
    state.surat_muatan_stock.eta.value = payload
  },
  SET_SURAT_MUATAN_STOCK_ETA_ValueData(state, payload) {
    state.surat_muatan_stock.eta.valueData = payload
  },


  SET_SURAT_MUATAN_STOCK_ETD(state, payload) {
    state.surat_muatan_stock.etd.value = payload
  },
  SET_SURAT_MUATAN_STOCK_ETD_ValueData(state, payload) {
    state.surat_muatan_stock.etd.valueData = payload
  },


  SET_SURAT_MUATAN_STOCK_IS_ACTIVE(state, payload) {
    state.surat_muatan_stock.is_active.value = payload
  },
  SET_SURAT_MUATAN_STOCK_IS_ACTIVE_ValueData(state, payload) {
    state.surat_muatan_stock.is_active.valueData = payload
  },


  //====== END SURAT MUATAN STOCK ======//

  //====== SURAT MUATAN SCHEDULE ======//
  SET_SURAT_MUATAN_SCHEDULE_VEHICLE_TYPE_ID(state, payload) {
  state.surat_muatan_schedule.vehicle_type_id.value = payload;
  },

  SET_SURAT_MUATAN_SCHEDULE_VEHICLE_TYPE_ID_ValueData(state, payload) {
    state.surat_muatan_schedule.vehicle_type_id.valueData = payload;
  },

  SET_SURAT_MUATAN_SCHEDULE_VEHICLE_TYPE_ID_ArrData(state, payload) {
    state.surat_muatan_schedule.vehicle_type_id.hasOwnProperty('arrData')
      ? state.surat_muatan_schedule.vehicle_type_id.arrData = payload
      : state.surat_muatan_schedule.vehicle_type_id.arrData = [];
  },

  SET_SURAT_MUATAN_SCHEDULE_VEHICLE_ID(state, payload) {
    state.surat_muatan_schedule.vehicle_id.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_VEHICLE_ID_ValueData(state, payload) {
    state.surat_muatan_schedule.vehicle_id.valueData = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_VEHICLE_ID_ArrData(state, payload) {
    state.surat_muatan_schedule.vehicle_id.hasOwnProperty('arrData') ?
    state.surat_muatan_schedule.vehicle_id.arrData = payload :
    state.surat_muatan_schedule.vehicle_id.arrData = []
  },

  SET_SURAT_MUATAN_SCHEDULE_SHIPMENT_NUMBER(state, payload) {
    state.surat_muatan_schedule.shipment_number.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_SHIPMENT_NUMBER_ValueData(state, payload) {
    state.surat_muatan_schedule.shipment_number.valueData = payload
  },

  SET_SURAT_MUATAN_SCHEDULE_ORIGIN_NAME(state, payload) {
    state.surat_muatan_schedule.origin_name.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_ORIGIN_NAME_ValueData(state, payload) {
    state.surat_muatan_schedule.origin_name.valueData = payload
  },

  SET_SURAT_MUATAN_SCHEDULE_ORIGIN_IDENTIFIER(state, payload) {
    state.surat_muatan_schedule.origin_identifier.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_ORIGIN_IDENTIFIER_ValueData(state, payload) {
    state.surat_muatan_schedule.origin_identifier.valueData = payload
  },

  SET_SURAT_MUATAN_SCHEDULE_ORIGIN_POINT(state, payload) {
    state.surat_muatan_schedule.origin_point.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_ORIGIN_POINT_ValueData(state, payload) {
    state.surat_muatan_schedule.origin_point.valueData = payload
  },

  SET_SURAT_MUATAN_SCHEDULE_DESTINATION_NAME(state, payload) {
    state.surat_muatan_schedule.destination_name.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_DESTINATION_NAME_ValueData(state, payload) {
    state.surat_muatan_schedule.destination_name.valueData = payload
  },

  SET_SURAT_MUATAN_SCHEDULE_DESTINATION_IDENTIFIER(state, payload) {
    state.surat_muatan_schedule.destination_identifier.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_DESTINATION_IDENTIFIER_ValueData(state, payload) {
    state.surat_muatan_schedule.destination_identifier.valueData = payload
  },

  SET_SURAT_MUATAN_SCHEDULE_DESTINATION_POINT(state, payload) {
    state.surat_muatan_schedule.destination_point.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_DESTINATION_POINT_ValueData(state, payload) {
    state.surat_muatan_schedule.destination_point.valueData = payload
  },

  SET_SURAT_MUATAN_SCHEDULE_ETD(state, payload) {
    state.surat_muatan_schedule.etd.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_ETD_ValueData(state, payload) {
    state.surat_muatan_schedule.etd.valueData = payload
  },

  SET_SURAT_MUATAN_SCHEDULE_ETD_TIMEZONE(state, payload) {
    state.surat_muatan_schedule.etd_timezone.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_ETD_TIMEZONE_ValueData(state, payload) {
    state.surat_muatan_schedule.etd_timezone.valueData = payload
  },

  SET_SURAT_MUATAN_SCHEDULE_ETA(state, payload) {
    state.surat_muatan_schedule.eta.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_ETA_ValueData(state, payload) {
    state.surat_muatan_schedule.eta.valueData = payload
  },

  SET_SURAT_MUATAN_SCHEDULE_ETA_TIMEZONE(state, payload) {
    state.surat_muatan_schedule.eta_timezone.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_ETA_TIMEZONE_ValueData(state, payload) {
    state.surat_muatan_schedule.eta_timezone.valueData = payload
  },

  SET_SURAT_MUATAN_SCHEDULE_VEHICLE_INFORMATION(state, payload) {
    state.surat_muatan_schedule.vehicle_information.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_VEHICLE_INFORMATION_ValueData(state, payload) {
    state.surat_muatan_schedule.vehicle_information.valueData = payload
  },

  SET_SURAT_MUATAN_SCHEDULE_REGISTRATION_NUMBER(state, payload) {
    state.surat_muatan_schedule.registration_number.value = payload
  },
  SET_SURAT_MUATAN_SCHEDULE_REGISTRATION_NUMBER_ValueData(state, payload) {
    state.surat_muatan_schedule.registration_number.valueData = payload
  },
  //====== END SURAT MUATAN SCHEDULE ======//

  // ====== SYNC SURAT MUATAN ====== //
SET_SYNC_SURAT_MUATAN_TRANSPORT_TYPE(state, payload) {
  state.sync_surat_muatan.transport_type.value = payload;
},

SET_SYNC_SURAT_MUATAN_FLIGHT_STATUS(state, payload) {
  state.sync_surat_muatan.flight_status.value = payload;
},

SET_SYNC_SURAT_MUATAN_FLIGHT_DATE(state, payload) {
  state.sync_surat_muatan.flight_date.value = payload;
},

SET_SYNC_SURAT_MUATAN_DEPARTURE_AIRPORT(state, payload) {
  state.sync_surat_muatan.departure_airport.value = payload;
},

SET_SYNC_SURAT_MUATAN_ARRIVAL_AIRPORT(state, payload) {
  state.sync_surat_muatan.arrival_airport.value = payload;
},

SET_SYNC_SURAT_MUATAN_AIRLINE_NAME(state, payload) {
  state.sync_surat_muatan.airline_name.value = payload;
},

SET_SYNC_SURAT_MUATAN_AIRLINE_CODE(state, payload) {
  state.sync_surat_muatan.airline_code.value = payload;
},

SET_SYNC_SURAT_MUATAN_FLIGHT_NUMBER(state, payload) {
  state.sync_surat_muatan.flight_number.value = payload;
},
// ====== END SYNC SURAT MUATAN ====== //



    //====== START RECEIVING LOG ======//
    SET_RECEIVING_LOG_INBOUND_NUMBER(state, payload) {
      state.receiving_log.inbound_number.value = payload
    },
    SET_RECEIVING_LOG_INBOUND_NUMBER_ValueData(state, payload) {
      state.receiving_log.inbound_number.valueData = payload
    },
    SET_RECEIVING_LOG_ITEM_NUMBER(state, payload) {
      state.receiving_log.item_number.value = payload
    },
    SET_RECEIVING_LOG_ITEM_NUMBER_ValueData(state, payload) {
      state.receiving_log.item_number.valueData = payload
    },
    SET_RECEIVING_LOG_STATUS(state, payload) {
      state.receiving_log.status.value = payload
    },
    SET_RECEIVING_LOG_STATUS_ValueData(state, payload) {
      state.receiving_log.status.valueData = payload
    },
    SET_RECEIVING_LOG_STATUS_ArrData(state, payload) {
      state.receiving_log.status.hasOwnProperty('arrData') ?
      state.receiving_log.status.arrData = payload :
      state.receiving_log.status.arrData = []
    },
}
