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
  user_role: {
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
      valueData: false,
      value: false
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
      valueData: false,
      value: false
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
      valueData: false,
      value: false
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
      valueData: false,
      value: false
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
      valueData: false,
      value: false
    },
  },

  
}
