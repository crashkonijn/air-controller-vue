<template xmlns:v-hammer="http://www.w3.org/1999/xhtml">
    <button :class="classes"
            v-hammer:press="press"
            v-hammer:pressup="pressUp"
            v-hammer:pan.end="panEnd"
    >
        <slot>{{ id || name }}: {{ mode }}</slot>
    </button>
</template>

<script>
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'
    import {premium} from '../mixins/premium'
    import Victor from 'victor'
    import _ from 'lodash'

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
        data:() => ({
            isPressed: false
        }),
        computed: {
            classes() {
                return [this.baseClasses, this.pressedClasses, this.anchorClasses].join(' ');
            },
            pressedClasses() {
                if (!this.isPressed) {
                    return '';
                }

                let component = this.kebab_case(this.$options.name);

                return component + '--pressed';
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
            press() {
                this.down();
            },
            pressUp() {
                this.up();
            },
            panEnd() {
                this.up();
            },
            down() {
                if (this.getPremium() || this.isPressed) {
                    return;
                }

                this.isPressed = true;

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

                setTimeout(() => {
                    this.isPressed = false;

                    this.$store.commit('removeAxis', {
                        id: this._uid,
                        key: this.name
                    });
                }, 10);
            },
        }
    }
</script>