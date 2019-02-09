export default {
    install(Vue) {
        Vue.prototype.camel_case = function (string) {
            return string ? this.studly_case(string).replace(/^\w/, c => c.toLowerCase()) : '';
        };
        Vue.prototype.snake_case = function (string) {
            return string ? this.space_case(string).replace(/\s+/g, '_') : '';
        };
        Vue.prototype.kebab_case = function (string) {
            return string ? this.space_case(string).replace(/\s+/g, '-') : '';
        };
        Vue.prototype.studly_case = function (string) {
            return string ? this.title_case(string).replace(/\s+/g, '') : '';
        };
        Vue.prototype.title_case = function (string) {
            return string ? this.space_case(string).replace(/^\w|\W\w/g, c => c.toUpperCase()) : '';
        };
        Vue.prototype.space_case = function (string) {
            return string ? string.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([-_])/g, ' ').toLowerCase() : '';
        };
    }
}