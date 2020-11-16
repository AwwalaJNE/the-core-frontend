export default {
  // ==== user ====
  SET_USER_USER_NAME({ commit }, payload) {
      commit('SET_USER_USER_NAME', payload)
  },
  SET_USER_USER_LOGIN({ commit }, payload) {
      commit('SET_USER_USER_LOGIN', payload)
  },
  SET_USER_USER_EMAIL({ commit }, payload) {
      commit('SET_USER_USER_EMAIL', payload)
  },
  SET_USER_PASSWORD({ commit }, payload) {
      commit('SET_USER_PASSWORD', payload)
  },
  SET_USER_USER_ROLE_ID({ commit }, payload) {
      commit('SET_USER_USER_ROLE_ID', payload)
  },
  SET_USER_USER_NAME_ValueData({ commit }, payload) {
    commit('SET_USER_USER_NAME_ValueData', payload)
  },
  SET_USER_USER_LOGIN_ValueData({ commit }, payload) {
      commit('SET_USER_USER_LOGIN_ValueData', payload)
  },
  SET_USER_USER_EMAIL_ValueData({ commit }, payload) {
      commit('SET_USER_USER_EMAIL_ValueData', payload)
  },
  SET_USER_PASSWORD_ValueData({ commit }, payload) {
      commit('SET_USER_PASSWORD_ValueData', payload)
  },
  SET_USER_USER_ROLE_ID_ValueData({ commit }, payload) {
      commit('SET_USER_USER_ROLE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_USER_USER_ROLE_ID_ArrData({ commit }, payload) {
      commit('SET_USER_USER_ROLE_ID_ArrData', payload)
  },

  // ==== user role ====
  SET_ROLE_USER_ROLE_NAME({ commit }, payload) {
      commit('SET_ROLE_USER_ROLE_NAME', payload)
  },
  SET_ROLE_USER_ROLE_NAME_ValueData({ commit }, payload) {
    commit('SET_ROLE_USER_ROLE_NAME_ValueData', payload)
  },

  SET_ROLE_USER_ROLE_CODE({ commit }, payload) {
    commit('SET_ROLE_USER_ROLE_CODE', payload)
  },
  SET_ROLE_USER_ROLE_CODE_ValueData({ commit }, payload) {
    commit('SET_ROLE_USER_ROLE_CODE_ValueData', payload)
  },


  // ==== geolocation country ====
  SET_GEOLOCATION_COUNTRY_GEOLOCATION_COUNTRY_CODE({ commit }, payload) {
    commit('SET_GEOLOCATION_COUNTRY_GEOLOCATION_COUNTRY_CODE', payload)
  },
  SET_GEOLOCATION_COUNTRY_GEOLOCATION_COUNTRY_CODE_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_COUNTRY_GEOLOCATION_COUNTRY_CODE_ValueData', payload)
  },

  SET_GEOLOCATION_COUNTRY_GEOLOCATION_COUNTRY_NAME({ commit }, payload) {
    commit('SET_GEOLOCATION_COUNTRY_GEOLOCATION_COUNTRY_NAME', payload)
  },
  SET_GEOLOCATION_COUNTRY_GEOLOCATION_COUNTRY_NAME_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_COUNTRY_GEOLOCATION_COUNTRY_NAME_ValueData', payload)
  },

  SET_GEOLOCATION_COUNTRY_TARIFF_CURRENCY_CODE({ commit }, payload) {
    commit('SET_GEOLOCATION_COUNTRY_TARIFF_CURRENCY_CODE', payload)
  },
  SET_GEOLOCATION_COUNTRY_TARIFF_CURRENCY_CODE_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_COUNTRY_TARIFF_CURRENCY_CODE_ValueData', payload)
  },
  // type select perlu data array
  SET_GEOLOCATION_COUNTRY_TARIFF_CURRENCY_CODE_ArrData({ commit }, payload) {
    commit('SET_GEOLOCATION_COUNTRY_TARIFF_CURRENCY_CODE_ArrData', payload)
  },

  SET_GEOLOCATION_COUNTRY_IS_ACTIVE({ commit }, payload) {
    commit('SET_GEOLOCATION_COUNTRY_IS_ACTIVE', payload)
  },
  SET_GEOLOCATION_COUNTRY_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_COUNTRY_IS_ACTIVE_ValueData', payload)
  },


  // ==== geolocation province ====
  SET_GEOLOCATION_PROVINCE_GEOLOCATION_COUNTRY_ID({ commit }, payload) {
    commit('SET_GEOLOCATION_PROVINCE_GEOLOCATION_COUNTRY_ID', payload)
  },
  SET_GEOLOCATION_PROVINCE_GEOLOCATION_COUNTRY_ID_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_PROVINCE_GEOLOCATION_COUNTRY_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_GEOLOCATION_PROVINCE_GEOLOCATION_COUNTRY_ID_ArrData({ commit }, payload) {
    commit('SET_GEOLOCATION_PROVINCE_GEOLOCATION_COUNTRY_ID_ArrData', payload)
  },

  SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_TIME_ZONE({ commit }, payload) {
    commit('SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_TIME_ZONE', payload)
  },
  SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_TIME_ZONE_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_TIME_ZONE_ValueData', payload)
  },
  // type select perlu data array
  SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_TIME_ZONE_ArrData({ commit }, payload) {
    commit('SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_TIME_ZONE_ArrData', payload)
  },

  SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_NAME({ commit }, payload) {
    commit('SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_NAME', payload)
  },
  SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_NAME_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_PROVINCE_GEOLOCATION_PROVINCE_NAME_ValueData', payload)
  },

  SET_GEOLOCATION_PROVINCE_IS_ACTIVE({ commit }, payload) {
    commit('SET_GEOLOCATION_PROVINCE_IS_ACTIVE', payload)
  },
  SET_GEOLOCATION_PROVINCE_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_PROVINCE_IS_ACTIVE_ValueData', payload)
  },


  // ==== geolocation city ====
  SET_GEOLOCATION_CITY_GEOLOCATION_PROVINCE_ID({ commit }, payload) {
    commit('SET_GEOLOCATION_CITY_GEOLOCATION_PROVINCE_ID', payload)
  },
  SET_GEOLOCATION_CITY_GEOLOCATION_PROVINCE_ID_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_CITY_GEOLOCATION_PROVINCE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_GEOLOCATION_CITY_GEOLOCATION_PROVINCE_ID_ArrData({ commit }, payload) {
    commit('SET_GEOLOCATION_CITY_GEOLOCATION_PROVINCE_ID_ArrData', payload)
  },

  SET_GEOLOCATION_CITY_GEOLOCATION_CITY_NAME({ commit }, payload) {
    commit('SET_GEOLOCATION_CITY_GEOLOCATION_CITY_NAME', payload)
  },
  SET_GEOLOCATION_CITY_GEOLOCATION_CITY_NAME_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_CITY_GEOLOCATION_CITY_NAME_ValueData', payload)
  },

  SET_GEOLOCATION_CITY_IS_ACTIVE({ commit }, payload) {
    commit('SET_GEOLOCATION_CITY_IS_ACTIVE', payload)
  },
  SET_GEOLOCATION_CITY_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_CITY_IS_ACTIVE_ValueData', payload)
  },


  // ==== geolocation district ====
  SET_GEOLOCATION_DISTRICT_GEOLOCATION_CITY_ID({ commit }, payload) {
    commit('SET_GEOLOCATION_DISTRICT_GEOLOCATION_CITY_ID', payload)
  },
  SET_GEOLOCATION_DISTRICT_GEOLOCATION_CITY_ID_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_DISTRICT_GEOLOCATION_CITY_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_GEOLOCATION_DISTRICT_GEOLOCATION_CITY_ID_ArrData({ commit }, payload) {
    commit('SET_GEOLOCATION_DISTRICT_GEOLOCATION_CITY_ID_ArrData', payload)
  },

  SET_GEOLOCATION_DISTRICT_GEOLOCATION_DISTRICT_NAME({ commit }, payload) {
    commit('SET_GEOLOCATION_DISTRICT_GEOLOCATION_DISTRICT_NAME', payload)
  },
  SET_GEOLOCATION_DISTRICT_GEOLOCATION_DISTRICT_NAME_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_DISTRICT_GEOLOCATION_DISTRICT_NAME_ValueData', payload)
  },

  SET_GEOLOCATION_DISTRICT_IS_ACTIVE({ commit }, payload) {
    commit('SET_GEOLOCATION_DISTRICT_IS_ACTIVE', payload)
  },
  SET_GEOLOCATION_DISTRICT_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_DISTRICT_IS_ACTIVE_ValueData', payload)
  },

  // ==== geolocation subdistrict ====
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_DISTRICT_ID({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_DISTRICT_ID', payload)
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_DISTRICT_ID_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_DISTRICT_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_DISTRICT_ID_ArrData({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_DISTRICT_ID_ArrData', payload)
  },

  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_NAME({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_NAME', payload)
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_NAME_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_NAME_ValueData', payload)
  },

  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_ZIP_CODE({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_ZIP_CODE', payload)
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_ZIP_CODE_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_ZIP_CODE_ValueData', payload)
  },

  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_TARIF_CODE({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_TARIF_CODE', payload)
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_TARIF_CODE_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_TARIF_CODE_ValueData', payload)
  },

  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_ZONA_WILAYAH({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_ZONA_WILAYAH', payload)
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_ZONA_WILAYAH_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_ZONA_WILAYAH_ValueData', payload)
  },

  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_KODE_ROUTING({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_KODE_ROUTING', payload)
  },
  SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_KODE_ROUTING_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_GEOLOCATION_SUBDISTRICT_KODE_ROUTING_ValueData', payload)
  },

  SET_GEOLOCATION_SUBDISTRICT_IS_ACTIVE({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_IS_ACTIVE', payload)
  },
  SET_GEOLOCATION_SUBDISTRICT_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_GEOLOCATION_SUBDISTRICT_IS_ACTIVE_ValueData', payload)
  },



  // ==== Customer ====
  SET_CUSTOMER_N({ commit }, payload) {
    commit('SET_CUSTOMER_N', payload)
  },
  SET_CUSTOMER_N_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_N_ValueData', payload)
  },
  // type select perlu data array
  SET_CUSTOMER_N_ArrData({ commit }, payload) {
    commit('SET_CUSTOMER_N_ArrData', payload)
  },

  SET_CUSTOMER_CUSTOMER_NAME({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_NAME', payload)
  },
  SET_CUSTOMER_CUSTOMER_NAME_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_NAME_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_CODE({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_CODE', payload)
  },
  SET_CUSTOMER_CUSTOMER_CODE_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_CODE_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_DATE_OF_BIRTH({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_DATE_OF_BIRTH', payload)
  },
  SET_CUSTOMER_CUSTOMER_DATE_OF_BIRTH_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_DATE_OF_BIRTH_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_ADDRESS({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_ADDRESS', payload)
  },
  SET_CUSTOMER_CUSTOMER_ADDRESS_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_ADDRESS_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_SUBDISTRICT_ID({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_SUBDISTRICT_ID', payload)
  },
  SET_CUSTOMER_CUSTOMER_SUBDISTRICT_ID_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_SUBDISTRICT_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_CUSTOMER_CUSTOMER_SUBDISTRICT_ID_ArrData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_SUBDISTRICT_ID_ArrData', payload)
  },

  SET_CUSTOMER_CUSTOMER_EMAIL({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_EMAIL', payload)
  },
  SET_CUSTOMER_CUSTOMER_EMAIL_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_EMAIL_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_PHONE({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_PHONE', payload)
  },
  SET_CUSTOMER_CUSTOMER_PHONE_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_PHONE_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_TYPE_ID({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_TYPE_ID', payload)
  },
  SET_CUSTOMER_CUSTOMER_TYPE_ID_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_TYPE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_CUSTOMER_CUSTOMER_TYPE_ID_ArrData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_TYPE_ID_ArrData', payload)
  },

  SET_CUSTOMER_CUSTOMER_FAX({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_FAX', payload)
  },
  SET_CUSTOMER_CUSTOMER_FAX_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_FAX_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_IDENTITY_CARD_NUMBER({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_IDENTITY_CARD_NUMBER', payload)
  },
  SET_CUSTOMER_CUSTOMER_IDENTITY_CARD_NUMBER_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_IDENTITY_CARD_NUMBER_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_TAX_NUMBER({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_TAX_NUMBER', payload)
  },
  SET_CUSTOMER_CUSTOMER_TAX_NUMBER_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_TAX_NUMBER_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_TAX_NUMBER_ADDRESS({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_TAX_NUMBER_ADDRESS', payload)
  },
  SET_CUSTOMER_CUSTOMER_TAX_NUMBER_ADDRESS_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_TAX_NUMBER_ADDRESS_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_COMMODITY({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_COMMODITY', payload)
  },
  SET_CUSTOMER_CUSTOMER_COMMODITY_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_COMMODITY_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_DEFAULT_NODE_ID({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_DEFAULT_NODE_ID', payload)
  },
  SET_CUSTOMER_CUSTOMER_DEFAULT_NODE_ID_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_DEFAULT_NODE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_CUSTOMER_CUSTOMER_DEFAULT_NODE_ID_ArrData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_DEFAULT_NODE_ID_ArrData', payload)
  },

  SET_CUSTOMER_CUSTOMER_LATITUDE({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_LATITUDE', payload)
  },
  SET_CUSTOMER_CUSTOMER_LATITUDE_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_LATITUDE_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_LONGITUDE({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_LONGITUDE', payload)
  },
  SET_CUSTOMER_CUSTOMER_LONGITUDE_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_LONGITUDE_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_ADDRESS_TYPE({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_ADDRESS_TYPE', payload)
  },
  SET_CUSTOMER_CUSTOMER_ADDRESS_TYPE_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_ADDRESS_TYPE_ValueData', payload)
  },

  SET_CUSTOMER_CUSTOMER_CORPORATE_CREDIT({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_CORPORATE_CREDIT', payload)
  },
  SET_CUSTOMER_CUSTOMER_CORPORATE_CREDIT_ValueData({ commit }, payload) {
    commit('SET_CUSTOMER_CUSTOMER_CORPORATE_CREDIT_ValueData', payload)
  },

  // ==== Node ====
  SET_NODE_NODE_NAME({ commit }, payload) {
    commit('SET_NODE_NODE_NAME', payload)
  },
  SET_NODE_NODE_NAME_ValueData({ commit }, payload) {
    commit('SET_NODE_NODE_NAME_ValueData', payload)
  },

  SET_NODE_NODE_TYPE_ID({ commit }, payload) {
    commit('SET_NODE_NODE_TYPE_ID', payload)
  },
  SET_NODE_NODE_TYPE_ID_ValueData({ commit }, payload) {
    commit('SET_NODE_NODE_TYPE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_NODE_NODE_TYPE_ID_ArrData({ commit }, payload) {
    commit('SET_NODE_NODE_TYPE_ID_ArrData', payload)
  },

  SET_NODE_NODE_PHONE({ commit }, payload) {
    commit('SET_NODE_NODE_PHONE', payload)
  },
  SET_NODE_NODE_PHONE_ValueData({ commit }, payload) {
    commit('SET_NODE_NODE_PHONE_ValueData', payload)
  },

  SET_NODE_NODE_NPWP({ commit }, payload) {
    commit('SET_NODE_NODE_NPWP', payload)
  },
  SET_NODE_NODE_NPWP_ValueData({ commit }, payload) {
    commit('SET_NODE_NODE_NPWP_ValueData', payload)
  },

  SET_NODE_NODE_CODE({ commit }, payload) {
    commit('SET_NODE_NODE_CODE', payload)
  },
  SET_NODE_NODE_CODE_ValueData({ commit }, payload) {
    commit('SET_NODE_NODE_CODE_ValueData', payload)
  },

  SET_NODE_NODE_TARIFF_CODE({ commit }, payload) {
    commit('SET_NODE_NODE_TARIFF_CODE', payload)
  },
  SET_NODE_NODE_TARIFF_CODE_ValueData({ commit }, payload) {
    commit('SET_NODE_NODE_TARIFF_CODE_ValueData', payload)
  },
  // type select perlu data array
  SET_NODE_NODE_TARIFF_CODE_ArrData({ commit }, payload) {
    commit('SET_NODE_NODE_TARIFF_CODE_ArrData', payload)
  },

  SET_NODE_NODE_LAT({ commit }, payload) {
    commit('SET_NODE_NODE_LAT', payload)
  },
  SET_NODE_NODE_LAT_ValueData({ commit }, payload) {
    commit('SET_NODE_NODE_LAT_ValueData', payload)
  },

  SET_NODE_NODE_LON({ commit }, payload) {
    commit('SET_NODE_NODE_LON', payload)
  },
  SET_NODE_NODE_LON_ValueData({ commit }, payload) {
    commit('SET_NODE_NODE_LON_ValueData', payload)
  },

  SET_NODE_DEFAULT_NODE_LINK_ID({ commit }, payload) {
    commit('SET_NODE_DEFAULT_NODE_LINK_ID', payload)
  },
  SET_NODE_DEFAULT_NODE_LINK_ID_ValueData({ commit }, payload) {
    commit('SET_NODE_DEFAULT_NODE_LINK_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_NODE_DEFAULT_NODE_LINK_ID_ArrData({ commit }, payload) {
    commit('SET_NODE_DEFAULT_NODE_LINK_ID_ArrData', payload)
  },

  SET_NODE_DEFAULT_NODE_ALTERNATE_ADDRESS_ID({ commit }, payload) {
    commit('SET_NODE_DEFAULT_NODE_ALTERNATE_ADDRESS_ID', payload)
  },
  SET_NODE_DEFAULT_NODE_ALTERNATE_ADDRESS_ID_ValueData({ commit }, payload) {
    commit('SET_NODE_DEFAULT_NODE_ALTERNATE_ADDRESS_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_NODE_DEFAULT_NODE_ALTERNATE_ADDRESS_ID_ArrData({ commit }, payload) {
    commit('SET_NODE_DEFAULT_NODE_ALTERNATE_ADDRESS_ID_ArrData', payload)
  },

  SET_NODE_NODE_ALLOW_SPECIAL_CARGO({ commit }, payload) {
    commit('SET_NODE_NODE_ALLOW_SPECIAL_CARGO', payload)
  },
  SET_NODE_NODE_ALLOW_SPECIAL_CARGO_ValueData({ commit }, payload) {
    commit('SET_NODE_NODE_ALLOW_SPECIAL_CARGO_ValueData', payload)
  },

  SET_NODE_NODE_ALLOW_CORPORATE_TRANSACTION({ commit }, payload) {
    commit('SET_NODE_NODE_ALLOW_CORPORATE_TRANSACTION', payload)
  },
  SET_NODE_NODE_ALLOW_CORPORATE_TRANSACTION_ValueData({ commit }, payload) {
    commit('SET_NODE_NODE_ALLOW_CORPORATE_TRANSACTION_ValueData', payload)
  },

  SET_NODE_NODE_IS_EXTERNAL({ commit }, payload) {
    commit('SET_NODE_NODE_IS_EXTERNAL', payload)
  },
  SET_NODE_NODE_IS_EXTERNAL_ValueData({ commit }, payload) {
    commit('SET_NODE_NODE_IS_EXTERNAL_ValueData', payload)
  },

  SET_NODE_IS_ACTIVE({ commit }, payload) {
    commit('SET_NODE_IS_ACTIVE', payload)
  },
  SET_NODE_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_NODE_IS_ACTIVE_ValueData', payload)
  },
}
