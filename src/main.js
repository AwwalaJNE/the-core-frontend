import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import App from './App.vue'
import router from './router'
import store from './store'
import { Upload, Autocomplete, Collapse, CollapseItem } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import Storage from 'vue-ls'
Vue.use(Vuesax)

Vue.use(Upload)
Vue.use(Autocomplete)
Vue.use(Collapse)
Vue.use(CollapseItem)

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
