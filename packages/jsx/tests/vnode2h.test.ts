import { toVnode } from '../src/vnode2h';
import tokenizer from '../src/tokenizer';

test('toVnode div onClick', () => {
    let data = `
        <div onClick={()=>this.click}>{hello} world</div>
    `;
    // expect(toVnode(tokenizer(data), {})).toMatchSnapshot();
    // console.log(toVnode(tokenizer(data), {}));
});

test('toVnode children', () => {
    let data = `
        <div><span>hello</span></div>
    `;
    // expect(toVnode(tokenizer(data), {})).toMatchSnapshot();
    console.log(toVnode(tokenizer(data), {}));
});
