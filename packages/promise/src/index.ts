class LKPromise {
    value: any;
    status: 'pending' | 'fulfilled' | 'reject';
    resolveCallbackFun: Function[];
    rejectCallbackFun: Function[];
    constructor(func) {
        this.status = 'pending';
        this.resolveCallbackFun = []
        try {
            func((res) => this.resolve(res), this.reject);
        } catch (error) {
            
        }
    }

    reject(value) {
        if (this.status === 'pending') {
            this.status = 'reject';
            this.value = value 
        } 
    }
    resolve(value) {
        setTimeout(() => {
            this.value = value;
            this.resolveCallbackFun.forEach(func => func(value));
        }, 0);
      }

    then = function (onFulfilled: Function, onRejected?: Function) {
        return new Promise((resolve, reject) => {
            this.resolveCallbackFun.push(() => {
                let result = onFulfilled(this.value);
                if (result instanceof LKPromise) {
                    result.then(resolve)
                } else {
                    resolve(result)
                }
            });
            
        });
       
    }
}

let a = new LKPromise((resolve, reject) => {
    console.log(1);
    setTimeout(() =>{
        console.log(2);
        // reject('d');
        resolve(3);
    }, 1000);
});

a.then((res) => {
    console.log('then', res);
    return 'tet';
})
.then((res) => {
    console.log('then2', res);
   return new LKPromise((resolve) => {
       setTimeout(() =>{
        console.log(4);
        // reject('d');
        resolve(4);
    }, 1000);
   })
}).then((res) => {
    console.log('then3', res);
});
export default LKPromise;
