const nodeTypes = {
    element: 'element',
    value: 'value',
    props: 'props',
}
interface INode {
    type: string,
    length: number,
    value?: string,
    props?: {
        [k: string]: any
    },
    name?: string,
    children?: INode[],
}

export const parseElement = (str: string) => {
    let match = str.match(/<(\w+)/);
    // 判断为 value node or element node
    if (!match) {
        str = str.split('<')[0];
        return parseValue(str);
    }

    const node: INode = {
        type: nodeTypes.element,
        props: parseProps(''),
        children: [],
        length: 0,
        name: ''
    }

    node.name = match[1];
    let length = match.index ?  match.index + match[0].length : match[0].length;
    str = str.slice(length);
    node.length += length;

 
    match = str.match(/>/);

    if (!match) return node;
    // ??
    // node.props = parseProps(str.slice(0, match.index), values)
    node.props = parseProps(str.slice(0, match.index))
    length = node.props.length
    str = str.slice(length);
    node.length += length;


    // 判断是否是自闭合tag
    match = str.match(/^ *\/ *>/);
    if (match) {
        if (match.index === undefined) match.index = 0;
        node.length += match.index + match[0].length;
        return node
    }
    // get children
    match = str.match(/>/)
    if (!match) return node
    if (match.index === undefined) match.index = 0;
    length = match.index + 1
    str = str.slice(length);
    node.length += length;

    let child = parseElement(str);
    while(child.type === nodeTypes.element || child.value) {
        length = child.length;
        str = str.slice(length);
        node.length += length;
        if (!node.children) {
            node.children = [];
        }
        node.children.push(child);
        child = parseElement(str);
    }


   
    return node;
}

const parseProps = (str: string) => {
    let match;
    let length = '';

    const node: INode = {
        type: nodeTypes.props,
        length: 0
    }
    const matchNextProp = (str: string) => {
        return str.match(/ *\w+="(?:.*[^\\]")?/) || str.match(/ *\w+/);
    }
    match = matchNextProp(str);
    while(match) {
        const propStr = match[0];
        let [key, ...value] = propStr.split('=')
        node.length += propStr.length;
        key = key.trim();
        let valueString = value.join('=');
        node.props = {};
        node.props[key]= valueString? valueString.slice(1, -1) : true;
        if (match.index === undefined) match.index = 0;
        str = str.slice(0, match.index) + str.slice(match.index + propStr.length);
        match = matchNextProp(str);
    }

    return node;
}

const parseValue = (str: string) => {
    return {
        type: nodeTypes.value,
        length: str.length,
        value: str.trim()
    }
}

// const jsx = (splits, ...values) => {

// }

