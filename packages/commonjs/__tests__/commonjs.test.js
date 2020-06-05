'use strict';

const myRequire = require('../src/index.js');
describe('commonjs', () => {
    it('needs tests', () => {
        const a = myRequire('./a.js');
    });
});
