import Vue from 'vue'
import App from './App.vue'
import store from './store'
import helpers from './helpers'

Vue.config.productionTip = false;
Vue.use(helpers);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
