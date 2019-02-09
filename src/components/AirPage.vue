<template>
    <div v-show="isCurrentPage" :class="classes">
        <div class="children">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {base} from "../mixins/base";

    export default {
        name: 'AirPage',
        mixins: [base],
        props: {

        },
        computed: {
            isCurrentPage() {
                return this.name === this.$store.getters.currentPage;
            },
            classes() {
                return [this.baseClasses].join(' ');
            }
        }
    }
</script>

<style>
    .air-page {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
    }

    .air-page .children {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>