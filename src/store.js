import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import EventBus from './event-bus'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        airConsole: null,
        deviceId: -1,
        deviceData: {
            class: '',
            enableHero: false,
            playerId: null,
            view: 'loading',
            customData: {}
        },
        input: {},
        isPremium: false
    },
    mutations: {
        showPage(state, page) {
            state.currentPage = page;
        },
        setAirConsole(state, airConsole) {
            state.airConsole = airConsole;
        },
        setDeviceData(state, data) {
            let deviceData = _.get(data, state.deviceId);

            if (deviceData) {
                state.deviceData.class = deviceData.class;
                state.deviceData.enableHero = deviceData.enablehero;
                state.deviceData.playerId = deviceData.playerId;
                state.deviceData.view = deviceData.view;

                _.forOwn(deviceData.customdata, (value, key) => {
                    Vue.set(state.deviceData.customData, key, value);
                });
            }
        },
        setDeviceId(state, id) {
            state.deviceId = id;
        },
        sendMessage(state, payload) {
            let key = payload.key;
            delete payload.key;

            _.set(state.input, key, payload);
            EventBus.$emit('sendMessage', state.input);
        },
        clearInput(state) {
            state.input = {};
        },
        setPage(state, view) {
            state.deviceData.view = view;
        },
        setIsPremium(state, premium) {
            state.isPremium = premium;
        },
    },
    getters: {
        airConsole(state) {
            return state.airConsole;
        },
        deviceId(state) {
            return state.deviceId;
        },
        deviceData(state) {
            return state.deviceData;
        },
        currentPage(state) {
            return state.deviceData.view.toLowerCase();
        },
        deviceClasses(state) {
            return state.deviceData.class;
        },
        isPremium(state) {
            return state.isPremium;
        },
        getCustomData(state) {
            return (key) => {
                if (!_.has(state.deviceData.customData, key)) {
                    Vue.set(state.deviceData.customData, key, null);
                }

                return state.deviceData.customData[key];
            }
        }
    }
})
