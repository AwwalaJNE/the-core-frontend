// rule : "required|min:8"

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
      rule: "min:8",
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
      uploadInput: false,
      label: ''
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
      typeInput: "select",
      typeData: "String",
      arrData: [],
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
  },

  node_alternate_address: {
    node_id: {
      label: "Node",
      key: "node_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_alternate_address_name: {
      label: "Node alternate address name*",
      key: "node_alternate_address_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    node_alternate_address_address: {
      label: "Node alternate address address*",
      key: "node_alternate_address_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    node_alternate_address_subdistrict_id: {
      label: "Node alternate address subdistrict*",
      key: "node_alternate_address_subdistrict_id",
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
    node_alternate_address_latitude: {
      label: "Node alternate address latitude*",
      key: "node_alternate_address_latitude",
      rule: "required",
      mapPicker: true,
      typeInput: "text|latitude",
      typeData: "Number",
      valueData: 0,
      value: 0
    },
    node_alternate_address_longitude: {
      label: "Node alternate address longitude*",
      key: "node_alternate_address_longitude",
      rule: "required",
      mapPicker: true,
      typeInput: "text|longitude",
      typeData: "Number",
      valueData: 0,
      value: 0
    },
    node_alternate_address_phone: {
      label: "Node_alternate_address_phone*",
      key: "node_alternate_address_phone",
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

  nodeLink: {
    node_link_origin_id: {
      label: "origin",
      key: "node_link_origin_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_link_destination_id: {
      label: "Destination",
      key: "node_link_destination_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_link_vehicle_mode_id: {
      label: "Vehicle Type",
      key: "node_link_vehicle_mode_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
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

  tariff: {
    tariff_origin: {
      label: "Tariff origin*",
      key: "tariff_origin",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_destination: {
      label: "Tariff destination*",
      key: "tariff_destination",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_start_date: {
      label: "Tariff start date*",
      key: "tariff_start_date",
      rule: "required",
      typeInput: "date",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_expiry_date: {
      label: "Tariff expiry date*",
      key: "tariff_expiry_date",
      rule: "required",
      typeInput: "date",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_service_code: {
      label: "Tariff service code*",
      key: "tariff_service_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_currency: {
      label: "Tariff currency*",
      key: "tariff_currency",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_vehicle_mode_id: {
      label: "Tariff vehicle mode*",
      key: "tariff_vehicle_mode_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    tariff_amount_1: {
      label: "Tariff amount 1*",
      key: "tariff_amount_1",
      rule: "required",
      typeInput: "text",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_weight_1: {
      label: "Tariff weight 1*",
      key: "tariff_weight_1",
      rule: "required",
      typeInput: "text",
      typeData: "Number",
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

  
  tariff_special: {
    tariff_special_name: {
      label: "Tariff special name*",
      key: "tariff_special_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_special_condition_service_code: {
      label: "Tariff special condition service code*",
      key: "tariff_special_condition_service_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_special_start_date: {
      label: "Tariff special start date*",
      key: "tariff_special_start_date",
      rule: "required",
      typeInput: "date",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_special_expiry_date: {
      label: "Tariff special expiry date*",
      key: "tariff_special_expiry_date",
      rule: "required",
      typeInput: "date",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_special_type: {
      label: "Tariff special type*",
      key: "tariff_special_type",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_special_amount: {
      label: "Tariff special amount*",
      key: "tariff_special_amount",
      rule: "required",
      typeInput: "text",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_max_amount: {
      label: "Tariff special max amount",
      key: "tariff_special_max_amount",
      rule: "",
      typeInput: "text",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    // dynamicInput
    dynamicInputComponent:{
      // define dynamicInput hanya untuk menunjukan urutan dynamicInput akan ditampilkan
      typeInput: "dynamicInputComponent",
    },
    tariff_special_condition_from_country: {
      label: "Tariff special condition from country",
      key: "tariff_special_condition_from_country",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_from_province: {
      label: "Tariff special condition from province",
      key: "tariff_special_condition_from_province",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_from_city: {
      label: "Tariff special condition from city",
      key: "tariff_special_condition_from_city",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_from_district: {
      label: "Tariff special condition from district",
      key: "tariff_special_condition_from_district",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_from_subdistrict: {
      label: "Tariff special condition from subdistrict",
      key: "tariff_special_condition_from_subdistrict",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_from_zip_code: {
      label: "Tariff special condition from zip code",
      key: "tariff_special_condition_from_zip_code",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_from_tariff_code: {
      label: "Tariff special condition from tariff code",
      key: "tariff_special_condition_from_tariff_code",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_special_condition_to_country: {
      label: "Tariff special condition to country",
      key: "tariff_special_condition_to_country",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_to_province: {
      label: "Tariff special condition to province",
      key: "tariff_special_condition_to_province",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_to_city: {
      label: "Tariff special condition to city",
      key: "tariff_special_condition_to_city",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_to_district: {
      label: "Tariff special condition to district",
      key: "tariff_special_condition_to_district",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_to_subdistrict: {
      label: "Tariff special condition to subdistrict",
      key: "tariff_special_condition_to_subdistrict",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_to_zip_code: {
      label: "Tariff special condition to zip code",
      key: "tariff_special_condition_to_zip_code",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_to_tariff_code: {
      label: "Tariff special condition to tariff code",
      key: "tariff_special_condition_to_tariff_code",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_special_condition_min_koli: {
      label: "Tariff special condition min koli",
      key: "tariff_special_condition_min_koli",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_max_koli: {
      label: "Tariff special condition max koli",
      key: "tariff_special_condition_max_koli",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_min_weight: {
      label: "Tariff special condition min weight",
      key: "tariff_special_condition_min_weight",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_max_weight: {
      label: "Tariff special condition max weight",
      key: "tariff_special_condition_max_weight",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_min_volume: {
      label: "tariff special condition min volume",
      key: "tariff_special_condition_min_volume",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    tariff_special_condition_max_volume: {
      label: "tariff special condition max volume",
      key: "tariff_special_condition_max_volume",
      rule: "",
      typeInput: "dynamicInput",
      typeData: "Number",
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

  surcharge: {
    surcharge_name: {
      label: "Surcharge name*",
      key: "surcharge_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    surcharge_type_id: {
      label: "Surcharge type",
      key: "surcharge_type_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    surcharge_condition: {
      label: "Surcharge condition*",
      key: "surcharge_condition",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    surcharge_formula: {
      label: "Surcharge formula*",
      key: "surcharge_formula",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    auto_apply: {
      titleLabel: "auto apply",
      label: "True|False",
      key: "auto_apply",
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
  },

  surcharge_type: {
    surcharge_type_name: {
      label: "Surcharge type name*",
      key: "surcharge_type_name",
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

  vehicle: {
    vehicle_name: {
      label: "vehicle name*",
      key: "vehicle_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    vehicle_police_no: {
      label: "Vehicle police no*",
      key: "vehicle_police_no",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    vehicle_owned_by: {
      label: "Vehicle owned by",
      key: "vehicle_owned_by",
      rule: "",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    vehicle_max_weight: {
      label: "Vehicle max weight",
      key: "vehicle_max_weight",
      rule: "",
      typeInput: "text",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    vehicle_max_volume: {
      label: "Vehicle max volume",
      key: "vehicle_max_volume",
      rule: "",
      typeInput: "text",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    vehicle_type_id: {
      label: "Vehicle type",
      key: "vehicle_type_id",
      rule: "",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    vehicle_node_id: {
      label: "vehicle node",
      key: "vehicle_node_id",
      rule: "",
      typeInput: "select",
      typeData: "String",
      arrData: [],
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

  vehicle_mode: {
    vehicle_mode_name: {
      label: "Vehicle mode name*",
      key: "vehicle_mode_name",
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

  vehicle_type: {
    vehicle_type_name: {
      label: "Vehicle type name*",
      key: "vehicle_type_name",
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

  //form pickup list
  pickup_list: {
    pickup_name: {
      label: "Name*",
      key: "pickup_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    pic_name: {
      label: "PIC",
      key: "pic_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    pickup_phone_number: {
      label: "Phone*",
      key: "pickup_phone_number",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    pickup_address: {
      label: "Address*",
      key: "pickup_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    pickup_date: {
      label: "Date & Time",
      key: "pickup_date",
      rule: "required",
      typeInput: "date",
      typeData: "String",
      valueData: null,
      value: ''
    },
    pickup_node_id_destination: {
      label: "Request To",
      key: "pickup_node_id_destination",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    pickup_courier_employee_id: {
      label: "Courier",
      key: "pickup_courier_employee_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    pickup_remarks: {
      label: "Remark",
      key: "pickup_remarks",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    vehicle_type_id: {
      label: "vehicle node",
      key: "vehicle_type_id",
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
    pickup_latitude: {
      label: "Latitude*",
      key: "pickup_latitude",
      rule: "required",
      mapPicker: true,
      typeInput: "text|latitude",
      typeData: "Number",
      valueData: 0,
      value: 0
    },
    pickup_longitude: {
      label: "Longitude*",
      key: "pickup_longitude",
      rule: "required",
      mapPicker: true,
      typeInput: "text|longitude",
      typeData: "Number",
      valueData: 0,
      value: 0
    },
  },
  
}
