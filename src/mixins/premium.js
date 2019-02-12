import { mapGetters } from 'vuex'

export const premium = {
    props: {
        premiumOnly: {
            required: false,
            type: Boolean,
            default: false
        },
    },
    computed: {
        ...mapGetters([
            'isPremium',
            'airConsole',
        ]),
        premiumClasses() {
            if (this.premiumOnly) {
                if (this.isPremium) {
                    return 'premium-only';
                }

                return 'premium-only premium-only--disabled';
            }

            return '';
        },
    },
    methods: {
        getPremium() {
            if (this.premiumOnly && !this.isPremium) {
                this.airConsole.getPremium();
                return true;
            }

            return false;
        }
    }
};
