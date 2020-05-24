import {isObject} from '../shared/index';
import Dep from './dep.js';
const oldprotoMethods = Array.prototype;
const proxyMethods = Object.create(oldprotoMethods);
let methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
methods.forEach(method => {
    proxyMethods[method] = function (...args) {
        let result = oldprotoMethods[method].apply(this, args);
        const ob = this.__ob__;
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
            default:
                break;
        }

        if (inserted) {
            ob.observeArray(inserted);
        }
        if (ob) {
            ob.dep.notify();
        }
        return result;
    };
});

class Observer {
    constructor(data) {
        this.isObserver = true;
        this.dep = new Dep();
        if (!data.__ob__) {
            Object.defineProperty(data, '__ob__', {
                enumerable: false,
                configurable: false,
                value: this,
            });
        }
        if (Array.isArray(data)) {
            Object.setPrototypeOf(data, proxyMethods);
            this.observeArray(data);
        } else {
            this.walk(data);
        }
        return this;
    }
    walk(data) {
        Object.keys(data).forEach(key => {
            let value = data[key];
            defineReactive(data, key, value);
        });
    }
    observeArray(data) {
        data.forEach(item => {
            observe(item);
        });
    }
}

function defineReactive(data, key, value) {
    const dep = new Dep();
    let childOb = observe(value);
    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend();
                }
            }

            return value;
        },
        set(newValue) {
            value = newValue;
            dep.notify();
            observe(newValue);
        },
    });
}

export function observe(data) {
    if (!isObject(data)) {
        return;
    }
    return new Observer(data);
}
