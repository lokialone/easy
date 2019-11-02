const nodeTypes = {
    element: 'element',
    value: 'value',
    props: 'props',
}

export const parseElement = (str: string) => {
    let match = str.match(/<(\w+)/);
    
    if (!match) {
        str = str.split('<')[0];
        return parseValue(str);
    }

    const node = {
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

    if (!match) return;
    // ??
    // node.props = parseProps(str.slice(0, match.index), values)
    node.props = parseProps(str.slice(0, match.index))
    length = node.props.length
    str = str.slice(length);
    node.length += length;
    return node;
}

const parseProps = (str: string) => {
    let match;
    let length = '';

    const node = {
        type: nodeTypes.props,
        length: 0,
        props: {}
    }

    const setMatchNextProp = () => {
        match = 
            str.match(/ *\w+=""/) ||
            str.match(/ *\w+/)
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

