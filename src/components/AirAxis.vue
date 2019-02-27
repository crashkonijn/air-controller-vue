<template xmlns:v-hammer="http://www.w3.org/1999/xhtml">
    <button :class="classes" v-hammer:press="down" v-hammer:pressup="up">
        <slot>{{ id || name }}: {{ mode }}</slot>
    </button>
</template>

<script>
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'
    import {premium} from '../mixins/premium'
    import Victor from 'victor'

    export default {
        name: 'AirAxis',
        mixins: [base, anchor, premium],
        props: {
            mode: {
                required: true,
                validator: (val) => ['left', 'up-left', 'up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'custom'].includes(val)
            },
            value: {
                required: false,
                default: () => {
                    return new Victor(0, 0);
                }
            }
        },
        computed: {
            classes() {
                return [this.baseClasses, this.anchorClasses].join(' ');
            },
            vectors() {
                return {
                    'left': new Victor(-1, 0),
                    'up-left': new Victor(-1, 1),
                    'up': new Victor(0, 1),
                    'up-right': new Victor(1, 1),
                    'right': new Victor(1, 0),
                    'down-right': new Victor(1, -1),
                    'down': new Victor(0, -1),
                    'down-left': new Victor(-1, -1),
                    'custom': this.value
                }
            },
            currentVector() {
                return _.get(this.vectors, this.mode, new Victor(0, 0));
            }
        },
        methods: {
            down() {
                if (this.getPremium()) {
                    return;
                }

                this.$store.commit('addAxis', {
                    id: this._uid,
                    value: this.currentVector.normalize(),
                    key: this.name
                });
            },
            up() {
                if (this.getPremium()) {
                    return;
                }

                this.$store.commit('removeAxis', {
                    id: this._uid,
                    key: this.name
                });
            },
        }
    }
</script>