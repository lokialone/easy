import JSONP from './jsonp';

JSONP({
    url: 'http://localhost:3000/jsonp',
    // data: {  
    //     key1: 'key1'  
    // },
    callback: (json) => {
        console.log(json);
    }
})