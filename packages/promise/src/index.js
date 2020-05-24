const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        throw TypeError('promise2 is same with x');
    } else if (typeof x === 'function' || (typeof x === 'object' && typeof x !== null)) {
        // 处理x为promise的情况
        let then = x.then;
        if (then) {
            then.call(x, (value) => {
                resolve(value);
            },(err) => {
                reject(value);
            })
        } else {
            resolve(x);
        }
    } else {
        resolve(x);
       
        // reject(x);
    }

}
class Promise {
    constructor(executor) {
        this.value = '';
        this.status = PENDING;
        this.reason = '';
        this.OnFulfilledCallbacks = [];
        this.OnRejectedCallbacks = [];
        const resolve = (value) => {
            this.value = value;
            this.status = RESOLVED;
            this.OnFulfilledCallbacks.forEach(fn => fn());
        }
        const reject = (err) => {
            this.reason = err;
            this.status = REJECTED;
            this.OnFulfilledCallbacks.forEach(fn => fn());
        }
        try {
            executor(resolve, reject);
        } catch (err) {
            console.log(err);
        }
    }

    then(OnFulfilled, OnRejected) {
        OnFulfilled = typeof OnFulfilled === 'function' ? OnFulfilled : v =>v;
        OnRejected = typeof OnRejected === 'function' ? OnRejected : err => {throw new Error(err)};
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = OnFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);  
                    } catch (error) {
                        reject(error);
                    }
                    
                }, 0);
            }
            if (this.status === PENDING) {
                this.OnFulfilledCallbacks.push(() => {
                    let x = OnFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                });
                this.OnRejectedCallbacks.push(() => {
                    let x = OnRejected(this.value);
                     resolvePromise(promise2, x, resolve, reject);
                });
            }
            if (this.status === REJECTED) {
                let x = OnRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
            }

        })
        return promise2;
    }
}

let a = new Promise((resolve, reject) => {
    console.log('1');
    resolve('resolve');
    console.log('x');
});
a.then((value) => {
    console.log(value);
    return new Promise((resolve, reject) => {
        resolve('resolve inner');
    });
}).then((value) => {
    console.log('then2', value);
    return 'last';
})