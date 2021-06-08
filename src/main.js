import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import App from './App.vue'
import router from './router'
import store from './store'
import { Upload, Autocomplete, Collapse, CollapseItem, DatePicker, TimePicker, CheckboxGroup, Checkbox, CheckboxButton, Select, Option, FormItem} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import VueCurrencyInput from 'vue-currency-input'
import VueClipboard from 'vue-clipboard2'


// import VueMoment from 'vue-moment'
// import moment from 'moment-timezone'

locale.use(lang)

import Storage from 'vue-ls'
Vue.use(Vuesax)
// Vue.use(VueMoment, {
//   moment,
// })
Vue.use(Upload)
Vue.use(Autocomplete)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(VueClipboard)
Vue.use(Select)
Vue.use(Option)
Vue.use(FormItem)

const pluginOptions = {
  /* see config reference https://dm4t2.github.io/vue-currency-input/config/*/
  globalOptions: { 
    currency: {prefix: 'Rp ', suffix: ''},
    allowNegative: false,
    distractionFree: {
      hideNegligibleDecimalDigits: true,
      hideGroupingSymbol: false,
      hideCurrencySymbol: false
    },
    autoDecimalMode: false
  }
}
Vue.use(VueCurrencyInput, pluginOptions)



let options = {
    namespace: 'vuejs__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
}
Vue.use(Storage,options)

Vue.config.productionTip = false
Vue.prototype.$log = console.log

// global variable dari https://vuejs.org/v2/api/#Vue-extend
Vue.prototype.$VueExtend = Vue.util.extend 
// global variable darihttps://vuejs.org/v2/api/#Vue-delete
Vue.prototype.$VueDelete = Vue.delete
// global variable https://vuejs.org/v2/api/#Vue-nextTick
Vue.prototype.$nextTick = Vue.nextTick

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

