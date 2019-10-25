//  以回车分割行
import identify from "./identify";

export function splitParagraphs(input: string): string[] {
    return input.split('\n');
}

interface IResult {
    tag?: string,
    content?: string,
    parent?: 'ul' | 'ol'
}
export function transformLine(input: string) {
    let cursor = 0;
    let res: IResult [] = [];
    let content = '';
    while(cursor < input.length) {
        let char = input.charAt(cursor);
        // isHorizontal
        // header
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
        // unordered list
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
        // bold 
        if (identify.isAsterisk(char)) {
            if (content.length) {
                res.push({content});
                content = '';
            }
            let secondChar = input.charAt(++cursor);
            if (identify.isAsterisk(secondChar)) {
                let thirdChar = input.charAt(++cursor);
                if (identify.isAsterisk(thirdChar)) {
                    cursor++;
                    res.push({tag: 'strong-em'});
                } else {
                    res.push({tag: 'strong'});
                }
            } else {
                res.push({tag: 'em'});
            }
            continue;
        }
        // blockquote
        if (identify.isGreater(char)) {
            let secondChar = input.charAt(++cursor);
            if(identify.isWhitespace(secondChar)) {
                if (content.length) {
                    res.push({content});
                    content = '';
                }
                res.push({tag: 'blockquote'});
                cursor++;
            } else {
                content += char;
            } 
            continue;
        }
        // orderlist
        if (identify.isNumber(char)) {
            let tmpContent = char;
            char = input.charAt(++cursor);
            while(identify.isNumber(char)) {
                tmpContent += char;
                char = input.charAt(++cursor);
            }
            // 根据空格判断## 为header是否成立
            if (identify.isDot(char)) {
                let nextChar = input.charAt(++cursor);
                tmpContent += char;
                if (identify.isWhitespace(nextChar)) {
                    if (content.length) {
                        res.push({content});
                        content = '';
                    }
                    
                    res.push({parent: "ol",tag: "li",content: tmpContent});
                    cursor++;
                } else {
                    content += tmpContent;
                }
                
            } else {
                content += tmpContent;
            } 
            continue;
        }
        // code
        if (identify.isTick(char)) {
            if (content.length) {
                res.push({content});
                content = '';
            }
            let tmpContent = char;
            char = input.charAt(++cursor);
            while(identify.isTick(char)) {
                tmpContent += char;
                char = input.charAt(++cursor);
            }
            res.push({tag: 'code', content: tmpContent});
            continue;
        }
        // links

        // images

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
