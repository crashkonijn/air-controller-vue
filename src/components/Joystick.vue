<template>
    <div :class="classes" ref="joystick">
        <div class="children">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'
    import {premium} from '../mixins/premium'
    import Victor from 'victor'
    import nipplejs from 'nipplejs';

    export default {
        name: 'AirJoystick',
        mixins: [base, anchor, premium],
        mounted() {
            this.$nextTick(() => {
                nipplejs.create({
                    zone: this.$refs.joystick,
                    color: 'blue'
                }).on('added', (evt, nipple) => {
                    this.joystick = nipple;
                    nipple.on('move', this.move);
                    nipple.on('end', this.end);
                });
            });

            this.$store.commit('setChannelSetting', {
                name: this.name,
                channel: 'continues'
            });
        },
        data: () => ({
            joystick: null,
        }),
        computed: {
            classes() {
                return [this.id, this.baseClasses, this.anchorClasses].join(' ');
            },
        },
        methods: {
            getAngle() {
                let pos = new Victor(this.joystick.position.x, this.joystick.position.y * -1);
                let target = new Victor(this.joystick.frontPosition.x, this.joystick.frontPosition.y * -1).add(pos);
                return target.subtract(pos).divideScalar(50);
            },
            move() {
                if (this.getPremium()) {
                    return;
                }

                this.$store.commit('addAxis', {
                    id: this._uid,
                    value: this.getAngle(),
                    key: this.name
                });
            },
            end() {
                if (this.getPremium()) {
                    return;
                }

                this.$store.commit('removeAxis', {
                    id: this._uid,
                    key: this.name,
                });
            },
        }
    }
</script>