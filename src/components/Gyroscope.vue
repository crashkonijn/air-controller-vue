<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'AirGyroscope',
        mounted() {
            this.airConsole.onDeviceMotion = this.onDeviceMotion
        },
        beforeDestroy() {
            this.airConsole.onDeviceMotion = null;
        },
        computed: {
            ...mapGetters([
                'airConsole',
            ]),
        },
        methods: {
            onDeviceMotion(data) {
                this.$store.commit('sendMessage', {
                    type: 'gyro',
                    value: data,
                    key: 'motion'
                });
            }
        }
    }
</script>