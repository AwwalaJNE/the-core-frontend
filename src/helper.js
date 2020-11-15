import Vue from "vue";
const token = localStorage.getItem("tokenBearer")

export default {
    header() {
        return {
            headers: {
              // 'X-Auth-Key'  : Vue.ls.get('token'), 
              // Authorization: "Bearer " + Vue.ls.storage.tokenBearer,
              Authorization: "Bearer " + token,
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