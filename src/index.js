import { VueHammer } from 'vue2-hammer'
import Helpers from './helpers'
import Components from './components'

VueHammer.config.press = {
    time: 1
};

export default {
    install(Vue) {
        Vue.use(VueHammer);
        Vue.use(Helpers);
        Vue.use(Components);
    }
}
