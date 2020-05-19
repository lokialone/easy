import {isPlainObject} from './shared/index';
import {observe} from './observer/index';
// 将user options的参数就行初始化
export function initState(vm) {
    const opts = vm.$options;
    if (opts.props) {
        initProps(vm);
    }
    if (opts.methods) {
        initMethods(vm);
    }
    if (opts.data) {
        initData(vm);
    }

    if (opts.computed) {
        initComputed(vm);
    }
    if (opts.watch) {
        initWatch(vm);
    }
}

function initProps(vm) {}
function initMethods(vm) {}
function initData(vm) {
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    // 代理对象
    observe(data);
    // 将$options里data的值放到vm上
    proxy(vm, data);
}

function proxy(vm, data) {
    if (!isPlainObject(data)) return;
    Object.keys(data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return data[key];
            },
            set(val) {
                observe(val);
                data[key] = val;
            },
        });
    });
}

function initComputed(vm) {}
function initWatch(vm) {}
