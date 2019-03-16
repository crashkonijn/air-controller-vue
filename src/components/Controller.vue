<template>
    <div :class="deviceClasses">
        <slot></slot>
    </div>
</template>

<script>
    /* eslint-disable no-undef */
    import { mapGetters } from 'vuex'
    import {sender} from '../mixins/sender'
    import _ from 'lodash'

    export default {
        name: 'AirController',
        mixins: [sender],
        mounted() {
            this.initAirConsole();

            if (this.page) {
                this.$store.commit('setPage', this.page);
            }
        },
        props: {
            page: {
                required: false,
                type: String,
                default: null,
            },
        },
        computed: {
            ...mapGetters([
                'airConsole',
                'deviceId',
                'currentPage',
                'deviceClasses',
                'getInput',
                'getAxis',
                'getLastSend',
                'getChannelSettings',
            ]),
        },
        methods: {
            initAirConsole() {
                if (typeof AirConsole === "undefined") {
                    this.airConsole.start();
                    return;
                }

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
            onPremium() {
                this.$store.commit('setIsPremium', true);
            }
        }
    }
</script>