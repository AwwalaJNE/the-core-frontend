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

  //end node link

  // tariff
  SET_TARIFF_TARIFF_GROUP(state, payload) {
    state.tariff.tariff_group.value = payload
  },
  SET_TARIFF_TARIFF_GROUP_visible(state, payload) {
    state.tariff.tariff_group.visible = payload
  },
  SET_TARIFF_TARIFF_GROUP_ValueData(state, payload) {
    state.tariff.tariff_group.valueData = payload
  },
  SET_TARIFF_TARIFF_GROUP_ArrData(state, payload) {
    state.tariff.tariff_group.hasOwnProperty('arrData') ?
    state.tariff.tariff_group.arrData = payload :
    state.tariff.tariff_group.arrData = []
  },
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

  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_COURIER_EMPLOYEE_ID(state, payload) {
    state.pickup_schedule.pickup_schedule_courier_employee_id.value = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_COURIER_EMPLOYEE_ID_ValueData(state, payload) {
    state.pickup_schedule.pickup_schedule_courier_employee_id.valueData = payload
  },
  SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_COURIER_EMPLOYEE_ID_ArrData(state, payload) {
    state.pickup_schedule.pickup_schedule_courier_employee_id.hasOwnProperty('arrData') ?
        state.pickup_schedule.pickup_schedule_courier_employee_id.arrData = payload :
        state.pickup_schedule.pickup_schedule_courier_employee_id.arrData = []
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
  SET_SURAT_MUATAN_NODE_ID_ORIGIN_ArrData(state, payload) {
    state.surat_muatan.node_id_origin.hasOwnProperty('arrData') ?
        state.surat_muatan.node_id_origin.arrData = payload :
        state.surat_muatan.node_id_origin.arrData = []
  },

  SET_SURAT_MUATAN_NODE_ID_TRANSIT_1(state, payload) {
    state.surat_muatan.node_id_transit_1.value = payload
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_1_ValueData(state, payload) {
    state.surat_muatan.node_id_transit_1.valueData = payload
  },
  SET_SURAT_MUATAN_NODE_ID_TRANSIT_1_ArrData(state, payload) {
    state.surat_muatan.node_id_transit_1.hasOwnProperty('arrData') ?
        state.surat_muatan.node_id_transit_1.arrData = payload :
        state.surat_muatan.node_id_transit_1.arrData = []
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

  SET_SURAT_MUATAN_VEHICLE_MODE_ID(state, payload) {
    state.surat_muatan.vehicle_mode_id.value = payload
  },
  SET_SURAT_MUATAN_VEHICLE_MODE_ID_ValueData(state, payload) {
    state.surat_muatan.vehicle_mode_id.valueData = payload
  },
  SET_SURAT_MUATAN_VEHICLE_MODE_ID_ArrData(state, payload) {
    state.surat_muatan.vehicle_mode_id.hasOwnProperty('arrData') ?
        state.surat_muatan.vehicle_mode_id.arrData = payload :
        state.surat_muatan.vehicle_mode_id.arrData = []
  },

  SET_SURAT_MUATAN_MANIFEST_TYPE_ID(state, payload) {
    state.surat_muatan.manifest_type_id.value = payload
  },
  SET_SURAT_MUATAN_MANIFEST_TYPE_ID_visible(state, payload) {
    state.surat_muatan.manifest_type_id.visible = payload
  },
  SET_SURAT_MUATAN_MANIFEST_TYPE_ID_ValueData(state, payload) {
    state.surat_muatan.manifest_type_id.valueData = payload
  },
  SET_SURAT_MUATAN_MANIFEST_TYPE_ID_ArrData(state, payload) {
    state.surat_muatan.manifest_type_id.hasOwnProperty('arrData') ?
        state.surat_muatan.manifest_type_id.arrData = payload :
        state.surat_muatan.manifest_type_id.arrData = []
  },

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
    
}
