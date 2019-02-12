<template>
    <button :class="classes" v-hammer:press="tap">
        <slot>{{ id || name }}</slot>
    </button>
</template>

<script>
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'
    import {premium} from '../mixins/premium'

    export default {
        name: 'AirTapButton',
        mixins: [base, anchor, premium],
        props: {
            value: {
                required: false,
                default: null
            }
        },
        computed: {
            classes() {
                return ['air-button', this.baseClasses, this.anchorClasses, this.premiumClasses].join(' ');
            }
        },
        methods: {
            tap() {
                if (this.getPremium()) {
                    return;
                }

                this.$store.commit('sendMessage', {
                    type: 'tap-button',
                    value: this.value,
                    key: this.name
                });
            }
        }
    }
</script>