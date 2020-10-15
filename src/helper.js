import Vue from "vue";

export default {
    header() {
        return {
            headers: {
              // 'X-Auth-Key'  : Vue.ls.get('token'),
            //   Authorization: "Bearer " + Vue.ls.storage.tokenBearer,
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
    }
}