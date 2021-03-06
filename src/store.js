import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import EventBus from './event-bus'
import Victor from 'victor'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        airConsole: {
            start() {
                setInterval(() => {
                    this.run();
                }, 1000);
            },
            run() {
                if (this.onDeviceMotion) {
                    this.onDeviceMotion({
                        x: Math.random(),
                        y: Math.random(),
                        z: Math.random(),
                    });
                }
            },
            message (target, data) {
                console.log(data);
            },
            onDeviceMotion: null
        },
        deviceId: -1,
        deviceData: {
            class: '',
            enableHero: false,
            playerId: null,
            view: 'loading',
            customData: {}
        },
        input: {},
        /**
         * { key: { _uid: value} }
         */
        axis: {},
        lastSend: {},
        isPremium: false,
        channelSettings: {
            motion: 'continues'
        }
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

                _.forOwn(deviceData.customdata, (value, key) => {
                    Vue.set(state.deviceData.customData, key, value);
                });

                EventBus.$emit('onData', state.deviceData.customData);

                this.commit('setPage', deviceData.view);
            }
        },
        setDeviceId(state, id) {
            state.deviceId = id;
        },
        sendMessage(state, payload) {
            let key = payload.key;
            delete payload.key;

            _.set(state.input, key, payload);
            EventBus.$emit('sendMessage');
        },
        clearInput(state, lastSend) {
            _.forEach(lastSend, (value, key) => {
                if (_.get(state.channelSettings, key) === 'continues') {
                    _.set(state.lastSend, key, value);
                }
            });

            state.input = {};
            state.axis = {};
        },
        setPage(state, view) {
            if (state.deviceData.view !== view) {
                state.deviceData.view = view;

                EventBus.$emit('onShowPage', view);
            }
        },
        setIsPremium(state, premium) {
            state.isPremium = premium;

            EventBus.$emit('onBecamePremium', premium);
        },
        addAxis(state, object) {
            _.set(state.axis, object.key + '.id' + object.id, object.value);
            EventBus.$emit('sendMessage');
        },
        removeAxis(state, object) {
            _.set(state.axis, object.key + '.id' + object.id, new Victor(0, 0));

            EventBus.$emit('sendMessage');
        },
        setChannelSetting(state, payload) {
            _.set(state.channelSettings, payload.name, payload.channel);
        }
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
        },
        getInput(state) {
            return state.input;
        },
        getAxis(state) {
            return state.axis;
        },
        getLastSend(state) {
            return state.lastSend;
        },
        getChannelSettings(state) {
            return state.channelSettings;
        }
    }
})
