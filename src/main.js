import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
    Autocomplete,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Collapse,
    CollapseItem,
    DatePicker,
    FormItem,
    Option,
    Select,
    TimePicker,
    Upload,
} from 'element-ui'
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
let isHandling401 = false

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!error.response) return Promise.reject(error)

        const status = error.response.status
        const data = error.response.data

        const isUnauth =
            status === 401 ||
            data?.reason?.toLowerCase?.().includes('unauthenticated') ||
            data?.type === 'AuthenticationException'

        if (!isUnauth) return Promise.reject(error)

        // 🧠 Prevent multiple concurrent logout triggers
        if (isHandling401) return Promise.reject(error)
        isHandling401 = true

        // ⏳ Small delay — let concurrent API calls complete first
        await new Promise((resolve) => setTimeout(resolve, 300))

        // 🧪 Double-check token again (it might be valid now)
        const token = JSON.parse(localStorage.getItem('vuejs__tokenBearer') || '{}')?.value
        if (token) {
            // Retry once — only if token still exists
            try {
                const retryResponse = await axios(error.config)
                isHandling401 = false
                return retryResponse
            } catch (retryErr) {
                // Retry failed → fallback to logout
            }
        }

        // ❌ Still unauthenticated → log out user
        localStorage.clear()
        router.push('/login')
        isHandling401 = false
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
        currency: { prefix: 'Rp ', suffix: '' },
        locale: 'id-ID',
        precision: 0, // 0 decimal places
        valueAsInteger: false, // save number as is (not multiplied by 100)
        autoDecimalDigits: false, // don't automatically add decimal digits
        hideCurrencySymbolOnFocus: true,
        hideGroupingSeparatorOnFocus: false, // Show grouping separator on focus
        allowNegative: false, // Don't allow negative numbers
        distractionFree: {
            hideNegligibleDecimalDigits: true,
            hideGroupingSymbol: false,
            hideCurrencySymbol: false,
        },
        // Custom formatting for Indonesian Rupiah
        currencyDisplay: 'symbol',
        currencySign: 'standard',
        useGrouping: true, // Enable thousand separators
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    },
})

// -------------------- Vue LS --------------------
Vue.use(Storage, { namespace: 'vuejs__', name: 'ls', storage: 'local' })

Vue.use(Vuesax)
Vue.config.productionTip = false
Vue.prototype.$log = console.log
Vue.prototype.$VueExtend = Vue.util.extend
Vue.prototype.$VueDelete = Vue.delete
Vue.prototype.$nextTick = Vue.nextTick

// -------------------- Clear All Console --------------------
// TURN THIS ON ON PRODUCTION
console.log = () => {}
console.warn = () => {}
console.error = () => {}

// -------------------- Uppercase Directive --------------------
Vue.directive('uppercase', {
    bind(el, binding) {
        const input = el.querySelector('input')
        if (!input) return
        if (binding.value) input.value = binding.value.toUpperCase()

        input.addEventListener('input', () => {
            const upperValue = input.value.toUpperCase()
            if (input.value !== upperValue) {
                input.value = upperValue
                input.dispatchEvent(new Event('input', { bubbles: true }))
            }
        })
    },
    update(el, binding) {
        const input = el.querySelector('input')
        if (!input) return
        if (binding.value !== undefined) {
            const upperValue = binding.value.toUpperCase()
            if (input.value !== upperValue) {
                input.value = upperValue
                input.dispatchEvent(new Event('input', { bubbles: true }))
            }
        }
    },
})

// -------------------- Version Auto-Refresh --------------------
let currentVersion = null

const channel = new BroadcastChannel('version_channel')

async function checkVersion() {
    try {
        const res = await fetch('/version.json?cacheBust=' + Date.now())
        const { version } = await res.json()

        if (!currentVersion) {
            currentVersion = version
        } else if (currentVersion !== version) {
            channel.postMessage(version)

            window.location.reload(true)
        }
    } catch (e) {
        console.error('❌ Version check failed:', e)
    }
}

channel.onmessage = (event) => {
    const newVersion = event.data
    if (newVersion && newVersion !== currentVersion) {
        window.location.reload(true)
    }
}

checkVersion()

setInterval(checkVersion, 60000)

// -------------------- Copy Vue --------------------

Vue.directive('copy', {
    bind(el, binding, vnode) {
        el.addEventListener('click', () => {
            const value = binding.value || ''
            const vm = vnode.context // same as "this" in the component

            // ✅ check developer mode from component
            if (!vm?.listenIsDeveloperMode) return
            if (!value) return

            // Copy text
            navigator.clipboard.writeText(value.toString())
        })
    },
})

// -------------------- Mount Vue --------------------
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
