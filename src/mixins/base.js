export const base = {
    props: {
        name: {
            required: true,
            type: String
        },
        id: {
            required: false,
            type: String
        },
    },
    computed: {
        baseClasses() {
            let component = this.kebab_case(this.$options.name);

            return [component, component + '--' + (this.id || this.name)].join(' ');
        }
    }
};
