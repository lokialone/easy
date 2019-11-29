const TOKENS = ['<', '>', '{', '}', '/', '='];
const WHITESPACE = /\s+/;
// const NUMBER = /^[0-9]+$/;
// const STRING = /[0-9]
function tokenizer(html: string) {
    let length = html.length;
    let cursor = 0;
    let tokens = [];
    let tmpContent = '';
    while (cursor < length) {
        let char = html.charAt(cursor);
        if (TOKENS.includes(char)) {
            if (tmpContent) {
                tokens.push(tmpContent);
                tmpContent = '';
            }
            cursor++;
            tokens.push(char);
            continue;
        }
       if (WHITESPACE.test(char)) {
            if (tmpContent) {
                tokens.push(tmpContent);
                tmpContent = '';
            }
            cursor++;
            continue;
       }
       tmpContent += char;
       cursor++;
    } 
    return tokens;
}

const testData = `
    <div onClick={hanlderClick}>{xxxx}</div>
    <p>hi</p>
`;

interface IVnode {
    name: string;
    attributes?: {
        [k: string]: {
            type: 'var' | 'string',
            value: string
        }
    },
    children?: (string | IVnode)[]
}

function toVnode(tokens: string[], result: IVnode = {name: ''}) {
    if (tokens[0] === '<' && tokens[1] !== '/') {
        result.name = tokens[0];
    }
}

console.log(tokenizer(testData));