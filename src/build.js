import Vue from 'vue'
import store from './store'
import AirController from './index'
import './styles/air-controller.scss';

Vue.config.productionTip = false;

Vue.use(AirController);

new Vue({
    store,
    el: '#app',
}).$mount('#app');