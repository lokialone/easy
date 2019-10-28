//  normal tokenizer
import identify from "./identify";

interface IResult {
    tag?: string,
    content?: string,
    parent?: 'ul' | 'ol'
}

function tokenizer(input:string) {
    let content = '';
    let result: IResult[]= [];
    let cursor = 0;
    let length = input.length;

    function savePreviousContent() {
        if (content.length) {
            result.push({content});
            content = '';
        }
    }
    function getNextChar() {
        cursor++;
        return input.charAt(cursor);
    }

    function readUlList(char: string) {
        if (identify.isDash(char)) {
            char =getNextChar();
            if (identify.isWhitespace(char)) {
                savePreviousContent();
                result.push({tag: 'li', parent: 'ul'});
                cursor++;
            } else {
                content += char;
            }
           return true;
        }
        return false;
    }

    function readHeader(char: string) {
        if (identify.isHashbang(char)) {
            let tmpContent = char;
            char = getNextChar();
            while(identify.isHashbang(char)) {
                tmpContent += char;
                char = getNextChar();
            }
            // 根据空格判断## 为header是否成立
            if (identify.isWhitespace(char)) {
                savePreviousContent();
                result.push({tag: `h${tmpContent.length}`});
                cursor++;
            } else {
                content += tmpContent;
            }
            return true;
        }
        return false
    }

    while(cursor <length) {
        let char = input.charAt(cursor);
        if (readHeader(char)) continue;
        if (readUlList(char)) continue;
        content += char;
        cursor++;
    }
    savePreviousContent();
    return result;


}

export default tokenizer;
