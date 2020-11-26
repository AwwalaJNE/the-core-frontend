import Vue from "vue";

export default {
    header() {
        return {
            headers: {
              // 'X-Auth-Key'  : Vue.ls.get('token'), 
              // Authorization: "Bearer " + Vue.ls.storage.tokenBearer,
              Authorization: "Bearer " + localStorage.getItem("tokenBearer"),
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
    },
    headerLogin() {
        return {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
    }
}