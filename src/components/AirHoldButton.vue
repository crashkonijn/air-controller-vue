<template xmlns:v-hammer="http://www.w3.org/1999/xhtml">
    <button :class="classes" v-hammer:press="down" v-hammer:pressup="up">
        <slot>{{ id || name }}</slot>
    </button>
</template>

<script>
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'
    import {premium} from '../mixins/premium'

    export default {
        name: 'AirHoldButton',
        mixins: [base, anchor, premium],
        props: {
            value: {
                required: false,
                default: null
            }
        },
        computed: {
            classes() {
                return ['air-button', this.baseClasses, this.anchorClasses].join(' ');
            }
        },
        methods: {
            down() {
                this.send('down');
            },
            up() {
                this.send('up');
            },
            send(event) {
                if (this.getPremium()) {
                    return;
                }

                this.$store.commit('sendMessage', {
                    type: 'hold-button',
                    event: event,
                    value: this.value,
                    key: this.name
                });
            }
        }
    }
</script>