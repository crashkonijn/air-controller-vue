export const anchor = {
    props: {
        anchor: {
            required: false,
            type: String,
            validator: (val) => ['top-left', 'top-center', 'top-right', 'center-left', 'center-center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'].includes(val)
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
