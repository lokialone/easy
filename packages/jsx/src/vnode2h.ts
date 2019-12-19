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
        _cursor: cursor,
        attrs,
        selfEnd
    }
}

// const isTagStart = () =>

function parseChildren(tokens: string[], cursor: number = 0) {
    if (cursor > tokens.length) return;
    // if (tokens[cursor] === '<' && tokens[cursor + 1] !== '/') {
    //     result.name = tokens[cursor + 1];
    //     const { _cursor, attrs, selfEnd } = readAttributes(tokens, cursor + 2);
    //     cursor = _cursor;
    //     result.attributes = attrs;
    //     result.children = [];
    //     if (!selfEnd) {
    //         result.children = parseChildren(tokens, cursor);
    //     }
    // }
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

// export function parse(str: string) {
//     return toVnode(tokenizer(str))
// }

// export default parse;