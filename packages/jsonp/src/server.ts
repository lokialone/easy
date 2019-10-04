import * as Koa from 'koa'; // koa框架
import * as Router from 'koa-router'; // koa-router：处理路由

const app = new Koa(); // 新建一个koa应用
const router = new Router(); // 新建一个路由

router.get('/d', async (ctx) => { //定义路由以及对应处理
    let data = { 
        name: 'lokia',
        age: 12
    }
    ctx.body = JSON.stringify(data);
});

router.get('/jsonp', async (ctx) => { //定义路由以及对应处理
    let data = { 
        name: 'lokia',
        age: 12
    }
    let callback = ctx.request.query.callback + '(' + JSON.stringify(data) + ')';
    ctx.body = callback;
});

router.get('/*', async (ctx) => { //定义路由以及对应处理
    ctx.body = 'Hello World!';
});



app.use(router.routes()); // 加载路由

app.listen(3000); // 此应用会监听3000端口

console.log('Server running on port 3000');