export function patch(oldVnode, vnode) {
    const isRealElement = oldVnode.nodeType;
    if (isRealElement) {
        const oldElm = oldVnode;
        const parentElm = oldElm.parentNode;

        let el = createElm(vnode);
        parentElm.insertBefore(el, oldElm.nextSibling);
        parentElm.removeChild(oldVnode);
        return el;
    }
}
function createElm(vnode) {
    let {tag, children, key, data, text} = vnode;
    if (typeof tag === 'string') {
        vnode.el = document.createElement(tag);
        updateProperties(vnode);
        children.forEach(child => {
            return vnode.el.appendChild(createElm(child));
        });
    } else {
        vnode.el = document.createTextNode(text);
    }
    return vnode.el;
}
function updateProperties(vnode) {
    let newProps = vnode.data || {}; // 获取当前老节点中的属性
    let el = vnode.el; // 当前的真实节点
    for (let key in newProps) {
        if (key === 'style') {
            for (let styleName in newProps.style) {
                el.style[styleName.trim()] = newProps.style[styleName];
            }
        } else if (key === 'class') {
            el.className = newProps.class;
        } else {
            // 给这个元素添加属性 值就是对应的值
            el.setAttribute(key, newProps[key]);
        }
    }
}
