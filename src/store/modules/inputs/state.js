export default {
  user: {
    user_name: {
      label: "Name*",
      key: "user_name",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    user_login: {
      label: "Username*",
      key: "user_login",
      rule: "required",
      typeInput: "text",
      typeData: "String",
      valueData: null,
      value: ''
    },
    user_email: {
      label: "Email*",
      key: "user_email",
      rule: "required|email",
      typeInput: "text|email",
      typeData: "String",
      valueData: null,
      value: ''
    },
    password: {
      label: "Password",
      key: "password",
      rule: "",
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

  }
}
