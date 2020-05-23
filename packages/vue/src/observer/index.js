import {isPlainObject} from '../shared/index';
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
        return result;
    };
});

class Observer {
    constructor(data) {
        Object.defineProperty(data, '__ob__', {
            enumerable: false,
            configurable: false,
            value: this,
        });
        this.walk(data);
    }
    walk(data) {
        Object.keys(data).forEach(key => {
            let value = data[key];
            if (Array.isArray(value)) {
                Object.setPrototypeOf(data, proxyMethods);
                this.observeArray(value);
            }
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
    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {
                dep.depend();
            }
            observe(value);
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
    if (!isPlainObject(data)) {
        return data;
    }
    return new Observer(data);
}
