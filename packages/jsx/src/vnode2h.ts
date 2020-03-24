import tokenizer from './tokenizer'

const WHITESPACE = /\s+/;
type IAttribute = {
    type: 'var' | 'string' | 'null',
    value: string | null
}
interface IAttributes {
    [k: string]: IAttribute
}
interface IVnode {
    name?: string;
    attributes?: IAttributes,
    children?: (string | IVnode)[]
}

export function readAttributes(tokens:string[], cursor: number) {
    let char = tokens[cursor];
    let attrs: IAttributes= {};
    let isValue = false; //根据等号前后来判断
    let attr:IAttribute = {
        type: 'null',
        value: null
    };
    let selfEnd = false;
    while(char !== '>' && cursor < tokens.length) {
        if (WHITESPACE.test(char)) {
            char = tokens[++cursor];
            continue;
        };

        if (char === '=') {
            isValue = true;
            char = tokens[++cursor];
            continue;
        }

        if (char === '{') {
            attr.type = 'var';
            char = tokens[++cursor];
            continue;
        }
        if (char === '}') {
            char = tokens[++cursor];
            continue;
        }
        if (char === '/' && tokens[++cursor] === '>') {
            selfEnd = true;
            break;
           
        } else {
            cursor--;
        }

        if(!isValue) {
            attr = attrs[char] = {
                type: 'null',
                value: null, 
            };
        } else {
            if (attr.type === 'null') attr.type = 'string';
            attr.value = char;
            isValue = false;
        }
        char = tokens[++cursor];
    }
    return  {
        _cursor: cursor + 1,
        attrs,
        selfEnd
    }
}

// const isTagStart = () =>

function parseChildren(tokens: string[], cursor: number = 0) {
    let result: (string| IVnode)[] = [];
    console.log(cursor, tokens[cursor]);
    while(cursor < tokens.length) {
        if (tokens[cursor] === '<' && tokens[cursor + 1] !== '/') {
            let children: IVnode= {};
            children.name = tokens[cursor + 1];
            const { _cursor, attrs, selfEnd } = readAttributes(tokens, cursor + 2);
            cursor = _cursor;
            children.attributes = attrs;
            result.push(children);
            if (!selfEnd) {
                children.children = parseChildren(tokens, cursor);
            }
            return result;
        }
        if (tokens[cursor] === '<' && tokens[cursor + 1] === '/') {
            cursor += 2;
            while(tokens[cursor] !== '>' && cursor < tokens.length) {
                cursor++;
            }
            cursor++;
            continue;
        }

        result.push(tokens[cursor]);
        cursor ++;

    }
    return result;
}

export function toVnode(tokens: string[], result: any) {
    let cursor = 0;
    if (tokens[cursor] === '<' && tokens[cursor + 1] !== '/') {
        result.name = tokens[cursor + 1];
        const { _cursor, attrs, selfEnd } = readAttributes(tokens, cursor + 2);
        cursor = _cursor;
        result.attributes = attrs;
        result.children = [];
        if (!selfEnd) {
            result.children = parseChildren(tokens, cursor);
        }
    } else {
        console.error('请输入root标签');
    }

    
    return result;
    // console.log(result);
}
let data = `
<div onClick={()=>this.click}>{hello} world</div>
`;
// console.log(tokenizer(data))
console.log(toVnode(tokenizer(data),{}));
// export function parse(str: string) {
//     return 
// }

// export default parse;