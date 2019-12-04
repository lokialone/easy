import { toVnode } from '../src/vnode2h';
import tokenizer from '../src/tokenizer';

test('toVnode div onClick', () => {
    let data = `
        <div onClick={()=>this.click}>{hello} world</div>
    `;
    console.log(toVnode(tokenizer(data)));
})


