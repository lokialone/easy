const Koa = require('./lib/application');

const koa = new Koa();
koa.use(async (context, next) => {
    console.log('1');
    await next();
    console.log('2');
    context.res.end('dddddd');
})
koa.use(async (context, next) => {
    console.log('3');
    await next();
    console.log('4');
    context.res.end('dd');
})

koa.listen(9000);



