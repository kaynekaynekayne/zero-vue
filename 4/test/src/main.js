import Vue from 'vue'
// import App from './App.vue'
import LottoGenerator from './LottoGenerator.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(LottoGenerator),
}).$mount('#app')
