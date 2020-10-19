/**
  * @desc Mixin master digunakan untuk assist variable/function 
  * yg sifatnya reusable atau digunakan oleh banyak components
  * yg tidak perlu dimasukin ke store.
  * @param string -
  * @return mixin
*/

import URL from "@/config.js";
import helper from "@/helper.js";
const Master = {
    data() {
        return {
            URL : null,
            Helper: null
        }
    },
    methods: {
        openNotification(type = null, title,msg) {
            // type success, danger, warn
            const noti = this.$vs.notification({
              color: type,
              position: 'top-right',
              title: title,
              text: msg
            })
        }
    },
    created() {
        this.URL = URL
        this.Helper = helper
    },
}
export default Master