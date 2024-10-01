// rule : "required|min:8"

export default {
  bagging: {
    destination: {
      selected: [],
      dataArray: [
        {
          "label": null,
          "value": null
        }
      ]
    },
    service: {
      selected: [],
      dataArray: [
        {
          "label": null,
          "value": null
        }
      ]
    }
  },
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
    user_nik: {
      label: "User NIK*",
      key: "user_nik",
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
      rule: "min:7",
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
      width: '8',
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    user_node_id: {
      label: "User Node",
      key: "user_node_id",
      rule: "required",
      typeInput: "multipleSelector",
      width: '4',
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    dynamicinputcomponent_user_additional_role: {
      label: "Add Additional Role",
      key: "dynamicinputcomponent_user_additional_role",
      rule:"",
      typeInput: "dynamicinputcomponent",
      typeData: "Array",
      inputs: [
        {
          key: "user_additional_role_id",
          typeInput: "selectmultipletag",
          value: ''
        },
        {
          key: "user_additional_node_id",
          typeInput: "multipleSelector",
          value: ''
        },
        {
          key: "user_expiry_additional_role",
          typeInput: "date",
          value: ''
        }
      ],
      arrData: [],
      valueData: null,
      value: ''
    },
    user_additional_role_id: {
      label: "Additional Role",
      key: "user_additional_role_id",
      rule: "",
      typeInput: "selectmultipletag|hidden",
      width: '4',
      typeData: "String",
      arrData: [],
      valueData: null,
      value: '',
      visible: false
    },
    user_additional_node_id: {
      label: "Additional Node",
      key: "user_additional_node_id",
      rule: "",
      typeInput: "multipleSelector|hidden",
      width: '4',
      typeData: "String",
      visible: false,
      arrData: [],
      valueData: null,
      value: ''
    },
    user_expiry_additional_role: {
      label: "Date Expiry Additional Role",
      key: "user_expiry_additional_role",
      rule: "",
      typeInput: "date|hidden",
      width: '4',
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    employee_id: {
      label: "Employee Courier Delivery Name",
      key: "employee_id",
      rule: "",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    is_login_enable: {
      label: "Enable Login|Disable Login",
      key: "is_login_enable",
      rule: "",
      typeInput: "Boolean",
      typeData: "Boolean",
      valueData: true,
      value: true
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

  //employee
  employee: {
    employee_nik: {
      label: "NIK",
      key: "employee_nik",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    employee_code: {
      label: "Employee Code",
      key: "employee_code",
      rule: "required|maxlength:10",
      typeInput: "text",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    employee_name: {
      label: "Name",
      key: "employee_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    employee_phone_number: {
      label: "Phone Number",
      key: "employee_phone_number",
      rule: "required|numeric|min:8",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    employee_no_sim: {
      label: "No. SIM",
      key: "employee_no_sim",
      rule: "required|numeric|min:8",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    employee_no_ktp: {
      label: "No. KTP",
      key: "employee_no_ktp",
      rule: "required|numeric|min:5",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    employee_birth_place: {
      label: "Birth Place",
      key: "employee_birth_place",
      rule: "required",
      typeInput: "text",
      width: '4',
      typeData: "String",
      valueData: null,
      value: ''
    },
    employee_birth_date: {
      label: "Birth Date",
      key: "employee_birth_date",
      rule: "required",
      typeInput: "date",
      width: '4',
      typeData: "String",
      valueData: null,
      value: ''
    },
    employee_gender: {
      label: "Gender",
      key: "employee_gender",
      rule: "required",
      width: '4',
      typeInput: "select",
      typeData: "String",
      arrData: [
        {
          label: 'Laki Laki',
          value: 'L'
        },
        {
          label: 'Perempuan',
          value: 'P'
        },
    ],
      valueData: null,
      value: ''
    },

    employee_employement_status: {
      label: "Employement Status",
      key: "employee_employement_status",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      width: '6',
      value: 'Fulltime'
    },
    employee_type_id: {
      label: "Employee Type / Role",
      key: "employee_type_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      width: '6',
      arrData: [],
      valueData: null,
      value: ''
    },
    // employee_node_id: {
    //   label: "Work Location",
    //   key: "employee_node_id",
    //   rule: "required",
    //   typeInput: "select",
    //   typeData: "String",
    //   width: '6',
    //   arrData: [],
    //   valueData: null,
    //   value: ''
    // },
    employee_node_id: {
      label: "Work Location",
      key: "employee_node_id",
      rule: "required",
      typeInput: "autocomplete",
      typeData: "String",
      width: '12',
      arrData: [],
      valueData: null,
      value: ''
    },
    is_active: {
      label: "Active|Unactive",
      key: "is_active",
      rule: "",
      typeInput: "Boolean",
      width: '12',
      typeData: "Boolean",
      valueData: true,
      value: true
    }
  },
  employee_type: {
    employee_type_name: {
      label: "Employee Type Name*",
      key: "employee_type_name",
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
      typeInput: "autocomplete",
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
      value: '',
      placeholder: 'Masukan Nama Customer'
    },
    customer_code: {
      label: "Customer code*",
      key: "customer_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
      placeholder: 'Masukan Kode Customer'
    },
    customer_date_of_birth: {
      label: "Customer date of birth",
      key: "customer_date_of_birth",
      rule: "",
      typeInput: "date",
      typeData: "String",
      valueData: null,
      value: '',
      placeholder: 'Masukan Tanggal Lahir'
    },
    customer_address: {
      label: "Customer address*",
      key: "customer_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
      placeholder: 'Masukan alamat customer'
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
      value: '',
      placeholder: 'Masukan email customer'
    },
    customer_phone: {
      label: "Customer phone*",
      key: "customer_phone",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
      placeholder: 'Masukan nomor telepon customer'
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
      value: '',
      placeholder: 'Masukan nomor fax customer'
    },
    customer_identity_card_number: {
      label: "Customer identity card number*",
      key: "customer_identity_card_number",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
      placeholder: 'Masukan nomor kartu identitas customer'
    },
    customer_tax_number: {
      label: "Customer tax number*",
      key: "customer_tax_number",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
      placeholder: 'Masukan tax number customer'
    },
    customer_tax_number_address: {
      label: "Customer tax number address*",
      key: "customer_tax_number_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
      placeholder: 'Masukan alamat nomor tax'
    },
    customer_commodity: {
      label: "Customer commodity*",
      key: "customer_commodity",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
      placeholder: 'Masukan komoditas customer'
    },
    customer_default_node_id: {
      label: "Customer default node",
      key: "customer_default_node_id",
      rule: "",
      typeInput: "autocomplete",
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
      value: '',
      placeholder: 'Masukan type alamat (rumah / kantor)'
    },
    customer_corporate_credit: {
      titleLabel: "Customer corporate credit*",
      label: "True|False",
      key: "customer_corporate_credit",
      rule: "required",
      typeInput: "Boolean",
      typeData: "Boolean",
      valueData: true,
      value: true
    },

  },
  customer_type: {
    customer_type_name: {
      label: "Customer Type Name*",
      key: "customer_type_name",
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

  node: {
    node_id: {
      label: "Node ID",
      key: "node_id",
      rule: "",
      typeInput: "text",
      typeData: "String",
      visible: false,
      valueData: null,
      value: '',

    },
    node_name: {
      label: "Node Name*",
      key: "node_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    node_customer_code: {
      label: "Node Customer Code",
      key: "node_customer_code",
      rule: "",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_type_id: {
      label: "Node Type*",
      key: "node_type_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_phone: {
      label: "Node Phone*",
      key: "node_phone",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    node_npwp: {
      label: "Node NPWP*",
      key: "node_npwp",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    node_code: {
      label: "Node Code*",
      key: "node_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    regional_code: {
      label: "Regional Code*",
      key: "regional_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    branch_code: {
      label: "Branch Code*",
      key: "branch_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    origin_code: {
      label: "Origin Code*",
      key: "origin_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    sj_same_parent: {
      label: "SJ Same Parent*",
      key: "sj_same_parent",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    sj_diff_parent: {
      label: "SJ Diff Parent*",
      key: "sj_diff_parent",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    node_tariff_code: {
      label: "Tariff Code",
      key: "node_tariff_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    tariff_group: {
      label: "Tariff group",
      key: "tariff_group",
      rule: "required",
      typeInput: "text",
      typeData: "String",
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
    ip_address: {
      label: "IP addresss",
      key: "ip_address",
      rule: "required",
      typeInput: "selectmultipletag",
      typeData: "Array",
      arrData: [],
      valueData: null,
      value: ''
    },
    default_node_link_id: {
      label: "Default node link*",
      key: "default_node_link_id",
      rule: "",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    default_node_alternate_address_id: {
      label: "Default node alternate address",
      key: "default_node_alternate_address_id",
      rule: "",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: '1'
    },
    pre_alert_sm: {
      titleLabel: "is external",
      titleLabel: "Pre Alert SM",
      label: "Active|Unactive",
      key: "pre_alert_sm",
      rule: "",
      typeInput: "Boolean",
      typeData: "Boolean",
      width: "3",
      valueData: true,
      value: true
    },
    pre_alert_sj: {
      titleLabel: "Pre Alert SJ",
      label: "Active|Unactive",
      key: "pre_alert_sj",
      rule: "",
      typeInput: "Boolean",
      typeData: "Boolean",
      width: "3",
      valueData: true,
      value: true
    },
    pre_alert_bag: {
      titleLabel: "Pre Alert BAG",
      label: "Active|Unactive",
      key: "pre_alert_bag",
      rule: "",
      typeInput: "Boolean",
      typeData: "Boolean",
      width: "3",
      valueData: true,
      value: true
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
    is_cdm: {
      titleLabel: "Has Cash Deposit Machine (CDM)",
      label: "True|False",
      key: "is_cdm",
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

  node_type: {
    node_type_name: {
      label: "Node type name*",
      key: "node_type_name",
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

  node_commission: {
    node_id: {
      label: "Node",
      key: "node_id",
      rule:"required",
      typeInput: "autocomplete",
      typeData: "String",
      width: "12",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_commision_service_code: {
      label: "Node Commision Service Code*",
      key: "node_commision_service_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    node_commision_type: {
      label: "Node Commision Type*",
      key: "node_commision_type",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    node_commision_daily: {
      label: "Node Commision Daily*",
      key: "node_commision_daily",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    node_commision_1: {
      label: "Node Commision 1*",
      key: "node_commision_1",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    node_commision_amount_1: {
      label: "Node Commision amount 1 (Rp)*",
      key: "node_commision_amount_1",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: 0
    },
    node_commision_2: {
      label: "Node Commision 2*",
      key: "node_commision_2",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    node_commision_amount_2: {
      label: "Node Commision amount 2*",
      key: "node_commision_amount_2",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: 0
    },
    node_commision_3: {
      label: "Node Commision 3*",
      key: "node_commision_3",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    node_commision_amount_3: {
      label: "Node Commision amount 3*",
      key: "node_commision_amount_3",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: 0
    },
    node_commision_4: {
      label: "Node Commision 4*",
      key: "node_commision_4",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    node_commision_amount_4: {
      label: "Node Commision amount 4*",
      key: "node_commision_amount_4",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: 0
    },
    node_commision_5: {
      label: "Node Commision 5*",
      key: "node_commision_5",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    node_commision_amount_5: {
      label: "Node Commision amount 5*",
      key: "node_commision_amount_5",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: 0
    },
    node_commision_6: {
      label: "Node Commision 6*",
      key: "node_commision_6",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    node_commision_amount_6: {
      label: "Node Commision amount 6*",
      key: "node_commision_amount_6",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: 0
    },
    node_commision_7: {
      label: "Node Commision 7*",
      key: "node_commision_7",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    node_commision_amount_7: {
      label: "Node Commision amount 7*",
      key: "node_commision_amount_7",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: 0
    },
    node_commision_8: {
      label: "Node Commision 8*",
      key: "node_commision_8",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    node_commision_amount_8: {
      label: "Node Commision amount 8*",
      key: "node_commision_amount_8",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: 0
    },
    node_commision_9: {
      label: "Node Commision 9*",
      key: "node_commision_9",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    node_commision_amount_9: {
      label: "Node Commision amount 9*",
      key: "node_commision_amount_9",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: 0
    },
  },

  node_alternate_address: {
    node_id: {
      label: "Node",
      key: "node_id",
      rule: "required",
      typeInput: "autocomplete",
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
      typeInput: "autocomplete",
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
      typeInput: "autocomplete",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_link_destination_id: {
      label: "Destination",
      key: "node_link_destination_id",
      rule: "required",
      typeInput: "autocomplete",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_link_vehicle_mode_id: {
      label: "Vehicle Type",
      key: "node_link_vehicle_mode_id",
      rule: "required",
      typeInput: "autocomplete",
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

  node_delivery_area: {
    node_delivery_id: {
      label: "ID",
      key: "node_delivery_id",
      rule: "",
      typeInput: "text",
      typeData: "String",
      visible: false,
      valueData: null,
      value: '',
    },
    node_code: {
      label: "Node Code",
      key: "node_code",
      rule: "required",
      typeInput: "autocomplete",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    destination_code: {
      label: "Destination Code",
      key: "destination_code",
      rule: "required",
      typeInput: "autocomplete",
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

  sla_koli: {
    sla_id: {
      label: "Sla ID",
      key: "sla_id",
      rule: "",
      typeInput: "text",
      typeData: "String",
      visible: false,
      valueData: null,
      value: '',
    },
    group_name: {
      label: "Group Name*",
      key: "group_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    start_date: {
      label: "Start Date*",
      key: "start_date",
      rule: "required",
      typeInput: "date",
      width: '6',
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    end_date: {
      label: "End Date*",
      key: "end_date",
      rule: "required",
      typeInput: "date",
      width: '6',
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    origin: {
      label: "Origin*",
      key: "origin",
      rule: "required",
      typeInput: "autocomplete1",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    destination: {
      label: "Destination*",
      key: "destination",
      rule: "required",
      typeInput: "autocomplete2",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    service_code: {
      label: "Service*",
      key: "service_code",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    customer_name: {
      label: "Customer Name",
      key: "customer_name",
      rule: "",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    customer_code: {
      label: "Customer Code",
      key: "customer_code",
      rule: "",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    sla: {
      label: "SLA",
      key: "sla",
      rule: "",
      typeInput: "radtex",
      typeData: "Number",
      arrData: [
        {
          label: "Menit",
          value: "menit"
        },
        {
          label: "Jam",
          value: "jam"
        },
        {
          label: "Hari",
          value: "hari"
        },        
      ],
      arrValue: '',
      valueData: null,
      value: '',
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

  sla_inter_activity: {
    sla_id: {
      label: "Sla ID",
      key: "sla_id",
      rule: "",
      typeInput: "text",
      typeData: "String",
      visible: false,
      valueData: null,
      value: '',
    },
    group_name: {
      label: "Group Name*",
      key: "group_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    start_date: {
      label: "Start Date*",
      key: "start_date",
      rule: "required",
      typeInput: "date",
      width: '6',
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    end_date: {
      label: "End Date*",
      key: "end_date",
      rule: "required",
      typeInput: "date",
      width: '6',
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    origin: {
      label: "Origin*",
      key: "origin",
      rule: "required",
      typeInput: "autocomplete1",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    destination: {
      label: "Destination*",
      key: "destination",
      rule: "required",
      typeInput: "autocomplete2",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    service_code: {
      label: "Service*",
      key: "service_code",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    customer_name: {
      label: "Customer Name",
      key: "customer_name",
      rule: "",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    customer_code: {
      label: "Customer Code",
      key: "customer_code",
      rule: "",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_code: {
      label: "Node Code*",
      key: "node_code",
      rule: "required",
      typeInput: "autocomplete",
      typeData: "String",
      width: '12',
      arrData: [],
      valueData: null,
      value: ''
    },
    previous_activity: {
      label: "Current Activity*",
      key: "previous_activity",
      rule: "required",
      typeInput: "selectallowcreate",
      typeData: "Array",
      arrData: [],
      valueData: null,
      value: ''
    },
    next_activity: {
      label: "Next Activity*",
      key: "next_activity",
      rule: "required",
      typeInput: "selectallowcreate",
      typeData: "Array",
      arrData: [],
      valueData: null,
      value: ''
    },
    sla: {
      label: "SLA",
      key: "sla",
      rule: "",
      typeInput: "radtex",
      typeData: "Number",
      arrData: [
        {
          label: "Menit",
          value: "menit"
        },
        {
          label: "Jam",
          value: "jam"
        },
        {
          label: "Hari",
          value: "hari"
        },        
      ],
      arrValue: '',
      valueData: null,
      value: '',
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

  sla_node_to_node_a: {
    sla_id: {
      label: "Sla ID",
      key: "sla_id",
      rule: "",
      typeInput: "text",
      typeData: "String",
      visible: false,
      valueData: null,
      value: '',
    },
    group_name: {
      label: "Group Name*",
      key: "group_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    start_date: {
      label: "Start Date*",
      key: "start_date",
      rule: "required",
      typeInput: "date",
      width: '6',
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    end_date: {
      label: "End Date*",
      key: "end_date",
      rule: "required",
      typeInput: "date",
      width: '6',
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    type: {
      label: "Type*",
      key: "type",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_origin: {
      label: "Node Origin*",
      key: "node_origin",
      rule: "required",
      typeInput: "autocomplete1",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_destination: {
      label: "Node Destination*",
      key: "node_destination",
      rule: "required",
      typeInput: "autocomplete2",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    sla: {
      label: "SLA",
      key: "sla",
      rule: "",
      typeInput: "radtex",
      typeData: "Number",
      arrData: [
        {
          label: "Menit",
          value: "menit"
        },
        {
          label: "Jam",
          value: "jam"
        },
        {
          label: "Hari",
          value: "hari"
        },        
      ],
      arrValue: '',
      valueData: null,
      value: '',
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

  sla_node_to_node_b: {
    sla_id: {
      label: "Sla ID",
      key: "sla_id",
      rule: "",
      typeInput: "text",
      typeData: "String",
      visible: false,
      valueData: null,
      value: '',
    },
    group_name: {
      label: "Group Name*",
      key: "group_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    start_date: {
      label: "Start Date*",
      key: "start_date",
      rule: "required",
      typeInput: "date",
      width: '6',
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    end_date: {
      label: "End Date*",
      key: "end_date",
      rule: "required",
      typeInput: "date",
      width: '6',
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    origin: {
      label: "Origin*",
      key: "origin",
      rule: "required",
      typeInput: "autocomplete3",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    type: {
      label: "Type*",
      key: "type",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_origin: {
      label: "Node Origin*",
      key: "node_origin",
      rule: "required",
      typeInput: "autocomplete1",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_destination: {
      label: "Node Destination*",
      key: "node_destination",
      rule: "required",
      typeInput: "autocomplete2",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    delivery_zone: {
      label: "Delivery Zone*",
      key: "delivery_zone",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    sla: {
      label: "SLA",
      key: "sla",
      rule: "",
      typeInput: "radtex",
      typeData: "Number",
      arrData: [
        {
          label: "Menit",
          value: "menit"
        },
        {
          label: "Jam",
          value: "jam"
        },
        {
          label: "Hari",
          value: "hari"
        },        
      ],
      arrValue: '',
      valueData: null,
      value: '',
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

  configuration_warning_runsheet: {
    setting_id: {
      label: "Configuration Warning Runsheet ID",
      key: "setting_id",
      rule: "",
      typeInput: "text",
      typeData: "String",
      visible: false,
      valueData: null,
      value: '',
    },
    percentage: {
      label: "Percentage*",
      key: "percentage",
      rule: "required|decimal",
      typeInput: "text",
      typeData: "text",
      valueData: null,
      value: '',
    },
    minimum_count: {
      label: "Minimum Connote*",
      key: "minimum_count",
      rule: "required|numeric|min_value:1",
      typeInput: "text",
      typeData: "text",
      valueData: null,
      value: '',
    },
    reference: {
      label: "Configure By*",
      key: "reference",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    node_id: {
      label: "Node Name*",
      key: "node_id",
      rule: "required",
      typeInput: "multipleSelector",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ""
    },
  },

  configuration_warning_sla: {
    setting_id: {
      label: "Configuration Warning SLA ID",
      key: "setting_id",
      rule: "",
      typeInput: "text",
      typeData: "String",
      visible: false,
      valueData: null,
      value: '',
    },
    formula_type: {
      label: "Formula Type*",
      key: "formula_type",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    value: {
      label: "Value*",
      key: "value",
      rule: "required|numeric|min_value:1",
      typeInput: "text",
      typeData: "text",
      valueData: null,
      value: '',
    },
    node_id: {
      label: "Node Name*",
      key: "node_id",
      rule: "required",
      typeInput: "multipleSelector",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ""
    },
  },

  tariff: {
    tariff_group: {
      label: "Tariff Group",
      key: "tariff_group",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    // tariff_group: {
    //   label: "Tariff Group",
    //   key: "tariff_group",
    //   rule: "required",
    //   visible: false,
    //   typeInput: "select",
    //   typeData: "String",
    //   arrData: [
    //     {
    //       label: null,
    //       value: null
    //     }
    //   ],
    //   valueData: null,
    //   value: ''
    // },
    tariff_customer_code: {
      label: "Tariff Customer Code*",
      key: "tariff_customer_code",
      rule: "",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
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
      width: '6',
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_expiry_date: {
      label: "Tariff expiry date*",
      key: "tariff_expiry_date",
      rule: "required",
      width: '6',
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
      label: "Tariff amount 1 (Rp)*",
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

  tariff_discount: {
    discount_tariff_origin: {
      label: "Discount Tariff Origin*",
      key: "discount_tariff_origin",
      rule: "required",
      typeInput: "text",
      width: '6',
      typeData: "String",
      valueData: null,
      value: ''
    },
    discount_tariff_destination: {
      label: "Discount Tariff Destination*",
      key: "discount_tariff_destination",
      rule: "required",
      typeInput: "text",
      width: '6',
      typeData: "String",
      valueData: null,
      value: ''
    },
    discount_tariff_service_code: {
      label: "Discount Tariff service code*",
      key: "discount_tariff_service_code",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      width: '6',
      valueData: null,
      value: ''
    },
    discount_tariff_persentase: {
      label: "Daily Diskon (%)*",
      key: "discount_tariff_persentase",
      rule: "required",
      typeInput: "text",
      width: '6',
      typeData: "Number",
      valueData: null,
      value: ''
    },
    up_to_amount_1: {
      label: "Up To Amount 1*",
      key: "up_to_amount_1",
      rule: "required",
      typeInput: "text",
      width: "6",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    up_to_discount_1: {
      label: "Up To Discount 1*",
      key: "up_to_discount_1",
      rule: "required",
      typeInput: "text",
      width: "6",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    up_to_amount_2: {
      label: "Up To Amount 2",
      key: "up_to_amount_2",
      rule: "required",
      typeInput: "text",
      width: "6",
      typeData: "Number",
      valueData: null,
      value: '',
      border: 5
    },
    up_to_discount_2: {
      label: "Up To Discount 2",
      key: "up_to_discount_2",
      rule: "required",
      typeInput: "text",
      width: "6",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    up_to_amount_3: {
      label: "Up To Amount 3",
      key: "up_to_amount_3",
      rule: "required",
      typeInput: "text",
      width: "6",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    up_to_discount_3: {
      label: "Up To Discount 3",
      key: "up_to_discount_3",
      rule: "required",
      typeInput: "text",
      width: "6",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    up_to_amount_4: {
      label: "Up To Amount 4",
      key: "up_to_amount_4",
      rule: "required",
      typeInput: "text",
      width: "6",
      typeData: "Number",
      valueData: null,
      value: ''
    },
    up_to_discount_4: {
      label: "Up To Discount 4",
      key: "up_to_discount_4",
      rule: "required",
      typeInput: "text",
      width: "6",
      typeData: "Number",
      valueData: null,
      value: ''
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
      label: "Vehicle Name *",
      key: "vehicle_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    vehicle_police_no: {
      label: "Vehicle No / Plate Number *",
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
    vehicle_mode_id: {
      label: "Vehicle Mode",
      key: "vehicle_mode_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
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
      label: "Vehicle Node",
      key: "vehicle_node_id",
      rule: "",
      typeInput: "autocomplete",
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
    vehicle_mode_id: {
      label: "Vehicle Mode",
      key: "vehicle_mode_id",
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

  pickup_request: {
    node_request: {
      label: "Select Link Request",
      key: "node_request",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: '',
      customBind: "data-kt-pickup-request"
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
      rule: "required|phone",
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
      typeInput: "autocomplete",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: '',
      query: "node_destination"
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
      rule: "required|coordinate",
      mapPicker: true,
      typeInput: "text|latitude",
      typeData: "Number",
      valueData: 0,
      value: 0
    },
    pickup_longitude: {
      label: "Longitude*",
      key: "pickup_longitude",
      rule: "required|coordinate",
      mapPicker: true,
      typeInput: "text|longitude",
      typeData: "Number",
      valueData: 0,
      value: 0
    },
    pickup_courier_user_id: {
      label: "Courier",
      key: "pickup_courier_user_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    pickup_schedule: {
      label: "Set Schedule:",
      key: "pickup_schedule",
      rule: "required",
      typeInput: "special_schedule",
      typeData: "Array",
      arrData: [],
      valueData: null,
      value: ''
    }
  },

  //form pickup schedule
  pickup_schedule: {
    pickup_schedule_node_id_origin: {
      label: "Pickup Schedule Origin",
      key: "pickup_schedule_node_id_origin",
      rule: "required",
      typeInput: "autocomplete",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    pickup_schedule_name: {
      label: "Name*",
      key: "pickup_schedule_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    pickup_schedule_phone_number: {
      label: "Phone*",
      key: "pickup_schedule_phone_number",
      rule: "required|min:8",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    pickup_schedule_address: {
      label: "Address*",
      key: "pickup_schedule_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    pickup_schedule_node_id_destination: {
      label: "Request To",
      key: "pickup_schedule_node_id_destination",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    pickup_schedule_user_courier_id: {
      label: "Courier",
      key: "pickup_schedule_user_courier_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    pickup_schedule_remarks: {
      label: "Remark",
      key: "pickup_schedule_remarks",
      rule: "required|validString",
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
    pickup_schedule_latitude: {
      label: "Latitude*",
      key: "pickup_schedule_latitude",
      rule: "required|coordinate",
      mapPicker: true,
      typeInput: "text|latitude",
      typeData: "Number",
      valueData: 0,
      value: 0
    },
    pickup_schedule_longitude: {
      label: "Longitude*",
      key: "pickup_schedule_longitude",
      rule: "required|coordinate",
      mapPicker: true,
      typeInput: "text|longitude",
      typeData: "Number",
      valueData: 0,
      value: 0
    },
    pickup_schedule: {
      label: "Set Schedule:",
      key: "pickup_schedule",
      rule: "required",
      typeInput: "special_schedule",
      typeData: "Array",
      arrData: [],
      valueData: null,
      value: ''
    }
  },

  pickup_list_cancel: {
    status: {
      label: "Reason",
      key: "status",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    }
  },

  pickup_request_cancel: {
    status: {
      label: "Reason",
      key: "status",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    }
  },
  pickup_list_failed: {
    status: {
      label: "Reason",
      key: "status",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    }
  },
  //surat muatan
  surat_muatan:{
    manifest_number: {
      label: "No Surat Muatan",
      key: "manifest_number",
      rule: "",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
      isDisabled: false,
    },
    max_weight: {
      label: "Max Weight",
      key: "max_weight",
      rule: "",
      typeInput: "number",
      typeData: "Number",
      valueData: null,
      value: null
    },
    manifest_method_id: {
      label: "Moda",
      key: "manifest_method_id",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    flight_number: {
      label: "Flight Number",
      key: "flight_number",
      rule: "required",
      visible: false,
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    flight_schedule: {
      label: "Flight Schedule",
      key: "flight_schedule",
      rule: "required",
      visible: false,
      typeInput: "datetime",
      typeData: "String",
      valueData: null,
      value: ''
    },
    node_id_origin: {
      label: "Origin",
      key: "node_id_origin",
      rule: "required",
      typeInput: "autocomplete",
      typeData: "String",
      isDisabled: true,
      arrData: [],
      valueData: null,
      value: ''
    },
    dynamicinputcomponent_node_id_transit: {
      label: "Transit",
      key: "dynamicinputcomponent_node_id_transit",
      rule:"",
      typeInput: "dynamicinputcomponent",
      typeData: "Array",
      max: 3,
      inputs: [ // template input yg di render tiap row
        {
          key: "node_id_transit",
          typeInput: "autocomplete",
          value: 'meong1',
          query: "",
          width: "12",
        },
      ],
      arrData: [],
      valueData: null,
      value: ''
    },
    node_id_transit: {
      label: "Transit",
      key: "node_id_transit",
      rule:"",
      typeInput: "null",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    // node_id_transit_2: {
    //   label: "Transit",
    //   key: "node_id_transit_2",
    //   rule:"",
    //   typeInput: "null",
    //   typeData: "String",
    //   arrData: [],
    //   valueData: null,
    //   value: ''
    // },
    // node_id_transit_3: {
    //   label: "Transit",
    //   key: "node_id_transit_3",
    //   rule:"",
    //   typeInput: "null",
    //   typeData: "String",
    //   arrData: [],
    //   valueData: null,
    //   value: ''
    // },
    node_id_destination: {
      label: "Destination",
      key: "node_id_destination",
      rule:"",
      typeInput: "autocomplete",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    vehicle_type_id: {
      label: "Tipe",
      key: "vehicle_type_id",
      rule:"",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    // manifest_type_id: {
    //   label: "Jenis Kiriman",
    //   key: "manifest_type_id",
    //   rule:"",
    //   typeInput: "select",
    //   typeData: "String",
    //   arrData: [],
    //   visible: false,
    //   valueData: null,
    //   value: ''
    // },
    vehicle_id: {
      label: "Nama",
      key: "vehicle_id",
      rule:"",
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    pic_employee_id: {
      label: "Driver",
      key: "pic_employee_id",
      rule:"",
      visible: true,
      typeInput: "select",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    etd: {
      label: "ETD",
      key: "etd",
      rule: "required",
      typeInput: "datetime",
      typeData: "String",
      valueData: null,
      value: ''
    },
    eta: {
      label: "ETA",
      key: "eta",
      rule: "required",
      typeInput: "datetime",
      typeData: "String",
      valueData: null,
      value: ''
    },
    auto_depart: {
      label: "Auto Depart",
      key: "auto_depart",
      rule: "",
      typeInput: "Boolean",
      typeData: "Boolean",
      valueData: true,
      value: true,
      isDisabled: false,
    },
  },
  surat_jalan:{
    destination_id: {
      label: "Destination",
      key: "destination_id",
      rule:"required",
      typeInput: "select",
      typeData: "String",
      width: "6",
      arrData: [],
      valueData: null,
      value: ''
    },
    // moda_angkutan_id: {
    //   label: "Moda Angkutan",
    //   key: "moda_angkutan_id",
    //   rule:"required",
    //   typeInput: "select",
    //   typeData: "String",
    //   width: "6",
    //   arrData: [],
    //   valueData: null,
    //   value: ''
    // },
    no_moda_angkutan_id: {
      label: "Nama Kendaraan",
      key: "no_moda_angkutan_id",
      rule:"required",
      typeInput: "select",
      typeData: "String",
      width: "6",
      arrData: [],
      valueData: null,
      value: ''
    },

    etd: {
      label: "ETD",
      key: "etd",
      rule: "required",
      typeInput: "datetime",
      typeData: "String",
      width: "6",
      valueData: null,
      value: ''
    },
    eta: {
      label: "ETA",
      key: "eta",
      rule: "required",
      typeInput: "datetime",
      typeData: "String",
      width: "6",
      valueData: null,
      value: ''
    },

    manifest_lov: {
      label: "LOV",
      key: "manifest_lov",
      rule: "required",
      typeInput: "select",
      typeData: "String",
      width: "6",
      arrData: [
        {
          label: 'ALL',
          value: 'ALL'
        },
        {
          label: 'SAME DESTINATION',
          value: 'SAME DESTINATION'
        },
      ],
      valueData: null,
      value: ''
    },

    driver_id: {
      label: "Driver",
      key: "driver_id",
      rule:"required",
      typeInput: "select",
      typeData: "String",
      width: "6",
      arrData: [{
        'label':null,
        'value':0
      }],
      valueData: null,
      value: ''
    }
  },

  irreguralities_return_destination: {
    destination_type: {
      label: "",
      key: "destination_type",
      rule: "",
      typeInput: "radio",
      typeData: "String",
      arrData: [
        {
          label: "Rumah",
          value: "rumah"
        },
        {
          label: "Kantor",
          value: "kantor"
        },
      ],
      isDisabled: true,
      valueData: null,
      value: 'rumah'
    },
    destination_name: {
      label: "Nama Penerima*",
      key: "destination_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    destination_phone: {
      label: "Telepon Penerima*",
      key: "destination_phone",
      rule: "required|numeric|min:8",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    destination_email: {
      label: "Email Penerima",
      key: "destination_email",
      rule: "",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    destination_address: {
      label: "Alamat & Kode Pos Penerima",
      key: "destination_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      isDisabled: true,
      valueData: null,
      value: ''
    },
    destination_onchange_address: {
      label: "Provinsi / Kota / Kecamatan / Kelurahan / Kode Pos*",
      key: "destination_onchange_address",
      rule: "required",
      typeInput: "text|onchange|location_selector",
      typeData: "String",
      isDisabled: true,
      arrData: [],
      valueData: null,
      onchange: true,
      value: ''
    },
    destination_subdistrict_id: {
      label: "Kode Pos*",
      key: "destination_subdistrict_id",
      rule: "",
      isDisabled: true,
      typeInput: "hidden|disabled|dotted",
      typeData: "String",
      valueData: null,
      value: ''
    },
    zip_code:{
      label: "Kode Pos",
      key: "zip_code",
      rule: "required",
      isDisabled: true,
      width: '6',
      typeInput: "text|disabled",
      typeData: "String",
      valueData: null,
      value: ''
    },
    tariff_code: {
      label: "Kode Tujuan*",
      key: "tariff_code",
      rule: "required",
      isDisabled: true,
      width: '6',
      typeInput: "text|disabled",
      typeData: "String",
      valueData: null,
      value: ''
    }
  },

  cost_to_cost_setting:{
    cost_owner_node_id: {
      label: "Cost Owner",
      key: "cost_owner_node_id",
      rule:"required",
      typeInput: "autocomplete",
      typeData: "String",
      width: "12",
      arrData: [],
      valueData: null,
      value: ''
    },
    cost_payer_node_id: {
      label: "Cost Payer",
      key: "cost_payer_node_id",
      rule:"required",
      typeInput: "autocomplete",
      typeData: "String",
      width: "12",
      arrData: [],
      valueData: null,
      value: ''
    },
    cost_group_code: {
      label: "Cost Group",
      key: "cost_group_code",
      rule:"required",
      typeInput: "select",
      typeData: "String",
      width: "12",
      arrData: [],
      valueData: null,
      value: ''
    },
    dynamicinputcomponent_cost_to_cost_rule: {
      label: "Add Rule",
      key: "dynamicinputcomponent_cost_to_cost_rule",
      rule:"",
      typeInput: "dynamicinputcomponent",
      typeData: "Array",
      inputs: [ // template input yg di render tiap row
        {
          key: "rule_condition",
          typeInput: "select",
          value: 'meong1'
        },
        {
          key: "condition",
          typeInput: "select",
          value: 'mimi1'
        },
        {
          key: "rule_value",
          typeInput: "text",
          value: 'bbb'
        }
      ],
      arrData: [

      ],
      valueData: null,
      value: ''
    },

    rule_condition: {
      label: "Rules",
      key: "rule_condition",
      rule:"required",
      typeInput: "select|hidden",
      typeData: "String",
      visible: false,
      width: "4",
      arrData: [],
      valueData: null,
      value: ''
    },
    condition: {
      label: "Condition",
      key: "condition",
      rule:"required",
      typeInput: "select",
      typeData: "String",
      visible: false,
      width: "4",
      arrData: [
        {
          label: 'IS',
          value: 'IS'
        },
        {
          label: 'NOT',
          value: 'NOT'
        }
      ],
      valueData: null,
      value: ''
    },
    rule_value: {
      label: "Value",
      key: "rule_value",
      rule:"required",
      typeInput: "text",
      typeData: "String",
      visible: false,
      width: "4",
      arrData: [],
      valueData: null,
      value: ''
    },
    cost_type_code: {
      label: "Cost Type",
      key: "cost_type_code",
      rule:"required",
      typeInput: "select",
      typeData: "String",
      width: "12",
      arrData: [],
      valueData: null,
      value: ''
    },

    dynamicinputcomponent_cost_to_cost_detail_value: {
      label: "Add Cost",
      key: "dynamicinputcomponent_cost_to_cost_detail_value",
      rule:"",
      typeInput: "dynamicinputcomponent",
      typeData: "Array",
      inputs: [ // template input yg di render tiap row
        {
          key: "min_kg",
          typeInput: "text",
          value: ''
        },
        {
          key: "max_kg",
          typeInput: "text",
          value: ''
        },
        {
          key: "cost_value",
          typeInput: "text",
          value: ''
        }
      ],
      arrData: [],
      valueData: null,
      value: ''
    },

    min_kg: {
      label: "Min(Kg)",
      key: "min_kg",
      rule: "required|numeric",
      typeInput: "text",
      visible: false,
      typeData: "Number",
      valueData: null,
      value: '',
      width: "4",
    },
    max_kg: {
      label: "Max(Kg)",
      key: "max_kg",
      rule: "required|numeric",
      typeInput: "text",
      visible: false,
      typeData: "Number",
      valueData: null,
      value: '',
      width: "4",
    },
    cost_value: {
      label: "Rp",
      key: "cost_value",
      rule: "required|numeric",
      typeInput: "text",
      visible: false,
      typeData: "Number",
      valueData: null,
      value: '',
      width: "4",
    },
    name: {
      label: "Name",
      key: "name",
      rule:"required",
      typeInput: "text",
      typeData: "String",
      width: "6",
      valueData: null,
      value: ''
    },
    tracking_type_name: {
      label: "Activity",
      key: "tracking_type_name",
      rule:"required",
      typeInput: "select",
      typeData: "String",
      width: "6",
      arrData: [],
      valueData: null,
      value: ''
    },

  },
  cost_to_cost_report:{
    // contohmultipleselectasync: {
    //   label: "multiple select node contoh",
    //   key: "contohmultipleselectasync",
    //   rule:"",
    //   typeInput: "multipleSelector",
    //   typeData: "String",
    //   width: "6",
    //   arrData: [],
    //   valueData: null,
    //   value: ''
    // },
    cost_owner_node_id: {
      label: "Cost Owner",
      key: "cost_owner_node_id",
      rule:"required",
      typeInput: "autocomplete",
      typeData: "String",
      width: "6",
      arrData: [],
      valueData: null,
      value: ''
    },
    cost_payer_node_id: {
      label: "Cost Payer",
      key: "cost_payer_node_id",
      rule:"required",
      typeInput: "autocomplete",
      typeData: "String",
      width: "6",
      arrData: [],
      valueData: null,
      value: ''
    },
    cost_group_code: {
      label: "Cost Group",
      key: "cost_group_code",
      rule:"required",
      typeInput: "select",
      typeData: "String",
      width: "6",
      arrData: [],
      valueData: null,
      value: ''
    },
    name: {
      label: "Cost Name",
      key: "name",
      rule:"required",
      typeInput: "select",
      typeData: "String",
      width: "6",
      arrData: [],
      valueData: null,
      value: ''
    },
    date_from: {
      label: "From",
      key: "date_from",
      rule:"required",
      typeData: "String",
      typeInput: "date",
      width: '6',
      valueData: null,
      value: ''
    },
    date_to: {
      label: "To",
      key: "date_to",
      rule:"required",
      typeData: "String",
      typeInput: "date",
      width: '6',
      valueData: null,
      value: ''
    },

  },
  packingkayu:{
    koli_number: {
      label: "Koli Number*",
      key: "koli_number",
      rule: "required",
      isDisabled: true,
      width: '6',
      typeInput: "text|disabled",
      typeData: "String",
      valueData: null,
      value: ''
    },
    koli_actual_weight: {
      label: "Kg Before",
      key: "koli_actual_weight",
      rule: "required",
      isDisabled: true,
      width: '6',
      typeInput: "text|disabled",
      typeData: "String",
      valueData: null,
      value: ''
    },
    koli_packing_kayu_weight: {
      label: "Kg After",
      key: "koli_packing_kayu_weight",
      rule: "required",
      isDisabled: false,
      width: '6',
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    koli_height: {
      label: "Height",
      key: "koli_height",
      rule: "required",
      isDisabled: false,
      width: '6',
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    koli_width: {
      label: "Width",
      key: "koli_width",
      rule: "required",
      isDisabled: false,
      width: '6',
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    koli_length: {
      label: "Length",
      key: "koli_length",
      rule: "required",
      isDisabled: false,
      width: '6',
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    }
  },
  profile:{
    user_name: {
      label: "Full Name",
      key: "user_name",
      rule:"required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    user_login: {
      label: "Username",
      key: "user_login",
      rule:"required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    password: {
      label: "Password",
      key: "password",
      rule:"",
      typeInput: "text|password",
      typeData: "String",
      valueData: null,
      value: ''
    },
    user_email: {
      label: "Email",
      key: "user_email",
      rule:"",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
  },
  profile_dialog:{
    password: {
      label: "Passwords",
      key: "password",
      rule:"",
      typeInput: "text|password",
      typeData: "String",
      valueData: null,
      value: ''
    },
  },

  helpdesk_move_connote: {
    node_location_id: {
      label: "Node",
      key: "node_location_id",
      rule: "",
      typeInput: "autocomplete",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
  },

  helpdesk_move_bag: {
    node_location_id: {
      label: "Node",
      key: "node_location_id",
      rule: "",
      typeInput: "autocomplete",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
  },

  helpdesk_edit_connote: {
    connote_shipper_name: {
      label: "Connote Shipper Name",
      key: "connote_shipper_name",
      rule: "",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    connote_shipper_street_address: {
      label: "Connote Shipper Street Address",
      key: "connote_shipper_street_address",
      rule: "",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    connote_shipper_email: {
      label: "Connote Shipper Email",
      key: "connote_shipper_email",
      rule: "",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    connote_shipper_phone_number: {
      label: "Connote Shipper Name",
      key: "connote_shipper_phone_number",
      rule: "numeric|min:8",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    connote_receiver_name: {
      label: "Connote Receiver Name",
      key: "connote_receiver_name",
      rule: "",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    connote_receiver_street_address: {
      label: "Connote Receiver Street Address",
      key: "connote_receiver_street_address",
      rule: "",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    connote_receiver_email: {
      label: "Connote Receiver Email",
      key: "connote_receiver_email",
      rule: "",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    connote_receiver_phone_number: {
      label: "Connote Receiver Name",
      key: "connote_receiver_phone_number",
      rule: "numeric|min:8",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
    amount_cod: {
      label: "Amount COD",
      key: "amount_cod",
      rule: "",
      typeInput: "number",
      typeData: "String",
      valueData: null,
      value: '',
    },
    amount_price: {
      label: "Amount Price",
      key: "amount_price",
      rule: "",
      typeInput: "number",
      typeData: "String",
      valueData: null,
      value: '',
    },
    remarks: {
      label: "Remarks",
      key: "remarks",
      rule: "",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: '',
    },
  },  
}
