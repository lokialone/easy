const isEvent = (key) => key.startsWith('on');
const isChildren = (key) => key === 'children';
const isStyle = (key) => key === 'style';
const isProperty = (key) => !isEvent(key) && !isChildren(key);
export function setProps(stateNode, oldProps, newProps) {
    for(let key in oldProps) {
       if (!isChildren(key)) {
            if(newProps.hasOwnProperty(key)) {
                setProp(stateNode, key, newProps[key]);
            } else {
                dom.removeAttribute(key);
            }
        } 
    }
    for(let key in newProps) {
        if (!isChildren(key)) {
            if (!oldProps.hasOwnProperty(key)){
                setProp(stateNode, key, newProps[key]);
            }
        }
    }
}

function setProp(dom, key, value) {
    if (isEvent(key)) {
        dom[key.toLowerCase()] = value;
    } else if (isStyle(key)) {
        if (value) {
             dom.style = value;
            // for(let styleName in value) {
               
            // }
        }
    } else {
        dom.setAttribute(key, value);
    }
}