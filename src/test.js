import Vue from 'vue'
import App from './tests/App.vue'
import store from './store'
import AirController from './index'
import './styles/test.scss'

Vue.config.productionTip = false;

Vue.use(AirController);

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
