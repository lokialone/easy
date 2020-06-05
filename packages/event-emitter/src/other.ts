const a: {
  (): void;
  f: string;
} = Object.assign(() => {}, {
  f: '',
});

class EventEmitter {
    private events: {
        [k: string] : Function[]
    }
    constructor() {
        this.events = {};
    }
    on(eventName: string, func: Function) {
        if (this.events[eventName]) {
            this.events[eventName].push(func);
        } else {
            this.events[eventName] = [func];
        }
    }

    once(eventName: string, func: Function) {
        let once = (...args) => {
            func(args);
            this.off(eventName, once);
        }
        func.l = once;
        this.on(eventName, once);
    }

    emit(eventName: string, ...args) {
       let fns = this.events[eventName];
       if (fns) {
           fns.forEach(fn => fn(...args));
       }
    }

    off(eventName: string, func?: Function) {
        this.events[eventName] = this.events[eventName].filter((fn) => fn !==func && fn.l !== func);
    }
}

export default EventEmitter;