const TOKENS = ['<', '>', '=', '/'];
const WHITESPACE = /\s+/;
const isSingleQuote = /\'/;
const isDoubleQuote = /\"/;
// const NUMBER = /^[0-9]+$/;
// const STRING = /[0-9]

export default function tokenizer(html: string) {
    let length = html.length;
    let cursor = 0;
    let tokens = [];
    let tmpContent = '';
    function savePreviousContent() {
        if (tmpContent) {
            tokens.push(tmpContent);
            tmpContent = '';
        }
    }

    function readSingleQuteString() {
        let char = html.charAt(++cursor);
        let res = '';
        while(!isSingleQuote.test(char) && cursor < length) {
            res += char;
            char = html.charAt(++cursor);
        }
        tokens.push('\'' + res + '\'');
    }

    function readDoubleQuteString() {
        let char = html.charAt(++cursor);
        let res = '';
        while(!isDoubleQuote.test(char) && cursor < length) {
            res += char;
            char = html.charAt(++cursor);
        }
        tokens.push('"' + res + '"');
    }

    function readExpressions() {
        tokens.push('{');
        let char = html.charAt(++cursor);
        let res = '';
        while(char !== '}' && cursor < length) {
            res += char;
            char = html.charAt(++cursor);
        }
        tokens.push(res);
        tokens.push('}');
    }

    while (cursor < length) {
        let char = html.charAt(cursor);
        if (char === '{') {
            savePreviousContent();
            readExpressions();
            cursor++;
            continue;
        }
        if (isSingleQuote.test(char)) {
            savePreviousContent();
            readSingleQuteString();
            cursor++;
            continue;
            
        }
        if (isDoubleQuote.test(char)) {
            savePreviousContent();
            readDoubleQuteString();
            cursor++;
            continue;
        }

        if (TOKENS.includes(char)) {
            savePreviousContent();
            cursor++;
            tokens.push(char);
            continue;
        }
        if (WHITESPACE.test(char)) {
            savePreviousContent();
            cursor++;
            continue;
       }
       tmpContent += char;
       cursor++;
    } 
    return tokens;
}