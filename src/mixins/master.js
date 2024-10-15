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
import axios from "axios"
// import { parse } from "vue-currency-input";
const Master = {
    data() {
        return {
            URL : null,
            Helper: null,
            day:null,
            Loading: null,
            alert:null
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
        },
        listenNodeIsCDM() {
            return this.$store.getters.getUser['node_id'].is_cdm
        },
        listenUserRole() {
            return this.$store.getters.getUser['user_data'].role
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
                    if(txt < 1 ){
                        txt = 0
                    }else{
                        numb = txt.match(/\d/g);
                        numb = numb.join("");
                    }
                }
            }
            return numb

        },
        openLoading(msg) {
            this.Loading = this.$vs.loading({
                type:'scale',
                text: msg ? msg :'Please wait...',
                background: '#EAEAEA',
            })
        },
        closeLoading() {
            this.Loading.close()
        },
        openNotification(type = null, code, title, msg) {
            this.playNotificationSound(type);

            // type success, danger, warn
            const noti = this.$vs.notification({
                duration: 6000,
                progress: 'auto',
                color: type,
                position: 'top-right',
                title: title,
                text: msg,
                width: '80%',
                icon: `
                    <div style="display: flex; flex-direction: column; align-items: center; min-width: 64px; margin-left: 30px;">
                        <i class="bx ${type === 'success' ? 'bx-select-multiple' : 'bx-error'}" style="font-size: 24px;"></i>
                        <div style="font-size: 12px; margin-top: 4px; color: #fff; font-weight: bold">
                            ${type === 'danger' && code ? code : ''}
                        </div>
                    </div>
                `
            });
        },
        playNotificationSound(type) {
            let soundPath;
            switch (type) {
                case "success":
                    soundPath = require('@/assets/sound/success.mp3');
                    break;
                case "danger":
                    soundPath = require('@/assets/sound/failed.mp3');
                    break;
                case "warn":
                    soundPath = require('@/assets/sound/warn.mp3');
                    break;
                default:
                    soundPath = require('@/assets/sound/default.mp3');
            }

            const sound = new Audio(soundPath);
            sound.play();
        },          
        openProgress(type = null, title,msg) {
            // type success, danger, warn
            this.alert = this.$vs.notification({
                duration: type == 'danger' ? 3000 : 3000,
                progress: 'auto',
                color: type,
                position: 'top-right',
                title: title,
                text: msg,
                icon: `<i class="bx ${type == 'success' ? 'bx-select-multiple':'bx-error'}" ></i>`
            })
        },
        closeProgress() {
            this.alert.close();
        },
        resetDateTime(date = new Date()){
            Date.prototype.resetTime= function(){
                this.setHours('00')
                this.setMinutes('00')
                this.setSeconds('00')
                return this;
            }

            return new Date(date).resetTime()
        },
        defaultDateTime(date = new Date()){
            Date.prototype.defaultTime= function(){
                this.setHours('23')
                this.setMinutes('59')
                this.setSeconds('59')
                return this;
            }

            return new Date(date).defaultTime()
        },
        checkAuth(res) {
            if(res.status === 401) {
                localStorage.clear();
                this.$router.push('/login')
            } else if(res.data.reason) {
                let reason = res.data.reason.toLowerCase()
                switch(true) {
                    case reason.includes("unauthenticated"):
                        localStorage.clear();
                        this.$router.push('/login')
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
        async checkAuthRequest() {
            // 
            await axios
                .get(this.URL.check_auth+"?n="+this.listenNodeId,
                    this.Helper.header()).catch(err => {
                    this.checkAuth(err.response)
                })            
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
        },
        handlePrintShortcut(printFunction) {
            document.addEventListener('keydown', function (e) {
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    printFunction();
                }
            });
        },
        redirectShortcut() {
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
                    if (e.key.toLowerCase() !== 'i' && e.key.toLowerCase() !== 'c') {
                        e.preventDefault();
                    }
                    switch (e.key.toLowerCase()) {
                        case "h":
                            this.$router.push('/help/error-dictionary')
                            break;
                        case "x":
                            this.$router.push('/transaction/new-transactions')
                            break;
                        case "?":
                            this.$router.push('/trace-bag')
                            break;
                        case "v":
                            this.$router.push('/inbound/prealert/scan')
                            break;
                        case "b":
                            this.$router.push('/inventory/bagging')
                            break;
                        case "o":
                            this.$router.push('/inventory/unbagging')
                            break;
                        default:
                    }
                }
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
                    if (!e.shiftKey) {
                        this.$router.push('/inventory/item')
                    }
                }
                if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                    if (!e.shiftKey) {
                        this.$router.push('/trace-connote')
                    }
                }
            });
        },
        handleSubmitShortcut(submitFunction) {
            document.addEventListener('keydown', function (e) {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    submitFunction();
                }
            });
        },


        setRoutePageHistory(meta, isFinish) {
            const routeHistory = this.$ls.get('route_history') || [];

            if (!isFinish) {
                let temp = {
                    event_id: this.generateRandomUUID(),
                    timestamp: new Date().toISOString(),
                    resource_code: meta?.resource_code || "",
                    resource_type: meta?.resource_type || "",
                    resource_name: meta?.resource_name || "",
                };
                routeHistory.push(temp);
            }
            
            this.$ls.set('route_history', routeHistory);

            if ((routeHistory.length === 10 || isFinish) && routeHistory.length !== 0) {
                return this.handleAuditLog(routeHistory);
            }
            
            return Promise.resolve()
        },
        generateRandomUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const randomHex = Math.random() * 16 | 0;
                const value = c === 'x' ? randomHex : (randomHex & 0x3 | 0x8);
                return value.toString(16);
            });
        },          
        async handleAuditLog(route_history) {
            let form = {
                track_logs: route_history
            }
            try {
                const res = await axios.post(`${this.URL.tracking_audit}?n=${this.listenNodeId}`, form, this.Helper.header());

                this.openNotification('success', null, "Success", res?.data?.message ?? "success");
                localStorage.removeItem('vuejs__route_history');
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
            }
        }
    },
    created() {
        this.URL = URL
        this.Helper = helper
    },
}
export default Master