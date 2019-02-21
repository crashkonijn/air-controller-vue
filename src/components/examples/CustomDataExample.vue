<template>
    <div>
        <h1>{{ text }}</h1>
    </div>
</template>

<script>
    import _ from 'lodash';

    export default {
        name: 'CustomDataExample',
        computed: {
            text() {
                return this.$store.getters.getCustomData('text');
            }
        },
    }
</script>