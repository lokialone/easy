import identify from '../src/identify';


test('isHeader', () => {
    expect(identify.isHeader('# hello')).toBe(true);
    expect(identify.isHeader('#hello')).toBe(false);
    expect(identify.isHeader('## hello')).toBe(true);
    expect(identify.isHeader('- hello # hello')).toBe(false);
});
test('isUlList', () => {
    expect(identify.isUlList('- hello')).toBe(true);
    expect(identify.isUlList('12. hello')).toBe(false);
    expect(identify.isUlList('-hello')).toBe(false);
    expect(identify.isUlList('# hello - xxx')).toBe(false);
});

test('isOlList', () => {
    expect(identify.isOlList('1. hello')).toBe(true);
    expect(identify.isOlList('11. hello ')).toBe(true);
    expect(identify.isOlList('- hello')).toBe(false);
    expect(identify.isOlList('hello 1. hello')).toBe(false);
    expect(identify.isOlList('x. hello')).toBe(false);
});

test('isBlockQuote', () => {
    expect(identify.isBlockQuote('1. hello>')).toBe(false);
    expect(identify.isBlockQuote('> hello')).toBe(true);
    expect(identify.isBlockQuote('>hello')).toBe(false);
    expect(identify.isBlockQuote('hello> hello')).toBe(false);
});

