//  normal tokenizer
import identify from "./identify";

export interface IResult {
    tag?: string,
    content?: string,
    url?: string,
    parent?: 'ul' | 'ol'
}

function isEmptyString(char: string) {
    return char === '';
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
            char = getNextChar();
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

    function readOlList(char: string) {
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
                    savePreviousContent();
                    result.push({parent: "ol",tag: "li",content: tmpContent});
                    cursor++;
                } else {
                    content += tmpContent;
                }
            } else {
                content += tmpContent;
            } 
            return true;
        }
        return false;
    }

    function readBold(char: string) {
        if (identify.isAsterisk(char)) {
            savePreviousContent();
            let secondChar = getNextChar();
            if (identify.isAsterisk(secondChar)) {
                let thirdChar = getNextChar();
                if (identify.isAsterisk(thirdChar)) {
                    cursor++;
                    result.push({tag: 'strong-em'});
                } else {
                    result.push({tag: 'strong'});
                }
            } else {
                result.push({tag: 'em'});
            }
            return true;
        }
        return false;
    }

    function readBlockQuote(char: string) {
        if (identify.isGreater(char)) {
            let secondChar = input.charAt(++cursor);
            if(identify.isWhitespace(secondChar)) {
                savePreviousContent();
                result.push({tag: 'blockquote'});
                cursor++;
            } else {
                content += char;
            } 
            return true;
        }
        return false;
    }

    function readCode(char: string) {
        if (identify.isTick(char)) {
            savePreviousContent();
            let tmpContent = char;
            char = getNextChar();
            while(identify.isTick(char)) {
                tmpContent += char;
                char = getNextChar();
            }
            result.push({tag: 'code', content: tmpContent});
            return true;
        }
        return false
    }

    function readSquareBrace(char:string) {
        if (identify.isOpeningSquareBrace(char) ) {
            let alt = ''
            let char = getNextChar();
            while(!identify.isClosingSquareBrace(char)) {
                // 提前结束
                if (isEmptyString(char)) {
                    cursor++;
                    return {
                        success: false,
                        content: '[' + alt
                    }
                }
                alt += char;
                char = getNextChar();
            }
            return {
                success: true,
                content: alt
            }
        } else {
            return {
                success: false,
                content: ''
            }
        }
    }
    function readParenthesis() {
        let char = getNextChar();
        if (identify.isOpeningParenthesis(char)) {
            let url = '';
            char = getNextChar();
            while(!identify.isClosingParenthesis(char)) {
                if (isEmptyString(char)) {
                    cursor++;
                    return {
                        success: false,
                        content: `(${url}`
                    };
                }
                url += char;
                char = getNextChar();
            }
            cursor++;
            return {
                success: true,
                content: url
            };
        } else {
            return {
                success: false,
                content: ''
            };
        }
    }
    function readImage(char: string) {
        if (identify.isExclamation(char)) {
            char = getNextChar();
            let alt = readSquareBrace(char);
            if (alt.success === false) {
                if (alt.content) {
                    content = content + '!' + alt.content;
                    return true
                }
                return false;
            };
            let url = readParenthesis();
            if( url.success === false) {
                content = content + '![' + alt.content + ']' + url.content;
                return true;
            };
            savePreviousContent();
            result.push({tag: 'img', content: alt.content, url: url.content});
            return true;
        }
        return false
    }

    function readLink(char: string) {
        let alt = readSquareBrace(char);
        if (alt.success === false) {
            if (alt.content) {
                content += alt.content;
                return true
            }
            return false;
        };
        let url = readParenthesis();
        if( url.success === false) {
            content = content + '[' + alt.content + ']' + url.content;
            return true;
        };
        savePreviousContent();
        result.push({tag: 'link', content: alt.content, url: url.content});
        return true;
    }

    while(cursor < length) {
        let char = input.charAt(cursor);
        if (readHeader(char)) continue;
        if (readUlList(char)) continue;
        if (readOlList(char)) continue;
        if (readBold(char)) continue;
        if (readBlockQuote(char)) continue;
        if (readCode(char)) continue;
        // readImage readLink顺序不能替换
        if (readImage(char)) continue;
        if (readLink(char)) continue;
        content += char;
        cursor++;
    }
    savePreviousContent();
    return result;


}

export default tokenizer;
