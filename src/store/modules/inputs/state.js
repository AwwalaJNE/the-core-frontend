// rule : "required|min_value:8"

export default {
  user: {
    user_login: {
      label: "User login*",
      key: "user_login",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    user_name: {
      label: "Name*",
      key: "user_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    user_email: {
      label: "Email",
      key: "user_email",
      rule: "email",
      typeInput: "text|email",
      typeData: "String",
      valueData: null,
      value: ''
    },
    password: {
      label: "Password",
      key: "password",
      rule: "min_value:8",
      typeInput: "text|password",
      typeData: "String",
      valueData: null,
      value: ''
    },
    user_role_id: {
      label: "Role*",
      key: "user_role_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
  },
  role: {
    user_role_name: {
      label: "Role*",
      key: "user_role_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    user_role_code: {
      label: "Role code*",
      key: "user_role_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
  },

  geolocation_country: {
    geolocation_country_code: {
      label: "Country code*",
      key: "geolocation_country_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    geolocation_country_name: {
      label: "Country name*",
      key: "geolocation_country_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_currency_code: {
      label: "Currency code*",
      key: "tariff_currency_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      // arrData: [],
      valueData: null,
      value: ''
    },
    is_active: {
      label: "Active|Unactive",
      key: "is_active",
      rule: "",
      typeInput: "Boolean",
      typeData: "Boolean",
      valueData: true,
      value: true
    },
  },

  geolocation_province: {
    geolocation_country_id: {
      label: "Country*",
      key: "geolocation_country_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    geolocation_province_time_zone: {
      label: "Timezone*",
      key: "geolocation_province_time_zone",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    geolocation_province_name: {
      label: "Province Name*",
      key: "geolocation_province_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    is_active: {
      label: "Active|Unactive",
      key: "is_active",
      rule: "",
      typeInput: "Boolean",
      typeData: "Boolean",
      valueData: true,
      value: true
    },
  },

  geolocation_city: {
    geolocation_province_id: {
      label: "Province*",
      key: "geolocation_province_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    geolocation_city_name: {
      label: "City Name*",
      key: "geolocation_city_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    is_active: {
      label: "Active|Unactive",
      key: "is_active",
      rule: "",
      typeInput: "Boolean",
      typeData: "Boolean",
      valueData: true,
      value: true
    },
  },

  geolocation_district: {
    geolocation_city_id: {
      label: "City*",
      key: "geolocation_city_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    geolocation_district_name: {
      label: "District Name*",
      key: "geolocation_district_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    is_active: {
      label: "Active|Unactive",
      key: "is_active",
      rule: "",
      typeInput: "Boolean",
      typeData: "Boolean",
      valueData: true,
      value: true
    },
  },

  geolocation_subdistrict: {
    geolocation_district_id: {
      label: "District*",
      key: "geolocation_district_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    geolocation_subdistrict_name: {
      label: "Subdistrict Name*",
      key: "geolocation_subdistrict_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    geolocation_subdistrict_zip_code: {
      label: "Zip code*",
      key: "geolocation_subdistrict_zip_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    geolocation_subdistrict_tarif_code: {
      label: "Subdistrict tarif code*",
      key: "geolocation_subdistrict_tarif_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    geolocation_subdistrict_zona_wilayah: {
      label: "Subdistrict zona wilayah*",
      key: "geolocation_subdistrict_zona_wilayah",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    geolocation_subdistrict_kode_routing: {
      label: "Subdistrict kode routing*",
      key: "geolocation_subdistrict_kode_routing",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    is_active: {
      label: "Active|Unactive",
      key: "is_active",
      rule: "",
      typeInput: "Boolean",
      typeData: "Boolean",
      valueData: true,
      value: true
    },
  },


  customer: {
    n: {
      label: "node*",
      key: "n",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    customer_name: {
      label: "Customer name*",
      key: "customer_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    customer_code: {
      label: "Customer code*",
      key: "customer_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    customer_date_of_birth: {
      label: "Customer date of birth",
      key: "customer_date_of_birth",
      rule: "",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    customer_address: {
      label: "Customer address*",
      key: "customer_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    customer_subdistrict_id: {
      label: "Customer subdistrict*",
      key: "customer_subdistrict_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    customer_email: {
      label: "Customer email*",
      key: "customer_email",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    customer_phone: {
      label: "Customer phone*",
      key: "customer_phone",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    customer_type_id: {
      label: "Customer type*",
      key: "customer_type_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    customer_fax: {
      label: "Customer fax*",
      key: "customer_fax",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    customer_identity_card_number: {
      label: "Customer identity card number*",
      key: "customer_identity_card_number",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    customer_tax_number: {
      label: "Customer tax number*",
      key: "customer_tax_number",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    customer_tax_number_address: {
      label: "Customer tax number address*",
      key: "customer_tax_number_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    customer_commodity: {
      label: "Customer commodity*",
      key: "customer_commodity",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    customer_default_node_id: {
      label: "Customer default node",
      key: "customer_default_node_id",
      rule: "",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    mapPicker:{
      // define mapPicker hanya untuk menunjukan urutan map akan ditampilkan
      typeInput: "mapPicker",
    },
    customer_latitude: {
      label: "Customer latitude",
      key: "customer_latitude",
      rule: "",
      mapPicker: true,
      typeInput: "text|latitude",
      typeData: "Number",
      valueData: 0,
      value: 0
    },
    customer_longitude: {
      label: "Customer longitude",
      key: "customer_longitude",
      rule: "",
      mapPicker: true,
      typeInput: "text|longitude",
      typeData: "Number",
      valueData: 0,
      value: 0
    },
    customer_address_type: {
      label: "Customer address type",
      key: "customer_address_type",
      rule: "",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    customer_corporate_credit: {
      label: "Customer corporate credit*",
      key: "customer_corporate_credit",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    
  },

  node: {
    node_name: {
      label: "Node name*",
      key: "node_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    node_type_id: {
      label: "Node type",
      key: "node_type_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_phone: {
      label: "Node phone*",
      key: "node_phone",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    node_npwp: {
      label: "Node npwp*",
      key: "node_npwp",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    node_code: {
      label: "Node code*",
      key: "node_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    node_tariff_code: {
      label: "Tariff code",
      key: "node_tariff_code",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    mapPicker:{
      // define mapPicker hanya untuk menunjukan urutan map akan ditampilkan
      typeInput: "mapPicker",
    },
    node_lat: {
      label: "Node latitude*",
      key: "node_lat",
      rule: "required",
      mapPicker: true,
      typeInput: "text|latitude",
      typeData: "Number",
      valueData: 0,
      value: 0
    },
    node_lon: {
      label: "Node longitude*",
      key: "node_lon",
      rule: "required",
      mapPicker: true,
      typeInput: "text|longitude",
      typeData: "Number",
      valueData: 0,
      value: 0
    },
    default_node_link_id: {
      label: "Default node link*",
      key: "default_node_link_id",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    default_node_alternate_address_id: {
      label: "Default node alternate address",
      key: "default_node_alternate_address_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_allow_special_cargo: {
      titleLabel: "Special cargo",
      label: "Allow|Not allowed",
      key: "node_allow_special_cargo",
      rule: "required",
      typeInput: "Boolean",
      typeData: "Boolean",
      valueData: true,
      value: true
    },
    node_allow_corporate_transaction: {
      titleLabel: "Corporate transaction",
      label: "Allow|Not allowed",
      key: "node_allow_corporate_transaction",
      rule: "required",
      typeInput: "Boolean",
      typeData: "Boolean",
      valueData: true,
      value: true
    },
    node_is_external: {
      titleLabel: "is external",
      label: "True|False",
      key: "node_is_external",
      rule: "required",
      typeInput: "Boolean",
      typeData: "Boolean",
      valueData: true,
      value: true
    },
    is_active: {
      label: "Active|Unactive",
      key: "is_active",
      rule: "",
      typeInput: "Boolean",
      typeData: "Boolean",
      valueData: true,
      value: true
    },
  }
  
}
