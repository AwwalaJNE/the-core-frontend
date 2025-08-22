import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Autocomplete, Checkbox, CheckboxButton, CheckboxGroup, Collapse, CollapseItem, DatePicker, FormItem, Option, Select, TimePicker, Upload } from 'element-ui'
import locale from 'element-ui/lib/locale'
import lang from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

import VueClipboard from 'vue-clipboard2'
import VueCurrencyInput from 'vue-currency-input'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'

import Storage from 'vue-ls'
import axios from 'axios'

// -------------------- Axios Interceptor --------------------
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status
      const data = error.response.data

      if (status === 401 || (data && data.reason && data.reason.toLowerCase().includes('unauthenticated')) || (data && data.type === "AuthenticationException")) {
        localStorage.clear()
        router.push('/login')
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

// -------------------- Element UI --------------------
locale.use(lang)
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

// -------------------- VueCurrencyInput --------------------
Vue.use(VueCurrencyInput, {
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
})

// -------------------- Vue LS --------------------
Vue.use(Storage, { namespace: 'vuejs__', name: 'ls', storage: 'local' })

Vue.use(Vuesax)
Vue.config.productionTip = false
Vue.prototype.$log = console.log
Vue.prototype.$VueExtend = Vue.util.extend
Vue.prototype.$VueDelete = Vue.delete
Vue.prototype.$nextTick = Vue.nextTick

// -------------------- Uppercase Directive --------------------
Vue.directive('uppercase', {
  bind(el, binding) {
    const input = el.querySelector('input')
    if (!input) return
    if (binding.value) input.value = binding.value.toUpperCase()
    input.addEventListener('input', () => {
      input.value = input.value.toUpperCase()
      input.dispatchEvent(new Event('input'))
    })
  },
  update(el, binding) {
    const input = el.querySelector('input')
    if (!input) return
    if (binding.value !== undefined) {
      input.value = binding.value.toUpperCase()
      input.dispatchEvent(new Event('input'))
    }
  }
})

// -------------------- Version Auto-Refresh --------------------
let currentVersion = null

async function checkVersion() {
  try {
    const res = await fetch('/version.json?cacheBust=' + Date.now())
    const { version } = await res.json()

    if (!currentVersion) {
      currentVersion = version
    } else if (currentVersion !== version) {
      // Option: langsung auto-refresh tanpa popup
      console.log("🔄 New version detected, auto-reloading...")
      window.location.reload(true)
    }
  } catch (e) {
    console.error("❌ Version check failed:", e)
  }
}

// Cek tiap 1 menit
setInterval(checkVersion, 60000)

// -------------------- Mount Vue --------------------
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
