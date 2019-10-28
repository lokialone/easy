import Tokenizer from '../src/tokenizer';


test('transform headerline', () => {
    // let tokenizer = ;
    let tokenizer1 = new Tokenizer('## header');
    let tokenizer2 = new Tokenizer('## header ##');
    let tokenizer3 = new Tokenizer('##header');

    expect(new Tokenizer('# header')).toEqual([{tag: 'h1'}, {content: 'header'}]);
    expect(tokenizer1)).toEqual([{tag: 'h2'}, {content: 'header'}]);
    expect(tokenizer2)).toEqual([{tag: 'h2'}, {content: 'header ##'}]);
    expect(tokenizer3)).toEqual([{content: '##header'}]);
});

test('transform ullist', () => {
    expect(new Tokenizer('- header').getResult()).toEqual([{parent: 'ul', tag: 'li'}, {content: 'header'}]);
    expect(new Tokenizer('header - hello').getResult()).toEqual([{"content": "header "}, {"parent": "ul", "tag": "li"}, {"content": "hello"}]);
})

test('transform orderlist', () => {
    expect(new Tokenizer('1. hello').getResult()).toEqual([{tag: "li", parent: 'ol', content: '1.'}, {content: "hello"}]);
    expect(new Tokenizer('22. hello')).toEqual([{tag: "li", parent: 'ol',  content: '22.'}, {content: "hello"}]);
    expect(new Tokenizer('11.hello')).toEqual([{content: "11.hello"}]);
})