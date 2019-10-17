
function getThen(value) {
    var t = typeof value;
    if (value && (t === 'object' || t === 'function')) {
      var then = value.then;
      if (typeof then === 'function') {
        return then;
      }
    }
    return null;
}

function doResolve(fn, onFulfilled, onRejected) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return
        done = true
        onFulfilled(value)
      }, function (reason) {
        if (done) return
        done = true
        onRejected(reason)
      })
    } catch (ex) {
      if (done) return
      done = true
      onRejected(ex)
    }
}

class LKPromise {
    // resolveValue: any;
    // rejectValue: any;
    value: any;
    status: 'pending' | 'fulfilled' | 'reject';
    callback: Function;
    handlers: Function[]
    constructor(func: Function) {
        this.callback = func;
        // this.resolveValue = null;
        // this.rejectValue = null;
        this.status = 'pending';
        doResolve(func, this.resolve, this.reject);
        // this.callback((arg) => this.resolve(arg), (arg) => this.reject(arg));
    }

    fulfill(value) {
        if (this.status === 'pending') {
            this.value = value;
            this.status = 'fulfilled';
        } 
    }

    reject(value) {
        if (this.status === 'pending') {
            this.value = value;
            this.status = 'reject';
        } 
    }
    resolve(result) {
        try {
          var then = getThen(result);
          if (then) {
            doResolve(then.bind(result), this.resolve, this.reject)
            return
          }
          this.fulfill(result);
        } catch (e) {
          this.reject(e);
        }
      }

    catch(func: Function) {
        this.callback(()=>{}, this.reject);
    }

    then = function (onFulfilled: Function, onRejected?: Function) {

        return new LKPromise((resolve, reject) => {
          return this.done(function (result) {
            if (typeof onFulfilled === 'function') {
              try {
                return this.resolve(onFulfilled(result));
              } catch (ex) {
                return this.reject(ex);
              }
            } else {
              return resolve(result);
            }
          }, function (error) {
            if (typeof onRejected === 'function') {
              try {
                return resolve(onRejected(error));
              } catch (ex) {
                return reject(ex);
              }
            } else {
              return reject(error);
            }
          });
        });
      }
}

let a = new LKPromise((resolve, reject) => {
    console.log(1);
    setTimeout(() =>{
        console.log(2);
        reject('d');
        resolve(3);
    }, 5000);
});

a.then((res) => {
    console.log('then', res);
})

// class Container {
//     private __value: any;
//     constructor(x) {
//         this.__value = x;
//     }
//     static of(x) {
//         return new Container(x);
//     }
//     map(func: Function) {
//         return Container.of(func(this.__value));
//     }
// }

// let c = Container.of(2).map((x) => x * 2).map((x) => x * 2);
// console.log(c);