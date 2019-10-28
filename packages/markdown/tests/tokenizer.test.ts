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

test('transform strang&bold', () => {
    expect(tokenizer('hello*hello*')).toEqual([{content: "hello"}, {tag: "em"}, {"content": "hello"}, {"tag": "em"}]);
    expect(tokenizer('hello**hello**')).toEqual([{content: "hello"}, {tag: "strong"}, {"content": "hello"}, {"tag": "strong"}]);
    expect(tokenizer('hello***hello***')).toEqual([{content: "hello"}, {tag: "strong-em"}, {"content": "hello"}, {"tag": "strong-em"}]);
})

test('transform blockquote', () => {
    expect(tokenizer('> hello')).toEqual([{tag: "blockquote"}, {content: "hello"}]);
    expect(tokenizer('>hello')).toEqual([{content: ">hello"}]);
    expect(tokenizer('hello > hello')).toEqual([{content: "hello "}, {tag: "blockquote"}, {"content": "hello"}]);
})

test('transform code', () => {
    expect(tokenizer('`hello`')).toEqual([{tag: "code", content: '`'}, {content: "hello"}, {tag: "code", content: '`'}]);
    expect(tokenizer('``hello``')).toEqual([{tag: "code", content: '``'}, {content: "hello"}, {tag: "code", content: '``'}]);
    expect(tokenizer('```hello```')).toEqual([{tag: "code", content: '```'}, {content: "hello"}, {tag: "code", content: '```'}]);
    expect(tokenizer('````hello````')).toEqual([{tag: "code", content: '````'}, {content: "hello"}, {tag: "code", content: '````'}]);
})


test('transform link', () => {
    expect(tokenizer('[hello](https://xxxxx)')).toEqual([{tag: 'link', content: 'hello', url: 'https://xxxxx'}]);
    expect(tokenizer('[hello(https://xxxxx)')).toEqual([{content: '[hello(https://xxxxx)'}]);
    expect(tokenizer('[hello](https://xxxxx')).toEqual([{content: '[hello](https://xxxxx'}]);
    expect(tokenizer('[hello]https://xxxxx)')).toEqual([{content: '[hello]https://xxxxx)'}]);
    expect(tokenizer('nice[hello](https://xxxxx)')).toEqual([{content: 'nice'}, {tag: 'link', content: 'hello', url: 'https://xxxxx'}]);
})


test('transform image', () => {
    expect(tokenizer('[hello](https://xxxxx)')).toEqual([{tag: 'link', content: 'hello', url: 'https://xxxxx'}]);
    expect(tokenizer('[hello(https://xxxxx)')).toEqual([{content: '[hello(https://xxxxx)'}]);
    expect(tokenizer('[hello](https://xxxxx')).toEqual([{content: '[hello](https://xxxxx'}]);
    expect(tokenizer('[hello]https://xxxxx)')).toEqual([{content: '[hello]https://xxxxx)'}]);
    expect(tokenizer('nice[hello](https://xxxxx)')).toEqual([{content: 'nice'}, {tag: 'link', content: 'hello', url: 'https://xxxxx'}]);
})
