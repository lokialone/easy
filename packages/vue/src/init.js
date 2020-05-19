import {initState} from './state';
import {compileToFunction} from './compiler/index';
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options = options;
        initState(vm);
        if (options.el) {
            this.$mount(options);
        }
    };

    Vue.prototype.$mount = function () {
        const vm = this;
        const options = vm.$options;
        let el = options.el;
        if (typeof el === 'string') {
            el = document.querySelector(el);
        }
        // 在没有render 和template的情况下直接使用el里的内容作为模板
        if (!options.render) {
            if (!options.template && el) {
                const template = el.outerHTML;
                const render = compileToFunction(template);
                options.render = render;
            }
        }
    };
}
