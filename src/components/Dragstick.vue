<template xmlns:v-hammer="http://www.w3.org/1999/xhtml">
    <div :class="classes" v-hammer:pan.all="pan" v-hammer:panstart="panStart" v-hammer:panend="panEnd">
        <svg style="width:100%;height:100%;">
            <circle :cx="joystickPosition.x" :cy="joystickPosition.y" r="40" stroke="black" fill="#4286f4" opacity="0.4"></circle>
            <circle :cx="dragPosition.x" :cy="dragPosition.y" r="40" stroke="black" fill="#4286f4" opacity="0.4"></circle>
        </svg>
    </div>
</template>

<script>
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'
    import {premium} from '../mixins/premium'
    import Victor from 'victor'

    export default {
        name: 'AirJoystick',
        mixins: [base, anchor, premium],
        mounted() {
            this.$store.commit('setChannelSetting', {
                name: this.name,
                channel: 'continues'
            });
        },
        data: () => ({
            dragPosition: {x: 0, y: 0},
            joystickPosition: {x: 0, y: 0},
            visualPosition: {x: 0, y: 0},
            dir: null
        }),
        computed: {
            classes() {
                return [this.id, this.baseClasses, this.anchorClasses].join(' ');
            },
        },
        methods: {
            panStart(e) {
                this.dragPosition = this.getVictor(e);
                this.joystickPosition = this.getVictor(e);
            },
            panEnd() {
                this.$store.commit('removeAxis', {
                    id: this._uid,
                    key: this.name,
                });
            },
            pan(e) {
                this.dragPosition = this.getVictor(e);
                this.updateJoystickPosition();

                this.dir = this.dragPosition.clone().subtract(this.joystickPosition).normalize();

                this.$store.commit('addAxis', {
                    id: this._uid,
                    value: this.dir,
                    key: this.name
                });
            },
            getVictor(e) {
                return new Victor(e.center.x, e.center.y);
            },
            updateJoystickPosition() {
                if (this.dragPosition.distance(this.joystickPosition) > 50) {
                    let dir = this.dragPosition.clone().subtract(this.joystickPosition);
                    this.joystickPosition = this.dragPosition.clone().subtract(dir.normalize().multiply(new Victor(50, 50)));
                }
            }
        }
    }
</script>