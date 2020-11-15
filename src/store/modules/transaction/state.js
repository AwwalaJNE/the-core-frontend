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
      key: "origin_address_onchange",
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
      typeInput: "text|disabled",
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
      value: ''
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
      key: "destination_address_onchange",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      onchange: true,
      value: ''
    },
    destination_zip_code: {
      label: "Kode Pos*",
      key: "destination_zip_code",
      rule: "required",
      typeInput: "text|disabled",
      typeData: "String",
      valueData: null,
      value: ''
    },
    destination_code: {
      label: "Kode Tujuan*",
      key: "destination_code",
      rule: "required",
      typeInput: "text|disabled",
      typeData: "String",
      valueData: null,
      value: ''
    },
  },
  
  calculator: {}

}
