<template>
    <button :class="classes" v-hammer:press="press" v-hammer:pressup="up" v-hammer:tap="tap">
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
                type: String,
                validator: (val) => ['down', 'hold', 'tap', 'double-tap'].includes(val)
            },
            value: {
                required: false,
                default: null
            }
        },
        data: () => ({
            isPressed: false
        }),
        computed: {
            classes() {
                return [this.baseClasses, this.pressedClasses, this.anchorClasses, this.premiumClasses].join(' ');
            },
            pressedClasses() {
                if (!this.isPressed) {
                    return '';
                }

                let component = this.kebab_case(this.$options.name);

                return component + '--pressed';
            },
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

                setTimeout(() => {
                    this.send('up', 'hold-button');
                }, 20);
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

                if ("down" === event) {
                    this.isPressed = true;
                }

                if ("up" === event) {
                    this.isPressed = false;
                }

                this.$store.commit('sendMessage', {
                    type: type,
                    event: event,
                    value: this.value,
                    key: this.name
                });
            }
        },
    }
</script>