import LKPromise from '../src/index';

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