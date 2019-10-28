import tokenizer from '../src/tokenizer';


test('transform headerline', () => {
   
    expect(tokenizer('# header')).toEqual([{tag: 'h1'}, {content: 'header'}]);
    expect(tokenizer(('## header'))).toEqual([{tag: 'h2'}, {content: 'header'}]);
    expect(tokenizer('## header ##')).toEqual([{tag: 'h2'}, {content: 'header ##'}]);
    expect(tokenizer('##header')).toEqual([{content: '##header'}]);
});

test('transform ullist', () => {
    expect(tokenizer('- header')).toEqual([{parent: 'ul', tag: 'li'}, {content: 'header'}]);
    expect(tokenizer('header - hello')).toEqual([{"content": "header "}, {"parent": "ul", "tag": "li"}, {"content": "hello"}]);
})

test('transform orderlist', () => {
    expect(tokenizer('1. hello')).toEqual([{tag: "li", parent: 'ol', content: '1.'}, {content: "hello"}]);
    expect(tokenizer('22. hello')).toEqual([{tag: "li", parent: 'ol',  content: '22.'}, {content: "hello"}]);
    expect(tokenizer('11.hello')).toEqual([{content: "11.hello"}]);
})