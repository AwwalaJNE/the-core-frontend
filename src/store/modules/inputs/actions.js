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
}
