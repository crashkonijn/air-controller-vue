export const anchor = {
    props: {
        anchor: {
            required: true,
            type: String,
            default: 'center-center'
        },
    },
    computed: {
        anchorClasses() {
            return 'anchor--' + this.anchor;
        }
    }
};
