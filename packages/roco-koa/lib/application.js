const http = require('http');
const Emitter = require('events');
const request = require('./request');
const response = require('./response');
const context = require('./context');
class Koa extends Emitter {
    constructor() {
        super();
        this.context = Object.create(context);
        this.response = Object.create(response);
        this.request = Object.create(request);
        this.middleware = []
    }
    use(callback) {
        this.middleware.push(callback);
        return this;
    }
    createContext(req, res) {
        let context = Object.create(this.context);
        let request = Object.create(this.request);
        let response = Object.create(this.response);
        context.request = request;
        context.response = response;
        context.request.req = context.req = req;
        context.response.res = context.res = res;
        return context;
    }

    compose2(middlewares, context) {
        function dispatch() {
            middlewares.reduce((acc, item) => {
               return acc.then((context) => {
                   return Promise.resolve(item(context, () => {
                       
                   }));
               })
            }, Promise.resolve());
        }

        return dispatch;
    }

    compose(middlewares, context) {
        function dispatch(i) {
            if(i === middlewares.length) return Promise.resolve();
            let fn = middlewares[i];
            return Promise.resolve(fn(context, () => {
                dispatch(++i);
            }))
        }
        return dispatch(0);

        // const dispatch = i => { // 一个promise 返回一个promise会有等待效果
        //     if(i === this.middlewares.length) return Promise.resolve();
        //     let middleware = this.middlewares[i];
        //     // 中间件如果不是async
        //     return Promise.resolve(middleware(ctx, () => dispatch(i + 1))); // next方法指代的是这个箭头函数
        // }
        // return dispatch(0);
    }

    handleRequest(req, res) {
        let context = this.createContext(req, res);
        let middleware = this.middleware;
        let comosed = this.compose2(middleware, context);
        comosed();
        return;
        // function dispatch(index) {
        //     if (index >= middleware.length) {return};
        //     let callback = middleware[index];
        //     callback(context, () => {
        //         dispatch(++index);
        //     });
        // }
        // dispatch(0);
    }

    listen(...args) {
        const server = http.createServer(this.handleRequest.bind(this));
        return server.listen(...args);
    }
}

module.exports = Koa;