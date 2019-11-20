function partial<T>(func: Function, arg:T) {
    return (...args: T[]) => {
        return func.apply(null, [arg, ...args]);
    }
}

function sum (a: number, b: number):number {
    return a + b;
}

const a =  partial(sum, 2);
console.log(a(7));
