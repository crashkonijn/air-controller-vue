import _ from 'lodash'
import Victor from 'victor'
import EventBus from '../event-bus'

export const sender = {
    mounted() {
        _.set(this.channels, 'default', _.debounce(() => {
            this.sendMessage();
        }, 110, {leading:true, trailing:false}));
        _.set(this.channels, 'continues', _.debounce(() => {
            this.sendMessage();
        }, 200, {leading:true, trailing:false}));

        EventBus.$on('sendMessage', this.onSendMessage);
    },
    data: () => ({
        channels: {}
    }),
    methods: {
        onSendMessage() {
            _.each(this.getChannels(this.collectData()), (inputs, key) => {
                _.get(this.channels, key)();
            });
        },
        sendMessage() {
            let data = this.collectData();

            this.airConsole.message(0, data);
            this.$store.commit('clearInput', data);

            this.cancelChannels();
        },
        collectData() {
            let data = Object.assign({}, this.getInput);

            _.forEach(this.getAxis, (value, key) => {
                _.set(data, key, this.compileAxis(value))
            });

            let filtered = {};

            _.forEach(data, (value, key) => {
                if (!_.isEqual(value, _.get(this.getLastSend, key))) {
                    _.set(filtered, key, value);
                }
            });

            return filtered;
        },
        cancelChannels() {
            _.each(this.channels, (value) => {
                value.cancel();
            });
        },
        getChannels(data) {
            return _.groupBy(_.keys(data), (key) => {
                return _.get(this.getChannelSettings, key, 'default');
            });
        },
        compileAxis(data) {
            let v = new Victor(0, 0);

            _.forEach(data, (value) => {
                v.add(value);
            });

            return {
                type: 'vector',
                value: v.divideScalar(Object.keys(data).length),
            }
        },
    }
};
