import parser from '../src/parser';

test('transform headerline', () => {
    expect(parser.transformLine('## header')).toEqual([{tag: 'h2'}, {content: 'header'}]);
    expect(parser.transformLine('## header ## ')).toEqual([{tag: 'h2'}, {content: 'header '}, {tag: 'h2'}]);
    expect(parser.transformLine('##header')).toEqual([{content: '##header'}]);
});

test('transform ullist', () => {
    expect(parser.transformLine('- header')).toEqual({tag: 'li',parent: 'ul', content: 'header'});
    expect(parser.transformLine('header - hello')).toEqual({tag: 'p', content: 'header - hello'});
})