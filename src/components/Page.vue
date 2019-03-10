<template>
    <div v-if="isCurrentPage" :class="classes">
        <div class="children">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import {base} from "../mixins/base";

    export default {
        name: 'AirPage',
        mixins: [base],
        props: {

        },
        computed: {
            ...mapGetters([
                'currentPage'
            ]),
            isCurrentPage() {
                return this.name.toLowerCase() === this.currentPage;
            },
            classes() {
                return [this.baseClasses].join(' ');
            }
        }
    }
</script>