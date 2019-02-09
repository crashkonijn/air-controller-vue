<template>
    <div v-show="isCurrentPage" :class="classes">
        <div class="children">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AirPage',
        props: {
            name: {
                required: true,
                type: String
            }
        },
        computed: {
            isCurrentPage() {
                return this.name === this.$store.getters.currentPage;
            },
            classes() {
                return ['air-page', 'air-page--' + this.name].join(' ');
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
    }
</style>