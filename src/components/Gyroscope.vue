<template>
    <div :class="classes" >
        <slot></slot>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'

    export default {
        name: 'AirGyroscope',
        mixins: [base, anchor],
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
            classes() {
                return [this.baseClasses, this.anchorClasses].join(' ');
            }
        },
        methods: {
            onDeviceMotion(data) {
                this.$store.commit('sendMessage', {
                    type: 'gyro',
                    value: data,
                    key: this.name
                });
            }
        }
    }
</script>