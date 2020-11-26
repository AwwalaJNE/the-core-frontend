export default {
  origin: {
    origin_name: {
      label: "Nama Pengirim*",
      key: "origin_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    origin_phone: {
      label: "Telepon Pengirim*",
      key: "origin_phone",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    origin_address: {
      label: "Alamat & Kode Pos Pengirim",
      key: "origin_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    origin_onchange_address: {
      label: "Kelurahan / Kecamatan / Kota / Kode Pos*",
      key: "origin_onchange_address",
      rule: "required",
      typeInput: "text|onchange|calc_switch",
      typeData: "String",
      valueData: null,
      onchange: true,
      value: ''
    },
    origin_zip_code: {
      label: "Kode Pos*",
      key: "origin_zip_code",
      rule: "required",
      typeInput: "text|disabled|dotted",
      typeData: "String",
      valueData: null,
      value: ''
    },
  },
  destination: {
    destination_type: {
      label: "",
      key: "destination_type",
      rule: "required",
      typeInput: "radio",
      typeData: "String",
      arrData: [
        {
          label: "Rumah*",
          value: "rumah"
        },
        {
          label: "Kantor*",
          value: "kantor"
        }
      ],
      valueData: null,
      value: 'rumah'
    },
    destination_name: {
      label: "Nama Penerima*",
      key: "destination_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    destination_phone: {
      label: "Telepon Penerima*",
      key: "destination_phone",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    destination_address: {
      label: "Alamat & Kode Pos Penerima",
      key: "destination_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    destination_onchange_address: {
      label: "Kelurahan / Kecamatan / Kota / Kode Pos*",
      key: "destination_onchange_address",
      rule: "required",
      typeInput: "text|onchange|calc_switch",
      typeData: "String",
      arrData: [],
      valueData: null,
      onchange: true,
      value: ''
    },
    destination_zip_code: {
      typeInput: "row",
      col:6,
      input: [
        {
          label: "Kode Pos",
          key: "zip_code",
          rule: "required",
          typeInput: "text|disabled",
          typeData: "String",
          valueData: null,
          value: ''
        },
        {
          label: "Kode Tujuan*",
          key: "destination_code",
          rule: "required",
          typeInput: "text|disabled",
          typeData: "String",
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
      key: "package_description",
      rule: "required",
      typeInput: "text|col_left",
      typeData: "String",
      valueData: null,
      value: ''
    },
    package_category: {
      label: "Kategori*",
      key: "package_category",
      rule: "required",
      typeInput: "select|col_left",
      typeData: "String",
      arrData: [],
      valueData: null,
      value: ''
    },
    package_service: {
      label: "Service*",
      key: "package_service",
      rule: "required",
      typeInput: "radio|col_left",
      typeData: "String",
      onchange: true,
      arrData: [],
      valueData: null,
      value: ''
    },
    package_price: {
      label: "Nilai Barang",
      key: "package_price",
      rule: "",
      typeInput: "text|col_left",
      typeData: "Number|money",
      valueData: null,
      value: ''
    },
    package_diskon: {
      label: "Diskon",
      key: "package_diskon",
      rule: "",
      typeInput: "text|col_left",
      typeData: "Number|money",
      valueData: null,
      value: ''
    },
    package_instruksi: {
      label: "Instruksi Khusus",
      key: "package_instruksi",
      rule: "",
      typeInput: "text|col_left",
      typeData: "String",
      valueData: null,
      value: ''
    },


    package_jumlah: {
      typeInput: "row",
      col:6,
      input: [
        {
            label: "Jumlah*",
            key: "package_jumlah",
            rule: "required",
            typeInput: "text|col_right",
            typeData: "Number",
            valueData: null,
            value: '1'
        },
        {
            label: "<i class='bx bx-layer-plus'></i> Atur Berat",
            key: "package_jumlah_dialog",
            rule: "required",
            typeInput: "btnDialog",
            valueData: null,
            value: false
        }
      ],
      package_jumlah: 1
    },
    package_dimensi: {
      typeInput: "row|col_right",
      col: 3,
      input: [
        {
          label: "Weight*",
          key: "weight",
          rule: "required",
          typeInput: "text",
          typeData: "Number",
          valueData: null,
          value: 0
        },
        {
          label: "Length*",
          key: "length",
          rule: "required",
          typeInput: "text",
          typeData: "Number",
          valueData: null,
          value: 0
        },
        {
          label: "Width*",
          key: "width",
          rule: "required",
          typeInput: "text",
          typeData: "Number",
          valueData: null,
          value: 0
        },
        {
          label: "Height*",
          key: "height",
          rule: "required",
          typeInput: "text",
          typeData: "Number",
          valueData: null,
          value: 0
        },
      ],
      weight: 1,
      length: 0,
      width: 0,
      height: 0
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
      key: "package_tidak_asuransi",
      rule: "",
      typeInput: "Boolean|col_right",
      typeData: "Boolean",
      valueData: false,
      value: false
    },
    package_do_return: {
      titleLabel: "Do Return",
      label: "True|False",
      key: "package_do_return",
      rule: "",
      typeInput: "Boolean|col_right",
      typeData: "Boolean",
      valueData: false,
      value: false
    },
  },
  calculator: {
    actual_weight: {
      label: "Actual Weight",
      key: "actual_weight",
      typeData: "String",
      valueData: null,
      value: 0
    },
    volume_weight: {
      label: "Volume Weight",
      key: "volume_weight",
      typeData: "String",
      valueData: null,
      value: 0
    },
    chargeable_weight: {
      label: "chargeable Weight",
      key: "chargeable_weight",
      typeData: "String",
      valueData: null,
      value: 0
    },

    biaya_kirim: {
      label: "biaya kirim",
      key: "biaya_kirim",
      typeData: "String",
      valueData: null,
      value: 0
    },
    handling_charge: {
      label: "handling charge",
      key: "handling_charge",
      typeData: "String",
      valueData: null,
      value: 0
    },
    surcharge: {
      label: "surcharge",
      key: "surcharge",
      typeData: "String",
      valueData: null,
      value: 0
    },
    surcharge_manual: {
      label: "surcharge manual",
      key: "surcharge_manual",
      typeData: "String",
      valueData: null,
      value: 0
    },
    airline_document: {
      label: "airline document",
      key: "airline_document",
      typeData: "String",
      valueData: null,
      value: 0
    },
    shipper_declaration: {
      label: "shipper declaration",
      key: "shipper_declaration",
      typeData: "String",
      valueData: null,
      value: 0
    },
    adm_karantina: {
      label: "adm karantina",
      key: "adm_karantina",
      typeData: "String",
      valueData: null,
      value: 0
    },
    pelepasan_karantina: {
      label: "Pelepasan Karantina",
      key: "pelepasan_karantina",
      typeData: "String",
      valueData: null,
      value: 0
    },
    asuransi: {
      label: "Asuransi",
      key: "asuransi",
      typeData: "String",
      valueData: null,
      value: 0
    },
    adm_asuransi: {
      label: "adm asuransi",
      key: "adm_asuransi",
      typeData: "String",
      valueData: null,
      value: 0
    },
    diskon: {
      label: "diskon",
      key: "diskon",
      typeData: "String",
      valueData: null,
      value: 0
    },
    total_biaya: {
      label: "total biaya",
      key: "total_biaya",
      typeData: "String",
      valueData: null,
      value: 0
    },
  },
  calc_component: {
    arrData: [],
    switch: false,
    prefix: null
  },
  calc_arrData: [],
  calc_switch: false,
  grand_total: 0

}
