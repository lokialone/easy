import JSONP from './jsonp';

let getData = JSONP({
    url: 'http://localhost:3000/jsonp',
    data: {  
        key1: 'key1'  
    }
});
getData().then((data) => {
    console.log('xxxx======>', data);
})


