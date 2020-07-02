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
           if (this.status === PENDING) {
                this.value = value;
                this.status = RESOLVED;
                this.OnFulfilledCallbacks.forEach(fn => fn());
            }
        }
        const reject = (err) => {
           if (this.status === PENDING) {
                this.reason = err;
                this.status = REJECTED;
                this.OnRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (err) {
            console.log(err);
        }
    }

    then(OnFulfilled, OnRejected) {
        OnFulfilled = typeof OnFulfilled === 'function' ? OnFulfilled : v => v;
        OnRejected = typeof OnRejected === 'function' ? OnRejected : err => { throw err };
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
            if (this.status === REJECTED) {
               setTimeout(() => {
                    try {
                        let x = OnRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);  
                    } catch (error) {
                        reject(error);
                    }
                    
                }, 0);
            }
            if (this.status === PENDING) {
                    this.OnFulfilledCallbacks.push(() => {
                        setTimeout(() => {
                            try {
                                let x = OnFulfilled(this.value);
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        }, 0);
                    });

                    this.OnRejectedCallbacks.push(() => {
                        setTimeout(() => {
                            try {
                                let x = OnRejected(this.reason);
                                resolvePromise(promise2, x, resolve, reject)  
                            } catch (error) {
                                reject(error)
                            }       
                        }, 0);
                    });      
                }
        })
        return promise2;
    }
    catch(onReject) {
        return this.then(null, onReject);
    }
    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value);
        })
    }
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    finally(callback) {
        return this.then((value)=> {
            return Promise.resolve(callback()).then(() => value);
        }, (err) => {
            return Promise.resolve(callback()).then(()=> {throw err})
        });
    }   
}

let a = new Promise((resolve, reject) => {
    console.log('1');
    // resolve('hello');
    reject('error----');
    console.log('x');
});
a
.then((value) => {
    console.log('then1',value);
    return 'world';
})
.then((value) => {
    console.log('then2', value);
    return 'last';
})
.catch((err) => {
    console.log('catch',err);
}).finally(()=> {
    console.log('finaly');
})
// .then(()=> {
//     console.log('then3', value);
// }).catch((err) => {
//     console.log('catch2',err);
// });