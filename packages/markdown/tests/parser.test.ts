import parser from '../src/parser';

test('transform headerline', () => {
    expect(parser.transformLine('# header')).toEqual([{tag: 'h1'}, {content: 'header'}]);
    expect(parser.transformLine('## header')).toEqual([{tag: 'h2'}, {content: 'header'}]);
    expect(parser.transformLine('## header ## ')).toEqual([{tag: 'h2'}, {content: 'header '}, {tag: 'h2'}]);
    expect(parser.transformLine('##header')).toEqual([{content: '##header'}]);
});

test('transform ullist', () => {
    expect(parser.transformLine('- header')).toEqual([{parent: 'ul', tag: 'li'}, {content: 'header'}]);
    expect(parser.transformLine('header - hello')).toEqual([{"content": "header "}, {"parent": "ul", "tag": "li"}, {"content": "hello"}]);
})

test('transform orderlist', () => {
    expect(parser.transformLine('1. hello')).toEqual([{tag: "li", parent: 'ol', content: '1.'}, {content: "hello"}]);
    expect(parser.transformLine('22. hello')).toEqual([{tag: "li", parent: 'ol',  content: '22.'}, {content: "hello"}]);
    expect(parser.transformLine('11.hello')).toEqual([{content: "11.hello"}]);
})


test('transform strang&bold', () => {
    expect(parser.transformLine('hello*hello*')).toEqual([{content: "hello"}, {tag: "em"}, {"content": "hello"}, {"tag": "em"}]);
    expect(parser.transformLine('hello**hello**')).toEqual([{content: "hello"}, {tag: "strong"}, {"content": "hello"}, {"tag": "strong"}]);
    expect(parser.transformLine('hello***hello***')).toEqual([{content: "hello"}, {tag: "strong-em"}, {"content": "hello"}, {"tag": "strong-em"}]);
})

test('transform blockquote', () => {
    expect(parser.transformLine('> hello')).toEqual([{tag: "blockquote"}, {content: "hello"}]);
    expect(parser.transformLine('>hello')).toEqual([{content: ">hello"}]);
    expect(parser.transformLine('hello > hello')).toEqual([{content: "hello "}, {tag: "blockquote"}, {"content": "hello"}]);
})