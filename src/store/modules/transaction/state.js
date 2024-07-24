export default {
  origin: {
    origin_name: {
      label: "Nama Pengirim*",
      key: "connote_shipper_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    origin_phone: {
      label: "Telepon Pengirim*",
      key: "connote_shipper_phone_number",
      rule: "required|phone",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    origin_address: {
      label: "Alamat & Kode Pos Pengirim",
      key: "connote_shipper_street_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    origin_onchange_address: {
      label: "Provinsi / Kota / Kecamatan / Kelurahan / Kode Pos*",
      key: "origin_onchange_address",
      rule: "required",
      typeInput: "text|onchange|calc_switch",
      typeData: "String",
      valueData: null,
      onchange: true,
      value: ''
    },
    origin_subdistrict_id: {
      label: "subdistrict id*",
      key: "connote_shipper_geolocation_subdistrict_id",
      rule: "",
      typeInput: "hidden|disabled|dotted",
      typeData: "String",
      valueData: null,
      value: ''
    },
    origin_zip_code: {
      label: "Kode Pos*",
      key: "connote_shipper_zip_code",
      rule: "required",
      typeInput: "text|disabled|dotted",
      typeData: "String",
      tabindex: -1,
      valueData: null,
      value: ''
    },
  },
  destination: {
    destination_type: {
      label: "",
      key: "connote_receiver_address_type",
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
      valueData: null,
      value: 'rumah'
    },
    destination_name: {
      label: "Nama Penerima*",
      key: "connote_receiver_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    destination_phone: {
      label: "Telepon Penerima*",
      key: "connote_receiver_phone_number",
      rule: "required|phone",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    destination_address: {
      label: "Alamat & Kode Pos Penerima",
      key: "connote_receiver_street_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    destination_onchange_address: {
      label: "Provinsi / Kota / Kecamatan / Kelurahan / Kode Pos*",
      key: "destination_onchange_address",
      rule: "required",
      typeInput: "text|onchange|calc_switch",
      typeData: "String",
      arrData: [],
      valueData: null,
      onchange: true,
      value: ''
    },
    destination_subdistrict_id: {
      label: "Kode Pos*",
      key: "connote_receiver_geolocation_subdistrict_id",
      rule: "",
      typeInput: "hidden|disabled|dotted",
      typeData: "String",
      valueData: null,
      value: ''
    },
    destination_zip_code: {
      typeInput: "row",
      col:6,
      key: 'zip_code_and_destination_code',
      tabindex: -1,
      input: [
        {
          label: "Kode Pos",
          key: "connote_receiver_zip_code",
          rule: "required",
          typeInput: "text|disabled",
          typeData: "String",
          tabindex: -1,
          valueData: null,
          value: ''
        },
        {
          label: "Kode Tujuan*",
          key: "connote_receiver_tariff_code",
          rule: "required",
          typeInput: "text|disabled",
          typeData: "String",
          tabindex: -1,
          valueData: null,
          value: ''
        }
      ],
      zip_code: '',
      destination_code: ''
    },
  },
  package: {
    package_description: {
      label: "Deskripsi Barang*",
      key: "koli_description",
      rule: "required",
      typeInput: "text|col_left",
      typeData: "String",
      valueData: null,
      value: " "
    },
    package_category: {
      label: "Kategori*",
      key: "connote_category",
      rule: "",
      typeInput: "select|col_left",
      typeData: "String",
      arrData: [
        {
          label: 'Fashion',
          value: 'fashion'
        },
        {
          label: 'Perlengkapan Olahraga',
          value: 'perlengkapan olahraga'
        },
        {
          label: 'Kosmetik & Kesehatan',
          value: 'Kosmetik & Kesehatan'
        },
        {
          label: 'Makanan',
          value: 'makanan'
        },
        {
          label: 'Mainan & Hoby',
          value: 'mainan & hoby'
        },
        {
          label: 'Otomotif',
          value: 'otomotif'
        },
        {
          label: 'Perlengkapan Rumah Tangga',
          value: 'perlengkapan rumah tangga'
        },
        {
          label: 'Elektronik',
          value: 'elektronik'
        },
        {
          label: 'Gadget & Aksesoris',
          value: 'Gadget & Aksesoris'
        },
        {
          label: 'Special Cargo',
          value: 'special cargo'
        },
        {
          label: 'Lain Lain',
          value: 'lain lain'
        },
      ],
      valueData: null,
      value: ''
    },
    package_service: {
      label: "Service*",
      key: "connote_service_code",
      rule: "required",
      typeInput: "radio|col_left",
      typeData: "String",
      onchange: true,
      arrData: [
        {
          'label': 'null',
          'value': 'null',
          'data': {},
          'tarif': 0
        }
      ],
      valueData: null,
      value: ''
    },
    package_insured_goods_value: {
      label: "Nilai Barang",
      key: "insured_goods_value",
      rule: "maxlength:20",
      typeInput: "text|col_left",
      typeData: "Number|money",
      valueData: null,
      value: 0
    },
    package_diskon: {
      label: "Diskon",
      key: "amount_discount",
      rule: "maxlength:20",
      typeInput: "text|col_left",
      typeData: "Number|money",
      valueData: null,
      value: 0
    },
    package_instruksi: {
      label: "Instruksi Khusus",
      key: "remarks",
      rule: "",
      typeInput: "text|col_left",
      typeData: "String",
      valueData: null,
      value: " "
    },


    package_jumlah: {
      label: "Jumlah*",
      key: "koli_jumlah",
      rule: "numeric|min_value:1",
      typeInput: "text|col_right",
      typeData: "Number",
      valueData: null,
      value: 1
    },
    package_dimensi_weight: {
      label: "Weight*",
      key: "koli_weight",
      rule: "required|decimal|min_value:0.1",
      typeInput: "text",
      typeData: "Number",
      valueData: null,
      value: 1
    },
    package_dimensi_length: {
      label: "Length",
      key: "koli_length",
      rule: "decimal|min_value:0",
      typeInput: "text",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    package_dimensi_width: {
      label: "Width",
      key: "koli_width",
      rule: "decimal|min_value:0",
      typeInput: "text",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    package_dimensi_height: {
      label: "Height",
      key: "koli_height",
      rule: "decimal|min_value:0",
      typeInput: "text",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    package_tidak_packing_kayu: {
      titleLabel: "Tidak Packing Kayu",
      label: "True|False",
      key: "package_tidak_packing_kayu",
      rule: "",
      typeInput: "Boolean|col_right",
      typeData: "Boolean",
      valueData: false,
      value: false
    },
    package_tidak_asuransi: {
      titleLabel: "Tidak Asuransi",
      label: "True|False",
      key: "is_insured",
      rule: "",
      typeInput: "Boolean|col_right",
      typeData: "Boolean",
      valueData: false,
      value: false
    },
    package_surcharge: {
      label: "Height*",
      key: "koli_surcharge",
      rule: "",
      typeInput: "tags",
      typeData: "Array",
      arrData: [],
      valueData: null,
      value: []
    },
    package_do_return: {
      titleLabel: "Do Return",
      label: "True|False",
      key: "is_need_do_return",
      rule: "",
      typeInput: "Boolean|col_right",
      typeData: "Boolean",
      valueData: false,
      value: false
    },
    package_cod: {
      label: "Amount Cod*",
      key: "amount_cod",
      rule: "numeric|maxlength:20",
      typeInput: "text|col_right",
      typeData: "Number",
      valueData: null,
      value: 0
    },
  },
  calc_component: {
    arrData: [],
    switch: false,
    prefix: null
  },
  calculator: {
    actual_weight: {
      label: "Actual Weight",
      key: "actual_weight",
      typeData: "Number",
      valueData: null,
      value: 1
    },
    volume_weight: {
      label: "Volume Weight",
      key: "volume_weight",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    chargeable_weight: {
      label: "chargeable Weight",
      key: "chargeable_weight",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    surcharge_packing: {
      label: "surcharge packing kayu",
      key: "surcharge_packing",
      typeData: "Number",
      valueData: null,
      value: 0
    },

    biaya_kirim: {
      label: "biaya kirim",
      key: "biaya_kirim",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    handling_charge: {
      label: "handling charge",
      key: "handling_charge",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    surcharge: {
      label: "surcharge",
      key: "surcharge",
      typeData: "Number",
      valueData: [],
      value: 0
    },
    surcharge_manual: {
      label: "surcharge manual",
      key: "surcharge_manual",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    airline_document: {
      label: "airline document",
      key: "airline_document",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    shipper_declaration: {
      label: "shipper declaration",
      key: "shipper_declaration",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    adm_karantina: {
      label: "adm karantina",
      key: "adm_karantina",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    pelepasan_karantina: {
      label: "Pelepasan Karantina",
      key: "pelepasan_karantina",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    asuransi: {
      label: "Asuransi",
      key: "asuransi",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    adm_asuransi: {
      label: "adm asuransi",
      key: "adm_asuransi",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    diskon: {
      label: "diskon",
      key: "diskon",
      typeData: "Number",
      valueData: null,
      value: 0
    },
    total_biaya: {
      label: "total biaya",
      key: "total_biaya",
      typeData: "Number",
      valueData: null,
      value: 0
    },
  },
  
  // sebagai getter untuk template data koli nnti dimasukin ke proses_connote connote_koli_item
  template_koli: {
    koli_id: '',
    height: 0,
    length: 0,
    width: 0,
    volume_weight: 0.00,
    actual_weight: 1,
    surcharge_id: [],
    surcharge_manual: 0,
    is_packing_kayu: false,
    is_packing_kayu_id: '',
    description: ''
  },

  connote_koli_item: [
    {
      koli_id: '',
      height: 0,
      length: 0,
      width: 0,
      volume_weight: 0,
      actual_weight: 1,
      surcharge_id: [],
      surcharge_manual: 0,
      is_packing_kayu: false,
      is_packing_kayu_id: '',
      description: ''
    }
  ],

  // proses store connote untuk dimasukin ke transaction connote
  
  proses_connote: {
    connote_number: '',
    connote_shipper_customer_id: '',
    connote_receiver_customer_id: '',
    is_insured: true,
    is_need_do_return: false,
    connote_koli_item: [],
    connote_bpik:[],
    total_biaya: 0,
    connote_index: ''
  },
  connote_index_active: 0,
  previous_connote_index_active: 0,

  // untuk ADD_MORE_CONNOTE
  connote_template: {
    pra_connote: '',
    single_connote_no: '',
    connote_number: '',
    connote_shipper_customer_id: '',
    connote_shipper_name: '',
    connote_shipper_phone_number: '',
    connote_shipper_street_address:'',
    connote_shipper_administrative_address: '',
    connote_shipper_tariff_code: '',

    connote_receiver_customer_id: '',
    connote_receiver_address_type: 'rumah',
    connote_receiver_zip_code: '',
    connote_receiver_tariff_code: '',
    connote_receiver_name: '',
    connote_receiver_phone_number: '',
    connote_receiver_street_address: '',
    connote_receiver_administrative_address: '',

    insured_goods_value: 0,
    amount_discount: 0,
    is_insured: false,
    is_insurance_refused: false,
    connote_refuse_wooden_package:false,
    is_packing_kayu: false,
    is_need_do_return: false,
    connote_is_do_return: false,
    connote_koli_item: [
      {
        koli_id: '',
        height: 0,
        length: 0,
        width: 0,
        volume_weight: 0,
        actual_weight: 1,
        surcharge_id: [],
        surcharge_manual: 0,
        is_packing_kayu: false,
        is_packing_kayu_id: '',
        description: ''
      }
    ],
    amount_cod: 0,
    connote_bpik:[],
    total_biaya: 0,
    connote_index: ''
  },

  transaction: {
    transaction_id: '',
    transaction_finished: false,
    node_code: '',
    connote: [
      {
        pra_connote: '',
        single_connote_no: '',
        connote_number: '',
        connote_shipper_customer_id: '',
        connote_shipper_name: '',
        connote_shipper_phone_number: '',
        connote_shipper_street_address:'',
        connote_shipper_administrative_address: '',
        connote_shipper_tariff_code: '',
    
        connote_receiver_customer_id: '',
        connote_receiver_address_type: 'rumah',
        connote_receiver_zip_code: '',
        connote_receiver_tariff_code: '',
        connote_receiver_name: '',
        connote_receiver_phone_number: '',
        connote_receiver_street_address: '',
        connote_receiver_administrative_address: '',
    
        insured_goods_value: 0,
        amount_discount: 0,
        is_insurance_refused: false, // gw juga ga faham kenapa req body dari backend mintra dobel2 gini x_x
        is_insured: false,
        is_packing_kayu: false,
        connote_refuse_wooden_package:false,
        is_need_do_return: false,
        connote_is_do_return: false,
        connote_koli_item: [
          {
            koli_id: '',
            height: 0,
            length: 0,
            width: 0,
            volume_weight: 0,
            actual_weight: 1,
            surcharge_id: [],
            surcharge_manual: 0,
            is_packing_kayu: false,
            is_packing_kayu_id: '',
            description: ''
          }
        ],
        amount_cod: 0,
        connote_bpik:[],
        total_biaya: 0,
        connote_index: '',
        customer_code_tariff: ''
      },
    ],
    grand_total: 0,
    discount: 0,
    payment_method: ''
  },
  

}
