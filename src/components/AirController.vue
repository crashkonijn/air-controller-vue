<template>
    <div :class="deviceClasses">
        <slot></slot>
    </div>
</template>

<script>
    /* eslint-disable no-undef */
    import { mapGetters } from 'vuex'
    import _ from 'lodash'
    import EventBus from '../event-bus'
    import Victor from 'victor'

    export default {
        name: 'AirController',
        mounted() {
            this.initAirConsole();
            EventBus.$on('sendMessage', this.onSendMessage);

            if (this.page) {
                this.$store.commit('setPage', this.page);
            }
        },
        props: {
            page: {
                required: false,
                type: String,
                default: null,
            }
        },
        computed: {
            ...mapGetters([
                'airConsole',
                'deviceId',
                'currentPage',
                'deviceClasses',
                'getInput',
                'getAxis',
            ]),
        },
        methods: {
            initAirConsole() {
                let airConsole = new AirConsole({orientation: AirConsole.ORIENTATION_LANDSCAPE, device_motion: 120});

                airConsole.onReady = this.onReady;
                airConsole.onDeviceStateChange = this.onDeviceStateChange;
                airConsole.onPremium = this.onPremium;

                this.$store.commit('setAirConsole', airConsole);
            },
            onReady() {
                this.$store.commit('setDeviceId', this.airConsole.getDeviceId());
            },
            onDeviceStateChange(deviceId, data)
            {
                let customData = JSON.parse(_.get(data, 'custom', '{}'));
                this.$store.commit('setDeviceData', customData);
            },
            onSendMessage: _.throttle(function () {
                this.airConsole.message(AirConsole.SCREEN, this.collectData());
                this.$store.commit('clearInput');
            }, 110),
            collectData() {
                let data = Object.assign({}, this.getInput);

                _.forEach(this.getAxis, (value, key) => {
                    _.set(data, key, this.compileAxis(value))
                });

                return data;
            },
            compileAxis(data) {
                let v = new Victor(0, 0);

                _.forEach(data, (value) => {
                    v.add(value);
                });

                return {
                    type: 'vector',
                    value: v.divideScalar(Object.keys(data).length),
                }
            },
            onPremium() {
                this.$store.commit('setIsPremium', true);
            }
        }
    }
</script>