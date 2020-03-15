class LKPromise {
    value: any;
    status: 'pending' | 'fulfilled' | 'reject';
    resolveValue: any;
    rejectValue: any;
    resolveCallback: Function;
    rejectCallback: Function;
    constructor(func) {
        this.status = 'pending';
        try {
            func((res) => this.resolve(res), this.reject);
        } catch (error) {
            
        }
    }
   

    reject(value) {
        if (this.status === 'pending') {
            this.status = 'reject';
            this.value = value
            this.rejectCallback(value);
        } 
    }
    resolve(value) {
    console.log('resolve',this.status, this.status==='pending');
      if (this.status === 'pending') {
            this.value = value;
            this.status = 'fulfilled';
            console.log('resolve');
            this.resolveCallback(value);
      
        } else if (this.status === 'fulfilled') {
          
        }
        
      }

    then = function (onFulfilled: Function, onRejected?: Function) {
        this.resolveCallback = onFulfilled;
        this.rejectCallback = onRejected;
        return new Promise((resolve, reject) => {
            resolve(()=> {
                console.log('thenable');
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
});
