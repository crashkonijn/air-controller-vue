<template>
    <div :class="classes">
        {{ data }}
    </div>
</template>

<script>
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'

    export default {
        name: 'AirData',
        mixins: [base, anchor],
        props: {
            key: {
                required: true
            }
        },
        computed: {
            classes() {
                return [this.baseClasses, this.anchorClasses].join(' ');
            },
            data() {
                return this.$store.getters.getCustomData(this.key);
            }
        },
    }
</script>