// 根据AST生产 render函数的
// return _c('div',{style:{color:'red'}},_v('hello'+_s(name)),_c('span',undefined,''))
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3;
function gen(node) {
    if (node.type === ELEMENT_TYPE) {
        return generate(node);
        // 处理文本节点，获取将文本内的{{text}} 转换床 _s(text)
    } else {
        // 准备依次转换{{}}
        let text = node.text;
        if (!defaultTagRE.test(text)) {
            return `_v(${JSON.stringify(text)})`;
        }
        let lastIndex = (defaultTagRE.lastIndex = 0);
        let tokens = [];
        let match, index;

        while ((match = defaultTagRE.exec(text))) {
            index = match.index;
            if (index > lastIndex) {
                tokens.push(JSON.stringify(text.slice(lastIndex, index)));
            }
            tokens.push(`_s(${match[1].trim()})`);
            lastIndex = index + match[0].length;
        }
        if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)));
        }
        return `_v(${tokens.join('+')})`;
    }
}
function genChildren(children) {
    if (children) {
        return children.map(child => gen(child)).join(',');
    }
    return '';
}
function genProps(attrs) {
    if (!attrs.length) return undefined;
    let str = '';
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];
        if (attr.name === 'style') {
            let obj = {};
            attr.value.split(';').forEach(item => {
                let [key, value] = item.split(':');
                obj[key] = value;
            });
            attr.value = obj;
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`;
    }
    return `{${str.slice(0, -1)}}`;
}
export default function generate(ast) {
    return `_c('${ast.tag}', ${genProps(ast.attrs)}, ${genChildren(ast.children)})`;
}
