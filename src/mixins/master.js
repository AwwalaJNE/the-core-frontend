/**
  * @desc Mixin master digunakan untuk assist variable/function 
  * yg sifatnya reusable atau digunakan oleh banyak components
  * yg tidak perlu dimasukin ke store.
  * @param string -
  * @return mixin
*/

import URL from "@/config.js";
import helper from "@/helper.js";
import moment from "moment"
// import { parse } from "vue-currency-input";
const Master = {
    data() {
        return {
            URL : null,
            Helper: null,
            day:null
        }
    },
    computed: {
        listenActiveUser() {
            return this.$ls.get('user')
        },
        listenNodeId() {
            return this.$store.getters.getUser['node_id'].value
        },
        listenNodeCode() {
            return this.$store.getters.getUser['node_id'].node_code
        }
    },
    methods: {
        moneyformat(number){
            let val = number != 0 ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number) : 'Rp 0'
            return val
        },
        moneyParsing(str) {
            
            // let option = {
            //     distractionFree: false,
            //     valueAsInteger: true,
            //     autoDecimalMode: true
            // }
            // return parse(str, this.options);
            let numb = 0
            if(typeof str == 'string') {
                if(str !== '') {
                    let txt = str.split(".")[0]
                    // console.log('money str', str,txt)
                    numb = txt.match(/\d/g);
                    numb = numb.join("");
                }
            }
            
            return numb
            
        },
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
        checkAuth(res) {
            console.log('res', res.data)
            if(res.status === 401) {
                localStorage.clear();
                this.$router.go()
            } else if(res.data.reason) {
                let reason = res.data.reason.toLowerCase()
                switch(true) {
                    case reason.includes("unauthenticated"):
                        localStorage.clear();
                        this.$router.go()
                        break;
                    default:
                        // code block
                }
            }
            // if(res == 401) {
            //     localStorage.clear();
            //     this.$router.go()
            // }
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
        },
        dayConverter(val){
            switch(val) {
                case "7":
                    this.day = 'Minggu'
                    break;
                case "6":
                    this.day = 'Sabtu'
                    break;
                case "5":
                    this.day = 'Jum\'at'
                    break;
                case "4":
                    this.day = 'Kamis'
                    break;
                case "3":
                    this.day = 'Rabu'
                    break;
                case "2":
                    this.day = 'Selasa'
                    break;
                case "1":
                    this.day = 'Senin'
                    break;
                default:
                // code block
            }
            return this.day
        },

        dateConvert(val){
            if(val != null){
                return moment(val).format('DD-MMM-YYYY kk:mm');
            }
        }
    },
    created() {
        this.URL = URL
        this.Helper = helper
    },
}
export default Master