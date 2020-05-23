let id = 0;
export default class Dep {
    constructor() {
        this.id++;
        this.subs = [];
    }
    // 在当前wather上加上 addSub
    depend() {
        Dep.target.addDep(this);
    }
    notify() {
        // console.log(this.subs);
        this.subs.forEach(watcher => watcher.update());
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
}

let stack = [];
export function pushTarget(watcher) {
    if (watcher) {
        stack.push(watcher);
        Dep.target = watcher;
    }
}

export function popTarget() {
    stack.pop();
    Dep.target = stack[stack.length - 1];
}
