const WHITESPACE = /\s+/;
type IAttribute = {
    type: 'var' | 'string' | 'null',
    value: string | null
}
interface IAttributes {
    [k: string]: IAttribute
}
interface IVnode {
    name: string;
    attributes?: IAttributes,
    children?: (string | IVnode)[]
}

export function readAttributes(tokens:string[], cursor: number) {
    let char = tokens[cursor];
    let attrs: IAttributes= {};
    let isValue = false; //更具等号前后来判断
    let attr:IAttribute = {
        type: 'null',
        value: null
    };
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
        _cursor: cursor,
        attrs
    }
}

export function toVnode(tokens: string[], result: IVnode = {name: ''}) {
    let cursor = 0;
    if (tokens[cursor] === '<' && tokens[cursor + 1] !== '/') {
        result.name = tokens[cursor + 1];
        const { _cursor, attrs } = readAttributes(tokens, cursor + 2);
        cursor = _cursor;
        result.attributes = attrs;
    }
    console.log(result);
}

// export function parse(str: string) {
//     return toVnode(tokenizer(str))
// }

// export default parse;