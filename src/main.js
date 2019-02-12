import Vue from 'vue'
import App from './App.vue'
import { VueHammer } from 'vue2-hammer'
import store from './store'
import Helpers from './helpers'
import './styles/air-controller.scss'

Vue.config.productionTip = false;

VueHammer.config.press = {
    time: 1
};

Vue.use(VueHammer);
Vue.use(Helpers);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
