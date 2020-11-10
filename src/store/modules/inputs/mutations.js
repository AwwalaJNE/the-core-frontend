import { ADD_NAME } from '../../mutations-type'

export default {
  // ==== user ====
  SET_USER_USER_NAME(state, payload) {
    state.user.user_name.value = payload
  },
  SET_USER_USER_LOGIN(state, payload) {
    state.user.user_login.value = payload
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
  SET_USER_USER_NAME_ValueData(state, payload) {
    state.user.user_name.valueData = payload
  },
  SET_USER_USER_LOGIN_ValueData(state, payload) {
    state.user.user_login.valueData = payload
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
 
}
