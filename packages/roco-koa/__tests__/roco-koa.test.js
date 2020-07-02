'use strict';

const Koa = require('../lib/application');
const http = require('http');
const app = new Koa();


test('app server start', (done) => {
    const mockFn = jest.fn();
    app.use(mockFn);
    app.listen(9000);
    http.get('http://localhost:9000/api', () => {
        expect(mockFn.mock.calls.length).toBe(1);
        done()
    });
})