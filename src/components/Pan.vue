<template>
    <div :class="classes" v-hammer:pan.all.end="pan" ref="area">
        <slot></slot>
    </div>
</template>

<script>
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'
    import Victor from 'victor';

    export default {
        name: 'AirPan',
        mixins: [base, anchor],
        computed: {
            classes() {
                return [this.baseClasses, this.anchorClasses].join(' ');
            }
        },
        methods: {
            pan(e) {
                let vector = new Victor(e.deltaX, e.deltaY * -1);
                let length = 10 / this.$refs.area.clientWidth * vector.length();

                this.$store.commit('sendMessage', {
                    type: 'pan',
                    value: {
                        vector: vector.normalize(),
                        length: length,
                        end: e.type === 'panend'
                    },
                    key: this.name
                });
            }
        }
    }
</script>