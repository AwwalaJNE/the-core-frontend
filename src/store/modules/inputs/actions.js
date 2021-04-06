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
  SET_USER_USER_NODE_ID({ commit }, payload) {
      commit('SET_USER_USER_NODE_ID', payload)
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
  SET_USER_USER_NODE_ID_ValueData({ commit }, payload) {
      commit('SET_USER_USER_NODE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_USER_USER_NODE_ID_ArrData({ commit }, payload) {
      commit('SET_USER_USER_NODE_ID_ArrData', payload)
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

 // ======= START Customer Type =======
 SET_CUSTOMER_TYPE_CUSTOMER_TYPE_NAME({ commit }, payload) {
  commit('SET_CUSTOMER_TYPE_CUSTOMER_TYPE_NAME', payload)
  },
  SET_CUSTOMER_TYPE_CUSTOMER_TYPE_NAME_ValueData({ commit }, payload) {
  commit('SET_CUSTOMER_TYPE_CUSTOMER_TYPE_NAME_ValueData', payload)
  },
  
  SET_CUSTOMER_TYPE_IS_ACTIVE({ commit }, payload) {
  commit('SET_CUSTOMER_TYPE_IS_ACTIVE', payload)
  },
  SET_CUSTOMER_TYPE_IS_ACTIVE_ValueData({ commit }, payload) {
  commit('SET_CUSTOMER_TYPE_IS_ACTIVE_ValueData', payload)
  },
  
 // ======= END Customer Type =======

 
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

  // node alt address
  SET_NODE_ALTERNATE_ADDRESS_NODE_ID({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ID', payload)
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ID_ValueData({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ID_ValueData', payload)
  },
    // type select perlu data array
  SET_NODE_ALTERNATE_ADDRESS_NODE_ID_ArrData({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ID_ArrData', payload)
  },
    
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_NAME({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_NAME', payload)
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_NAME_ValueData({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_NAME_ValueData', payload)
  },
    
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_ADDRESS({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_ADDRESS', payload)
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_ADDRESS_ValueData({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_ADDRESS_ValueData', payload)
  },
    
    
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_SUBDISTRICT_ID({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_SUBDISTRICT_ID', payload)
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_SUBDISTRICT_ID_ValueData({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_SUBDISTRICT_ID_ValueData', payload)
  },
    // type select perlu data array
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_SUBDISTRICT_ID_ArrData({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_SUBDISTRICT_ID_ArrData', payload)
  },

    
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_LATITUDE({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_LATITUDE', payload)
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_LATITUDE_ValueData({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_LATITUDE_ValueData', payload)
  },
    
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_LONGITUDE({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_LONGITUDE', payload)
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_LONGITUDE_ValueData({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_LONGITUDE_ValueData', payload)
  },
    
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_PHONE({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_PHONE', payload)
  },
  SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_PHONE_ValueData({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_NODE_ALTERNATE_ADDRESS_PHONE_ValueData', payload)
  },
    
  SET_NODE_ALTERNATE_ADDRESS_IS_ACTIVE({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_IS_ACTIVE', payload)
  },
  SET_NODE_ALTERNATE_ADDRESS_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_NODE_ALTERNATE_ADDRESS_IS_ACTIVE_ValueData', payload)
  },

  //======= Generate node link =======
  SET_NODELINK_NODE_LINK_ORIGIN_ID({ commit }, payload) {
    commit('SET_NODELINK_NODE_LINK_ORIGIN_ID', payload)
  },
  SET_NODELINK_NODE_LINK_ORIGIN_ID_ValueData({ commit }, payload) {
    commit('SET_NODELINK_NODE_LINK_ORIGIN_ID_ValueData', payload)
  },
// type select perlu data array
  SET_NODELINK_NODE_LINK_ORIGIN_ID_ArrData({ commit }, payload) {
    commit('SET_NODELINK_NODE_LINK_ORIGIN_ID_ArrData', payload)
  },

  SET_NODELINK_NODE_LINK_DESTINATION_ID({ commit }, payload) {
    commit('SET_NODELINK_NODE_LINK_DESTINATION_ID', payload)
  },
  SET_NODELINK_NODE_LINK_DESTINATION_ID_ValueData({ commit }, payload) {
    commit('SET_NODELINK_NODE_LINK_DESTINATION_ID_ValueData', payload)
  },
// type select perlu data array
  SET_NODELINK_NODE_LINK_DESTINATION_ID_ArrData({ commit }, payload) {
    commit('SET_NODELINK_NODE_LINK_DESTINATION_ID_ArrData', payload)
  },

  SET_NODELINK_NODE_LINK_VEHICLE_MODE_ID({ commit }, payload) {
    commit('SET_NODELINK_NODE_LINK_VEHICLE_MODE_ID', payload)
  },
  SET_NODELINK_NODE_LINK_VEHICLE_MODE_ID_ValueData({ commit }, payload) {
    commit('SET_NODELINK_NODE_LINK_VEHICLE_MODE_ID_ValueData', payload)
  },
// type select perlu data array
  SET_NODELINK_NODE_LINK_VEHICLE_MODE_ID_ArrData({ commit }, payload) {
    commit('SET_NODELINK_NODE_LINK_VEHICLE_MODE_ID_ArrData', payload)
  },

  SET_NODELINK_IS_ACTIVE({ commit }, payload) {
    commit('SET_NODELINK_IS_ACTIVE', payload)
  },
  SET_NODELINK_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_NODELINK_IS_ACTIVE_ValueData', payload)
  },


  //end node link

// tariff
SET_TARIFF_TARIFF_GROUP({ commit }, payload) {
  commit('SET_TARIFF_TARIFF_GROUP', payload)
},
SET_TARIFF_TARIFF_GROUP_visible({ commit }, payload) {
  commit('SET_TARIFF_TARIFF_GROUP_visible', payload)
},
SET_TARIFF_TARIFF_GROUP_ValueData({ commit }, payload) {
  commit('SET_TARIFF_TARIFF_GROUP_ValueData', payload)
},
  // type select perlu data array
SET_TARIFF_TARIFF_GROUP_ArrData({ commit }, payload) {
  commit('SET_TARIFF_TARIFF_GROUP_ArrData', payload)
},
  SET_TARIFF_TARIFF_ORIGIN({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_ORIGIN', payload)
  },
  SET_TARIFF_TARIFF_ORIGIN_ValueData({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_ORIGIN_ValueData', payload)
  },
    
  SET_TARIFF_TARIFF_DESTINATION({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_DESTINATION', payload)
  },
  SET_TARIFF_TARIFF_DESTINATION_ValueData({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_DESTINATION_ValueData', payload)
  },
    
  SET_TARIFF_TARIFF_START_DATE({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_START_DATE', payload)
  },
  SET_TARIFF_TARIFF_START_DATE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_START_DATE_ValueData', payload)
  },
    
  SET_TARIFF_TARIFF_EXPIRY_DATE({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_EXPIRY_DATE', payload)
  },
  SET_TARIFF_TARIFF_EXPIRY_DATE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_EXPIRY_DATE_ValueData', payload)
  },
    
  SET_TARIFF_TARIFF_SERVICE_CODE({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_SERVICE_CODE', payload)
  },
  SET_TARIFF_TARIFF_SERVICE_CODE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_SERVICE_CODE_ValueData', payload)
  },
    
  SET_TARIFF_TARIFF_CURRENCY({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_CURRENCY', payload)
  },
  SET_TARIFF_TARIFF_CURRENCY_ValueData({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_CURRENCY_ValueData', payload)
  },
    
  SET_TARIFF_TARIFF_VEHICLE_MODE_ID({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_VEHICLE_MODE_ID', payload)
  },
  SET_TARIFF_TARIFF_VEHICLE_MODE_ID_ValueData({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_VEHICLE_MODE_ID_ValueData', payload)
  },
    // type select perlu data array
  SET_TARIFF_TARIFF_VEHICLE_MODE_ID_ArrData({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_VEHICLE_MODE_ID_ArrData', payload)
  },
    
  SET_TARIFF_TARIFF_AMOUNT_1({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_AMOUNT_1', payload)
  },
  SET_TARIFF_TARIFF_AMOUNT_1_ValueData({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_AMOUNT_1_ValueData', payload)
  },
    
  SET_TARIFF_TARIFF_WEIGHT_1({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_WEIGHT_1', payload)
  },
  SET_TARIFF_TARIFF_WEIGHT_1_ValueData({ commit }, payload) {
    commit('SET_TARIFF_TARIFF_WEIGHT_1_ValueData', payload)
  },
    
  SET_TARIFF_IS_ACTIVE({ commit }, payload) {
    commit('SET_TARIFF_IS_ACTIVE', payload)
  },
  SET_TARIFF_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_IS_ACTIVE_ValueData', payload)
  },

  // tariff special
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_NAME({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_NAME', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_NAME_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_NAME_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_SERVICE_CODE({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_SERVICE_CODE', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_SERVICE_CODE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_SERVICE_CODE_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_START_DATE({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_START_DATE', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_START_DATE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_START_DATE_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_EXPIRY_DATE({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_EXPIRY_DATE', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_EXPIRY_DATE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_EXPIRY_DATE_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_TYPE({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_TYPE', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_TYPE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_TYPE_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_AMOUNT({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_AMOUNT', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_AMOUNT_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_AMOUNT_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_MAX_AMOUNT({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_MAX_AMOUNT', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_MAX_AMOUNT_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_MAX_AMOUNT_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_COUNTRY({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_COUNTRY', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_COUNTRY_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_COUNTRY_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_PROVINCE({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_PROVINCE', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_PROVINCE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_PROVINCE_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_CITY({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_CITY', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_CITY_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_CITY_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_DISTRICT({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_DISTRICT', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_DISTRICT_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_DISTRICT_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_SUBDISTRICT({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_SUBDISTRICT', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_SUBDISTRICT_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_SUBDISTRICT_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_ZIP_CODE({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_ZIP_CODE', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_ZIP_CODE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_ZIP_CODE_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_TARIFF_CODE({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_TARIFF_CODE', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_TARIFF_CODE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_FROM_TARIFF_CODE_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_COUNTRY({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_COUNTRY', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_COUNTRY_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_COUNTRY_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_PROVINCE({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_PROVINCE', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_PROVINCE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_PROVINCE_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_CITY({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_CITY', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_CITY_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_CITY_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_DISTRICT({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_DISTRICT', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_DISTRICT_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_DISTRICT_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_SUBDISTRICT({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_SUBDISTRICT', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_SUBDISTRICT_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_SUBDISTRICT_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_ZIP_CODE({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_ZIP_CODE', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_ZIP_CODE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_ZIP_CODE_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_TARIFF_CODE({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_TARIFF_CODE', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_TARIFF_CODE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_TO_TARIFF_CODE_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_KOLI({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_KOLI', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_KOLI_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_KOLI_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_KOLI({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_KOLI', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_KOLI_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_KOLI_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_WEIGHT({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_WEIGHT', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_WEIGHT_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_WEIGHT_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_WEIGHT({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_WEIGHT', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_WEIGHT_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_WEIGHT_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_VOLUME({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_VOLUME', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_VOLUME_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MIN_VOLUME_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_VOLUME({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_VOLUME', payload)
  },
  SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_VOLUME_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_TARIFF_SPECIAL_CONDITION_MAX_VOLUME_ValueData', payload)
  },
    
  SET_TARIFF_SPECIAL_IS_ACTIVE({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_IS_ACTIVE', payload)
  },
  SET_TARIFF_SPECIAL_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_TARIFF_SPECIAL_IS_ACTIVE_ValueData', payload)
  },

  //SURCHARGE
  SET_SURCHARGE_SURCHARGE_NAME({ commit }, payload) {
    commit('SET_SURCHARGE_SURCHARGE_NAME', payload)
  },
  SET_SURCHARGE_SURCHARGE_NAME_ValueData({ commit }, payload) {
    commit('SET_SURCHARGE_SURCHARGE_NAME_ValueData', payload)
  },
    
  SET_SURCHARGE_SURCHARGE_TYPE_ID({ commit }, payload) {
    commit('SET_SURCHARGE_SURCHARGE_TYPE_ID', payload)
  },
  SET_SURCHARGE_SURCHARGE_TYPE_ID_ValueData({ commit }, payload) {
    commit('SET_SURCHARGE_SURCHARGE_TYPE_ID_ValueData', payload)
  },
    // type select perlu data array
  SET_SURCHARGE_SURCHARGE_TYPE_ID_ArrData({ commit }, payload) {
    commit('SET_SURCHARGE_SURCHARGE_TYPE_ID_ArrData', payload)
  },
    
  SET_SURCHARGE_SURCHARGE_CONDITION({ commit }, payload) {
    commit('SET_SURCHARGE_SURCHARGE_CONDITION', payload)
  },
  SET_SURCHARGE_SURCHARGE_CONDITION_ValueData({ commit }, payload) {
    commit('SET_SURCHARGE_SURCHARGE_CONDITION_ValueData', payload)
  },
    
  SET_SURCHARGE_SURCHARGE_FORMULA({ commit }, payload) {
    commit('SET_SURCHARGE_SURCHARGE_FORMULA', payload)
  },
  SET_SURCHARGE_SURCHARGE_FORMULA_ValueData({ commit }, payload) {
    commit('SET_SURCHARGE_SURCHARGE_FORMULA_ValueData', payload)
  },
    
  SET_SURCHARGE_AUTO_APPLY({ commit }, payload) {
    commit('SET_SURCHARGE_AUTO_APPLY', payload)
  },
  SET_SURCHARGE_AUTO_APPLY_ValueData({ commit }, payload) {
    commit('SET_SURCHARGE_AUTO_APPLY_ValueData', payload)
  },
    
  SET_SURCHARGE_IS_ACTIVE({ commit }, payload) {
    commit('SET_SURCHARGE_IS_ACTIVE', payload)
  },
  SET_SURCHARGE_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_SURCHARGE_IS_ACTIVE_ValueData', payload)
  },

  SET_SURCHARGE_TYPE_SURCHARGE_TYPE_NAME({ commit }, payload) {
    commit('SET_SURCHARGE_TYPE_SURCHARGE_TYPE_NAME', payload)
  },
  SET_SURCHARGE_TYPE_SURCHARGE_TYPE_NAME_ValueData({ commit }, payload) {
    commit('SET_SURCHARGE_TYPE_SURCHARGE_TYPE_NAME_ValueData', payload)
  },
    
  SET_SURCHARGE_TYPE_IS_ACTIVE({ commit }, payload) {
    commit('SET_SURCHARGE_TYPE_IS_ACTIVE', payload)
  },
  SET_SURCHARGE_TYPE_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_SURCHARGE_TYPE_IS_ACTIVE_ValueData', payload)
  },

  // vehicle
  SET_VEHICLE_VEHICLE_NAME({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_NAME', payload)
  },
  SET_VEHICLE_VEHICLE_NAME_ValueData({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_NAME_ValueData', payload)
  },
    
  SET_VEHICLE_VEHICLE_POLICE_NO({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_POLICE_NO', payload)
  },
  SET_VEHICLE_VEHICLE_POLICE_NO_ValueData({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_POLICE_NO_ValueData', payload)
  },
    
  SET_VEHICLE_VEHICLE_OWNED_BY({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_OWNED_BY', payload)
  },
  SET_VEHICLE_VEHICLE_OWNED_BY_ValueData({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_OWNED_BY_ValueData', payload)
  },
    
  SET_VEHICLE_VEHICLE_MAX_WEIGHT({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_MAX_WEIGHT', payload)
  },
  SET_VEHICLE_VEHICLE_MAX_WEIGHT_ValueData({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_MAX_WEIGHT_ValueData', payload)
  },
    
  SET_VEHICLE_VEHICLE_MAX_VOLUME({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_MAX_VOLUME', payload)
  },
  SET_VEHICLE_VEHICLE_MAX_VOLUME_ValueData({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_MAX_VOLUME_ValueData', payload)
  },
    
  SET_VEHICLE_VEHICLE_TYPE_ID({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_TYPE_ID', payload)
  },
  SET_VEHICLE_VEHICLE_TYPE_ID_ValueData({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_TYPE_ID_ValueData', payload)
  },
    // type select perlu data array
  SET_VEHICLE_VEHICLE_TYPE_ID_ArrData({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_TYPE_ID_ArrData', payload)
  },
    
  SET_VEHICLE_VEHICLE_NODE_ID({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_NODE_ID', payload)
  },
  SET_VEHICLE_VEHICLE_NODE_ID_ValueData({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_NODE_ID_ValueData', payload)
  },
    // type select perlu data array
  SET_VEHICLE_VEHICLE_NODE_ID_ArrData({ commit }, payload) {
    commit('SET_VEHICLE_VEHICLE_NODE_ID_ArrData', payload)
  },
    
  SET_VEHICLE_IS_ACTIVE({ commit }, payload) {
    commit('SET_VEHICLE_IS_ACTIVE', payload)
  },
  SET_VEHICLE_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_VEHICLE_IS_ACTIVE_ValueData', payload)
  },

  //vehicle mode
  SET_VEHICLE_MODE_VEHICLE_MODE_NAME({ commit }, payload) {
    commit('SET_VEHICLE_MODE_VEHICLE_MODE_NAME', payload)
  },
  SET_VEHICLE_MODE_VEHICLE_MODE_NAME_ValueData({ commit }, payload) {
    commit('SET_VEHICLE_MODE_VEHICLE_MODE_NAME_ValueData', payload)
  },
    
  SET_VEHICLE_MODE_IS_ACTIVE({ commit }, payload) {
    commit('SET_VEHICLE_MODE_IS_ACTIVE', payload)
  },
  SET_VEHICLE_MODE_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_VEHICLE_MODE_IS_ACTIVE_ValueData', payload)
  },

  // vehicle type
  SET_VEHICLE_TYPE_VEHICLE_TYPE_NAME({ commit }, payload) {
    commit('SET_VEHICLE_TYPE_VEHICLE_TYPE_NAME', payload)
  },
  SET_VEHICLE_TYPE_VEHICLE_TYPE_NAME_ValueData({ commit }, payload) {
    commit('SET_VEHICLE_TYPE_VEHICLE_TYPE_NAME_ValueData', payload)
  },
    
  SET_VEHICLE_TYPE_IS_ACTIVE({ commit }, payload) {
    commit('SET_VEHICLE_TYPE_IS_ACTIVE', payload)
  },
  SET_VEHICLE_TYPE_IS_ACTIVE_ValueData({ commit }, payload) {
    commit('SET_VEHICLE_TYPE_IS_ACTIVE_ValueData', payload)
  },

  SET_PICKUP_REQUEST_NODE_REQUEST({ commit }, payload) {
    commit('SET_PICKUP_REQUEST_NODE_REQUEST', payload)
  },
  SET_PICKUP_REQUEST_NODE_REQUEST_ValueData({ commit }, payload) {
    commit('SET_PICKUP_REQUEST_NODE_REQUEST_ValueData', payload)
  },
    // type select perlu data array
  SET_PICKUP_REQUEST_NODE_REQUEST_ArrData({ commit }, payload) {
    commit('SET_PICKUP_REQUEST_NODE_REQUEST_ArrData', payload)
  },
    

  //PICKUP LIST
  SET_PICKUP_LIST_PICKUP_NAME({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_NAME', payload)
  },
  SET_PICKUP_LIST_PICKUP_NAME_ValueData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_NAME_ValueData', payload)
  },

  SET_PICKUP_LIST_PIC_NAME({ commit }, payload) {
    commit('SET_PICKUP_LIST_PIC_NAME', payload)
  },
  SET_PICKUP_LIST_PIC_NAME_ValueData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PIC_NAME_ValueData', payload)
  },
// type select perlu data array
  SET_PICKUP_LIST_PIC_NAME_ArrData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PIC_NAME_ArrData', payload)
  },

  SET_PICKUP_LIST_PICKUP_PHONE_NUMBER({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_PHONE_NUMBER', payload)
  },
  SET_PICKUP_LIST_PICKUP_PHONE_NUMBER_ValueData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_PHONE_NUMBER_ValueData', payload)
  },

  SET_PICKUP_LIST_PICKUP_ADDRESS({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_ADDRESS', payload)
  },
  SET_PICKUP_LIST_PICKUP_ADDRESS_ValueData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_ADDRESS_ValueData', payload)
  },

  SET_PICKUP_LIST_PICKUP_DATE({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_DATE', payload)
  },
  SET_PICKUP_LIST_PICKUP_DATE_ValueData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_DATE_ValueData', payload)
  },

  SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION', payload)
  },
  SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION_ValueData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION_ValueData', payload)
  },
// type select perlu data array
  SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION_ArrData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION_ArrData', payload)
  },

  SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID', payload)
  },
  SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID_ValueData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID_ValueData', payload)
  },
// type select perlu data array
  SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID_ArrData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID_ArrData', payload)
  },

  SET_PICKUP_LIST_PICKUP_REMARKS({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_REMARKS', payload)
  },
  SET_PICKUP_LIST_PICKUP_REMARKS_ValueData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_REMARKS_ValueData', payload)
  },

  SET_PICKUP_LIST_VEHICLE_TYPE_ID({ commit }, payload) {
    commit('SET_PICKUP_LIST_VEHICLE_TYPE_ID', payload)
  },
  SET_PICKUP_LIST_VEHICLE_TYPE_ID_ValueData({ commit }, payload) {
    commit('SET_PICKUP_LIST_VEHICLE_TYPE_ID_ValueData', payload)
  },
// type select perlu data array
  SET_PICKUP_LIST_VEHICLE_TYPE_ID_ArrData({ commit }, payload) {
    commit('SET_PICKUP_LIST_VEHICLE_TYPE_ID_ArrData', payload)
  },

  SET_PICKUP_LIST_PICKUP_LATITUDE({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_LATITUDE', payload)
  },
  SET_PICKUP_LIST_PICKUP_LATITUDE_ValueData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_LATITUDE_ValueData', payload)
  },

  SET_PICKUP_LIST_PICKUP_LONGITUDE({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_LONGITUDE', payload)
  },
  SET_PICKUP_LIST_PICKUP_LONGITUDE_ValueData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_LONGITUDE_ValueData', payload)
  },

  SET_PICKUP_LIST_PICKUP_SCHEDULE({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_SCHEDULE', payload)
  },
  SET_PICKUP_LIST_PICKUP_SCHEDULE_ValueData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_SCHEDULE_ValueData', payload)
  },
// type select perlu data array
  SET_PICKUP_LIST_PICKUP_SCHEDULE_ArrData({ commit }, payload) {
    commit('SET_PICKUP_LIST_PICKUP_SCHEDULE_ArrData', payload)
  },
  //END PICKUP LIST

  /* PICKUP SCHEDULE START */
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NAME({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NAME', payload)
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NAME_ValueData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NAME_ValueData', payload)
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PIC_NAME({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PIC_NAME', payload)
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PIC_NAME_ValueData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PIC_NAME_ValueData', payload)
  },
// type select perlu data array
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PIC_NAME_ArrData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PIC_NAME_ArrData', payload)
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PHONE_NUMBER({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PHONE_NUMBER', payload)
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PHONE_NUMBER_ValueData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PHONE_NUMBER_ValueData', payload)
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ADDRESS({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ADDRESS', payload)
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ADDRESS_ValueData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ADDRESS_ValueData', payload)
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_DATE({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_DATE', payload)
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_DATE_ValueData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_DATE_ValueData', payload)
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_DESTINATION({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_DESTINATION', payload)
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_DESTINATION_ValueData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_DESTINATION_ValueData', payload)
  },
// type select perlu data array
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_DESTINATION_ArrData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_DESTINATION_ArrData', payload)
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_REMARKS({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_REMARKS', payload)
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_REMARKS_ValueData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_REMARKS_ValueData', payload)
  },

  SET_PICKUP_SCHEDULE_VEHICLE_TYPE_ID({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_VEHICLE_TYPE_ID', payload)
  },
  SET_PICKUP_SCHEDULE_VEHICLE_TYPE_ID_ValueData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_VEHICLE_TYPE_ID_ValueData', payload)
  },
// type select perlu data array
  SET_PICKUP_SCHEDULE_VEHICLE_TYPE_ID_ArrData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_VEHICLE_TYPE_ID_ArrData', payload)
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LATITUDE({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LATITUDE', payload)
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LATITUDE_ValueData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LATITUDE_ValueData', payload)
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LONGITUDE({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LONGITUDE', payload)
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LONGITUDE_ValueData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LONGITUDE_ValueData', payload)
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_COURIER_EMPLOYEE_ID({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_COURIER_EMPLOYEE_ID', payload)
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_COURIER_EMPLOYEE_ID_ValueData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_COURIER_EMPLOYEE_ID_ValueData', payload)
  },
// type select perlu data array
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_COURIER_EMPLOYEE_ID_ArrData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_COURIER_EMPLOYEE_ID_ArrData', payload)
  },

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE', payload)
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ValueData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ValueData', payload)
  },
// type select perlu data array
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ArrData({ commit }, payload) {
    commit('SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ArrData', payload)
  },
  /* PICKUP SCHEDULE END*/

  /* Start Surat Muatan */
  SET_SURAT_MUATAN_MANIFEST_NUMBER({ commit }, payload) {
    commit('SET_SURAT_MUATAN_MANIFEST_NUMBER', payload)
  },
  SET_SURAT_MUATAN_MANIFEST_NUMBER_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_MANIFEST_NUMBER_ValueData', payload)
  },

  SET_SURAT_MUATAN_MANIFEST_METHOD_ID({ commit }, payload) {
    commit('SET_SURAT_MUATAN_MANIFEST_METHOD_ID', payload)
  },
  SET_SURAT_MUATAN_MANIFEST_METHOD_ID_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_MANIFEST_METHOD_ID_ValueData', payload)
  },
// type select perlu data array
  SET_SURAT_MUATAN_MANIFEST_METHOD_ID_ArrData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_MANIFEST_METHOD_ID_ArrData', payload)
  },

  SET_SURAT_MUATAN_NODE_ID_ORIGIN({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_ORIGIN', payload)
  },
  SET_SURAT_MUATAN_NODE_ID_ORIGIN_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_ORIGIN_ValueData', payload)
  },
  SET_SURAT_MUATAN_NODE_ID_ORIGIN_URL({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_ORIGIN_URL', payload)
  },
  SET_SURAT_MUATAN_NODE_ID_ORIGIN_FLAG({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_ORIGIN_FLAG', payload)
  },
// type select perlu data array
  SET_SURAT_MUATAN_NODE_ID_ORIGIN_ArrData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_ORIGIN_ArrData', payload)
  },

  SET_SURAT_MUATAN_NODE_ID_TRANSIT_1({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_TRANSIT_1', payload)
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_1_URL({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_TRANSIT_1_URL', payload)
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_1_FLAG({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_TRANSIT_1_FLAG', payload)
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_1_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_TRANSIT_1_ValueData', payload)
  },
// type select perlu data array
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_1_ArrData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_TRANSIT_1_ArrData', payload)
  },

  SET_SURAT_MUATAN_NODE_ID_TRANSIT_2({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_TRANSIT_2', payload)
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_2_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_TRANSIT_2_ValueData', payload)
  },
// type select perlu data array
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_2_ArrData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_TRANSIT_2_ArrData', payload)
  },

  SET_SURAT_MUATAN_NODE_ID_TRANSIT_3({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_TRANSIT_3', payload)
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_3_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_TRANSIT_3_ValueData', payload)
  },
// type select perlu data array
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_3_ArrData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_TRANSIT_3_ArrData', payload)
  },

  SET_SURAT_MUATAN_NODE_ID_DESTINATION({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_DESTINATION', payload)
  },
  SET_SURAT_MUATAN_NODE_ID_DESTINATION_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_DESTINATION_ValueData', payload)
  },
// type select perlu data array
  SET_SURAT_MUATAN_NODE_ID_DESTINATION_ArrData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_NODE_ID_DESTINATION_ArrData', payload)
  },

  SET_SURAT_MUATAN_VEHICLE_MODE_ID({ commit }, payload) {
    commit('SET_SURAT_MUATAN_VEHICLE_MODE_ID', payload)
  },
  SET_SURAT_MUATAN_VEHICLE_MODE_ID_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_VEHICLE_MODE_ID_ValueData', payload)
  },
// type select perlu data array
  SET_SURAT_MUATAN_VEHICLE_MODE_ID_ArrData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_VEHICLE_MODE_ID_ArrData', payload)
  },

  SET_SURAT_MUATAN_MANIFEST_TYPE_ID({ commit }, payload) {
    commit('SET_SURAT_MUATAN_MANIFEST_TYPE_ID', payload)
  },

  SET_SURAT_MUATAN_MANIFEST_TYPE_ID_visible({ commit }, payload) {
    commit('SET_SURAT_MUATAN_MANIFEST_TYPE_ID_visible', payload)
  },

  SET_SURAT_MUATAN_MANIFEST_TYPE_ID_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_MANIFEST_TYPE_ID_ValueData', payload)
  },
// type select perlu data array
  SET_SURAT_MUATAN_MANIFEST_TYPE_ID_ArrData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_MANIFEST_TYPE_ID_ArrData', payload)
  },

  SET_SURAT_MUATAN_VEHICLE_ID({ commit }, payload) {
    commit('SET_SURAT_MUATAN_VEHICLE_ID', payload)
  },
  SET_SURAT_MUATAN_VEHICLE_ID_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_VEHICLE_ID_ValueData', payload)
  },
// type select perlu data array
  SET_SURAT_MUATAN_VEHICLE_ID_ArrData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_VEHICLE_ID_ArrData', payload)
  },

  SET_SURAT_MUATAN_PIC_EMPLOYEE_ID({ commit }, payload) {
    commit('SET_SURAT_MUATAN_PIC_EMPLOYEE_ID', payload)
  },

  SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible({ commit }, payload) {
    commit('SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible', payload)
  },
  SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ValueData', payload)
  },
// type select perlu data array
  SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData', payload)
  },

  SET_SURAT_MUATAN_ETD({ commit }, payload) {
    commit('SET_SURAT_MUATAN_ETD', payload)
  },
  SET_SURAT_MUATAN_ETD_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_ETD_ValueData', payload)
  },

  SET_SURAT_MUATAN_ETA({ commit }, payload) {
    commit('SET_SURAT_MUATAN_ETA', payload)
  },
  SET_SURAT_MUATAN_ETA_ValueData({ commit }, payload) {
    commit('SET_SURAT_MUATAN_ETA_ValueData', payload)
  },

  /* End Suart Muatan */

  /* SURAT JALAN */
  SET_SURAT_JALAN_DESTINATION_ID({ commit }, payload) {
    commit('SET_SURAT_JALAN_DESTINATION_ID', payload)
  },
  SET_SURAT_JALAN_DESTINATION_ID_ValueData({ commit }, payload) {
    commit('SET_SURAT_JALAN_DESTINATION_ID_ValueData', payload)
  },
    // type select perlu data array
  SET_SURAT_JALAN_DESTINATION_ID_ArrData({ commit }, payload) {
    commit('SET_SURAT_JALAN_DESTINATION_ID_ArrData', payload)
  },
    
  SET_SURAT_JALAN_MODA_ANGKUTAN_ID({ commit }, payload) {
    commit('SET_SURAT_JALAN_MODA_ANGKUTAN_ID', payload)
  },
  SET_SURAT_JALAN_MODA_ANGKUTAN_ID_ValueData({ commit }, payload) {
    commit('SET_SURAT_JALAN_MODA_ANGKUTAN_ID_ValueData', payload)
  },
    // type select perlu data array
  SET_SURAT_JALAN_MODA_ANGKUTAN_ID_ArrData({ commit }, payload) {
    commit('SET_SURAT_JALAN_MODA_ANGKUTAN_ID_ArrData', payload)
  },
    
  SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID({ commit }, payload) {
    commit('SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID', payload)
  },
  SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID_ValueData({ commit }, payload) {
    commit('SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID_ValueData', payload)
  },
    // type select perlu data array
  SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID_ArrData({ commit }, payload) {
    commit('SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID_ArrData', payload)
  },
    
  SET_SURAT_JALAN_ETD({ commit }, payload) {
    commit('SET_SURAT_JALAN_ETD', payload)
  },
  SET_SURAT_JALAN_ETD_ValueData({ commit }, payload) {
    commit('SET_SURAT_JALAN_ETD_ValueData', payload)
  },
    
  SET_SURAT_JALAN_ETA({ commit }, payload) {
    commit('SET_SURAT_JALAN_ETA', payload)
  },
  SET_SURAT_JALAN_ETA_ValueData({ commit }, payload) {
    commit('SET_SURAT_JALAN_ETA_ValueData', payload)
  },
    
  SET_SURAT_JALAN_DRIVER_ID({ commit }, payload) {
    commit('SET_SURAT_JALAN_DRIVER_ID', payload)
  },
  SET_SURAT_JALAN_DRIVER_ID_ValueData({ commit }, payload) {
    commit('SET_SURAT_JALAN_DRIVER_ID_ValueData', payload)
  },
    // type select perlu data array
  SET_SURAT_JALAN_DRIVER_ID_ArrData({ commit }, payload) {
    commit('SET_SURAT_JALAN_DRIVER_ID_ArrData', payload)
  },
  /* SURAT JALAN END */

  /* IRREGULARITIES RETURN*/
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_TYPE({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_TYPE', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_TYPE_isDisabled({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_TYPE_isDisabled', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_TYPE_ValueData({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_TYPE_ValueData', payload)
  },
    // type select perlu data array
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_TYPE_ArrData({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_TYPE_ArrData', payload)
  },
    
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_NAME({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_NAME', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_NAME_isDisabled({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_NAME_isDisabled', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_NAME_ValueData({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_NAME_ValueData', payload)
  },
    
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_PHONE({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_PHONE', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_PHONE_isDisabled({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_PHONE_isDisabled', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_PHONE_ValueData({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_PHONE_ValueData', payload)
  },
    
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ADDRESS({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ADDRESS', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ADDRESS_isDisabled({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ADDRESS_isDisabled', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ADDRESS_ValueData({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ADDRESS_ValueData', payload)
  },
    
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ONCHANGE_ADDRESS({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ONCHANGE_ADDRESS', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_isDisabled({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_isDisabled', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_ValueData({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_ValueData', payload)
  },
    // type select perlu data array
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_ArrData({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_ONCHANGE_ADDRESS_ArrData', payload)
  },
    
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_SUBDISTRICT_ID({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_SUBDISTRICT_ID', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_SUBDISTRICT_ID_isDisabled({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_SUBDISTRICT_ID_isDisabled', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_SUBDISTRICT_ID_ValueData({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_DESTINATION_SUBDISTRICT_ID_ValueData', payload)
  },
    
  SET_IRREGURALITIES_RETURN_DESTINATION_ZIP_CODE({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_ZIP_CODE', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_ZIP_CODE_isDisabled({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_ZIP_CODE_isDisabled', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_ZIP_CODE_ValueData({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_ZIP_CODE_ValueData', payload)
  },
    
  SET_IRREGURALITIES_RETURN_DESTINATION_TARIFF_CODE({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_TARIFF_CODE', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_TARIFF_CODE_isDisabled({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_TARIFF_CODE_isDisabled', payload)
  },
  SET_IRREGURALITIES_RETURN_DESTINATION_TARIFF_CODE_ValueData({ commit }, payload) {
    commit('SET_IRREGURALITIES_RETURN_DESTINATION_TARIFF_CODE_ValueData', payload)
  },
  /* IRREGULARITIES RETURN END*/   
  
  //===== ACTION Cost To Cost Setting=======
  SET_COST_TO_COST_SETTING_COST_OWNER_NODE_ID({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_OWNER_NODE_ID', payload)
  },
  SET_COST_TO_COST_SETTING_COST_OWNER_NODE_ID_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_OWNER_NODE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_COST_TO_COST_SETTING_COST_OWNER_NODE_ID_ArrData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_OWNER_NODE_ID_ArrData', payload)
  },

  SET_COST_TO_COST_SETTING_COST_PAYER_NODE_ID({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_PAYER_NODE_ID', payload)
  },
  SET_COST_TO_COST_SETTING_COST_PAYER_NODE_ID_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_PAYER_NODE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_COST_TO_COST_SETTING_COST_PAYER_NODE_ID_ArrData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_PAYER_NODE_ID_ArrData', payload)
  },


  SET_COST_TO_COST_SETTING_DYNAMICINPUTCOMPONENT_COST_TO_COST_RULE({ commit }, payload) {
    commit('SET_COST_TO_COST_SETTING_DYNAMICINPUTCOMPONENT_COST_TO_COST_RULE', payload)
  },
  SET_COST_TO_COST_SETTING_DYNAMICINPUTCOMPONENT_COST_TO_COST_DETAIL_VALUE({ commit }, payload) {
    commit('SET_COST_TO_COST_SETTING_DYNAMICINPUTCOMPONENT_COST_TO_COST_DETAIL_VALUE', payload)
  },

  SET_COST_TO_COST_SETTING_COST_GROUP_CODE({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_GROUP_CODE', payload)
  },
  SET_COST_TO_COST_SETTING_COST_GROUP_CODE_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_GROUP_CODE_ValueData', payload)
  },
  // type select perlu data array
  SET_COST_TO_COST_SETTING_COST_GROUP_CODE_ArrData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_GROUP_CODE_ArrData', payload)
  },

  SET_COST_TO_COST_SETTING_RULE_CONDITION({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_RULE_CONDITION', payload)
  },
  SET_COST_TO_COST_SETTING_RULE_CONDITION_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_RULE_CONDITION_ValueData', payload)
  },
  // type select perlu data array
  SET_COST_TO_COST_SETTING_RULE_CONDITION_ArrData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_RULE_CONDITION_ArrData', payload)
  },

  SET_COST_TO_COST_SETTING_CONDITION({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_CONDITION', payload)
  },
  SET_COST_TO_COST_SETTING_CONDITION_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_CONDITION_ValueData', payload)
  },
  // type select perlu data array
  SET_COST_TO_COST_SETTING_CONDITION_ArrData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_CONDITION_ArrData', payload)
  },

  SET_COST_TO_COST_SETTING_RULE_VALUE({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_RULE_VALUE', payload)
  },
  SET_COST_TO_COST_SETTING_RULE_VALUE_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_RULE_VALUE_ValueData', payload)
  },
  // type select perlu data array
  SET_COST_TO_COST_SETTING_RULE_VALUE_ArrData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_RULE_VALUE_ArrData', payload)
  },

  SET_COST_TO_COST_SETTING_COST_TYPE_CODE({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_TYPE_CODE', payload)
  },
  SET_COST_TO_COST_SETTING_COST_TYPE_CODE_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_TYPE_CODE_ValueData', payload)
  },
  // type select perlu data array
  SET_COST_TO_COST_SETTING_COST_TYPE_CODE_ArrData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_TYPE_CODE_ArrData', payload)
  },

  SET_COST_TO_COST_SETTING_MIN_KG({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_MIN_KG', payload)
  },
  SET_COST_TO_COST_SETTING_MIN_KG_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_MIN_KG_ValueData', payload)
  },

  SET_COST_TO_COST_SETTING_MAX_KG({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_MAX_KG', payload)
  },
  SET_COST_TO_COST_SETTING_MAX_KG_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_MAX_KG_ValueData', payload)
  },

  SET_COST_TO_COST_SETTING_COST_VALUE({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_VALUE', payload)
  },
  SET_COST_TO_COST_SETTING_COST_VALUE_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_COST_VALUE_ValueData', payload)
  },

  SET_COST_TO_COST_SETTING_NAME({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_NAME', payload)
  },
  SET_COST_TO_COST_SETTING_NAME_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_NAME_ValueData', payload)
  },

  SET_COST_TO_COST_SETTING_TRACKING_TYPE_NAME({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_TRACKING_TYPE_NAME', payload)
  },
  SET_COST_TO_COST_SETTING_TRACKING_TYPE_NAME_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_TRACKING_TYPE_NAME_ValueData', payload)
  },
  // type select perlu data array
  SET_COST_TO_COST_SETTING_TRACKING_TYPE_NAME_ArrData({ commit }, payload) {
  commit('SET_COST_TO_COST_SETTING_TRACKING_TYPE_NAME_ArrData', payload)
  },
  //===== END ACTION Cost To Cost Setting=======


  //======= ACTION COSTING REPORT=======
  SET_COST_TO_COST_REPORT_COST_OWNER_NODE_ID({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_COST_OWNER_NODE_ID', payload)
  },
  SET_COST_TO_COST_REPORT_COST_OWNER_NODE_ID_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_COST_OWNER_NODE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_COST_TO_COST_REPORT_COST_OWNER_NODE_ID_ArrData({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_COST_OWNER_NODE_ID_ArrData', payload)
  },

  SET_COST_TO_COST_REPORT_COST_PAYER_NODE_ID({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_COST_PAYER_NODE_ID', payload)
  },
  SET_COST_TO_COST_REPORT_COST_PAYER_NODE_ID_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_COST_PAYER_NODE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_COST_TO_COST_REPORT_COST_PAYER_NODE_ID_ArrData({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_COST_PAYER_NODE_ID_ArrData', payload)
  },

  SET_COST_TO_COST_REPORT_COST_GROUP_CODE({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_COST_GROUP_CODE', payload)
  },
  SET_COST_TO_COST_REPORT_COST_GROUP_CODE_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_COST_GROUP_CODE_ValueData', payload)
  },
  // type select perlu data array
  SET_COST_TO_COST_REPORT_COST_GROUP_CODE_ArrData({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_COST_GROUP_CODE_ArrData', payload)
  },
  SET_COST_TO_COST_REPORT_NAME({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_NAME', payload)
  },
  SET_COST_TO_COST_REPORT_NAME_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_NAME_ValueData', payload)
  },
  // type select perlu data array
  SET_COST_TO_COST_REPORT_NAME_ArrData({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_NAME_ArrData', payload)
  },

  SET_COST_TO_COST_REPORT_DATE_FROM({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_DATE_FROM', payload)
  },
  SET_COST_TO_COST_REPORT_DATE_FROM_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_DATE_FROM_ValueData', payload)
  },

  SET_COST_TO_COST_REPORT_DATE_TO({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_DATE_TO', payload)
  },
  SET_COST_TO_COST_REPORT_DATE_TO_ValueData({ commit }, payload) {
  commit('SET_COST_TO_COST_REPORT_DATE_TO_ValueData', payload)
  },
  //======= END ACTION COSTING REPORT=======

  //======= Start Packing Kayu =======
  SET_PACKINGKAYU_KOLI_NUMBER({ commit }, payload) {
  commit('SET_PACKINGKAYU_KOLI_NUMBER', payload)
  },
  SET_PACKINGKAYU_KOLI_NUMBER_ValueData({ commit }, payload) {
  commit('SET_PACKINGKAYU_KOLI_NUMBER_ValueData', payload)
  },

  SET_PACKINGKAYU_KOLI_ACTUAL_BEFORE({ commit }, payload) {
  commit('SET_PACKINGKAYU_KOLI_ACTUAL_BEFORE', payload)
  },
  SET_PACKINGKAYU_KOLI_ACTUAL_BEFORE_ValueData({ commit }, payload) {
  commit('SET_PACKINGKAYU_KOLI_ACTUAL_BEFORE_ValueData', payload)
  },

  SET_PACKINGKAYU_KOLI_ACTUAL_WEIGHT({ commit }, payload) {
  commit('SET_PACKINGKAYU_KOLI_ACTUAL_WEIGHT', payload)
  },
  SET_PACKINGKAYU_KOLI_ACTUAL_WEIGHT_ValueData({ commit }, payload) {
  commit('SET_PACKINGKAYU_KOLI_ACTUAL_WEIGHT_ValueData', payload)
  },

  SET_PACKINGKAYU_KOLI_HEIGHT({ commit }, payload) {
  commit('SET_PACKINGKAYU_KOLI_HEIGHT', payload)
  },
  SET_PACKINGKAYU_KOLI_HEIGHT_ValueData({ commit }, payload) {
  commit('SET_PACKINGKAYU_KOLI_HEIGHT_ValueData', payload)
  },

  SET_PACKINGKAYU_KOLI_WIDTH({ commit }, payload) {
  commit('SET_PACKINGKAYU_KOLI_WIDTH', payload)
  },
  SET_PACKINGKAYU_KOLI_WIDTH_ValueData({ commit }, payload) {
  commit('SET_PACKINGKAYU_KOLI_WIDTH_ValueData', payload)
  },

  SET_PACKINGKAYU_KOLI_LENGTH({ commit }, payload) {
  commit('SET_PACKINGKAYU_KOLI_LENGTH', payload)
  },
  SET_PACKINGKAYU_KOLI_LENGTH_ValueData({ commit }, payload) {
  commit('SET_PACKINGKAYU_KOLI_LENGTH_ValueData', payload)
  },
  //======= END Packing Kayu =======

  //======= START EMPLOYEE =======
  SET_EMPLOYEE_EMPLOYEE_NIK({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_NIK', payload)
  },
  SET_EMPLOYEE_EMPLOYEE_NIK_ValueData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_NIK_ValueData', payload)
  },

  SET_EMPLOYEE_EMPLOYEE_NAME({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_NAME', payload)
  },
  SET_EMPLOYEE_EMPLOYEE_NAME_ValueData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_NAME_ValueData', payload)
  },

  SET_EMPLOYEE_EMPLOYEE_PHONE_NUMBER({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_PHONE_NUMBER', payload)
  },
  SET_EMPLOYEE_EMPLOYEE_PHONE_NUMBER_ValueData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_PHONE_NUMBER_ValueData', payload)
  },

  SET_EMPLOYEE_EMPLOYEE_BIRTH_PLACE({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_BIRTH_PLACE', payload)
  },
  SET_EMPLOYEE_EMPLOYEE_BIRTH_PLACE_ValueData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_BIRTH_PLACE_ValueData', payload)
  },

  SET_EMPLOYEE_EMPLOYEE_BIRTH_DATE({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_BIRTH_DATE', payload)
  },
  SET_EMPLOYEE_EMPLOYEE_BIRTH_DATE_ValueData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_BIRTH_DATE_ValueData', payload)
  },

  SET_EMPLOYEE_EMPLOYEE_GENDER({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_GENDER', payload)
  },
  SET_EMPLOYEE_EMPLOYEE_GENDER_ValueData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_GENDER_ValueData', payload)
  },
  // type select perlu data array
  SET_EMPLOYEE_EMPLOYEE_GENDER_ArrData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_GENDER_ArrData', payload)
  },

  SET_EMPLOYEE_EMPLOYEE_NO_SIM({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_NO_SIM', payload)
  },
  SET_EMPLOYEE_EMPLOYEE_NO_SIM_ValueData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_NO_SIM_ValueData', payload)
  },

  SET_EMPLOYEE_EMPLOYEE_NO_KTP({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_NO_KTP', payload)
  },
  SET_EMPLOYEE_EMPLOYEE_NO_KTP_ValueData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_NO_KTP_ValueData', payload)
  },

  SET_EMPLOYEE_EMPLOYEE_EMPLOYEMENT_STATUS({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_EMPLOYEMENT_STATUS', payload)
  },
  SET_EMPLOYEE_EMPLOYEE_EMPLOYEMENT_STATUS_ValueData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_EMPLOYEMENT_STATUS_ValueData', payload)
  },

  SET_EMPLOYEE_EMPLOYEE_TYPE_ID({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_TYPE_ID', payload)
  },
  SET_EMPLOYEE_EMPLOYEE_TYPE_ID_ValueData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_TYPE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_EMPLOYEE_EMPLOYEE_TYPE_ID_ArrData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_TYPE_ID_ArrData', payload)
  },

  SET_EMPLOYEE_EMPLOYEE_NODE_ID({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_NODE_ID', payload)
  },
  SET_EMPLOYEE_EMPLOYEE_NODE_ID_ValueData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_NODE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_EMPLOYEE_EMPLOYEE_NODE_ID_ArrData({ commit }, payload) {
  commit('SET_EMPLOYEE_EMPLOYEE_NODE_ID_ArrData', payload)
  },

  SET_EMPLOYEE_IS_ACTIVE({ commit }, payload) {
  commit('SET_EMPLOYEE_IS_ACTIVE', payload)
  },
  SET_EMPLOYEE_IS_ACTIVE_ValueData({ commit }, payload) {
  commit('SET_EMPLOYEE_IS_ACTIVE_ValueData', payload)
  },
  //====== end employee ======
}
