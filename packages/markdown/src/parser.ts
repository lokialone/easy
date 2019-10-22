//  以回车分割行
import identify from "./identify";

export function splitParagraphs(input: string): string[] {
    return input.split('\n');
}

// type ItagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'a' | 'img';
interface IResult {
    tag: string,
    content: string,
    parent?: 'ul' | 'ol',
    children?: []
}
export function transformLine(input: string) {
    let cursor = 0;
    // let res: IResult = {
    //     tag: 'p',
    //     content: ''
    // };
    let res: any[] = [];
    let content = '';
    while(cursor < input.length) {
        let char = input.charAt(cursor);
        // 有关 #的处理
        if (identify.isHashbang(char)) {
            let tmpContent = char;
            char = input.charAt(++cursor);
            while(identify.isHashbang(char)) {
                tmpContent += char;
                char = input.charAt(++cursor);
            }
            // 根据空格判断## 为header是否成立
            if (identify.isWhitespace(char)) {
                if (content.length) {
                    res.push({content});
                    content = '';
                }
                res.push({tag: 'h2'});
                cursor++;
            } else {
                content += tmpContent;
            } 
            continue;
        }

        if (identify.isDash(char)) {
            char = input.charAt(++cursor);
            if (identify.isWhitespace(char)) {
                if (content.length) {
                    res.push({content});
                    content = '';
                }
                res.push({tag: 'li', parent: 'ul'});
                cursor++;
            } else {
                content += char;
            }
            continue;
        }

        content += char;
        cursor++;
    }

    if (content.length) res.push({content}); 
    return res;
}

export function transform(input: string[]) {
    let lineIndex = 0;
    while(lineIndex < input.length) {

    }
}

export default {
    transformLine
}
