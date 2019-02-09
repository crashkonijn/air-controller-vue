export const base = {
    props: {
        name: {
            required: true,
            type: String
        },
    },
    computed: {
        baseClasses() {
            let component = this.kebab_case(this.$options.name);

            return [component, component + '--' + this.name].join(' ');
        }
    }
};
