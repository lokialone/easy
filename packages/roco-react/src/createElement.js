import { ELEMENT_TEXT} from './constants';
export default function createElement(type, config, ...children) {
    // delete config.__self;
    // delete config.__source;
    return { 
        type,
        props: {
            ...config,
            children: children.map(child => {
                return typeof child === 'object' ? child : {
                    type: ELEMENT_TEXT,
                    props: {
                        text: child,
                        children:[]
                    }
                }
            })
        }
    }
}