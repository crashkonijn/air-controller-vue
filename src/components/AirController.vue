<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    /* eslint-disable no-undef */
    import { mapGetters } from 'vuex'
    import _ from 'lodash'
    import EventBus from '../event-bus'

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
            ]),
            classes() {
                return '';
            }
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
            onSendMessage: _.throttle(function (data) {
                this.airConsole.message(AirConsole.SCREEN, data);
                this.$store.commit('clearInput');
            }, 110),
            onPremium() {
                this.$store.commit('setIsPremium', true);
            }
        }
    }
</script>