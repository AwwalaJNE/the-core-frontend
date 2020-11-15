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
 

  // ==== Node ====
  SET_NODE_NODE_NAME(state, payload) {
    state.node.node_name.value = payload
  },
  SET_NODE_NODE_NAME_ValueData(state, payload) {
    state.node.node_name.valueData = payload
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
  SET_NODE_NODE_TARIFF_CODE_ArrData(state, payload) {
    state.node.node_tariff_code.hasOwnProperty('arrData') ?
    state.node.node_tariff_code.arrData = payload :
    state.node.node_tariff_code.arrData = []
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

  SET_NODE_IS_ACTIVE(state, payload) {
    state.node.is_active.value = payload
  },
  SET_NODE_IS_ACTIVE_ValueData(state, payload) {
    state.node.is_active.valueData = payload
  },
}
