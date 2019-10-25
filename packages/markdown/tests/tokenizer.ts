import Tokenizer from '../src/tokenizer';


test('transform headerline', () => {
    let tokenizer = new Tokenizer('# header');
    expect(tokenizer.getResult()).toEqual([{tag: 'h1'}, {content: 'header'}]);
    // expect(parser.transformLine('## header')).toEqual([{tag: 'h2'}, {content: 'header'}]);
    // expect(parser.transformLine('## header ## ')).toEqual([{tag: 'h2'}, {content: 'header '}, {tag: 'h2'}]);
    // expect(parser.transformLine('##header')).toEqual([{content: '##header'}]);
});