export function compileToFunction(string) {
    let ast = parseHTML(string);
    return function render() {};
}

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
let root = null;
let tagStack = [];

function start(tagName, attrs) {
    console.log('tagStart', tagName, attrs);
    const element = {
        parent: null,
        children: [],
        attrs,
        tagName,
    };
}
function end(tagName) {
    console.log('tagEnd', tagName);
}

function char(text) {
    console.log('text', text);
}
function parseHTML(html) {
    function advance(n) {
        html = html.slice(n);
    }
    function parseTag(isStart) {
        let tagName = isStart[1];
        advance(isStart[0].length);
        let attrs = [];
        let attr;
        while ((attr = html.match(attribute))) {
            let key = attr[1];
            let value = attr[3] || attr[4] || attr[5];
            attrs.push({name: key, value});
            advance(attr[0].length);
        }
        if (!startTagClose.test(html)) {
            throw new Error(`${tagName}便签缺少 >`);
        }
        advance(1);
        return {tagName, attrs};
    }
    while (html.length) {
        let textEnd = html.indexOf('<');
        if (textEnd === 0) {
            const isStart = html.match(startTagOpen);
            if (isStart) {
                const {tagName, attrs} = parseTag(isStart);
                start(tagName, attrs);
                continue;
            }
        }
        const isEnd = html.match(endTag);
        if (isEnd) {
            let tagName = isEnd[1];
            end(tagName);
            advance(isEnd[0].length);
            continue;
        }
        let text = html.slice(0, textEnd);
        if (text) {
            char(text);
            advance(text.length);
        }
    }
}
