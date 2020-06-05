import EventEmitter from '../src/other';

class A extends EventEmitter {
    data: {
        name: string
    }
    constructor(){
        super();
        this.data = {
            name: 'loki'
        };
        this.on('app',() => {
            console.log('xxxx', this.data.name)
        });
    }
    start() {
        console.log('start');
        setTimeout(() => {
            this.emit('app');
        }, 1000);
    }
}


let event = new EventEmitter();
event.on('test', () => {
    const a = new A();
    a.start();
});
event.emit('test');
event.emit('test');


// event.on('test2', function() {
//     const a = new A();
//     a.start();
// });
// event.on('test2', function() {
//     const a = new A();
//     a.start();
// });
// event.emit('test2');
// event.emit('test2');

// setTimeout(() => {
//     console.log('clear test2')
//     event.off('test2');
//     event.emit('test2');
// }, 2000);



