import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentPage: 'home'
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        currentPage(state) {
            return state.currentPage;
        }
    }
})
