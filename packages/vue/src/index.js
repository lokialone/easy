import {initMixin} from './init';
import {lifecycleMixin} from './lifecycle';
import {renderMixin} from './render';
import {initGlobalAPI} from './global-api/mixin';
function Vue(options) {
    this._init(options);
}

initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
initGlobalAPI(Vue);
const vue = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        test: [1, 2, 3, {a: 4}],
    },
    created() {
        // console.log('created');
    },
});
console.log(vue);
setTimeout(() => {
    vue.test.push(4);
}, 1000);
export default Vue;
