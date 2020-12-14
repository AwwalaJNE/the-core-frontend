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
    computed: {
        listenNodeId() {
            return this.$store.getters.getUser['node_id'].value
        },
        listenNodeCode() {
            return this.$store.getters.getUser['node_id'].node_code
        }
    },
    methods: {
        openNotification(type = null, title,msg) {
            // type success, danger, warn
            const noti = this.$vs.notification({
                duration: 6000,
                progress: 'auto',
                color: type,
                position: 'top-right',
                title: title,
                text: msg,
                icon: `<i class="bx ${type == 'success' ? 'bx-select-multiple':'bx-error'}" ></i>`
            })
        },
        checkAuth(status) {
            if(status >= 400) {
                localStorage.clear();
                this.$router.go()
            }
        },
        addToObject(obj, key, value, index) {
            // Create a temp object and index variable
            let temp = {};
            let i = 0;

            // Loop through the original object
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {

                    // If the indexes match, add the new item
                    if (i === index && key && value) {
                        temp[key] = value;
                    }

                    // Add the current item in the loop to the temp obj
                    temp[prop] = obj[prop];

                    // Increase the count
                    i++;

                }
            }

            // If no index, add to the end
            if (!index && key && value) {
                temp[key] = value;
            }

            return temp;
        }
    },
    created() {
        this.URL = URL
        this.Helper = helper
    },
}
export default Master