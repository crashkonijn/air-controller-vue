<template>
    <button :class="classes" v-hammer:press="press" v-hammer:tap="tap" v-hammer:pressup="up">
        <slot>{{ id || name }}</slot>
    </button>
</template>

<script>
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'
    import {premium} from '../mixins/premium'

    export default {
        name: 'AirButton',
        mixins: [base, anchor, premium],
        props: {
            mode: {
                required: true,
                validator: (val) => ['down', 'hold', 'tap', 'double-tap'].includes(val)
            },
            value: {
                required: false,
                default: null
            }
        },
        computed: {
            classes() {
                return [this.baseClasses, this.anchorClasses, this.premiumClasses].join(' ');
            }
        },
        methods: {
            press() {
                if (this.mode !== 'down') {
                    if (this.mode !== 'hold') {
                        return;
                    }

                    this.send('down', 'hold-button');
                    return;
                }

                this.send('down', 'tap-button');
            },
            up() {
                if (this.mode !== 'hold') {
                    return;
                }

                this.send('up', 'hold-button');
            },
            tap(e) {
                if (e.taps === 1) {
                    this.singleTap();
                }
                if (e.taps === 2) {
                    this.doubleTap();
                }
            },
            singleTap() {
                if (this.mode !== 'tap') {
                    return;
                }

                this.send('down', 'tap-button');
            },
            doubleTap() {
                if (this.mode !== 'double-tap') {
                    return;
                }

                this.send('down', 'tap-button');
            },
            send(event, type) {
                if (this.getPremium()) {
                    return;
                }

                this.$store.commit('sendMessage', {
                    type: type,
                    event: event,
                    value: this.value,
                    key: this.name
                });
            }
        }
    }
</script>