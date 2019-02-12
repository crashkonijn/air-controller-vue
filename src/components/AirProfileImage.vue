<template>
    <div :class="classes" :style="'backgroundImage: url(' + image + ')'">
        <slot></slot>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'

    export default {
        name: 'AirProfileImage',
        mixins: [base, anchor],
        props: {
            size: {
                required: false,
                default: 512
            }
        },
        computed: {
            ...mapGetters([
                'airConsole',
                'deviceId',
            ]),
            classes() {
                return [this.baseClasses, this.anchorClasses].join(' ');
            },
            image() {
                return this.airConsole.getProfilePicture(this.deviceId, this.size);
            }
        },
    }
</script>