import tokenizer  from '../src/tokenizer';

test('tokenizer div onClick', () => {
    let data = `
        <div onClick={()=>this.click}>{hello} world</div>
    `;
    expect(tokenizer(data)).toEqual(['<','div','onClick','=','{','()=>this.click','}','>','{','hello','}','world','<','/','div','>']);
});

test('tokenizer image', () => {
    let data = `
        <img src="http://www.expect.com"/>
    `;
    // console.log(tokenizer(data));
    expect(tokenizer(data)).toEqual(['<','img','src', '=','"http://www.expect.com"','/', '>']);
});

test('tokenizer href', () => {
    let data = `
        <a href="path/h">hello</a>
    `;
    expect(tokenizer(data)).toEqual( [ '<', 'a', 'href', '=', '"path/h"', '>', 'hello', '<', '/', 'a', '>' ]);
});