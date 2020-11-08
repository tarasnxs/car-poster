import Vue from 'vue'
import App from './App.vue'
import VueConfirmDialog from 'vue-confirm-dialog'
import VueImg from 'v-img'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueConfirmDialog)
Vue.use(VueImg)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
