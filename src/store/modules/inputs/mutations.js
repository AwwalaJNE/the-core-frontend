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

  // tariff
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
    
  SET_VEHICLE_TYPE_IS_ACTIVE(state, payload) {
    state.vehicle_type.is_active.value = payload
  },
  SET_VEHICLE_TYPE_IS_ACTIVE_ValueData(state, payload) {
    state.vehicle_type.is_active.valueData = payload
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

  SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID(state, payload) {
    state.pickup_list.pickup_courier_employee_id.value = payload
  },
  SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID_ValueData(state, payload) {
    state.pickup_list.pickup_courier_employee_id.valueData = payload
  },
  SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID_ArrData(state, payload) {
    state.pickup_list.pickup_courier_employee_id.hasOwnProperty('arrData') ?
        state.pickup_list.pickup_courier_employee_id.arrData = payload :
        state.pickup_list.pickup_courier_employee_id.arrData = []
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
  //END PICKUP LIST
}
