<template>
    <div :class="classes" v-hammer:swipe.all="swipe">
        <slot></slot>
    </div>
</template>

<script>
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'

    export default {
        name: 'AirSwipe',
        mixins: [base, anchor],
        computed: {
            classes() {
                return [this.baseClasses, this.anchorClasses].join(' ');
            }
        },
        methods: {
            swipe(e) {
                this.$store.commit('sendMessage', {
                    type: 'swipe',
                    value: e.type,
                    key: this.name
                });
            }
        }
    }
</script>