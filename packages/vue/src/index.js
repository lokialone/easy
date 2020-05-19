import {initMixin} from './init';
function Vue(options) {
    this._init(options);
}

initMixin(Vue);

const vue = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        test: [1, 2, 3],
    },
});
console.log(vue, vue.message);
vue.message = 4;
vue.test.push(4);
vue.test.push({test: '4'});
console.log(vue);
export default Vue;
