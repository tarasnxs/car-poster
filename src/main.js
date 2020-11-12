import Vue from 'vue'
import App from './App.vue'
import VueConfirmDialog from 'vue-confirm-dialog'
import VueImg from 'v-img'
import router from './router'
import Vuelidate from 'vuelidate';
import ToastedPlugin from "vue-toasted";

Vue.config.productionTip = false
Vue.use(VueConfirmDialog)
Vue.use(VueImg)
Vue.use(Vuelidate)
Vue.use(ToastedPlugin)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
