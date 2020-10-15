import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import App from './App.vue'
import router from './router'
import store from './store'

import VeeValidate, { Validator } from 'vee-validate'
import Storage from 'vue-ls'

Vue.use(Vuesax)

const dictionary = {
  en: {
      messages: {
          required: () => 'Kolom harus diisi',
          email: () => 'Format email salah',
          numeric: () => 'Kolom hanya boleh diisi angka',
          is: () => 'Kata sandi tidak cocok',
          min: (field, params) => field + ' harus ' + params + ' karakter!',
          max: (field, params) => field + ' tidak boleh lebih dari ' + params + ' karakter!',
          max_value: () => 'Periksa kembali pilihan barang dan jumlahnya'
      },
  },
  custom: {
      phone: {
        required: 'Nomor Telepon belum diisi',
        max: 'Nomor telepon tidak boleh lebih dari 11 karakter'
      }
  }
};
Validator.localize(dictionary);
Vue.use(VeeValidate, { fieldsBagName: 'keyword' });

let options = {
    namespace: 'vuejs__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
}
Vue.use(Storage,options)

Vue.config.productionTip = false
Vue.prototype.$log = console.log

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
