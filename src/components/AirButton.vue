<template>
    <button :class="classes">
        {{ name }}
    </button>
</template>

<script>
    import {anchor} from '../mixins/anchor'
    import {base} from '../mixins/base'

    export default {
        name: 'AirButton',
        mixins: [base, anchor],
        props: {

        },
        computed: {
            classes() {
                return [this.baseClasses, this.anchorClasses].join(' ');
            }
        }
    }
</script>

<style lang="scss">
    .air-button {
        position: absolute;
        width: 50vh;
        height: 50vh;
    }
</style>
