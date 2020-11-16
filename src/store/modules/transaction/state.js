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
    origin_address_onchange: {
      label: "Kelurahan / Kecamatan / Kota / Kode Pos*",
      key: "origin_address",
      rule: "required",
      typeInput: "text",
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
    destination_address_onchange: {
      label: "Kelurahan / Kecamatan / Kota / Kode Pos*",
      key: "destination_address",
      rule: "required",
      typeInput: "text",
      typeData: "String",
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
    package_service_onchange: {
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
      label: "Jumlah*",
      key: "package_jumlah",
      rule: "required",
      typeInput: "text|col_right",
      typeData: "Number",
      valueData: null,
      value: '1'
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
  
  calculator: {}

}
