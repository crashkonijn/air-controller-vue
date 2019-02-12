export const anchor = {
    props: {
        anchor: {
            required: false,
            type: String,
        },
    },
    computed: {
        anchorClasses() {
            if (!this.anchor) {
                return '';
            }

            return 'anchor anchor--' + this.anchor;
        }
    }
};
