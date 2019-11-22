function partial<T>(func: Function, arg:T) {
    return (...args: T[]) => {
        return func.apply(null, [arg, ...args]);
    }
}

function compose(func1: Function, func2: Function) :Function {
    return (...args: any[]) => {
        return func1(func2.apply(null, args));
    }
}
// TODO
// function flatten()


