interface funcContentInterface {
    func: Function, once: boolean
}
class EventEmitter {
    private events: {
        [k: string] : funcContentInterface[]
    };
    constructor() {
        this.events = {};
    }
    //
    private _on(eventName: string, func: Function, once: boolean) {
        let funcContent :funcContentInterface = {func, once}
        if (this.events[eventName]){
            this.events[eventName].push(funcContent)
        }  else {
            this.events[eventName] = [funcContent];
        }
    };
    on(eventName: string, func: Function) {
        this._on(eventName, func, false)
    }

    once(eventName: string, func: Function) {
        this._on(eventName, func, true);
    }

    emit(eventName: string) {
        let funcs = this.events[eventName];
        funcs.forEach(funcContent => {
            funcContent.func();
        });
        //去除执行一次的函数
        let notOnce = funcs.filter(funcContent => !funcContent.once);
        this.events[eventName] = notOnce;
    }

    off(eventName: string, func?: Function) {
        if (func) {
            let funcs = this.events[eventName];
            let remain = funcs.filter(funcContent => funcContent.func !== func);
            this.events[eventName] = remain;
        } else {
            this.events[eventName] = [];
        }
        
    }
}

export default EventEmitter;