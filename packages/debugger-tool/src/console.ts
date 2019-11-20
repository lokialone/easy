let _console = window.console;
let infos: any = [];
window.console = null;
const proxy = new Proxy(_console, {
    get(target, property, ) {
        if (property in target) {
            if (typeof target[property] === 'function') {
                return (message, ...args) =>  {
                    infos.push({type: property, message, args});
                    target[property](message, ...args);
                }
            } 
            return target[property];
        } else {
            throw new Error(`${property} not in console`);
        }
    }
});

window.console = proxy;
let infosProxy = new Proxy(infos, {
    set(target, key, value) {
        Reflect.set(target, key, value);
    }
})

// console.log()
export default infos;

