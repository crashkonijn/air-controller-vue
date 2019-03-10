<template>
    <div :class="classes">
        <div class="children">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {anchor} from "../mixins/anchor";

    export default {
        name: 'AirPosition',
        mixins: [anchor],
        computed: {
            classes() {
                return ['air-position', this.anchorClasses].join(' ');
            }
        }
    }
</script>
